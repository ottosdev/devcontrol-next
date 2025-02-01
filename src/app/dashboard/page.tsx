import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Ticket } from "./_components/ticket";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // if (!session || !session.user) {
  //   redirect("/");
  // }

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: session?.user.id,
      status: "ABERTO",
    },
    include: {
      customer: true,
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            href="/dashboard/new"
            className="bg-blue-500 px-4 py-1 rounded text-white"
          >
            Abrir chamado
          </Link>
        </div>

        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">Cliente</th>
              <th className="font-medium text-left hidden sm:table-cell">
                Data Cadastro
              </th>
              <th className="font-medium text-left">Status</th>
              <th className="font-medium text-left">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <Ticket
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>
        {!tickets.length && (
          <h1 className="px-2 md:px-0 text-gray-600">
            Nenhum ticket aberto foi encontrado
          </h1>
        )}
      </main>
    </Container>
  );
}
