import React from "react"

type propriedadeContainer = {
    children: React.ReactNode
}

export default function Container({children} : propriedadeContainer){
    return (
        <section className="flex justify-center items-center h-screen">
            <section className="bg-[rgba(232,246,255,0.94)] md:w-[800px] md:h-[600px] rounded-[15px] overflow-y-auto">
                {children}
            </section>
        </section>
    )
}