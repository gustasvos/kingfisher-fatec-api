import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const MultiSelectDropdown = () => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/usuarios")
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

    const handleChange = (selected: any) => {
        setSelectedOptions(selected);
    };

    return <div className="w-[300px] h-[200px] space-y-4">
        <label className="font-sans text-[#053657] font-medium">
            Convidados
        </label>
        <Select
            isMulti
            options={options}
            value={selectedOptions}
            onChange={handleChange}
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
                })
            }}
        />
    </div>
}

export default MultiSelectDropdown