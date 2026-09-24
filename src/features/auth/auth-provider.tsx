"use client";

import { Account, ID, type Models } from "appwrite";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { client } from "@/lib/appwrite/client";
import { roleFromUser } from "./roles";
import { Role } from "@/types/domain";

type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthContextValue = {
  status: AuthStatus;
  user: Models.User<Models.Preferences> | null;
  role: Role;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const account = new Account(client);
const configuredSessionHours = Number(process.env.NEXT_PUBLIC_SESSION_MAX_AGE_HOURS ?? "24");
const sessionMaxAgeMs = (Number.isFinite(configuredSessionHours) && configuredSessionHours > 0 ? configuredSessionHours : 24) * 60 * 60 * 1000;

function isUnauthorized(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: number }).code === 401;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [role, setRole] = useState<Role>(Role.Public);

  const applyUser = useCallback((currentUser: Models.User<Models.Preferences> | null) => {
    setUser(currentUser);
    setRole(roleFromUser(currentUser));
    setStatus(currentUser ? "authenticated" : "anonymous");
  }, []);

  const refresh = useCallback(async () => {
    try {
      const session = await account.getSession({ sessionId: "current" });
      const createdAt = Date.parse(session.$createdAt);
      const expiresAt = Date.parse(session.expire);
      if (!Number.isFinite(createdAt) || !Number.isFinite(expiresAt) || Date.now() - createdAt > sessionMaxAgeMs || expiresAt <= Date.now()) {
        await account.deleteSession({ sessionId: "current" });
        applyUser(null);
        return;
      }
      const currentUser = await account.get();
      applyUser(currentUser);
    } catch (error) {
      if (!isUnauthorized(error)) console.error("[Appwrite] Unable to check the current session.", error);
      applyUser(null);
    }
  }, [applyUser]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void refresh(); }, 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);

  const value = useMemo<AuthContextValue>(() => ({
    status,
    user,
    role,
    async signIn(email, password) {
      await account.createEmailPasswordSession({ email, password });
      await refresh();
    },
    async signUp(name, email, password) {
      await account.create({ userId: ID.unique(), name, email, password });
      await account.createEmailPasswordSession({ email, password });
      await account.updatePrefs({ prefs: { role: Role.Patient } });
      await refresh();
    },
    async signOut() {
      await account.deleteSession({ sessionId: "current" });
      applyUser(null);
    },
  }), [applyUser, refresh, role, status, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
