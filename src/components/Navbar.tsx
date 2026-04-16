"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Receipt, Wallet, MessageSquareText, LogOut, Sparkles } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/gastos", label: "Gastos", icon: Receipt },
  { href: "/perfil", label: "Salario", icon: Wallet },
  { href: "/chat", label: "Chat IA", icon: MessageSquareText },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="glass border-b border-[#1a1a2e]/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2.5 mr-8 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-shadow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text hidden sm:block">GastosIA</span>
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#7c3aed]/10 text-[#a78bfa] shadow-sm shadow-[#7c3aed]/5"
                        : "text-[#7a7a95] hover:text-[#f0f0f8] hover:bg-white/[0.03]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#a78bfa]" : ""}`} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 text-sm text-[#7a7a95] hover:text-[#ef4444] transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-[#ef4444]/5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
        {/* Mobile nav */}
        <div className="sm:hidden flex gap-1 pb-3 overflow-x-auto -mx-1 px-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#7c3aed]/10 text-[#a78bfa]"
                    : "text-[#7a7a95]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
