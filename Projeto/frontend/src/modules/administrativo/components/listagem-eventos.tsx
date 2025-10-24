import { useEffect, useState } from "react";
import Navbar from "../../../shared/components/navbar"
import EventoTabela from "./evento-tabela"
import instance from "../../../services/api";
import Loading from "../../../shared/components/loading";

interface Evento {
    id: number
    titulo: string
    descricao: string
    localizacao: string
    dataHora: string
    participantes: {
        idConvite: number
        funcionario: {
            id: number
            nome: string
            email: string
        }
        status: string
        motivo: string | null
        criadoEm: string
    }[]
}

export default function ListagemEventos() {
    const [eventos, setEventos] = useState<Evento[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const userId = localStorage.getItem("userId")
    // const userId = 2

    const fetchEventos = async (userId: string) => {
        try {
            const res = await instance.get("/admin/events")
            const eventosFiltrados = res.data.filter((e: Evento) => {
                return e.participantes.some((participante) => participante.funcionario.id === parseInt(userId))
            })

            setEventos(eventosFiltrados)
            setLoading(false)
        }
        catch (err) {
            setError("Erro ao carregar eventos.")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEventos(userId)
    }, [])


    const formatarDataHora = (data: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }

        const dataFormatada = new Date(data).toLocaleString("pt-BR", options)
        return dataFormatada
    }

    if (loading) return <Loading />
    if (error) return <p>{error}</p>

    return (
        <>
            <Navbar />
            <main className="p-8">
                <form action="/search" method="get" className="w-full max-w-sm mx-auto">
                    <div className="flex items-center border-b-2 border-gray-400 pb-2 mb-[15%]">
                        <input
                            type="text"
                            name="query"
                            placeholder="Pesquisar evento"
                            className="appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            className="flex-shrink-0 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 18l6-6m0 0l-6-6m6 6H4"
                                />
                            </svg>
                        </button>
                    </div>
                </form>

                <div className="bg-white">
                    {/* primeira linha, nome das colunas */}
                    <div className="border-b border-gray-300 px-4 py-2 grid grid-cols-5 gap-4 text-left font-bold text-black bg-gray-300 rounded-t-md">
                        <div>Título</div>
                        <div>Descrição</div>
                        <div>Localização</div>
                        <div>Data/Hora</div>
                        <div>Registrar Aproveitamento</div>
                    </div>

                    {/* Passa os eventos para o componente EventoTabela */}
                    <EventoTabela eventos={eventos.map((e) => ({
                        ...e,
                        dataHora: formatarDataHora(e.dataHora),
                    }))} />
                </div>
            </main>
        </>
    )
}
