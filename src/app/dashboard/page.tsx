"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

interface Resumen {
  totalGastos: number;
  gastosMesActual: number;
  salario: number;
  disponible: number;
  gastosPorCategoria: Record<string, number>;
  gastosPorMes: Record<string, number>;
  totalRegistros: number;
}

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
          <div className="animate-pulse text-gray-400 text-lg">Cargando...</div>
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <p className="text-sm text-gray-500 mb-1">Salario Mensual</p>
            <p className="text-2xl font-bold text-indigo-600">
              ${resumen.salario.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <p className="text-sm text-gray-500 mb-1">Gastos Este Mes</p>
            <p className="text-2xl font-bold text-red-500">
              ${resumen.gastosMesActual.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <p className="text-sm text-gray-500 mb-1">Disponible</p>
            <p className={`text-2xl font-bold ${resumen.disponible >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${resumen.disponible.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <p className="text-sm text-gray-500 mb-1">Total Registros</p>
            <p className="text-2xl font-bold text-gray-700">{resumen.totalRegistros}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gastos por Mes */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="font-semibold mb-4">Gastos por Mes (últimos 6)</h2>
            <div className="space-y-3">
              {meses.map(([mes, monto]) => (
                <div key={mes}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{mes}</span>
                    <span className="font-medium">${monto.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-indigo-500 h-3 rounded-full transition-all"
                      style={{ width: `${(monto / maxMes) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gastos por Categoría */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="font-semibold mb-4">Gastos por Categoría</h2>
            {categorias.length === 0 ? (
              <p className="text-gray-400 text-sm">No hay gastos registrados</p>
            ) : (
              <div className="space-y-3">
                {categorias.map(([cat, monto]) => {
                  const pct = resumen.totalGastos > 0 ? (monto / resumen.totalGastos) * 100 : 0;
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 capitalize">{cat}</span>
                        <span className="font-medium">
                          ${monto.toLocaleString()} ({pct.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div
                          className="bg-emerald-500 h-3 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
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
