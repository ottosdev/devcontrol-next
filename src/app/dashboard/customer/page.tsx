import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CustomerCard } from "./_components/card";

export default async function CustomerPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus Clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="rounded bg-blue-500 px-4 py-1 text-white"
          >
            Novo Cliente
          </Link>
        </div>
        <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <CustomerCard />
          <CustomerCard />
          <CustomerCard />
          <CustomerCard />
        </section>
      </main>
    </Container>
  );
}
