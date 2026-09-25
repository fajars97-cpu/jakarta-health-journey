const DEFAULT_COOLDOWN_MS = 15_000;

/** Lightweight duplicate-submit guard for the static client. Backend rate limits remain required in production. */
export function allowSubmission(key: string, cooldownMs = DEFAULT_COOLDOWN_MS) {
  if (typeof window === "undefined") return true;
  const storageKey = `jhj:last-submit:${key}`;
  try {
    const previous = Number(window.sessionStorage.getItem(storageKey) ?? "0");
    if (Number.isFinite(previous) && Date.now() - previous < cooldownMs) return false;
    window.sessionStorage.setItem(storageKey, String(Date.now()));
  } catch {
    // Private browsing can disable sessionStorage; the server remains the source of truth.
  }
  return true;
}
