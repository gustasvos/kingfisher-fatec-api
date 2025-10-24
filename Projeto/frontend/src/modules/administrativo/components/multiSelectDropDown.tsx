import React, { useState, useEffect } from "react";
import Select from "react-select";
import instance from "../../../services/api";

export type Opcoes = {
    value: number | string
    label: string
}

type multiSelectDropDownProps = {
    value: Opcoes[]
    onChange: (novoValor: Opcoes[] | null) => void
}

const MultiSelectDropdown : React.FC<multiSelectDropDownProps> = ({value, onChange}) => {
    const [options, setOptions] = useState<Opcoes[]>([]);

    useEffect(() => {
        instance.get("/usuario/list")
            .then((response) => {
                const usuarios = response.data
                console.log(usuarios)
                const formattedOptions = usuarios.map((item: any) => ({
                    value: item.id,
                    label: item.nome
                }));

                setOptions(formattedOptions);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    }, []);

    return <div className="w-[300px] h-[200px] space-y-4">
        <label className="font-sans text-[#053657] font-medium">
            Convidados
        </label>
        <Select
            isMulti
            options={options}
            value={value}
            onChange={(novoValor) => onChange(novoValor as Opcoes[] | null)}
            className="react-select-container"
            classNamePrefix="react-select"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            placeholder="Selecione os colaboradores que serão convidados"
            required
            
            styles={{
                control: (provided) => ({
                    ...provided,
                    minHeight: "30px",
                    maxHeight: "250px",
                    overflowY: "auto"
                }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                option: (base) => ({
                ...base,
                color: "#062846ff"
                }),
            }}
        />
    </div>
}

export default MultiSelectDropdown