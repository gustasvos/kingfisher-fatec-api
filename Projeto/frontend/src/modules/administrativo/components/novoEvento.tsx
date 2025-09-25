import { useState } from "react";
import Container from "../../../shared/components/container";
import MultiSelectDropdown from "./multiSelectDropDown";
import { Opcoes } from "./multiSelectDropDown";


export default function NovoEvento() {

    const [mensagem, setMensagem] = useState(false)
    const [titulo, setTiulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [data, setData] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [convidados,setConvidados] = useState<Opcoes[]>([])

    const formEnviado = (e: React.FormEvent) => {
        e.preventDefault()
        setMensagem(true)
    }

    return (
        <Container>
            <form action="" onSubmit={formEnviado} className="grid grid-cols-[50%,50%]">
                <section className="flex flex-col items-center pt-[60px] space-y-4">
                    <p className="font-sans text-[25px] text-[#053657] font-semibold">Criação de Novo Evento</p>
                    <section className="relative">
                        <input type="text" id="tituloEvento" placeholder="" value={titulo} onChange={(e) => setTiulo(e.target.value)} required className="w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label htmlFor="tituloEvento" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Título do Evento</label>
                    </section>
                    <section className="relative">
                        <textarea placeholder="" rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} required className="w-[300px] resize-none block rounded-t-lg px-2.5 pb-2.5 pt-9 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="" id="descricaoEvento"></textarea>
                        <label htmlFor="descricaoEvento" className=" absolute leading-relaxed text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 z-10 top-0 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Descrição do Evento</label>
                    </section>
                    <section className="relative">
                        <input type="date" id="dataEvento" value={data} onChange={(e) => setData(e.target.value)} required className="w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label htmlFor="dataEvento" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Data do Evento</label>
                    </section>
                    <section className="relative">
                        <input type="text" id="localEvento" placeholder="" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} required className="w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label htmlFor="localEvento" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Localização do Evento</label>
                    </section>
                </section>

                <section className="flex flex-col items-center justify-between pt-[72px] ">
                    <MultiSelectDropdown value={convidados} onChange={(novoValor) => setConvidados(novoValor ?? [])}/>
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
                            setConvidados([])
                        }} className="mt-4 bg-[#015084]  text-white px-4 py-2 rounded">
                            Fechar
                        </button>
                    </section>
                </section>
            )}
        </Container>
    )
}
