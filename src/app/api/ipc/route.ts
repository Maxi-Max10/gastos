import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const res = await fetch(
      "https://api.argentinadatos.com/v1/finanzas/indices/inflacion",
      { next: { revalidate: 86400 } } // cache 24h
    );

    if (!res.ok) throw new Error("Error al obtener datos de IPC");

    const data: { fecha: string; valor: number }[] = await res.json();

    // Get last 6 months of data
    const ultimos = data.slice(-6);

    return NextResponse.json({ ipc: ultimos });
  } catch {
    return NextResponse.json({ error: "No se pudo obtener el IPC" }, { status: 500 });
  }
}
