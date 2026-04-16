"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  DollarSign, TrendingDown, Percent, ShieldCheck, Calculator,
  Loader2, History, ArrowRight, Minus
} from "lucide-react";

interface SalarioHistorial {
  id: string;
  salario: number;
  inflacion: number;
  salarioAjustado: number;
  fecha: string;
}

export default function PerfilPage() {
  const [salario, setSalario] = useState("");
  const [inflacion, setInflacion] = useState("");
  const [resultado, setResultado] = useState<{
    salario: number;
    inflacion: number;
    salarioAjustado: number;
    perdidaPorInflacion: number;
  } | null>(null);
  const [historial, setHistorial] = useState<SalarioHistorial[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/salario")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        if (data.salarioActual) setSalario(String(data.salarioActual));
        setHistorial(data.historial || []);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/salario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salario: Number(salario), inflacion: Number(inflacion || 0) }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResultado(data);
      if (data.registro) {
        setHistorial((prev) => [data.registro, ...prev]);
      }
    } catch {
      alert("Error al guardar el salario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Salario e Inflación</h1>
          <p className="text-sm text-[#7a7a95]">Calculá el impacto real de la inflación en tu salario</p>
        </div>

        {/* Calculator Form */}
        <form onSubmit={handleSubmit} className="stat-card !p-6 mb-8">
          <div className="flex items-center gap-2.5 mb-6">
            <Calculator className="w-5 h-5 text-[#a78bfa]" />
            <h2 className="text-sm font-medium text-[#7a7a95] uppercase tracking-wider">Calculadora</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#7a7a95] mb-2">Salario Mensual ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a60]" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={salario}
                  onChange={(e) => setSalario(e.target.value)}
                  required
                  className="input-field !pl-11"
                  placeholder="Ej: 500000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7a7a95] mb-2">Tasa de Inflación (%)</label>
              <div className="relative">
                <Percent className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a60]" />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={inflacion}
                  onChange={(e) => setInflacion(e.target.value)}
                  className="input-field !pl-11"
                  placeholder="Ej: 4.5"
                />
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary text-sm !py-3">
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Calculando...</>
            ) : (
              <><Calculator className="w-4 h-4" /> Calcular Ajuste</>
            )}
          </button>
        </form>

        {/* Results */}
        {resultado && (
          <div className="animate-slide-up mb-8">
            <div className="flex items-center gap-2.5 mb-5">
              <ArrowRight className="w-5 h-5 text-[#a78bfa]" />
              <h2 className="text-sm font-medium text-[#7a7a95] uppercase tracking-wider">Resultado</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="stat-card !p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center">
                    <DollarSign className="w-4.5 h-4.5 text-[#60a5fa]" />
                  </div>
                  <p className="text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Salario Nominal</p>
                </div>
                <p className="text-2xl font-bold text-[#60a5fa] tabular-nums">
                  ${resultado.salario.toLocaleString()}
                </p>
              </div>

              <div className="stat-card !p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
                    <Percent className="w-4.5 h-4.5 text-[#fbbf24]" />
                  </div>
                  <p className="text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Inflación</p>
                </div>
                <p className="text-2xl font-bold text-[#fbbf24] tabular-nums">
                  {resultado.inflacion}%
                </p>
              </div>

              <div className="stat-card !p-5 glow-success">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                    <ShieldCheck className="w-4.5 h-4.5 text-[#34d399]" />
                  </div>
                  <p className="text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Poder Real</p>
                </div>
                <p className="text-2xl font-bold text-[#34d399] tabular-nums">
                  ${resultado.salarioAjustado.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="stat-card !p-5 glow-danger">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ef4444]/10 flex items-center justify-center">
                    <TrendingDown className="w-4.5 h-4.5 text-[#f87171]" />
                  </div>
                  <p className="text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Pérdida</p>
                </div>
                <p className="text-2xl font-bold text-[#f87171] tabular-nums">
                  <Minus className="w-5 h-5 inline" />
                  ${resultado.perdidaPorInflacion.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* History */}
        {historial.length > 0 && (
          <div className="stat-card !p-6">
            <div className="flex items-center gap-2.5 mb-6">
              <History className="w-5 h-5 text-[#a78bfa]" />
              <h2 className="text-sm font-medium text-[#7a7a95] uppercase tracking-wider">Historial de Ajustes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1a1a2e]">
                    <th className="pb-3 text-left text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Fecha</th>
                    <th className="pb-3 text-left text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Salario</th>
                    <th className="pb-3 text-left text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Inflación</th>
                    <th className="pb-3 text-left text-xs text-[#7a7a95] uppercase tracking-wider font-medium">Poder Real</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((h) => (
                    <tr key={h.id} className="border-b border-[#1a1a2e]/50 last:border-0 hover:bg-white/[0.01] transition-colors">
                      <td className="py-3.5 text-[#f0f0f8]">
                        {new Date(h.fecha).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-3.5 text-[#f0f0f8] tabular-nums font-medium">${h.salario.toLocaleString()}</td>
                      <td className="py-3.5">
                        <span className="tag bg-[#f59e0b]/10 text-[#fbbf24] border border-[#f59e0b]/15">
                          {h.inflacion}%
                        </span>
                      </td>
                      <td className="py-3.5 text-[#34d399] tabular-nums font-semibold">
                        ${h.salarioAjustado.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
