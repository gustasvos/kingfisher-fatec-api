import { useEffect, useState } from "react"
import Botao from "../../../shared/components/botao"
import Container from "../../../shared/components/container"
import instance from "../../../services/api"
import { useAuth } from "../../../contexts/AuthContext";

export default function EventoDetalhe() {
    const { user } = useAuth(); 
    const usuarioID = user?.id;
    const [eventos, setEventos] = useState<any>(null);
    const [dataFormatada, setdataFormatada] = useState<string>("");
    const [convidado, setConvidado] = useState<Number>(0);
    const [justificativa, setJustificativa] = useState(false)
    const [mensagem, setMensagem] = useState(false)
    const [participa, setParticipa] = useState(false)
    const [mostrar, setMostrar] = useState(true)
    const [mostrarModal, setMostrarModal] = useState(true)


    useEffect(() => {
        instance.get(`admin/events/convidado/${usuarioID}`)
            .then((response) => {
                const eventos = response.data.map((convite: any) => convite.evento.id);
                if (eventos.length > 0) {
                    setConvidado(eventos[0]); // Pega o primeiro evento
                }
                console.log(convidado)
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    }, []);

    useEffect(() => {
        instance.get(`/admin/events/${convidado}`)
            .then((response) => {
                setEventos(response.data)
                const data = new Date(response.data.dataHora).toLocaleDateString('pt-BR');
                setdataFormatada(data)
            })
            .catch((error) => console.error("Erro ao buscar dados:", error))
    }, [convidado])


    const formEnviado = (e: React.FormEvent) => {
        e.preventDefault()
        setMensagem(true)
        setJustificativa(false)
        setParticipa(false)
    }

    return (
        <>
            {mostrarModal && (
                <section
                    className="flex justify-center items-center z-50" // fecha ao clicar fora
                    // onClick={() => setMostrarModal(false)}
                >
                    <div
                        className="max-w-[800px] w-[90%]" // modal mais estreito
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Container>
                            <form
                                onSubmit={formEnviado}
                                className="grid grid-cols-[58%,2%,40%] grid-rows-[35%,2%,63%] h-full rounded-[15px] text-black"
                            >
                                {/* --- ESQUERDA --- */}
                                <section className="col-start-1 row-start-1">
                                    <h1 className="font-sans text-[36px] font-semibold pl-[20px] pt-[30px]">
                                        {eventos ? eventos.titulo : "Carregando..."}
                                    </h1>
                                    <p className="font-sans text-[15px] font-semibold pl-[20px] pt-[15px] pb-[20px]">
                                        {eventos ? eventos.descricao : "Carregando..."}
                                    </p>
                                </section>

                                <span className="row-start-2 w-full h-[2px] bg-[#C2E8FF]" />

                                <section className="row-start-3 pt-[15px] pl-[20px]">
                                    <p className="font-sans text-[15px] font-semibold pb-[20px]">
                                        Informações gerais
                                    </p>
                                    <ul className="list-inside list-disc">
                                        <li className="font-sans text-[15px] font-semibold">
                                            {dataFormatada}
                                        </li>
                                        <li className="font-sans text-[15px] font-semibold">
                                            {eventos ? eventos.dataHora.split("T")[1].substring(0, 5) : ""}
                                        </li>
                                        <li className="font-sans text-[15px] font-semibold">
                                            {eventos ? eventos.localizacao : "Carregando..."}
                                        </li>
                                    </ul>
                                </section>

                                <span className="row-start-1 row-span-3 w-[2px] h-full bg-[#C2E8FF]" />

                                {/* --- DIREITA --- */}
                                <section className="flex flex-col items-center relative">
                                    <p className="font-sans text-[15px] font-semibold pt-[30px] pb-[30px]">
                                        Confirmação
                                    </p>
                                    <Botao onClick={() => setParticipa(true)}>Vou Participar</Botao>
                                </section>

                                <section className="col-start-3 row-start-3 flex flex-col items-center space-y-5">
                                    <Botao
                                        onClick={() => {
                                            setJustificativa(!justificativa);
                                            setParticipa(true);
                                        }}
                                    >
                                        Não Vou Participar
                                    </Botao>

                                    {justificativa && (
                                        <textarea
                                            required
                                            className="w-[200px] h-[150px] rounded-[10px] p-4 text-[15px] resize-y"
                                            placeholder="Caso não for participar do evento, justifique.."
                                        ></textarea>
                                    )}

                                    {participa && (
                                        <input
                                            type="submit"
                                            value="ENVIAR"
                                            className="bg-[#015084] w-[200px] h-[40px] rounded-[8px] text-white text-[15px] font-semibold cursor-pointer font-sans"
                                        />
                                    )}
                                </section>
                            </form>
                        </Container>
                    </div>
                </section>

            )
            }
        </>
    )
// import { useEffect, useState } from "react";
// import Botao from "../../../shared/components/botao";
// import Container from "../../../shared/components/container";
// import axios from "axios";

// interface Evento {
//   id: number;
//   titulo: string;
//   descricao?: string;
//   localizacao: string;
//   dataHora: string;
// }

// interface EventoDetalheProps {
//   evento: Evento;
//   onFechar?: () => void;
// }

// export default function EventoDetalhe({ evento, onFechar }: EventoDetalheProps) {
//   const usuarioID = Number(localStorage.getItem("userId")) || 1;
//   const [dataFormatada, setDataFormatada] = useState<string>("");
//   const [justificativa, setJustificativa] = useState(false);
//   const [mensagem, setMensagem] = useState(false);
//   const [participa, setParticipa] = useState(false);
//   const [motivo, setMotivo] = useState("");

//   useEffect(() => {
//     if (evento?.dataHora) {
//       const data = new Date(evento.dataHora).toLocaleDateString("pt-BR");
//       setDataFormatada(data);
//     }
//   }, [evento]);

//   const formEnviado = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMensagem(true);
//     setJustificativa(false);
//     setParticipa(false);

//     try {
//       const status = participa ? "CONFIRMADO" : "RECUSADO";
//       await axios.put(
//         `http://localhost:8080/admin/events/convite/${evento.id}/usuario/${usuarioID}`,
//         {
//           status,
//           motivo: motivo || null,
//         }
//       );
//       alert("Resposta enviada com sucesso!");
//       if (onFechar) onFechar();
//     } catch (error) {
//       console.error("Erro ao enviar resposta:", error);
//       alert("Erro ao enviar resposta.");
//     }
//   };

//   return (
//     <>
//       <section
//         className="flex justify-center items-center z-50"
//         onClick={onFechar}
//       >
//         <div
//           className="max-w-[800px] w-[90%]"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <Container>
//             <form
//               onSubmit={formEnviado}
//               className="grid grid-cols-[58%,2%,40%] grid-rows-[35%,2%,63%] h-full rounded-[15px] text-black"
//             >
//               {/* --- ESQUERDA --- */}
//               <section className="col-start-1 row-start-1">
//                 <h1 className="font-sans text-[36px] font-semibold pl-[20px] pt-[30px]">
//                   {evento.titulo}
//                 </h1>
//                 <p className="font-sans text-[15px] font-semibold pl-[20px] pt-[15px] pb-[20px]">
//                   {evento.descricao}
//                 </p>
//               </section>

//               <span className="row-start-2 w-full h-[2px] bg-[#C2E8FF]" />

//               <section className="row-start-3 pt-[15px] pl-[20px]">
//                 <p className="font-sans text-[15px] font-semibold pb-[20px]">
//                   Informações gerais
//                 </p>
//                 <ul className="list-inside list-disc">
//                   <li className="font-sans text-[15px] font-semibold">
//                     {dataFormatada}
//                   </li>
//                   <li className="font-sans text-[15px] font-semibold">
//                     {new Date(evento.dataHora).toLocaleTimeString("pt-BR", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </li>
//                   <li className="font-sans text-[15px] font-semibold">
//                     {evento.localizacao}
//                   </li>
//                 </ul>
//               </section>

//               <span className="row-start-1 row-span-3 w-[2px] h-full bg-[#C2E8FF]" />

//               {/* --- DIREITA --- */}
//               <section className="flex flex-col items-center relative">
//                 <p className="font-sans text-[15px] font-semibold pt-[30px] pb-[30px]">
//                   Confirmação
//                 </p>
//                 <Botao
//                   onClick={() => {
//                     setParticipa(true);
//                     setJustificativa(false);
//                   }}
//                 >
//                   Vou Participar
//                 </Botao>
//               </section>

//               <section className="col-start-3 row-start-3 flex flex-col items-center space-y-5">
//                 <Botao
//                   onClick={() => {
//                     setJustificativa(!justificativa);
//                     setParticipa(false);
//                   }}
//                 >
//                   Não Vou Participar
//                 </Botao>

//                 {justificativa && (
//                   <textarea
//                     required
//                     className="w-[200px] h-[150px] rounded-[10px] p-4 text-[15px] resize-y"
//                     placeholder="Caso não for participar do evento, justifique..."
//                     value={motivo}
//                     onChange={(e) => setMotivo(e.target.value)}
//                   ></textarea>
//                 )}

//                 {(participa || justificativa) && (
//                   <input
//                     type="submit"
//                     value="ENVIAR"
//                     className="bg-[#015084] w-[200px] h-[40px] rounded-[8px] text-white text-[15px] font-semibold cursor-pointer font-sans"
//                   />
//                 )}
//               </section>
//             </form>
//           </Container>
//         </div>
//       </section>
//     </>
//   );
}
