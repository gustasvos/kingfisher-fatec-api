import React, { useState } from "react"
import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"

export default function AgendamentoCliente() {
    const [titulo, setTitulo] = useState('')
    const [data, setData] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [descricao, setDescricao] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitulo(e.target.value)
        setData(e.target.value)
        setLocalizacao(e.target.value)
        setDescricao(e.target.value)
    }

    const Enviar = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
    }

    return (
        <section>
            <form onChange={Enviar}>
                <section>
                    <section className="flex flex-col m-auto justify-center items-center">
                        <h1 className="text-black">{`Marcar agendamento com ...`}</h1>
                        <section className="flex m-auto gap-10">
                            <InputLine type="text"
                                placeholder=""
                                value={titulo}
                                id="titulo"
                                htmlfor="titulo"
                                onChange={handleChange}
                                required>
                                Título da reunião
                            </InputLine>
                            <InputLine
                                type="date"
                                placeholder=""
                                value={data}
                                id="data"
                                htmlfor="data"
                                onChange={handleChange}
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
                                onChange={handleChange}
                                required>
                                Localização
                            </InputLine>
                            <InputLine
                                type="text"
                                placeholder=""
                                value={descricao}
                                id="descricao"
                                htmlfor="descricao"
                                onChange={handleChange}>
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