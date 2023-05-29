const tornarVerde = ()=>{
    let texto = document.getElementById("texto1");
    alert(texto.innerHTML);
    texto.className = 'texto-verde';
    document.write("Escrevendo diretamente no HTML");
}

const alertar = () =>{
    alert("Alertado");
}