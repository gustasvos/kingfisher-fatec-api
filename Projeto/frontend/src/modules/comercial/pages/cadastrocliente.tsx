import { useState } from "react"

export default function CadastroCliente() {

  const [cnpj, setCnpj] = useState("")
  const [nomeFantasia, setNomeFantasia] = useState("")
  const [prazoFaturamento, setPrazoFaturamento] = useState("")
  const [contatoResponsavel, setContatoResponsavel] = useState("")
  const [emailResponsavel, setEmailResponsavel] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log({
      cnpj,
      nomeFantasia,
      prazoFaturamento,
      contatoResponsavel,
      emailResponsavel
    })
    alert("Cliente cadastrado (simulação)")
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EAF7FF]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[500px]">
        <h1 className="text-2xl font-bold text-center text-[#015084] mb-6">
          Cadastro de Cliente
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
     
          <div>
            <label className="block font-medium text-[#015084] mb-1">
              CNPJ
            </label>
            <input
              type="text"
              placeholder="Digite o CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 outline-[#015084]"
            />
          </div>

          <div>
            <label className="block font-medium text-[#015084] mb-1">
              Nome Fantasia
            </label>
            <input
              type="text"
              placeholder="Digite o nome fantasia"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 outline-[#015084]"
            />
          </div>

          <div>
            <label className="block font-medium text-[#015084] mb-1">
              Prazo de Faturamento
            </label>
            <input
              type="text"
              placeholder="Ex: 30 dias"
              value={prazoFaturamento}
              onChange={(e) => setPrazoFaturamento(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 outline-[#015084]"
            />
          </div>

          <div>
            <label className="block font-medium text-[#015084] mb-1">
              Contato do Responsável
            </label>
            <input
              type="text"
              placeholder="Digite o telefone"
              value={contatoResponsavel}
              onChange={(e) => setContatoResponsavel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 outline-[#015084]"
            />
          </div>

     
          <div>
            <label className="block font-medium text-[#015084] mb-1">
              E-mail do Responsável
            </label>
            <input
              type="email"
              placeholder="Digite o e-mail"
              value={emailResponsavel}
              onChange={(e) => setEmailResponsavel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 outline-[#015084]"
            />
          </div>

          
          <button
            type="submit"
            className="bg-[#015084] text-white p-2 rounded-lg mt-4 hover:bg-[#013f66] transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
