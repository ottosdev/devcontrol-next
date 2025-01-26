import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded-lg text-white flex gap-2">
        <Link href="/dashboard">Chamados</Link>
        <Link href="/dashboard/customer">Clientes</Link>
      </header>
    </Container>
  );
}
