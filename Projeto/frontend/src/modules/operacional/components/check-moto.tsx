import { useState, FormEvent, ChangeEvent } from "react";
import IMaskInput from "react-imask/esm/input";
import InputLine from "../../../shared/components/inputLine";
import BotaoSubmit from "../../../shared/components/botao-submit";

type FormAberturaProps = {
    form: string;
}

export default function CheckMoto({ form }: FormAberturaProps) {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [nomeMotorista, setNomeMotorista] = useState("");
    const [genero, setGenero] = useState<string | null>(null);
    const [cnpj, setCnpj] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cidadeNascimento, setCidadeNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [rg, setRg] = useState("");
    const [dataEmissaoRg, setDataEmissaoRg] = useState("");
    const [orgaoExpedidor, setOrgaoExpedidor] = useState("");
    const [nomePai, setNomePai] = useState("");
    const [nomeMae, setNomeMae] = useState("");
    const [pisPasep, setPisPasep] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [nomeProprietarioVeiculo, setNomeProprietarioVeiculo] = useState("");
    const [placa, setPlaca] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [cor, setCor] = useState("");
    const [anoFabricacao, setAnoFabricacao] = useState("");
    const [cilindrada, setCilindrada] = useState("");
    const [possuiBau, setPossuiBau] = useState<string | null>(null);
    const [possuiSeguro, setPossuiSeguro] = useState<string | null>(null);
    const [valorMinimoSaida, setValorMinimoSaida] = useState("");
    const [valorMinimoKm, setValorMinimoKm] = useState("");
    const [possuiCurso, setPossuiCurso] = useState<string | null>(null);

    const [tipoPessoa, setTipoPessoa] = useState<string | null>(null);
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [numero, setNumero] = useState("");
    const [cepLoading, setCepLoading] = useState(false);

    const handleTipoPessoaChange = (event: ChangeEvent<HTMLInputElement>) => {
        const novoTipo = event.target.value;
        setTipoPessoa(novoTipo);
        setCpf("");
        setCnpj("");
    };

    const handleCepChange = async (novoCep: string) => {
        setCep(novoCep);
        const cepLimpo = novoCep.replace(/\D/g, '');

        if (cepLimpo.length < 8) {
            setLogradouro(""); setBairro(""); setCidade(""); setUf("");
            return;
        }

        if (cepLimpo.length === 8) {
            setCepLoading(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                const data = await response.json();
                
                if (data.erro) {
                    setLogradouro(""); setBairro(""); setCidade(""); setUf("");
                } else {
                    setLogradouro(data.logradouro);
                    setBairro(data.bairro);
                    setCidade(data.localidade);
                    setUf(data.uf);
                    setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade}-${data.uf}`);
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
            } finally {
                setCepLoading(false);
            }
        }
    };

    const enviaForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('formTitle', form);

            const converterParaSimNao = (valor: string | null) => {
                if (valor === null) return '';
                return valor === 'sim' ? 'SIM' : 'NÃO';
            };

            if (nomeMotorista) formData.append('nome-completo-motorista', nomeMotorista);
            if (genero) formData.append('genero', genero);
            if (cnpj) formData.append('cnpj', cnpj);
            if (cpf) formData.append('cpf', cpf);
            if (dataNascimento) formData.append('data-nascimento', dataNascimento);
            if (cidadeNascimento) formData.append('cidade-nascimento', cidadeNascimento);
            if (telefone) formData.append('telefone', telefone);
            if (email) formData.append('email', email);
            if (rg) formData.append('rg', rg);
            if (dataEmissaoRg) formData.append('data-emissao-rg', dataEmissaoRg);
            if (orgaoExpedidor) formData.append('orgao-expedidor', orgaoExpedidor);
            if (nomePai) formData.append('nome-do-pai', nomePai);
            if (nomeMae) formData.append('nome-da-mae', nomeMae);
            if (pisPasep) formData.append('pis-pasep', pisPasep);
            if (cep) formData.append('cep', cep);
            if (endereco) formData.append('endereco', endereco);
            if (nomeProprietarioVeiculo) formData.append('nome-proprietario-veiculo', nomeProprietarioVeiculo);
            if (placa) formData.append('placa', placa);
            if (marca) formData.append('marca', marca);
            if (modelo) formData.append('modelo', modelo);
            if (cor) formData.append('cor', cor);
            if (anoFabricacao) formData.append('ano-fabricacao', anoFabricacao);
            if (cilindrada) formData.append('cilindrada', cilindrada);
            if (possuiBau) formData.append('possui-bau-suporte-carga', converterParaSimNao(possuiBau));
            if (possuiSeguro) formData.append('possui-seguro', converterParaSimNao(possuiSeguro));
            if (valorMinimoSaida) formData.append('valor-minimo-por-saida', valorMinimoSaida);
            if (valorMinimoKm) formData.append('valor-minimo-por-km', valorMinimoKm);
            if (possuiCurso) formData.append('possui-curso-moto-frete', converterParaSimNao(possuiCurso));

            console.log('Enviando FormData para /submit');

            const response = await fetch('http://localhost:8080/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const resultado = await response.json();
                console.log('Sucesso! Backend respondeu:', resultado);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                const erroDetalhado = await response.text();
                console.log('Erro do backend:', response.status, erroDetalhado);
                alert(`Erro ${response.status}: ${erroDetalhado}`);
            }
        } catch (error) {
            console.log('Erro de rede:', error);
            alert("Erro de conexão com o backend");
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer";
    const labelClasses = "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto";

    return (
        <div className="w-full flex justify-center mt-8 px-4">
            <div className="bg-white shadow-lg rounded-3xl w-full max-w-5xl h-[90vh] border border-gray-100 overflow-hidden">
                <div className="h-full overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-[#17607f] scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
                    
                    <h1 className="text-3xl font-semibold text-[#17607f] mb-8 text-center tracking-tight">
                        {form}
                    </h1>

                    <form onSubmit={enviaForm} className="space-y-8">
                        
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                                Sessão 1: Dados Pessoais
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputLine 
                                    type="text" 
                                    id="nome-completo-motorista" 
                                    htmlFor="nome-completo-motorista" 
                                    value={nomeMotorista}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNomeMotorista(e.target.value)}
                                    required
                                >
                                    Nome Completo do Motorista
                                </InputLine>

                                <fieldset className="border border-gray-200 rounded-xl p-4 hover:border-[#17607f] transition-colors duration-200">
                                    <legend className="text-gray-700 font-medium">Gênero</legend>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <InputLine 
                                            type="radio" 
                                            name="genero" 
                                            value="masculino" 
                                            id="genero-masculino" 
                                            htmlFor="genero-masculino" 
                                            checked={genero === 'masculino'} 
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGenero(e.target.value)}
                                        >
                                            Masculino
                                        </InputLine>
                                        <InputLine 
                                            type="radio" 
                                            name="genero" 
                                            value="feminino" 
                                            id="genero-feminino" 
                                            htmlFor="genero-feminino" 
                                            checked={genero === 'feminino'} 
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGenero(e.target.value)}
                                        >
                                            Feminino
                                        </InputLine>
                                        <InputLine 
                                            type="radio" 
                                            name="genero" 
                                            value="prefiro-nao-informar" 
                                            id="genero-prefiro-nao-informar" 
                                            htmlFor="genero-prefiro-nao-informar" 
                                            checked={genero === 'prefiro-nao-informar'} 
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGenero(e.target.value)}
                                        >
                                            Prefiro não informar
                                        </InputLine>
                                    </div>
                                </fieldset>

                                <fieldset className="border border-gray-200 rounded-xl p-4 hover:border-[#17607f] transition-colors duration-200">
                                    <legend className="text-gray-700 font-medium">Pessoa Física ou Jurídica</legend>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <InputLine 
                                            type="radio" 
                                            name="tipo-pessoa" 
                                            value="pf" 
                                            id="tipo-pessoa-pf" 
                                            htmlFor="tipo-pessoa-pf" 
                                            checked={tipoPessoa === 'pf'} 
                                            onChange={handleTipoPessoaChange}
                                        >
                                            Pessoa Física
                                        </InputLine>
                                        <InputLine 
                                            type="radio" 
                                            name="tipo-pessoa" 
                                            value="pj" 
                                            id="tipo-pessoa-pj" 
                                            htmlFor="tipo-pessoa-pj" 
                                            checked={tipoPessoa === 'pj'} 
                                            onChange={handleTipoPessoaChange}
                                        >
                                            Pessoa Jurídica
                                        </InputLine>
                                    </div>
                                </fieldset>

                                {tipoPessoa === 'pf' && (
                                    <div className="relative">
                                        <IMaskInput 
                                            mask={"000.000.000-00"} 
                                            placeholder="" 
                                            id="cpf" 
                                            className={inputClasses} 
                                            required
                                            value={cpf} 
                                            onAccept={(value: string) => setCpf(value)}
                                        />
                                        <label htmlFor="cpf" className={labelClasses}>CPF</label>
                                    </div>
                                )}

                                {tipoPessoa === 'pj' && (
                                    <div className="relative">
                                        <IMaskInput 
                                            mask={"00.000.000/0000-00"} 
                                            placeholder="" 
                                            id="cnpj"
                                            value={cnpj} 
                                            onAccept={(value: string) => setCnpj(value)} 
                                            required 
                                            className={inputClasses}
                                        />
                                        <label htmlFor="cnpj" className={labelClasses}>CNPJ</label>
                                    </div>
                                )}

                                <InputLine 
                                    type="date" 
                                    id="data-nascimento" 
                                    htmlFor="data-nascimento" 
                                    value={dataNascimento}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataNascimento(e.target.value)}
                                    required
                                >
                                    Data de Nascimento
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="cidade-nascimento" 
                                    htmlFor="cidade-nascimento" 
                                    value={cidadeNascimento}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCidadeNascimento(e.target.value)}
                                    required
                                >
                                    Cidade de Nascimento
                                </InputLine>

                                <div className="relative">
                                    <IMaskInput 
                                        placeholder="" 
                                        id="telefone" 
                                        className={inputClasses} 
                                        required 
                                        mask={"(00) 00000-0000"} 
                                        value={telefone} 
                                        onAccept={(value: string) => setTelefone(value)}
                                    />
                                    <label htmlFor="telefone" className={labelClasses}>Telefone</label>
                                </div>

                                <InputLine 
                                    type="email" 
                                    id="email" 
                                    htmlFor="email" 
                                    value={email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    required
                                >
                                    E-mail
                                </InputLine>

                                <div className="relative">
                                    <IMaskInput
                                        mask={"00.000.000-0"} 
                                        placeholder="" 
                                        id="rg" 
                                        className={inputClasses} 
                                        required
                                        value={rg} 
                                        onAccept={(value: string) => setRg(value)}
                                    />
                                    <label htmlFor="rg" className={labelClasses}>RG</label>
                                </div>

                                <InputLine 
                                    type="date" 
                                    id="data-emissao-rg" 
                                    htmlFor="data-emissao-rg" 
                                    value={dataEmissaoRg}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataEmissaoRg(e.target.value)}
                                    required
                                >
                                    Data de Emissão do RG
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="orgao-expedidor" 
                                    htmlFor="orgao-expedidor" 
                                    value={orgaoExpedidor}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setOrgaoExpedidor(e.target.value)}
                                    required
                                >
                                    Órgão Expedidor
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="nome-do-pai" 
                                    htmlFor="nome-do-pai" 
                                    value={nomePai}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNomePai(e.target.value)}
                                    required
                                >
                                    Nome do Pai
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="nome-da-mae" 
                                    htmlFor="nome-da-mae" 
                                    value={nomeMae}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNomeMae(e.target.value)}
                                    required
                                >
                                    Nome da Mãe
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="pis-pasep" 
                                    htmlFor="pis-pasep" 
                                    value={pisPasep}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPisPasep(e.target.value)}
                                    required
                                >
                                    PIS/PASEP
                                </InputLine>

                                <div className="relative">
                                    <IMaskInput
                                        mask={"00000-000"} 
                                        placeholder="" 
                                        id="cep" 
                                        className={inputClasses} 
                                        required
                                        value={cep} 
                                        onAccept={handleCepChange}
                                    />
                                    <label htmlFor="cep" className={labelClasses}>CEP</label>
                                    {cepLoading && <p className="text-blue-500 text-xs mt-1">Buscando...</p>}
                                </div>

                                <InputLine 
                                    type="text" 
                                    id="endereco" 
                                    htmlFor="endereco" 
                                    value={endereco}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEndereco(e.target.value)}
                                    required
                                >
                                    Endereço Completo
                                </InputLine>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                                Sessão 2: Dados do Veículo
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputLine 
                                    type="text" 
                                    id="nome-proprietario-veiculo" 
                                    htmlFor="nome-proprietario-veiculo" 
                                    value={nomeProprietarioVeiculo}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNomeProprietarioVeiculo(e.target.value)}
                                    required
                                >
                                    Nome do Proprietário do Veículo
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="placa" 
                                    htmlFor="placa" 
                                    value={placa}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPlaca(e.target.value)}
                                    required
                                >
                                    Placa
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="marca" 
                                    htmlFor="marca" 
                                    value={marca}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMarca(e.target.value)}
                                    required
                                >
                                    Marca
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="modelo" 
                                    htmlFor="modelo" 
                                    value={modelo}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setModelo(e.target.value)}
                                    required
                                >
                                    Modelo
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="cor" 
                                    htmlFor="cor" 
                                    value={cor}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCor(e.target.value)}
                                    required
                                >
                                    Cor
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="ano-fabricacao" 
                                    htmlFor="ano-fabricacao" 
                                    value={anoFabricacao}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAnoFabricacao(e.target.value)}
                                    required
                                >
                                    Ano de Fabricação
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="cilindrada" 
                                    htmlFor="cilindrada" 
                                    value={cilindrada}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCilindrada(e.target.value)}
                                    required
                                >
                                    Cilindrada
                                </InputLine>

                                <fieldset className="border border-gray-200 rounded-xl p-4 hover:border-[#17607f] transition-colors duration-200">
                                    <legend className="text-gray-700 font-medium">Possui baú ou suporte para carga?</legend>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <InputLine 
                                            type="radio" 
                                            name="possui-bau" 
                                            value="sim" 
                                            id="possui-bau-sim" 
                                            htmlFor="possui-bau-sim" 
                                            checked={possuiBau === 'sim'} 
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPossuiBau(e.target.value)}
                                        >
                                            Sim
                                        </InputLine>
                                        <InputLine 
                                            type="radio" 
                                            name="possui-bau" 
                                            value="nao" 
                                            id="possui-bau-nao" 
                                            htmlFor="possui-bau-nao" 
                                            checked={possuiBau === 'nao'} 
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPossuiBau(e.target.value)}
                                        >
                                            Não
                                        </InputLine>
                                    </div>
                                </fieldset>

                                <fieldset className="border border-gray-200 rounded-xl p-4 hover:border-[#17607f] transition-colors duration-200">
                                    <legend className="text-gray-700 font-medium">Possui seguro?</legend>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <InputLine 
                                            type="radio" 
                                            name="possui-seguro" 
                                            value="sim" 
                                            id="possui-seguro-sim" 
                                            htmlFor="possui-seguro-sim" 
                                            checked={possuiSeguro === 'sim'} 
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPossuiSeguro(e.target.value)}
                                        >
                                            Sim
                                        </InputLine>
                                        <InputLine 
                                            type="radio" 
                                            name="possui-seguro" 
                                            value="nao" 
                                            id="possui-seguro-nao" 
                                            htmlFor="possui-seguro-nao" 
                                            checked={possuiSeguro === 'nao'} 
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPossuiSeguro(e.target.value)}
                                        >
                                            Não
                                        </InputLine>
                                    </div>
                                </fieldset>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                                Sessão 3: Dados do Frete
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputLine 
                                    type="text" 
                                    id="valor-minimo-por-saida" 
                                    htmlFor="valor-minimo-por-saida" 
                                    value={valorMinimoSaida}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValorMinimoSaida(e.target.value)}
                                    required
                                >
                                    Valor Mínimo por Saída
                                </InputLine>

                                <InputLine 
                                    type="text" 
                                    id="valor-minimo-por-km" 
                                    htmlFor="valor-minimo-por-km" 
                                    value={valorMinimoKm}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValorMinimoKm(e.target.value)}
                                    required
                                >
                                    Valor Mínimo por Km Rodado
                                </InputLine>

                                <fieldset className="border border-gray-200 rounded-xl p-4 hover:border-[#17607f] transition-colors duration-200">
                                    <legend className="text-gray-700 font-medium">Possui curso de moto frete?</legend>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <InputLine 
                                            type="radio" 
                                            name="possui-curso" 
                                            value="sim" 
                                            id="possui-curso-sim" 
                                            htmlFor="possui-curso-sim" 
                                            checked={possuiCurso === 'sim'} 
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPossuiCurso(e.target.value)}
                                        >
                                            Sim
                                        </InputLine>
                                        <InputLine 
                                            type="radio" 
                                            name="possui-curso" 
                                            value="nao" 
                                            id="possui-curso-nao" 
                                            htmlFor="possui-curso-nao" 
                                            checked={possuiCurso === 'nao'} 
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPossuiCurso(e.target.value)}
                                        >
                                            Não
                                        </InputLine>
                                    </div>
                                </fieldset>
                            </div>
                        </section>

                        <div className="pt-6 flex justify-center">
                            <BotaoSubmit
                                loading={loading}
                                label={loading ? "Enviando..." : "Enviar"}
                                type="submit"
                                className="bg-[#17607f] hover:bg-[#14536f] text-white font-semibold rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {showSuccess && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 animate-fade-in-out">
                    Formulário enviado com sucesso!
                </div>
            )}
        </div>
    );
}