var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicialiaCronometro();
    $("#botao-reiniciar").on("click", reiniciaJogo());
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
};

function inicializaContadores(){
    campo.on("input", function() {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
    
};

function inicialiaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){
    var contador = setInterval(function(){
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        if(tempoRestante < 1){
            campo.attr("disabled", true);
            clearInterval(contador);
            campo.addClass("campo-desativado");
        }
    }, 1000)
    });
};


function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicialiaCronometro();
}

$("#botao-reiniciar").on("click", reiniciaJogo);


///////// Sintaxe opcional click:

// $("#botao-reiniciar").click(function(){
//     console.log("Botao clicadooooo!");
// });