import { Colaborador } from "../../../types/colaborador"
import Botao from "../../../shared/components/botao"


export type ColaboradorCardProps = {
    colaborador: Colaborador
}

export default function CardColaborador({ colaborador }: ColaboradorCardProps) {
    return (
        <section className="w-[450px] h-[160px] bg-white rounded-[15px] grid grid-cols-[60%,40%] drop-shadow-lg">
            <section className="p-4 space-y-2 justify-center items-center">
                <p className="font-sans text-[19px]">Colaborador {colaborador.id}</p>
                <p className="font-sans text-[16px]">{colaborador.nome}</p>
                <p className="font-sans text-[16px]">{colaborador.email}</p>
                <p className="font-sans text-[16px]">{colaborador.cargo}</p>
            </section>
            <section className="flex flex-col justify-end pb-5 space-y-2">
                <Botao className="w-[150px] h-[30px] row-start-2">Editar</Botao>
                <Botao className="w-[150px] h-[30px] row-start-2">Excluir</Botao>
            </section>
        </section>
    )
}