"use client";

import { Account, type Models } from "appwrite";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { client } from "@/lib/appwrite/client";

type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthContextValue = {
  status: AuthStatus;
  user: Models.User<Models.Preferences> | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const account = new Account(client);

function isUnauthorized(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: number }).code === 401;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  const refresh = useCallback(async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      setStatus("authenticated");
    } catch (error) {
      if (!isUnauthorized(error)) console.error("[Appwrite] Unable to check the current session.", error);
      setUser(null);
      setStatus("anonymous");
    }
  }, []);

  useEffect(() => {
    let active = true;
    void account.get().then(
      (currentUser) => {
        if (!active) return;
        setUser(currentUser);
        setStatus("authenticated");
      },
      (error: unknown) => {
        if (!active) return;
        if (!isUnauthorized(error)) console.error("[Appwrite] Unable to check the current session.", error);
        setUser(null);
        setStatus("anonymous");
      },
    );
    return () => { active = false; };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    status,
    user,
    async signIn(email, password) {
      await account.createEmailPasswordSession({ email, password });
      await refresh();
    },
    async signOut() {
      await account.deleteSession({ sessionId: "current" });
      setUser(null);
      setStatus("anonymous");
    },
  }), [refresh, status, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
