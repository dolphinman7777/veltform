"use client";

import { useEffect, useMemo, useState } from "react";

export type Person = { name: string; role: string; email: string; emailStatus: string; linkedin: string };
export type Client = {
  id: string;
  name: string;
  segments: string[];
  people: Person[];
  area?: string;
  drive?: string;
  fit?: string;
  offer?: string;
  priority?: string;
  website?: string;
  source?: string;
  phone?: string;
  list?: "Core" | "Niche";
};

const PAGE_SIZE = 48;

function haystack(c: Client) {
  return [c.name, c.area, c.fit, c.offer, c.website, ...c.segments, ...c.people.flatMap((p) => [p.name, p.role, p.email])]
    .join(" ")
    .toLowerCase();
}

export function ClientBrowser({ clients }: { clients: Client[] }) {
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState("");
  const [onlyContacts, setOnlyContacts] = useState(false);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [openId, setOpenId] = useState<string | null>(null);

  const index = useMemo(() => clients.map((c) => [c, haystack(c)] as const), [clients]);
  const segments = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of clients) for (const s of c.segments) counts.set(s, (counts.get(s) ?? 0) + 1);
    return [...counts].sort((a, b) => a[0].localeCompare(b[0]));
  }, [clients]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return index
      .filter(([c, text]) =>
        (!segment || c.segments.includes(segment)) &&
        (!onlyContacts || c.people.length > 0) &&
        terms.every((t) => text.includes(t)))
      .map(([c]) => c);
  }, [index, query, segment, onlyContacts]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = openId ? clients.find((c) => c.id === openId) : null;
  const peopleCount = results.reduce((n, c) => n + c.people.length, 0);

  return (
    <section className="db-browser">
      <div className="db-tools">
        <input
          type="search"
          className="db-search"
          placeholder="Search businesses, types, areas, people, roles…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setLimit(PAGE_SIZE); }}
          aria-label="Search clients"
        />
        <select className="db-select mono" value={segment} onChange={(e) => { setSegment(e.target.value); setLimit(PAGE_SIZE); }} aria-label="Business type">
          <option value="">All business types ({clients.length})</option>
          {segments.map(([s, n]) => (
            <option key={s} value={s}>{s} ({n})</option>
          ))}
        </select>
        <label className="db-check mono">
          <input type="checkbox" checked={onlyContacts} onChange={(e) => { setOnlyContacts(e.target.checked); setLimit(PAGE_SIZE); }} />
          with contacts only
        </label>
      </div>
      <p className="db-count mono">{results.length} clients · {peopleCount} people</p>

      <div className="db-grid">
        {results.slice(0, limit).map((c) => (
          <button key={c.id} type="button" className="db-card" onClick={() => setOpenId(c.id)} aria-haspopup="dialog">
            <span className="db-card-top mono">
              <span>{c.segments[0] ?? c.list}</span>
              {c.priority && <span className={`db-pri db-pri-${c.priority}`}>{c.priority}</span>}
            </span>
            <span className="db-card-name">{c.name}</span>
            <span className="db-card-meta mono">{c.area}</span>
            <span className="db-card-foot mono">
              {c.people.length ? `${c.people.length} contact${c.people.length > 1 ? "s" : ""}` : "no contacts yet"}
              <span aria-hidden="true">+</span>
            </span>
          </button>
        ))}
      </div>

      {limit < results.length && (
        <button type="button" className="db-more mono" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
          show more ({results.length - limit} left)
        </button>
      )}
      {!results.length && <p className="db-empty mono">No clients match that search.</p>}

      {open && <ClientDetail client={open} onClose={() => setOpenId(null)} />}
    </section>
  );
}

function ClientDetail({ client: c, onClose }: { client: Client; onClose: () => void }) {
  return (
    <div className="db-overlay" onClick={onClose}>
      <article className="db-detail" role="dialog" aria-modal="true" aria-labelledby="db-detail-name" onClick={(e) => e.stopPropagation()}>
        <div className="db-detail-top mono">
          <span>{c.list === "Core" ? `Core prospect${c.priority ? ` · priority ${c.priority}` : ""}` : "Niche prospect"}</span>
          <button type="button" className="db-close" onClick={onClose} aria-label={`Close ${c.name}`} autoFocus>×</button>
        </div>
        <h2 id="db-detail-name">{c.name}</h2>
        <p className="db-tags mono">{c.segments.join(" · ")}</p>

        <dl className="db-stats mono">
          {c.area && <div><dt>Area</dt><dd>{c.area}</dd></div>}
          {c.drive && <div><dt>Drive from CBD</dt><dd>{c.drive}</dd></div>}
          {c.offer && <div><dt>Best-fit offer</dt><dd>{c.offer}</dd></div>}
          {c.phone && <div><dt>Company phone</dt><dd><a href={`tel:${c.phone}`}>{c.phone}</a></dd></div>}
          {c.website && <div><dt>Website</dt><dd><a href={`https://${c.website}`} target="_blank" rel="noreferrer">{c.website}</a></dd></div>}
          {c.source && <div><dt>Source</dt><dd><a href={c.source} target="_blank" rel="noreferrer">link</a></dd></div>}
        </dl>
        {c.fit && <p className="db-fit">{c.fit}</p>}

        <h3 className="mono">People {c.people.length ? `(${c.people.length})` : ""}</h3>
        {c.people.length ? (
          <ul className="db-people">
            {c.people.map((p) => (
              <li key={p.name}>
                <p className="db-person-name">{p.name}</p>
                <p className="db-person-role mono">{p.role}</p>
                <p className="db-person-links mono">
                  {p.email ? <a href={`mailto:${p.email}`}>{p.email}</a> : <span className="db-muted">no email</span>}
                  {p.email && p.emailStatus && <span className="db-muted"> · {p.emailStatus}</span>}
                  {p.linkedin && (
                    <> · <a href={p.linkedin.startsWith("http") ? p.linkedin : `https://${p.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a></>
                  )}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="db-muted mono">No decision-makers found yet. Use the company phone or website.</p>
        )}
      </article>
    </div>
  );
}
