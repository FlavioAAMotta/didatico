const produtos = [
    { nome: "Alface Lavada", categoria: "Hortifruti", preco: 2.5 },
    { nome: "Guaraná 2l", categoria: "Bebidas", preco: 7.8 },
    { nome: "Veja Multiuso", categoria: "Limpeza", preco: 12.6 },
    { nome: "Dúzia de Banana", categoria: "Hortifruti", preco: 5.7 },
    { nome: "Leite", categoria: "Bebidas", preco: 2.99 },
    { nome: "Cândida", categoria: "Limpeza", preco: 3.30 },
    { nome: "Detergente Ypê", categoria: "Limpeza", preco: 2.2 },
    { nome: "Vinho Tinto", categoria: "Bebidas", preco: 55 },
    { nome: "Berinjela kg", categoria: "Hortifruti", preco: 8.99 },
    { nome: "Sabão em Pó Ypê", categoria: "Limpeza", preco: 10.80 }
]

// const nomeProdutosLimpeza = produtos.filter((produto) => {
//     return produto.categoria == "Limpeza"
// }).map((produto) => {
//     return produto.nome;
// })

const produtosLimpeza = produtos.filter((produto)=>{
    return produto.categoria == "Limpeza"
})

const nomeProdutosLimpeza = produtosLimpeza.map((produto)=>{
    return produto.nome;
})

console.log(nomeProdutosLimpeza)


// Crie um novo array que contenha um objeto com
// o nome e o preço de cada item, aplicando 5% de desconto em todos eles

//Como fazer para que funcione para diferentes descontos?

function aplicarDescontos(desconto, produtos, categoria) {
    const valorTotal = 1 - desconto;

    const produtosDaCategoria = produtos.filter((produto) => {
        return produto.categoria == categoria;
    })

    const produtosDescontados = produtosDaCategoria.map((produto) => {
        const valorDescontado = produto.preco * valorTotal;
        return { produto: produto.nome, valor: valorDescontado }
    })
    return produtosDescontados;
}
const descontos = [
    { categoria: "Bebidas", desconto: "0.2" },
    { categoria: "Limpeza", desconto: "0.4" },
]

let produtosFinais = [];
for (let i = 0; i < descontos.length; i++) {
    produtosFinais.push(aplicarDescontos(descontos[i].desconto, produtos, descontos[i].categoria));
}
console.log(produtosFinais.flat());