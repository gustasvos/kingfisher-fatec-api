import { useState, ChangeEvent, FormEvent, ReactNode } from "react"
import instance from "../../../services/api";

// --- Início dos Componentes Simulados ---
// Recriei seus componentes aqui para que o código possa compilar,
// mas mantendo suas classes de estilo originais.

// Suas classes de estilo originais
const inputClasses = "w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
const labelClasses = "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"

// Simulação do InputLine
interface InputLineProps {
    type: string;
    id: string;
    htmlFor: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    children: ReactNode;
    name?: string;
    checked?: boolean;
    readOnly?: boolean;
    placeholder?: string;
}

const InputLine = ({
    type,
    id,
    htmlFor,
    value,
    onChange,
    required,
    children,
    name,
    checked,
    readOnly,
    placeholder,
}: InputLineProps) => {

    if (type === 'radio') {
        return (
            <div className="flex items-center gap-2">
                <input
                    type="radio"
                    id={id}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    required={required}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={htmlFor} className="text-sm font-medium text-gray-900">
                    {children}
                </label>
            </div>
        );
    }

    return (
        <div className="relative">
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                readOnly={readOnly}
                placeholder={placeholder || " "} // Placeholder " " é importante para o efeito da label flutuante
                className={inputClasses} // Usando sua classe original
            />
            <label htmlFor={htmlFor} className={labelClasses}> {/* Usando sua classe original */}
                {children}
            </label>
        </div>
    );
};

// Simulação do BotaoSubmit
interface BotaoSubmitProps {
    loading: boolean;
    label: string;
    type: "submit" | "button" | "reset";
    className?: string;
}

