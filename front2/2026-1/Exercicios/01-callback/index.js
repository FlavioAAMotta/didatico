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
    return pet.raca == "Poodle"
})

const mensagens = poodles.map((poodle, batata)=>{
    return `Você ganhou um cupom de desconto de 10% para tosar o/a ${poodle.nome}, você é o ${batata + 1} da fila`
})

console.log(mensagens);


const numeros = [0,1,2,3,4,5,6,7,8,9,10]

const dobros = numeros.map((numero)=>{
    return numero * 2;
})

console.log(dobros)