import { Colaborador } from "../../../types/colaborador"
import Botao from "../../../shared/components/botao"
import { useState } from "react"
import AtualizarCadastro from "../pages/atualizarCadastro"
import Modal from "../../../shared/components/modal"


export type ColaboradorCardProps = {
    colaborador: Colaborador
    excluir:(id:number) => void
}

export default function CardColaborador({ colaborador, excluir }: ColaboradorCardProps) {
    const [abertoModal, setAbertoModal] = useState(false)
    const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null); // Controla o conteúdo do modal

    const abrirModalEditarColaborador = (e: React.MouseEvent) => {
        e.preventDefault()
        setConteudoModal(<AtualizarCadastro id={colaborador.id}/>)
        setAbertoModal(true)
    }

    return (
        <>
            <section className="w-[450px] h-[160px] bg-white rounded-[15px] grid grid-cols-[60%,40%] drop-shadow-lg">
                <section className="p-4 space-y-2 justify-center items-center">
                    <p className="font-sans text-[22px]">{colaborador.nome}</p>
                    <p className="font-sans text-[16px]">{colaborador.cargo}</p>
                    <p className="font-sans text-[16px]">CPF: {colaborador.cpf}</p>
                </section>
                <section className="flex flex-col justify-end pb-5 space-y-2">
                    <Botao onClick={abrirModalEditarColaborador} className="max-w-[90px] max-h-8">Editar</Botao>
                    <Botao onClick={() => excluir(colaborador.id)} className="max-w-[90px] max-h-8">Excluir</Botao>
                </section>
            </section>

            <Modal aberto={abertoModal} onFechar={() => setAbertoModal(false)}>
                {conteudoModal}
            </Modal>
        </>
    )
}