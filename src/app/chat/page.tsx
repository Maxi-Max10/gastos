"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ReactMarkdown from "react-markdown";
import { Send, Sparkles, User, Loader2, MessageSquareText, Lightbulb } from "lucide-react";

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

  useEffect(() => { scrollToBottom(); }, [messages]);

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
        setMessages((prev) => [...prev, { role: "assistant", content: data.error || "Lo siento, hubo un error. Intenta de nuevo." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    }

    setLoading(false);
  };

  const quickQuestions = [
    { text: "¿Cuál es mi resumen de gastos?", icon: "📊" },
    { text: "¿En qué categoría gasto más?", icon: "🏷️" },
    { text: "¿Cómo puedo ahorrar más?", icon: "💡" },
    { text: "¿Cómo me afecta la inflación?", icon: "📈" },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
        {/* Header */}
        <div className="flex items-center gap-3 py-5 border-b border-[#1a1a2e]/50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] flex items-center justify-center shadow-lg shadow-purple-500/20">
            <MessageSquareText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Asistente Financiero</h1>
            <p className="text-xs text-[#7a7a95] flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#34d399]"></span>
              </span>
              Powered by Gemini
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 space-y-5 pr-1">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed]/20 to-[#7c3aed]/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#7c3aed]/15">
                  <Sparkles className="w-4 h-4 text-[#a78bfa]" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#7c3aed] text-white shadow-lg shadow-[#7c3aed]/15 rounded-br-md whitespace-pre-wrap"
                    : "bg-[#111119] border border-[#1a1a2e] text-[#e8e8f0] rounded-bl-md chat-markdown"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-[#1a1a25] border border-[#1a1a2e] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-[#7a7a95]" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed]/20 to-[#7c3aed]/10 flex items-center justify-center flex-shrink-0 border border-[#7c3aed]/15">
                <Sparkles className="w-4 h-4 text-[#a78bfa] animate-pulse" />
              </div>
              <div className="bg-[#111119] border border-[#1a1a2e] rounded-2xl rounded-bl-md px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-[#a78bfa] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-[#a78bfa] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-[#a78bfa] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-3.5 h-3.5 text-[#7a7a95]" />
              <span className="text-xs text-[#7a7a95] font-medium uppercase tracking-wider">Sugerencias</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q.text}
                  onClick={() => setInput(q.text)}
                  className="text-left text-xs bg-[#111119] text-[#a78bfa] p-3 rounded-xl hover:bg-[#16161f] transition-all border border-[#1a1a2e] hover:border-[#7c3aed]/20 group"
                >
                  <span className="text-base mb-1.5 block">{q.icon}</span>
                  <span className="text-[#7a7a95] group-hover:text-[#a78bfa] transition-colors">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="py-4 border-t border-[#1a1a2e]/50">
          <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Preguntá sobre tus finanzas..."
                className="input-field !pr-4 !py-3.5 text-sm"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary !p-3.5 !rounded-xl flex-shrink-0"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
          <p className="text-[10px] text-[#4a4a60] text-center mt-2">
            Las respuestas de IA pueden contener errores. Verificá información financiera importante.
          </p>
        </div>
      </div>
    </>
  );
}
