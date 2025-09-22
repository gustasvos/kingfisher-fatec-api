import { Link } from "react-router-dom"
import imgAddUserMale from "../../assets/imgAddUserMale.png";
import imgHomepage from "../../assets/imgHomepage.png";
import imgTearOffCalendar from "../../assets/imgTearOffCalendar.png"
import imgDoorbell from "../../assets/imgDoorbell.png";
import { useState } from "react";

export default function Navbar(){
    const [aberto,setAberto] = useState(false)

    return (
        <nav className="w-[60px] bg-[#135b78] min-h-screen text-white flex flex-col items-center py-6 gap-6">
            <section className="flex flex-col space-y-1 cursor-pointer" onClick={() =>{
                setAberto(!aberto)
            }}>
                <span className="w-7 h-1 bg-white"/>
                <span className="w-7 h-1 bg-white"/>
                <span className="w-7 h-1 bg-white"/>
            </section>
            <section>
                <Link to={"/Home"} className="p-2 rounded">
                    <img src={imgHomepage} alt="Home" className="w-8 h-8"/>
                </Link>
                <Link to={"/AddUser"} className="p-2 rounded">
                    <img src={imgAddUserMale} alt="Home" className="w-8 h-8"/>
                </Link>
                <Link to={"/Calendario"} className="p-2 rounded">
                    <img src={imgTearOffCalendar} alt="Calendario" className="w-8 h-8"/>
                </Link>
                <Link to={"/Notificacao"} className="p-2 rounded">
                    <img src={imgDoorbell} alt="notificação" className="w-8 h-8"/>
                </Link>
            </section>
        </nav>
    )
}