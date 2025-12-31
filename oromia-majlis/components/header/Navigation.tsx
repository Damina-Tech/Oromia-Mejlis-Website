"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Offices", href: "/offices" },
  { name: "Projects", href: "/projects" },
  { name: "News", href: "/news" },
  { name: "Event", href: "/event" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`font-medium transition-colors ${
            pathname === item.href
              ? "text-red-600"
              : "text-blue-700 hover:text-red-600"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

