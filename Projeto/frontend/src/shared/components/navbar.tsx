import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "./../../contexts/AuthContext";

// Imagens
import imgLogin from './../../assets/imgLoginKey.svg';
import imgHome from './../../assets/imgHomepage.png';
import imgUser from './../../assets/imgAddUserMale.png';
import imgCalendar from './../../assets/imgTearOffCalendar.png';
import imgNotification from './../../assets/imgDoorbell.png';
import imgColab from './../../assets/imgTeam.svg';
import imgAddCliente from './../../assets/imgAddCliente.png';
import imgListaCliente from './../../assets/imgListaCliente.png';
import imgRespostaEvento from './../../assets/imgRespostaEvento.png';
import imgDashboard from './../../assets/imgDashboard.png';
import imgFunilVendas from './../../assets/imgFunilVendas.png';

// Componentes e modais
import Modal from "./modal";
import Cadastro from "../../modules/administrativo/pages/PaginaCadastro";
import CadastroCliente from "../../modules/comercial/pages/cadastrocliente";

export default function Navbar() {
  const [aberto, setAberto] = useState(false);
  const [abertoModal, setAbertoModal] = useState(false);
  const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null);
  const [role, setRole] = useState<string | null>(null);

  const { logout } = useAuth();

  // 🔹 Recupera o usuário logado e define o papel (role)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setRole(parsedUser?.role || null);
    }
  }, []);

  // 🔹 Funções para abrir modais
  const abrirModalCadastro = (e: React.MouseEvent) => {
    e.preventDefault();
    setConteudoModal(<Cadastro />);
    setAbertoModal(true);
  };

  const abrirModalCadastroCliente = (e: React.MouseEvent) => {
    e.preventDefault();
    setConteudoModal(<CadastroCliente />);
    setAbertoModal(true);
  };

  // 🔹 Renderiza menus conforme o role do usuário
  const renderMenuPorRole = () => {
    switch (role) {
      // ------------------ ADMNISTRATIVO ------------------
      case "admin":
        return (
          <>
            <NavLink to="/home" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgHome} alt="Home" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Home</p>}
            </NavLink>

            <NavLink to="#" className="rounded-md flex items-center hover:bg-[#1b7091d8]" onClick={abrirModalCadastro}>
              <img src={imgUser} alt="Cadastrar Usuário" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Cadastrar Usuário</p>}
            </NavLink>

            <NavLink to="/eventos" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgCalendar} alt="Calendário de Eventos" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Calendário de Eventos</p>}
            </NavLink>

            <NavLink to="/eventos-colaborador" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgNotification} alt="Convites" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Convites</p>}
            </NavLink>

            <NavLink to="/colaboradores" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgColab} alt="Colaboradores" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Colaboradores</p>}
            </NavLink>

            <NavLink to="/resposta-eventos" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgRespostaEvento} alt="Relatório" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Relatório de Aproveitamento</p>}
            </NavLink>

            <NavLink to="/home-op-admin" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgDashboard} alt="Home" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Dashboard</p>}
            </NavLink>
          </>
        );

      // ------------------ OPERACIONAL ------------------
      case "operacional":
        return (
          <>
            <NavLink to="/home-colab" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgHome} alt="Home" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Home</p>}
            </NavLink>

            <NavLink to="/eventos" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgCalendar} alt="Calendário" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Calendário de Eventos</p>}
            </NavLink>

            <NavLink to="/eventos-colaborador" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgNotification} alt="Convites" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Convites</p>}
            </NavLink>
          </>
        );

      // ------------------ COMERCIAL ------------------
      case "comercial":
        return (
          <>
            {/* <NavLink to="/home" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgHome} alt="Home" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Home</p>}
            </NavLink> */}
            <NavLink to="/eventos" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgCalendar} alt="Calendário" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Calendário de Eventos</p>}
            </NavLink>

            <NavLink to="/eventos-colaborador" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgNotification} alt="Convites" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Convites</p>}
            </NavLink>

            <NavLink to="#" className="rounded-md flex items-center hover:bg-[#1b7091d8]" onClick={abrirModalCadastroCliente}>
              <img src={imgAddCliente} alt="Adicionar Cliente" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Adicionar Cliente</p>}
            </NavLink>

            <NavLink to="/listaCliente" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgListaCliente} alt="Clientes" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">Clientes</p>}
            </NavLink>

            <NavLink to="/funilVendas" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
              <img src={imgFunilVendas} alt="Clientes" className="w-7 h-7" />
              {aberto && <p className="pl-2 text-[15px] font-semibold">FunilVendas</p>}
            </NavLink>
          </>
        );

      // ------------------ DEFAULT (caso sem role) ------------------
      default:
        return (
          <p className="text-center text-sm opacity-60">Carregando menu...</p>
        );
    }
  };

  return (
    <nav className={`${aberto ? "w-[200px]" : "w-[60px]"} bg-[#135b78] flex flex-col items-center min-h-screen text-white py-6 gap-6 fixed top-0 z-10`}>
      {/* Botão hamburguer */}
      <section
        className={`${aberto ? "self-start flex flex-col justify-start space-y-1 pl-6" : "flex flex-col justify-start space-y-1"} cursor-pointer`}
        onClick={() => setAberto(!aberto)}
      >
        <span className="w-6 h-[3px] bg-white" />
        <span className="w-6 h-[3px] bg-white" />
        <span className="w-6 h-[3px] bg-white" />
      </section>

      {/* Menu dinâmico */}
      <section className="flex flex-col space-y-6">
        <button onClick={logout} className="rounded-md flex items-center hover:bg-[#1b7091d8]">
          <img src={imgLogin} alt="Logout" className="w-7 h-7" />
          {aberto && <p className="pl-2 text-[15px] font-semibold">Sair</p>}
        </button>

        {renderMenuPorRole()}
      </section>

      {/* Modal Dinâmico */}
      <Modal aberto={abertoModal} onFechar={() => setAbertoModal(false)}>
        {conteudoModal}
      </Modal>
    </nav>
  );
}
