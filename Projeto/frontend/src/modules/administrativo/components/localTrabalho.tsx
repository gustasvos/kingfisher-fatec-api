import { useState } from "react";
import { Home, MapPin } from "lucide-react";
import axios from "axios";

export default function LocalTrabalho({ onFechar }: { onFechar?: () => void }) {
  const [opcao, setOpcao] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const opcoes = [
    { id: "REMOTO", label: "Remoto", icon: Home },
    { id: "PRESENCIAL", label: "Presencial", icon: MapPin }
  ];

  const confirmar = async () => {
    if (!opcao) return;

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId) {
      setError("Usuário não encontrado.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post(
        `http://localhost:8080/usuario/${userId}/local`,
        { local: opcao },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onFechar) onFechar(); // fecha modal se função fornecida
    } catch (err) {
      console.error(err);
      setError("Erro ao salvar local de trabalho.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#D0ECFE] text-gray-900 p-10 rounded-md shadow-md text-center w-full max-w-md opacity-100">
      <h1 className="text-lg font-medium text-black mb-6">
        De onde você está trabalhando?
      </h1>

      <div className="flex justify-center gap-5 mb-6">
        {opcoes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setOpcao(id)}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-md transition-colors min-w-[120px]
              ${opcao === id ? "bg-white text-black" : "bg-white text-black hover:bg-grey-200"}`}
          >
            <Icon size={20} className="flex-shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={confirmar}
        disabled={!opcao || loading}
        className={`px-6 py-2 rounded-md font-semibold uppercase transition-colors w-full
          ${opcao ? "bg-[#135B78] text-white hover:bg-blue-600" : "bg-[#135B78] text-white cursor-not-allowed"}`}
      >
        {loading ? "Salvando..." : "Confirmar"}
      </button>
    </div>
  );
}
