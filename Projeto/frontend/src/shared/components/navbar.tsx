import { NavLink } from "react-router-dom"
import imgAddUserMale from "../../assets/imgAddUserMale.png";
import imgHomepage from "../../assets/imgHomepage.png";
import imgTearOffCalendar from "../../assets/imgTearOffCalendar.png"
import imgDoorbell from "../../assets/imgDoorbell.png";
import { useState } from "react";

export default function Navbar(){
    const [aberto,setAberto] = useState(false)

    return (
        <nav className={`${aberto ? "w-[200px]": "w-[60px]"} bg-[#135b78] flex flex-col items-center min-h-screen text-white py-6 gap-6`}>
            <section className={`${aberto ? "self-start flex flex-col justify-start space-y-1 pl-6":"flex flex-col justify-start space-y-1"} cursor-pointer`} onClick={() =>{
                setAberto(!aberto)
            }}>
                <span className="w-6 h-[3px] bg-white"/>
                <span className="w-6 h-[3px] bg-white"/>
                <span className="w-6 h-[3px] bg-white"/>
            </section>
            <section className="flex flex-col space-y-6">
                <NavLink to={"/Home"} className=" rounded-md flex items-center  hover:bg-[#1b7091d8]">
                    <img src={imgHomepage} alt="Home" className="w-7 h-7"/>
                    {aberto ? <p className="pl-2 text-[15px] font-semibold">Home</p>:null}
                </NavLink>
                <NavLink to={"/AddUser"} className="rounded-md flex items-center  hover:bg-[#1b7091d8]">
                    <img src={imgAddUserMale} alt="AddUser" className="w-7 h-7"/>
                    {aberto ? <p className="pl-2 text-[15px] font-semibold">Adiciona Usuário</p>:null}
                </NavLink>
                <NavLink to={"/Calendario"} className="rounded-md flex items-center  hover:bg-[#1b7091d8]">
                    <img src={imgTearOffCalendar} alt="Calendario" className="w-7 h-7"/>
                    {aberto ? <p className="pl-2 text-[15px] font-semibold">Calendário</p>:null}
                </NavLink>
                <NavLink to={"/Notificacao"} className="rounded-md flex items-center  hover:bg-[#1b7091d8]">
                    <img src={imgDoorbell} alt="notificação" className="w-7 h-7"/>
                    {aberto ? <p className="pl-2 text-[15px] font-semibold">Notificações</p>:null}
                </NavLink>
            </section>
        </nav>
    )
}