import IMaskInput from "react-imask/esm/input"
import InputLine from "../../../shared/components/inputLine"
import { useState } from "react"

export default function CheckMoto() {
    // Dados pessoais
    const [nome, setNome] = useState('')
    const [dataNascimento, setDataNasc] = useState('')
    const [cidadeNatal, setCidadeNatal] = useState('')
    const [nomePai, setNomePai] = useState('')
    const [nomeMae, setNomeMae] = useState('')
    const [pisPasep, setPisPasep] = useState('')
    const [genero, setGenero] = useState(null)

    // Informações de contato
    const [celular, setCelular] = useState('')
    const [email, setEmail] = useState('')

    //Pessoa Física/Jurídica e Documentos
    const [tipoPessoa, setTipoPessoa] = useState(null) 
    const [documento, setDocumento] = useState('')
    const [rg, setRg] = useState('')
    const [orgaoExp, setOrgaoExp] = useState('')
    const [dataEmissao, setDataEmissao] = useState('')

    //Endereço e CEP
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [loading, setLoading] = useState(false)
    const [numero, setNumero] = useState('') 

    //Dados do veículo
    const [nomeProprietarioVeiculo, setNomeProprietarioVeiculo] = useState('')
    const [placa, setPlaca] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [cor, setCor] = useState('')
    const [anoFabricacao, setAnoFabricacao] = useState('')
    const [cilindrada, setCilindrada] = useState('')
    const [bau, setBau] = useState('')
    const [seguro, setSeguro] = useState(null)
    
    const handleTipoPessoaChange = (event) => {
        const novoTipo = event.target.value
        setTipoPessoa(novoTipo)
        setDocumento('')
    }

    const handleCepChange = async (novoCep) => {
        setCep(novoCep)
        const cepLimpo = novoCep.replace(/\D/g, '')

        if (cepLimpo.length < 8) {
            setLogradouro(''); setBairro(''); setCidade(''); setUf('');
            return
        }

        if (cepLimpo.length === 8) {
            setLoading(true)
            try {
                
                const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
                const data = await response.json()
                
                if (data.erro) {
                    console.log("CEP não encontrado. Por favor, preencha o endereço manualmente.")
                    setLogradouro(''); setBairro(''); setCidade(''); setUf('');
                } else {
                    setLogradouro(data.logradouro)
                    setBairro(data.bairro)
                    setCidade(data.localidade)
                    setUf(data.uf)
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error)
                console.log("Ocorreu um erro na consulta do CEP. Tente novamente.")
            } finally {
                setLoading(false)
            }
        }
    }

    const handleGeneroChange = (event) => {
        setGenero(event.target.value)
    }

    const handleSeguroChange = (event) => {
        setSeguro(event.target.value)
    }

     const handleBauChange = (event) => {
        setBau(event.target.value)
    }

    // Classes comuns para IMaskInput e labels flutuantes
    const inputClasses = "w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    const labelClasses = "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
    
    return (
        <div>
            <section>
                <h1 style={{ color: "#000000ff", fontSize: "2.5rem", fontWeight: 700 }}>
                    Checklist de Cadastro de Agregados - Moto
                </h1>
            </section>
            
            <section>
                <form>
                    <h2 style={{ color: "#0044ffff", fontSize: "1.5rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">
                        Sessão 1: Dados Pessoais
                    </h2>
                    
                    <section id="sessao-1-dados-pessoais" className="space-y-6">
                        <InputLine type="text" placeholder="" id='nome' htmlfor="nome" value={nome} required>Nome Completo</InputLine>
                        
                        <fieldset>
                            <legend className="text-black mb-2">Pessoa Física ou Jurídica</legend>
                            <div className="flex space-x-4">
                                <InputLine 
                                    type="radio" name="pf-pj" value="pf" id='pf' htmlfor="pf" required 
                                    checked={tipoPessoa === 'pf'} 
                                    onChange={handleTipoPessoaChange}>
                                        Pessoa Física
                                </InputLine>
                                <InputLine 
                                    type="radio" name="pf-pj" value="pj" id='pj' htmlfor="pj" required 
                                    checked={tipoPessoa === 'pj'} 
                                    onChange={handleTipoPessoaChange}>
                                        Pessoa Jurídica
                                </InputLine>
                            </div>
                        </fieldset>
                        
                        <div className="relative"> 
                            {tipoPessoa === 'pf' && (
                                <div className="relative mb-6">
                                    <IMaskInput 
                                        mask={"000.000.000-00"} placeholder="" id="cpf" className={inputClasses} required
                                        value={documento} 
                                        onAccept={(value) => setDocumento(value)}/>
                                    <label htmlFor="cpf" className={labelClasses}>CPF</label> 
                                </div>
                            )}
                            
                            {tipoPessoa === 'pj' && (
                                <div className="relative mb-6">
                                    <IMaskInput 
                                        mask={"00.000.000/0000-00"} placeholder="" id="cnpj"
                                        value={documento} onAccept={(value) => setDocumento(value)} required 
                                        className={inputClasses}
                                    />
                                    <label htmlFor="cnpj" className={labelClasses}>CNPJ</label> 
                                </div>
                            )}
                        </div>
                        
                        <InputLine type="date" placeholder="" id='data-nascimento' htmlfor="data-nascimento"  value={dataNascimento} required>Data de Nascimento</InputLine>
                        <InputLine type="text" placeholder="" id='cidade-natal' htmlfor="cidade-natal" value={cidadeNatal} required>Cidade natal</InputLine>
                        
                        <div className="relative mb-6">
                            <IMaskInput 
                                placeholder="" id="celular" className={inputClasses} required 
                                mask={"(00) 00000-0000"} 
                                value={celular} 
                                onAccept={(value) => setCelular(value)}/>
                            <label htmlFor="celular" className={labelClasses}>Celular</label> 
                        </div>
                        
                        <InputLine type="email" placeholder="" id='email' htmlfor="email" value={email} required>E-mail</InputLine>
                        
                        <div className="relative mb-6">
                            <IMaskInput
                                mask={"00.000.000-0"} placeholder="" id="rg"  className={inputClasses} required
                                value={rg} 
                                onAccept={(value) => setRg(value)}/>
                            <label htmlFor="rg" className={labelClasses}>RG</label> 
                        </div>
                        
                        <InputLine type="date" placeholder="" id='data-emissao' htmlfor="data-emissao" value={dataEmissao} required>Data de Emissão</InputLine>
                        <InputLine type="text" placeholder="" id='orgao-exp' htmlfor="orgao-exp" value={orgaoExp} required>Órgão Expeditor</InputLine>

                        <InputLine type="text" placeholder="" id='nome-pai' htmlfor="nome-pai" value={nomePai} required>Nome do Pai</InputLine>
                        <InputLine type="text" placeholder="" id='nome-mae' htmlfor="nome-mae" value={nomeMae} required>Nome da Mãe</InputLine>
                        <InputLine type="text" placeholder="" id='pis-pasep' htmlfor="pis-pasep" value={pisPasep} required>PIS/PASEP</InputLine>

                        
                        
                        <h3 className="text-lg font-semibold text-gray-700 mt-8">Endereço</h3>
                        <div className="relative mb-6">
                            <IMaskInput
                                mask={"00000-000"} placeholder="" id="cep-input" className={inputClasses} required
                                value={cep} 
                                onAccept={handleCepChange}/>
                            <label htmlFor="cep-input" className={labelClasses}>CEP</label> 
                            {loading && <p className="text-blue-500 text-xs mt-1">Buscando...</p>}
                        </div>
                        
                        <InputLine 
                            type="text" placeholder="" id='logradouro' htmlfor="logradouro" required
                            value={logradouro} 
                            onChange={(e) => setLogradouro(e.target.value)} 
                            readOnly={!!logradouro}>
                                Logradouro
                        </InputLine>
                        
                        <InputLine type="number" placeholder="" id='numero' htmlfor="numero" value={numero} required>Número</InputLine>
                        
                        <InputLine 
                            type="text" placeholder="" id='bairro' htmlfor="bairro" required
                            value={bairro} 
                            onChange={(e) => setBairro(e.target.value)} 
                            readOnly={!!bairro}>
                                Bairro
                        </InputLine>
                        
                        <InputLine 
                            type="text" placeholder="" id='cidade' htmlfor="cidade" required
                            value={cidade} 
                            onChange={(e) => setCidade(e.target.value)} 
                            readOnly={!!cidade}>
                                Cidade
                        </InputLine>
                        
                        <InputLine 
                            type="text" placeholder="" id='uf' htmlfor="uf" required
                            value={uf} 
                            onChange={(e) => setUf(e.target.value)} 
                            readOnly={!!uf}>
                                UF
                        </InputLine>
                        
                        <fieldset className="">
                            <legend className="text-black">Gênero</legend>
                            <div className="flex space-x-4">
                                <InputLine type="radio" name="genero" id='masculino' htmlfor="masculino" required
                                    checked={genero==='masculino'}
                                    onChange={handleGeneroChange}>
                                        Masculino
                                </InputLine>
                                <InputLine type="radio" name="genero" id='feminino' htmlfor="feminino" required
                                    checked={genero==='feminino'}
                                    onChange={handleGeneroChange}>
                                        Feminino
                                </InputLine>
                                <InputLine type="radio" name="genero" id='pref-n-informar' htmlfor="pref-n-informar" required
                                    checked={genero==='pref-n-informar'}
                                    onChange={handleGeneroChange}>
                                        Prefiro não informar
                                </InputLine>
                            </div>
                        </fieldset>
                    </section>
                    <section id="sessao-2-dados-moto">
                            <h2 style={{ color: "#0044ffff", fontSize: "1.5rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">
                                Sessão 2: Dados do Veículo
                            </h2>
                        <InputLine type="text" placeholder="" id='nome-proprietario-veiculo' htmlfor="nome-proprietario-veiculo" value={nomeProprietarioVeiculo} required>Nome completo do Proprietário do Veículo</InputLine>
                        <InputLine type="text" placeholder="" id='placa' htmlfor="placa" value={placa} required>Placa</InputLine>
                        <InputLine type="text" placeholder="" id='marca' htmlfor="marca" value={marca} required>Marca</InputLine>
                        <InputLine type="text" placeholder="" id='modelo' htmlfor="modelo" value={modelo} required>Modelo</InputLine>
                        <InputLine type="text" placeholder="" id='cor' htmlfor="cor" value={cor} required>Cor</InputLine>
                        <InputLine type="text" placeholder="" id='ano-fabricacao' htmlfor="ano-fabricacao" value={anoFabricacao} required>Ano fabricação</InputLine>
                        <InputLine type="text" placeholder="" id='cilindrada' htmlfor="cilindrada" value={cilindrada} required>Cilindrada</InputLine>
                        <fieldset className="">
                            <legend className="text-black">Possui báu ou suporte para carga?</legend>
                            <div className="flex space-x-4">
                                <InputLine type="radio" name="bau" value="bau-sim" id='bau-sim' htmlfor="bau-sim" required
                                    checked={bau==='sim'}
                                    onChange={handleBauChange}>
                                        Sim
                                </InputLine>
                                <InputLine type="radio" name="bau" value="bau-nao" id='bau-nao' htmlfor="bau-nao" required
                                    checked={bau==='nao'}
                                    onChange={handleBauChange}>Não</InputLine>
                            </div>
                        </fieldset>
                        <fieldset className="">
                            <legend className="text-black">Possui seguro?</legend>
                            <div className="flex space-x-4">
                                <InputLine type="radio" name="seguro" value="seguro-sim" id='seguro-sim' htmlfor="seguro-sim"  required
                                    checked={seguro==='sim'}
                                    onChange={handleSeguroChange}>
                                        Sim
                                </InputLine>

                                <InputLine type="radio" name="seguro" value="seguro-nao" id='seguro-nao' htmlfor="seguro-nao" required
                                    checked={seguro==='nao'}
                                    onChange={handleSeguroChange}>
                                        Não
                                </InputLine>
                            </div>
                        </fieldset>
                    </section>
                </form>
            </section>
        </div>
    )
}
