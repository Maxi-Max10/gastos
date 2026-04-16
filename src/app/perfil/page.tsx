"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

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
      .then((r) => r.json())
      .then((data) => {
        if (data.salarioActual) setSalario(String(data.salarioActual));
        setHistorial(data.historial || []);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/salario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ salario: Number(salario), inflacion: Number(inflacion || 0) }),
    });

    const data = await res.json();
    setResultado(data);
    if (data.registro) {
      setHistorial((prev) => [data.registro, ...prev]);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-white">Salario y Ajuste por Inflación</h1>

        <form onSubmit={handleSubmit} className="bg-[#12121a] rounded-xl p-6 border border-[#1e1e2e] mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#8888a0] mb-1.5">
                Salario Mensual ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl focus:ring-2 focus:ring-[#6c5ce7]/50 outline-none text-white placeholder-[#4a4a5a]"
                placeholder="Ej: 50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#8888a0] mb-1.5">
                Tasa de Inflación (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={inflacion}
                onChange={(e) => setInflacion(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl focus:ring-2 focus:ring-[#6c5ce7]/50 outline-none text-white placeholder-[#4a4a5a]"
                placeholder="Ej: 4.5"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#6c5ce7] text-white px-6 py-2.5 rounded-xl hover:bg-[#7c6ef7] transition font-medium disabled:opacity-50"
          >
            {loading ? "Calculando..." : "Calcular Ajuste"}
          </button>
        </form>

        {/* Resultado */}
        {resultado && (
          <div className="bg-[#12121a] rounded-xl p-6 border border-[#1e1e2e] mb-6">
            <h2 className="font-semibold mb-4 text-white">Resultado del Ajuste</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#4da6ff]/10 border border-[#4da6ff]/20 rounded-xl p-4">
                <p className="text-xs text-[#4da6ff] mb-1 uppercase tracking-wider">Salario Nominal</p>
                <p className="text-xl font-bold text-[#4da6ff]">
                  ${resultado.salario.toLocaleString()}
                </p>
              </div>
              <div className="bg-[#ffb347]/10 border border-[#ffb347]/20 rounded-xl p-4">
                <p className="text-xs text-[#ffb347] mb-1 uppercase tracking-wider">Inflación Aplicada</p>
                <p className="text-xl font-bold text-[#ffb347]">{resultado.inflacion}%</p>
              </div>
              <div className="bg-[#00d2a0]/10 border border-[#00d2a0]/20 rounded-xl p-4">
                <p className="text-xs text-[#00d2a0] mb-1 uppercase tracking-wider">Poder Adquisitivo Real</p>
                <p className="text-xl font-bold text-[#00d2a0]">
                  ${resultado.salarioAjustado.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-[#ff4d6a]/10 border border-[#ff4d6a]/20 rounded-xl p-4">
                <p className="text-xs text-[#ff4d6a] mb-1 uppercase tracking-wider">Pérdida por Inflación</p>
                <p className="text-xl font-bold text-[#ff4d6a]">
                  -${resultado.perdidaPorInflacion.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Historial */}
        {historial.length > 0 && (
          <div className="bg-[#12121a] rounded-xl p-6 border border-[#1e1e2e]">
            <h2 className="font-semibold mb-4 text-white">Historial de Ajustes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e1e2e] text-left text-[#8888a0]">
                    <th className="pb-2">Fecha</th>
                    <th className="pb-2">Salario</th>
                    <th className="pb-2">Inflación</th>
                    <th className="pb-2">Poder Real</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((h) => (
                    <tr key={h.id} className="border-b border-[#1e1e2e] last:border-0 text-[#e4e4ed]">
                      <td className="py-2.5">{new Date(h.fecha).toLocaleDateString("es")}</td>
                      <td className="py-2.5">${h.salario.toLocaleString()}</td>
                      <td className="py-2.5 text-[#ffb347]">{h.inflacion}%</td>
                      <td className="py-2.5 text-[#00d2a0]">
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
