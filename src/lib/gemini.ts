import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function chatWithGemini(
  prompt: string,
  context: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const systemPrompt = `Eres un asistente financiero inteligente. Ayudas a los usuarios a entender sus gastos, dar consejos de ahorro y analizar sus finanzas personales. Responde siempre en español, sé claro y conciso.

Aquí tienes el contexto financiero del usuario:
${context}

Responde la siguiente pregunta del usuario:`;

  const result = await model.generateContent(`${systemPrompt}\n\n${prompt}`);
  const response = result.response;
  return response.text();
}
