import React, { useState } from "react";
import instance from "../../../services/api";

interface RegistroManualProps {
  onClose: () => void
  clienteId: number
  onSuccess: (newCategory: string) => void
}

const categoriaMap: Record<string, number> = {
  Prospect: 1,
  Inicial: 2,
  Potencial: 3,
  Manutenção: 4,
  "Em Negociação": 5,
  "Follow Up": 6,
}

const RegistroManual: React.FC<RegistroManualProps> = ({ onClose, clienteId, onSuccess }) => {
  const [categoria, setCategoria] = useState("");
  const [dataRegistro, setDataRegistro] = useState("");
  const [observacao, setObservacao] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoria || !dataRegistro) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      // Cria o registro no backend
      const body = {
        clienteId,
        categoriaId: categoriaMap[categoria], // se backend usa ID, mapeie conforme enum ou altere para o ID real
        dataRegistro,
        observacao
      };

      await instance.post("/registroCliente", body);

      alert("Interação registrada com sucesso!");
      onSuccess(categoria)
      onClose();
    } catch (err) {
      console.error("Erro ao registrar interação:", err);
      alert("Erro ao registrar interação.");
    }
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
        Novo Registro
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-x-10 gap-y-6 text-gray-800"
      >
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Categoria</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f465a]"
            required
          >
            <option value="">Selecione...</option>
            {Object.keys(categoriaMap).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Data</label>
          <input
            type="date"
            value={dataRegistro}
            onChange={(e) => setDataRegistro(e.target.value)}
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f465a]"
            required
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label className="text-sm text-gray-700 mb-1">Observação</label>
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f465a]"
            placeholder="Digite uma observação (opcional)"
          />
        </div>

        {/* <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Contato</label>
          <input
            type="text"
            className="border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f465a]"
            placeholder="Digite o contato"
          />
        </div> */}

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

export default RegistroManual