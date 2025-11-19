import CheckDiario from "../components/check-diario";

type CheckDiarioPageProps = {
    onAcaoConcluida?: () => void;
}

export default function CheckDiarioPage({ onAcaoConcluida }: CheckDiarioPageProps) {
    return (
        <CheckDiario form="Checklist Diário - Frota Newe"
            onAcaoConcluida={onAcaoConcluida}
        />
    )
}