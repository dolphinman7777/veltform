"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "home" },
  { href: "/lifestyle", label: "lifestyle" },
  { href: "/systems", label: "systems" },
  { href: "/climate", label: "climate" },
  { href: "/education", label: "education" },
  { href: "/process", label: "process" },
] as const;

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav className="veld-site-nav" aria-label="Primary">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={() => {
              if (pathname === item.href) {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
