"use client";

import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email é obrigatório"),
  phone: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleRegister(data: FormData) {
    console.log(data);
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegister)}
    >
      <label className="mb-1 text-lg font-medium" htmlFor="">
        Nome Completo
      </label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />
      <section className="flex flex-col gap-2 mt-2 sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium" htmlFor="">
            E-mail
          </label>
          <Input
            type="text"
            name="email"
            placeholder="Digite o email"
            error={errors.email?.message}
            register={register}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 text-lg font-medium" htmlFor="">
            Telefone
          </label>
          <Input
            type="string"
            name="phone"
            placeholder="Digite o telefone"
            error={errors.phone?.message}
            register={register}
          />
        </div>
      </section>
      <button
        type="submit"
        className="bg-blue-500 my-4 rounded text-white font-bold h-11"
      >
        Cadastrar
      </button>
    </form>
  );
}
