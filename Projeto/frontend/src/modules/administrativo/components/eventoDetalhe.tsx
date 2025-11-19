import { useEffect, useState } from "react";
import Botao from "../../../shared/components/botao";
import Container from "../../../shared/components/container";
import instance from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

interface EventoDetalheProps {
    eventoId?: number;
    conviteId?: number;
    onFechar?: () => void;
    statusConvite?: string;
    motivoConvite?: string | null;
}

// Recebendo o conviteId, statusConvite e motivoConvite
export default function EventoDetalhe({ eventoId, conviteId, onFechar, statusConvite, motivoConvite }: EventoDetalheProps) {
    const { user } = useAuth();
    const [evento, setEvento] = useState<any>(null);
    const [dataFormatada, setDataFormatada] = useState<string>("");
    const [vaiParticipar, setVaiParticipar] = useState(false);
    const [mostrarJustificativaInput, setMostrarJustificativaInput] = useState(false);
    const [motivo, setMotivo] = useState(motivoConvite || "");
    const [mostrarModal, setMostrarModal] = useState(true);

    const isPendente = statusConvite?.toUpperCase() === "PENDENTE";
    const isRespondido = statusConvite && statusConvite.toUpperCase() !== "PENDENTE";

    useEffect(() => {
        if (!eventoId) return;

        instance
            .get(`/admin/events/${eventoId}`)
            .then((response) => {
                setEvento(response.data);
                const data = new Date(response.data.dataHora).toLocaleDateString("pt-BR");
                setDataFormatada(data);
            })
            .catch((error) => console.error("Erro ao buscar dados do evento:", error));

        if (statusConvite?.toUpperCase() === "RECUSADO" && motivoConvite) {
            setMotivo(motivoConvite);
        }
    }, [eventoId, statusConvite, motivoConvite]);

    const formEnviado = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validação simples para garantir que a requisição só ocorra se for PENDENTE
        if (!isPendente || !conviteId || !eventoId) {
            console.error("Não é possível enviar a resposta: Convite não está PENDENTE ou IDs ausentes.");
            return;
        }

        try {
            const status = vaiParticipar ? "CONFIRMADO" : "RECUSADO";
            const body: any = { status };

            // Só adiciona o motivo se for recusa E o motivo estiver preenchido
            if (!vaiParticipar && motivo.trim()) {
                body.motivo = motivo.trim();
            } else if (!vaiParticipar && !motivo.trim()) {
                // Caso o usuário tente recusar sem motivo
                alert("Por favor, justifique a recusa.");
                return;
            }

            // Endpoint atualizado para usar o eventoId e conviteId corretos
            const endpoint = `/admin/events/${eventoId}/convidado/${conviteId}`;
            console.log("Endpoint PATCH:", endpoint);
            console.log("Body:", body);

            await instance.patch(endpoint, body);

            alert("Resposta enviada com sucesso!");
            // Fecha o modal e possivelmente forçará o reload da lista se você implementar isso no onFechar
            if (onFechar) onFechar();
        } catch (error: any) {
            if (error.response) {
                console.error("Erro da API:", error.response.status, error.response.data);
                alert(`Erro da API: ${error.response.status} - ${error.response.data.message || 'Erro desconhecido'}`);
            } else {
                console.error("Erro de rede ou outro:", error.message);
                alert("Erro ao enviar resposta: " + error.message);
            }
        }
    };

    // Lógica de visualização do status
    const getStatusLabel = (status: string | undefined) => {
        switch (status?.toUpperCase()) {
            case "CONFIRMADO":
            case "APROVADO":
                return <span className="text-green-600 font-bold">Confirmado</span>;
            case "RECUSADO":
                return <span className="text-red-600 font-bold">Recusado</span>;
            case "PENDENTE":
                return <span className="text-yellow-600 font-bold">Pendente</span>;
            default:
                return <span className="text-gray-600 font-bold">Desconhecido</span>;
        }
    };


    if (!mostrarModal) return null;

    return (
        <>
            {mostrarModal && (
                <section
                    className="flex justify-center items-center z-50 fixed top-0 left-0 w-full h-full bg-transparent"
                    onClick={onFechar}
                >
                    <div
                        className="max-w-[800px] w-[90%] rounded-[15px] overflow-hidden shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Container>
                            {/* O formulário só precisa existir se for para enviar (Pendente) */}
                            <form onSubmit={isPendente ? formEnviado : (e) => e.preventDefault()}
                                className="grid grid-cols-[58%,2%,40%] grid-rows-[35%,2%,63%] h-full rounded-[15px] text-black">
                                {/* --- ESQUERDA --- */}
                                <section className="col-start-1 row-start-1">
                                    <h1 className="font-sans text-[36px] font-semibold pl-[20px] pt-[30px]">
                                        {evento ? evento.titulo : "Carregando..."}
                                    </h1>
                                    <p className="font-sans text-[15px] font-semibold pl-[20px] pt-[15px] pb-[20px]">
                                        {evento ? evento.descricao : "Carregando..."}
                                    </p>
                                </section>

                                <span className="row-start-2 w-full h-[2px] bg-[#C2E8FF]" />

                                <section className="row-start-3 pt-[15px] pl-[20px]">
                                    <p className="font-sans text-[15px] font-semibold pb-[20px]">
                                        Informações gerais
                                    </p>
                                    <ul className="list-inside list-disc">
                                        <li className="font-sans text-[15px] font-semibold">{dataFormatada}</li>
                                        <li className="font-sans text-[15px] font-semibold">
                                            {evento
                                                ? new Date(evento.dataHora).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
                                                : ""}
                                        </li>
                                        <li className="font-sans text-[15px] font-semibold">{evento ? evento.localizacao : "Carregando..."}</li>
                                    </ul>

                                    <p className="font-sans text-[15px] font-semibold">
                                        Status: {statusConvite}
                                    </p>
                                    {/* Se for recusado, mostra o motivo */}
                                    {statusConvite?.toUpperCase() === "RECUSADO" && motivoConvite && (
                                        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-md shadow-sm w-full break-words">
                                            <p className="font-sans text-sm font-semibold text-red-800 mb-2">
                                             Motivo da Recusa:
                                            </p>
                                            <p className="font-sans text-sm text-red-700 whitespace-pre-wrap leading-relaxed">
                                            {motivoConvite}
                                            </p>
                                        </div>
                                    )}
                                </section>

                                <span className="row-start-1 row-span-3 w-[2px] h-full bg-[#C2E8FF]" />

                                {/* --- DIREITA (CONFIRMAÇÃO/STATUS) --- */}
                                <section className="flex flex-col items-center relative col-start-3 row-span-3 pt-[30px] space-y-5 w-full">
                                    <p className="font-sans text-[18px] font-semibold pb-[10px]">
                                        Status: {isRespondido ? getStatusLabel(statusConvite) : "Confirmação"}
                                    </p>

                                    {/* Lógica de botões SÓ se for PENDENTE */}
                                    {isPendente && (
                                        <>
                                            <Botao
                                                onClick={() => {
                                                    setVaiParticipar(true);
                                                    setMostrarJustificativaInput(false);
                                                }}
                                                className={vaiParticipar ? "bg-green-500 hover:bg-green-600" : ""} // Destaca se selecionado
                                            >
                                                Vou Participar
                                            </Botao>

                                            <Botao
                                                onClick={() => {
                                                    setMostrarJustificativaInput(!mostrarJustificativaInput);
                                                    setVaiParticipar(false);
                                                }}
                                                className={mostrarJustificativaInput ? "bg-red-500 hover:bg-red-600" : ""} // Destaca se selecionado
                                            >
                                                Não Vou Participar
                                            </Botao>
                                        </>
                                    )}


                                    {isPendente && mostrarJustificativaInput && (
                                        <textarea
                                            required
                                            className="w-[200px] h-[150px] rounded-[10px] p-4 text-[15px] resize-y border border-gray-300"
                                            placeholder="Caso não for participar do evento, justifique..."
                                            value={motivo}
                                            onChange={(e) => setMotivo(e.target.value)}
                                        ></textarea>
                                    )}

                                    {isPendente && (vaiParticipar || mostrarJustificativaInput) && (
                                        <input
                                            type="submit"
                                            value="ENVIAR RESPOSTA"
                                            className="bg-[#015084] w-[200px] h-[40px] rounded-[8px] text-white text-[15px] font-semibold cursor-pointer font-sans hover:bg-[#003c64] transition-colors"
                                        />
                                    )}
                                </section>
                            </form>
                        </Container>
                    </div>
                </section>
            )}
        </>
    );
}