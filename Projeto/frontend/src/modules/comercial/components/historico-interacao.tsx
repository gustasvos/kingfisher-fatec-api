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

  const handleNovaInteracao = () => {
    console.log("Abrir modal de nova interação"); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // aqui eu criei uma lógica para puxar os dados do back
    /*
    fetch("https://") // substituir pelo caminho do back
      .then((response) => response.json()) 
      .then((dados) => {
        setInteracoes(dados); 
      })
      .catch((erro) => {
        console.log("Erro ao buscar dados:", erro);
      });
    */

    // aqui coloquei alguns dados mockados para teste
    setTimeout(() => {
      const mockDados: Interacao[] = [
        {
          id: 1,
          categoria: "Categoria 1",
          data: "2025-11-07",
          contato: "masanori@newe.com",
          observacao: "Concluído",
        },
        {
          id: 2,
          categoria: "Categoria 2",
          data: "2025-11-04",
          contato: "juliana@newe.com",
          observacao: "Concluído",
        },
        {
          id: 3,
          categoria: "Categoria 3",
          data: "2025-11-01",
          contato: "jean@newe.com",
          observacao: "Concluído",
        },
        {
          id: 4,
          categoria: "Categoria 4",
          data: "2025-09-14",
          contato: "gerson@newe.com",
          observacao: "Concluído",
        },
        {
          id: 5,
          categoria: "Categoria 5",
          data: "2025-09-10",
          contato: "walmir@newe.com",
          observacao: "Concluído",
        },
        {
          id: 6,
          categoria: "Categoria 6",
          data: "2025-08-07",
          contato: "claudio@newe.com",
          observacao: "Concluído",
        },
        {
          id: 7,
          categoria: "Categoria 7",
          data: "2025-08-05",
          contato: "dawilmar@newe.com",
          observacao: "Pendente",
        },
        {
          id: 8,
          categoria: "Categoria 8",
          data: "2025-07-24",
          contato: "sakaue@newe.com",
          observacao: "Pendente",
        },
        {
          id: 9,
          categoria: "Categoria 9",
          data: "2025-07-20",
          contato: "marcs@newe.com",
          observacao: "Pendente",
        },
        {
          id: 10,
          categoria: "Categoria 10",
          data: "2025-07-10",
          contato: "arakaki@newe.com",
          observacao: "Pendente",
        },
      ];

      setInteracoes(mockDados);
    }, 1000); // aqui é o tempo de resposta, coloquei para 1 seg
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
          {interacoes.length === 0 && (
            <p className="text-center text-gray-500 p-4">Carregando dados...</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
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