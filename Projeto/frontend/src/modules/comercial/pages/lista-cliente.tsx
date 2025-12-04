import { useState, useEffect, useCallback } from "react"
import { Cliente } from "../../../types/cliente"
import Navbar from "../../../shared/components/navbar"
import Loading from "../../../shared/components/loading";
import CardCliente from "../components/card-cliente";
import instance from "../../../services/api";
import Modal from "../../../shared/components/modal";
import LocalTrabalho from "../../administrativo/components/localTrabalho";
import { User } from "../../../shared/components/header";

export default function ListaCliente() {
    const [cliente, setCliente] = useState<Cliente[]>([])
    const [carregando, setCarregando] = useState(true)
    const [pesquisa, setPesquisa] = useState("")
    // Pega o ID do usuário logado
    const storedUser = localStorage.getItem("user")
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    const userId = parsedUser?.id || ""
    const [mostrarModal, setMostrarModal] = useState(false);
    const token = localStorage.getItem("token");
    const [localTrabalhoUpdateKey, setLocalTrabalhoUpdateKey] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    
     // Buscar usuário
  useEffect(() => {
    if (userId) {
      instance
        .get(`/usuario/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((error) => console.error("Erro ao buscar usuário:", error));
    }
  }, [userId]);

    const checkModal = useCallback(async () => {
        if (!userId || !token) return;
        try {
            const resp = await instance.get(`/usuario/${userId}/local/check`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(`Modal ${mostrarModal}`)
            setMostrarModal(resp.data?.mostrarModal ?? false);
        } catch (error) {
            console.error("Erro ao checar modal:", error);
        }
    }, [userId, token]);
    
        const handleLocalTrabalhoClose = () => {
            setMostrarModal(false);
            setLocalTrabalhoUpdateKey(prev => prev + 1);
        };
    
    useEffect(() => {
        if (user) {
            checkModal();
        }
    }, [user, checkModal, localTrabalhoUpdateKey]);


    const fetchClients = useCallback(() => {
        setCarregando(true)
        instance.get<Cliente[]>(`/cliente/comercial/${userId}`)
            .then((response: any) => {
                setCliente(response.data)
            })
            .catch((error: any) =>
                console.error("Erro ao buscar colaboradores:", error)
            )
            .finally(() => {
                setCarregando(false)
            })
    }, [userId])

    const handleClientCategoryUpdate = useCallback((newCategory: string, clientId: number) => {
        setCliente(prevClientes => 
            prevClientes.map(c => 
                c.id === clientId ? { ...c, ultimaCategoria: newCategory } : c
            )
        )
        fetchClients()
    }, [fetchClients])

    useEffect(() => {
        fetchClients()
    }, [fetchClients])

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {clienteFiltrados.map((c) => (
                            <CardCliente key={c.id} cliente={c} excluir={excluirCliente} onUpdate={handleClientCategoryUpdate} />
                        ))}
                    </div>
                </section>
                {/* Modal LocalTrabalho */}
                <Modal aberto={mostrarModal} onFechar={() => setMostrarModal(false)} modalClassName="">
                    <LocalTrabalho onFechar={handleLocalTrabalhoClose} />
                </Modal>
            </section>
        </>
    )
}