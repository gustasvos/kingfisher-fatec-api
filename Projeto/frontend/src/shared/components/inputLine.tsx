type PropriedadeInput = {
    classNameInput?: string,
    classNameLabel?: string,
    id?: string
    htmlfor?: string,
    children: React.ReactNode,
    type: string,
    name?: string,
    required?: boolean
    value?: string,
    checked?: boolean,
    maxLength?: number,
    placeholder?:string,
    onchange?:(e: React.ChangeEvent<HTMLInputElement>) =>void
}

export default function InputLine({ classNameInput, classNameLabel, id, htmlfor, children, type, name, value, required, checked,onchange,maxLength, placeholder }: PropriedadeInput) {
    const tipoRadio = type === 'radio'
    const tipoFile = type === 'file'
    if (tipoRadio) {
        return (
            <section>
                <input type={type} name={name} value={value} id={id} required={required} checked={checked} onChange={onchange} className={` ${classNameInput}`} />
                <label htmlFor={htmlfor} className={`text-black ${classNameLabel}`}>
                    {children}
                </label>
            </section>
        )
    } else if (tipoFile) {
        return (
            <section className="relative">
                <input type={type} name={name} id={id} required={required} onChange={onchange} className={`w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent ${classNameInput}`} />
                <label htmlFor={htmlfor} className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-90 top-4 z-10 origin-[0] pl-3 ${classNameLabel}`}>
                    {children}
                </label>
            </section>
        )
    }
    return (
        <section className="relative">
            <input type={type} name={name} id={id} required={required} placeholder={placeholder} onChange={onchange} maxLength={maxLength} className={`w-[300px] block rounded-t-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${classNameInput}`} />
            <label htmlFor={htmlfor} className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${classNameLabel}`}>
                {children}
            </label>
        </section>
    )
}
