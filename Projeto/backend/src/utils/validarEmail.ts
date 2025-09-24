export function validarEmail(email: string, length=300): boolean {
    if (!email || email.length > length) return false

    // Expressão regular para validar o formato do e-mail
    // ^            Início da string
    // [^\s@]+      Um ou mais caracteres que não sejam espaço ou @
    // @            Símbolo @ obrigatoriamente
    // \.           Um ponto literal
    // [^\s@]{2,}   Pelo menos dois caracteres após o ponto final
    // $            Fim da string 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    return regex.test(email)
}

// console.log(validarEmail("teste@email.com"))            // true
// console.log(validarEmail("teste.email@sub.dominio"))    // true
// console.log(validarEmail("invalido@@email") )           // false
// console.log(validarEmail("semarroba.com") )             // false
// console.log(validarEmail("email@") )                    // false
// console.log(validarEmail("email@a") )                   // false