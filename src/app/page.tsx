import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight">
          Gastos<span className="text-yellow-300">IA</span>
        </h1>
        <p className="text-xl sm:text-2xl mb-4 text-white/90 max-w-2xl mx-auto">
          Tu asistente financiero inteligente. Controla gastos, ajusta por inflación y recibe consejos con IA.
        </p>
        <p className="text-lg mb-10 text-white/70">
          Potenciado por Google Gemini
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            Crear cuenta gratis
          </Link>
          <Link
            href="/login"
            className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-white/10 transition"
          >
            Iniciar sesión
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold mb-2">Control de Gastos</h3>
            <p className="text-white/80 text-sm">
              Registra, categoriza y visualiza todos tus gastos en tiempo real.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-lg font-semibold mb-2">Ajuste por Inflación</h3>
            <p className="text-white/80 text-sm">
              Ingresa tu salario y ve cómo la inflación afecta tu poder adquisitivo.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold mb-2">Chat con IA</h3>
            <p className="text-white/80 text-sm">
              Pregúntale a Gemini sobre tus finanzas y recibe resúmenes y consejos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
