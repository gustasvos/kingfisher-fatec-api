import Navbar from "../../../shared/components/navbar"
import { useState, useEffect } from "react"
import axios from "axios";
import CardColaborador from "./cardColaborador"
import { Colaborador } from "../../../types/colaborador";
import Loading from "../../../shared/components/loading";

export default function ListagemColaborador() {
    const [colaborador, setColaborador] = useState<Colaborador[]>([])
    const [carregando, setCarregando] = useState(true)
    const [pesquisa, setPesquisa] = useState("")

    useEffect(() => {
        axios.get<Colaborador[]>("http://localhost:8080/usuario/list")
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
            // colocar o nosso http, esse foi só para eu testar
            await fetch(`http://localhost:8080/usuario/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setColaborador((prev) => prev.filter((colabo) => colabo.id !== id))
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