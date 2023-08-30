function calcular() {
    let elemento1 = document.getElementById("num1");
    let op = document.getElementById("op");
    let elemento2 = document.getElementById("num2");

    let num1 = Number(elemento1.value);
    let num2 = Number(elemento2.value);
    let operacao = op.value;
    let elementoResultado = document.getElementById("result");

    // 1 === "1" -> false
    // 1 === 1 -> true
    // 1 == "1" -> true
    // 1 == 1 -> true
    if (operacao === "add") {
        elementoResultado.value = num1 + num2;
    } else if (operacao === "sub") {
        elementoResultado.value = num1 - num2;
    } else if (operacao === "mul") {
        elementoResultado.value = num1 * num2;
    } else if (operacao === "div") {
        elementoResultado.value = num1 / num2;
    } else {
        elementoResultado.value = "NaN";
    }

    elemento1.value = "";
    elemento2.value = "";
    op.value="";

}