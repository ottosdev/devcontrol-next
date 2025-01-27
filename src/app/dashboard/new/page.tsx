import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default async function NewTicketPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      customerId: formData.get("customer"),
    };

    if (!data.name || !data.description || !data.customerId) {
      return;
    }

    await prisma.ticket.create({
      data: {
        name: data.name as string,
        description: data.description as string,
        customerId: data.customerId as string,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex flex-col gap-1">
          <Link href="dahsboard" className="flex items-center gap-2 text-sm">
            <FiArrowLeft size={16} />
            Voltar
          </Link>
          <h1 className="font-bold text-3xl">Novo Chamado</h1>
        </div>
        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 text-lg font-medium" htmlFor="">
            Nome do chamado
          </label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full outline-none"
            placeholder="Digite o nome do chamado"
            name="name"
          />

          <label className="mb-1 text-lg font-medium" htmlFor="">
            Descreva o problema
          </label>
          <textarea
            className="border-2 p-2 rounded w-full h-24 resize-none outline-none"
            placeholder="Descreva um problema"
            name="description"
          ></textarea>

          {customers.length > 0 && (
            <>
              <label className="mb-1 text-lg font-medium" htmlFor="">
                Selecione o cliente
              </label>
              <select
                name="customer"
                className="border-2 p-2 rounded w-full h-11 resize-none outline-none bg-white"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Voce ainda nao tem nenhum cliente,{" "}
              <span className="text-blue-500 font-medium">
                Cadastrar um cliente
              </span>
            </Link>
          )}

          <button
            disabled={customers.length === 0}
            type="submit"
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400"
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
