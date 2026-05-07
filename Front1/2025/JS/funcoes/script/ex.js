function clicou(){
    alert("Clicado");
}

let variavel = 1;

function formatarNome (nome){
    console.log("Formatando nome"); //1
    let nomeFormatado = nome.trim();
    nomeFormatado = nomeFormatado.toLowerCase();    
    return nomeFormatado;
}

// console.log(nome);
// console.log(nomeFormatado);
console.log("Atribuindo nomes"); //2
let nome = "Flavio Motta";
let nome2 = 'jeff bezos'

console.log(formatarNome(nome));
console.log(formatarNome(nome2));