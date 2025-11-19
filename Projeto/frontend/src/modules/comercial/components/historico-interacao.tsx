import React, { useEffect, useState } from "react";
import RegistroManual from "./registroManual";
import instance from "../../../services/api";

interface Interacao {
  id: number;
  categoria: string;
  data: string;
  contato: string;
  observacao: string;
}

interface HistoricoInteracaoProps {
  clienteId: number;
}

const formatDate = (isoDate: string) => {
  if (!isoDate) return "";
  const [date] = isoDate.split("T");
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

export const HistoricoInteracao: React.FC<HistoricoInteracaoProps> = ({ clienteId }) => {
  const [interacoes, setInteracoes] = useState<Interacao[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const carregarRegistros = async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/registroCliente/cliente/${clienteId}`);
      setInteracoes(response.data);
    } catch (error: any) {
      console.error("Erro ao carregar histórico de interações:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (clienteId) carregarRegistros();
  }, [clienteId]);

  const handleNovaInteracao = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col p-8 w-full max-w-[720px]">
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

        <div className="overflow-y-auto max-h-96 border rounded-md">
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
                    <td className="py-2 px-3 border-b">{formatDate(item.data)}</td>
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
          <div className="relative w-[700px] bg-white rounded-lg shadow-xl p-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Fechar modal"
            >
              ✕
            </button>

            <RegistroManual
              clienteId={clienteId}
              onClose={handleCloseModal}
              onSaved={carregarRegistros}
            />
          </div>
        </div>
      )}
    </div>
  );
};