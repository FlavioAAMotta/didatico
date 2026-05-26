const botao = document.getElementById("change-button");
console.log(botao);
console.log(`Texto: ${botao.textContent}`)

function mudarTitulo(){
    // document.querySelector("#titulo");
    // document.querySelector(".intro");
    const elementoTitulo = document.querySelector("h1");
    // console.log(elementoTitulo.textContent);
    elementoTitulo.textContent = "Novo Título";
    elementoTitulo.style.color = "red";
    elementoTitulo.style.backgroundColor = "green";
}