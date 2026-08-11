function alterarImagem(){
    console.log("Alterado");
    const imagem = document.querySelector("img");
    imagem.setAttribute("alt","Nova imagem");
    imagem.setAttribute("src", "https://picsum.photos/id/23/400/400")
}

function voltarImagem(){
    console.log("Alterado");
    const imagem = document.querySelector("img");
    imagem.setAttribute("alt","Imagem Aleatória");
    imagem.setAttribute("src", "https://picsum.photos/id/237/200/200")
}