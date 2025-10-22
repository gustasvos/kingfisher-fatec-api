import { Cliente } from "../../../types/cliente"
import { useState } from "react"
import FormTeste from "./form-teste"
import Botao from "../../../shared/components/botao"
import Modal from "../../../shared/components/modal"

export type ClienteCardProps = {
    cliente: Cliente
    excluir: (id: number) => void
}

export default function CardCliente({ cliente, excluir }: ClienteCardProps) {
    const [abertoModal, setAbertoModal] = useState(false)
    const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null);

    const abrirModalEditarColaborador = () => {
        // e.preventDefault()
        // colocar o componente de atualizar cliente, fiz esse só para testar
        setConteudoModal(<FormTeste id={cliente.id} />) 
        setAbertoModal(true)
    }

    return (
        <>
            <section className="w-[450px] h-[160px] bg-white rounded-[15px] grid grid-cols-[60%,40%] drop-shadow-lg">
                <section className="p-4 space-y-2 mt-4 justify-center items-center">
                    <p className="font-sans text-[22px]">{cliente.nomeFantasia}</p>
                    <p className="font-sans text-[16px]">{cliente.cnpj}</p>
                    <p className="font-sans text-[16px]">{cliente.email}</p>
                </section>
                <section className="flex flex-col justify-end pb-7 space-y-2">
                    <Botao onClick={abrirModalEditarColaborador} className="max-w-[90px] max-h-8">Editar</Botao>
                    <Botao onClick={() => excluir(cliente.id)} className="max-w-[90px] max-h-8">Excluir</Botao>
                </section>
            </section>

            <Modal aberto={abertoModal} onFechar={() => setAbertoModal(false)}>
                {conteudoModal}
            </Modal>
        </>
    )
}