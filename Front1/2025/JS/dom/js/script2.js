function adicionar(){
    const produtoDigitado = document.querySelector("#produto-escrito");
    const preco = document.querySelector('#preco');
    const listaCompra = document.querySelector(".lista-compra");
    const textoDigitado = produtoDigitado.value;
    const precoDigitado = preco.value;
    
    let novaLinha = document.createElement('tr');
    let novoElementoProduto = document.createElement('td');
    let novoElementoPreco = document.createElement('td');
    
    novoElementoProduto.textContent = textoDigitado;
    novoElementoPreco.textContent = precoDigitado;

    novaLinha.appendChild(novoElementoProduto);
    novaLinha.appendChild(novoElementoPreco);
    listaCompra.appendChild(novaLinha);

    novoElementoProduto.textContent = textoDigitado;
    listaCompra.appendChild(novoElementoProduto);
    produtoDigitado.value='';
    precoDigitado.value='';
}