import React from "react";

interface BotaoSubmitProps {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const BotaoSubmit: React.FC<BotaoSubmitProps> = ({
  label = "Enviar",
  loading = false,
  disabled = false,
  onClick,
  className = "",
  type = "submit",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        px-4 py-2 rounded-xl font-semibold transition-all duration-200
        ${disabled || loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#135b78] hover:bg-[#053657]"}
        text-white ${className}
      `}
    >
      {loading ? "Enviando..." : label}
    </button>
  );
};

export default BotaoSubmit;
