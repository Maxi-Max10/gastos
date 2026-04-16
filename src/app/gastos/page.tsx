"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";

interface Gasto {
  id: string;
  descripcion: string;
  monto: number;
  categoria: string;
  fecha: string;
}

const CATEGORIAS = [
  "alimentación",
  "transporte",
  "vivienda",
  "entretenimiento",
  "salud",
  "educación",
  "ropa",
  "servicios",
  "ahorro",
  "otro",
];

export default function GastosPage() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  // Form state
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("alimentación");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);

  const fetchGastos = useCallback(async () => {
    const params = new URLSearchParams();
    if (filtroMes) params.set("mes", filtroMes);
    if (filtroCategoria) params.set("categoria", filtroCategoria);

    const res = await fetch(`/api/gastos?${params}`);
    const data = await res.json();
    setGastos(data);
    setLoading(false);
  }, [filtroMes, filtroCategoria]);

  useEffect(() => {
    fetchGastos();
  }, [fetchGastos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await fetch("/api/gastos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion, monto: Number(monto), categoria, fecha }),
    });

    setDescripcion("");
    setMonto("");
    setCategoria("alimentación");
    setFecha(new Date().toISOString().split("T")[0]);
    setSaving(false);
    setShowForm(false);
    fetchGastos();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este gasto?")) return;
    await fetch(`/api/gastos/${id}`, { method: "DELETE" });
    fetchGastos();
  };

  const total = gastos.reduce((s, g) => s + g.monto, 0);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Mis Gastos</h1>
            <p className="text-gray-500 text-sm">
              {gastos.length} gastos · Total: ${total.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
          >
            {showForm ? "Cancelar" : "+ Nuevo Gasto"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  placeholder="Ej: Supermercado"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                >
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar Gasto"}
            </button>
          </form>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="month"
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
            placeholder="Filtrar por mes"
          />
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">Todas las categorías</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
          {(filtroMes || filtroCategoria) && (
            <button
              onClick={() => {
                setFiltroMes("");
                setFiltroCategoria("");
              }}
              className="text-sm text-indigo-600 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* List */}
        {loading ? (
          <div className="text-gray-400 text-center py-10">Cargando...</div>
        ) : gastos.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-2">💸</p>
            <p>No hay gastos registrados</p>
          </div>
        ) : (
          <div className="space-y-2">
            {gastos.map((gasto) => (
              <div
                key={gasto.id}
                className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{gasto.descripcion}</p>
                  <p className="text-sm text-gray-500">
                    <span className="capitalize">{gasto.categoria}</span> ·{" "}
                    {new Date(gasto.fecha).toLocaleDateString("es")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-red-500 whitespace-nowrap">
                    -${gasto.monto.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDelete(gasto.id)}
                    className="text-gray-400 hover:text-red-500 transition text-sm"
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
