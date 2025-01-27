import { FiFile, FiTrash2 } from "react-icons/fi";

interface TicketProps {
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
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.createdAt.toLocaleDateString()}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-2">
            <FiFile size={24} color="#3b82f6" />
          </button>
          <button>
            <FiTrash2 size={24} color="#EF4444" />
          </button>
        </td>
      </tr>
    </>
  );
}
