function saoDigitosRepetidos(cpf: number[]): boolean {
    let primeiroDigito = cpf[0];
    for (let i = 1; i < cpf.length; i++) {
        if (cpf[i] != primeiroDigito) {
            return false;
        }
    }
    return true;
}

function calcularDigitoVerificador(cpf: number[]): number[] {
    let valorAcumulado = 0;
    let indice = 0;
    for (let i = 10; i >= 2; i--) {
        valorAcumulado += cpf[indice++] * i;
    }
    let modPrimeiro = valorAcumulado % 11;
    let primeiroDigito = 11 - modPrimeiro;
    if (primeiroDigito >= 10) {
        primeiroDigito = 0;
    }
    cpf.push(primeiroDigito);
    valorAcumulado = 0;
    indice = 0;
    for (let i = 11; i >= 2; i--) {
        valorAcumulado += cpf[indice++] * i;
    }
    let modSegundo = valorAcumulado % 11;
    let segundoDigito = 11 - modSegundo;
    if (segundoDigito >= 10) {
        segundoDigito = 0;
    }
    return [cpf[9], cpf[10]];
}

function validarCPF(cpf: number[]): boolean {
    if (cpf.length != 11) {
        return false;
    }
    let novePrimeiros = cpf.slice(0, 9);
    let digitosRecebidos = cpf.slice(9, 11);
    let digitosCalculados = calcularDigitoVerificador(novePrimeiros);
    if (digitosCalculados != digitosRecebidos) {
        return false;
    } else {
        return true;
    }
}