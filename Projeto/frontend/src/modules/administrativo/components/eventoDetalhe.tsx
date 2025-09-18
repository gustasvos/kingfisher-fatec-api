export default function EventoDetalhe(){
    return(
        <section className="flex justify-center items-center h-screen">
            <section className="bg-[rgba(232,246,255,0.94)] md:w-[800px] md:h-[500px] rounded-[15px] grid grid-cols-[60%,40%] grid-rows-[35%,65%]">
                <section className="col-start-1 row-start-1 ">
                    <h1 className="font-sans text-[36px] font-semibold pl-[20px] pt-[30px] bg-pink-300 ">Evento 1</h1>
                    <p className="font-sans text-[15px] font-semibold pl-[20px] pt-[15px] bg-red-300 pb-[20px]">Descreção do evento</p>
                </section>
                <section className="row-start-2 pt-[20px] pl-[20px]">
                    <p>Informações gerais</p>
                    <p>Data</p>
                    <p>Horário</p>
                    <p>local</p>
                </section>
            </section>
        </section>
    )
}
