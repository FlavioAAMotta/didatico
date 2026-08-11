const div = document.getElementById("div-exemplo");
function clique(){
    console.log("Clicado");
}

function mover(){
    div.style.marginLeft = "50px"
    div.removeEventListener("click", mover)
    div.addEventListener("click", moverEsquerda)
    console.log(div)
}

function moverEsquerda(){
    div.style.marginLeft = "0px"
}

div.addEventListener("click", clique)
div.addEventListener("click", mover)
console.log(div)
