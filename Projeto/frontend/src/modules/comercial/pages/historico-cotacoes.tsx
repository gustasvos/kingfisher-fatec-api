import { useEffect, useState } from "react"
import Navbar from "../../../shared/components/navbar"
import Botao from "../../../shared/components/botao"
import CalculoCotacao from "../../comercial/pages/CalculoCotacao"
import { FiFileText, FiSend, FiPlus, FiRepeat } from "react-icons/fi"
import jsPDF from "jspdf"
import instance from "../../../services/api"

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
  detalhes_frete: DetalhesFrete | null
  detalhes_internas?: any
}

export default function HistoricoCotacoes() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([])
  const [abertoModal, setAbertoModal] = useState(false)

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
    instance.get('/cotacao/list').then(res => {
      setCotacoes(formatCotacoes(res.data))
    })
  }, [])

  const gerarPDF = (cotacao: Cotacao) => {
    const d = cotacao.detalhes_frete

    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text("Cotação de Frete", 20, 20)

    doc.setFontSize(12)
    doc.text(`ID da Cotação: ${cotacao.id}`, 20, 40)
    doc.text(`Cliente: ${cotacao.cliente?.nomeFantasia}`, 20, 50)
    doc.text(`Mercadoria: ${d?.mercadoria}`, 20, 60)
    doc.text(`Coleta: ${d?.localColeta}`, 20, 70)
    doc.text(`Entrega: ${d?.localEntrega}`, 20, 80)
    doc.text(`Peso Estimado: ${d?.pesoEstimado}`, 20, 90)
    doc.text(`Veículo: ${d?.tipoVeiculo}`, 20, 100)
    doc.text(`Valor Total: R$ ${cotacao.valor_total}`, 20, 120)

    doc.save(`cotacao_${cotacao.id}.pdf`)
  }

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
                      onClick={() => gerarPDF(c)}
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
