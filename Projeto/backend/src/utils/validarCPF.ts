export function validarCPF(cpf: string, length = 11): boolean {
    // /.../ → isso indica uma expressão regular (regex) no JavaScript.
    // \D → representa qualquer caractere que não é um dígito
    // g → É um flag (modificador) que significa global, ou seja, aplica a substituição em toda a string, não só na primeira ocorrência.
    const normalizacao = cpf.replace(/\D/g, '')

    //^ → início da string
    // (\d) → captura um dígito (0 a 9) e salva para usar depois
    // \1{10} → verifica se o mesmo dígito capturado aparece mais 10 vezes seguidas
    // $ → fim da string
    if (normalizacao.length !== length || /^(\d)\1{10}$/.test(normalizacao)) return false

    // Os ultimos 2 digitos do CPF são os digitos verificadores
    const calcularDigito = (base: string, pesoInicial: number): number =>{
        let soma = 0
        
        for (let i = 0; i < base.length; i++){
            const digito = Number(base.charAt(i)) //Retorna o caractere que está na posição i

            const peso = pesoInicial - i
            soma += digito * peso
        }
        const resto = (soma * 10) % 11;

        //resto === 10 então 0, senão retorna resto
        return resto === 10 ? 0 : resto;
    }

    //1- Pegue os 9 primeiros dígitos do CPF (base) 
    const base9 = normalizacao.slice(0, 9)

    // Calcular os dígitos verificadores
    //2- Multiplique cada dígito pelo peso, que começa em 10 e vai decrescendo até 2
    //3- Multiplique a soma por 10 e calcule o resto da divisão por 11.
    //4- Se o resto for 10 ou 11, o dígito verificador é 0; senão, é o próprio resto.
    const digito1 = calcularDigito(base9, 10);

    //1- Agora pegue os 9 primeiros dígitos + o 1º dígito verificador calculado (total 10 dígitos).
    //2- Multiplique cada dígito pelo peso, que começa em 11 e vai decrescendo até 2.
    //3- Multiplique cada dígito pelo peso, some os resultados.
    //4- Multiplique a soma por 10 e calcule o resto da divisão por 11.
    //5- Se o resto for 10 ou 11, o dígito é 0; senão, é o resto.
    const digito2 = calcularDigito(base9 + digito1, 11);

    // Verificar se os dígitos calculados são iguais aos do CPF
    return digito1 === Number(normalizacao.charAt(9)) && digito2 === Number(normalizacao.charAt(10));
}

// console.log(validarCPF("529.982.247-25")); // true
// console.log(validarCPF("123.456.789-00")); // false