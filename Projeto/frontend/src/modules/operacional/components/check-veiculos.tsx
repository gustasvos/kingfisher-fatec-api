import { useState } from "react"
import InputLine from "../../../shared/components/inputLine"
import { IMaskInput } from "react-imask"
import Botao from "../../../shared/components/botao"

export default function CheckVeiculos() {
    const [mostraOutro, setMostraOutro] = useState(false)
    const [respVistoria, setRespVistoria] = useState('')
    const [letraNum, setLetraNum] = useState('')
    const [erro,setErro] = useState('')

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRespVistoria(e.target.value)
        setMostraOutro(e.target.value === 'outro')
        setLetraNum(e.target.value)

        const regex =  /^[a-zA-Z0-9]*$/

        if (!regex.test(letraNum)) {
            setErro('Digite apenas letras e números.');
          } else {
            setErro('');
          }
    }


    return (
        <section>
            <form action="">
                <p className="text-black">Sessão 1: Dados Cadastrais</p>
                <section>
                    <InputLine type="text" placeholder="" id='nome' htmlfor="nome" required>Nome Completo</InputLine>
                    <section className="relative">
                        <IMaskInput mask={"000.000.000-00"} required maxLength={14} className="w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label htmlFor="" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">CPF</label>
                    </section>
                    <InputLine type="email" placeholder="" id='email' htmlfor="email" required>E-mail</InputLine>
                    <InputLine type="text" placeholder="" maxLength={7} id='placa-veiculo' htmlfor="placa-veiculo" onchange={handlechange}>Placa do veículo(apenas os numeros e letras!)</InputLine>
                    {erro && <p className="text-red-700 text-[12px]">{erro}</p>}
                    <fieldset>
                        <legend className="text-black">tipo veiculo</legend>
                        <InputLine type="radio" name="tipo-veiculo" value="van" id='van' htmlfor="van" required>van</InputLine>
                        <InputLine type="radio" name="tipo-veiculo" value="fiorino" id='fiorino' htmlfor="fiorino" required>fiorino</InputLine>
                        <InputLine type="radio" name="tipo-veiculo" value="vuc" id='vuc' htmlfor="vuc" required>vuc</InputLine>
                        <InputLine type="radio" name="tipo-veiculo" value="3/4" id='3/4' htmlfor="3/4" required>3/4</InputLine>
                        <InputLine type="radio" name="tipo-veiculo" value="troco" id='troco' htmlfor="troco" required>troco</InputLine>
                        <InputLine type="radio" name="tipo-veiculo" value="truck" id='truck' htmlfor="truck" required>truck</InputLine>
                        <InputLine type="radio" name="tipo-veiculo" value="carreta" id='carreta' htmlfor="carreta" required>carreta</InputLine>
                    </fieldset>
                </section>
                <p className="text-black">Sessão 2: Motor - Verificação do vazamentos e nível de óleo e água no motor do veículo</p>
                <section>
                    <p className="text-black">Vistoria</p>
                    <fieldset>
                        <legend className="text-black">Nível de Óleo está bom?</legend>
                        <InputLine type="radio" name="nivel-oleo" value="oleo-sim" id="oleo-sim" htmlfor="oleo-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="nivel-oleo" value="oleo-nao" id="oleo-nao" htmlfor="oleo-nao" required>Não</InputLine>
                        <InputLine type="radio" name="nivel-oleo" value="oleo-n-a" id="oleo-n-a" htmlfor="oleo-n-a" required>N/A</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Livre de vazamento de óleo?</legend>
                        <InputLine type="radio" name="livre-oleo" value="livre-sim" id="livre-sim" htmlfor="livre-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="livre-oleo" value="livre-nao" id="livre-nao" htmlfor="livre-nao" required>Não</InputLine>
                        <InputLine type="radio" name="livre-oleo" value="livre-n-a" id="livre-n-a" htmlfor="livre-n-a" required>N/A</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Nível de ÁGUA reservatório está bom?</legend>
                        <InputLine type="radio" name="nivel-agua" value="agua-sim" id="agua-sim" htmlfor="agua-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="nivel-agua" value="agua-nao" id="agua-nao" htmlfor="agua-nao" required>Não</InputLine>
                        <InputLine type="radio" name="nivel-agua" value="agua-n-a" id="agua-n-a" htmlfor="agua-n-a" required>N/A</InputLine>
                    </fieldset>
                    <InputLine type="file" id="foto-motor" htmlfor="foto-motor" required>Foto do motor do veículo</InputLine>
                    <InputLine type="file" id="etiqueta-oleo" htmlfor="etiqueta-oleo">Foto etiqueta da última troca de óleo </InputLine>
                </section>
                <section>
                    <p className="text-black">Sessão 3: Pneus - Verificação do estado de conservação dos PNEUS do veículo</p>
                    <section>
                        <p className="text-black">Pneus estão lisos?</p>
                        <fieldset>
                            <legend className="text-black">PNE - Pneu Dianteiro Esquerdo</legend>
                            <InputLine type="radio" name="pne-liso-d-esq" value="liso-sim-d-e" id="liso-sim-d-e" htmlfor="liso-sim-d-e" required>Sim</InputLine>
                            <InputLine type="radio" name="pne-liso-d-esq" value="liso-nao-d-e" id="liso-nao-d-e" htmlfor="liso-nao-d-e" required>Não</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">PNE - Pneu Dianteiro Esquerdo</legend>
                            <InputLine type="radio" name="pne-liso-pde" value="pde-sim" id="pde-sim" htmlfor="pde-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="pne-liso-pde" value="pde-nao" id="pde-nao" htmlfor="pde-nao" required>Não</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">PTE - Pneu Traseiro Esquerdo</legend>
                            <InputLine type="radio" name="pne-liso-pte" value="pte-sim" id="pte-sim" htmlfor="pte-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="pne-liso-pte" value="pte-nao" id="pte-nao" htmlfor="pte-nao" required>Não</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">PTD - Pneu Traseiro Direito</legend>
                            <InputLine type="radio" name="pne-liso-ptd" value="ptd-sim" id="ptd-sim" htmlfor="ptd-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="pne-liso-ptd" value="ptd-nao" id="ptd-nao" htmlfor="ptd-nao" required>Não</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">PDD - Pneu Dianteiro Direito</legend>
                            <InputLine type="radio" name="pne-liso-pdd" value="pdd-sim" id="pdd-sim" htmlfor="pdd-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="pne-liso-pdd" value="pdd-nao" id="pdd-nao" htmlfor="pdd-nao" required>Não</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">PDD - Pneu Dianteiro Direito</legend>
                            <InputLine type="radio" name="pne-liso-pdd" value="pdd-sim" id="pdd-sim" htmlfor="pdd-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="pne-liso-pdd" value="pdd-nao" id="pdd-nao" htmlfor="pdd-nao" required>Não</InputLine>
                        </fieldset>
                    </section>
                    <section>
                        <p className="text-black">FOTOS GERAIS - Comprobatórias</p>
                        <InputLine type="file" id="foto-pne" htmlfor="foto-pne" required>Foto do PNE - Pneu Dianteiro Esquerdo</InputLine>
                        <InputLine type="file" id="foto-pte" htmlfor="foto-pte" required>Foto do PTE - Pneu Traseiro Esquerdo</InputLine>
                        <InputLine type="file" id="foto-ptd" htmlfor="foto-ptd" required>Foto do PTD - Pneu Traseiro Direito</InputLine>
                        <InputLine type="file" id="foto-pdd" htmlfor="foto-pdd" required>Foto do PDD - Pneu Dianteiro Direito</InputLine>
                    </section>
                </section>
                <section>
                    <p className="text-black">Sessão 4: Conservação | Aparência | Segurança</p>
                    <section>
                        <p className="text-black">Limpeza e Aparência externa do veículo</p>
                        <fieldset>
                            <legend className="text-black">Para-brisa em perfeito estado?</legend>
                            <InputLine type="radio" name="parabrisa-perf-estado" value="parabrisa-sim" id="parabrisa-sim" htmlfor="parabrisa-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="parabrisa-perf-estado" value="parabrisa-nao" id="parabrisa-nao" htmlfor="parabrisa-nao" required>Não</InputLine>
                            <InputLine type="radio" name="parabrisa-perf-estado" value="parabrisa-n-a" id="parabrisa-n-a" htmlfor="parabrisa-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Cabine (externa) está limpa?</legend>
                            <InputLine type="radio" name="cabine-ext-limpa" value="cabine-ext-sim" id="cabine-ext-sim" htmlfor="cabine-ext-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="cabine-ext-limpa" value="cabine-ext-nao" id="cabine-ext-nao" htmlfor="cabine-ext-nao" required>Não</InputLine>
                            <InputLine type="radio" name="cabine-ext-limpa" value="cabine-ext-n-a" id="cabine-ext-n-a" htmlfor="cabine-ext-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Veículo (externo) está limpo?</legend>
                            <InputLine type="radio" name="veiculo-ext-limpa" value="veiculo-ext-sim" id="veiculo-ext-sim" htmlfor="veiculo-ext-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="veiculo-ext-limpa" value="veiculo-ext-nao" id="veiculo-ext-nao" htmlfor="veiculo-ext-nao" required>Não</InputLine>
                            <InputLine type="radio" name="veiculo-ext-limpa" value="veiculo-ext-n-a" id="veiculo-ext-n-a" htmlfor="veiculo-ext-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Livre de amassados/ferrugens?</legend>
                            <InputLine type="radio" name="amassado-ferrugem" value="amassado-ferrugem-sim" id="amassado-ferrugem-sim" htmlfor="amassado-ferrugem-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="amassado-ferrugem" value="amassado-ferrugem-nao" id="amassado-ferrugem-nao" htmlfor="amassado-ferrugem-nao" required>Não</InputLine>
                            <InputLine type="radio" name="amassado-ferrugem" value="amassado-ferrugem-n-a" id="amassado-ferrugem-n-a" htmlfor="amassado-ferrugem-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Assoalho está conversado? Sem ferrugens ou amassados?</legend>
                            <InputLine type="radio" name="assoalho" value="assoalho-sim" id="assoalho-sim" htmlfor="assoalho-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="assoalho" value="assoalho-nao" id="assoalho-nao" htmlfor="assoalho-nao" required>Não</InputLine>
                            <InputLine type="radio" name="assoalho" value="assoalho-n-a" id="assoalho-n-a" htmlfor="assoalho-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Possui FAIXAS REFLETIVAS?</legend>
                            <InputLine type="radio" name="faixa-refletida" value="faixa-refletida-sim" id="faixa-refletida-sim" htmlfor="faixa-refletida-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="faixa-refletida" value="faixa-refletida-nao" id="faixa-refletida-nao" htmlfor="faixa-refletida-nao" required>Não</InputLine>
                            <InputLine type="radio" name="faixa-refletida" value="faixa-refletida-n-a" id="faixa-refletida-n-a" htmlfor="faixa-refletida-n-a" required>N/A</InputLine>
                        </fieldset>
                    </section>
                    <section>
                        <p className="text-black">Sistema elétrico</p>
                        <fieldset>
                            <legend className="text-black">Limpador Para-brisa funcionando?</legend>
                            <InputLine type="radio" name="parabrisa-func" value="parabrisa-func-sim" id="parabrisa-func-sim" htmlfor="parabrisa-func-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="parabrisa-func" value="parabrisa-func-nao" id="parabrisa-func-nao" htmlfor="parabrisa-func-nao" required>Não</InputLine>
                            <InputLine type="radio" name="parabrisa-func" value="parabrisa-func-n-a" id="parabrisa-func-n-a" htmlfor="parabrisa-func-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Buzina funciona?</legend>
                            <InputLine type="radio" name="buzina-func" value="buzina-func-sim" id="buzina-func-sim" htmlfor="buzina-func-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="buzina-func" value="buzina-func-nao" id="buzina-func-nao" htmlfor="buzina-func-nao" required>Não</InputLine>
                            <InputLine type="radio" name="buzina-func" value="buzina-func-n-a" id="buzina-func-n-a" htmlfor="buzina-func-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Farol ALTO (dois lados)?</legend>
                            <InputLine type="radio" name="farol-alto" value="farol-alto-sim" id="farol-alto-sim" htmlfor="farol-alto-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="farol-alto" value="farol-alto-nao" id="farol-alto-nao" htmlfor="farol-alto-nao" required>Não</InputLine>
                            <InputLine type="radio" name="farol-alto" value="farol-alto-n-a" id="farol-alto-n-a" htmlfor="farol-alto-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Farol BAIXO (dois lados)?</legend>
                            <InputLine type="radio" name="farol-baixo" value="farol-baixo-sim" id="farol-baixo-sim" htmlfor="farol-baixo-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="farol-baixo" value="farol-baixo-nao" id="farol-baixo-nao" htmlfor="farol-baixo-nao" required>Não</InputLine>
                            <InputLine type="radio" name="farol-baixo" value="farol-baixo-n-a" id="farol-baixo-n-a" htmlfor="farol-baixo-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Setas dianteiras (dois lados)?</legend>
                            <InputLine type="radio" name="setas-dianteiras" value="setas-dianteiras-sim" id="setas-dianteiras-sim" htmlfor="setas-dianteiras-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="setas-dianteiras" value="setas-dianteiras-nao" id="setas-dianteiras-nao" htmlfor="setas-dianteiras-nao" required>Não</InputLine>
                            <InputLine type="radio" name="setas-dianteiras" value="setas-dianteiras-n-a" id="setas-dianteiras-n-a" htmlfor="setas-dianteiras-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Setas traseiras (dois lados)?</legend>
                            <InputLine type="radio" name="setas-trazeiras" value="setas-trazeiras-sim" id="setas-trazeiras-sim" htmlfor="setas-trazeiras-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="setas-trazeiras" value="setas-trazeiras-nao" id="setas-trazeiras-nao" htmlfor="setas-trazeiras-nao" required>Não</InputLine>
                            <InputLine type="radio" name="setas-trazeiras" value="setas-trazeiras-n-a" id="setas-trazeiras-n-a" htmlfor="setas-trazeiras-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Pisca-Alerta (dois lados)?</legend>
                            <InputLine type="radio" name="pisca-alerta" value="pisca-alerta-sim" id="pisca-alerta-sim" htmlfor="pisca-alerta-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="pisca-alerta" value="pisca-alerta-nao" id="pisca-alerta-nao" htmlfor="pisca-alerta-nao" required>Não</InputLine>
                            <InputLine type="radio" name="pisca-alerta" value="pisca-alerta-n-a" id="pisca-alerta-n-a" htmlfor="pisca-alerta-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Luz de freio (dois lados)?</legend>
                            <InputLine type="radio" name="luz-freio" value="luz-freio-sim" id="luz-freio-sim" htmlfor="luz-freio-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="luz-freio" value="luz-freio-nao" id="luz-freio-nao" htmlfor="luz-freio-nao" required>Não</InputLine>
                            <InputLine type="radio" name="luz-freio" value="luz-freio-n-a" id="luz-freio-n-a" htmlfor="luz-freio-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Luz de Ré (dois lados)?</legend>
                            <InputLine type="radio" name="luz-re" value="luz-re-sim" id="luz-re-sim" htmlfor="luz-re-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="luz-re" value="luz-re-nao" id="luz-re-nao" htmlfor="luz-re-nao" required>Não</InputLine>
                            <InputLine type="radio" name="luz-re" value="luz-re-n-a" id="luz-re-n-a" htmlfor="luz-re-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Sirene de Ré funciona?</legend>
                            <InputLine type="radio" name="sirene" value="sirene-sim" id="sirene-sim" htmlfor="sirene-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="sirene" value="sirene-nao" id="sirene-nao" htmlfor="sirene-nao" required>Não</InputLine>
                            <InputLine type="radio" name="sirene" value="sirene-n-a" id="sirene-n-a" htmlfor="sirene-n-a" required>N/A</InputLine>
                        </fieldset>
                    </section>
                    <section>
                        <p className="text-black">Itens Obrigatórios e Segurança Individual</p>
                        <fieldset>
                            <legend className="text-black">Possui EXTINTOR?</legend>
                            <InputLine type="radio" name="extintor" value="extintor-sim" id="extintor-sim" htmlfor="extintor-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="extintor" value="extintor-nao" id="extintor-nao" htmlfor="extintor-nao" required>Não</InputLine>
                            <InputLine type="radio" name="extintor" value="extintor-n-a" id="extintor-n-a" htmlfor="extintor-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Possui STEP?</legend>
                            <InputLine type="radio" name="step" value="step-sim" id="step-sim" htmlfor="step-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="step" value="step-nao" id="step-nao" htmlfor="step-nao" required>Não</InputLine>
                            <InputLine type="radio" name="step" value="step-n-a" id="step-n-a" htmlfor="step-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Possui TRIANGULO?</legend>
                            <InputLine type="radio" name="triangulo" value="triangulo-sim" id="triangulo-sim" htmlfor="triangulo-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="triangulo" value="triangulo-nao" id="triangulo-nao" htmlfor="triangulo-nao" required>Não</InputLine>
                            <InputLine type="radio" name="triangulo" value="triangulo-n-a" id="triangulo-n-a" htmlfor="triangulo-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Possui MACACO?</legend>
                            <InputLine type="radio" name="macaco" value="macaco-sim" id="macaco-sim" htmlfor="macaco-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="macaco" value="macaco-nao" id="macaco-nao" htmlfor="macaco-nao" required>Não</InputLine>
                            <InputLine type="radio" name="macaco" value="macaco-n-a" id="macaco-n-a" htmlfor="macaco-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Possui CHAVE DE RODA?</legend>
                            <InputLine type="radio" name="chave-roda" value="chave-roda-sim" id="chave-roda-sim" htmlfor="chave-roda-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="chave-roda" value="chave-roda-nao" id="chave-roda-nao" htmlfor="chave-roda-nao" required>Não</InputLine>
                            <InputLine type="radio" name="chave-roda" value="chave-roda-n-a" id="chave-roda-n-a" htmlfor="chave-roda-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Possui CAPACETE SEGURANÇA?</legend>
                            <InputLine type="radio" name="capacete-seguranca" value="capacete-seguranca-sim" id="capacete-seguranca-sim" htmlfor="capacete-seguranca-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="capacete-seguranca" value="capacete-seguranca-nao" id="capacete-seguranca-nao" htmlfor="capacete-seguranca-nao" required>Não</InputLine>
                            <InputLine type="radio" name="capacete-seguranca" value="capacete-seguranca-n-a" id="capacete-seguranca-n-a" htmlfor="capacete-seguranca-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Possui COLETE SEGURANÇA?</legend>
                            <InputLine type="radio" name="colete-seguranca" value="colete-seguranca-sim" id="colete-seguranca-sim" htmlfor="colete-seguranca-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="colete-seguranca" value="colete-seguranca-nao" id="colete-seguranca-nao" htmlfor="colete-seguranca-nao" required>Não</InputLine>
                            <InputLine type="radio" name="colete-seguranca" value="colete-seguranca-n-a" id="colete-seguranca-n-a" htmlfor="colete-seguranca-n-a" required>N/A</InputLine>
                        </fieldset>
                        <fieldset>
                            <legend className="text-black">Possui BOTA DE SEGURANÇA?</legend>
                            <InputLine type="radio" name="bota-seguranca" value="bota-seguranca-sim" id="bota-seguranca-sim" htmlfor="bota-seguranca-sim" required>Sim</InputLine>
                            <InputLine type="radio" name="bota-seguranca" value="bota-seguranca-nao" id="bota-seguranca-nao" htmlfor="bota-seguranca-nao" required>Não</InputLine>
                            <InputLine type="radio" name="bota-seguranca" value="bota-seguranca-n-a" id="bota-seguranca-n-a" htmlfor="bota-seguranca-n-a" required>N/A</InputLine>
                        </fieldset>
                    </section>
                    <p className="text-black">Fotos gerais - Adicione 4 fotos do veículo</p>
                    <InputLine type="file" id="frente-veiculo" htmlfor="frente-veiculo" required>Frente do veículo</InputLine>
                    <InputLine type="file" id="lateral-dianteira" htmlfor="lateral-dianteira" required>Lateral Direita</InputLine>
                    <InputLine type="file" id="lateral-esquerda" htmlfor="lateral-esquerda" required>Lateral Esquerda</InputLine>
                    <InputLine type="file" id="traseira" htmlfor="traseira" required>Traseira com a porta aberta</InputLine>
                    <InputLine type="text" placeholder="" id="obs" htmlfor="obs">Observações sobre o veículo</InputLine>
                    <fieldset>
                        <legend className="text-black">Responsável pela vistoria</legend>
                        <InputLine type="radio" name="responsavel-vistoria" value="Diego-Sávio" id="Diego-Sávio" htmlfor="Diego-Sávio" onchange={handlechange} required>Diego Sávio</InputLine>
                        <InputLine type="radio" name="responsavel-vistoria" value="Gabriel-Andrade" id="Gabriel-Andrade" htmlfor="Gabriel-Andrade" onchange={handlechange} required>Gabriel Andrade</InputLine>
                        <InputLine type="radio" name="responsavel-vistoria" value="Igor-Carvalho" id="Igor-Carvalho" htmlfor="Igor-Carvalho" onchange={handlechange} required>Igor Carvalho</InputLine>
                        <InputLine type="radio" name="responsavel-vistoria" value="Junior-Pereira" id="Junior-Pereira" htmlfor="Junior-Pereira" onchange={handlechange} required>Junior Pereira</InputLine>
                        <InputLine type="radio" name="responsavel-vistoria" value="Luis-Oliveira" id="Luis-Oliveira" htmlfor="Luis-Oliveira" onchange={handlechange} required>Luis Oliveira</InputLine>
                        <InputLine type="radio" name="responsavel-vistoria" value="Ruan-Hofacher" id="Ruan-Hofacher" htmlfor="Ruan-Hofacher" onchange={handlechange} required>Ruan Hofacher</InputLine>
                        <InputLine type="radio" name="responsavel-vistoria" value="Samuel-Lucas" id="Samuel-Lucas" htmlfor="Samuel-Lucas" onchange={handlechange} required>Samuel Lucas</InputLine>
                        <InputLine type="radio" name="responsavel-vistoria" value="Tatiane-Dias" id="Tatiane-Dias" htmlfor="Tatiane-Dias" onchange={handlechange} required>Tatiane Dias</InputLine>
                        <InputLine type="radio" name="responsavel-vistoria" value="outro" id="outro" htmlfor="outro" onchange={handlechange} required>Outro</InputLine>
                        {mostraOutro &&
                            <InputLine type="text" id="outro" htmlfor="outro">Nome do responsável:</InputLine>
                        }
                    </fieldset>
                </section>
                <section>
                    <input type="submit" value={'ENVIAR'} className="bg-[#015084] w-[250px] h-[45px] rounded-[8px] text-white text-[15px] font-semibold cursor-pointer font-sans text-black" />
                </section>
            </form>
        </section>
    )
}