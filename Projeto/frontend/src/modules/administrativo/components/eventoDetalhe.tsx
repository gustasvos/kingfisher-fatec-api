import { useState } from "react"
import Botao from "../../../shared/components/botao"
import Container from "../../../shared/components/container"

export default function EventoDetalhe() {

    const [justificativa, setJustificativa] = useState(false)
    const [mensagem, setMensagem] = useState(false)
    const [participa, setParticipa] = useState(false)
    const formEnviado = (e: React.FormEvent) => {
        e.preventDefault()
        setMensagem(true)
        setJustificativa(false)
        setParticipa(false)
    }

    return (
        <section className="flex justify-center items-center h-screen">
            <Container>
                <form action="" onSubmit={formEnviado} className="grid grid-cols-[58%,2%,40%] grid-rows-[35%,2%,63%] h-full rounded-[15px]">
                    <section className="col-start-1 row-start-1 ">
                        <h1 className="font-sans text-[36px] font-semibold pl-[20px] pt-[30px]  ">Evento 1</h1>
                        <p className="font-sans text-[15px] font-semibold pl-[20px] pt-[15px]  pb-[20px]">Descreção do evento</p>
                    </section>
                    <span className="row-start-2 w-full h-[2px] bg-[#C2E8FF]" />
                    <section className="row-start-3 pt-[15px] pl-[20px]">
                        <p className="font-sans text-[15px] font-semibold pb-[20px]">Informações gerais</p>
                        <ul className="list-inside list-disc">
                            <li className="font-sans text-[15px] font-semibold">Data</li>
                            <li className="font-sans text-[15px] font-semibold">Horário</li>
                            <li className="font-sans text-[15px] font-semibold">local</li>
                        </ul>
                    </section>
                    <span className="row-start-1 row-span-3  w-[2px] h-full bg-[#C2E8FF]" />
                    <section className="flex flex-col items-center">
                        <p className="font-sans text-[15px] font-semibold pt-[30px] pb-[60px]">Confirmação</p>
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
                </form>
                {mensagem && (
                    <section className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                        <section className="bg-white rounded-[15px] p-8 drop-shadow-lg flex flex-col justify-center items-center">
                            <p className="text-black">Resposta enviada com sucesso</p>
                            <button onClick={() => {
                                setMensagem(false)
                            }} className="mt-4 bg-[#015084]  text-white px-4 py-2 rounded">
                                Fechar
                            </button>
                        </section>
                    </section>
                )}
            </Container>
        </section>
    )
}
