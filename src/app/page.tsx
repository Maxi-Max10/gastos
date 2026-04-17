import Link from "next/link";
import { Sparkles, TrendingUp, Brain, ShieldCheck, ArrowRight, Zap, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#06060b] relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-30%] left-[-15%] w-[700px] h-[700px] bg-[#7c3aed]/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-25%] right-[-10%] w-[500px] h-[500px] bg-[#3b82f6]/6 rounded-full blur-[140px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7c3aed]/3 rounded-full blur-[200px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        {/* Floating tech shapes */}
        {/* Circuit lines */}
        <svg className="absolute top-[10%] left-[5%] w-72 h-72 opacity-[0.06] animate-float-slow" viewBox="0 0 200 200" fill="none">
          <path d="M20 100h60l20-20h40l20 20h40" stroke="#7c3aed" strokeWidth="1.5" />
          <path d="M100 20v60l20 20v40l-20 20v40" stroke="#7c3aed" strokeWidth="1.5" />
          <circle cx="80" cy="100" r="4" fill="#7c3aed" />
          <circle cx="120" cy="80" r="4" fill="#7c3aed" />
          <circle cx="140" cy="100" r="4" fill="#7c3aed" />
          <circle cx="100" cy="80" r="3" fill="#a78bfa" />
          <circle cx="100" cy="140" r="3" fill="#a78bfa" />
          <rect x="55" y="55" width="90" height="90" rx="8" stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="4 4" />
        </svg>

        {/* Hexagonal grid */}
        <svg className="absolute top-[15%] right-[8%] w-80 h-80 opacity-[0.05] animate-float-reverse" viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 170,45 170,115 100,150 30,115 30,45" stroke="#3b82f6" strokeWidth="1" />
          <polygon points="100,30 150,55 150,105 100,130 50,105 50,55" stroke="#3b82f6" strokeWidth="0.8" />
          <polygon points="100,50 130,65 130,95 100,110 70,95 70,65" stroke="#3b82f6" strokeWidth="0.6" />
          <line x1="100" y1="10" x2="100" y2="50" stroke="#3b82f6" strokeWidth="0.5" />
          <line x1="170" y1="45" x2="130" y2="65" stroke="#3b82f6" strokeWidth="0.5" />
          <line x1="30" y1="45" x2="70" y2="65" stroke="#3b82f6" strokeWidth="0.5" />
          <circle cx="100" cy="80" r="6" stroke="#60a5fa" strokeWidth="0.8" fill="none" />
          <circle cx="100" cy="80" r="2" fill="#60a5fa" />
        </svg>

        {/* Chip / processor shape */}
        <svg className="absolute bottom-[20%] left-[8%] w-64 h-64 opacity-[0.05] animate-float-medium" viewBox="0 0 200 200" fill="none">
          <rect x="50" y="50" width="100" height="100" rx="10" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="65" y="65" width="70" height="70" rx="5" stroke="#a78bfa" strokeWidth="0.8" />
          {/* Pins top */}
          <line x1="75" y1="50" x2="75" y2="30" stroke="#7c3aed" strokeWidth="1" />
          <line x1="100" y1="50" x2="100" y2="30" stroke="#7c3aed" strokeWidth="1" />
          <line x1="125" y1="50" x2="125" y2="30" stroke="#7c3aed" strokeWidth="1" />
          {/* Pins bottom */}
          <line x1="75" y1="150" x2="75" y2="170" stroke="#7c3aed" strokeWidth="1" />
          <line x1="100" y1="150" x2="100" y2="170" stroke="#7c3aed" strokeWidth="1" />
          <line x1="125" y1="150" x2="125" y2="170" stroke="#7c3aed" strokeWidth="1" />
          {/* Pins left */}
          <line x1="50" y1="75" x2="30" y2="75" stroke="#7c3aed" strokeWidth="1" />
          <line x1="50" y1="100" x2="30" y2="100" stroke="#7c3aed" strokeWidth="1" />
          <line x1="50" y1="125" x2="30" y2="125" stroke="#7c3aed" strokeWidth="1" />
          {/* Pins right */}
          <line x1="150" y1="75" x2="170" y2="75" stroke="#7c3aed" strokeWidth="1" />
          <line x1="150" y1="100" x2="170" y2="100" stroke="#7c3aed" strokeWidth="1" />
          <line x1="150" y1="125" x2="170" y2="125" stroke="#7c3aed" strokeWidth="1" />
          <circle cx="100" cy="100" r="12" stroke="#a78bfa" strokeWidth="0.8" fill="none" />
          <circle cx="100" cy="100" r="4" fill="#7c3aed" opacity="0.5" />
        </svg>

        {/* Data flow / network */}
        <svg className="absolute bottom-[15%] right-[5%] w-72 h-72 opacity-[0.05] animate-float-slow" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="8" fill="#10b981" opacity="0.4" />
          <circle cx="100" cy="100" r="25" stroke="#10b981" strokeWidth="0.6" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="50" stroke="#10b981" strokeWidth="0.4" strokeDasharray="5 5" />
          <circle cx="100" cy="100" r="75" stroke="#10b981" strokeWidth="0.3" strokeDasharray="7 7" />
          {/* Nodes */}
          <circle cx="50" cy="100" r="4" fill="#34d399" />
          <circle cx="150" cy="100" r="4" fill="#34d399" />
          <circle cx="100" cy="50" r="4" fill="#34d399" />
          <circle cx="100" cy="150" r="4" fill="#34d399" />
          <circle cx="65" cy="65" r="3" fill="#34d399" opacity="0.6" />
          <circle cx="135" cy="65" r="3" fill="#34d399" opacity="0.6" />
          <circle cx="65" cy="135" r="3" fill="#34d399" opacity="0.6" />
          <circle cx="135" cy="135" r="3" fill="#34d399" opacity="0.6" />
          {/* Connection lines */}
          <line x1="50" y1="100" x2="100" y2="100" stroke="#10b981" strokeWidth="0.5" />
          <line x1="150" y1="100" x2="100" y2="100" stroke="#10b981" strokeWidth="0.5" />
          <line x1="100" y1="50" x2="100" y2="100" stroke="#10b981" strokeWidth="0.5" />
          <line x1="100" y1="150" x2="100" y2="100" stroke="#10b981" strokeWidth="0.5" />
          <line x1="65" y1="65" x2="100" y2="100" stroke="#10b981" strokeWidth="0.3" />
          <line x1="135" y1="65" x2="100" y2="100" stroke="#10b981" strokeWidth="0.3" />
          <line x1="65" y1="135" x2="100" y2="100" stroke="#10b981" strokeWidth="0.3" />
          <line x1="135" y1="135" x2="100" y2="100" stroke="#10b981" strokeWidth="0.3" />
        </svg>

        {/* Binary / code block */}
        <svg className="absolute top-[55%] left-[15%] w-48 h-48 opacity-[0.04] animate-float-reverse" viewBox="0 0 200 200" fill="none">
          <text x="20" y="40" fill="#a78bfa" fontSize="12" fontFamily="monospace">01101001</text>
          <text x="20" y="60" fill="#a78bfa" fontSize="12" fontFamily="monospace">10010110</text>
          <text x="20" y="80" fill="#7c3aed" fontSize="12" fontFamily="monospace">11001010</text>
          <text x="20" y="100" fill="#a78bfa" fontSize="12" fontFamily="monospace">01010111</text>
          <text x="20" y="120" fill="#7c3aed" fontSize="12" fontFamily="monospace">10110100</text>
          <text x="20" y="140" fill="#a78bfa" fontSize="12" fontFamily="monospace">01001101</text>
          <text x="20" y="160" fill="#7c3aed" fontSize="12" fontFamily="monospace">11100011</text>
        </svg>

        {/* Brackets / code symbol */}
        <svg className="absolute top-[45%] right-[12%] w-40 h-40 opacity-[0.05] animate-float-medium" viewBox="0 0 200 200" fill="none">
          <text x="30" y="110" fill="#60a5fa" fontSize="80" fontFamily="monospace" fontWeight="300">{"{ }"}</text>
        </svg>

        {/* Small floating dots */}
        <div className="absolute top-[20%] left-[30%] w-2 h-2 rounded-full bg-[#7c3aed] opacity-20 animate-pulse" />
        <div className="absolute top-[35%] right-[25%] w-1.5 h-1.5 rounded-full bg-[#3b82f6] opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[70%] left-[40%] w-1 h-1 rounded-full bg-[#10b981] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] right-[35%] w-2 h-2 rounded-full bg-[#a78bfa] opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[80%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#60a5fa] opacity-15 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[25%] left-[60%] w-1 h-1 rounded-full bg-[#34d399] opacity-20 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">GastosIA</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-ghost text-sm">
            Iniciar sesión
          </Link>
          <Link href="/register" className="btn-primary text-sm !px-5 !py-2.5">
            <Zap className="w-4 h-4" />
            Comenzar gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="animate-fade-in inline-flex items-center gap-2 bg-[#7c3aed]/8 border border-[#7c3aed]/15 rounded-full px-5 py-2 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7c3aed] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a78bfa]"></span>
          </span>
          <span className="text-xs text-[#a78bfa] font-medium tracking-wide">Potenciado por Google Gemini 2.0</span>
        </div>

        <h1 className="animate-slide-up text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05]">
          <span className="text-white">Tus finanzas,</span>
          <br />
          <span className="gradient-text">bajo control total</span>
        </h1>

        <p className="animate-slide-up text-lg sm:text-xl text-[#7a7a95] max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Registra gastos, analiza tu salario vs inflación y recibí consejos financieros personalizados con inteligencia artificial.
        </p>

        <div className="animate-slide-up flex gap-4 justify-center flex-wrap">
          <Link href="/register" className="btn-primary text-base !px-8 !py-4 group">
            Crear cuenta gratis
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/login" className="btn-secondary text-base !px-8 !py-4">
            Ya tengo cuenta
          </Link>
        </div>

        {/* Trust badges */}
        <div className="animate-fade-in mt-16 flex items-center justify-center gap-8 text-[#4a4a60] text-xs">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Datos encriptados</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#2a2a3e]" />
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            <span>100% gratuito</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#2a2a3e]" />
          <div className="flex items-center gap-1.5">
            <Brain className="w-4 h-4" />
            <span>IA avanzada</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Todo lo que necesitás
          </h2>
          <p className="text-[#7a7a95] text-lg max-w-xl mx-auto">
            Herramientas inteligentes para tomar mejores decisiones financieras
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="stat-card group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed]/15 to-[#7c3aed]/5 flex items-center justify-center mb-6 group-hover:from-[#7c3aed]/25 group-hover:to-[#7c3aed]/10 transition-all duration-300">
              <BarChart3 className="w-7 h-7 text-[#a78bfa]" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2.5">Control de Gastos</h3>
            <p className="text-sm text-[#7a7a95] leading-relaxed">
              Registrá, categorizá y filtrá todos tus gastos. Visualizá a dónde va tu dinero con gráficos claros.
            </p>
          </div>

          <div className="stat-card group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10b981]/15 to-[#10b981]/5 flex items-center justify-center mb-6 group-hover:from-[#10b981]/25 group-hover:to-[#10b981]/10 transition-all duration-300">
              <TrendingUp className="w-7 h-7 text-[#34d399]" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2.5">Ajuste por Inflación</h3>
            <p className="text-sm text-[#7a7a95] leading-relaxed">
              Ingresá tu salario y la tasa de inflación. Conocé tu poder adquisitivo real al instante.
            </p>
          </div>

          <div className="stat-card group cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3b82f6]/15 to-[#3b82f6]/5 flex items-center justify-center mb-6 group-hover:from-[#3b82f6]/25 group-hover:to-[#3b82f6]/10 transition-all duration-300">
              <Brain className="w-7 h-7 text-[#60a5fa]" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2.5">Chat con IA</h3>
            <p className="text-sm text-[#7a7a95] leading-relaxed">
              Preguntale a Gemini sobre tus finanzas. Obtené resúmenes y consejos personalizados en tiempo real.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <div className="stat-card text-center !p-12 glow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Empezá a controlar tus gastos hoy
          </h2>
          <p className="text-[#7a7a95] mb-8 max-w-md mx-auto">
            Creá tu cuenta en segundos y descubrí el poder de la IA aplicada a tus finanzas personales.
          </p>
          <Link href="/register" className="btn-primary text-base !px-8 !py-4 group">
            Comenzar ahora
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1a1a2e]/50 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold gradient-text">GastosIA</span>
          </div>
          <p className="text-xs text-[#4a4a60]">&copy; 2026 · Potenciado por Google Gemini</p>
        </div>
      </footer>
    </div>
  );
}
