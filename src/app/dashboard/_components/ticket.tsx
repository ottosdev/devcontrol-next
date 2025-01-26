import { FiFile, FiTrash2 } from "react-icons/fi";

export function Ticket() {
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-200 duration-300">
        <td className="text-left pl-1">Mercado Otto</td>
        <td className="text-left hidden sm:table-cell">21/04/2025</td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">Aberto</span>
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
