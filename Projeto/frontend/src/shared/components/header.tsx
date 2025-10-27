import React from "react";

interface User {
  name: string;
  role: string;
}

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="card p-8 flex gap-6 items-center bg-[#135b78] rounded-lg overflow-hidden ml-10 w-[93%] justify-self-center"
      style={{ color: "#000" }}
    >

      <div>
        <h1 className="text-2xl font-bold tracking-wide text-white">
          SEJA BEM-VINDO {user.name.toUpperCase()}
        </h1>
        <p id="cargo" className="mt-4 font-medium text-white">
          {user.role}
        </p>
      </div>
    </header>
  );
};

export default Header;
