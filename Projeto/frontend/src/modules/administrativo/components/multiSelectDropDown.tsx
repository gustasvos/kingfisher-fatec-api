import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const MultiSelectDropdown = () => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/usuario/list")
            .then((response) => {
                const usuarios = response.data
                console.log(usuarios)
                const formattedOptions = usuarios.map((item: any) => ({
                    id: item.id,
                    nome: item.nome
                }));
                const a: any = [
                    {
                        "id": 1,
                        "nome": "Thiago Lima",
                        "nome_fantasia": "Thiago Lima LTDA",
                        "cpf": "85107366007",
                        "sexo": "M",
                        "estado_civil": "solteiro",
                        "data_nascimento": "1985-04-20",
                        "cidade_nascimento": "Rio de Janeiro",
                        "rg": "987656521",
                        "cidade_expedicao_rg": "Rio de Janeiro",
                        "orgao_expedidor": "SSP",
                        "data_emissao_rg": "2005-07-15",
                        "documento_exterior": "",
                        "inscricao_estadual": "9876543210",
                        "pis_pasep": "98765432101",
                        "rntrc": "987654321012345",
                        "validade_rntrc": "2027-05-30",
                        "email": "thiago.lima@email.com",
                        "telefone": "11999988877",
                        "celular": "11999988877",
                        "operadora": "Claro",
                        "codigo": "THI123",
                        "nome_pai": "José Lima",
                        "nome_mae": "Ana Lima",
                        "ativo": true,
                        "cep": "22040002",
                        "bairro": "Copacabana",
                        "logradouro": "Avenida Atlântica",
                        "numero": "456",
                        "complemento": "Sala 10",
                        "cidade": "Rio de Janeiro",
                        "tipo_endereco": "residencial",
                        "latitude": "-22.9719640",
                        "longitude": "-43.1825430",
                        "cargo": "Product Owner",
                        "senha": "$2b$12$ZCbdvFJmICyxvZcvz8ZQCOevHXpFtCpLqUtzj.8fTYpkcFrx46HxK",
                        "data_contratacao": "2025-09-01",
                        "role": "admin"
                    }
                ]
                setOptions(a);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    }, []);

    const handleChange = (selected: any) => {
        setSelectedOptions(selected);
    };

    return <div className="w-[300px] mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Items
        </label>
        <Select
            isMulti
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            className="react-select-container"
            classNamePrefix="react-select"
        />
    </div>
}

export default MultiSelectDropdown