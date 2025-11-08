import React, { useEffect, useState } from "react";

interface InteracaoManualProps {
  onClose: () => void;
}

const InteracaoManual: React.FC<InteracaoManualProps> = ({ onClose }) => {
  const [interacoes, setInteracoes] = useState([]);
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    fetch("http://") // rota backend
      .then((response) => response.json())
      .then((dados) => {
        setInteracoes(dados);
        console.log("Dados recebidos do backend:", dados);
      })
      .catch((erro) => console.error("Erro ao buscar dados:", erro));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inserir nova interação:", { observacao });
    onClose();
  };

  return (
    <div
      className="
        relative bg-white rounded-lg shadow-md
        w-[890px] mx-auto px-20 py-8
      "
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold text-gray-800 mb-8">
        Nova Interação
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-x-10 gap-y-6 text-gray-800"
      >
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Categoria</label>
          <input
            type="text"
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f465a]"
            placeholder="Digite a categoria"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Data</label>
          <input
            type="text"
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f465a]"
            placeholder="Digite a data"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Contato</label>
          <input
            type="text"
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f465a]"
            placeholder="Digite o contato"
          />
        </div>

        <div className="flex flex-col">
         <label className="text-sm text-gray-700 mb-1">Observação</label>
         <select
         value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
        className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f465a]"
        defaultValue=""
      >
        <option value="" disabled>
       Selecione uma opção
        </option>
       <option value="Pendente">Pendente</option>
       <option value="Concluído">Concluído</option>
       </select>
       </div>

        <div className="col-span-2 flex justify-center mt-8">
          <button
            type="submit"
            className="bg-[#0f465a] text-white px-12 py-2 rounded-md hover:opacity-90 transition-all"
          >
            Inserir
          </button>
        </div>
      </form>
    </div>
  );
};

export default InteracaoManual;