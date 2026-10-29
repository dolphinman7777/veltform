import { cookies } from "next/headers";

export const SESSION_COOKIE = "veld_db";

/** HMAC of a fixed label, keyed by the password: rotating DATABASE_PASSWORD invalidates every session. */
export async function sessionToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("veldform-client-database"));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function isAuthorised(): Promise<boolean> {
  const password = process.env.DATABASE_PASSWORD;
  if (!password) return false;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  return !!value && value === (await sessionToken(password));
}
