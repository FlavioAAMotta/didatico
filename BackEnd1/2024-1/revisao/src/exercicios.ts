function obterEstatisticas(numeros: number[]): {
    maior: number,
    menor: number,
    media: number
} {
    const numerosOrdenados = numeros.sort(
        (a, b) => a - b
    )
    let soma = 0
    for (let num of numeros) {
        soma += num
    }
    const estatisticas = {
        maior: numerosOrdenados[numeros.length - 1],
        menor: numerosOrdenados[0],
        media: soma / numeros.length
    }
    return estatisticas;
}

type consulta = {
    nome: string,
    idade: number,
    dataConsulta: Date
}

function compare(a: consulta, b: consulta) {
    if (a.nome < b.nome) {
        return -1;
    }
    if (a.nome > b.nome) {
        return 1;
    }
    return 0;
}


function ordenaPacientes(consultas: consulta[]): consulta[] {
    return consultas.sort(compare);
}