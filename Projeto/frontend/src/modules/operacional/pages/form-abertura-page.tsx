import FormAbertura from "../components/form-abertura";

type CheckAberturaoPageProps = {
    onAcaoConcluida?: () => void;
}

export default function FormAberturaPage({ onAcaoConcluida }: CheckAberturaoPageProps){
    return(
        <FormAbertura form='Formulário de abertura'
        onAcaoConcluida={onAcaoConcluida}
        />
    )
}