import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getUserId() {
  const session = await getServerSession(authOptions);
  return (session?.user as Record<string, unknown>)?.id as string | undefined;
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  const gasto = await prisma.gasto.findUnique({ where: { id } });
  if (!gasto || gasto.userId !== userId) {
    return NextResponse.json({ error: "Gasto no encontrado" }, { status: 404 });
  }

  await prisma.gasto.delete({ where: { id } });
  return NextResponse.json({ message: "Gasto eliminado" });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  const gasto = await prisma.gasto.findUnique({ where: { id } });
  if (!gasto || gasto.userId !== userId) {
    return NextResponse.json({ error: "Gasto no encontrado" }, { status: 404 });
  }

  const { descripcion, monto, categoria, fecha } = await req.json();

  const updated = await prisma.gasto.update({
    where: { id },
    data: {
      ...(descripcion && { descripcion }),
      ...(monto !== undefined && { monto: Number(monto) }),
      ...(categoria && { categoria }),
      ...(fecha && { fecha: new Date(fecha + "T12:00:00") }),
    },
  });

  return NextResponse.json(updated);
}
