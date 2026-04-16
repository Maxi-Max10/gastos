import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getUserId() {
  const session = await getServerSession(authOptions);
  return (session?.user as Record<string, unknown>)?.id as string | undefined;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { salario: true },
  });

  const historial = await prisma.salarioHistorial.findMany({
    where: { userId },
    orderBy: { fecha: "desc" },
  });

  return NextResponse.json({ salarioActual: user?.salario, historial });
}

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const { salario, inflacion } = await req.json();

    if (salario === undefined) {
      return NextResponse.json({ error: "Salario es requerido" }, { status: 400 });
    }

    const salarioNum = Number(salario);
    const inflacionNum = Number(inflacion || 0);
    const salarioAjustado = salarioNum / (1 + inflacionNum / 100);

    await prisma.user.update({
      where: { id: userId },
      data: { salario: salarioNum },
    });

    const registro = await prisma.salarioHistorial.create({
      data: {
        salario: salarioNum,
        inflacion: inflacionNum,
        salarioAjustado,
        userId,
      },
    });

    return NextResponse.json({
      salario: salarioNum,
      inflacion: inflacionNum,
      salarioAjustado,
      poderAdquisitivo: salarioAjustado,
      perdidaPorInflacion: salarioNum - salarioAjustado,
      registro,
    });
  } catch {
    return NextResponse.json({ error: "Error al actualizar salario" }, { status: 500 });
  }
}
