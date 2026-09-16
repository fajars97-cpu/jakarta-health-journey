"use client";

import { useEffect } from "react";
import { client } from "@/lib/appwrite/client";

let hasPinged = false;

export function AppwritePing() {
  useEffect(() => {
    if (hasPinged) return;
    hasPinged = true;

    void client.ping()
      .then(() => console.info("[Appwrite] Connected to Jakarta Health Journey."))
      .catch((error: unknown) => console.error("[Appwrite] Connection check failed.", error));
  }, []);

  return null;
}
