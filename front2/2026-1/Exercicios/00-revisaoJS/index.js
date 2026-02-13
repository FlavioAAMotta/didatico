// Maior numero, eh divisivel, diferenca
// 14,7 -> 14,true,7

const analiseNumeros = (num1, num2) =>{
    let maior = num1;
    let menor = num2;
    let divisivel = false;
    let diferenca = 0;

    if(num2 > maior){
        maior = num2;
        menor = num1;
    }
    if(maior % menor == 0){
        divisivel = true;
    }
    diferenca = maior - menor;

    return {
        maior: maior, 
        divisivel: divisivel, 
        diferenca: diferenca
    }
}

const retorno = analiseNumeros(14,7); //-> 14, true, 7

const pets = [
 { nome: "Lupin", raca: "Salsicha"},
 { nome: "Polly", raca: "Lhasa Apso"},
 { nome: "Madame", raca: "Poodle"},
 { nome: "Quentinho", raca: "Salsicha"},
 { nome: "Fluffy", raca: "Poodle"},
 { nome: "Caramelo", raca: "Vira-lata"},
]

// c) Crie um novo array que possuirá mensagens para enviar para todos os clientes que são
// poodles. A mensagem deve ser: "Você ganhou um cupom de desconto de 10% para tosar o/a
// [NOME] !"

const poodles = pets.filter((pet)=>{
    return pet.raca === "Poodle"
});

const mensagens = poodles.map((poodle)=>{
    return `Você ganhou um cupom de desconto de 10% para tosar o/a ${poodle.nome} !`
})

console.log(mensagens);

const numeros = [0,1,2,3,4,5]

const dobros = numeros.map((numero)=>{
    return numero * 2;
})

console.log(dobros)