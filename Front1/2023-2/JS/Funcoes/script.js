let nome1 = "Bill Gates  "
let nome2 = " Jeff Bezos"
let nome3 = "Elon Musk"

function formatarNome(nome){
    nome = nome.toLowerCase()
    nome = nome.trim()
    nome = nome.replaceAll(" ", "-")
    return nome;
}
// Crie uma função que:
// Receba um nome
// Imprima no console a frase `Olá, [nome]!`
// Invoque-a com 3 nomes diferentes

function imprimaNomeFormatado(nomeDoUsuario){
    nomeDoUsuario = formatarNome(nomeDoUsuario)
    // console.log(`Olá, ${nomeDoUsuario}`)
    console.log(nome1);
}

imprimaNomeFormatado(nome1);
imprimaNomeFormatado(nome2);
imprimaNomeFormatado(nome3);


// nome1 = formatarNome(nome1);
// nome2 = formatarNome(nome2);
// nome3 = formatarNome(nome3);


// console.log(nome1);
// console.log(nome2);
// console.log(nome3);