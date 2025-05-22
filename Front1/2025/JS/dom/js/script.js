// // const botao = document.getElementById("change-button");
// // const intros = document.getElementsByClassName("intro");

// let texto = document.getElementsByTagName('p')[0];

// console.log(texto.textContent);
// console.log(texto.innerHTML);
// // Isso significa que sao a mesma coisa?]

// const tag = document.querySelector("#main-content");
// console.log("-----------textContent------------------")
// console.log(tag.textContent);
// console.log("-----------innerHTML------------------")
// console.log(tag.innerHTML);

function alterar() {
    let texto = document.getElementsByTagName('p')[0];
    texto.textContent = "novo texto";
}