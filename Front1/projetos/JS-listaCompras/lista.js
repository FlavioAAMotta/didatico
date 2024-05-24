function addItem(){
    let inputElement = document.getElementById("itemInput");
    let texto = inputElement.value;
    let itemLista = document.createElement("li");
    let lista = document.getElementById("shoppingList");

    let tamanhoLista = lista.childElementCount;
    // let tamanhoLista = itens.length;

    itemLista.className = "itemUnchecked";
    // itemLista.style.backgroundColor = "red";
    itemLista.innerHTML = texto;
    itemLista.id = `item${tamanhoLista}`;

    itemLista.addEventListener("click",function(){checkItem(itemLista.id)})

    lista.appendChild(itemLista);

    inputElement.value = "";
}

function checkItem(itemId){
    let item = document.getElementById(itemId);
    let itemClass = item.className;
    if(itemClass == "itemChecked"){
        item.className = "itemUnchecked";
    }else{
        item.className = "itemChecked";
    }
}