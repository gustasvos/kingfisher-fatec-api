import InputLine from "../../../shared/components/inputLine";
import BotaoSubmit from "../../../shared/components/botao-submit";
import { useState, useEffect } from "react";
import instance from "../../.././."; 

type Props = {
  freteId: string;
  cliente: string;
  origem: string;
  destino: string;
  tipoCarga: string;
  prazoColeta: string;
  valorFechado: string;
  onClose: () => void;
  onSubmit: (obs: string) => void;
};

export default function FormEnvioFrete({
  freteId,
  cliente,
  origem,
  destino,
  tipoCarga,
  prazoColeta,
  valorFechado,
  onClose,
  onSubmit
}: Props) {
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);
  const [dadosFrete, setDadosFrete] = useState<any>(null);

  useEffect(() => {
    // para puxar dados do backend
    /*
    const fetchDadosFrete = async () => {
      try {
        const response = await instance.get(`/./${freteId}`);
        setDadosFrete(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do frete:", error);
      }
    };
    fetchDadosFrete();
    */
  }, [freteId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      onSubmit(observacoes);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full flex justify-center mt-4 px-4">
      <div className="bg-white shadow-md rounded-3xl w-full max-w-3xl border border-gray-300">
        <div className="p-10 max-h-[80vh] overflow-y-auto">

          <h1 className="text-3xl text-center font-bold text-[#44648d] mb-10">
            Confirmar Envio do Frete para Execução Operacional
          </h1>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 text-gray-700">
                Seção 1: Resumo do frete
              </h2>

              <div className="mt-4 space-y-1 text-gray-800">
                <p><strong>Frete fechado:</strong> {freteId}</p>
                <p><strong>Cliente:</strong> {cliente}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold border-b pb-2 text-gray-700">
                Seção 2: Dados para o operacional (read-only)
              </h2>

              <div className="mt-4 space-y-4 text-gray-800">
                <div>
                  <p className="font-medium">Rota:</p>
                  <div className="flex gap-10 mt-1">
                    <p><strong>Origem:</strong> {origem}</p>
                    <p><strong>Destino:</strong> {destino}</p>
                  </div>
                </div>

                <p><strong>Tipo de carga:</strong> {tipoCarga}</p>
                <p><strong>Prazo de coleta:</strong> {prazoColeta}</p>
                <p><strong>Valor fechado:</strong> R$ {valorFechado}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold border-b pb-2 text-gray-700">
                Seção 3: Campos opcionais
              </h2>

              <label className="block mt-4 font-medium text-gray-800">
                Observações
              </label>

              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full border border-gray-400 rounded-xl p-4 h-32 outline-none focus:border-blue-600 transition text-gray-800"
                placeholder="Escreva aqui..."
              />
            </div>

            <div className="flex justify-center gap-6 pt-2 pb-4">

              <button
                type="button"
                onClick={onClose}
                className="px-8 py-2 rounded-xl border border-gray-500 text-gray-700 hover:bg-gray-100 transition font-semibold"
              >
                CANCELAR
              </button>

              <BotaoSubmit loading={loading}>
                enviar e notificar operacional
              </BotaoSubmit>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
