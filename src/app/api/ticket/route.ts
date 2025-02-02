import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  const findTicket = await prisma.ticket.findUnique({
    where: { id: id as string },
  });

  if (!findTicket) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  try {
    await prisma.ticket.update({
      where: { id: id as string },
      data: { status: "FECHADO" },
    });

    return NextResponse.json(
      { message: "Ticket updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating ticket", error: error },
      { status: 400 }
    );
  }
}
