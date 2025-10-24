import React from "react";

export interface User {
  avatarUrl?: string;
  nome: string;
  role: string;
  email: string;
}

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  // 💡 CORREÇÃO: Definir um usuário temporário se 'user' for null
    const tempUser: User = {
        nome: "COLABORADOR",
        role: "Carregando...",
        email: "...",
    };

    // Usamos o usuário real (se não for null) ou o usuário temporário
    const userToDisplay = user ?? tempUser;

  return (
    <header className="card p-8 flex gap-6 items-center bg-[#135b78] rounded-lg overflow-hidden ml-10 w-[93%] justify-self-center"
      style={{ color: "#000" }}
    >
      <div>
        <h1 className="text-2xl font-bold tracking-wide text-white">
          SEJA BEM-VINDO {userToDisplay.nome.toUpperCase()}
        </h1>
        <p id="cargo" className="mt-4 font-medium text-white">
          {userToDisplay.role}
        </p>
        <p id="email" className="text-sm opacity-90 text-white">
          {userToDisplay.email}
        </p>
      </div>
    </header>
  );
};

export default Header;
