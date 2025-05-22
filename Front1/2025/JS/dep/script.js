function mudar(){
    let elemento = document.querySelector('p');
    elemento.classList.add('texto-italico')
    console.log(elemento.classList);
}

function adicionar(){
    const inputs = document.getElementsByTagName('input');
    produtoDigitado = inputs[0].value;

    let novoElemento = document.createElement('p');
    novoElemento.innerHTML = produtoDigitado;

    const divProdutos = document.querySelector("#itens");
    divProdutos.appendChild(novoElemento);
}