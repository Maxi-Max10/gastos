"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email o contraseña incorrectos");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06060b] px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[25%] w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] right-[25%] w-[400px] h-[400px] bg-[#3b82f6]/4 rounded-full blur-[120px]" />
      </div>

      <div className="animate-scale-in w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">GastosIA</span>
          </Link>
        </div>

        {/* Card */}
        <div className="stat-card !p-8 glow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-1.5">Bienvenido de vuelta</h1>
            <p className="text-[#7a7a95] text-sm">Ingresá tus datos para continuar</p>
          </div>

          {error && (
            <div className="animate-scale-in flex items-center gap-2.5 bg-[#ef4444]/8 text-[#f87171] px-4 py-3 rounded-xl mb-6 text-sm border border-[#ef4444]/15">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="input-field !pl-11"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 text-sm">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1a1a2e] text-center">
            <p className="text-sm text-[#7a7a95]">
              ¿No tenés cuenta?{" "}
              <Link href="/register" className="text-[#a78bfa] font-medium hover:text-[#c4b5fd] transition-colors">
                Registrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
