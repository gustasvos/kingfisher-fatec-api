interface Checklist {
    checklist: string
    nome: string
    tipo: string
    dataEnvio: string
}

interface ChecklistTabelaProps {
    checklists: Checklist[]
}

export default function ChecklistTabela({ checklists }: ChecklistTabelaProps) {
    return (
        <>
            {/* rows */}
            {checklists.map((checklist, index) => (
                <div key={index} className="grid grid-cols-4 gap-5 text-left border border-gray-300 text-black p-2">
                    <div>{checklist.checklist}</div>
                    <div>{checklist.nome}</div>
                    <div>{checklist.tipo}</div>
                    <div>{checklist.dataEnvio}</div>
                </div>
            ))}
        </>
    )
}
