"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Accueil", icon: "🏠" },
  { href: "/prises", label: "Prises", icon: "🐟" },
  { href: "/ventes", label: "Ventes", icon: "💰" },
  { href: "/depenses", label: "Dépenses", icon: "⛽" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="tabbar">
      <div className="brand">PêchTrack</div>
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={pathname === tab.href ? "tab active" : "tab"}
        >
          <span className="icon">{tab.icon}</span>
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
