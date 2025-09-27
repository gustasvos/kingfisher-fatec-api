import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

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
        axios.get("http://localhost:8080/usuario/list")
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
        <label className="font-sans text-black font-medium">
            Convidados
        </label>
        {/* substitua somente esta tag Select no seu arquivo */}
<Select<Opcoes, true>
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
    // texto dentro das "chips" selecionadas
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#000",           // <- deixa o texto das tags em preto
      fontWeight: 500
    }),
    // fundo das chips (opcional)
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e6f2fb"
    }),
    // texto das opções do menu
    option: (provided, state) => ({
      ...provided,
      color: "#000", // <- texto das opções em preto
      backgroundColor: state.isFocused ? "#e6f2fb" : "#fff"
    }),
    // placeholder
    placeholder: (provided) => ({
      ...provided,
      color: "#666"
    }),
    // valor único (se algum dia usar single)
    singleValue: (provided) => ({
      ...provided,
      color: "#000"
    }),
    // container dos valores
    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 8px"
    })
  }}
/>

    </div>
}

export default MultiSelectDropdown