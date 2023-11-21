function adicionarItem() {
    const novoItem = document.createElement('li');
    const item = document.querySelector('#item');
    const quantidade = document.getElementById("quantidade");
    const lista = document.getElementById('lista');

    if (quantidade.value == '' || item.value == '') {
        alert("Por favor preencha todos os campos");
        return;
    }

    novoItem.className = 'item';
    novoItem.textContent = `${quantidade.value}x ${item.value}`;
    novoItem.addEventListener('click', () => checkItem(novoItem));
    lista.appendChild(novoItem);

    item.value = '';
    quantidade.value = '';
}

function checkItem(item) {
    if (item.className === 'checked') {
        item.className = '';
    } else {
        item.className = "checked";
    }
}