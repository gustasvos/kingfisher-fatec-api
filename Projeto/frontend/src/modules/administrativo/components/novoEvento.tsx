import { useState } from "react";
import Container from "../../../shared/components/container";
import MultiSelectDropdown from "./multiSelectDropDown";
import { Opcoes } from "./multiSelectDropDown";
import instance from "../../../services/api";
import { useNavigate } from "react-router-dom"; 

const isValidDataPtBr = (data: string): boolean => {
  // Regex formato DD/MM/YYYY
  return /^\d{2}\/\d{2}\/\d{4}$/.test(data);
};

// Converte data DD/MM/YYYY -> YYYY-MM-DD (para salvar no estado)
const dataLimpa = (dataPtBr: string): string => {
  const [dia, mes, ano] = dataPtBr.split('/');
  if (!dia || !mes || !ano) return "";
  return `${ano.padStart(4,'0')}-${mes.padStart(2,'0')}-${dia.padStart(2,'0')}`;
}

// Converte data YYYY-MM-DD -> DD/MM/YYYY (para mostrar no input)
const formatarDataParaPtBr = (dataIso: string): string => {
  if (!dataIso) return "";
  const [ano, mes, dia] = dataIso.split("-");
  return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`;
};

// valida time HH:MM
const isValidTime = (t: string) => /^\d{2}:\d{2}$/.test(t);

// monta ISO (UTC) a partir de data (YYYY-MM-DD ou DD/MM/YYYY) e horario HH:MM
const buildISODateTime = (dataRaw: string, horarioRaw: string): string | null => {
  if (!dataRaw) return null;

  // normaliza data para YYYY-MM-DD
  const dataIso = dataRaw.includes('/') ? dataLimpa(dataRaw) : dataRaw;

  const [y, m, d] = dataIso.split('-').map(v => Number(v));
  if (!y || !m || !d) return null;

  let hour = 0, minute = 0;
  if (horarioRaw && isValidTime(horarioRaw)) {
    [hour, minute] = horarioRaw.split(':').map(v => Number(v));
  }

  // cria Date no fuso local e converte para ISO UTC
  const dt = new Date(y, m - 1, d, hour, minute, 0, 0);
  return dt.toISOString(); // ex: 2025-09-30T14:30:00.000Z
};

export default function NovoEvento() {

    const [titulo, setTiulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [data, setData] = useState('')               // aceita YYYY-MM-DD (input date) ou DD/MM/YYYY
    const [horario, setHorario] = useState('');        // HH:MM
    const [localizacao, setLocalizacao] = useState('')
    const [convidados,setConvidados] = useState<Opcoes[]>([])
    const navigate = useNavigate();
    const [erro, setErro] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState<string | null>(null);

    const formEnviado = async(e: React.FormEvent) => {
        e.preventDefault()
        setErro(null);       // limpa erro anterior
        setSucesso(null);

        // validações básicas
        // se o usuário estiver digitando PT-BR, valida esse formato
        if (data.includes('/') && !isValidDataPtBr(data)) {
          setErro("Data inválida. Use DD/MM/YYYY.");
          return;
        }

        if (horario && !isValidTime(horario)) {
          setErro("Horário inválido. Use HH:MM.");
          return;
        }

        // monta ISO
        const dataHoraIso = buildISODateTime(data, horario);
        if (!dataHoraIso) {
          setErro("Data/Horário inválidos.");
          return;
        }

        try {
            // envia convidados como array de ids (números)
            const convidadosIds = convidados.map(c => c.value);

            const payload = {
              titulo,
              descricao,
              dataHora: dataHoraIso, // campo que o backend espera (ISO)
              localizacao,
              convidados: convidadosIds
            };

            const response = await instance.post("/admin/events", payload);
            setSucesso("Evento cadastrado com sucesso!");
            setTimeout(() => {
                navigate("/")
            }, 2000);
        } 
        catch (error) {
            console.error("Erro no cadastro de evento", error);
            setErro("Erro ao fazer o cadastro de novo evento");
        }
    }

    return (
        <Container>
            <form action="" onSubmit={formEnviado} className="grid grid-cols-[50%,50%]">
                <section className="flex flex-col items-center pt-[60px] space-y-4">
                    <p className="font-sans text-[25px] text-[#053657] font-semibold">Criação de Novo Evento</p>
                    <section className="relative">
                        <input type="text" id="tituloEvento" value={titulo} onChange={(e) => setTiulo(e.target.value)} required className="w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label htmlFor="tituloEvento" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Título do Evento</label>
                    </section>
                    <section className="relative">
                        <textarea rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} required className="w-[300px] resize-none block rounded-t-lg px-2.5 pb-2.5 pt-9 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="" id="descricaoEvento"></textarea>
                        <label htmlFor="descricaoEvento" className=" absolute leading-relaxed text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 z-10 top-0 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Descrição do Evento</label>
                    </section>
                    <section className="relative">
                        <input type="date" id="dataEvento" value={data} onChange={(e) => setData(e.target.value)} required className="w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label htmlFor="dataEvento" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Data do Evento</label>
                    </section>
                    <section className="relative">
                    <input
                        type="time"
                        id="horarioEvento"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                        required
                        className="w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="horarioEvento"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                        Horário do Evento
                    </label>
                    </section>
                    <section className="relative">
                        <input type="text" id="localEvento" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} required className="w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label htmlFor="localEvento" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Localização do Evento</label>
                    </section>
                      {erro && <p className="text-red-500 mt-4">{erro}</p>}
                      {sucesso && <p className="text-green-600 mt-4">{sucesso}</p>}
                </section>

                <section className="flex flex-col items-center justify-between pt-[72px] ">
                    <MultiSelectDropdown value={convidados} onChange={(novoValor) => setConvidados(novoValor ?? [])}/>
                    <input type="submit" value={'ENVIAR'} className="bg-[#015084] w-[250px] h-[45px] rounded-[8px] text-white text-[15px] font-semibold cursor-pointer font-sans text-black" />
                </section>
            </form>
        </Container>
    )
}
