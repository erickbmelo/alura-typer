var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicialiaCronometro();
    inicializaMarcadores();
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
            clearInterval(contador);
            finalizaJogo();
        }
    }, 1000)
    });
};

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.addClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores(){
    var frase = $(".frase").text();
campo.on("input", function(){
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);
    if(digitado == comparavel){
        campo.addClass("campo-correto");
        campo.removeClass("campo-errado");
    }else{
        campo.addClass("campo-errado");
        campo.removeClass("campo-correto");
    }
});
};

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Erick";
    var numPalavras = $("#contador-palavras").text();

    var linha = "<tr>"+
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ numPalavras + "</td>"+
                "</tr>";

    corpoTabela.prepend(linha);
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicialiaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("campo-correto");
    campo.removeClass("campo-errado");
}

$("#botao-reiniciar").on("click", reiniciaJogo);
