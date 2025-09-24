import { useState } from "react";
import Botao from "../../../shared/components/botao";
import Container from "../../../shared/components/container";
import MultiSelectDropdown from "./multiSelectDropDown";


export default function NovoEvento() {

    const [mensagem, setMensagem] = useState(false)
    const [titulo, setTiulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [data, setData] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [convidados,setConvidados] = useState([])

    const formEnviado = (e: React.FormEvent) => {
        e.preventDefault()
        setMensagem(true)
    }

    return (
        <Container>
            <form action="" onSubmit={formEnviado} className="grid grid-cols-[50%,50%]">
                <section className="flex flex-col items-center pt-[25px] space-y-4">
                    <p className="font-sans text-[25px] text-[#053657] font-semibold">Criação de Novo Evento</p>
                    <section>
                        <p className="font-sans text-[#053657] font-medium">Título</p>
                        <input type="text" placeholder="Digite o título do evento" value={titulo} onChange={(e) => setTiulo(e.target.value)} required className="w-[300px] h-[30px] p-3 rounded-[8px] outline-[#053657]" />
                    </section>
                    <section>
                        <p className="font-sans text-[#053657] font-medium">Descrição</p>
                        <textarea placeholder="Digite a descrição do evento" value={descricao} onChange={(e) => setDescricao(e.target.value)} required className="w-[300px] h-[150px] p-3 rounded-[8px] outline-[#053657]" name="" id=""></textarea>
                    </section>
                    <section>
                        <p className="font-sans text-[#053657] font-medium">Data</p>
                        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required className="w-[300px] h-[30px] p-3 rounded-[8px] outline-[#053657]" />
                    </section>
                    <section>
                        <p className="font-sans text-[#053657] font-medium">Local</p>
                        <input type="text" placeholder="Digite o local do evento" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} required className="w-[300px] h-[30px] p-3 rounded-[8px] outline-[#053657]" />
                    </section>
                </section>
                <section className="flex flex-col items-center justify-between pt-[38px] ">
                    <MultiSelectDropdown />
                    <input type="submit" value={'ENVIAR'} className="bg-[#015084] w-[250px] h-[45px] rounded-[8px] text-white text-[15px] font-semibold cursor-pointer font-sans" />
                </section>

            </form>
            {mensagem && (
                <section className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <section className="bg-white rounded-[15px] p-8 drop-shadow-lg flex flex-col justify-center items-center">
                        <p className="text-black">Resposta enviada com sucesso</p>
                        <button onClick={() => {
                            setMensagem(false)
                            setTiulo('')
                            setDescricao('')
                            setData('')
                            setLocalizacao('')
                        }} className="mt-4 bg-[#015084]  text-white px-4 py-2 rounded">
                            Fechar
                        </button>
                    </section>
                </section>
            )}
        </Container>
    )
}
