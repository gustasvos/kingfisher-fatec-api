import Navbar from "../../../shared/components/navbar"
import { useState, useEffect } from "react"
import axios from "axios";
import CardColaborador from "./cardColaborador"
import { Colaborador } from "../../../types/colaborador";

export default function ListagemColaborador() {
    const [colaborador, setColaborador] = useState<Colaborador[]>([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        // colocar o nosso http, esse foi só para eu testar
        axios.get<Colaborador[]>("http://localhost:3001/Usuarios")
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
            await fetch(`http://localhost:3001/Usuarios/${id}`, {
                method: "DELETE"
            })
            setColaborador((prev) => prev.filter((colabo) => colabo.id !== id))
        }
    }


    if (carregando) {
        return (
            <p>Carregando colaboradores</p>
        )
    }

    return (
        <section className="bg-[#EDF2FB] flex">
            <section>
                <Navbar />
            </section>
            <section className="w-screen p-7 grid grid-cols-2 gap-2 gap-x-[100px] ml-[80px] max-h-screen overflow-auto">
                {colaborador.map((c) => (
                    <CardColaborador key={c.id} colaborador={c} excluir={excluirColaborador} />
                ))}
            </section>

        </section>
    )
}