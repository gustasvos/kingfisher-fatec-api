import { useState } from "react"
import Navbar from "../../../shared/components/navbar"
import Botao from "../../../shared/components/botao"
import Modal from "../../../shared/components/modal"
import { FiFileText, FiSend, FiPlus, FiRepeat } from "react-icons/fi"
import jsPDF from "jspdf"

type Cotacao = {
  id: number
  origem: string
  destino: string
  carga: string
  valor: string
}

export default function CotacaoFrete() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([
    { id: 1, origem: "São Paulo", destino: "Curitiba", carga: "Alimentos", valor: "R$ 2.000" },
    { id: 2, origem: "Rio de Janeiro", destino: "Florianópolis", carga: "Eletrônicos", valor: "R$ 3.500" }
  ])
  const [abertoModal, setAbertoModal] = useState(false)

  const [novaCotacao, setNovaCotacao] = useState<Cotacao>({
    id: 0,
    origem: "",
    destino: "",
    carga: "",
    valor: ""
  })

  const abrirModalNovaCotacao = () => {
    setAbertoModal(true)
  }

  const salvarCotacao = () => {
    setCotacoes(prev => [...prev, { ...novaCotacao, id: prev.length + 1 }])
    setAbertoModal(false)
    setNovaCotacao({ id: 0, origem: "", destino: "", carga: "", valor: "" })
  }

  // funcao pdf
  const gerarPDF = (cotacao: Cotacao) => {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text("Cotação de Frete", 20, 20)

    doc.setFontSize(12)
    doc.text(`ID da Cotação: ${cotacao.id}`, 20, 40)
    doc.text(`Origem: ${cotacao.origem}`, 20, 50)
    doc.text(`Destino: ${cotacao.destino}`, 20, 60)
    doc.text(`Carga: ${cotacao.carga}`, 20, 70)
    doc.text(`Valor: ${cotacao.valor}`, 20, 80)

    doc.text("Gerado automaticamente pelo sistema.", 20, 100)

    doc.save(`cotacao_${cotacao.id}.pdf`)
  }

  const reenviarCotacao = (cotacao: Cotacao) => {
    alert(`Reenviando cotação #${cotacao.id} para o cliente.`)
  }

  return (
    <>
      <Navbar />

      <main className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Tela Cotação de Frete</h1>

        {/* Cabeçalho e botão nova cotação */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Histórico de Cotações</h2>
          <Botao
            onClick={abrirModalNovaCotacao}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
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
                <th className="py-2 px-4">Carga</th>
                <th className="py-2 px-4">Valor</th>
                <th className="py-2 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cotacoes.map(c => (
                <tr key={c.id} className="border-b hover:bg-gray-50 text-gray-800">
                  <td className="py-2 px-4">{c.origem}</td>
                  <td className="py-2 px-4">{c.destino}</td>
                  <td className="py-2 px-4">{c.carga}</td>
                  <td className="py-2 px-4">{c.valor}</td>
                  <td className="py-2 px-4 flex justify-center gap-3">
                    {/* Botão PDF */}
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => gerarPDF(c)}
                      title="Baixar PDF da cotação"
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

                    {/* Repetir */}
                    <button
                      className="text-gray-600 hover:text-gray-800"
                      title="Ver detalhes da cotação"
                    >
                      <FiRepeat size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Modal nova cotação */}
      <Modal aberto={abertoModal} onFechar={() => setAbertoModal(false)}>
        <h2 className="text-xl font-bold mb-4">Formulário de Gestão de Coleta</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Origem"
            className="border p-2 rounded"
            value={novaCotacao.origem}
            onChange={e => setNovaCotacao({ ...novaCotacao, origem: e.target.value })}
          />
          <input
            type="text"
            placeholder="Destino"
            className="border p-2 rounded"
            value={novaCotacao.destino}
            onChange={e => setNovaCotacao({ ...novaCotacao, destino: e.target.value })}
          />
          <input
            type="text"
            placeholder="Carga"
            className="border p-2 rounded"
            value={novaCotacao.carga}
            onChange={e => setNovaCotacao({ ...novaCotacao, carga: e.target.value })}
          />
          <input
            type="text"
            placeholder="Valor"
            className="border p-2 rounded"
            value={novaCotacao.valor}
            onChange={e => setNovaCotacao({ ...novaCotacao, valor: e.target.value })}
          />

          <div className="flex justify-end gap-2 mt-3">
            <Botao
              onClick={() => setAbertoModal(false)}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancelar
            </Botao>
            <Botao onClick={salvarCotacao} className="bg-blue-600 hover:bg-blue-700">
              Salvar
            </Botao>
          </div>
        </div>
      </Modal>
    </>
  )
}
