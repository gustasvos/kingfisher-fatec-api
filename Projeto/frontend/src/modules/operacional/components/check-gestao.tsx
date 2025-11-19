import { useState } from "react"
import { IMaskInput } from "react-imask"
import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"

type FormAberturaProps = {
    form: string;
}

export default function CheckGestao({ form }: FormAberturaProps) {
    const [formTitle, setFormTitle] = useState(form)
    const [email, setEmail] = useState('')
    const [cliente, setCliente] = useState('')
    const [quemSolicita, setQuemSolicita] = useState('')
    const [nf, setNf] = useState('')
    const [dataHoraColeta, setDataHoraColeta] = useState('')
    const [dataHoraEntrega, setDataHoraEntrega] = useState('')
    const [peso, setPeso] = useState('')
    const [tipoVeiculo, setTipoVeiculo] = useState('')
    const [valorFrete, setValorFrete] = useState('')
    const [obs, setObs] = useState('')
    const [loading, setLoading] = useState(false)

    const enviaForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            alert("Formulário enviado!");
            setLoading(false);
        }, 2000);
    }

    // Coleta
    const [cepColeta, setCepColeta] = useState('')
    const [logradouroColeta, setLogradouroColeta] = useState('')
    const [bairroColeta, setBairroColeta] = useState('')
    const [cidadeColeta, setCidadeColeta] = useState('')
    const [ufColeta, setUfColeta] = useState('')
    const [numeroColeta, setNumeroColeta] = useState('')

    // Entrega
    const [cepEntrega, setCepEntrega] = useState('')
    const [logradouroEntrega, setLogradouroEntrega] = useState('')
    const [bairroEntrega, setBairroEntrega] = useState('')
    const [cidadeEntrega, setCidadeEntrega] = useState('')
    const [ufEntrega, setUfEntrega] = useState('')
    const [numeroEntrega, setNumeroEntrega] = useState('')

    const handleCepColetaChange = async (novoCep) => {
        setCepColeta(novoCep)
        const cepLimpo = novoCep.replace(/\D/g, '')

        if (cepLimpo.length < 8) {
            setLogradouroColeta('')
            setBairroColeta('')
            setCidadeColeta('')
            setUfColeta('')
            return
        }

        if (cepLimpo.length === 8) {
            setLoading(true)
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
                const data = await response.json()

                if (data.erro) {
                    setLogradouroColeta('')
                    setBairroColeta('')
                    setCidadeColeta('')
                    setUfColeta('')
                } else {
                    setLogradouroColeta(data.logradouro)
                    setBairroColeta(data.bairro)
                    setCidadeColeta(data.localidade)
                    setUfColeta(data.uf)
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error)
            } finally {
                setLoading(false)
            }
        }
    }

    const handleCepEntregaChange = async (novoCep) => {
        setCepEntrega(novoCep)
        const cepLimpo = novoCep.replace(/\D/g, '')

        if (cepLimpo.length < 8) {
            setLogradouroEntrega('')
            setBairroEntrega('')
            setCidadeEntrega('')
            setUfEntrega('')
            return
        }

        if (cepLimpo.length === 8) {
            setLoading(true)
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
                const data = await response.json()

                if (data.erro) {
                    setLogradouroEntrega('')
                    setBairroEntrega('')
                    setCidadeEntrega('')
                    setUfEntrega('')
                } else {
                    setLogradouroEntrega(data.logradouro)
                    setBairroEntrega(data.bairro)
                    setCidadeEntrega(data.localidade)
                    setUfEntrega(data.uf)
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error)
            } finally {
                setLoading(false)
            }
        }
    }

    // Classes comuns para IMaskInput e labels flutuantes
    const inputClasses = "w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    const labelClasses = "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"

    return (
        <div className="flex justify-center mt-8 px-4">
            <div className="bg-white shadow-lg rounded-3xl w-full max-w-5xl h-[90vh] border border-gray-100 overflow-hidden">
                <div className="h-full overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-[#17607f] scrollbar-track-gray-100 scrollbar-thumb-rounded-full">

                    <section>
                        <h1 className="text-center font-bold text-[1.7rem] text-[#44648d]">Checklist de Gestão de Coleta</h1>
                    </section>

                    <section>
                        <form onSubmit={enviaForm} action="" className="space-y-8 mt-6">
                            <section className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <InputLine type="email" placeholder="" id='email' htmlfor="email" value={email} onChange={(e) => setEmail(e.target.value)} required>E-mail</InputLine>
                                    <InputLine type="text" placeholder="" id='cliente' htmlfor="cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} required>Qual o cliente?</InputLine>
                                    <InputLine type="text" placeholder="" id='quem-solicita' htmlfor="quem-solicita" value={quemSolicita} onChange={(e) => setQuemSolicita(e.target.value)} required>Quem solicita?</InputLine>
                                    <InputLine type="text" placeholder="" id='nf' htmlfor="nf" value={nf} onChange={(e) => setNf(e.target.value)} required>OC / Pedido / NF Coleta</InputLine>
                                    <InputLine type="number" placeholder="" id='peso' htmlfor="peso" value={peso} onChange={(e) => setPeso(e.target.value)} required>Peso estimado</InputLine>
                                    <InputLine type="text" placeholder="" id='tipo-veiculo' htmlfor="tipo-veiculo" value={tipoVeiculo} onChange={(e) => setTipoVeiculo(e.target.value)} required>Tipo do Veículo</InputLine>

                                    <div className="relative mb-6">
                                        <IMaskInput
                                            id="valor-frete"
                                            className={inputClasses}
                                            placeholder=""
                                            required
                                            value={valorFrete}
                                            onAccept={(value) => setValorFrete(value)}
                                            mask={Number}
                                            scale={2}
                                            thousandsSeparator="."
                                            radix=","
                                            mapToRadix={["."]}
                                            padFractionalZeros={true}
                                            normalizeZeros={true}
                                        />
                                        <label htmlFor="valor-frete" className={labelClasses}>Valor do frete a ser cobrado</label>
                                    </div>
                                    <InputLine type="text" placeholder="" id='obs' htmlfor="obs" value={obs} onChange={(e) => setObs(e.target.value)}>Observações adicionais para a equipe</InputLine>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    {/* Dados de Coleta */}
                                    <section className="text-black border border-gray-200 rounded-xl p-4 gap-2">
                                        <h2 className="mb-5 font-bold text-[1.1rem] text-black">Dados de Coleta</h2>

                                        <InputLine type="datetime-local" id='data-hora-coleta' htmlfor="data-hora-coleta" required
                                            value={dataHoraColeta}
                                            onChange={(e) => setDataHoraColeta(e.target.value)}>
                                            Data e hora da coleta
                                        </InputLine>
                                        <div className="relative mb-6">
                                            <IMaskInput
                                                mask={"00000-000"} id="cep-input-coleta"
                                                placeholder=""
                                                className={inputClasses} required
                                                value={cepColeta}
                                                onAccept={handleCepColetaChange} />
                                            <label htmlFor="cep-input-coleta" className={labelClasses}>CEP - Coleta</label>
                                        </div>

                                        <InputLine type="text" placeholder="" id='logradouro-coleta' htmlfor="logradouro-coleta"
                                            value={logradouroColeta}
                                            onChange={(e) => setLogradouroColeta(e.target.value)}
                                            readOnly={!!logradouroColeta}>
                                            Logradouro
                                        </InputLine>
                                        <InputLine type="number" placeholder="" id='numero-coleta' htmlfor="numero-coleta"
                                            value={numeroColeta}
                                            onChange={(e) => setNumeroColeta(e.target.value)}>
                                            Número
                                        </InputLine>
                                        <InputLine type="text" placeholder="" id='bairro-coleta' htmlfor="bairro-coleta"
                                            value={bairroColeta}
                                            onChange={(e) => setBairroColeta(e.target.value)}
                                            readOnly={!!bairroColeta}>
                                            Bairro
                                        </InputLine>
                                        <InputLine type="text" placeholder="" id='cidade-coleta' htmlfor="cidade-coleta"
                                            value={cidadeColeta}
                                            onChange={(e) => setCidadeColeta(e.target.value)}
                                            readOnly={!!cidadeColeta}>
                                            Cidade
                                        </InputLine>
                                        <InputLine type="text" placeholder="" id='uf-coleta' htmlfor="uf-coleta"
                                            value={ufColeta}
                                            onChange={(e) => setUfColeta(e.target.value)}
                                            readOnly={!!ufColeta}>
                                            UF
                                        </InputLine>
                                    </section>
                                    {/* Dados de Entrega */}
                                    <section className="text-black border border-gray-200 rounded-xl p-4 gap-6">
                                        <h2 className="mb-5 font-bold text-[1.1rem] text-black">Dados de Entrega</h2>
                                        <InputLine type="datetime-local" id='data-hora-entrega' htmlfor="data-hora-entrega" required
                                            value={dataHoraEntrega}
                                            onChange={(e) => setDataHoraEntrega(e.target.value)}>
                                            Data e hora da entrega
                                        </InputLine>
                                        <div className="relative mb-6">
                                            <IMaskInput
                                                mask={"00000-000"} id="cep-input-entrega"
                                                placeholder=""
                                                className={inputClasses} required
                                                value={cepEntrega}
                                                onAccept={handleCepEntregaChange} />
                                            <label htmlFor="cep-input-entrega" className={labelClasses}>CEP - Entrega</label>
                                        </div>

                                        <InputLine type="text" placeholder="" id='logradouro-entrega' htmlfor="logradouro-entrega"
                                            value={logradouroEntrega}
                                            onChange={(e) => setLogradouroEntrega(e.target.value)}
                                            readOnly={!!logradouroEntrega}>
                                            Logradouro
                                        </InputLine>
                                        <InputLine type="number" placeholder="" id='numero-entrega' htmlfor="numero-entrega"
                                            value={numeroEntrega}
                                            onChange={(e) => setNumeroEntrega(e.target.value)}>
                                            Número
                                        </InputLine>
                                        <InputLine type="text" placeholder="" id='bairro-entrega' htmlfor="bairro-entrega"
                                            value={bairroEntrega}
                                            onChange={(e) => setBairroEntrega(e.target.value)}
                                            readOnly={!!bairroEntrega}>
                                            Bairro
                                        </InputLine>
                                        <InputLine type="text" placeholder="" id='cidade-entrega' htmlfor="cidade-entrega"
                                            value={cidadeEntrega}
                                            onChange={(e) => setCidadeEntrega(e.target.value)}
                                            readOnly={!!cidadeEntrega}>
                                            Cidade
                                        </InputLine>
                                        <InputLine type="text" placeholder="" id='uf-entrega' htmlfor="uf-entrega"
                                            value={ufEntrega}
                                            onChange={(e) => setUfEntrega(e.target.value)}
                                            readOnly={!!ufEntrega}>
                                            UF
                                        </InputLine>
                                    </section>
                                </div>

                                 <div className="pt-6 flex justify-center">
                            <BotaoSubmit
                                loading={loading}
                                label={loading ? "Enviando..." : "Enviar"}
                                type="submit"
                                className="bg-[#17607f] hover:bg-[#14536f] text-white font-semibold rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg"
                            />
                        </div>
                                </section>
                        </form>
                    </section>
                </div>
            </div>
            </div>

    )

}
