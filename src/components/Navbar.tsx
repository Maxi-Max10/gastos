"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/gastos", label: "Gastos", icon: "💰" },
  { href: "/perfil", label: "Salario", icon: "💼" },
  { href: "/chat", label: "Chat IA", icon: "🤖" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="glass border-b border-[#1e1e2e] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-1">
            <Link href="/dashboard" className="text-xl font-bold gradient-text mr-8">
              GastosIA
            </Link>
            <div className="hidden sm:flex gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-[#6c5ce7]/10 text-[#a29bfe] border border-[#6c5ce7]/20"
                      : "text-[#8888a0] hover:text-white hover:bg-[#16161f]"
                  }`}
                >
                  <span className="mr-1.5">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-[#8888a0] hover:text-[#ff4d6a] transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        {/* Mobile nav */}
        <div className="sm:hidden flex gap-1 pb-3 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                pathname === link.href
                  ? "bg-[#6c5ce7]/10 text-[#a29bfe]"
                  : "text-[#8888a0]"
              }`}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
