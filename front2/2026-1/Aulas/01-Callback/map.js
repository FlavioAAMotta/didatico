const produtos = [
    { nome: "Omo", tipo: "Limpeza", preco: 20.0 },
    { nome: "Mouse", tipo: "Eletrônico", preco: 40.0 },
    { nome: "Teclado", tipo: "Eletrônico", preco: 55.5 },
    { nome: "Detergente", tipo: "Limpeza", preco: 2.5 },
    { nome: "Pão", tipo: "Alimento", preco: 15.0 },
]

const precos = produtos.map(
    (produto) => { return {preco: produto.preco, nome: produto.nome} }
)

const limpeza = produtos.filter((produto)=>{
    return produto.tipo === "Limpeza";
})

// console.log(precos);
console.log(limpeza);

const numeros = [1,2,3,4,5,6,7,8,9]

const dobro = numeros.map((numero)=>{
    return numero * 2;
})

// console.log(dobro)