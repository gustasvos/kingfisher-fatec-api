import React from "react"

type propriedadeBota = {
     className?: string
     onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
     children: React.ReactNode
}

export default function Botao({className,onClick,children} : propriedadeBota){
    return (
        <button type="button"
        onClick={onClick}
        className= {` bg-[#015084] w-[200px] h-[50px] rounded-[8px] text-white text-[15px] font-semibold cursor-pointer hover:bg-[#053657] shadow-md ${className}`} >
            {children}
        </button>
    )
}