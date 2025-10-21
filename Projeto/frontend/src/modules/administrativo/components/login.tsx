import imgLogin from "../../../assets/imgLogin.jpeg";
import { IMaskInput } from "react-imask";
import instance from "../../../services/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import LocalTrabalho from "./colaboradorLoca";
import Modal from "../../../shared/components/modal";


export default function Login() {
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState<string | null>(null);
    const navigate = useNavigate(); // hook do react-router-dom
    const [temUsuario, setTemUsuario] = useState<boolean | null>(null);
    const [abertoModal, setAbertoModal] = useState(false)
    const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null)

    useEffect(() => {
        axios.get("http://localhost:8080/users/exists")
            .then(response => {
                setTemUsuario(response.data.exists);
            })
            .catch(err => {
                console.error("Erro ao verificar usuários:", err);
                setTemUsuario(true); // assume que tem pra evitar liberar criação indevida
            });
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro(null);       // limpa erro anterior
        setSucesso(null);    // limpa sucesso anterior
        const cpfLimpo = cpf.replace(/\D/g, "");
        try {
            const response = await instance.post("/login", { cpf: cpfLimpo, senha });
            const { token, user } = response.data;
            if (token && user) {
                localStorage.setItem("token", token);
                localStorage.setItem("userId", user.id.toString());  // Armazenando o ID do usuário
                setSucesso("Login realizado com sucesso!");
                // Aguarda 1 segundo e redireciona
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } else {
                setErro("Token não recebido do servidor");
            }
        } catch (error) {
            console.error("Erro no login:", error);
            setErro("Erro ao fazer login");
        }
    }

    const abrirModalLocalTrabalho = (e: React.MouseEvent) => {
        e.preventDefault()
        setConteudoModal(<LocalTrabalho onFechar={() => setAbertoModal(false)} />)
        setAbertoModal(true)
    }

    return (
        <div className="grid grid-cols-[50%_50%]">
            <div >
                <img src={imgLogin} alt="login" className="w-full object-cover h-screen" />
            </div>
            <div className="bg-[#EAF7FF] flex justify-center items-center ">
                <div className="bg-[#015084] w-[280px] md:w-[400px] h-[350px] md:h-[500px] p-4 rounded-[5px] md:rounded-[10px] flex justify-center drop-shadow-[2px_2px_3px_rgba(1,80,132,0.8)]">
                    <form onSubmit={handleLogin}>
                        <p className="text-[25px] md:text-[45px] font-sans font-bold italic text-white pt-5 md:drop-shadow-[10px_8px_3px_rgba(0,0,0,0.3)]">
                            NEWE
                        </p>
                        <p className="text-[25px] md:text-[45px] font-sans text-[#5AA9E6] leading-[0.5] drop-shadow-[10px_0px_3px_rgba(0,0,0,0.3)]">
                            NEWE
                        </p>
                        <p className="pt-8 md:pt-10 text-[15px] md:text-[25px] text-white font-sans font-medium pb-1 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.3)]">
                            CPF
                        </p>
                        <IMaskInput mask={"000.000.000-00"} placeholder=" Digite seu CPF" required maxLength={14} value={cpf} onAccept={(value: any) => setCpf(value)} className="w-[200px] md:w-[300px] h-[25px] md:h-[45px] rounded-[10px] md:rounded-[15px] pl-1 md:pl-3 shadow-[4px_4px_4px_rgba(0,0,0,0.4)] outline-[#053657] text-black" />
                        <p className="pt-6 md:pt-8 text-[15px] md:text-[25px] text-white font-sans font-medium pb-1 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.3)]">
                            Senha
                        </p>
                        <input type="password" placeholder=" Digite sua senha" required value={senha} onChange={(e) => setSenha(e.target.value)} className="w-[200px] md:w-[300px] h-[25px] md:h-[45px] rounded-[10px] md:rounded-[15px] pl-1 md:pl-3 shadow-[4px_4px_4px_rgba(0,0,0,0.4)] outline-[#053657] text-black" />
                        <div className="pt-10 flex justify-center">
                            {/* <button 
                                onClick={abrirModalLocalTrabalho}
                                className="bg-white w-[100px] md:w-[200px] p-2 rounded-[10px] md:rounded-[15px] text-[#053657] text-[12px] md:text-[20px] font-sans font-medium  shadow-[4px_4px_4px_rgba(0,0,0,0.4)] cursor-pointer hover:bg-[#053657] hover:text-white"
                                >
                                    ENTRAR
                            </button> */}
                            <input type="submit" value={'ENTRAR'} onClick={abrirModalLocalTrabalho} className="bg-white w-[100px] md:w-[200px] p-2 rounded-[10px] md:rounded-[15px] text-[#053657] text-[12px] md:text-[20px] font-sans font-medium  shadow-[4px_4px_4px_rgba(0,0,0,0.4)] cursor-pointer hover:bg-[#053657] hover:text-white" />
                        </div>
                        {/* Se não tem usuário (temUsuario === false), mostra o link */}
                        {temUsuario === false && (
                            <div className="mt-4 text-center">
                                <a href="/Cadastrar" className="text-white-600 underline" >
                                    Criar uma nova conta
                                </a>
                            </div>
                        )}
                        {sucesso && (
                            <div className="pt-4 text-green-600 text-center text-[14px] md:text-[18px]">
                                {sucesso}
                                <Modal
                                    aberto={abertoModal}
                                    onFechar={() => setAbertoModal(false)}
                                    // modalClassName="w-[90%] sm:w-[95%] md:w-[80%] lg:w-[750px] xl:w-[900px] max-h-[90vh] bg-[rgba(28,175,23,0.94)] rounded-[15px]"
                                    modalClassName=""
                                >
                                    <div className='max-w-[900px] w-[70vw]'>
                                        {conteudoModal}
                                    </div>
                                </Modal>
                            </div>
                        )}
                        {erro && (
                            <div className="pt-4 text-red-600 text-center text-[14px] md:text-[18px]">
                                {erro}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

