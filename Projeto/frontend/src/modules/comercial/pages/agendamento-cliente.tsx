import React, { useState } from "react"
import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"


type Props = {
    nomeCliente?: string
}

export default function AgendamentoCliente(props: Props) {
    const [titulo, setTitulo] = useState('')
    const [data, setData] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [descricao, setDescricao] = useState('')
    const [loading, setLoading] = useState(false)

    const Enviar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(loading) return
        setLoading(true)

        // só para similar
        await new Promise(resolve => setTimeout(resolve, 1000))

        setLoading(false)
        setTitulo('')
        setData('')
        setLocalizacao('')
        setDescricao('')

        // por enquanto só para 'testar'
        alert('Enviado com sucesso')
    }

    return (
        <section>
            <form onSubmit={Enviar}>
                <section className="flex justify-center items-center h-screen">
                    <section className="flex flex-col m-auto justify-center items-center space-y-11">
                        <h1 className="text-black">{`Marcar agendamento com ${props.nomeCliente}`}</h1>
                        <section className="flex m-auto gap-10">
                            <InputLine type="text"
                                placeholder=""
                                value={titulo}
                                id="titulo"
                                htmlfor="titulo"
                                onChange={(e) => setTitulo(e.target.value)}
                                required>
                                Título da reunião
                            </InputLine>
                            <InputLine
                                type="date"
                                placeholder=""
                                value={data}
                                id="data"
                                htmlfor="data"
                                onChange={(e) => setData(e.target.value)}
                                required>
                                Data
                            </InputLine>
                        </section>
                        <section className="flex m-auto gap-10">
                            <InputLine
                                type="text"
                                placeholder=""
                                value={localizacao}
                                id="localizacao"
                                htmlfor="localizacao"
                                onChange={(e) => setLocalizacao(e.target.value)}
                                required>
                                Localização
                            </InputLine>
                            <InputLine
                                type="text"
                                placeholder=""
                                value={descricao}
                                id="descricao"
                                htmlfor="descricao"
                                onChange={(e) => setDescricao(e.target.value)}>
                                Descrição
                            </InputLine>
                        </section>
                        <BotaoSubmit
                            loading={loading}
                            label={loading ? "Agendando..." : "Agendar"}
                            type="submit"
                            className="w-[20%] bg-[#17607f] hover:bg-[#14536f] text-white font-semibold rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                        </BotaoSubmit>
                    </section>
                </section>
            </form>
        </section>
    )
}