import { Colaborador } from "../../../types/colaborador"
import Botao from "../../../shared/components/botao"
import EventoDetalhe from "./eventoDetalhe"
import { useState } from "react"


export type ColaboradorCardProps = {
    colaborador: Colaborador
    excluir:(id:number) => void
}

export default function CardColaborador({ colaborador,excluir }: ColaboradorCardProps) {
    const [mostrarComponente, setMostrarComponente] = useState(false)

    return (
        <>
            <section className="w-[450px] h-[160px] bg-white rounded-[15px] grid grid-cols-[60%,40%] drop-shadow-lg">
                <section className="p-4 space-y-2 justify-center items-center">
                    <p className="font-sans text-[19px]">Colaborador {colaborador.id}</p>
                    <p className="font-sans text-[16px]">{colaborador.nome}</p>
                    <p className="font-sans text-[16px]">{colaborador.email}</p>
                    <p className="font-sans text-[16px]">{colaborador.cargo}</p>
                </section>
                <section className="flex flex-col justify-end pb-5 space-y-2">
                    <Botao onClick={() => {
                        setMostrarComponente(true)
                    }} className="max-w-[90px] max-h-8">Editar</Botao>
                    <Botao onClick={() => excluir(colaborador.id)} className="max-w-[90px] max-h-8">Excluir</Botao>
                </section>
            </section>
            {mostrarComponente && (
                <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <section className="p-6 rounded-lg shadow-lg w-[900px] h-[500px] flex flex-col">
                        <Botao onClick={() => setMostrarComponente(false)}>
                            Fechar
                        </Botao>
                        {/** colocar o componente de atualiza cadastro, esse foi só para teste*/}
                        <EventoDetalhe />   
                    </section>
                </section>
            )}
        </>

    )
}