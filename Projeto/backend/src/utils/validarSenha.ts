export function validarSenha(senha: string, length=15): boolean {
    // Regras:
    // - Pelo menos 8 caracteres
    // - Pelo menos 1 letra maiúscula
    // - Pelo menos 1 letra minúscula
    // - Pelo menos 1 número
    // - Pelo menos 1 caractere especial (!@#$%^&* etc)
    // - Sem espaços
    const regex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};':"\\\\|,.<>/?]).{8,${length}}$`)
    // !/\s/.test(senha) busca por qualquer espaço em branco na senha
    // Se tiver espaço, .test() retorna true, então inverte !
    return regex.test(senha) && !/\s/.test(senha)
}
// console.log(validarSenha("Senha123!")) // true
// console.log(validarSenha("senha123!")) // false (sem maiúscula)
// console.log(validarSenha("SENHA123!")) // false (sem minúscula) 