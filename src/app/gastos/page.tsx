"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import {
  Plus, X, Search, Filter, Trash2, Calendar, Tag, FileText, DollarSign,
  Loader2, Receipt, ArrowDownCircle
} from "lucide-react";

interface Gasto {
  id: string;
  descripcion: string;
  monto: number;
  categoria: string;
  fecha: string;
}

const CATEGORIAS = [
  "alimentación", "transporte", "vivienda", "entretenimiento",
  "salud", "educación", "ropa", "servicios", "ahorro", "otro",
];

const CATEGORY_ICONS: Record<string, string> = {
  alimentación: "🍽️", transporte: "🚗", vivienda: "🏠", entretenimiento: "🎬",
  salud: "💊", educación: "📚", ropa: "👕", servicios: "⚡", ahorro: "🏦", otro: "📦",
};

export default function GastosPage() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("alimentación");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);

  const fetchGastos = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filtroMes) params.set("mes", filtroMes);
      if (filtroCategoria) params.set("categoria", filtroCategoria);
      const res = await fetch(`/api/gastos?${params}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setGastos(data);
    } catch {
      setGastos([]);
    } finally {
      setLoading(false);
    }
  }, [filtroMes, filtroCategoria]);

  useEffect(() => { fetchGastos(); }, [fetchGastos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion, monto: Number(monto), categoria, fecha }),
      });
      if (!res.ok) throw new Error();
      setDescripcion("");
      setMonto("");
      setCategoria("alimentación");
      setFecha(new Date().toISOString().split("T")[0]);
      setShowForm(false);
      fetchGastos();
    } catch {
      alert("Error al guardar el gasto");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este gasto?")) return;
    try {
      const res = await fetch(`/api/gastos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      fetchGastos();
    } catch {
      alert("Error al eliminar el gasto");
    }
  };

  const total = gastos.reduce((s, g) => s + g.monto, 0);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Mis Gastos</h1>
            <div className="flex items-center gap-3 text-sm text-[#7a7a95]">
              <span className="flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5" />
                {gastos.length} registros
              </span>
              <span className="w-1 h-1 rounded-full bg-[#2a2a3e]" />
              <span className="flex items-center gap-1.5 text-[#f87171] font-medium">
                <ArrowDownCircle className="w-3.5 h-3.5" />
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={showForm ? "btn-secondary text-sm !px-4 !py-2.5" : "btn-primary text-sm !px-5 !py-2.5"}
          >
            {showForm ? (
              <><X className="w-4 h-4" /> Cancelar</>
            ) : (
              <><Plus className="w-4 h-4" /> Nuevo Gasto</>
            )}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="animate-slide-up stat-card !p-6 mb-8">
            <h3 className="text-sm font-medium text-[#7a7a95] uppercase tracking-wider mb-5">Registrar Gasto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#7a7a95] mb-2">Descripción</label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a60]" />
                  <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                    className="input-field !pl-11 !py-2.5 text-sm"
                    placeholder="Ej: Supermercado"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7a7a95] mb-2">Monto ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a60]" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                    className="input-field !pl-11 !py-2.5 text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7a7a95] mb-2">Categoría</label>
                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a60]" />
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="input-field !pl-11 !py-2.5 text-sm appearance-none cursor-pointer"
                  >
                    {CATEGORIAS.map((c) => (
                      <option key={c} value={c}>
                        {CATEGORY_ICONS[c]} {c.charAt(0).toUpperCase() + c.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7a7a95] mb-2">Fecha</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a60]" />
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="input-field !pl-11 !py-2.5 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button type="submit" disabled={saving} className="btn-primary text-sm !px-6 !py-2.5">
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
                ) : (
                  <><Plus className="w-4 h-4" /> Guardar Gasto</>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-[#7a7a95] text-sm">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtrar:</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a4a60]" />
            <input
              type="month"
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
              className="pl-9 pr-3 py-2 bg-[#111119] border border-[#1a1a2e] rounded-lg text-sm text-white focus:border-[#7c3aed]/30 focus:outline-none transition-colors"
              placeholder="Mes"
            />
          </div>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="px-3 py-2 bg-[#111119] border border-[#1a1a2e] rounded-lg text-sm text-white focus:border-[#7c3aed]/30 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="">Todas las categorías</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_ICONS[c]} {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
          {(filtroMes || filtroCategoria) && (
            <button
              onClick={() => { setFiltroMes(""); setFiltroCategoria(""); }}
              className="btn-ghost text-xs !px-3 !py-1.5 text-[#a78bfa]"
            >
              <X className="w-3 h-3" />
              Limpiar
            </button>
          )}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-[#7a7a95]">
            <Loader2 className="w-5 h-5 animate-spin" />
            Cargando gastos...
          </div>
        ) : gastos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-[#111119] border border-[#1a1a2e] flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-8 h-8 text-[#4a4a60]" />
            </div>
            <p className="text-[#7a7a95] font-medium mb-1">No hay gastos registrados</p>
            <p className="text-sm text-[#4a4a60]">Hacé clic en &quot;Nuevo Gasto&quot; para empezar</p>
          </div>
        ) : (
          <div className="space-y-2">
            {gastos.map((gasto, i) => (
              <div
                key={gasto.id}
                className="animate-fade-in stat-card !p-4 !rounded-xl flex items-center justify-between gap-4 group"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-[#1a1a2e] flex items-center justify-center text-lg flex-shrink-0">
                    {CATEGORY_ICONS[gasto.categoria] || "📦"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate text-sm">{gasto.descripcion}</p>
                    <p className="text-xs text-[#7a7a95] flex items-center gap-1.5 mt-0.5">
                      <span className="capitalize">{gasto.categoria}</span>
                      <span className="w-1 h-1 rounded-full bg-[#2a2a3e]" />
                      {new Date(gasto.fecha).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-[#f87171] whitespace-nowrap tabular-nums">
                    -${gasto.monto.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDelete(gasto.id)}
                    className="btn-danger opacity-0 group-hover:opacity-100 !p-2"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
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
