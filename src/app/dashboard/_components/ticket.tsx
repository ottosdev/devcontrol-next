"use client";
import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FiCheckSquare, FiFile } from "react-icons/fi";

export interface TicketProps {
  ticket: {
    id: string;
    name: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string | null;
    userId: string | null;
  };
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

export function Ticket({ ticket, customer }: TicketProps) {
  const { handleModalVisible, setDetailTicket } = use(ModalContext);
  const router = useRouter();
  async function handleCheckTicket() {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      alert(error);
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR").format(date); // Garante o formato DD/MM/YYYY
  };

  function handleOpenModal() {
    handleModalVisible();

    setDetailTicket({
      customer: customer,
      ticket: ticket,
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {formatDate(ticket.createdAt)}
        </td>
        <td className="text-left">
          <span
            className={`px-2 py-1 rounded ${
              ticket.status === "ABERTO" ? "bg-green-500" : "bg-red-500 "
            } text-white`}
          >
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-2" onClick={handleOpenModal}>
            <FiFile size={24} color="#3b82f6" />
          </button>
          <button onClick={handleCheckTicket}>
            <FiCheckSquare size={24} color="#131313" />
          </button>
        </td>
      </tr>
    </>
  );
}
