import imgLogin from "../../../assets/imgLogin.jpeg";
import { IMaskInput } from "react-imask"; //baixei uma biblioteca


export default function Login(){
    return(
        <div className="grid grid-cols-[50%_50%]">
            <div >
                <img src={imgLogin} alt="login" className="w-full object-cover h-screen" />
            </div>
            <div className="bg-[#EAF7FF] flex justify-center items-center ">
                <div className="bg-[#015084] w-[280px] md:w-[400px] h-[350px] md:h-[500px] p-4 rounded-[5px] md:rounded-[10px] flex justify-center drop-shadow-[2px_2px_3px_rgba(1,80,132,0.8)]">
                    <form action="">
                        <p className="text-[25px] md:text-[45px] font-sans font-bold italic text-white pt-5 md:drop-shadow-[10px_8px_3px_rgba(0,0,0,0.3)]">
                            NEWE
                        </p>
                        <p className="text-[25px] md:text-[45px] font-sans text-[#5AA9E6] leading-[0.5] drop-shadow-[10px_0px_3px_rgba(0,0,0,0.3)]">
                            NEWE
                        </p>
                        <p className="pt-8 md:pt-10 text-[15px] md:text-[25px] text-white font-sans font-medium pb-1 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.3)]">
                            CPF
                        </p>
                        <IMaskInput mask={"000.000.000-00"}  placeholder=" Digite sue CPF" required maxLength={14} className="w-[200px] md:w-[300px] h-[25px] md:h-[45px] rounded-[10px] md:rounded-[15px] pl-1 md:pl-3 shadow-[4px_4px_4px_rgba(0,0,0,0.4)] outline-[#053657]"/>
                        <p className="pt-6 md:pt-8 text-[15px] md:text-[25px] text-white font-sans font-medium pb-1 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.3)]">
                            Senha
                        </p>
                        <input type="password" placeholder=" Digite sua senha" required className="w-[200px] md:w-[300px] h-[25px] md:h-[45px] rounded-[10px] md:rounded-[15px] pl-1 md:pl-3 shadow-[4px_4px_4px_rgba(0,0,0,0.4)] outline-[#053657]"/>
                        <div className="pt-10 flex justify-center">
                            <input type="submit" value={'ENTRAR'} className="bg-white w-[100px] md:w-[200px] p-2 rounded-[10px] md:rounded-[15px] text-[#053657] text-[12px] md:text-[20px] font-sans font-medium  shadow-[4px_4px_4px_rgba(0,0,0,0.4)] cursor-pointer hover:bg-[#053657] hover:text-white"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

