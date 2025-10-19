import { useState } from "react"
import { Home, MapPin, HelpCircle } from "lucide-react"

export default function PopupLocalTrabalho() {
  const [mostrarPopup, setMostrarPopup] = useState(true)
  const [opcao, setOpcao] = useState<string | null>(null)

  const opcoes = [
    { id: "home", label: "Home Office", icon: Home },
    { id: "presencial", label: "Presencial", icon: MapPin },
    { id: "outro", label: "Outro", icon: HelpCircle },
  ]

  const confirmar = () => {
    console.log("Selecionado:", opcao)
    setMostrarPopup(false) // 
  }

  if (!mostrarPopup) return null // 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50">
      <div className="bg-gray-200 p-10 rounded-md shadow-md text-center w-full max-w-md">
        <h1 className="text-lg font-medium text-gray-700 mb-6">
          De onde você está trabalhando
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          {opcoes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setOpcao(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
                ${
                  opcao === id
                    ? "bg-gray-500 text-white"
                    : "bg-gray-400 text-white hover:bg-gray-500"
                }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={confirmar}
          disabled={!opcao}
          className={`px-6 py-2 rounded-md font-semibold uppercase transition-colors w-full
            ${
              opcao
                ? "bg-gray-500 text-white hover:bg-gray-600"
                : "bg-gray-400 text-gray-300 cursor-not-allowed"
            }`}
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}
