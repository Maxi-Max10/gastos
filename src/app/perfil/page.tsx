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
        <h1 className="text-2xl font-bold mb-6">Salario y Ajuste por Inflación</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salario Mensual ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Ej: 50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tasa de Inflación (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={inflacion}
                onChange={(e) => setInflacion(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Ej: 4.5"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
          >
            {loading ? "Calculando..." : "Calcular Ajuste"}
          </button>
        </form>

        {/* Resultado */}
        {resultado && (
          <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
            <h2 className="font-semibold mb-4">Resultado del Ajuste</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 mb-1">Salario Nominal</p>
                <p className="text-xl font-bold text-blue-800">
                  ${resultado.salario.toLocaleString()}
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-orange-600 mb-1">Inflación Aplicada</p>
                <p className="text-xl font-bold text-orange-800">{resultado.inflacion}%</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 mb-1">Poder Adquisitivo Real</p>
                <p className="text-xl font-bold text-green-800">
                  ${resultado.salarioAjustado.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-red-600 mb-1">Pérdida por Inflación</p>
                <p className="text-xl font-bold text-red-800">
                  -${resultado.perdidaPorInflacion.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Historial */}
        {historial.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="font-semibold mb-4">Historial de Ajustes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-gray-500">
                    <th className="pb-2">Fecha</th>
                    <th className="pb-2">Salario</th>
                    <th className="pb-2">Inflación</th>
                    <th className="pb-2">Poder Real</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((h) => (
                    <tr key={h.id} className="border-b last:border-0">
                      <td className="py-2">{new Date(h.fecha).toLocaleDateString("es")}</td>
                      <td className="py-2">${h.salario.toLocaleString()}</td>
                      <td className="py-2">{h.inflacion}%</td>
                      <td className="py-2">
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
