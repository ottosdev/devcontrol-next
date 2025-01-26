import heroImg from "@/assets/hero.svg";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">
        Atendimentos, clientes
      </h1>
      <Image
        src={heroImg}
        alt="Hero"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
