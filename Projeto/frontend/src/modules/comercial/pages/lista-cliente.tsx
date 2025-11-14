import { useState, useEffect } from "react"
import { Cliente } from "../../../types/cliente"
import Navbar from "../../../shared/components/navbar"
import Loading from "../../../shared/components/loading";
import CardCliente from "../components/card-cliente";
import instance from "../../../services/api";

export default function ListaCliente() {
    const [cliente, setCliente] = useState<Cliente[]>([])
    const [carregando, setCarregando] = useState(true)
    const [pesquisa, setPesquisa] = useState("")
    // Pega o ID do usuário logado
    const storedUser = localStorage.getItem("user")
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    const userId = parsedUser?.id || ""

    useEffect(() => {
        instance.get<Cliente[]>(`/cliente/comercial/${userId}`)
            .then((response: any) => {
                setCliente(response.data)
                console.log(cliente)
            })
            .catch((error: any) =>
                console.error("Erro ao buscar colaboradores:", error)
            )
            .finally(() => {
                setCarregando(false)
            })
    }, [userId])

    const excluirCliente = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir esse cliente?")) {
            await instance.delete(`/cliente/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setCliente((prev) => prev.filter((cli) => cli.id !== id))
        }
    }

    // filtra os cliente pelo nome
    const clienteFiltrados = cliente.filter(c =>
        c.NomeFantasia.toLowerCase().includes(pesquisa.toLowerCase())
    )

    if (carregando) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <section className="flex">
                <section>
                    <Navbar />
                </section>
                <section className="w-screen p-7 ml-[80px] max-h-screen overflow-auto text-black">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Buscar clientes..."
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {clienteFiltrados.map((c) => (
                            <CardCliente key={c.id} cliente={c} excluir={excluirCliente} />
                        ))}
                    </div>
                </section>
            </section>
        </>
    )
}