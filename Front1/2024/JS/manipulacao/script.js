function mudarTitulo(){
    let titulo = document.getElementById('titulo');
    console.log(titulo);
    titulo.textContent = "Novo título"
    const intros = document.getElementsByClassName("intro");
    console.log(intros);

}

// Em seu JavaScript, selecione esta div e use textContent para adicionar uma mensagem de boas-vindas.     -->

function mostrarBoasVindas(){
    let mensagem = document.querySelector("#welcome-div");
    mensagem.textContent = "Boas vindas";
}