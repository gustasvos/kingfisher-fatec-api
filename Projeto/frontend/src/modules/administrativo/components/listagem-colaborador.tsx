import Navbar from "../../../shared/components/navbar"
import { useState, useEffect } from "react"
import instance from "../../../services/api";
import CardColaborador from "./cardColaborador"
import { Colaborador } from "../../../types/colaborador";
import Loading from "../../../shared/components/loading";

export default function ListagemColaborador() {
    const [colaborador, setColaborador] = useState<Colaborador[]>([])
    const [carregando, setCarregando] = useState(true)
    const [pesquisa, setPesquisa] = useState("")

    useEffect(() => {
        instance.get<Colaborador[]>("/usuario/list")
            .then((response: any) => {
                setColaborador(response.data)
            })
            .catch((error: any) =>
                console.error("Erro ao buscar colaboradores:", error)
            )
            .finally(() => {
                setCarregando(false)
            })
    }, [])

    const excluirColaborador = async(id:number) => {
        if(window.confirm("Tem certeza que deseja excluir esse colborador?")){
            try {
                await instance.delete(`/usuario/${id}`);
                setColaborador((prev) => prev.filter((colabo) => colabo.id !== id));
            } catch (error) {
                console.error("Erro ao excluir colaborador:", error);
            }
        }
    }

    // filtra os colaboradores pelo nome
    const colaboradoresFiltrados = colaborador.filter(c =>
        c.nome.toLowerCase().includes(pesquisa.toLowerCase())
    )

    if (carregando) {
        return (
            <Loading />
        )
    }

    return (
        <section className="bg-[#d4eeff] flex">
            <section>
                <Navbar />
            </section>
            <section className="w-screen p-7 ml-[80px] max-h-screen overflow-auto text-black">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar colaborador..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {colaboradoresFiltrados.map((c) => (
                        <CardColaborador key={c.id} colaborador={c} excluir={excluirColaborador} />
                    ))}
                </div>
            </section>
        </section>
    )
}