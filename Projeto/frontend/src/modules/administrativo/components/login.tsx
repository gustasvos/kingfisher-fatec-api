import imgLogin from "../../../assets/imgLogin.jpeg";


export default function Login(){
    return(
        <div className="grid grid-cols-[50%_50%]">
            <div >
                <img src={imgLogin} alt="login" className="w-full object-cover h-screen" />
            </div>
            <div className="bg-[#EAF7FF] flex justify-center items-center">
                <div className="bg-[#015084] w-[400px] h-[500px] p-4 rounded-[10px] flex justify-center">
                    <form action="">
                        <p className="text-[45px] font-sans font-bold italic text-white pt-5">NEWE</p>
                        <p className="text-[45px] font-sans text-[#5AA9E6] leading-[0.5]">NEWE</p>
                        <p className="pt-10 text-[25px] text-white font-sans font-medium pb-1">CPF</p>
                        <input type="text" placeholder=" Digite sue CPF" required className="w-[300px] h-[45px] rounded-[15px]"/>
                        <p className="pt-8 text-[25px] text-white font-sans font-medium pb-1">Senha</p>
                        <input type="password" placeholder=" Digite sua senha" required className="w-[300px] h-[45px] rounded-[15px]"/>
                        <div className="pt-10 flex justify-center">
                            <button className="bg-white w-[200px] p-2 rounded-[15px] text-[#053657] text-[20px] font-sans font-medium">ENTRAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

