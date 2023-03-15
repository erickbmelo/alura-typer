$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $.get("http://localhost:3000/frases-url-errada-teste", trocaFraseAleatoria)
    .fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").toggle();
        }, 1500);
    });
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}