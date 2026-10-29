"use client";

import { useActionState } from "react";
import { signIn } from "./actions";

export function SignInForm() {
  const [error, action, pending] = useActionState(signIn, null);

  return (
    <form action={action} className="db-signin">
      <h1>client database</h1>
      <p className="mono">Internal. Enter the team password.</p>
      <label className="mono" htmlFor="db-password">password</label>
      <input id="db-password" name="password" type="password" autoComplete="current-password" required autoFocus />
      <button type="submit" className="mono" disabled={pending}>{pending ? "checking…" : "open"}</button>
      {error && <p className="db-error mono" role="alert">{error}</p>}
    </form>
  );
}
