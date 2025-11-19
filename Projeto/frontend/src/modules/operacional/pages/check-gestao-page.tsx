import CheckGestao from "../components/check-gestao";

type CheckGestaoPageProps = {
    onAcaoConcluida?: () => void;
}

export default function CheckGestaoPage({ onAcaoConcluida }: CheckGestaoPageProps) {
    return (
        <CheckGestao 
        form="Checklist, Forms de gestão de coleta"
        onAcaoConcluida={onAcaoConcluida}
        />
    )
}