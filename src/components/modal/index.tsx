"use client";

import { ModalContext } from "@/providers/modal";
import { use } from "react";

export function ModalTicket() {
  const { handleModalVisible, ticket } = use(ModalContext);

  return (
    <section className="absolute w-full h-full bg-gray-900/80">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white shadow-md rounded w-4/5 md:w-1/2 max-w-2xl p-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg md:text-2xl">
              Detalhe do chamado
            </h1>
            <button
              className="bg-red-500 rounded p-1 px-2 text-white"
              onClick={handleModalVisible}
            >
              Fechar
            </button>
          </div>

          {/* Detalhes */}
          <div className="flex  gap-2 flex-wrap">
            <h2 className="font-bold">Nome:</h2>
            <p>{ticket?.ticket.name}</p>
          </div>

          <div className="flex flex-col  gap-2 flex-wrap">
            <h2 className="font-bold">Descriçãp:</h2>
            <p>{ticket?.ticket.description}</p>
          </div>

          <div className="w-full border-b-[1.5px] my-4"></div>
          <h1 className="font-bold text-lg mb-4">Detalhes do cliente</h1>
          <div className="flex  gap-2 flex-wrap">
            <h2 className="font-bold">Nome:</h2>
            <p>{ticket?.customer?.name}</p>
          </div>
          <div className="flex  gap-2 flex-wrap">
            <h2 className="font-bold">Telefone:</h2>
            <p>{ticket?.customer?.phone}</p>
          </div>
          <div className="flex  gap-2 flex-wrap">
            <h2 className="font-bold">E-mail:</h2>
            <p>{ticket?.customer?.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
