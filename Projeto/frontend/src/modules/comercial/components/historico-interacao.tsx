import React, { useEffect, useState } from "react";
import InteracaoManual from "./interacao-manual";

interface Interacao {
  id: number;
  categoria: string;
  data: string;
  contato: string;
  observacao: string;
}

export const HistoricoInteracao: React.FC = () => {
  const [interacoes, setInteracoes] = useState<Interacao[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); 

  const handleNovaInteracao = () => {
    console.log("Abrir modal de nova interação");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const carregarInteracoes = async () => {
      try {
        const response = await fetch("https://"); // substiuir pelo caminho do nosso back
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const dados = await response.json();
        setInteracoes(dados);
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
      } finally {
        setLoading(false);
      }
    };

    carregarInteracoes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Histórico de Interação
          </h1>
          <button
            onClick={handleNovaInteracao}
            style={{ backgroundColor: "#0f465a" }}
            className="text-white px-3 py-1 rounded hover:opacity-90"
          >
            Nova interação
          </button>
        </div>

        <div className="overflow-y-auto max-h-80 border rounded-md">
          {loading ? (
            <p className="text-center text-gray-500 p-4">Carregando dados...</p>
          ) : interacoes.length === 0 ? (
            <p className="text-center text-gray-500 p-4">
              Nenhuma interação encontrada.
            </p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr className="text-left text-gray-700">
                  <th className="py-2 px-3 border-b">Categoria</th>
                  <th className="py-2 px-3 border-b">Data</th>
                  <th className="py-2 px-3 border-b">Contato</th>
                  <th className="py-2 px-3 border-b">Observação</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {interacoes.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 even:bg-gray-50 transition-colors"
                  >
                    <td className="py-2 px-3 border-b">{item.categoria}</td>
                    <td className="py-2 px-3 border-b">{item.data}</td>
                    <td className="py-2 px-3 border-b">{item.contato}</td>
                    <td className="py-2 px-3 border-b">{item.observacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Fechar modal"
            >
              ✕
            </button>
            <InteracaoManual onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};
