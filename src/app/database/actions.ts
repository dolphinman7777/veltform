"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, sessionToken } from "./auth";

export async function signIn(_prev: string | null, form: FormData): Promise<string | null> {
  const password = process.env.DATABASE_PASSWORD;
  if (!password) return "The database password is not configured.";
  if (form.get("password") !== password) return "Incorrect password.";
  (await cookies()).set(SESSION_COOKIE, await sessionToken(password), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/database",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/database");
}

export async function signOut() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/database" });
  redirect("/database");
}
