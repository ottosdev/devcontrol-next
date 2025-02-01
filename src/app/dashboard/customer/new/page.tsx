import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import Link from "next/link";
import { redirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { NewCustomerForm } from "./_components/new-customer-form";

export default async function NewCustomerPage() {
  const session = await getServerSession(authOptions);

  // if (!session || !session.user) {
  //   redirect("/");
  // }

  return (
    <Container>
      <div className="flex flex-col gap-1">
        <Link
          href="dahsboard/customer"
          className="flex items-center gap-2 text-sm"
        >
          <FiArrowLeft size={16} />
          Voltar
        </Link>
        <h1 className="font-bold text-3xl">Novo Cliente</h1>
      </div>

      <main>
        <NewCustomerForm userId={session?.user.id} />
      </main>
    </Container>
  );
}
