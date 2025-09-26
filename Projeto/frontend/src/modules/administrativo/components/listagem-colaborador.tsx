import Navbar from "../../../shared/components/navbar"
import { useState, useEffect } from "react"
import axios from "axios";
import CardColaborador from "./cardColaborador"
import { Colaborador } from "../../../types/colaborador";

export default function ListagemColaborador() {
    const [colaborador, setColaborador] = useState<Colaborador[]>([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        axios.get<Colaborador[]>("http://localhost:8080/Usuarios")
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
                    <CardColaborador key={c.id} colaborador={c} />
                ))}
            </section>

        </section>
    )
}