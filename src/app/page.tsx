import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between max-w-6xl mx-auto px-6 py-6">
        <span className="text-xl font-bold gradient-text">GastosIA</span>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-[#8888a0] hover:text-white transition px-4 py-2">
            Iniciar sesión
          </Link>
          <Link href="/register" className="text-sm bg-[#6c5ce7] hover:bg-[#7c6ef7] text-white px-5 py-2 rounded-xl transition font-medium glow-sm">
            Comenzar gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-[#6c5ce7]/10 border border-[#6c5ce7]/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-[#6c5ce7] rounded-full animate-pulse" />
          <span className="text-xs text-[#a29bfe] font-medium">Potenciado por Google Gemini</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="text-white">Control de gastos</span>
          <br />
          <span className="gradient-text">con inteligencia artificial</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#8888a0] max-w-2xl mx-auto mb-10 leading-relaxed">
          Registra tus gastos, ajusta por inflación, y recibe análisis y consejos personalizados con IA.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/register" className="bg-[#6c5ce7] hover:bg-[#7c6ef7] text-white px-8 py-3.5 rounded-xl font-semibold transition shadow-lg shadow-[#6c5ce7]/20 glow">
            Crear cuenta gratis
          </Link>
          <Link href="/login" className="border border-[#1e1e2e] text-[#8888a0] hover:text-white hover:border-[#2e2e3e] px-8 py-3.5 rounded-xl font-semibold transition bg-[#12121a]">
            Ya tengo cuenta
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl p-7 hover:border-[#6c5ce7]/30 transition-all group hover:glow-sm">
            <div className="w-12 h-12 bg-[#6c5ce7]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#6c5ce7]/20 transition">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Control de Gastos</h3>
            <p className="text-sm text-[#8888a0] leading-relaxed">
              Registra, categoriza y filtra todos tus gastos. Visualiza a dónde va tu dinero.
            </p>
          </div>

          <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl p-7 hover:border-[#00d2a0]/30 transition-all group">
            <div className="w-12 h-12 bg-[#00d2a0]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#00d2a0]/20 transition">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Ajuste por Inflación</h3>
            <p className="text-sm text-[#8888a0] leading-relaxed">
              Ingresa tu salario y la inflación. Conoce tu poder adquisitivo real al instante.
            </p>
          </div>

          <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl p-7 hover:border-[#a29bfe]/30 transition-all group">
            <div className="w-12 h-12 bg-[#a29bfe]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#a29bfe]/20 transition">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Chat con IA</h3>
            <p className="text-sm text-[#8888a0] leading-relaxed">
              Pregúntale a Gemini sobre tus finanzas. Obtén resúmenes y consejos personalizados.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-[#1e1e2e]">
        <p className="text-xs text-[#8888a0]/50">GastosIA &copy; 2026 · Potenciado por Google Gemini</p>
      </footer>
    </div>
  );
}
