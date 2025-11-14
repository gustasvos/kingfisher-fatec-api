import { useState } from "react"
import InputLine from "../../../shared/components/inputLine"
import { IMaskInput } from "react-imask"
import Botao from "../../../shared/components/botao"

type FormAberturaProps = {
    form: string;
}

export default function CheckVeiculos({ form }: FormAberturaProps) {
    const [mostraOutro, setMostraOutro] = useState(false)
    const [respVistoria, setRespVistoria] = useState('')
    const [letraNum, setLetraNum] = useState('')
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    const [formTitle, setFormTitle] = useState(form)
    //Sessão 1: Dados cadastrais
    const [nomeMotorista, setNomeMotorista] = useState<string>("")
    const [cpfMotorista, setCpfMotorista] = useState<string>("")
    const [emailMotorista, setEmailMotorista] = useState<string>("")
    const [placaVeiculo, setPlacaVeiculo] = useState<string>("")
    const [tipoVeiculo, setTipoVeiculo] = useState<string>("")

    // Sessão 2: Motor
    const [nivelOleo, setNivelOleo] = useState<string>("")
    const [livreOleo, setLivreOleo] = useState<string>("")
    const [nivelAgua, setNivelAgua] = useState<string>("")
    const [fotoMotor, setFotoMotor] = useState<File | null>(null)
    const [etiquetaOleo, setEtiquetaOleo] = useState<File | null>(null)

    // Sessão 3: Pneus
    const [pneLisoDesq, setPneLisoDesq] = useState<string>("")
    const [pneLisoPte, setPneLisoPte] = useState<string>("")
    const [pneLisoPtd, setPneLisoPtd] = useState<string>("")
    const [pneLisoPdd, setPneLisoPdd] = useState<string>("")
    const [fotoPne, setFotoPne] = useState<File | null>(null)
    const [fotoPte, setFotoPte] = useState<File | null>(null)
    const [fotoPtd, setFotoPtd] = useState<File | null>(null)
    const [fotoPdd, setFotoPdd] = useState<File | null>(null)

    //Sessão 4: Conservação | Aparência | Segurança
    const [parabrisaPerfEstado, setParabrisaPerfEstado] = useState<string>("")
    const [cabineExtLimpa, setCabineExtLimpa] = useState<string>("")
    const [veiculoExtLimpa, setVeiculoExtLimpa] = useState<string>("")
    const [amassadoFerrugem, setAmassadoFerrugem] = useState<string>("")
    const [assoalho, setAssoalho] = useState<string>("")
    const [faixaRefletida, setFaixaRefletida] = useState<string>("")
    const [parabrisaFunc, setParabrisaFunc] = useState<string>("")
    const [buzinaFunc, setBuzinaFunc] = useState<string>("")
    const [farolAlto, setFarolAlto] = useState<string>("")
    const [farolBaixo, setFarolBaixo] = useState<string>("")
    const [setasDianteiras, setSetasDianteiras] = useState<string>("")
    const [setasTrazeiras, setSetasTrazeiras] = useState<string>("")
    const [piscaAlerta, setPiscaAlerta] = useState<string>("")
    const [luzFreio, setLuzFreio] = useState<string>("")
    const [luzRe, setLuzRe] = useState<string>("")
    const [sirene, setSirene] = useState<string>("")
    const [extintor, setExtintor] = useState<string>("")
    const [step, setStep] = useState<string>("")
    const [triangulo, setTriangulo] = useState<string>("")
    const [macaco, setMacaco] = useState<string>("")
    const [chaveRoda, setChaveRoda] = useState<string>("")
    const [capaceteSeguranca, setCapaceteSeguranca] = useState<string>("")
    const [coleteSeguranca, setColeteSeguranca] = useState<string>("")
    const [botaSeguranca, setBotaSeguranca] = useState<string>("")
    const [frenteVeiculo, setFrenteVeiculo] = useState<File | null>(null)
    const [lateralDianteira, setLateralDianteira] = useState<File | null>(null)
    const [lateralEsquerda, setLateralEsquerda] = useState<File | null>(null)
    const [traseira, setTraseira] = useState<File | null>(null)
    const [obs, setObs] = useState('')
    const [responsavelVistoria, setResponsavelVistoria] = useState<string>("")
    const [outro, setOutro] = useState('')

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, input: string) {
        const file = e.target.files?.[0] || null;
        switch (input) {
            case "fotoMotor": setFotoMotor(file); break;
            case "etiquetaOleo": setEtiquetaOleo(file); break;
            case "fotoPne": setFotoPne(file); break;
            case "fotoPte": setFotoPte(file); break;
            case "fotoPtd": setFotoPtd(file); break;
            case "fotoPdd": setFotoPdd(file); break;
            case "frenteVeiculo": setFrenteVeiculo(file); break;
            case "lateralDianteira": setLateralDianteira(file); break;
            case "lateralEsquerda": setLateralEsquerda(file); break;
            case "traseira": setTraseira(file); break;
        }
    }

    const handleTipoVeiculoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoVeiculo(event.target.value)
    }

    const handleNivelOleoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNivelOleo(event.target.value)
    }

    const handleLivreOleoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLivreOleo(event.target.value)
    }

    const handleNivelAguaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNivelAgua(event.target.value)
    }

    const handlePneLisoDesqChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPneLisoDesq(event.target.value)
    }

    const handlePneLisoPteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPneLisoPte(event.target.value)
    }

    const handlePneLisoPtdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPneLisoPtd(event.target.value)
    }

    const handlePneLisoPddChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPneLisoPdd(event.target.value)
    }

    const handleParabrisaPerfEstadoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParabrisaPerfEstado(event.target.value)
    }

    const handleCabineExtLimpaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCabineExtLimpa(event.target.value)
    }

    const handleVeiculoExtLimpaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVeiculoExtLimpa(event.target.value)
    }

    const handleAmassadoFerrugemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmassadoFerrugem(event.target.value)
    }

    const handleAssoalhoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssoalho(event.target.value)
    }

    const handleFaixaRefletidaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFaixaRefletida(event.target.value)
    }

    const handleParabrisaFuncChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParabrisaFunc(event.target.value)
    }

    const handleBuzinaFuncChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBuzinaFunc(event.target.value)
    }

    const handleFarolAltoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFarolAlto(event.target.value)
    }

    const handleFarolBaixoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFarolBaixo(event.target.value)
    }

    const handleSetasDianteirasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSetasDianteiras(event.target.value)
    }

    const handleSetasTrazeirasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSetasTrazeiras(event.target.value)
    }

    const handlePiscaAlertaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPiscaAlerta(event.target.value)
    }

    const handleLuzFreioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLuzFreio(event.target.value)
    }

    const handleLuzReChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLuzRe(event.target.value)
    }

    const handleSireneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSirene(event.target.value)
    }

    const handleExtintorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExtintor(event.target.value)
    }

    const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStep(event.target.value)
    }

    const handleTrianguloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTriangulo(event.target.value)
    }

    const handleMacacoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMacaco(event.target.value)
    }

    const handleChaveRodaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChaveRoda(event.target.value)
    }

    const handleCapaceteSegurancaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCapaceteSeguranca(event.target.value)
    }

    const handleColeteSegurancaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColeteSeguranca(event.target.value)
    }

    const handleBotaSegurancaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBotaSeguranca(event.target.value)
    }

    const handleResponsavelVistoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResponsavelVistoria(event.target.value)
    }


    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRespVistoria(e.target.value)
        setMostraOutro(e.target.value === 'outro')
        setLetraNum(e.target.value)

        const regex = /^[a-zA-Z0-9]*$/

        if (!regex.test(letraNum)) {
            setErro('Digite apenas letras e números.');
        } else {
            setErro('');
        }
    }

    const enviaForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        // Função para normalizar valores em -> "SIM", "NÃO", "N/A"
        const normalizaSimNaoNa = (valor: string) => {
            if (!valor) return valor;
            const lower = valor.toLowerCase();
            if (lower.includes('-sim')) return 'SIM';
            if (lower.includes('-nao')) return 'NÃO';
            return 'N/A';
        }

        try {
            const payload = {
                // Sessão 1: Dados cadastrais
                formTitle,
                name: nomeMotorista,
                "cpf-motorista": cpfMotorista.replace(/[.\-\/]/g, ''),
                "email-motorista": emailMotorista.trim(),
                "placa-veiculo": placaVeiculo.replace(/[.\-\/]/g, ''),
                "tipo-veiculo": tipoVeiculo,

                // Sessão 2: Motor
                "nivel-oleo": normalizaSimNaoNa(nivelOleo),
                "vazamento-oleo": normalizaSimNaoNa(livreOleo),
                "nivel-agua": normalizaSimNaoNa(nivelAgua),

                // Sessão 3: Pneus
                "estado-PDE": normalizaSimNaoNa(pneLisoDesq),
                "estado-PTE": normalizaSimNaoNa(pneLisoPte),
                "estado-PTD": normalizaSimNaoNa(pneLisoPtd),
                "estado-PDD": normalizaSimNaoNa(pneLisoPdd),

                // Sessão 4: Conservação | Aparência | Segurança
                "para-brisa": normalizaSimNaoNa(parabrisaPerfEstado),
                "cabine-externa": normalizaSimNaoNa(cabineExtLimpa),
                "veiculo-externo": normalizaSimNaoNa(veiculoExtLimpa),
                "amassados-ferrugens": normalizaSimNaoNa(amassadoFerrugem),
                "estado-assoalho": normalizaSimNaoNa(assoalho),
                "faixas-reflexivas": normalizaSimNaoNa(faixaRefletida),
                "limpador-parabrisa": normalizaSimNaoNa(parabrisaFunc),
                "estado-buzina": normalizaSimNaoNa(buzinaFunc),
                "farol-alto": normalizaSimNaoNa(farolAlto),
                "farol-baixo": normalizaSimNaoNa(farolBaixo),
                "setas-dianteiras": normalizaSimNaoNa(setasDianteiras),
                "setas-traseiras": normalizaSimNaoNa(setasTrazeiras),
                "pisca-alerta": normalizaSimNaoNa(piscaAlerta),
                "luz-freio": normalizaSimNaoNa(luzFreio),
                "liz-re": normalizaSimNaoNa(luzRe),
                "sirene-re": normalizaSimNaoNa(sirene),
                "extintor": normalizaSimNaoNa(extintor),
                "step": normalizaSimNaoNa(step),
                "triangulo": normalizaSimNaoNa(triangulo),
                "macaco": normalizaSimNaoNa(macaco),
                "chave-roda": normalizaSimNaoNa(chaveRoda),
                "capacete-seguranca": normalizaSimNaoNa(capaceteSeguranca),
                "colete-seguranca": normalizaSimNaoNa(coleteSeguranca),
                "bota-seguranca": normalizaSimNaoNa(botaSeguranca),

                // Sessão 6: Observações | Vistoria
                observacoes: obs,
                "nome-vistor": "Samuel Lucas",
                "nome-vistor-outro": responsavelVistoria === 'Outro' ? outro : '',
            }

            // o mapa de arquivos com nomes do backend
            const filesMap: Record<string, File | null> = {
                "foto-motor": fotoMotor,
                "etiqueta-oleo": etiquetaOleo,
                "foto-PDE": fotoPne,
                "foto-PTE": fotoPte,
                "foto-PTD": fotoPtd,
                "foto-PDD": fotoPdd,
                "fotos-frente-veiculo": frenteVeiculo,
                "fotos-lateral-dianteira": lateralDianteira,
                "fotos-lateral-esquerda": lateralEsquerda,
                "fotos-traseira-veiculo": traseira
            };

            //Converter tudo para FormData
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                console.log(key, value)
                if (value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            })
            Object.entries(filesMap).forEach(([key, file]) => {
                console.log(key, file);
                if (file) {
                    formData.append(key, file);
                }
            });

            const response = await fetch("http://localhost:8080/submit", {
                method: "POST",
                body: formData
            })
            if (!response.ok) {
                throw new Error(`Erro ao enviar: ${response.status}`);
            }
            setTimeout(() => {
                alert("Formulário enviado!")
                setLoading(false)
            }, 2000)

        } catch (error) {
            console.error("Erro no envio:", error);
            alert("Falha ao enviar o formulário.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="w-full flex justify-center mt-8 px-4">
            <div className="bg-white shadow-lg rounded-3xl w-full max-w-5xl h-[90vh] border border-gray-100 overflow-hidden">
                <div className="h-full overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-[#17607f] scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
                    <section>
                        <h1 style={{ color: "#44648d", fontSize: "1.7rem", fontWeight: 700, textAlign: "center" }}>  Checklist de Cadastro de Agregados - Veículos </h1>
                        <form action="" onSubmit={enviaForm} className="space-y-6">
                            <h3 style={{ color: "#000000", fontSize: "1.3rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">Sessão 1: Dados Cadastrais</h3>
                            <section className="space-y-6">
                                <section className="relative">
                                    <IMaskInput mask={"000.000.000-00"} id="cpf" required maxLength={14} onAccept={(value: string) => setCpfMotorista(value)} className="w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                    <label htmlFor="" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">CPF</label>
                                </section>
                                <InputLine type="text" placeholder="" id="nome" htmlfor="nome" required value={nomeMotorista} onChange={(e) => setNomeMotorista(e.target.value)}>Nome</InputLine>
                                <InputLine type="email" placeholder="" id='email' htmlfor="email" required value={emailMotorista} onChange={(e) => setEmailMotorista(e.target.value)}>E-mail</InputLine>
                                <InputLine type="text" placeholder="" maxLength={7} id='placaVeiculo' htmlfor="placa-veiculo" value={placaVeiculo} onChange={(e) => { setPlacaVeiculo(e.target.value); handlechange(e) }}>Placa do veículo(apenas os numeros e letras!)</InputLine>
                                {erro && <p className="text-red-700 text-[12px]">{erro}</p>}
                                <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                    <legend className="text-black">Tipo Veículo</legend>
                                    <InputLine type="radio" name="tipoVeiculo" value="van" id='van' htmlfor="van" required checked={tipoVeiculo === 'van'} onChange={handleTipoVeiculoChange}>Van</InputLine>
                                    <InputLine type="radio" name="tipoVeiculo" value="fiorino" id='fiorino' htmlfor="fiorino" required checked={tipoVeiculo === 'fiorino'} onChange={handleTipoVeiculoChange}>Fiorino</InputLine>
                                    <InputLine type="radio" name="tipoVeiculo" value="vuc" id='vuc' htmlfor="vuc" required checked={tipoVeiculo === 'vuc'} onChange={handleTipoVeiculoChange}>Vuc</InputLine>
                                    <InputLine type="radio" name="tipoVeiculo" value="3/4" id='3/4' htmlfor="3/4" required checked={tipoVeiculo === '3/4'} onChange={handleTipoVeiculoChange}>3/4</InputLine>
                                    <InputLine type="radio" name="tipoVeiculo" value="troco" id='troco' htmlfor="troco" required checked={tipoVeiculo === 'troco'} onChange={handleTipoVeiculoChange}>Troco</InputLine>
                                    <InputLine type="radio" name="tipoVeiculo" value="truck" id='truck' htmlfor="truck" required checked={tipoVeiculo === 'truck'} onChange={handleTipoVeiculoChange}>Truck</InputLine>
                                    <InputLine type="radio" name="tipoVeiculo" value="carreta" id='carreta' htmlfor="carreta" required checked={tipoVeiculo === 'carreta'} onChange={handleTipoVeiculoChange}>Carreta</InputLine>
                                </fieldset>
                            </section>
                            <h3 style={{ color: "#000000", fontSize: "1.3rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">Sessão 2: Motor - Verificação do vazamentos e nível de óleo e água no motor do veículo</h3>
                            <section>
                                <p style={{ color: "#000000", fontSize: "1rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">Vistoria</p>
                                <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                    <legend className="text-black">Nível de Óleo está bom?</legend>
                                    <InputLine type="radio" name="nivelOleo" value="oleo-sim" id="oleo-sim" htmlfor="oleo-sim" required checked={nivelOleo === 'oleo-sim'} onChange={handleNivelOleoChange}>Sim</InputLine>
                                    <InputLine type="radio" name="nivelOleo" value="oleo-nao" id="oleo-nao" htmlfor="oleo-nao" required checked={nivelOleo === 'oleo-nao'} onChange={handleNivelOleoChange}>Não</InputLine>
                                    <InputLine type="radio" name="nivelOleo" value="oleo-n-a" id="oleo-n-a" htmlfor="oleo-n-a" required checked={nivelOleo === 'oleo-n-a'} onChange={handleNivelOleoChange}>N/A</InputLine>
                                </fieldset>
                                <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                    <legend className="text-black">Livre de vazamento de óleo?</legend>
                                    <InputLine type="radio" name="livreOleo" value="livre-sim" id="livre-sim" htmlfor="livre-sim" required checked={livreOleo === 'livre-sim'} onChange={handleLivreOleoChange}>Sim</InputLine>
                                    <InputLine type="radio" name="livreOleo" value="livre-nao" id="livre-nao" htmlfor="livre-nao" required checked={livreOleo === 'livre-nao'} onChange={handleLivreOleoChange}>Não</InputLine>
                                    <InputLine type="radio" name="livreOleo" value="livre-n-a" id="livre-n-a" htmlfor="livre-n-a" required checked={livreOleo === 'livre-n-a'} onChange={handleLivreOleoChange}>N/A</InputLine>
                                </fieldset>
                                <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                    <legend className="text-black">Nível de ÁGUA reservatório está bom?</legend>
                                    <InputLine type="radio" name="nivelAgua" value="agua-sim" id="agua-sim" htmlfor="agua-sim" required checked={nivelAgua === 'agua-sim'} onChange={handleNivelAguaChange}>Sim</InputLine>
                                    <InputLine type="radio" name="nivelAgua" value="agua-nao" id="agua-nao" htmlfor="agua-nao" required checked={nivelAgua === 'agua-nao'} onChange={handleNivelAguaChange}>Não</InputLine>
                                    <InputLine type="radio" name="nivelAgua" value="agua-n-a" id="agua-n-a" htmlfor="agua-n-a" required checked={nivelAgua === 'agua-n-a'} onChange={handleNivelAguaChange}>N/A</InputLine>
                                </fieldset>
                                <section className="space-y-4">
                                    <InputLine type="file" id="fotoMotor" htmlfor="foto-motor" required onChange={(e) => handleFileChange(e, "fotoMotor")}>Foto do motor do veículo</InputLine>
                                    <InputLine type="file" id="etiquetaOleo" htmlfor="etiqueta-oleo" onChange={(e) => handleFileChange(e, "etiquetaOleo")}>Foto etiqueta da última troca de óleo </InputLine>
                                </section>
                            </section>
                            <section>
                                <h3 style={{ color: "#000000", fontSize: "1.3rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">Sessão 3: Pneus - Verificação do estado de conservação dos PNEUS do veículo</h3>
                                <section>
                                    <p style={{ color: "#000000", fontSize: "1rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">Pneus estão lisos?</p>
                                    <section className="space-y-6">
                                        <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                            <legend className="text-black">PNE - Pneu Dianteiro Esquerdo</legend>
                                            <InputLine type="radio" name="pneLisoDesq" value="liso-sim-d-e" id="liso-sim-d-e" htmlfor="liso-sim-d-e" required checked={pneLisoDesq === 'liso-sim-d-e'} onChange={handlePneLisoDesqChange}>Sim</InputLine>
                                            <InputLine type="radio" name="pneLisoDesq" value="liso-nao-d-e" id="liso-nao-d-e" htmlfor="liso-nao-d-e" required checked={pneLisoDesq === 'liso-nao-d-e'} onChange={handlePneLisoDesqChange}>Não</InputLine>
                                        </fieldset>
                                        <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                            <legend className="text-black">PTE - Pneu Traseiro Esquerdo</legend>
                                            <InputLine type="radio" name="pneLisoPte" value="pte-sim" id="pte-sim" htmlfor="pte-sim" required checked={pneLisoPte === 'pte-sim'} onChange={handlePneLisoPteChange}>Sim</InputLine>
                                            <InputLine type="radio" name="pneLisoPte" value="pte-nao" id="pte-nao" htmlfor="pte-nao" required checked={pneLisoPte === 'pte-nao'} onChange={handlePneLisoPteChange}>Não</InputLine>
                                        </fieldset>
                                        <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                            <legend className="text-black">PTD - Pneu Traseiro Direito</legend>
                                            <InputLine type="radio" name="pneLisoPtd" value="ptd-sim" id="ptd-sim" htmlfor="ptd-sim" required checked={pneLisoPtd === 'ptd-sim'} onChange={handlePneLisoPtdChange}>Sim</InputLine>
                                            <InputLine type="radio" name="pneLisoPtd" value="ptd-nao" id="ptd-nao" htmlfor="ptd-nao" required checked={pneLisoPtd === 'ptd-nao'} onChange={handlePneLisoPtdChange}>Não</InputLine>
                                        </fieldset>
                                        <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                            <legend className="text-black">PDD - Pneu Dianteiro Direito</legend>
                                            <InputLine type="radio" name="pneLisoPdd" value="pdd-sim" id="pdd-sim" htmlfor="pdd-sim" required checked={pneLisoPdd === 'pdd-sim'} onChange={handlePneLisoPddChange}>Sim</InputLine>
                                            <InputLine type="radio" name="pneLisoPdd" value="pdd-nao" id="pdd-nao" htmlfor="pdd-nao" required checked={pneLisoPdd === 'pdd-nao'} onChange={handlePneLisoPddChange}>Não</InputLine>
                                        </fieldset>
                                    </section>
                                </section>
                                <section className="space-y-6">
                                    <h3 style={{ color: "#000000", fontSize: "1.3rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">FOTOS GERAIS - Comprobatórias</h3>
                                    <InputLine type="file" id="fotoPne" htmlfor="foto-pne" required onChange={(e) => handleFileChange(e, "fotoPne")}>Foto do PNE - Pneu Dianteiro Esquerdo</InputLine>
                                    <InputLine type="file" id="fotoPte" htmlfor="foto-pte" required onChange={(e) => handleFileChange(e, "fotoPte")}>Foto do PTE - Pneu Traseiro Esquerdo</InputLine>
                                    <InputLine type="file" id="fotoPtd" htmlfor="foto-ptd" required onChange={(e) => handleFileChange(e, "fotoPtd")}>Foto do PTD - Pneu Traseiro Direito</InputLine>
                                    <InputLine type="file" id="fotoPdd" htmlfor="foto-pdd" required onChange={(e) => handleFileChange(e, "fotoPdd")}>Foto do PDD - Pneu Dianteiro Direito</InputLine>
                                </section>
                            </section>
                            <section>
                                <h3 style={{ color: "#000000", fontSize: "1.3rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">Sessão 4: Conservação | Aparência | Segurança</h3>
                                <section>
                                    <p style={{ color: "#000000", fontSize: "1rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">Limpeza e Aparência externa do veículo</p>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Para-brisa em perfeito estado?</legend>
                                        <InputLine type="radio" name="parabrisaPerfEstado" value="parabrisa-sim" id="parabrisa-sim" htmlfor="parabrisa-sim" required checked={parabrisaPerfEstado === 'parabrisa-sim'} onChange={handleParabrisaPerfEstadoChange}>Sim</InputLine>
                                        <InputLine type="radio" name="parabrisaPerfEstado" value="parabrisa-nao" id="parabrisa-nao" htmlfor="parabrisa-nao" required checked={parabrisaPerfEstado === 'parabrisa-nao'} onChange={handleParabrisaPerfEstadoChange}>Não</InputLine>
                                        <InputLine type="radio" name="parabrisaPerfEstado" value="parabrisa-n-a" id="parabrisa-n-a" htmlfor="parabrisa-n-a" required checked={parabrisaPerfEstado === 'parabrisa-n-a'} onChange={handleParabrisaPerfEstadoChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Cabine (externa) está limpa?</legend>
                                        <InputLine type="radio" name="cabineExtLimpa" value="cabine-ext-sim" id="cabine-ext-sim" htmlfor="cabine-ext-sim" required checked={cabineExtLimpa === 'cabine-ext-sim'} onChange={handleCabineExtLimpaChange}>Sim</InputLine>
                                        <InputLine type="radio" name="cabineExtLimpa" value="cabine-ext-nao" id="cabine-ext-nao" htmlfor="cabine-ext-nao" required checked={cabineExtLimpa === 'cabine-ext-nao'} onChange={handleCabineExtLimpaChange}>Não</InputLine>
                                        <InputLine type="radio" name="cabineExtLimpa" value="cabine-ext-n-a" id="cabine-ext-n-a" htmlfor="cabine-ext-n-a" required checked={cabineExtLimpa === 'cabine-ext-n-a'} onChange={handleCabineExtLimpaChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Veículo (externo) está limpo?</legend>
                                        <InputLine type="radio" name="veiculoExtLimpa" value="veiculo-ext-sim" id="veiculo-ext-sim" htmlfor="veiculo-ext-sim" required checked={veiculoExtLimpa === 'veiculo-ext-sim'} onChange={handleVeiculoExtLimpaChange}>Sim</InputLine>
                                        <InputLine type="radio" name="veiculoExtLimpa" value="veiculo-ext-nao" id="veiculo-ext-nao" htmlfor="veiculo-ext-nao" required checked={veiculoExtLimpa === 'veiculo-ext-nao'} onChange={handleVeiculoExtLimpaChange}>Não</InputLine>
                                        <InputLine type="radio" name="veiculoExtLimpa" value="veiculo-ext-n-a" id="veiculo-ext-n-a" htmlfor="veiculo-ext-n-a" required checked={veiculoExtLimpa === 'veiculo-ext-n-a'} onChange={handleVeiculoExtLimpaChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Livre de amassados/ferrugens?</legend>
                                        <InputLine type="radio" name="amassadoFerrugem" value="amassado-ferrugem-sim" id="amassado-ferrugem-sim" htmlfor="amassado-ferrugem-sim" required checked={amassadoFerrugem === 'amassado-ferrugem-sim'} onChange={handleAmassadoFerrugemChange}>Sim</InputLine>
                                        <InputLine type="radio" name="amassadoFerrugem" value="amassado-ferrugem-nao" id="amassado-ferrugem-nao" htmlfor="amassado-ferrugem-nao" required checked={amassadoFerrugem === 'amassado-ferrugem-nao'} onChange={handleAmassadoFerrugemChange}>Não</InputLine>
                                        <InputLine type="radio" name="amassadoFerrugem" value="amassado-ferrugem-n-a" id="amassado-ferrugem-n-a" htmlfor="amassado-ferrugem-n-a" required checked={amassadoFerrugem === 'amassado-ferrugem-n-a'} onChange={handleAmassadoFerrugemChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Assoalho está conversado? Sem ferrugens ou amassados?</legend>
                                        <InputLine type="radio" name="assoalho" value="assoalho-sim" id="assoalho-sim" htmlfor="assoalho-sim" checked={assoalho === 'assoalho-sim'} onChange={handleAssoalhoChange} required >Sim</InputLine>
                                        <InputLine type="radio" name="assoalho" value="assoalho-nao" id="assoalho-nao" htmlfor="assoalho-nao" checked={assoalho === 'assoalho-nao'} onChange={handleAssoalhoChange} required >Não</InputLine>
                                        <InputLine type="radio" name="assoalho" value="assoalho-n-a" id="assoalho-n-a" htmlfor="assoalho-n-a" checked={assoalho === 'assoalho-n-a'} onChange={handleAssoalhoChange} required >N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Possui FAIXAS REFLETIVAS?</legend>
                                        <InputLine type="radio" name="faixaRefletida" value="faixa-refletida-sim" id="faixa-refletida-sim" htmlfor="faixa-refletida-sim" required checked={faixaRefletida === 'faixa-refletida-sim'} onChange={handleFaixaRefletidaChange}>Sim</InputLine>
                                        <InputLine type="radio" name="faixaRefletida" value="faixa-refletida-nao" id="faixa-refletida-nao" htmlfor="faixa-refletida-nao" required checked={faixaRefletida === 'faixa-refletida-nao'} onChange={handleFaixaRefletidaChange}>Não</InputLine>
                                        <InputLine type="radio" name="faixaRefletida" value="faixa-refletida-n-a" id="faixa-refletida-n-a" htmlfor="faixa-refletida-n-a" required checked={faixaRefletida === 'faixa-refletida-n-a'} onChange={handleFaixaRefletidaChange}>N/A</InputLine>
                                    </fieldset>
                                </section>
                                <section>
                                    <p style={{ color: "#000000", fontSize: "1rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">Sistema elétrico</p>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Limpador Para-brisa funcionando?</legend>
                                        <InputLine type="radio" name="parabrisaFunc" value="parabrisa-func-sim" id="parabrisa-func-sim" htmlfor="parabrisa-func-sim" required checked={parabrisaFunc === 'parabrisa-func-sim'} onChange={handleParabrisaFuncChange}>Sim</InputLine>
                                        <InputLine type="radio" name="parabrisaFunc" value="parabrisa-func-nao" id="parabrisa-func-nao" htmlfor="parabrisa-func-nao" required checked={parabrisaFunc === 'parabrisa-func-nao'} onChange={handleParabrisaFuncChange}>Não</InputLine>
                                        <InputLine type="radio" name="parabrisaFunc" value="parabrisa-func-n-a" id="parabrisa-func-n-a" htmlfor="parabrisa-func-n-a" required checked={parabrisaFunc === 'parabrisa-func-n-a'} onChange={handleParabrisaFuncChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Buzina funciona?</legend>
                                        <InputLine type="radio" name="buzinaFunc" value="buzina-func-sim" id="buzina-func-sim" htmlfor="buzina-func-sim" required checked={buzinaFunc === 'buzina-func-sim'} onChange={handleBuzinaFuncChange}>Sim</InputLine>
                                        <InputLine type="radio" name="buzinaFunc" value="buzina-func-nao" id="buzina-func-nao" htmlfor="buzina-func-nao" required checked={buzinaFunc === 'buzina-func-nao'} onChange={handleBuzinaFuncChange}>Não</InputLine>
                                        <InputLine type="radio" name="buzinaFunc" value="buzina-func-n-a" id="buzina-func-n-a" htmlfor="buzina-func-n-a" required checked={buzinaFunc === 'buzina-func-n-a'} onChange={handleBuzinaFuncChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Farol ALTO (dois lados)?</legend>
                                        <InputLine type="radio" name="farolAlto" value="farol-alto-sim" id="farol-alto-sim" htmlfor="farol-alto-sim" required checked={farolAlto === 'farol-alto-sim'} onChange={handleFarolAltoChange}>Sim</InputLine>
                                        <InputLine type="radio" name="farolAlto" value="farol-alto-nao" id="farol-alto-nao" htmlfor="farol-alto-nao" required checked={farolAlto === 'farol-alto-nao'} onChange={handleFarolAltoChange}>Não</InputLine>
                                        <InputLine type="radio" name="farolAlto" value="farol-alto-n-a" id="farol-alto-n-a" htmlfor="farol-alto-n-a" required checked={farolAlto === 'farol-alto-n-a'} onChange={handleFarolAltoChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Farol BAIXO (dois lados)?</legend>
                                        <InputLine type="radio" name="farolBaixo" value="farol-baixo-sim" id="farol-baixo-sim" htmlfor="farol-baixo-sim" required checked={farolBaixo === 'farol-baixo-sim'} onChange={handleFarolBaixoChange}>Sim</InputLine>
                                        <InputLine type="radio" name="farolBaixo" value="farol-baixo-nao" id="farol-baixo-nao" htmlfor="farol-baixo-nao" required checked={farolBaixo === 'farol-baixo-nao'} onChange={handleFarolBaixoChange}>Não</InputLine>
                                        <InputLine type="radio" name="farolBaixo" value="farol-baixo-n-a" id="farol-baixo-n-a" htmlfor="farol-baixo-n-a" required checked={farolBaixo === 'farol-baixo-n-a'} onChange={handleFaixaRefletidaChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Setas dianteiras (dois lados)?</legend>
                                        <InputLine type="radio" name="setasDianteiras" value="setas-dianteiras-sim" id="setas-dianteiras-sim" htmlfor="setas-dianteiras-sim" required checked={setasDianteiras === 'setas-dianteiras-sim'} onChange={handleSetasDianteirasChange}>Sim</InputLine>
                                        <InputLine type="radio" name="setasDianteiras" value="setas-dianteiras-nao" id="setas-dianteiras-nao" htmlfor="setas-dianteiras-nao" required checked={setasDianteiras === 'setas-dianteiras-nao'} onChange={handleSetasDianteirasChange}>Não</InputLine>
                                        <InputLine type="radio" name="setasDianteiras" value="setas-dianteiras-n-a" id="setas-dianteiras-n-a" htmlfor="setas-dianteiras-n-a" required checked={setasDianteiras === 'setas-dianteiras-n-a'} onChange={handleSetasDianteirasChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Setas traseiras (dois lados)?</legend>
                                        <InputLine type="radio" name="setasTrazeiras" value="setas-trazeiras-sim" id="setas-trazeiras-sim" htmlfor="setas-trazeiras-sim" required checked={setasTrazeiras === 'setas-trazeiras-sim'} onChange={handleSetasTrazeirasChange}>Sim</InputLine>
                                        <InputLine type="radio" name="setasTrazeiras" value="setas-trazeiras-nao" id="setas-trazeiras-nao" htmlfor="setas-trazeiras-nao" required checked={setasTrazeiras === 'setas-trazeiras-nao'} onChange={handleSetasTrazeirasChange}>Não</InputLine>
                                        <InputLine type="radio" name="setasTrazeiras" value="setas-trazeiras-n-a" id="setas-trazeiras-n-a" htmlfor="setas-trazeiras-n-a" required checked={setasTrazeiras === 'setas-trazeiras-n-a'} onChange={handleSetasTrazeirasChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Pisca-Alerta (dois lados)?</legend>
                                        <InputLine type="radio" name="piscaAlerta" value="pisca-alerta-sim" id="pisca-alerta-sim" htmlfor="pisca-alerta-sim" required checked={piscaAlerta === 'pisca-alerta-sim'} onChange={handlePiscaAlertaChange}>Sim</InputLine>
                                        <InputLine type="radio" name="piscaAlerta" value="pisca-alerta-nao" id="pisca-alerta-nao" htmlfor="pisca-alerta-nao" required checked={piscaAlerta === 'pisca-alerta-nao'} onChange={handlePiscaAlertaChange}>Não</InputLine>
                                        <InputLine type="radio" name="piscaAlerta" value="pisca-alerta-n-a" id="pisca-alerta-n-a" htmlfor="pisca-alerta-n-a" required checked={piscaAlerta === 'pisca-alerta-n-a'} onChange={handlePiscaAlertaChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Luz de freio (dois lados)?</legend>
                                        <InputLine type="radio" name="luzFreio" value="luz-freio-sim" id="luz-freio-sim" htmlfor="luz-freio-sim" required checked={luzFreio === 'luz-freio-sim'} onChange={handleLuzFreioChange}>Sim</InputLine>
                                        <InputLine type="radio" name="luzFreio" value="luz-freio-nao" id="luz-freio-nao" htmlfor="luz-freio-nao" required checked={luzFreio === 'luz-freio-nao'} onChange={handleLuzFreioChange}>Não</InputLine>
                                        <InputLine type="radio" name="luzFreio" value="luz-freio-n-a" id="luz-freio-n-a" htmlfor="luz-freio-n-a" required checked={luzFreio === 'luz-freio-n-a'} onChange={handleLuzFreioChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Luz de Ré (dois lados)?</legend>
                                        <InputLine type="radio" name="luzRe" value="luz-re-sim" id="luz-re-sim" htmlfor="luz-re-sim" required checked={luzRe === 'luz-re-sim'} onChange={handleLuzReChange}>Sim</InputLine>
                                        <InputLine type="radio" name="luzRe" value="luz-re-nao" id="luz-re-nao" htmlfor="luz-re-nao" required checked={luzRe === 'luz-re-nao'} onChange={handleLuzReChange}>Não</InputLine>
                                        <InputLine type="radio" name="luzRe" value="luz-re-n-a" id="luz-re-n-a" htmlfor="luz-re-n-a" required checked={luzRe === 'luz-re-n-a'} onChange={handleLuzReChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Sirene de Ré funciona?</legend>
                                        <InputLine type="radio" name="sirene" value="sirene-sim" id="sirene-sim" htmlfor="sirene-sim" required checked={sirene === 'sirene-sim'} onChange={handleSireneChange}>Sim</InputLine>
                                        <InputLine type="radio" name="sirene" value="sirene-nao" id="sirene-nao" htmlfor="sirene-nao" required checked={sirene === 'sirene-nao'} onChange={handleSireneChange}>Não</InputLine>
                                        <InputLine type="radio" name="sirene" value="sirene-n-a" id="sirene-n-a" htmlfor="sirene-n-a" required checked={sirene === 'sirene-n-a'} onChange={handleSireneChange}>N/A</InputLine>
                                    </fieldset>
                                </section>
                                <section>
                                    <p style={{ color: "#000000", fontSize: "1rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">Itens Obrigatórios e Segurança Individual</p>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Possui EXTINTOR?</legend>
                                        <InputLine type="radio" name="extintor" value="extintor-sim" id="extintor-sim" htmlfor="extintor-sim" required checked={extintor === 'extintor-sim'} onChange={handleExtintorChange}>Sim</InputLine>
                                        <InputLine type="radio" name="extintor" value="extintor-nao" id="extintor-nao" htmlfor="extintor-nao" required checked={extintor === 'extintor-nao'} onChange={handleExtintorChange}>Não</InputLine>
                                        <InputLine type="radio" name="extintor" value="extintor-n-a" id="extintor-n-a" htmlfor="extintor-n-a" required checked={extintor === 'extintor-n-a'} onChange={handleExtintorChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Possui STEP?</legend>
                                        <InputLine type="radio" name="step" value="step-sim" id="step-sim" htmlfor="step-sim" required checked={step === 'step-sim'} onChange={handleStepChange}>Sim</InputLine>
                                        <InputLine type="radio" name="step" value="step-nao" id="step-nao" htmlfor="step-nao" required checked={step === 'step-nao'} onChange={handleStepChange}>Não</InputLine>
                                        <InputLine type="radio" name="step" value="step-n-a" id="step-n-a" htmlfor="step-n-a" required checked={step === 'step-n-a'} onChange={handleStepChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Possui TRIANGULO?</legend>
                                        <InputLine type="radio" name="triangulo" value="triangulo-sim" id="triangulo-sim" htmlfor="triangulo-sim" required checked={triangulo === 'triangulo-sim'} onChange={handleTrianguloChange}>Sim</InputLine>
                                        <InputLine type="radio" name="triangulo" value="triangulo-nao" id="triangulo-nao" htmlfor="triangulo-nao" required checked={triangulo === 'triangulo-nao'} onChange={handleTrianguloChange}>Não</InputLine>
                                        <InputLine type="radio" name="triangulo" value="triangulo-n-a" id="triangulo-n-a" htmlfor="triangulo-n-a" required checked={triangulo === 'triangulo-n-a'} onChange={handleTrianguloChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Possui MACACO?</legend>
                                        <InputLine type="radio" name="macaco" value="macaco-sim" id="macaco-sim" htmlfor="macaco-sim" required checked={macaco === 'macaco-sim'} onChange={handleMacacoChange}>Sim</InputLine>
                                        <InputLine type="radio" name="macaco" value="macaco-nao" id="macaco-nao" htmlfor="macaco-nao" required checked={macaco === 'macaco-nao'} onChange={handleMacacoChange}>Não</InputLine>
                                        <InputLine type="radio" name="macaco" value="macaco-n-a" id="macaco-n-a" htmlfor="macaco-n-a" required checked={macaco === 'macaco-n-a'} onChange={handleMacacoChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Possui CHAVE DE RODA?</legend>
                                        <InputLine type="radio" name="chaveRoda" value="chave-roda-sim" id="chave-roda-sim" htmlfor="chave-roda-sim" required checked={chaveRoda === 'chave-roda-sim'} onChange={handleChaveRodaChange}>Sim</InputLine>
                                        <InputLine type="radio" name="chaveRoda" value="chave-roda-nao" id="chave-roda-nao" htmlfor="chave-roda-nao" required checked={chaveRoda === 'chave-roda-nao'} onChange={handleChaveRodaChange}>Não</InputLine>
                                        <InputLine type="radio" name="chaveRoda" value="chave-roda-n-a" id="chave-roda-n-a" htmlfor="chave-roda-n-a" required checked={chaveRoda === 'chave-roda-n-a'} onChange={handleChaveRodaChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Possui CAPACETE SEGURANÇA?</legend>
                                        <InputLine type="radio" name="capaceteSeguranca" value="capacete-seguranca-sim" id="capacete-seguranca-sim" htmlfor="capacete-seguranca-sim" required checked={capaceteSeguranca === 'capacete-seguranca-sim'} onChange={handleCapaceteSegurancaChange}>Sim</InputLine>
                                        <InputLine type="radio" name="capaceteSeguranca" value="capacete-seguranca-nao" id="capacete-seguranca-nao" htmlfor="capacete-seguranca-nao" required checked={capaceteSeguranca === 'capacete-seguranca-nao'} onChange={handleCapaceteSegurancaChange}>Não</InputLine>
                                        <InputLine type="radio" name="capaceteSeguranca" value="capacete-seguranca-n-a" id="capacete-seguranca-n-a" htmlfor="capacete-seguranca-n-a" required checked={capaceteSeguranca === 'capacete-seguranca-n-a'} onChange={handleCapaceteSegurancaChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Possui COLETE SEGURANÇA?</legend>
                                        <InputLine type="radio" name="coleteSeguranca" value="colete-seguranca-sim" id="colete-seguranca-sim" htmlfor="colete-seguranca-sim" required checked={coleteSeguranca === 'colete-seguranca-sim'} onChange={handleColeteSegurancaChange}>Sim</InputLine>
                                        <InputLine type="radio" name="coleteSeguranca" value="colete-seguranca-nao" id="colete-seguranca-nao" htmlfor="colete-seguranca-nao" required checked={coleteSeguranca === 'colete-seguranca-nao'} onChange={handleColeteSegurancaChange}>Não</InputLine>
                                        <InputLine type="radio" name="coleteSeguranca" value="colete-seguranca-n-a" id="colete-seguranca-n-a" htmlfor="colete-seguranca-n-a" required checked={coleteSeguranca === 'colete-seguranca-n-a'} onChange={handleColeteSegurancaChange}>N/A</InputLine>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Possui BOTA DE SEGURANÇA?</legend>
                                        <InputLine type="radio" name="botaSeguranca" value="bota-seguranca-sim" id="bota-seguranca-sim" htmlfor="bota-seguranca-sim" required checked={botaSeguranca === 'bota-seguranca-sim'} onChange={handleBotaSegurancaChange}>Sim</InputLine>
                                        <InputLine type="radio" name="botaSeguranca" value="bota-seguranca-nao" id="bota-seguranca-nao" htmlfor="bota-seguranca-nao" required checked={botaSeguranca === 'bota-seguranca-nao'} onChange={handleBotaSegurancaChange}>Não</InputLine>
                                        <InputLine type="radio" name="botaSeguranca" value="bota-seguranca-n-a" id="bota-seguranca-n-a" htmlfor="bota-seguranca-n-a" required checked={botaSeguranca === 'bota-seguranca-n-a'} onChange={handleBotaSegurancaChange}>N/A</InputLine>
                                    </fieldset>
                                </section>
                                <h3 style={{ color: "#000000", fontSize: "1.3rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">Fotos gerais - Adicione 4 fotos do veículo</h3>
                                <section className="space-y-6">
                                    <InputLine type="file" id="frenteVeiculo" htmlfor="frente-veiculo" required onChange={(e) => handleFileChange(e, "frenteVeiculo")}>Frente do veículo</InputLine>
                                    <InputLine type="file" id="lateralDianteira" htmlfor="lateral-dianteira" required onChange={(e) => handleFileChange(e, "lateralDianteira")}>Lateral Direita</InputLine>
                                    <InputLine type="file" id="lateralEsquerda" htmlfor="lateral-esquerda" required onChange={(e) => handleFileChange(e, "lateralEsquerda")}>Lateral Esquerda</InputLine>
                                    <InputLine type="file" id="traseira" htmlfor="traseira" required onChange={(e) => handleFileChange(e, "traseira")}>Traseira com a porta aberta</InputLine>
                                    <InputLine type="text" placeholder="" id="obs" htmlfor="obs" onChange={(e) => setObs(e.target.value)}>Observações sobre o veículo</InputLine>
                                    <fieldset className="border border-gray-200 rounded-xl p-4 mb-6">
                                        <legend className="text-black">Responsável pela vistoria</legend>
                                        <InputLine type="radio" name="responsavelVistoria" value="Diego-Sávio" id="Diego-Sávio" htmlfor="Diego-Sávio" checked={responsavelVistoria === 'Diego-Sávio'} onChange={(e) => { handleResponsavelVistoriaChange(e); handlechange(e) }} required>Diego Sávio</InputLine>
                                        <InputLine type="radio" name="responsavelVistoria" value="Gabriel-Andrade" id="Gabriel-Andrade" htmlfor="Gabriel-Andrade" checked={responsavelVistoria === 'Gabriel-Andrade'} onChange={(e) => { handleResponsavelVistoriaChange(e); handlechange(e) }} required>Gabriel Andrade</InputLine>
                                        <InputLine type="radio" name="responsavelVistoria" value="Igor-Carvalho" id="Igor-Carvalho" htmlfor="Igor-Carvalho" checked={responsavelVistoria === 'Igor-Carvalho'} onChange={(e) => { handleResponsavelVistoriaChange(e); handlechange(e) }} required>Igor Carvalho</InputLine>
                                        <InputLine type="radio" name="responsavelVistoria" value="Junior-Pereira" id="Junior-Pereira" htmlfor="Junior-Pereira" checked={responsavelVistoria === 'Junior-Pereira'} onChange={(e) => { handleResponsavelVistoriaChange(e); handlechange(e) }} required>Junior Pereira</InputLine>
                                        <InputLine type="radio" name="responsavelVistoria" value="Luis-Oliveira" id="Luis-Oliveira" htmlfor="Luis-Oliveira" checked={responsavelVistoria === 'Luis-Oliveira'} onChange={(e) => { handleResponsavelVistoriaChange(e); handlechange(e) }} required>Luis Oliveira</InputLine>
                                        <InputLine type="radio" name="responsavelVistoria" value="Ruan-Hofacher" id="Ruan-Hofacher" htmlfor="Ruan-Hofacher" checked={responsavelVistoria === 'Ruan-Hofacher'} onChange={(e) => { handleResponsavelVistoriaChange(e); handlechange(e) }} required>Ruan Hofacher</InputLine>
                                        <InputLine type="radio" name="responsavelVistoria" value="Samuel-Lucas" id="Samuel-Lucas" htmlfor="Samuel-Lucas" checked={responsavelVistoria === 'Samuel-Lucas'} onChange={(e) => { handleResponsavelVistoriaChange(e); handlechange(e) }} required>Samuel Lucas</InputLine>
                                        <InputLine type="radio" name="responsavelVistoria" value="Tatiane-Dias" id="Tatiane-Dias" htmlfor="Tatiane-Dias" checked={responsavelVistoria === 'Tatiane-Dias'} onChange={(e) => { handleResponsavelVistoriaChange(e); handlechange(e) }} required>Tatiane Dias</InputLine>
                                        <InputLine type="radio" name="responsavelVistoria" value="outro" id="outro" htmlfor="outro" checked={responsavelVistoria === 'outro'} onChange={(e) => { handleResponsavelVistoriaChange(e); handlechange(e) }} required>Outro</InputLine>
                                        {mostraOutro &&
                                            <InputLine type="text" id="outro" htmlfor="outro" onChange={(e) => setOutro(e.target.value)}>Nome do responsável:</InputLine>
                                        }
                                    </fieldset>
                                </section>
                            </section>
                            <section>
                                <div className="flex justify-center mt-8">
                                    <input type="submit" value={'Enviar'} className="bg-[#44648d] text-white rounded-md px-4 py-2 font-bold" />
                                </div>
                            </section>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    )
}