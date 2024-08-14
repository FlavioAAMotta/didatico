let numeroDeItens = 3;

function adicionarTarefa(){
    let input = document.getElementById("nova-tarefa");
    let lista = document.querySelector("ul");
    if(input.value === ""){
        alert("Campo vazio");
        return;
    }
    let novoItem = document.createElement("li");
    numeroDeItens++;
    console.log("Item de numero: ", numeroDeItens);
    novoItem.id = numeroDeItens;
    novoItem.textContent = input.value;
    novoItem.setAttribute("class","nao-verificada");
    
    //addEventListener recebe qual o evento, qual a função associada ao evento.
    novoItem.addEventListener("click",() => marcarTarefa(novoItem.id));
    lista.appendChild(novoItem);
    input.value = "";
}

function marcarTarefa(id){
    console.log(id);
    let item = document.getElementById(id);
    item.setAttribute("class","verificada");
}