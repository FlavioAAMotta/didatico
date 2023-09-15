function addItem(){
    var item = document.getElementById("itemInput").value;
    var lista = document.getElementById("shoppingList");
    var newItem = document.createElement("li");
    var newItemText = document.createElement("span");
    var removeButton = document.createElement("button");

    var itemId = "item" + (lista.childElementCount + 1);
    var classItem = "itemUnchecked";

    newItem.setAttribute("id", itemId);
    newItem.setAttribute("class", classItem);
    // newItem.setAttribute("onclick", "checkItem('" + itemId + "')");
    newItem.addEventListener("click", function(){checkItem(itemId)});
    newItem.addEventListener("dblclick", function(){editItem(itemId)});
    newItemText.innerHTML = item;

    removeButton.setAttribute("onclick", "removeItem('" + itemId + "')");
    removeButton.innerHTML = "X";

    newItem.appendChild(newItemText);
    newItem.appendChild(removeButton);

    lista.appendChild(newItem);
    document.getElementById("itemInput").value = "";
}

function checkItem(itemId){
    var item = document.getElementById(itemId);
    var classItem = item.getAttribute("class");

    if(classItem == "itemUnchecked"){
        item.setAttribute("class", "itemChecked");
    } else {
        item.setAttribute("class", "itemUnchecked");
    }
    moveCheckedToBottom();
}

function removeItem(itemId){
    var item = document.getElementById(itemId);
    item.parentNode.removeChild(item);
}

function checkAll(){
    var lista = document.getElementById("shoppingList");
    var items = lista.getElementsByTagName("li");

    for(var i = 0; i < items.length; i++){
        items[i].setAttribute("class", "itemChecked");
    }
    changeButtonToUncheckAll();
}

function uncheckAll(){
    var lista = document.getElementById("shoppingList");
    var items = lista.getElementsByTagName("li");

    for(var i = 0; i < items.length; i++){
        items[i].setAttribute("class", "itemUnchecked");
    }
    changeButtonToCheckAll();
}

function changeButtonToUncheckAll(){
    var button = document.getElementById("checkAllButton");
    button.setAttribute("onclick", "uncheckAll()");
    button.innerHTML = "Desmarcar todos";
}

function changeButtonToCheckAll(){
    var button = document.getElementById("checkAllButton");
    button.setAttribute("onclick", "checkAll()");
    button.innerHTML = "Marcar todos";
}

function removeChecked(){
    var lista = document.getElementById("shoppingList");
    var items = lista.getElementsByTagName("li");

    for(var i = 0; i < items.length; i++){
        if(items[i].getAttribute("class") == "itemChecked"){
            items[i].parentNode.removeChild(items[i]);
            i--;
        }
    }
}

function editItem(itemId){
    var newText = prompt("Editar item", document.getElementById(itemId).firstChild.innerHTML);
    if(newText != null){
        document.getElementById(itemId).firstChild.innerHTML = newText;
    }
}

function moveCheckedToBottom(){
    var lista = document.getElementById("shoppingList");
    var items = lista.getElementsByTagName("li");

    for(var i = 0; i < items.length; i++){
        if(items[i].getAttribute("class") == "itemChecked"){
            lista.appendChild(items[i]);
        }
    }
}

function searchList(){
    var lista = document.getElementById("shoppingList");
    var items = lista.getElementsByTagName("li");
    var search = document.getElementById("searchInput").value;
    var searchRegExp = new RegExp(search, "i");

    for(var i = 0; i < items.length; i++){
        if(items[i].firstChild.innerHTML.search(searchRegExp) == -1){
            items[i].setAttribute("class", "itemHidden");
        } else {
            items[i].setAttribute("class", "itemUnchecked");
        }
    }
}

function sortList(){
    var lista = document.getElementById("shoppingList");
    var items = lista.getElementsByTagName("li");
    var itemsArray = [];

    for(var i = 0; i < items.length; i++){
        itemsArray.push(items[i].firstChild.innerHTML);
    }

    itemsArray.sort();

    for(var i = 0; i < items.length; i++){
        items[i].firstChild.innerHTML = itemsArray[i];
    }
}