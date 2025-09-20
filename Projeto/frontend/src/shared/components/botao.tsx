import React from "react"

type propriedadeBota = {
     className?: string
     onClick?: () => void
     children: React.ReactNode
}

export default function Botao({className,onClick,children} : propriedadeBota){
    return (
        <button type="button"
        onClick={onClick}
        className= {` bg-[#015084] w-[200px] h-[50px] rounded-[8px] text-white text-[15px] font-semibold cursor-pointer hover:bg-[#053657] drop-shadow-[2px_2px_1.5px_rgb(1,80,132,0.6)] ${className}`} >
            {children}
        </button>
    )
}