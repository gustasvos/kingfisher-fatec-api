import React from "react";

interface User {
  avatarUrl?: string;
  name: string;
  role: string;
  email: string;
}

interface HeaderProps {
  user: User;
  placeholderAvatar: string;
}

const Header: React.FC<HeaderProps> = ({ user, placeholderAvatar }) => {
  return (
    <header
      className="card p-8 flex gap-6 items-center bg-[#135b78] rounded-lg overflow-hidden relative left-[10vh] max-w-[90w] w-[90%]"
      style={{ color: "#000" }}
    >
      <div
        id="avatar"
        className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover"
          />
        ) : (
          <img src={placeholderAvatar} alt="usuário" className="w-28 h-28" />
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-wide text-white">
          SEJA BEM-VINDO {user.name.toUpperCase()}
        </h1>
        <p id="cargo" className="mt-4 font-medium text-white">
          {user.role}
        </p>
        <p id="email" className="text-sm opacity-90 text-white">
          {user.email}
        </p>
      </div>
    </header>
  );
};

export default Header;
