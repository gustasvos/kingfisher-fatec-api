import { useState } from "react"
import { Home, MapPin, HelpCircle } from "lucide-react"

export default function LocalTrabalho() {
  const [mostrarPopup, setMostrarPopup] = useState(true)
  const [opcao, setOpcao] = useState(null)

  const opcoes = [
    { id: "home", label: "Remoto", icon: Home },
    { id: "presencial", label: "Presencial", icon: MapPin },
    { id: "outro", label: "Outro", icon: HelpCircle },
  ]

  const confirmar = () => {
    console.log("Selecionado:", opcao)
    // setMostrarPopup(false)
  }

  // if (!mostrarPopup) return null

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
                ${opcao === id
                ? "bg-white text-black"
                : "bg-white text-black hover:bg-grey-200"
              }`}
          >
            <Icon size={20} className="flex-shrink-0" />
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={confirmar}
        disabled={!opcao}
        className={`px-6 py-2 rounded-md font-semibold uppercase transition-colors w-full
            ${opcao
            ? "bg-[#135B78]text-white hover:bg-blue-600"
            : "bg-[#135B78] text-white cursor-not-allowed"
          }`}
      >
        Confirmar
      </button>
    </div>
  )
}
