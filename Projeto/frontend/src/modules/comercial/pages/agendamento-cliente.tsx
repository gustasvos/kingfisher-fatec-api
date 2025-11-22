import React, { useState } from "react"
import axios from "axios"
import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"
 
const API_URL = "http://localhost:8080";
 
type Props = {
    idCliente?: number
    nomeCliente?: string
    vendedorId?: number
}
 
export default function AgendamentoCliente(props: Props) {
    const [titulo, setTitulo] = useState('')
    const [data, setData] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [descricao, setDescricao] = useState('')
    const [loading, setLoading] = useState(false)
 
    const Enviar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       
        if (loading) return
 
        if (!props.idCliente) {
            alert("Erro: Cliente não identificado.")
            return
        }
 
        setLoading(true)
 
        try {
            const idVendedor = props.vendedorId || Number(localStorage.getItem('usuario_id')) || 1;
 
            const descricaoCompleta = localizacao
                ? `Local: ${localizacao}\nDetalhes: ${descricao}`
                : descricao;
 
            const payload = {
                titulo: titulo,
                data: data,           // Formato do input datetime-local
                status: 'pendente',   // Enum StatusTarefa
                tipo: 'reuniao',      // Enum TipoTarefa
                descricao: descricaoCompleta,
                cliente_id: props.idCliente,
                vendedor_id: idVendedor
            };
 
            await axios.post(`${API_URL}/tarefas`, payload);
 
            alert('Agendamento realizado com sucesso!');
           
            // Limpa os campos
            setTitulo('')
            setData('')
            setLocalizacao('')
            setDescricao('')
 
        } catch (error: any) {
            console.error("Erro ao agendar:", error);
           
            if (error.response) {
                const msg = error.response.data?.message || "Erro no servidor";
                alert(`Falha ao agendar: ${msg}`);
            } else if (error.request) {
                alert("Erro de conexão: Verifique se o backend está a rodar na porta 8080.");
            } else {
                alert("Erro inesperado ao processar a requisição.");
            }
        } finally {
            setLoading(false)
        }
    }
 
    return (
        <section>
            <form onSubmit={Enviar} className="flex justify-center items-center">
                <section className="flex justify-center items-center h-full w-full p-14 rounded-3xl bg-white">
                    <section className="flex flex-col m-auto justify-center items-center space-y-14">
                        <h1 className=" text-blue-600 font-semibold text-3xl mb-6">
                            {props.nomeCliente
                                ? `Marcar agendamento com ${props.nomeCliente}`
                                : "Marcar agendamento"}
                        </h1>
                       
                        <section className="flex m-auto gap-32">
                            <InputLine
                                type="text"
                                placeholder="Ex: Reunião de Alinhamento"
                                value={titulo}
                                id="titulo"
                                htmlfor="titulo"
                                onChange={(e: any) => setTitulo(e.target.value)}
                                required
                            >
                                Título da reunião
                            </InputLine>
                            <InputLine
                                type="datetime-local"
                                placeholder=""
                                value={data}
                                id="data"
                                htmlfor="data"
                                onChange={(e: any) => setData(e.target.value)}
                                required
                            >
                                Data e Hora
                            </InputLine>
                        </section>
                       
                        <section className="flex m-auto gap-32">
                            <InputLine
                                type="text"
                                placeholder="Ex: Escritório do Cliente"
                                value={localizacao}
                                id="localizacao"
                                htmlfor="localizacao"
                                onChange={(e: any) => setLocalizacao(e.target.value)}
                                required
                            >
                                Localização
                            </InputLine>
                            <InputLine
                                type="text"
                                placeholder="Observações..."
                                value={descricao}
                                id="descricao"
                                htmlfor="descricao"
                                onChange={(e: any) => setDescricao(e.target.value)}
                            >
                                Descrição (Opcional)
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