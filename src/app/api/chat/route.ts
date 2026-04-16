import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { chatWithGemini } from "@/lib/gemini";

async function getUserId() {
  const session = await getServerSession(authOptions);
  return (session?.user as Record<string, unknown>)?.id as string | undefined;
}

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const { mensaje } = await req.json();

    if (!mensaje) {
      return NextResponse.json({ error: "Mensaje es requerido" }, { status: 400 });
    }

    // Obtener contexto financiero del usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { salario: true, nombre: true },
    });

    const gastos = await prisma.gasto.findMany({
      where: { userId },
      orderBy: { fecha: "desc" },
      take: 100,
    });

    const salarioHistorial = await prisma.salarioHistorial.findMany({
      where: { userId },
      orderBy: { fecha: "desc" },
      take: 10,
    });

    // Calcular resumen
    const totalGastos = gastos.reduce((sum, g) => sum + g.monto, 0);
    const gastosPorCategoria: Record<string, number> = {};
    gastos.forEach((g) => {
      gastosPorCategoria[g.categoria] = (gastosPorCategoria[g.categoria] || 0) + g.monto;
    });

    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();
    const gastosMesActual = gastos.filter((g) => {
      const f = new Date(g.fecha);
      return f.getMonth() === mesActual && f.getFullYear() === anioActual;
    });
    const totalMesActual = gastosMesActual.reduce((sum, g) => sum + g.monto, 0);

    const context = `
Nombre del usuario: ${user?.nombre || "No especificado"}
Salario actual: ${user?.salario ? `$${user.salario.toLocaleString()}` : "No especificado"}
Total gastos registrados: $${totalGastos.toLocaleString()}
Gastos este mes: $${totalMesActual.toLocaleString()}
Gastos por categoría: ${JSON.stringify(gastosPorCategoria)}
Últimos gastos: ${JSON.stringify(gastos.slice(0, 20).map((g) => ({ desc: g.descripcion, monto: g.monto, cat: g.categoria, fecha: g.fecha })))}
Historial de salario e inflación: ${JSON.stringify(salarioHistorial.map((s) => ({ salario: s.salario, inflacion: s.inflacion, ajustado: s.salarioAjustado, fecha: s.fecha })))}
`;

    const respuesta = await chatWithGemini(mensaje, context);

    return NextResponse.json({ respuesta });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar mensaje" },
      { status: 500 }
    );
  }
}
