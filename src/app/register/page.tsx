"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Error al registrarse");
      setLoading(false);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06060b] px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[15%] right-[20%] w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-[150px]" />
        <div className="absolute top-[20%] left-[25%] w-[400px] h-[400px] bg-[#6d28d9]/4 rounded-full blur-[120px]" />
      </div>

      <div className="animate-scale-in w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Monetra</span>
          </Link>
        </div>

        <div className="stat-card !p-8 glow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-1.5">Crear cuenta</h1>
            <p className="text-[#7a7a95] text-sm">Empezá a controlar tus gastos hoy</p>
          </div>

          {error && (
            <div className="animate-scale-in flex items-center gap-2.5 bg-[#ef4444]/8 text-[#f87171] px-4 py-3 rounded-xl mb-6 text-sm border border-[#ef4444]/15">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#7a7a95] mb-2">Nombre</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a60]" />
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="input-field !pl-11"
                  placeholder="Tu nombre"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7a7a95] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a60]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field !pl-11"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#7a7a95] mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a4a60]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="input-field !pl-11"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 text-sm">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  Crear cuenta
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1a1a2e] text-center">
            <p className="text-sm text-[#7a7a95]">
              ¿Ya tenés cuenta?{" "}
              <Link href="/login" className="text-[#a78bfa] font-medium hover:text-[#c4b5fd] transition-colors">
                Iniciá sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
