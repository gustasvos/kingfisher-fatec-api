import React from "react"

type propriedadeContainer = {
    children: React.ReactNode
}

export default function Container({children} : propriedadeContainer){
    return (
        <section className="bg-[rgba(232,246,255,0.94)] md:w-[800px] md:h-[500px] rounded-[15px]">
            {children}
        </section>
    )
}