import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "./../../contexts/AuthContext";
import { FaBars, FaHome, FaUserPlus, FaCalendarAlt, FaBell, FaUsers, FaClipboardList, FaListUl, FaFilter, FaEdit, FaMoneyBill } from "react-icons/fa";
import { MdDashboard, MdLogout, MdPersonAdd } from "react-icons/md";
import { FaHandHoldingDollar, FaListCheck, FaMoneyBillTrendUp, FaMoneyCheckDollar } from "react-icons/fa6";


// Componentes e modais
import Modal from "./modal";
import Cadastro from "../../modules/administrativo/pages/PaginaCadastro";
import CadastroCliente from "../../modules/comercial/pages/cadastrocliente";

interface NavItemProps {
  to?: string;
  onClick?: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  label: string;
  aberto: boolean;
}

// Componente auxiliar para os links (evita repetição de classes CSS)
const NavItem = ({ to, onClick, icon, label, aberto }: NavItemProps) => {
  const baseClasses = "rounded-md flex items-center p-2 hover:bg-[#1b7091d8] w-full transition-colors duration-200";

  const content = (
    <>
      <span className="text-2xl">{icon}</span>
      {aberto && <p className="pl-3 text-[15px] font-semibold whitespace-nowrap">{label}</p>}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseClasses} text-left`}>
        {content}
      </button>
    );
  }

  return (
    <NavLink to={to || "#"} className={baseClasses}>
      {content}
    </NavLink>
  );
};

export default function Navbar() {
  const [aberto, setAberto] = useState(false);
  const [abertoModal, setAbertoModal] = useState(false);
  const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null);
  const [role, setRole] = useState<string | null>(null);

  const { logout, user } = useAuth();

  // Recupera o usuário logado e define o papel (role)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setRole(parsedUser?.role || null);
    }
  }, []);

  // Funções para abrir modais
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

  // Renderiza menus conforme o role do usuário
  const renderMenuPorRole = () => {
    switch (role) {
      // ------------------ ADMNISTRATIVO ------------------
      case "admin":
        return (
          <div className="flex flex-col gap-2 w-full px-2">
            <NavItem to="/home" icon={<FaHome />} label="Home" aberto={aberto} />
            <NavItem onClick={abrirModalCadastro} icon={<FaUserPlus />} label="Cadastrar Usuário" aberto={aberto} />
            <NavItem to="/eventos" icon={<FaCalendarAlt />} label="Calendário de Eventos" aberto={aberto} />
            <NavItem to="/eventos-colaborador" icon={<FaBell />} label="Convites" aberto={aberto} />
            <NavItem to="/colaboradores" icon={<FaUsers />} label="Colaboradores" aberto={aberto} />
            <NavItem to="/resposta-eventos" icon={<FaClipboardList />} label="Relatório de Aproveitamento" aberto={aberto} />
            {/* <NavItem to="/home-op-admin" icon={<MdDashboard />} label="Dashboard" aberto={aberto} /> */}
          </div>
        );

      // ------------------ OPERACIONAL ------------------
      case "operacional":
        return (
          <div className="flex flex-col gap-2 w-full px-2">
            <NavItem to="/home-colab" icon={<FaHome />} label="Home" aberto={aberto} />
            <NavItem to="/eventos" icon={<FaCalendarAlt />} label="Calendário de Eventos" aberto={aberto} />
            <NavItem to="/eventos-colaborador" icon={<FaBell />} label="Convites" aberto={aberto} />
            <NavItem to="/lista-check-colaborador" icon={<FaListCheck />} label="Checklists" aberto={aberto} />
          </div>
        );

      // ------------------ COMERCIAL ------------------
      case "comercial":
        return (
          <div className="flex flex-col gap-2 w-full px-2">
            <NavItem onClick={abrirModalCadastroCliente} icon={<MdPersonAdd />} label="Adicionar Cliente" aberto={aberto} />
            <NavItem to="/eventos" icon={<FaCalendarAlt />} label="Calendário de Eventos" aberto={aberto} />
            <NavItem to="/listaCliente" icon={<FaListUl />} label="Clientes" aberto={aberto} />
            <NavItem to="/eventos-colaborador" icon={<FaBell />} label="Convites" aberto={aberto} />
            <NavItem to="/funilVendas" icon={<FaFilter />} label="Funil de Vendas" aberto={aberto} />
            <NavItem to="/cotacao" icon={<FaHandHoldingDollar />} label="Cotações" aberto={aberto} />
          </div>
        );

      // ------------------ DEFAULT (caso sem role) ------------------
      default:
        return (
          <p className="text-center text-sm opacity-60">Carregando menu...</p>
        );
    }
  };

  return (
    <nav className={`${aberto ? "w-auto" : "w-[60px]"} bg-[#135b78] flex border-r border-black/50 shadow-lg flex-col items-center min-h-screen text-white py-6 justify-between fixed top-0 z-10 transition-all duration-300`}>

      {/*SEÇÃO SUPERIOR (Menu)*/}
      <div className="flex flex-col items-center w-full gap-6">
        {/* Botão hamburguer */}
        <div className="w-full flex justify-start px-3">
          <button
            className="p-2 rounded hover:bg-[#1b7091d8] transition-colors"
            onClick={() => setAberto(!aberto)}
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Menu dinâmico */}
        <section className="flex flex-col w-full gap-2 overflow-y-auto">
          {renderMenuPorRole()}
        </section>
      </div>

      {/*SEÇÃO INFERIOR (Usuário + Logout)*/}
      <section className="flex flex-col gap-2 w-full px-2 border-t border-[#1b7091d8]">
        {aberto && (
          <div className="flex flex-col items-center mb-2 text-center">
            <p className="text-sm font-semibold text-center break-words max-w-full mt-2" title={user?.nome}>
              {user?.nome || 'Usuário'}
            </p>
            <p className="text-xs opacity-80 capitalize break-words max-w-full">
              {user?.cargo || 'Cargo'}
            </p>
          </div>
        )}

        {/* Botão Logout */}
        <NavItem onClick={logout} icon={<MdLogout />} label="Sair" aberto={aberto} />
      </section>

      {/* Modal Dinâmico */}
      <Modal aberto={abertoModal} onFechar={() => setAbertoModal(false)}>
        {conteudoModal}
      </Modal>
    </nav>
  );
}
