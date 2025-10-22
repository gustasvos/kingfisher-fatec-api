import { useState } from "react"
import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"

type FormAberturaProps = {
    form: string;
}

export default function FormManutencao({form}: FormAberturaProps) {
    const [mostra, setMostra] = useState(false)
    const [loading, setLoading] = useState(false);

    const [formTitle, setFormTitle] = useState(form)
    const [dataVerificacao, setDataVerificacao] = useState("")
    const [condicaoPisoEscritorio, setCondicaoPisoEscritorio] = useState("")
    const [condicaoPisoOperacional, setCondicaoPisoOperacional] = useState("")
    const [condicaoPisoGalpao, setCondicaoPisoGalpao] = useState("")
    const [condicaoPisoRefeitorio, setCondicaoPisoRefeitorio] = useState("")
    const [condicaoForroEscritorio, setCondicaoForroEscritorio] = useState("")
    const [condicaoForroOperacional, setCondicaoForroOperacional] = useState("")
    const [condicaoForroGalpao, setCondicaoForroGalpao] = useState("")
    const [condicaoForroRefeitorio, setCondicaoForroRefeitorio] = useState("")
    const [estadoGeralEletrica, setEstadoGeralEletrica] = useState("")
    const [protecaoRaio, setProtecaoRaio] = useState("")
    const [arAdm, setArAdm] = useState(null)
    const [arDiretoria, setArDiretoria] = useState(null)
    const [arReuniao, setArReuniao] = useState(null)
    const [arOperacional, setArOperacional] = useState(null)
    const [lampadaAdm, setLampadaAdm] = useState(null)
    const [lampadaDiretoria, setLampadaDiretoria] = useState(null)
    const [lampadaReuniao, setLampadaReuniao] = useState(null)
    const [lampadaOperacional, setLampadaOperacional] = useState(null)
    const [lampadaGalpao, setLampadaGalpao] = useState(null)
    const [lampadaRefeitorio, setLampadaRefeitorio] = useState(null)
    const [lampadaBanheiroFem, setLampadaBanheiroFem] = useState(null)
    const [lampadaBanheiroMasc, setLampadaBanheiroMasc] = useState(null)
    const [macanetaBoa, setMacanetaBoa] = useState(null)
    const [mesaOpProtegida, setMesaOpProtegida] = useState(null)
    const [condicaoPratileira, setCondicaoPratileira] = useState("")
    const [organizacaoSegura, setOrganizacaoSegura] = useState("")
    const [cameraFunciona, setCameraFunciona] = useState(null)
    const [balancaPiso, setBalancaPiso] = useState("")
    const [dataBalanca, setDataBalanca] = useState("")
    const [condicaoMicLav, setCondicaoMicLav] = useState("")
    const [dataBebedouro, setDataBebedouro] = useState("")
    const [dataProximaDetetizacao, setDataProximaDetetizacao] = useState("")
    const [dataUltimoExtintor, setDataUltimoExtintor] = useState("")
    const [dataProximoExtintor, setDataProximoExtintor] = useState("")
    const [dataUltimaCaixaAgua, setDataUltimaCaixaAgua] = useState("")
    const [dataProximaCaixaAgua, setDataProximaCaixaAgua] = useState("")
    const [cadeiraRuim, setCadeiraRuim] = useState(null)
    const [setorCadeiraRuim, setSetorCadeiraRuim] = useState("")
    const [detalheAdd, setDetalheAdd] = useState("")

    const handleArAdmChange = (event) => {
        setArAdm(event.target.value)
    }

    const handleArDiretoriaChange = (event) => {
        setArDiretoria(event.target.value)
    }

    const handleArReuniaoChange = (event) => {
        setArReuniao(event.target.value)
    }

    const handleArOperacionalChange = (event) => {
        setArOperacional(event.target.value)
    }

    const handleLampadaAdmChange = (event) => {
        setLampadaAdm(event.target.value)
    }

    const handleLampadaDiretoriaChange = (event) => {
        setLampadaDiretoria(event.target.value)
    }

    const handleLampadaReuniaoChange = (event) => {
        setLampadaReuniao(event.target.value)
    }

    const handleLampadaOperacionalChange = (event) => {
        setLampadaOperacional(event.target.value)
    }

    const handleLampadaGalpaoChange = (event) => {
        setLampadaGalpao(event.target.value)
    }

    const handleLampadaRefeitorioChange = (event) => {
        setLampadaRefeitorio(event.target.value)
    }

    const handleLampadaBanheiroFemChange = (event) => {
        setLampadaBanheiroFem(event.target.value)
    }

    const handleLampadaBanheiroMascChange = (event) => {
        setLampadaBanheiroMasc(event.target.value)
    }

    const handleMacanetaBoaChange = (event) => {
        setMacanetaBoa(event.target.value)
    }

    const handleMesaOpProtegidaChange = (event) => {
        setMesaOpProtegida(event.target.value)
    }

    const handleCameraFuncionaChange = (event) => {
        setCameraFunciona(event.target.value)
    }

     const handleCadeiraRuimChange = (event) => {
        setCadeiraRuim(event.target.value)
    }

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setMostra(e.target.value === "cadeira-ruim-sim")
    }

    const enviaForm = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
        alert("Formulário enviado!");
        setLoading(false);
        }, 2000);
    }

    return (
        <section>
            <h1 className="text-black text-[30px] font-bold">Formulário de manutenção predial</h1>
            <p className="text-black">Esse formulário tem o objetivo de verificar as condições do local afim de manter segurança, funcionalidade e conservação do ambiente de trabalho</p>
            <form onSubmit={enviaForm} action="">
                <InputLine type="date" placeholder="" id="dataVerificacao" htmlfor="data-verificacao" onChange={(e) => setDataVerificacao(e.target.value)}>Data da verificação</InputLine>
                <InputLine type="string" placeholder="" id="condicaoPisoEscritorio" htmlfor="condicao-piso-escritorio" onChange={(e) => setCondicaoPisoEscritorio(e.target.value)}>Quais as condições do piso do escritório(ADM/Diretoria/ Sala de reunião)</InputLine>
                <InputLine type="string" placeholder="" id="condicaoPisoOperacional" htmlfor="condicao-piso-operacional" onChange={(e) => setCondicaoPisoOperacional(e.target.value)}>Quais as condições do piso da sala OPERACIONAL</InputLine>
                <InputLine type="string" placeholder="" id="condicaoPisoGalpao" htmlfor="condicao-piso-galpao" onChange={(e) => setCondicaoPisoGalpao(e.target.value)}>Quais as condições do piso do GALPÃO</InputLine>
                <InputLine type="string" placeholder="" id="condicaoPisoRefeitorio" htmlfor="condicao-piso-refeitorio" onChange={(e) => setCondicaoPisoRefeitorio(e.target.value)}>Quais as condições do piso do REFEITÓRIO</InputLine>
                <InputLine type="string" placeholder="" id="condicaoForroEscritorio" htmlfor="condicao-forro-escritorio" onChange={(e) => setCondicaoForroEscritorio(e.target.value)}>Quais as condições do forro/cobertura do escritório(ADM/Sala de reunião)</InputLine>
                <InputLine type="string" placeholder="" id="condicaoForroOperacional" htmlfor="condicao-forro-operacional" onChange={(e) => setCondicaoForroOperacional(e.target.value)}>Quais as condições do forro/cobertura do OPERACIONAL ?</InputLine>
                <InputLine type="string" placeholder="" id="condicaoForroGalpao" htmlfor="condicao-forro-galpao" onChange={(e) => setCondicaoForroGalpao(e.target.value)}>Quais as condições do forro/cobertura do GALPÃO?</InputLine>
                <InputLine type="string" placeholder="" id="condicaoForroRefeitorio" htmlfor="condicao-forro-refeitorio" onChange={(e) => setCondicaoForroRefeitorio(e.target.value)}>Quais as condições do forro/cobertura do REFEITÓRIO ?</InputLine>
                <InputLine type="string" placeholder="" id="estadoGeralEletrica" htmlfor="estado-geral-eletrica" onChange={(e) => setEstadoGeralEletrica(e.target.value)}>Qual estado geral das instalações elétricas?</InputLine>
                <InputLine type="string" placeholder="" id="protecaoRaio" htmlfor="protecao-raio" onChange={(e) => setProtecaoRaio(e.target.value)}>Qual estado geral de proteções contra raios?</InputLine>
                <fieldset>
                    <legend className="text-black">Verificação de carga ar condicionado - Sala Administrativo</legend>
                    <InputLine type="radio" name="arAdm" value="ar-adm-sim" id="ar-adm-sim" htmlfor="ar-adm-sim" checked={arAdm==='ar-adm-sim'} onChange={handleArAdmChange}>Sim</InputLine>
                    <InputLine type="radio" name="arAdm" value="ar-adm-nao" id="ar-adm-nao" htmlfor="ar-adm-nao" checked={arAdm==='ar-adm-nao'} onChange={handleArAdmChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação de carga ar condicionado - Sala Diretoria</legend>
                    <InputLine type="radio" name="arDiretoria" value="ar-diretoria-sim" id="ar-diretoria-sim" htmlfor="ar-diretoria-sim" checked={arDiretoria==='ar-diretoria-sim'} onChange={handleArDiretoriaChange}>Sim</InputLine>
                    <InputLine type="radio" name="arDiretoria" value="ar-diretoria-nao" id="ar-diretoria-nao" htmlfor="ar-diretoria-nao" checked={arDiretoria==='ar-diretoria-nao'} onChange={handleArDiretoriaChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação de carga ar condicionado - Sala Reunião</legend>
                    <InputLine type="radio" name="arReuniao" value="ar-reuniao-sim" id="ar-reuniao-sim" htmlfor="ar-reuniao-sim" checked={arReuniao==='ar-reuniao-sim'} onChange={handleArReuniaoChange}>Sim</InputLine>
                    <InputLine type="radio" name="arReuniao" value="ar-reuniao-nao" id="ar-reuniao-nao" htmlfor="ar-reuniao-nao" checked={arReuniao==='ar-reuniao-nao'} onChange={handleArReuniaoChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação de carga ar condicionado - Sala Operacional</legend>
                    <InputLine type="radio" name="arOperacional" value="ar-operacional-sim" id="ar-operacional-sim" htmlfor="ar-operacional-sim" checked={arOperacional==='ar-operacional-sim'} onChange={handleArOperacionalChange}>Sim</InputLine>
                    <InputLine type="radio" name="arOperacional" value="ar-operacional-nao" id="ar-operacional-nao" htmlfor="ar-operacional-nao" checked={arOperacional==='ar-operacional-nao'} onChange={handleArOperacionalChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Sala Administrativo</legend>
                    <InputLine type="radio" name="lampadaAdm" value="lampada-adm-sim" id="lampada-adm-sim" htmlfor="lampada-adm-sim" required checked={lampadaAdm==='lampada-adm-sim'} onChange={handleLampadaAdmChange}>Sim</InputLine>
                    <InputLine type="radio" name="lampadaAdm" value="lampada-adm-nao" id="lampada-adm-nao" htmlfor="lampada-adm-nao" required checked={lampadaAdm==='lampada-adm-nao'} onChange={handleLampadaAdmChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Sala Diretoria</legend>
                    <InputLine type="radio" name="lampadaDiretoria" value="lampada-diretoria-sim" id="lampada-diretoria-sim" htmlfor="lampada-diretoria-sim" checked={lampadaDiretoria==='lampada-diretoria-sim'} onChange={handleLampadaDiretoriaChange}>Sim</InputLine>
                    <InputLine type="radio" name="lampadaDiretoria" value="lampada-diretoria-nao" id="lampada-diretoria-nao" htmlfor="lampada-diretoria-nao" checked={lampadaDiretoria==='lampada-diretoria-nao'} onChange={handleLampadaDiretoriaChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Sala Reunião</legend>
                    <InputLine type="radio" name="lampadaReuniao" value="lampada-reuniao-sim" id="lampada-reuniao-sim" htmlfor="lampada-reuniao-sim" checked={lampadaReuniao==='"lampada-reuniao-sim'} onChange={handleLampadaReuniaoChange}>Sim</InputLine>
                    <InputLine type="radio" name="lampadaReuniao" value="lampada-reuniao-nao" id="lampada-reuniao-nao" htmlfor="lampada-reuniao-nao" checked={lampadaReuniao==='"lampada-reuniao-nao'} onChange={handleLampadaReuniaoChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Sala Operacional</legend>
                    <InputLine type="radio" name="lampadaOperacional" value="lampada-operacional-sim" id="lampada-operacional-sim" htmlfor="lampada-operacional-sim" checked={lampadaOperacional==='lampada-operacional-sim'} onChange={handleLampadaOperacionalChange}>Sim</InputLine>
                    <InputLine type="radio" name="lampadaOperacional" value="lampada-operacional-nao" id="lampada-operacional-nao" htmlfor="lampada-operacional-nao" checked={lampadaOperacional==='lampada-operacional-nao'} onChange={handleLampadaOperacionalChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Galpão</legend>
                    <InputLine type="radio" name="lampadaGalpao" value="lampada-galpao-sim" id="lampada-galpao-sim" htmlfor="lampada-galpao-sim" checked={lampadaGalpao==='lampada-galpao-sim'} onChange={handleLampadaGalpaoChange}>Sim</InputLine>
                    <InputLine type="radio" name="lampadaGalpao" value="lampada-galpao-nao" id="lampada-galpao-nao" htmlfor="lampada-galpao-nao" checked={lampadaGalpao==='lampada-galpao-nao'} onChange={handleLampadaGalpaoChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Refeitório</legend>
                    <InputLine type="radio" name="lampadaRefeitorio" value="lampada-refeitorio-sim" id="lampada-refeitorio-sim" htmlfor="lampada-refeitorio-sim" checked={lampadaRefeitorio==='lampada-refeitorio-sim'} onChange={handleLampadaRefeitorioChange}>Sim</InputLine>
                    <InputLine type="radio" name="lampadaRefeitorio" value="lampada-refeitorio-nao" id="lampada-refeitorio-nao" htmlfor="lampada-refeitorio-nao" checked={lampadaRefeitorio==='lampada-refeitorio-na'} onChange={handleLampadaRefeitorioChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Banheiro Feminino</legend>
                    <InputLine type="radio" name="lampadaBanheiroFem" value="lampada-banheiro-fem-sim" id="lampada-banheiro-fem-sim" htmlfor="lampada-banheiro-fem-sim" checked={lampadaBanheiroFem==='lampada-banheiro-fem-sim'} onChange={handleLampadaBanheiroFemChange}>Sim</InputLine>
                    <InputLine type="radio" name="lampadaBanheiroFem" value="lampada-banheiro-fem-nao" id="lampada-banheiro-fem-nao" htmlfor="lampada-banheiro-fem-nao" checked={lampadaBanheiroFem==='lampada-banheiro-fem-na'} onChange={handleLampadaBanheiroFemChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Banheiro Masculino</legend>
                    <InputLine type="radio" name="lampadaBanheiroMasc" value="lampada-banheiro-masc-sim" id="lampada-banheiro-masc-sim" htmlfor="lampada-banheiro-masc-sim" checked={lampadaBanheiroMasc==='lampada-banheiro-masc-sim'} onChange={handleLampadaBanheiroMascChange}>Sim</InputLine>
                    <InputLine type="radio" name="lampadaBanheiroMasc" value="lampada-banheiro-masc-nao" id="lampada-banheiro-masc-nao" htmlfor="lampada-banheiro-masc-nao" checked={lampadaBanheiroMasc==='lampada-banheiro-masc-nao'} onChange={handleLampadaBanheiroMascChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Maçaneta de todas portas estão em boas condições?</legend>
                    <InputLine type="radio" name="macanetaBoa" value="macaneta-boa-sim" id="macaneta-boa-sim" htmlfor="macaneta-boa-sim" checked={macanetaBoa==='macaneta-boa-sim'} onChange={handleMacanetaBoaChange}>Sim</InputLine>
                    <InputLine type="radio" name="macanetaBoa" value="macaneta-boa-nao" id="macaneta-boa-nao" htmlfor="macaneta-boa-nao" checked={macanetaBoa==='macaneta-boa-nao'} onChange={handleMacanetaBoaChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Mesas do operacional estão com todas proteções no pé ?</legend>
                    <InputLine type="radio" name="mesaOpProtegida" value="mesa-op-protegida-sim" id="mesa-op-protegida-sim" htmlfor="mesa-op-protegida-sim" checked={mesaOpProtegida==='mesa-op-protegida-sim'} onChange={handleMesaOpProtegidaChange}>Sim</InputLine>
                    <InputLine type="radio" name="mesaOpProtegida" value="mesa-op-protegida-nao" id="mesa-op-protegida-nao" htmlfor="mesa-op-protegida-nao" checked={mesaOpProtegida==='mesa-op-protegida-nao'} onChange={handleMesaOpProtegidaChange}>Não</InputLine>
                </fieldset>
                <InputLine type="text" placeholder="" name="condicaoPratileira" id="condicao-pratileira" htmlfor="condicao-pratileira" required onChange={(e) => setCondicaoPratileira(e.target.value)}>Quais condições das três paleteiras e do carrinho hidráulico? </InputLine>
                <InputLine type="text" placeholder="" name="organizacaoSegura" id="organizacao-segura" htmlfor="organizacao-segura" required onChange={(e) => setOrganizacaoSegura(e.target.value)}>Referente a organização dos locais de trabalho estão corretas de modo a não oferecer riscos aos funcionários e aos produtos/serviços?</InputLine>
                <fieldset>
                    <legend className="text-black">Verificação das câmeras de segurança, as 11 estão fucionando corretamente e bem posicionadas ? (se não - informar imediatamente o gestor)</legend>
                    <InputLine type="radio" name="cameraFunciona" value="camera-funciona-sim" id="camera-Funciona-sim" htmlfor="camera-funciona-sim" checked={cameraFunciona==='camera-Funciona-sim'} onChange={handleCameraFuncionaChange}>Sim</InputLine>
                    <InputLine type="radio" name="cameraFunciona" value="camera-funciona-nao" id="camera-funciona-nao" htmlfor="camera-funciona-nao" checked={cameraFunciona==='camera-Funciona-nao'} onChange={handleCameraFuncionaChange}>Não</InputLine>
                </fieldset>
                <InputLine type="text" placeholder="" name="balancaPiso" id="balanca-piso" htmlfor="balanca-piso" required onChange={(e) => setBalancaPiso(e.target.value)}>Quais as condições da balança de piso?</InputLine>
                <InputLine type="date" placeholder="" name="dataBalanca" id="data-balanca" htmlfor="data-balanca" required onChange={(e) => setDataBalanca(e.target.value)}>Favor informar data da última aferição da balança</InputLine>
                <InputLine type="text" placeholder="" name="condicaoMicLav" id="condicao-mic-lav" htmlfor="condicao-mic-lav" required onChange={(e) => setCondicaoMicLav(e.target.value)}>Condições dos mictórios e lavatórios?</InputLine>
                <InputLine type="date" placeholder="" name="dataBebedouro" id="data-bebedouro" htmlfor="data-bebedouro" required onChange={(e) => setDataBebedouro(e.target.value)}>Bebedouro -Informar data da última limpeza e troca de filtro (validade de 6 em 6 meses)</InputLine>
                <InputLine type="date" placeholder="" name="dataProximaDetetizacao" id="data-proxima-detetizacao" htmlfor="data-proxima-detetizacao" required onChange={(e) => setDataProximaDetetizacao(e.target.value)}>Data da próxima dedetização</InputLine>
                <InputLine type="date" placeholder="" name="dataUltimoExtintor" id="data-ultimo-extintor" htmlfor="data-ultimo-extintor" required onChange={(e) => setDataUltimoExtintor(e.target.value)}>EXTINTORES - Informar data da última recarga dos extintores</InputLine>
                <InputLine type="date" placeholder="" name="dataProximoExtintor" id="data-proximo-extintor" htmlfor="data-proximo-extintor" required onChange={(e) => setDataProximoExtintor(e.target.value)}>Data da próxima recarga dos extintores</InputLine>
                <InputLine type="date" placeholder="" name="dataUltimaCaixaAgua" id="data-ultima-caixa-agua" htmlfor="data-ultima-caixa-agua" required onChange={(e) => setDataUltimaCaixaAgua(e.target.value)}>Caixa D'água- Informar data da última limpeza (validade de 6 em 6 meses)</InputLine>
                <InputLine type="date" placeholder="" name="dataProximaCaixaAgua" id="data-proxima-caixa-agua" htmlfor="data-proxima-caixa-agua" required onChange={(e) => setDataProximaCaixaAgua(e.target.value)}>Data da próxima limpeza</InputLine>
                <fieldset>
                    <legend className="text-black">Alguma cadeira está em má condição para uso?</legend>
                    <InputLine type="radio" name="cadeiraRuim" value="cadeira-ruim-sim" id="cadeira-ruim-sim" htmlfor="cadeira-ruim-sim" checked={cameraFunciona==='cadeira-ruim-sim'} onChange={(e)=>{handlechange(e); handleCadeiraRuimChange(e)}}>Sim</InputLine>
                    <InputLine type="radio" name="cadeiraRuim" value="cadeira-ruim-nao" id="cadeira-ruim-nao" htmlfor="cadeira-ruim-nao" checked={cameraFunciona==='cadeira-ruim-nao'} onChange={(e)=>{handlechange(e); handleCadeiraRuimChange(e)}}>Não</InputLine>
                </fieldset>
                {mostra && 
                    <InputLine type="string" placeholder="" name="setorCadeiraRuim" id="setor-cadeira-ruim" htmlfor="setor-cadeira-ruim" onChange={(e) => setSetorCadeiraRuim(e.target.value)}>Descreva de qual setor é a cadeira, e qual posição ela se encontra</InputLine>
                }
                <InputLine type="string" placeholder="" name="detalheAdd" id="detalhe-add" htmlfor="detalhe-add" onChange={(e) => setDetalheAdd(e.target.value)}>Algum detalhe adicional? descreva abaixo</InputLine>
                <BotaoSubmit loading={loading}/>
            </form>
        </section>
    )
}