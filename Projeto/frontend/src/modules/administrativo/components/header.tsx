// Header.tsx
import React from "react";

type User = { nome: string; cargo: string; genero: string };

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header
      className="card p-8 flex gap-6 items-center bg-[#135b78] rounded-lg overflow-hidden"
      style={{
        backgroundColor: "#135b78",
        color: "#fff",
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: "#135b78", opacity: 0.85 }}
      ></div>

      <div>
        <h1 className="text-2xl font-bold tracking-wide text-white">
          {user?.genero === "F"
            ? `SEJA BEM-VINDA ${user?.nome.toUpperCase()}`
            : `SEJA BEM-VINDO ${user?.nome.toUpperCase() || "Usuário"}`}
        </h1>
        <p className="mt-4 font-medium text-white">
          {user?.cargo.toUpperCase() || "—"}
        </p>
      </div>
    </header>
  );
};

export default Header;
