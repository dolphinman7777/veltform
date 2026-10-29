import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";
import { isAuthorised } from "./auth";
import { signOut } from "./actions";
import { ClientBrowser, type Client } from "./ClientBrowser";
import { SignInForm } from "./SignInForm";
import "./database.css";

export const metadata: Metadata = {
  title: { absolute: `Client database — ${site.displayName}` },
  // Internal tool holding personal contact details: never index or cache it.
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null },
};

export const dynamic = "force-dynamic";

async function loadClients(): Promise<Client[]> {
  const { default: data } = await import("@/data/client-database.json");
  return data as Client[];
}

export default async function DatabasePage() {
  const authorised = await isAuthorised();

  return (
    <>
      <SiteHeader />
      <main className="db-page">
        {authorised ? (
          <>
            <header className="db-head">
              <div>
                <h1>client database</h1>
                <p className="mono">Prospects, decision-makers and contacts · internal</p>
              </div>
              <form action={signOut}>
                <button type="submit" className="db-link mono">sign out</button>
              </form>
            </header>
            <ClientBrowser clients={await loadClients()} />
          </>
        ) : (
          <SignInForm />
        )}
      </main>
    </>
  );
}
