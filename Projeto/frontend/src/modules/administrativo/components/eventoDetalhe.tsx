import { useEffect, useState } from "react"
import Botao from "../../../shared/components/botao"
import Container from "../../../shared/components/container"
import axios from "axios";

export default function EventoDetalhe() {
     const usuarioID = 1
     const [eventos, setEventos] = useState<any>(null); 
     const [dataFormatada, setdataFormatada] = useState<string>("");
     const [convidado, setConvidado] = useState<Number>(0); 
     

     useEffect(()=> {
        axios.get(`http://localhost:8080/admin/events/convidado/${usuarioID}`)
        .then((response) => {
        const eventos = response.data.map((convite: any) => convite.evento.id);
        if (eventos.length > 0) {
            setConvidado(eventos[0]); // Pega o primeiro evento
        }
        console.log(convidado)
        })
        .catch((error) => console.error("Erro ao buscar dados:", error));
    }, []);

    useEffect(()=> {
        axios.get(`http://localhost:8080/admin/events/${convidado}`)
        .then((response) => {
        setEventos(response.data)
        const data = new Date(response.data.dataHora).toLocaleDateString('pt-BR');
        setdataFormatada(data)
        })
        .catch((error) => console.error("Erro ao buscar dados:", error))
    }, [convidado])

    const [justificativa, setJustificativa] = useState(false)
    const [mensagem, setMensagem] = useState(false)
    const [participa, setParticipa] = useState(false)
    const [mostrar, setMostrar] = useState(true)
    const formEnviado = (e: React.FormEvent) => {
        e.preventDefault()
        setMensagem(true)
        setJustificativa(false)
        setParticipa(false)
    }

    return (
        <section className="flex justify-center items-center h-screen">
            {mostrar && (<Container>
                <form action="" onSubmit={formEnviado} className="grid grid-cols-[58%,2%,40%] grid-rows-[35%,2%,63%] h-full rounded-[15px] text-black">
                    <section className="col-start-1 row-start-1 ">
                        <h1 className="font-sans text-[36px] font-semibold pl-[20px] pt-[30px]  ">{eventos ? eventos.titulo : "Carregando..."}</h1>
                        <p className="font-sans text-[15px] font-semibold pl-[20px] pt-[15px]  pb-[20px]">{eventos ? eventos.descricao : "Carregando..."}</p>
                    </section>
                    <span className="row-start-2 w-full h-[2px] bg-[#C2E8FF]" />
                    <section className="row-start-3 pt-[15px] pl-[20px]">
                        <p className="font-sans text-[15px] font-semibold pb-[20px]">Informações gerais</p>
                        <ul className="list-inside list-disc">
                            <li className="font-sans text-[15px] font-semibold">{dataFormatada}</li>
                            <li className="font-sans text-[15px] font-semibold">{eventos ? eventos.dataHora.split('T')[1].substring(0,5): ""}</li>
                            <li className="font-sans text-[15px] font-semibold">{eventos ? eventos.localizacao : "Carregando..."}</li>
                        </ul>
                    </section>
                    <span className="row-start-1 row-span-3  w-[2px] h-full bg-[#C2E8FF]" />
                    <section className="flex flex-col items-center relative">
                        <section className="w-full flex justify-end pt-4 pr-4">
                            <Botao onClick={() => { setMostrar(false) }} className="max-w-[70px] max-h-[30px]">Fechar</Botao>
                        </section>
                        <p className="font-sans text-[15px] font-semibold pt-[30px] pb-[30px]">Confirmação</p>
                        <Botao onClick={() => {
                            setParticipa(true)
                        }}>Vou Participar</Botao>
                    </section>
                    <section className="col-start-3 row-start-3 flex flex-col items-center space-y-5">
                        <Botao onClick={() => {
                            setJustificativa(!justificativa)
                            setParticipa(true)
                        }}>Não Vou Participar</Botao>
                        {justificativa && (<textarea required className={`pt-[30px] col-start-3 w-[200px] h-[150px] rounded-[10px] p-4 text-[15px]`} placeholder="Caso não for participar do evento, justifique.." name="" id=""></textarea>)}

                        {participa && <input type="submit" value={'ENVIAR'} className="bg-[#015084] w-[200px] h-[40px] rounded-[8px] text-white text-[15px] font-semibold cursor-pointer font-sans" />}
                    </section>
                    {mensagem && (
                        <section className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                            <section className="bg-white rounded-[15px] p-8 drop-shadow-lg flex flex-col justify-center items-center">
                                <p className="text-black">Resposta enviada com sucesso</p>
                                <button onClick={() => {
                                    setMensagem(false)
                                    setMostrar(false)
                                }} className="mt-4 bg-[#015084]  text-white px-4 py-2 rounded">
                                    Fechar
                                </button>
                            </section>
                        </section>
                    )}
                </form>
            </Container>)}
        </section>
    )
}
