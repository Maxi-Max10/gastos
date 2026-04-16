"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { DollarSign, TrendingDown, Wallet, Hash, BarChart3, PieChart, Loader2 } from "lucide-react";

interface Resumen {
  totalGastos: number;
  gastosMesActual: number;
  salario: number;
  disponible: number;
  gastosPorCategoria: Record<string, number>;
  gastosPorMes: Record<string, number>;
  totalRegistros: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  alimentación: "#ef4444",
  transporte: "#f59e0b",
  vivienda: "#3b82f6",
  entretenimiento: "#a78bfa",
  salud: "#10b981",
  educación: "#06b6d4",
  ropa: "#ec4899",
  servicios: "#f97316",
  ahorro: "#22c55e",
  otro: "#6b7280",
};

export default function DashboardPage() {
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resumen")
      .then((r) => r.json())
      .then(setResumen)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center gap-3 text-[#7a7a95]">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Cargando dashboard...</span>
          </div>
        </div>
      </>
    );
  }

  if (!resumen) return null;

  const categorias = Object.entries(resumen.gastosPorCategoria).sort((a, b) => b[1] - a[1]);
  const meses = Object.entries(resumen.gastosPorMes);
  const maxMes = Math.max(...meses.map(([, v]) => v), 1);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-sm text-[#7a7a95]">Resumen general de tus finanzas</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Salario Mensual</p>
              <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/10 flex items-center justify-center group-hover:bg-[#7c3aed]/15 transition-colors">
                <DollarSign className="w-5 h-5 text-[#a78bfa]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#a78bfa] tracking-tight">
              ${resumen.salario.toLocaleString()}
            </p>
          </div>

          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Gastos del Mes</p>
              <div className="w-10 h-10 rounded-xl bg-[#ef4444]/10 flex items-center justify-center group-hover:bg-[#ef4444]/15 transition-colors">
                <TrendingDown className="w-5 h-5 text-[#f87171]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#f87171] tracking-tight">
              ${resumen.gastosMesActual.toLocaleString()}
            </p>
          </div>

          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Disponible</p>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                resumen.disponible >= 0
                  ? "bg-[#10b981]/10 group-hover:bg-[#10b981]/15"
                  : "bg-[#ef4444]/10 group-hover:bg-[#ef4444]/15"
              }`}>
                <Wallet className={`w-5 h-5 ${resumen.disponible >= 0 ? "text-[#34d399]" : "text-[#f87171]"}`} />
              </div>
            </div>
            <p className={`text-3xl font-bold tracking-tight ${
              resumen.disponible >= 0 ? "text-[#34d399]" : "text-[#f87171]"
            }`}>
              ${resumen.disponible.toLocaleString()}
            </p>
          </div>

          <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Total Registros</p>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                <Hash className="w-5 h-5 text-[#7a7a95]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white tracking-tight">{resumen.totalRegistros}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Chart */}
          <div className="stat-card">
            <div className="flex items-center gap-2.5 mb-6">
              <BarChart3 className="w-5 h-5 text-[#a78bfa]" />
              <h2 className="font-semibold text-white">Gastos por Mes</h2>
            </div>
            {meses.length === 0 ? (
              <p className="text-[#7a7a95] text-sm py-8 text-center">Sin datos aún</p>
            ) : (
              <div className="space-y-4">
                {meses.map(([mes, monto]) => (
                  <div key={mes} className="group/bar">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#7a7a95] font-medium">{mes}</span>
                      <span className="font-semibold text-white tabular-nums">${monto.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-[#0c0c14] rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${(monto / maxMes) * 100}%`,
                          background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Chart */}
          <div className="stat-card">
            <div className="flex items-center gap-2.5 mb-6">
              <PieChart className="w-5 h-5 text-[#34d399]" />
              <h2 className="font-semibold text-white">Gastos por Categoría</h2>
            </div>
            {categorias.length === 0 ? (
              <p className="text-[#7a7a95] text-sm py-8 text-center">No hay gastos registrados</p>
            ) : (
              <div className="space-y-3">
                {categorias.map(([cat, monto]) => {
                  const pct = resumen.totalGastos > 0 ? (monto / resumen.totalGastos) * 100 : 0;
                  const color = CATEGORY_COLORS[cat] || "#6b7280";
                  return (
                    <div key={cat} className="group/cat">
                      <div className="flex justify-between text-sm mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                          <span className="text-[#7a7a95] capitalize font-medium">{cat}</span>
                        </div>
                        <span className="font-semibold text-white tabular-nums">
                          ${monto.toLocaleString()}{" "}
                          <span className="text-xs text-[#7a7a95] font-normal">({pct.toFixed(1)}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-[#0c0c14] rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
