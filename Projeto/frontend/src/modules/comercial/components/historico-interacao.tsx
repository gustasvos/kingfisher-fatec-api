import React, { useEffect, useState, useCallback } from "react";
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
  onClose: () => void;
  onCategoryUpdated: (newCategory: string) => void;
}

// Função para formatar a data (dd/mm/aaaa)
const formatDate = (isoDate: string | undefined): string => {
  if (!isoDate) return '—';
  const dataPart = isoDate.split('T')[0];
  const partes = dataPart.split("-");

  if (partes.length === 3) {
      const [year, month, day] = partes;
      return `${day}/${month}/${year}`;
  }
  return dataPart;
};

export const HistoricoInteracao: React.FC<HistoricoInteracaoProps> = ({ clienteId, onClose, onCategoryUpdated }) => {
  const [interacoes, setInteracoes] = useState<Interacao[]>([]);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [loading, setLoading] = useState(true);


  const carregarRegistros = useCallback(async () => {
    if (!clienteId) {
        setLoading(false);
        return;
    }
 
    setLoading(true);

    try {
      console.log(`[DIAGNOSTICO] Buscando histórico para cliente ID: ${clienteId}`); 
      
      const response = await instance.get(`/registroCliente/cliente/${clienteId}`);
      
   
      setInteracoes(Array.isArray(response.data) ? response.data : []);
      
    } catch (error: any) {
      console.error("Erro ao carregar histórico de interações:", error);
      setInteracoes([]); 
    } finally {

      setLoading(false); 
      console.log("[DIAGNOSTICO] Carregamento finalizado. Loading = false");
    }
  }, [clienteId]);


  const handleRegistrationSuccess = useCallback((newCategory: string) => {
    onCategoryUpdated(newCategory); 
    carregarRegistros();
    handleCloseRegistroModal(); 
  }, [carregarRegistros, onCategoryUpdated]);

  
  useEffect(() => {
    carregarRegistros();
  }, [carregarRegistros]); 

  const handleNovaInteracao = () => {
    setShowRegistroModal(true);
  };

  const handleCloseRegistroModal = () => {
    setShowRegistroModal(false);
  };

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

      {showRegistroModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={onClose} 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Fechar modal"
            >
              ✕
            </button>
            <RegistroManual 
              onClose={handleCloseRegistroModal} 
              clienteId={clienteId}
              onSuccess={handleRegistrationSuccess} 
            />
          </div>
        </div>
      )}
    </div>
  );
};