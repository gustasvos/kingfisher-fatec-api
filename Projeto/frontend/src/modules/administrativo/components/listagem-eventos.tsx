import Navbar from "../../../shared/components/navbar"
import EventoTabela from "./evento-tabela"

export default function ListagemEventos() {
    const eventos = [
        // preencher com array de eventos do backend/bd
        {
            titulo: "Título 1",
            descricao: "Descrição 1",
            localizacao: "Localização 1",
            dataHora: "dd/mm/aaaa hh:mm",
            colaborador: "Pessoa 1"
        },
        {
            titulo: "Título 2",
            descricao: "Descrição 2",
            localizacao: "Localização 2",
            dataHora: "dd/mm/aaaa hh:mm",
            colaborador: "Pessoa 2"
        }, {
            titulo: "Título 2",
            descricao: "Descrição 2",
            localizacao: "Localização 2",
            dataHora: "dd/mm/aaaa hh:mm",
            colaborador: "Pessoa 2"
        }, {
            titulo: "Título 2",
            descricao: "Descrição 2",
            localizacao: "Localização 2",
            dataHora: "dd/mm/aaaa hh:mm",
            colaborador: "Pessoa 2"
        }, {
            titulo: "Título 2",
            descricao: "Descrição 2",
            localizacao: "Localização 2",
            dataHora: "dd/mm/aaaa hh:mm",
            colaborador: "Pessoa 2"
        }, {
            titulo: "Título 2",
            descricao: "Descrição 2",
            localizacao: "Localização 2",
            dataHora: "dd/mm/aaaa hh:mm",
            colaborador: "Pessoa 2"
        }, {
            titulo: "Título 2",
            descricao: "Descrição 2",
            localizacao: "Localização 2",
            dataHora: "dd/mm/aaaa hh:mm",
            colaborador: "Pessoa 2"
        }, {
            titulo: "Título 2",
            descricao: "Descrição 2",
            localizacao: "Localização 2",
            dataHora: "dd/mm/aaaa hh:mm",
            colaborador: "Pessoa 2"
        }, {
            titulo: "Título 2",
            descricao: "Descrição 2",
            localizacao: "Localização 2",
            dataHora: "dd/mm/aaaa hh:mm",
            colaborador: "Pessoa 2"
        },
    ]

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
                        <div>Registrar Form. Aproveitamento</div>
                    </div>

                    {/* Passa os eventos para o componente EventoTabela */}
                    <EventoTabela eventos={eventos} />
                </div>
            </main>
        </>
    )
}
