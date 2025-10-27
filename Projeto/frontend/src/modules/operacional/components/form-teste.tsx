import { useState, useEffect } from "react";
import instance from "../../../services/api";

interface AtualizarCadastroProps {
    id: number
}

export default function FormTeste({ id }: AtualizarCadastroProps) {
    const [nome, setNome] = useState('')
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await instance.get(`/cliente/${id}`)
                const usuario = response.data

                if (!usuario) {
                    setErro("Usuário não encontrado.")
                    return
                }

                setNome(usuario.nome)

            } catch (error) {
                setErro("Falha ao carregar dados do usuário, tenta de novo mais tarde.");
            }
        };

        fetchUsuario();
    }, [id]);
    return (
        <p>oi, testando!</p>
    )
}