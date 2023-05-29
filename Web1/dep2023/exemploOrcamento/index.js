function calcularOrcamento(){
    let idade = document.getElementById("idade");
    let email = document.getElementById("email");
    let plano = document.getElementById("plano").value;
    let frequencia = document.getElementById("frequencia").value;
    let preco = document.getElementById("preco");
    let desconto;
    let orcamento = 0;
    if(idade == ""){
        alert("Voce precisa digitar sua idade.")
    }

    if(plano == "Semestral"){
        desconto = 0.05;
    }
    if(frequencia == "2x"){
        orcamento = 200;
    }

    orcamento = orcamento * (1-desconto);

    preco.innerHTML = orcamento;
}