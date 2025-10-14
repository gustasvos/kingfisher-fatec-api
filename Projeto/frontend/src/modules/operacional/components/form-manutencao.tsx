import { useState } from "react"
import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"

export default function FormManutencao() {
    const [mostra, setMostra] = useState(false)
    const [loading, setLoading] = useState(false);

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
                <InputLine type="date" placeholder="" id="data-verificacao" htmlfor="data-verificacao">Data da verificação</InputLine>
                <InputLine type="string" placeholder="" id="condicao-piso-escritorio" htmlfor="condicao-piso-escritorio">Quais as condições do piso do escritório(ADM/Diretoria/ Sala de reunião)</InputLine>
                <InputLine type="string" placeholder="" id="condicao-piso-operacional" htmlfor="condicao-piso-operacional">Quais as condições do piso da sala OPERACIONAL</InputLine>
                <InputLine type="string" placeholder="" id="condicao-piso-galpao" htmlfor="condicao-piso-galpao">Quais as condições do piso do GALPÃO</InputLine>
                <InputLine type="string" placeholder="" id="condicao-piso-refeitorio" htmlfor="condicao-piso-refeitorio">Quais as condições do piso do REFEITÓRIO</InputLine>
                <InputLine type="string" placeholder="" id="condicao-forro-escritorio" htmlfor="condicao-forro-escritorio">Quais as condições do forro/cobertura do escritório(ADM/Sala de reunião)</InputLine>
                <InputLine type="string" placeholder="" id="condicao-piso-operacional" htmlfor="condicao-piso-operacional">Quais as condições do forro/cobertura do OPERACIONAL ?</InputLine>
                <InputLine type="string" placeholder="" id="condicao-piso-galpao" htmlfor="condicao-piso-galpao">Quais as condições do forro/cobertura do GALPÃO?</InputLine>
                <InputLine type="string" placeholder="" id="condicao-piso-refeitorio" htmlfor="condicao-piso-refeitorio">Quais as condições do forro/cobertura do REFEITÓRIO ?</InputLine>
                <InputLine type="string" placeholder="" id="estado-geral-eletrica" htmlfor="estado-geral-eletrica">Qual estado geral das instalações elétricas?</InputLine>
                <InputLine type="string" placeholder="" id="protecao-raio" htmlfor="protecao-raio">Qual estado geral de proteções contra raios?</InputLine>
                <fieldset>
                    <legend className="text-black">Verificação de carga ar condicionado - Sala Administrativo</legend>
                    <InputLine type="radio" name="ar-adm" value="ar-adm-sim" id="ar-adm-sim" htmlfor="ar-adm-sim">Sim</InputLine>
                    <InputLine type="radio" name="ar-adm" value="ar-adm-nao" id="ar-adm-nao" htmlfor="ar-adm-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação de carga ar condicionado - Sala Diretoria</legend>
                    <InputLine type="radio" name="ar-diretoria" value="ar-diretoria-sim" id="ar-diretoria-sim" htmlfor="ar-diretoria-sim">Sim</InputLine>
                    <InputLine type="radio" name="ar-diretoria" value="ar-diretoria-nao" id="ar-diretoria-nao" htmlfor="ar-diretoria-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação de carga ar condicionado - Sala Reunião</legend>
                    <InputLine type="radio" name="ar-reuniao" value="ar-reuniao-sim" id="ar-reuniao-sim" htmlfor="ar-reuniao-sim">Sim</InputLine>
                    <InputLine type="radio" name="ar-reuniao" value="ar-reuniao-nao" id="ar-reuniao-nao" htmlfor="ar-reuniao-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação de carga ar condicionado - Sala Operacional</legend>
                    <InputLine type="radio" name="ar-operacional" value="ar-operacional-sim" id="ar-operacional-sim" htmlfor="ar-operacional-sim">Sim</InputLine>
                    <InputLine type="radio" name="ar-operacional" value="ar-operacional-nao" id="ar-operacional-nao" htmlfor="ar-operacional-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Sala Administrativo</legend>
                    <InputLine type="radio" name="lampada-adm" value="lampada-adm-sim" id="lampada-adm-sim" htmlfor="lampada-adm-sim" required>Sim</InputLine>
                    <InputLine type="radio" name="lampada-adm" value="lampada-adm-nao" id="lampada-adm-nao" htmlfor="lampada-adm-nao" required>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Sala Diretoria</legend>
                    <InputLine type="radio" name="lampada-diretoria" value="lampada-diretoria-sim" id="lampada-diretoria-sim" htmlfor="lampada-diretoria-sim">Sim</InputLine>
                    <InputLine type="radio" name="lampada-diretoria" value="lampada-diretoria-nao" id="lampada-diretoria-nao" htmlfor="lampada-diretoria-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Sala Reunião</legend>
                    <InputLine type="radio" name="lampada-reuniao" value="lampada-reuniao-sim" id="lampada-reuniao-sim" htmlfor="lampada-reuniao-sim">Sim</InputLine>
                    <InputLine type="radio" name="lampada-reuniao" value="lampada-reuniao-nao" id="lampada-reuniao-nao" htmlfor="lampada-reuniao-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Sala Operacional</legend>
                    <InputLine type="radio" name="lampada-operacional" value="lampada-operacional-sim" id="lampada-operacional-sim" htmlfor="lampada-operacional-sim">Sim</InputLine>
                    <InputLine type="radio" name="lampada-operacional" value="lampada-operacional-nao" id="lampada-operacional-nao" htmlfor="lampada-operacional-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Galpão</legend>
                    <InputLine type="radio" name="lampada-galpao" value="lampada-galpao-sim" id="lampada-galpao-sim" htmlfor="lampada-galpao-sim">Sim</InputLine>
                    <InputLine type="radio" name="lampada-galpao" value="lampada-galpao-nao" id="lampada-galpao-nao" htmlfor="lampada-galpao-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Refeitório</legend>
                    <InputLine type="radio" name="lampada-refeitorio" value="lampada-refeitorio-sim" id="lampada-refeitorio-sim" htmlfor="lampada-refeitorio-sim">Sim</InputLine>
                    <InputLine type="radio" name="lampada-refeitorio" value="lampada-refeitorio-nao" id="lampada-refeitorio-nao" htmlfor="lampada-refeitorio-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Banheiro Feminino</legend>
                    <InputLine type="radio" name="lampada-banheiro-fem" value="lampada-banheiro-fem-sim" id="lampada-banheiro-fem-sim" htmlfor="lampada-banheiro-fem-sim">Sim</InputLine>
                    <InputLine type="radio" name="lampada-banheiro-fem" value="lampada-banheiro-fem-nao" id="lampada-banheiro-fem-nao" htmlfor="lampada-banheiro-fem-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Verificação das lâmpadas - Banheiro Masculino</legend>
                    <InputLine type="radio" name="lampada-banheiro-masc" value="lampada-banheiro-masc-sim" id="lampada-banheiro-masc-sim" htmlfor="lampada-banheiro-masc-sim">Sim</InputLine>
                    <InputLine type="radio" name="lampada-banheiro-masc" value="lampada-banheiro-masc-nao" id="lampada-banheiro-masc-nao" htmlfor="lampada-banheiro-masc-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Maçaneta de todas portas estão em boas condições?</legend>
                    <InputLine type="radio" name="macaneta-boa" value="macaneta-boa-sim" id="macaneta-boa-sim" htmlfor="macaneta-boa-sim">Sim</InputLine>
                    <InputLine type="radio" name="macaneta-boa" value="macaneta-boa-nao" id="macaneta-boa-nao" htmlfor="macaneta-boa-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Mesas do operacional estão com todas proteções no pé ?</legend>
                    <InputLine type="radio" name="mesa-op-protegida" value="mesa-op-protegida-sim" id="mesa-op-protegida-sim" htmlfor="mesa-op-protegida-sim">Sim</InputLine>
                    <InputLine type="radio" name="mesa-op-protegida" value="mesa-op-protegida-nao" id="mesa-op-protegida-nao" htmlfor="mesa-op-protegida-nao">Não</InputLine>
                </fieldset>
                <InputLine type="text" placeholder="" name="condicao-pratileira" id="condicao-pratileira" htmlfor="condicao-pratileira" required>Quais condições das três paleteiras e do carrinho hidráulico? </InputLine>
                <InputLine type="text" placeholder="" name="organizacao-segura" id="organizacao-segura" htmlfor="organizacao-segura" required>Referente a organização dos locais de trabalho estão corretas de modo a não oferecer riscos aos funcionários e aos produtos/serviços?</InputLine>
                <fieldset>
                    <legend className="text-black">Verificação das câmeras de segurança, as 11 estão fucionando corretamente e bem posicionadas ? (se não - informar imediatamente o gestor)</legend>
                    <InputLine type="radio" name="camera-funciona" value="camera-funciona-sim" id="camera-funciona-sim" htmlfor="camera-funciona-sim">Sim</InputLine>
                    <InputLine type="radio" name="camera-funciona" value="camera-funciona-nao" id="camera-funciona-nao" htmlfor="camera-funciona-nao">Não</InputLine>
                </fieldset>
                <InputLine type="text" placeholder="" name="balanca-piso" id="balanca-piso" htmlfor="balanca-piso" required>Quais as condições da balança de piso?</InputLine>
                <InputLine type="date" placeholder="" name="data-balanca" id="data-balanca" htmlfor="data-balanca" required>Favor informar data da última aferição da balança</InputLine>
                <InputLine type="text" placeholder="" name="condicao-mic-lav" id="condicao-mic-lav" htmlfor="condicao-mic-lav" required>Condições dos mictórios e lavatórios?</InputLine>
                <InputLine type="date" placeholder="" name="data-bebedouro" id="data-bebedouro" htmlfor="data-bebedouro" required>Bebedouro -Informar data da última limpeza e troca de filtro (validade de 6 em 6 meses)</InputLine>
                <InputLine type="date" placeholder="" name="data-proxima-detetizacao" id="data-proxima-detetizacao" htmlfor="data-proxima-detetizacao" required>Data da próxima dedetização</InputLine>
                <InputLine type="date" placeholder="" name="data-ultimo-extintor" id="data-ultimo-extintor" htmlfor="data-ultimo-extintor" required>EXTINTORES - Informar data da última recarga dos extintores</InputLine>
                <InputLine type="date" placeholder="" name="data-proximo-extintor" id="data-proximo-extintor" htmlfor="data-proximo-extintor" required>Data da próxima recarga dos extintores</InputLine>
                <InputLine type="date" placeholder="" name="data-ultima-caixa-agua" id="data-ultima-caixa-agua" htmlfor="data-ultima-caixa-agua" required>Caixa D'água- Informar data da última limpeza (validade de 6 em 6 meses)</InputLine>
                <InputLine type="date" placeholder="" name="data-proxima-caixa-agua" id="data-proxima-caixa-agua" htmlfor="data-proxima-caixa-agua" required>Data da próxima limpeza</InputLine>
                <fieldset>
                    <legend className="text-black">Alguma cadeira está em má condição para uso?</legend>
                    <InputLine type="radio" name="cadeira-ruim" value="cadeira-ruim-sim" id="cadeira-ruim-sim" htmlfor="cadeira-ruim-sim" onchange={handlechange}>Sim</InputLine>
                    <InputLine type="radio" name="cadeira-ruim" value="cadeira-ruim-nao" id="cadeira-ruim-nao" htmlfor="cadeira-ruim-nao" onchange={handlechange}>Não</InputLine>
                </fieldset>
                {mostra && 
                    <InputLine type="string" placeholder="" name="setor-cadeira-ruim" id="setor-cadeira-ruim" htmlfor="setor-cadeira-ruim">Descreva de qual setor é a cadeira, e qual posição ela se encontra</InputLine>
                }
                <InputLine type="string" placeholder="" name="detalhe-add" id="detalhe-add" htmlfor="detalhe-add">Algum detalhe adicional? descreva abaixo</InputLine>
                <BotaoSubmit loading={loading}/>
            </form>
        </section>
    )
}