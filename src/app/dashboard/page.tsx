"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { DollarSign, TrendingDown, Wallet, Hash, BarChart3, PieChart, Loader2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPie, Pie, Cell, Legend,
} from "recharts";

function formatARS(n: number): string {
  return n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

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
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/resumen")
      .then((r) => {
        if (!r.ok) throw new Error("Error al cargar datos");
        return r.json();
      })
      .then(setResumen)
      .catch(() => setError("No se pudieron cargar los datos. Intentá recargar la página."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="skeleton-text h-7 w-40 mb-2" />
            <div className="skeleton-text h-4 w-64" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="stat-card !p-6" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="skeleton-text h-3 w-24" />
                  <div className="skeleton w-10 h-10 !rounded-xl" />
                </div>
                <div className="skeleton-text h-9 w-32" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="stat-card">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="skeleton w-5 h-5 !rounded-lg" />
                  <div className="skeleton-text h-5 w-36" />
                </div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j}>
                      <div className="flex justify-between mb-2">
                        <div className="skeleton-text h-4 w-20" />
                        <div className="skeleton-text h-4 w-24" />
                      </div>
                      <div className="skeleton h-3 w-full !rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error || !resumen) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-[#f87171] mb-4">{error || "Error al cargar el dashboard"}</p>
            <button onClick={() => window.location.reload()} className="btn-secondary text-sm">
              Reintentar
            </button>
          </div>
        </div>
      </>
    );
  }

  const categorias = Object.entries(resumen.gastosPorCategoria).sort((a, b) => b[1] - a[1]);
  const meses = Object.entries(resumen.gastosPorMes);

  const mesData = meses.map(([mes, monto]) => {
    const [y, m] = mes.split("-");
    const label = new Date(Number(y), Number(m) - 1).toLocaleDateString("es-AR", { month: "short" }).replace(".", "");
    return { name: label.charAt(0).toUpperCase() + label.slice(1), monto };
  });

  const catData = categorias.map(([cat, monto]) => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    value: monto,
    color: CATEGORY_COLORS[cat] || "#6b7280",
  }));

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a25] border border-[#2a2a3e] rounded-xl px-4 py-2.5 shadow-xl">
          <p className="text-xs text-[#7a7a95] mb-0.5">{label}</p>
          <p className="text-sm font-bold text-white">${formatARS(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a25] border border-[#2a2a3e] rounded-xl px-4 py-2.5 shadow-xl">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: payload[0].payload.color }} />
            <p className="text-xs text-[#7a7a95]">{payload[0].name}</p>
          </div>
          <p className="text-sm font-bold text-white">${formatARS(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

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
              ${formatARS(resumen.salario)}
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
              ${formatARS(resumen.gastosMesActual)}
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
              ${formatARS(resumen.disponible)}
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
          {/* Monthly Bar Chart */}
          <div className="stat-card">
            <div className="flex items-center gap-2.5 mb-6">
              <BarChart3 className="w-5 h-5 text-[#a78bfa]" />
              <h2 className="font-semibold text-white">Gastos por Mes</h2>
            </div>
            {mesData.length === 0 ? (
              <p className="text-[#7a7a95] text-sm py-8 text-center">Sin datos aún</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={mesData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#7a7a95", fontSize: 12 }}
                    axisLine={{ stroke: "#1a1a2e" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#7a7a95", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(124, 58, 237, 0.08)" }} />
                  <Bar
                    dataKey="monto"
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Category Donut Chart */}
          <div className="stat-card">
            <div className="flex items-center gap-2.5 mb-6">
              <PieChart className="w-5 h-5 text-[#34d399]" />
              <h2 className="font-semibold text-white">Gastos por Categoría</h2>
            </div>
            {catData.length === 0 ? (
              <p className="text-[#7a7a95] text-sm py-8 text-center">No hay gastos registrados</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <RechartsPie>
                  <Pie
                    data={catData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {catData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value: string) => (
                      <span className="text-xs text-[#7a7a95]">{value}</span>
                    )}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
