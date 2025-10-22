import { useEffect, useState } from "react";
import Navbar from "../../../shared/components/navbar";
import EventoTabela from "./evento-tabela";
import axios from "axios";
import Loading from "../../../shared/components/loading";

interface Evento {
    id: number;
    titulo: string;
    descricao: string;
    localizacao: string;
    dataHora: string;
    participantes: {
        idConvite: number;
        funcionario: {
            id: number;
            nome: string;
            email: string;
        };
        status: string;
        motivo: string | null;
        criadoEm: string;
    }[];
}

export default function ListagemEventos() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const userId = localStorage.getItem("userId");

    const fetchEventos = async (userId: string) => {
        try {
            const res = await axios.get("http://localhost:8080/admin/events");
            const eventosFiltrados = res.data.filter((e: Evento) => {
                return e.participantes.some(
                    (participante) => participante.funcionario.id === parseInt(userId)
                );
            });

            setEventos(eventosFiltrados);
            setLoading(false);
        } catch (err) {
            setError("Erro ao carregar eventos.");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchEventos(userId);
        } else {
            setError("Usuário não encontrado.");
            setLoading(false);
        }
    }, []);

    const formatarDataHora = (data: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };

        return new Date(data).toLocaleString("pt-BR", options);
    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    const eventosFiltrados = eventos
        .filter((e) =>
            e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.localizacao.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((e) => ({
            ...e,
            dataHora: formatarDataHora(e.dataHora),
        }));

    return (
        <>
            <Navbar />
            <main className="p-8">
                <form
                    className="w-full"
                    onSubmit={(e) => e.preventDefault()} // evita recarregamento da página
                >
                    <div className="flex items-center pb-2 mb-8">
                        <input
                            type="search"
                            placeholder="Pesquisar evento"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-search w-full py-2 px-4 text-base rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        <button
                            type="submit"
                            className="flex-shrink-0 text-gray-600 hover:text-gray-800 focus:outline-none">
                        </button>
                    </div>
                </form>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Cabeçalho da tabela */}
                    <div className="grid grid-cols-5 gap-6 bg-gray-100 border-b border-gray-300 px-6 py-3 font-semibold text-gray-700 rounded-t-lg select-none">
                        <div>Título</div>
                        <div>Descrição</div>
                        <div>Localização</div>
                        <div>Data/Hora</div>
                        <div>Registrar Aproveitamento</div>
                    </div>

                    {/* Conteúdo da tabela */}
                    <EventoTabela eventos={eventosFiltrados} />
                </div>
            </main>
        </>
    );
}