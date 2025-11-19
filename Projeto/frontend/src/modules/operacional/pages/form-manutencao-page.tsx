import FormManutencao from "../components/form-manutencao";

type CheckManutencaoPageProps = {
    onAcaoConcluida?: () => void;
}

export default function FormManutencaoPage({ onAcaoConcluida }: CheckManutencaoPageProps){
    return(
        <>
            <FormManutencao form="Formulário de manutenção predial"
            onAcaoConcluida={onAcaoConcluida}
            />
        </>
    )
}