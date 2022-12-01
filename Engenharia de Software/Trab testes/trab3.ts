const compras = [
    { produto: 'Arroz', valor: 10.00, quantidade: 2 },
    { produto: 'Feijão', valor: 5.00, quantidade: 1 },
    { produto: 'Macarrão', valor: 7.00, quantidade: 1 },
    { produto: 'Carne', valor: 20.00, quantidade: 1 },
    { produto: 'Frango', valor: 15.00, quantidade: 1 },
    { produto: 'Batata', valor: 2.00, quantidade: 5 },
];

const getDiscount = (valorTotal: number): number => {
    if (valorTotal >= 100) {
        return 0.1;
    } else if (valorTotal >= 50) {
        return 0.05;
    } else {
        return 0;
    }
}

const getValorTotal = (listaDeCompra: ListaDeCompra): number => {
    let valorTotal = 0;
    for (let item of listaDeCompra) {
        valorTotal += item.valor * item.quantidade;
    }
}

const getValorComDesconto = (listaDeCompra: ListaDeCompra): number => {
    const valorTotal = getValorTotal(listaDeCompra);
    const desconto = getDiscount(valorTotal);
    return valorTotal * (1 - desconto);
}