import { useEffect, useState } from "react"
import Navbar from "../../../shared/components/navbar"
import Botao from "../../../shared/components/botao"
import CalculoCotacao from "../../comercial/pages/CalculoCotacao"
import { FiFileText, FiSend, FiPlus, FiRepeat } from "react-icons/fi"
import instance from "../../../services/api"
import BASE_URL from "../../../services/api"

type DetalhesFrete = {
  mercadoria: string
  localColeta: string
  localEntrega: string
  pesoEstimado: string
  tipoVeiculo: string
}

type Cotacao = {
  id: number
  cliente: {
    nomeFantasia: string
    emailResponsavel: string
  }
  valor_total: number
  caminho_arquivo_pdf: string    // <<< novo campo
  detalhes_frete: DetalhesFrete | null
  detalhes_internas?: any
}

export default function HistoricoCotacoes() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([])
  const [abertoModal, setAbertoModal] = useState(false)
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = parsedUser?.id || "";

  const abrirModalNovaCotacao = () => setAbertoModal(true)
  const fecharModal = () => setAbertoModal(false)

  // trata os JSON dos campos text
  const formatCotacoes = (data: any[]) => {
    return data.map(c => ({
      ...c,
      detalhes_frete: c.detalhes_frete ? JSON.parse(c.detalhes_frete) : null,
      detalhes_internas: c.detalhes_internas ? JSON.parse(c.detalhes_internas) : null
    }))
  }

  useEffect(() => {
    const carregarCotacoes = async () => {
      try {
        const cotacaoResponse = await instance.get(`/cotacao/list/${userId}`);
        // Trata JSON dos campos TEXT
        const formatadas = formatCotacoes(cotacaoResponse.data);
        console.log("Cotações formatadas:", formatadas);

        setCotacoes(formatadas);

      } catch (error) {
        console.error("Erro ao carregar cotações:", error);
      }
    };

    carregarCotacoes();
  }, [userId]);

  const reenviarCotacao = async (cotacao: Cotacao) => {
    if (!confirm(`Reenviar a cotação #${cotacao.id}?`)) return

    try {
      const template = await fetch("/emailTemplate.html").then(r => r.text())

      await instance.post("/cotacao/enviar-email", {
        cotacaoId: cotacao.id,
        template
      })

      alert("Cotação reenviada com sucesso!")

    } catch (err) {
      console.error(err)
      alert("Erro ao reenviar a cotação.")
    }
  }

  // Abre o PDF existente em nova aba
  const baixarPDF = async (caminho: string) => {
    if (!caminho) return;

    try {
      // Pega o PDF como blob
      const res = await fetch(`${BASE_URL}/${caminho}`);
      if (!res.ok) throw new Error("Erro ao baixar PDF");

      const blob = await res.blob();

      // Cria URL temporário para download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = caminho.split("/").pop() || "cotacao.pdf";

      // Dispara o download
      link.click();

      // Revoga a URL depois de um pequeno delay
      setTimeout(() => URL.revokeObjectURL(url), 1000);

    } catch (err) {
      console.error(err);
      alert("Não foi possível baixar o PDF.");
    }
  };


  return (
    <>
      <Navbar />

      <main className="p-8 bg-gray-50 min-h-screen">
        {/* Cabeçalho e botão nova cotação */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gray-700">Histórico de Cotações</h1>
          <Botao
            onClick={abrirModalNovaCotacao}
            className="flex items-center gap-2 pl-8 bg-green-600 hover:bg-green-700"
          >
            <FiPlus size={18} /> Nova Cotação
          </Botao>
        </div>

        {/* Lista de cotações */}
        <section className="bg-white rounded-xl drop-shadow p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-100 text-gray-800">
                <th className="py-2 px-4">Origem</th>
                <th className="py-2 px-4">Destino</th>
                <th className="py-2 px-4">Mercadoria</th>
                <th className="py-2 px-4">Valor Total</th>
                <th className="py-2 px-4 text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
              {cotacoes.map(c => (
                <tr key={c.id} className="border-b hover:bg-gray-50 text-gray-800">
                  <td className="py-2 px-4">{c.detalhes_frete?.localColeta}</td>
                  <td className="py-2 px-4">{c.detalhes_frete?.localEntrega}</td>
                  <td className="py-2 px-4">{c.detalhes_frete?.mercadoria}</td>
                  <td className="py-2 px-4">R$ {c.valor_total}</td>

                  {/* Ações */}
                  <td className="py-2 px-4 flex justify-center gap-3">
                    {/* PDF */}
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => baixarPDF(c.caminho_arquivo_pdf)}
                      title="Baixar PDF"
                    >
                      <FiFileText size={18} />
                    </button>

                    {/* Reenviar */}
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => reenviarCotacao(c)}
                      title="Reenviar cotação ao cliente"
                    >
                      <FiSend size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </section>
      </main>

      {/* Modal */}
      {abertoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-xl w-[90%] h-[90vh] overflow-hidden flex flex-col">

            <div className="flex justify-between items-center p-4 border-b bg-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Checklist de Gestão de Coleta</h2>
              <button
                onClick={fecharModal}
                className="text-gray-600 hover:text-red-600 font-semibold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <CalculoCotacao />
            </div>

          </div>
        </div>
      )}
    </>
  )
}
