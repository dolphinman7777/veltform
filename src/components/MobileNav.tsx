"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { navItems } from "@/components/PrimaryNav";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const panelId = useId();

  // Close the menu whenever the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("veld-menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("veld-menu-open");
    };
  }, [open]);

  const [home, ...rest] = navItems;

  return (
    <div className="veld-mobile-nav">
      <Link
        className="veld-mobile-nav__home"
        href={home.href}
        aria-current={pathname === home.href ? "page" : undefined}
      >
        {home.label}
      </Link>

      <button
        type="button"
        className="veld-mobile-nav__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => {
          setOpenedAt(pathname);
          setOpen((value) => !value);
        }}
      >
        <span className={open ? "veld-burger is-open" : "veld-burger"} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        className={open ? "veld-mobile-nav__backdrop is-open" : "veld-mobile-nav__backdrop"}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <nav
        id={panelId}
        className={open ? "veld-mobile-nav__panel is-open" : "veld-mobile-nav__panel"}
        aria-label="Menu"
        inert={!open}
      >
        <ul>
          {rest.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link className="veld-site-cta veld-mobile-nav__cta" href="/enquire" onClick={() => setOpen(false)}>
          Enquire &rarr;
        </Link>
      </nav>
    </div>
  );
}
