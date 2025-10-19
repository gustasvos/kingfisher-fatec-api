import React from "react"

export default function Loading(){
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50 ">
            <p className="text-[20px] md:text-[38px] font-sans font-bold italic text-gray-600 pt-5 md:drop-shadow-[10px_8px_3px_rgba(0,0,0,0.3)]">
                Carregando...</p>
        </div>
    )
}