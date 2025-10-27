interface Checklist {
  checklist: string;
  nome: string;
  tipo: string;
  dataEnvio: string;
}

interface ChecklistTabelaProps {
  checklists: Checklist[];
}

export default function ChecklistTabela({ checklists }: ChecklistTabelaProps) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Cabeçalho da tabela */}
      <div className="grid grid-cols-4 gap-5 bg-blue-200 text-black font-bold p-2 border-b border-gray-300">
        <div>Checklist</div>
        <div>Nome</div>
        <div>Tipo</div>
        <div>Data de envio</div>
      </div>

      {/* Linhas da tabela */}
      {checklists.map((checklist, index) => (
        <div
          key={index}
          className={`grid grid-cols-4 gap-5 text-left text-black p-2 border-b border-gray-300 ${
            index % 2 === 0 ? "bg-blue-50" : "bg-blue-100"
          }`}
        >
          <div>{checklist.checklist}</div>
          <div>{checklist.nome}</div>
          <div>{checklist.tipo}</div>
          <div>{checklist.dataEnvio}</div>
        </div>
      ))}

      {/* Caso não tenha nenhum checklist */}
      {checklists.length === 0 && (
        <div className="p-4 text-black text-center bg-blue-50">
          Nenhum checklist encontrado.
        </div>
      )}
    </div>
  );
}
