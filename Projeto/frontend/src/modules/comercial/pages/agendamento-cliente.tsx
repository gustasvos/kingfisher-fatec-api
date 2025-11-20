import React, { useState, useEffect } from "react"
import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"

// Aqui futuramente você pode trocar pela busca real da API
const clientesMock = [
    { id: 1, nome: "Cliente A" },
    { id: 2, nome: "Cliente B" },
    { id: 3, nome: "Cliente C" },
]

type Props = {
    idCliente?: number
    nomeCliente?: string        // agora opcional
}

export default function AgendamentoCliente(props: Props) {

    const [clienteId, setClienteId] = useState(props.idCliente ?? 0)
    const [clienteNome, setClienteNome] = useState(props.nomeCliente ?? "")

    const [titulo, setTitulo] = useState('')
    const [data, setData] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [descricao, setDescricao] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChangeCliente = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value)
        setClienteId(value)

        const cliente = clientesMock.find(c => c.id === value)
        setClienteNome(cliente?.nome || "")
    }

    const Enviar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (loading) return

        // validação extra se nomeCliente não for enviado
        if (!clienteNome) {
            alert("Selecione um cliente")
            return
        }

        setLoading(true)

        // simulação
        await new Promise(resolve => setTimeout(resolve, 1000))

        setLoading(false)
        setTitulo('')
        setData('')
        setLocalizacao('')
        setDescricao('')

        alert(`Agendado com ${clienteNome}`)
    }

    return (
        <section>
            <form onSubmit={Enviar} className="flex justify-center items-center">
                <section className="flex justify-center items-center h-full w-full p-14 rounded-3xl bg-white">
                    <section className="flex flex-col m-auto justify-center items-center space-y-14">

                        <h1 className="text-blue-600 font-semibold text-3xl mb-6">
                            {clienteNome
                                ? `Marcar agendamento com ${clienteNome}`
                                : "Selecionar cliente para agendamento"}
                        </h1>

                        {/* Se nomeCliente NÃO veio → mostra dropdown */}
                        {!props.nomeCliente && (
                            <select
                                className="border border-gray-300 rounded-lg p-3 text-lg"
                                value={clienteId}
                                onChange={handleChangeCliente}
                                required
                            >
                                <option value={0}>Selecione um cliente</option>
                                {clientesMock.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.nome}
                                    </option>
                                ))}
                            </select>
                        )}

                        <section className="flex m-auto gap-32">
                            <InputLine type="text"
                                value={titulo}
                                id="titulo"
                                htmlfor="titulo"
                                onChange={(e) => setTitulo(e.target.value)}
                                required>
                                Título da reunião
                            </InputLine>

                            <InputLine
                                type="datetime-local"
                                value={data}
                                id="data"
                                htmlfor="data"
                                onChange={(e) => setData(e.target.value)}
                                required>
                                Data
                            </InputLine>
                        </section>

                        <section className="flex m-auto gap-32">
                            <InputLine
                                type="text"
                                value={localizacao}
                                id="localizacao"
                                htmlfor="localizacao"
                                onChange={(e) => setLocalizacao(e.target.value)}
                                required>
                                Localização
                            </InputLine>

                            <InputLine
                                type="text"
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
                            className="w-[20%] m-auto bg-[#17607f] hover:bg-[#14536f] text-white font-semibold rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                        </BotaoSubmit>
                    </section>
                </section>
            </form>
        </section>
    )
}
