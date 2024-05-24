let contador = 0;

function adicionarItem(){
    let item = document.querySelector("#inputItem");
    let itemNovo = document.createElement("li");
    let lista = document.getElementById("listaCompras");
    itemNovo.textContent = item.value;
    itemNovo.id = contador++;
    itemNovo.className = 'item_desmarcado';
    itemNovo.style.padding = '10px';

    itemNovo.addEventListener(onclick,checkItem(itemNovo))

    lista.appendChild(itemNovo);
    item.value = "";
}

function checkItem(item){
    item.className = "item_marcado"
}