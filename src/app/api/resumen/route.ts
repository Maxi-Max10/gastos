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

  const gastos = await prisma.gasto.findMany({
    where: { userId },
    orderBy: { fecha: "desc" },
  });

  const totalGastos = gastos.reduce((sum, g) => sum + g.monto, 0);

  const gastosPorCategoria: Record<string, number> = {};
  gastos.forEach((g) => {
    gastosPorCategoria[g.categoria] = (gastosPorCategoria[g.categoria] || 0) + g.monto;
  });

  // Gastos por mes (últimos 6 meses)
  const gastosPorMes: Record<string, number> = {};
  const hoy = new Date();
  for (let i = 5; i >= 0; i--) {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
    const key = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
    gastosPorMes[key] = 0;
  }
  gastos.forEach((g) => {
    const f = new Date(g.fecha);
    const key = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, "0")}`;
    if (gastosPorMes[key] !== undefined) {
      gastosPorMes[key] += g.monto;
    }
  });

  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();
  const gastosMesActual = gastos
    .filter((g) => {
      const f = new Date(g.fecha);
      return f.getMonth() === mesActual && f.getFullYear() === anioActual;
    })
    .reduce((sum, g) => sum + g.monto, 0);

  const salario = user?.salario || 0;
  const disponible = salario - gastosMesActual;

  return NextResponse.json({
    totalGastos,
    gastosMesActual,
    salario,
    disponible,
    gastosPorCategoria,
    gastosPorMes,
    totalRegistros: gastos.length,
  });
}
