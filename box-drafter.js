jQuery(function($) { 
var iniciado = false;
var boxWidth = $("#box-draft").outerWidth();
var boxHeight = $("#box-draft").innerHeight();
var divInterna = [];
    
var posAtual = [];
var topo;
var fundo;
var cantoEsquerdo;
var cantoDireito;
var cima;
var baixo;
var esquerda;
var direita;
var blocoInterno = 'box-draft-interna';

$(document).ready( function() {
		for (var i = 0; i < 29; i++) {
			for(var j = 0; j < 66; j++){
				divInterna.push("<div id='" + blocoInterno + '-' + i.toString() + "-" + j.toString() + "' class='box-draft-interna'></div>");
			}
		}
        $("#box-draft").append(divInterna);
        $(".box-draft-interna").first().addClass('selecionado');
    
        setValores();
});
    
function setValores(){
    topo = posAtual[0] == 0;
    fundo = posAtual[0] == 28;
    cantoEsquerdo = posAtual[1] == 0;
    cantoDireito = posAtual[1] == 65;
    cima = (parseInt(posAtual[0]) - 1) + '-' + posAtual[1];
    baixo = (parseInt(posAtual[0]) + 1) + '-' + posAtual[1]; 
    esquerda = posAtual[0] + '-' + (parseInt(posAtual[1]) - 1);
    direita = posAtual[0] + '-' + (parseInt(posAtual[1]) + 1);    
};
	
$(document).keydown(function(e) {
switch(e.which) {
        
    case 32: // space
        inserirSimbolo();
        break;
        
	case 37: // left
	   moveParaEsquerda();
	   break;

	case 38: // up
    	moveParaCima();
	   break;

	case 39: // right
	   moveParaDireita();
	   break;

	case 40: // down
	   moveParaBaixo();
	   break;
        
    case 8: //backspace
        apaga();
        break;

	default: return; // exit this handler for other keys
}
    
	e.preventDefault(); // prevent the default action (scroll / move caret)
});
    
function inserirSimbolo() {
    var selecionado = $('.selecionado');
    obtemPosAtual();
    
    selecionado.hasClass('rabiscado') ? comRabisco(selecionado) : semRabisco(selecionado);
    atualizaBlocos();
};
    
function comRabisco(selecionado) {
    if (selecionado.text() == '-'){
        selecionado.text('=');
    } else if (selecionado.text() == '+') {
        selecionado.text('#');
    } else {
        selecionado.text('');
        selecionado.removeClass('rabiscado');
    }
}
    
function semRabisco(selecionado) {
    
    if (!topo && !fundo && !cantoEsquerdo && !cantoDireito) {
        if (possuiVizinhoVertical()) {
            selecionado.text('+');
        } else {
            selecionado.text('-');
        }
    }
    
    selecionado.addClass('rabiscado');
}
    
function atualizaBlocos(){
        $('.rabiscado').each( function( index ) {
            var id = $( this ).attr('id');
            var idPos = id.match(/\d{1,2}-\d{1,2}/g);
            idPos = idPos[0].split('-');
            
            c = (parseInt(idPos[0]) - 1) + '-' + idPos[1];
            b = (parseInt(idPos[0]) + 1) + '-' + idPos[1]; 
            
            var temVizinhos = possuiVizinhoVertical(c, b);
            
            if (!temVizinhos) {
                if ($(this).text() == '+') {
                    $(this).text('-');
                } else if ( $(this).text() == '#' ) {
                    $(this).text('=');
                }
            } else {
                if ($(this).text() == '-') {
                    $(this).text('+');
                } else if ($(this).text() == '='){
                    $(this).text('#');
                }
            }
        });
}
    
function possuiVizinhoVertical(c, b) {
    if (undefined === c || undefined === b) {
        return $('#' + blocoInterno + '-' + cima).hasClass('rabiscado') || $('#' + blocoInterno + '-' + baixo).hasClass('rabiscado');   
    } else {
        return $('#' + blocoInterno + '-' + c).hasClass('rabiscado') || $('#' + blocoInterno + '-' + b).hasClass('rabiscado');   
    }
}

function moveParaEsquerda(){
    obtemPosAtual();
    if(cantoEsquerdo){
        alert('Movimento invalido!');
    }else{
        $('.selecionado').removeClass('selecionado');
        $('#' + blocoInterno + '-' + esquerda).addClass('selecionado');
    }
};

function moveParaDireita(){
	obtemPosAtual();
    if(cantoDireito){
        alert('Movimento invalido!');
    }else{
        $('.selecionado').removeClass('selecionado');
        $('#' + blocoInterno + '-' + direita).addClass('selecionado');
    }
};

function moveParaCima(){
	obtemPosAtual();
    if(topo){
        alert('Movimento invalido!');
    }else{
        $('.selecionado').removeClass('selecionado');
        $('#' + blocoInterno + '-' + cima).addClass('selecionado');
    }
};

function moveParaBaixo(){
    obtemPosAtual();
    if(fundo){
        alert('Movimento invalido!');
    }else{
        $('.selecionado').removeClass('selecionado');
        $('#' + blocoInterno + '-' + baixo).addClass('selecionado');
    }
};
    
function apaga(){
    var selecionado = $('.selecionado');
    obtemPosAtual();
    
    if(selecionado.hasClass('rabiscado')) {
        selecionado.text('');
        selecionado.removeClass('rabiscado');
        atualizaBlocos();
    } else {
        alert('Nada para apagar.');
    }

}
    
function obtemPosAtual(){
    var selecionado = $('.selecionado').attr('id');
    posAtual = selecionado.match(/\d{1,2}-\d{1,2}/g);
    posAtual = posAtual[0].split('-');
    setValores();
}

});