import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, email, phone } = await request.json();

  const findTicket = await prisma.ticket.findFirst({
    where: {
      customerId: session.user.id,
    },
  });

  if (findTicket) {
    return NextResponse.json(
      { message: "Falha ao deletar Customer" },
      { status: 400 }
    );
  }

  try {
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      message: "Cliente Cadastrado com sucesso!",
      customer,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  try {
    await prisma.customer.delete({
      where: {
        id: userId as string,
      },
    });

    revalidatePath("/dashboard/customer");
    return NextResponse.json({
      message: "Cliente deletado com sucesso!",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Faiel delete customer" + error },
      { status: 400 }
    );
  }
}
