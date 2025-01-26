import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, email, phone } = await request.json();

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
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }

  return NextResponse.json({ message: "POST request" });
}
