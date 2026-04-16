"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl p-8 w-full max-w-md relative z-10 glow-sm">
        <h1 className="text-2xl font-bold text-center mb-2 text-white">Iniciar Sesión</h1>
        <p className="text-[#8888a0] text-center mb-6 text-sm">Accede a tu cuenta de GastosIA</p>

        {error && (
          <div className="bg-[#ff4d6a]/10 text-[#ff4d6a] px-4 py-3 rounded-lg mb-4 text-sm border border-[#ff4d6a]/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#8888a0] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl focus:ring-2 focus:ring-[#6c5ce7]/50 focus:border-[#6c5ce7]/50 outline-none text-white placeholder-[#4a4a5a] text-sm"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8888a0] mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl focus:ring-2 focus:ring-[#6c5ce7]/50 focus:border-[#6c5ce7]/50 outline-none text-white placeholder-[#4a4a5a] text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6c5ce7] text-white py-2.5 rounded-xl hover:bg-[#7c6ef7] transition font-medium disabled:opacity-50 shadow-lg shadow-[#6c5ce7]/20"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-[#8888a0] mt-6">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-[#a29bfe] font-medium hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