const BotaoSubmit = ({ loading, label, type, className }: BotaoSubmitProps) => {
    return (
        <button
            type={type}
            disabled={loading}
            className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''} inline-flex items-center justify-center`}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {label}
        </button>
    );
};

// Simulação do IMaskInput
interface IMaskInputProps {
    mask: string;
    placeholder: string;
    id: string;
    className: string;
    required?: boolean;
    value: string;
    onAccept: (value: string) => void;
}

const IMaskInput = ({ value, onAccept, ...props }: IMaskInputProps) => {
    return (
        <input
            {...props}
            type="text"
            value={value}
            onChange={(e) => onAccept(e.target.value)}
            placeholder={props.placeholder || " "}
        />
    );
};

// --- Fim dos Componentes Simulados ---


type FormAberturaProps = {
    form: string;
}

export default function CheckMoto({ form }: FormAberturaProps) {
    const [formTitle, setFormTitle] = useState(form)

    // Dados pessoais
    const [nome, setNome] = useState('')
    const [dataNascimento, setDataNasc] = useState('')
    const [cidadeNatal, setCidadeNatal] = useState('')
    const [nomePai, setNomePai] = useState('')
    const [nomeMae, setNomeMae] = useState('')
    const [pisPasep, setPisPasep] = useState('')
    const [genero, setGenero] = useState<string | null>(null) // Tipo adicionado

    // Informações de contato
    const [celular, setCelular] = useState('')
    const [email, setEmail] = useState('')

    //Pessoa Física/Jurídica e Documentos
    const [tipoPessoa, setTipoPessoa] = useState<string | null>(null) // Tipo adicionado
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
    const [seguro, setSeguro] = useState<string | null>(null) // Tipo adicionado

    //Dados do Frete
    const [possuiCurso, setPossuiCurso] = useState<string | null>(null) // Tipo adicionado
    const [valorSaida, setValorSaida] = useState('')
    const [valorKmRodado, setKmRodado] = useState('')

    // Tipos adicionados aos handlers
    const handleTipoPessoaChange = (event: ChangeEvent<HTMLInputElement>) => {
        const novoTipo = event.target.value
        setTipoPessoa(novoTipo)
        setDocumento('')
    }

    const handleCepChange = async (novoCep: string) => {
        setCep(novoCep)
        const cepLimpo = novoCep.replace(/\D/g, '')

        if (cepLimpo.length < 8) {
            setLogradouro(''); setBairro(''); setCidade(''); setUf('');
            return
        }

        if (cepLimpo.length === 8) {
            setLoading(true)
            try {
                // CORREÇÃO: Adicionado crases (`) em volta da URL
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

    const handleGeneroChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGenero(event.target.value)
    }

    const handleSeguroChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSeguro(event.target.value)
    }

    const handleBauChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBau(event.target.value)
    }

    const handlePossuiCursoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPossuiCurso(event.target.value)
    }

    // Suas classes originais (movidas para fora do componente para serem usadas pelos mocks)

    return (
        <div className="w-full flex justify-center mt-8 px-4">
            <div className="bg-white shadow-lg rounded-3xl w-full max-w-5xl h-[90vh] border border-gray-100 overflow-hidden">
                <div className="h-full overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-[#17607f] scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
                    <section>
                        <h1 style={{ color: "#44648d", fontSize: "1.7rem", fontWeight: 700, textAlign: "center" }}>
                            Checklist de Cadastro de Agregados - Moto
                        </h1>
                    </section>
                    <section>
                        {/* Adicionado onSubmit para o formulário */}
                        <form
                            onSubmit={async (e: FormEvent) => {
                                e.preventDefault();
                                setLoading(true);

                                try {
                                    const payload = {
                                        formTitle,
                                        genero: genero === 'masculino' ? 'Masculino' :
                                            genero === 'feminino' ? 'Feminino' :
                                                'Prefiro não informar',
                                        "nome-completo-motorista": nome,
                                        cnpj: tipoPessoa === 'pj' ? documento : "",
                                        cpf: tipoPessoa === 'pf' ? documento.replace(/\D/g, '') : "",
                                        "data-nascimento": new Date(dataNascimento).toISOString(),
                                        "cidade-nascimento": cidadeNatal,
                                        telefone: celular,
                                        email,
                                        rg,
                                        "data-emissao-rg": new Date(dataEmissao).toISOString(),
                                        "orgao-expedidor": orgaoExp,
                                        "nome-do-pai": nomePai,
                                        "nome-da-mae": nomeMae,
                                        "pis-pasep": pisPasep,
                                        cep,
                                        endereco: `${logradouro}, ${numero} - ${bairro}, ${cidade} - ${uf}`,
                                        "nome-proprietario-veiculo": nomeProprietarioVeiculo,
                                        placa,
                                        marca,
                                        modelo,
                                        cor,
                                        "ano-fabricacao": anoFabricacao,
                                        cilindrada,
                                        "possui-bau-suporte-carga": bau === 'sim' ? 'Sim' : 'Não',
                                        "possui-seguro": seguro === 'sim' ? 'Sim' : 'Não',
                                        "valor-minimo-por-saida": valorSaida,
                                        "valor-minimo-por-km": valorKmRodado,
                                        "possui-curso-moto-frete": possuiCurso === 'sim' ? 'Sim' : 'Não',
                                    };

                                    const response = await instance.post("/submit", payload);

                                    console.log("Enviado com sucesso:", response.data);
                                    alert("Formulário enviado com sucesso!");

                                    // Se quiser limpar o formulário:
                                    // window.location.reload();

                                } catch (error: any) {
                                    console.error("Erro ao enviar formulário:", error);
                                    alert("Erro ao enviar formulário. Verifique os dados e tente novamente.");
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        >

                            <h2 style={{ color: "#000000", fontSize: "1.3rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">
                                Sessão 1: Dados Pessoais
                            </h2>

                            <section id="sessao-1-dados-pessoais" className="flex flex-col gap-6">
                                <InputLine type="text" placeholder="" id='nome' htmlfor="nome" value={nome} onChange={(e) => setNome(e.target.value)} required>Nome Completo</InputLine>

                                <fieldset className="border border-gray-200 rounded-xl p-4 w-[300px]">
                                    <legend className="text-gray-700 mb-0 font-medium text-xs leading-none h-2 ">Pessoa Física ou Jurídica</legend>
                                    <div className="flex items-center space-x-3 mt-3">
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
                                                onAccept={(value: string) => setDocumento(value)} />
                                            <label htmlFor="cpf" className={labelClasses}>CPF</label>
                                        </div>
                                    )}

                                    {tipoPessoa === 'pj' && (
                                        <div className="relative mb-6">
                                            <IMaskInput
                                                mask={"00.000.000/0000-00"} placeholder="" id="cnpj"
                                                value={documento} onAccept={(value: string) => setDocumento(value)} required
                                                className={inputClasses}
                                            />
                                            <label htmlFor="cnpj" className={labelClasses}>CNPJ</label>
                                        </div>
                                    )}
                                </div>

                                <InputLine type="date" placeholder="" id='data-nascimento' htmlfor="data-nascimento" value={dataNascimento} onChange={(e) => setDataNasc(e.target.value)} required>Data de Nascimento</InputLine>
                                <InputLine type="text" placeholder="" id='cidade-natal' htmlfor="cidade-natal" value={cidadeNatal} onChange={(e) => setCidadeNatal(e.target.value)} required>Cidade natal</InputLine>

                                <div className="relative mb-6">
                                    <IMaskInput
                                        placeholder="" id="celular" className={inputClasses} required
                                        mask={"(00) 00000-0000"}
                                        value={celular}
                                        onAccept={(value: string) => setCelular(value)} />
                                    <label htmlFor="celular" className={labelClasses}>Celular</label>
                                </div>

                                <InputLine type="email" placeholder="" id='email' htmlfor="email" value={email} onChange={(e) => setEmail(e.target.value)} required>E-mail</InputLine>

                                <div className="relative mb-6">
                                    <IMaskInput
                                        mask={"00.000.000-0"} placeholder="" id="rg" className={inputClasses} required
                                        value={rg}
                                        onAccept={(value: string) => setRg(value)} />
                                    <label htmlFor="rg" className={labelClasses}>RG</label>
                                </div>

                                <InputLine type="date" placeholder="" id='data-emissao' htmlfor="data-emissao" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} required>Data de Emissão</InputLine>
                                <InputLine type="text" placeholder="" id='orgao-exp' htmlfor="orgao-exp" value={orgaoExp} onChange={(e) => setOrgaoExp(e.target.value)} required>Órgão Expeditor</InputLine>

                                <InputLine type="text" placeholder="" id='nome-pai' htmlfor="nome-pai" value={nomePai} onChange={(e) => setNomePai(e.target.value)} required>Nome do Pai</InputLine>
                                <InputLine type="text" placeholder="" id='nome-mae' htmlfor="nome-mae" value={nomeMae} onChange={(e) => setNomeMae(e.target.value)} required>Nome da Mãe</InputLine>
                                <InputLine type="text" placeholder="" id='pis-pasep' htmlfor="pis-pasep" value={pisPasep} onChange={(e) => setPisPasep(e.target.value)} required>PIS/PASEP</InputLine>


                                <h3 className="text-lg font-semibold text-gray-700 mt-8">Endereço</h3>
                                <div className="relative mb-6">
                                    <IMaskInput
                                        mask={"00000-000"} placeholder="" id="cep-input" className={inputClasses} required
                                        value={cep}
                                        onAccept={handleCepChange} />
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

                                <InputLine type="number" placeholder="" id='numero' htmlfor="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required>Número</InputLine>

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

                                <fieldset className="border border-gray-200 rounded-xl p-4 w-[400px]">
                                    <legend className="text-gray-700 mb-0 font-medium text-xs leading-none h-2 ">Gênero</legend>
                                    <div className="flex items-center space-x-3 mt-3">
                                        <InputLine type="radio" name="genero" id='masculino' htmlfor="masculino" required value="masculino"
                                            checked={genero === 'masculino'}
                                            onChange={handleGeneroChange}>
                                            Masculino
                                        </InputLine>
                                        <InputLine type="radio" name="genero" id='feminino' htmlfor="feminino" required value="feminino"
                                            checked={genero === 'feminino'}
                                            onChange={handleGeneroChange}>
                                            Feminino
                                        </InputLine>
                                        <InputLine type="radio" name="genero" id='pref-n-informar' htmlfor="pref-n-informar" required value="pref-n-informar"
                                            checked={genero === 'pref-n-informar'}
                                            onChange={handleGeneroChange}>
                                            Prefiro não informar
                                        </InputLine>
                                    </div>
                                </fieldset>
                            </section>
                            <section id="sessao-2-dados-moto" className="mt-8">
                                <h2 style={{ color: "#000000", fontSize: "1.3rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">
                                    Sessão 2: Dados do Veículo
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputLine type="text" placeholder="" id='nome-proprietario-veiculo' htmlfor="nome-proprietario-veiculo" value={nomeProprietarioVeiculo} required onChange={(e) => setNomeProprietarioVeiculo(e.target.value)}>Nome completo do Proprietário do Veículo</InputLine>
                                    <InputLine type="text" placeholder="" id='placa' htmlfor="placa" value={placa} required onChange={(e) => setPlaca(e.target.value)}>Placa</InputLine>
                                    <InputLine type="text" placeholder="" id='marca' htmlfor="marca" value={marca} required onChange={(e) => setMarca(e.target.value)}>Marca</InputLine>
                                    <InputLine type="text" placeholder="" id='modelo' htmlfor="modelo" value={modelo} required onChange={(e) => setModelo(e.target.value)}>Modelo</InputLine>
                                    <InputLine type="text" placeholder="" id='cor' htmlfor="cor" value={cor} required onChange={(e) => setCor(e.target.value)}>Cor</InputLine>
                                    <InputLine type="text" placeholder="" id='ano-fabricacao' htmlfor="ano-fabricacao" value={anoFabricacao} required onChange={(e) => setAnoFabricacao(e.target.value)}>Ano fabricação</InputLine>
                                    <InputLine type="text" placeholder="" id='cilindrada' htmlfor="cilindrada" value={cilindrada} required onChange={(e) => setCilindrada(e.target.value)}>Cilindrada</InputLine>
                                    <fieldset className="border border-gray-200 rounded-xl p-4">
                                        <legend className="text-gray-700 mb-0 font-medium text-xs leading-none h-2 ">Possui báu ou suporte para carga?</legend>
                                        <div className="flex items-center space-x-3 mt-3">
                                            <InputLine type="radio" name="bau" value="sim" id='bau-sim' htmlfor="bau-sim" required
                                                checked={bau === 'sim'}
                                                onChange={handleBauChange}>
                                                Sim
                                            </InputLine>
                                            <InputLine type="radio" name="bau" value="nao" id='bau-nao' htmlfor="bau-nao" required
                                                checked={bau === 'nao'}
                                                onChange={handleBauChange}>Não</InputLine>
                                        </div>
                                    </fieldset>
                                    <fieldset className="border border-gray-200 rounded-xl p-4">
                                        <legend className="text-gray-700 mb-0 font-medium text-xs leading-none h-2 ">Possui seguro?</legend>
                                        <div className="flex items-center space-x-3 mt-3">
                                            <InputLine type="radio" name="seguro" id='seguro-sim' htmlfor="seguro-sim" required value="sim"
                                                checked={seguro === 'sim'}
                                                onChange={handleSeguroChange}>
                                                Sim
                                            </InputLine>

                                            <InputLine type="radio" name="seguro" id='seguro-nao' htmlfor="seguro-nao" required value="nao"
                                                checked={seguro === 'nao'}
                                                onChange={handleSeguroChange}>
                                                Não
                                            </InputLine>
                                        </div>
                                    </fieldset>
                                </div>
                            </section>
                            <section id="sessao-3-dados-frete" className="grid grid-cols-1 gap-4">
                                <h2 style={{ color: "#000000", fontSize: "1.3rem", fontWeight: 700 }} className="mt-8 mb-4 border-b pb-2">
                                    Sessão 3: Dados do Frete</h2>
                                <InputLine type="text" placeholder="" id='valor-saida' htmlfor="valor-saida" value={valorSaida} required onChange={(e) => setValorSaida(e.target.value)}>Qual valor mínimo você cobraria por saída?</InputLine>
                                <InputLine type="text" placeholder="" id='valor-km-rodado' htmlfor="valor-km-rodado" value={valorKmRodado} required onChange={(e) => setKmRodado(e.target.value)}>Qual valor mínimo você cobraria por Km rodado?</InputLine>
                                <fieldset className="border border-gray-200 rounded-xl p-4 w-[300px]">
                                    <legend className="text-gray-700 mb-0 font-medium text-xs leading-none h-2 ">Possui curso moto frete?</legend>
                                    <div className="flex items-center space-x-3 mt-3">
                                        <InputLine type="radio" name="possui-curso" id='possui-curso-sim' htmlfor="possui-curso-sim" required value="sim"
                                            checked={possuiCurso === 'sim'}
                                            onChange={handlePossuiCursoChange}>
                                            Sim
                                        </InputLine>
                                        <InputLine type="radio" name="possui-curso" id='possui-curso-nao' htmlfor="possui-curso-nao" required value="nao"
                                            checked={possuiCurso === 'nao'}
                                            onChange={handlePossuiCursoChange}>
                                            Não
                                        </InputLine>
                                    </div>
                                </fieldset>
                            </section>
                            <div className="flex justify-center mt-8">
                                <BotaoSubmit loading={loading} label="Enviar" type="submit" className="bg-[#44648d] text-white rounded-md px-4 py-2 font-bold hover:bg-[#44648d] hover:opacity-100 hover:cursor-default" />
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    )
}