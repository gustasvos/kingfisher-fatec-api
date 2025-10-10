interface Evento {
    titulo: string
    descricao: string
    localizacao: string
    dataHora: string
    colaborador: string
}

interface EventoTabelaProps {
    eventos: Evento[]
}

export default function EventoTabela({ eventos }: EventoTabelaProps) {
    return (
        <>
            {/* rows */}
            {eventos.map((evento, index) => (
                <div key={index} className="grid grid-cols-5 gap-5 text-left border border-gray-300 text-black p-2">
                    <div>{evento.titulo}</div>
                    <div>{evento.descricao}</div>
                    <div>{evento.localizacao}</div>
                    <div>{evento.dataHora}</div>
                    <div>
                        <button className="bg-blue-500 text-black px-3 py-1 rounded">
                            Preencher
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
