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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div
      className={`lg:hidden bg-white border-t shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`py-3 px-4 rounded-md font-medium transition-colors ${
                pathname === item.href
                  ? "text-red-600 bg-red-50"
                  : "text-blue-700 hover:bg-blue-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={onClose}
            className="mt-2 py-3 px-4 rounded-md border-2 border-blue-700 text-blue-700 font-semibold text-center hover:bg-blue-50 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/donate"
            onClick={onClose}
            className="py-3 px-4 rounded-md bg-red-600 text-white font-semibold text-center hover:bg-red-700 transition-colors shadow-md"
          >
            Donate
          </Link>
        </nav>
      </div>
    </div>
  );
}

