import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { status: 401, body: "Unauthorized" };
  }

  const { id } = await req.json();

  const findTicket = await prisma.ticket.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return { status: 404, body: "Ticket not found" };
  }

  try {
    await prisma.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json({ message: "Ticket updated" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error update ticket" },
      { status: 400 }
    );
  }
}
