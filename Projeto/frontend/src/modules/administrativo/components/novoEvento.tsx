import Botao from "../../../shared/components/botao";
import Container from "../../../shared/components/container";
import MultiSelectDropdown from "./multiSelectDropDown";


export default function NovoEvento() {


    return (
        <Container>
            <form action="" className="grid grid-cols-[50%,50%] grid-rows-4">
                <section className="flex flex-col items-center pt-[25px] space-y-4">
                    <p className="font-sans text-[25px] text-[#053657] font-semibold">Criação de Novo Evento</p>
                    <section>
                        <p className="font-sans text-[#053657] font-medium">Título</p>
                        <input type="text" placeholder="Digite o título do evento" className="w-[300px] h-[30px] p-3 rounded-[8px] outline-[#053657]" />
                    </section>
                    <section>
                        <p className="font-sans text-[#053657] font-medium">Descrição</p>
                        <textarea placeholder="Digite a descrição do evento" className="w-[300px] h-[150px] p-3 rounded-[8px] outline-[#053657]" name="" id=""></textarea>
                    </section>
                    <section>
                        <p className="font-sans text-[#053657] font-medium">Data</p>
                        <input type="date" className="w-[300px] h-[30px] p-3 rounded-[8px] outline-[#053657]" />
                    </section>
                    <section>
                        <p className="font-sans text-[#053657] font-medium">Local</p>
                        <input type="text" placeholder="Digite o local do evento" className="w-[300px] h-[30px] p-3 rounded-[8px] outline-[#053657]" />
                    </section>
                </section>
                <section className="flex flex-col items-center justify-between pt-[25px] ">

                    <MultiSelectDropdown/>

                    <Botao>
                        Salvar
                    </Botao>
                </section>
            </form>
        </Container>
    )
}
