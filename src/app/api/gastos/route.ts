import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getUserId() {
  const session = await getServerSession(authOptions);
  return (session?.user as Record<string, unknown>)?.id as string | undefined;
}

export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const mes = searchParams.get("mes");
  const categoria = searchParams.get("categoria");

  const where: Record<string, unknown> = { userId };

  if (mes) {
    const [year, month] = mes.split("-").map(Number);
    where.fecha = {
      gte: new Date(year, month - 1, 1),
      lt: new Date(year, month, 1),
    };
  }

  if (categoria) where.categoria = categoria;

  const gastos = await prisma.gasto.findMany({
    where,
    orderBy: { fecha: "desc" },
  });

  return NextResponse.json(gastos);
}

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const { descripcion, monto, categoria, fecha } = await req.json();

    if (!descripcion || monto === undefined || !categoria) {
      return NextResponse.json(
        { error: "Descripción, monto y categoría son requeridos" },
        { status: 400 }
      );
    }

    const gasto = await prisma.gasto.create({
      data: {
        descripcion,
        monto: Number(monto),
        categoria,
        fecha: fecha ? new Date(fecha + "T12:00:00") : new Date(),
        userId,
      },
    });

    return NextResponse.json(gasto, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear gasto" }, { status: 500 });
  }
}
