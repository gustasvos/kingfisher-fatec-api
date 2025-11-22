import React, { useState, useEffect } from "react"
import instance from "../../../services/api"
import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"

interface ClienteOpcao {
    id: number;
    NomeFantasia: string;
}

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
    
    const [listaClientes, setListaClientes] = useState<ClienteOpcao[]>([])
    const [clienteSelecionadoId, setClienteSelecionadoId] = useState<string>('')

    const userId = localStorage.getItem('usuario_id') || 
                   (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}').id : null);

    useEffect(() => {
        if (!props.idCliente && userId) {
            instance.get(`/cliente/comercial/${userId}`)
                .then(res => {
                    setListaClientes(res.data);
                })
                .catch(err => console.error("Erro ao buscar clientes", err));
        }
    }, [props.idCliente, userId]);

    const Enviar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (loading) return

        const idFinalCliente = props.idCliente || Number(clienteSelecionadoId);

        if (!idFinalCliente) {
            alert("Erro: Selecione um cliente para continuar.")
            return
        }

        setLoading(true)

        try {
            const idVendedor = props.vendedorId || Number(userId) || 1;

            const descricaoCompleta = localizacao
                ? `Local: ${localizacao}\nDetalhes: ${descricao}`
                : descricao;

            const payload = {
                titulo: titulo,
                data: data,           
                status: 'pendente',   
                tipo: 'reuniao',      
                descricao: descricaoCompleta,
                cliente_id: idFinalCliente,
                vendedor_id: idVendedor
            };

            await instance.post(`/tarefas`, payload);

            alert('Agendamento realizado com sucesso!');
            
            setTitulo('')
            setData('')
            setLocalizacao('')
            setDescricao('')
            setClienteSelecionadoId('')

        } catch (error: any) {
            console.error("Erro ao agendar:", error);
            
            if (error.response) {
                const msg = error.response.data?.message || "Erro no servidor";
                alert(`Falha ao agendar: ${msg}`);
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
                <section className="flex justify-center items-center h-full w-full p-8 rounded-3xl bg-white">
                    <section className="flex flex-col m-auto justify-center items-center space-y-8 w-full">
                        
                        <h1 className="text-blue-600 font-semibold text-3xl mb-2">
                            {props.nomeCliente
                                ? `Agendar com ${props.nomeCliente}`
                                : "Novo Agendamento"}
                        </h1>
                        
                        {/* SELECIONAR CLIENTE (AZUL) */}
                        {!props.idCliente && (
                            <div className="w-full">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Selecione o Cliente
                                </label>
                                <select
                                    className="w-full p-3 border border-[#17607f] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#17607f] text-white"
                                    value={clienteSelecionadoId}
                                    onChange={(e) => setClienteSelecionadoId(e.target.value)}
                                    required
                                >
                                    <option value="" className="bg-white text-black">-- Escolha uma empresa --</option>
                                    {listaClientes.map(cli => (
                                        <option key={cli.id} value={cli.id} className="bg-white text-black">
                                            {cli.NomeFantasia}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* GRID PARA EVITAR SOBREPOSIÇÃO DOS INPUTS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            <div>
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
                            </div>
                            <div>
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
                            </div>
                        </div>
                        
                        {/* GRID PARA OS INPUTS DE BAIXO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            <div>
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
                            </div>
                            <div>
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
                            </div>
                        </div>
                        
                        <BotaoSubmit
                            loading={loading}
                            label={loading ? "Agendando..." : "Agendar"}
                            type="submit"
                            className="w-[200px] m-auto bg-[#17607f] hover:bg-[#14536f] text-white font-semibold rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg mt-4"
                        >
                        </BotaoSubmit>
                    </section>
                </section>
            </form>
        </section>
    )
}