export function CustomerCard() {
  return (
    <div className="flex flex-col bg-gray-200 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300 sm:hover:scale-95">
      <p>
        <a className="font-bold">Nome: </a> Otto de Souza
      </p>
      <p>
        <a className="font-bold">E-mail: </a> ottosouza@gmail.com
      </p>
      <p>
        <a className="font-bold">Telefone: </a> (11) 99999-9999
      </p>
      <button className="bg-red-500 text-white rounded px-4 self-start">
        Deletar
      </button>
    </div>
  );
}
