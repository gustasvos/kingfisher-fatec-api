import { useState } from "react"
import RelatorioAproveitamento from "./relatorio-aproveitamento"
import Modal from "../../../shared/components/modal"
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
    const [abertoModal, setAbertoModal] = useState(false);
    const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null);
    const [tituloEventoSelecionado, setTituloEventoSelecionado] = useState<string>("");

    const abrirModalPreencherEvento = (evento: Evento) => {
        setTituloEventoSelecionado(evento.titulo);
        setConteudoModal(
            <RelatorioAproveitamento
                tituloInicial={evento.titulo}
                onFechar={() => setAbertoModal(false)}
            />
        );
        setAbertoModal(true);
    };

    return (
        <>
            {eventos.map((evento, index) => (
                <div
                    key={index}
                    className="grid grid-cols-5 gap-5 text-left border border-gray-300 text-black p-2"
                >
                    <div>{evento.titulo}</div>
                    <div>{evento.descricao}</div>
                    <div>{evento.localizacao}</div>
                    <div>{evento.dataHora}</div>
                    <div>
                        <button
                            onClick={() => abrirModalPreencherEvento(evento)}
                            className="bg-blue-500 text-black px-3 py-1 rounded"
                        >
                            Preencher
                        </button>
                        <Modal aberto={abertoModal} onFechar={() => setAbertoModal(false)}>
                            {conteudoModal}
                        </Modal>
                    </div>
                </div>
            ))}
        </>
    );
}
