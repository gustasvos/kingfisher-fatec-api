import { NavLink } from "react-router-dom";
import React, { useState } from "react";

// Imagens importadas igual ao Sidebar
import imgLogin from './../../assets/imgLoginKey.svg';
import imgHome from './../../assets/imgHomepage.png';
import imgUser from './../../assets/imgAddUserMale.png';
import imgCalendar from './../../assets/imgTearOffCalendar.png';
import imgNotification from './../../assets/imgDoorbell.png';
import imgColab from './../../assets/imgTeam.svg';
import imgAddCliente from './../../assets/imgAddCliente.png';
import imgListaCliente from './../../assets/imgListaCliente.png'
import Cadastro from "../../modules/administrativo/pages/PaginaCadastro";
import Modal from "./modal";
import EventoDetalhe from "../../modules/administrativo/components/eventoDetalhe";
import FormTeste from "../../modules/operacional/components/form-teste";

export default function Navbar() {
  const [aberto, setAberto] = useState(false);
  const [abertoModal, setAbertoModal] = useState(false)
  const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null); // Controla o conteúdo do modal


  // Modals

  const abrirModalCadastro = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<Cadastro />)
    setAbertoModal(true)
  }

  const abrirModalConvites = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<EventoDetalhe />)
    setAbertoModal(true)
  }

  const abrirModalCadastroCliente = (e: React.MouseEvent) => {
    e.preventDefault()
    /**colocar o componente aqui, igual nos outros */
    // setConteudoModal(</>)
    setAbertoModal(true)
  }
 

  return (
    <nav className={`${aberto ? "w-[200px]" : "w-[60px]"} bg-[#135b78] flex flex-col items-center min-h-screen text-white py-6 gap-6 fixed top-0`}>
      <section
        className={`${aberto ? "self-start flex flex-col justify-start space-y-1 pl-6" : "flex flex-col justify-start space-y-1"} cursor-pointer`}
        onClick={() => setAberto(!aberto)}
      >
        <span className="w-6 h-[3px] bg-white" />
        <span className="w-6 h-[3px] bg-white" />
        <span className="w-6 h-[3px] bg-white" />
      </section>

      <section className="flex flex-col space-y-6">
        {/* Aqui usei as rotas que você tem no Sidebar, pode ajustar se quiser */}
        <NavLink to="/" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
          <img src={imgLogin} alt="Login" className="w-7 h-7" />
          {aberto ? <p className="pl-2 text-[15px] font-semibold">Login</p> : null}
        </NavLink>

        <NavLink to="/home" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
          <img src={imgHome} alt="Home" className="w-7 h-7" />
          {aberto ? <p className="pl-2 text-[15px] font-semibold">Home</p> : null}
        </NavLink>

        <NavLink to="#" className="rounded-md flex items-center hover:bg-[#1b7091d8]" onClick={abrirModalCadastro}>
          <img src={imgUser} alt="Cadastrar Usuário" className="w-7 h-7" />
          {aberto ? <p className="pl-2 text-[15px] font-semibold">Cadastrar Usuário</p> : null}
        </NavLink>

        <NavLink to="/eventos" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
          <img src={imgCalendar} alt="Calendário de Eventos" className="w-7 h-7" />
          {aberto ? <p className="pl-2 text-[15px] font-semibold">Calendário de Eventos</p> : null}
        </NavLink>

        <NavLink to="/eventos-colaborador" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
          <img src={imgNotification} alt="Convites" className="w-7 h-7" />
          {aberto ? <p className="pl-2 text-[15px] font-semibold">Convites</p> : null}
        </NavLink>

        <NavLink to="/colaboradores" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
          <img src={imgColab} alt="Colaboradores" className="w-7 h-7" />
          {aberto ? <p className="pl-2 text-[15px] font-semibold">Colaboradores</p> : null}
        </NavLink>

        <NavLink to="#" className="rounded-md flex items-center hover:bg-[#1b7091d8]" onClick={abrirModalCadastroCliente}>
          <img src={imgAddCliente} alt="Colaboradores" className="w-7 h-7" />
          {aberto ? <p className="pl-2 text-[15px] font-semibold">Adicionar Cliente</p> : null}
        </NavLink>

        <NavLink to="/listaCliente" className="rounded-md flex items-center hover:bg-[#1b7091d8]">
          <img src={imgListaCliente} alt="Colaboradores" className="w-7 h-7" />
          {aberto ? <p className="pl-2 text-[15px] font-semibold">Clientes</p> : null}
        </NavLink>
      </section>

      <Modal aberto={abertoModal} onFechar={() => setAbertoModal(false)}>
        {conteudoModal}
      </Modal>
    </nav>
  );
}
