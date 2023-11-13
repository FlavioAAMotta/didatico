const button = document.querySelector("#add-button");
const item = document.querySelector("#item");
const list = document.querySelector("#list");
const quantity = document.querySelector("#quantity");
let itemsQuantity = 0;

button.addEventListener("click", () => {
  addItem();
});

item.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    addItem();
  }
});

function addItem() {
  if (item.value.trim() === "") {
    item.value = "";
    item.focus();
    alert("Digite um item");
    return;
  }
  if (quantity.value.trim() === "") {
    quantity.value = "1";
  }

  const li = document.createElement("li");
  li.innerText = `${quantity.value}x ${item.value}`;
  li.addEventListener("click", () => {
    checkItem(li);
  });
  li.id = `item${itemsQuantity++}`;

  list.insertBefore(li, list.firstChild);
  item.value = "";
  item.focus();
}

function checkItem(item) {
  if (item.classList.contains("checked")) {
    item.classList.remove("checked");
    moveItemToNotChecked(item);
  } else {
    item.classList.add("checked");
    moveItemToBottom(item);
  }
}

function moveItemToBottom(item) {
  list.appendChild(item);
}

function moveItemToNotChecked(item) {
  const firstCheckedItem = document.querySelector(".checked");
  if (firstCheckedItem) {
    list.insertBefore(item, firstCheckedItem);
  } else {
    list.insertBefore(item, list.firstChild);
  }
}
