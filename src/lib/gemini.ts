import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function chatWithGemini(
  prompt: string,
  context: string
): Promise<string> {
  const systemInstruction = `Eres un asistente financiero inteligente. Ayudas a los usuarios a entender sus gastos, dar consejos de ahorro y analizar sus finanzas personales. Responde siempre en español, sé claro y conciso.

Aquí tienes el contexto financiero del usuario:
${context}

Responde la siguiente pregunta del usuario:`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { systemInstruction, maxOutputTokens: 2500 },
  });

  return response.text || "";
}
