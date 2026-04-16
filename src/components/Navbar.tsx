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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-1">
            <Link href="/dashboard" className="text-xl font-bold text-indigo-600 mr-8">
              GastosIA
            </Link>
            <div className="hidden sm:flex gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-1">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
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
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600"
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
