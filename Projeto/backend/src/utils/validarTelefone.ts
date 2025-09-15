export function validarTelefone(telefone: string, length=15): boolean {
    // ^ Início da string
    // \\+? O caractere + é opcional (por isso o ?), e precisa ser escapado (\\+)
    // [1-9] O primeiro dígito não pode ser zero — deve ser de 1 a 9
    // \\d{1,14} Depois disso, pode haver de 1 a 14 dígitos
    // $ Fim da string
    const telefoneRegex = new RegExp(`^\\+?[1-9]\\d{1,14}$`)

    return telefoneRegex.test(telefone) && telefone.length <= length
}
// console.log(validarTelefone('+5511999999999')) // true
// console.log(validarTelefone('11999999999')) // true
// console.log(validarTelefone('+5511999999999999')) // false (mais de 15 caracteres)
// console.log(validarTelefone('01999999999')) // false (começa com 0)
// console.log(validarTelefone('+55(11)99999-9999')) // false (caracteres inválidos)