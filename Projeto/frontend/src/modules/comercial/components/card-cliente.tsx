import { Cliente } from "../../../types/cliente"
import { useState } from "react"
import Modal from "../../../shared/components/modal"
import CadastroCliente from "../pages/cadastrocliente"
import { FiEdit2, FiTrash2, FiClock, FiCalendar } from "react-icons/fi"
import AgendamentoCliente from "../pages/agendamento-cliente"
import { HistoricoInteracao } from "./historico-interacao"

export type ClienteCardProps = {
  cliente: Cliente
  excluir: (id: number) => void
  onUpdate: (newCategory: string, clienteId: number) => void
}

export default function CardCliente({ cliente, excluir, onUpdate }: ClienteCardProps) {
  const [abertoModal, setAbertoModal] = useState(false)
  const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null)

  const handleCategoryUpdate = (newCategory: string) => {
    onUpdate(newCategory, cliente.id)
    setAbertoModal(false)
  }

  const abrirModalEditar = () => {
    setConteudoModal(<CadastroCliente clienteId={cliente.id} />)
    setAbertoModal(true)
  }

  const abrirModalHistorico = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<HistoricoInteracao clienteId={cliente.id} onCategoryUpdated={handleCategoryUpdate} onClose={() => setAbertoModal(false)} />)
    setAbertoModal(true)
  }

  // esse ainda nao
  const abrirModalAgendar = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<AgendamentoCliente nomeCliente={cliente.NomeFantasia}/>)
    setAbertoModal(true)
    // alert("Abrir modal de agendamento com cliente pré-selecionado.")
  }

  return (
    <>
      <section className="bg-white w-[450px] rounded-2xl drop-shadow-lg flex flex-col justify-between p-5 transition hover:shadow-xl">
        {/* Header */}
        <div className="border-b pb-2 mb-2">
          <p className="font-semibold text-lg text-gray-800">{cliente.CNPJ}</p>
          <p className="font-sans text-xl font-bold text-gray-900">{cliente.NomeFantasia}</p>
        </div>

        {/* Corpo */}
        <div className="flex flex-col text-gray-700 space-y-1 text-sm">
          <p><span className="font-semibold">Prazo Faturamento:</span> {cliente.PrazoFaturamento ?? "—"}</p>
          <p><span className="font-semibold">Contato Resp.:</span> {cliente.ContatoResponsavel ?? "—"}</p>
          <p><span className="font-semibold">Email:</span> {cliente.EmailResponsavel ?? "—"}</p>
          <p><span className="font-semibold">Categoria:</span> {cliente.ultimaCategoria ?? "—"}</p>
        </div>

        {/* Rodapé com botões (somente ícones) */}
        <div className="flex justify-around mt-4 pt-3 border-t">
          <button
            onClick={abrirModalEditar}
            className="flex items-center justify-center w-14 h-14 p-4 rounded-[50px] bg-blue-600 hover:bg-blue-700 text-white"
          >
            <FiEdit2 size={18} />
          </button>

          <button
            onClick={() => excluir(cliente.id)}
            className="flex items-center justify-center w-14 h-14 p-4 rounded-[50px] bg-red-600 hover:bg-red-700 text-white"
          >
            <FiTrash2 size={18} />
          </button>

          <button
            onClick={abrirModalHistorico}
            className="flex items-center justify-center w-14 h-14 p-4 rounded-[50px] bg-gray-500 hover:bg-gray-600 text-white"
          >
            <FiClock size={18} />
          </button>

          <button
            onClick={abrirModalAgendar}
            className="flex items-center justify-center w-14 h-14 p-4 rounded-[50px] bg-green-600 hover:bg-green-700 text-white"
          >
            <FiCalendar size={18} />
          </button>
        </div>
      </section>

      <Modal aberto={abertoModal} onFechar={() => setAbertoModal(false)}>
        {conteudoModal}
      </Modal>
    </>
  )
}
