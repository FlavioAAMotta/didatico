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

const mensagens = poodles.map((poodle)=>{
    return `Você ganhou um cupom de desconto de 10% para tosar o/a ${poodle.nome}`
})

console.log(mensagens);