interface CustomerProps {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export function CustomerCard({ customer }: CustomerProps) {
  return (
    <div className="flex flex-col bg-gray-200 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300 sm:hover:scale-95">
      <p>
        <a className="font-bold">Nome: </a> {customer.name}
      </p>
      <p>
        <a className="font-bold">E-mail: </a> {customer.email}
      </p>
      <p>
        <a className="font-bold">Telefone: </a> {customer.phone}
      </p>
      <button className="bg-red-500 text-white rounded px-4 self-start">
        Deletar
      </button>
    </div>
  );
}
