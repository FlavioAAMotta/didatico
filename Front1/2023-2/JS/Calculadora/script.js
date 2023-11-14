const btnCalc = document.querySelector('#calcular');
const numero1 = document.getElementById('number1');
const numero2 = document.getElementById('number2');
const operacao = document.getElementById('operacao');
const resultado = document.getElementById('resultado');

btnCalc.addEventListener('click', mostrarNumeros)

function mostrarNumeros() {
    if(numero1.value == '' || numero2.value == ''){
        alert("Digite os dois numeros")
        return;
    }
    const number1AsNumber = Number(numero1.value);
    const number2AsNumber = Number(numero2.value);
    if (operacao.value == "+") {
        resultado.value = number1AsNumber + number2AsNumber
    } else if (operacao.value == "-") {
        resultado.value = number1AsNumber - number2AsNumber
    } else if (operacao.value == "/") {
        resultado.value = number1AsNumber / number2AsNumber
    } else if (operacao.value == "*") {
        resultado.value = number1AsNumber * number2AsNumber
    }else{
        alert("Operação inválida")
    }
}

// 2 == "2" true
// 2 === "2" false