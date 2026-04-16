"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente financiero con IA. Puedo ayudarte con:\n\n• Resumen de tus gastos\n• Consejos de ahorro\n• Análisis de categorías\n• Preguntas sobre tu situación financiera\n\n¿En qué puedo ayudarte?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: userMessage }),
      });

      const data = await res.json();

      if (data.respuesta) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.respuesta }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Lo siento, hubo un error. Intenta de nuevo." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error de conexión. Intenta de nuevo." },
      ]);
    }

    setLoading(false);
  };

  const quickQuestions = [
    "¿Cuál es mi resumen de gastos este mes?",
    "¿En qué categoría gasto más?",
    "¿Cómo puedo ahorrar más?",
    "¿Cómo me afecta la inflación?",
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
        <h1 className="text-xl font-bold mb-4 text-white">Chat con IA Financiera</h1>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-[#6c5ce7] text-white"
                    : "bg-[#12121a] border border-[#1e1e2e] text-[#e4e4ed]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl px-4 py-3 text-sm text-[#8888a0]">
                <span className="animate-pulse">Pensando...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="text-xs bg-[#6c5ce7]/10 text-[#a29bfe] px-3 py-1.5 rounded-full hover:bg-[#6c5ce7]/20 transition border border-[#6c5ce7]/20"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregúntame sobre tus finanzas..."
            className="flex-1 px-4 py-3 bg-[#12121a] border border-[#1e1e2e] rounded-xl focus:ring-2 focus:ring-[#6c5ce7]/50 outline-none text-sm text-white placeholder-[#4a4a5a]"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-[#6c5ce7] text-white px-5 py-3 rounded-xl hover:bg-[#7c6ef7] transition font-medium disabled:opacity-50 text-sm"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
