import FormFechamento from "../components/form-fechamento";

type CheckFechamentoPageProps = {
    onAcaoConcluida?: () => void;
}

export default function FormFechamentoPage({ onAcaoConcluida }: CheckFechamentoPageProps){
    return(
        <FormFechamento form="Formulário de fechamento"
        onAcaoConcluida={onAcaoConcluida}
        />
    )    
}