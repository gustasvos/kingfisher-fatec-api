export const validarCNPJ = (cnpj: string): boolean => {
    if (!cnpj) return false;

    const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');

    // 1. Verifica o tamanho
    if (cnpjLimpo.length !== 14) return false;

    // 2. Verifica se todos os dígitos são iguais (ex: 00.000.000/0000-00)
    if (/^(\d)\1+$/.test(cnpjLimpo)) return false;

    // 3. Validação dos dígitos verificadores
    const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    // Pesos para o cálculo do segundo dígito
    const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    // --- Cálculo do primeiro dígito verificador ---
    let soma1 = 0;
    for (let i = 0; i < 12; i++) {
        soma1 += parseInt(cnpjLimpo.charAt(i)) * pesos1[i]!;
    }
    
    let resto1 = soma1 % 11;
    let dv1 = (resto1 < 2) ? 0 : 11 - resto1;

    // --- Cálculo do segundo dígito verificador ---
    let soma2 = 0;
    for (let i = 0; i < 13; i++) {
        soma2 += parseInt(cnpjLimpo.charAt(i)) * pesos2[i]!;
    }

    let resto2 = soma2 % 11;
    let dv2 = (resto2 < 2) ? 0 : 11 - resto2;

    // 4. Compara os dígitos calculados com os dígitos reais
    if (parseInt(cnpjLimpo.charAt(12)) !== dv1 || parseInt(cnpjLimpo.charAt(13)) !== dv2) {
        return false;
    }

    // Se passou por todas as verificações, é válido
    return true;
};