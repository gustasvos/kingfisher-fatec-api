import React from "react"

type propriedadeContainer = {
    children: React.ReactNode
}

export default function Container({children} : propriedadeContainer){
    return (
        <section className="flex justify-center items-center h-screen">
            <section className="bg-slate-50 md:w-[100vw] md:h-[70vh] rounded-[15px] overflow-y-auto">
                {children}
            </section>
        </section>
    )
}
