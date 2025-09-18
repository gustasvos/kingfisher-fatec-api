export default function EventoDetalhe(){
    return(
        <section className="flex justify-center items-center h-screen">
            <section className="bg-[rgba(232,246,255,0.94)] md:w-[800px] md:h-[500px] rounded-[15px] grid grid-cols-[58%,2%,40%] grid-rows-[35%,2%,63%]">
                <section className="col-start-1 row-start-1 ">
                    <h1 className="font-sans text-[36px] font-semibold pl-[20px] pt-[30px]  ">Evento 1</h1>
                    <p className="font-sans text-[15px] font-semibold pl-[20px] pt-[15px]  pb-[20px]">Descreção do evento</p>
                </section>
                <span className="row-start-2 w-full h-[2px] bg-[#C2E8FF]"/>
                <section className="row-start-3 pt-[15px] pl-[20px]">
                    <p className="font-sans text-[15px] font-semibold pb-[20px]">Informações gerais</p>
                    <ul>
                        <li className="font-sans text-[15px] font-semibold">Data</li>
                        <li className="font-sans text-[15px] font-semibold">Horário</li>
                        <li className="font-sans text-[15px] font-semibold">local</li>
                    </ul>
                </section>
                <span className="row-start-1 row-span-3  w-[2px] h-full bg-[#C2E8FF]"/>
                <section className="flex flex-col items-center">
                    <p className="font-sans text-[15px] font-semibold pt-[30px] pb-[60px]">Confirmação</p>
                    <button className="bg-[#015084] w-[200px] h-[50px] rounded-[8px] text-white text-[15px] font-semibold">Vou Participar</button>
                </section>
                <section className="col-start-3 row-start-3 flex flex-col items-center">
                    <button className=" bg-[#015084] w-[200px] h-[50px] rounded-[8px] text-white text-[15px] font-semibold">Não Vou Participar</button>
                </section>
            </section>
        </section>
    )
}
