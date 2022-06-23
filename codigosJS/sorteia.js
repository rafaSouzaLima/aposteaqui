var tentativa;
var numeroSorteado;
var premio;
var novoPremio;
var valMaximo;
var valMinimo;
var acabou;
var saldo;

function IniciaCfg(){
    tentativa = 1;
    document.getElementById("tentaSorteio").innerHTML = tentativa;
    document.getElementById("valMin").readOnly = false;
    document.getElementById("valMax").readOnly = false;
    document.getElementById("aposta").readOnly = true;

    document.getElementById("valMin").style.border = "2px solid #5a005a";
    document.getElementById("valMax").style.border = "2px solid #5a005a";
    document.getElementById("aposta").style.border = "2px solid #5a005a";

    document.getElementById("constMin").value = "";    
    document.getElementById("constMax").value = "";
    document.getElementById("numeroSorte").value = "";
    document.getElementById("statusPrem").value = "";
    document.getElementById("msgUsu").innerHTML = "VOCÊ AINDA NÃO ACERTOU!";

    document.getElementById("valMin").value = "";
    document.getElementById("valMax").value = "";
    document.getElementById("aposta").value = ""; 
    document.getElementById("botaoReinicia").style.display = "none"; 
    acabou = false;
}

function DefineMinMax(formJS){
    valMinimo = parseInt(formJS.valMin.value);
    valMaximo = parseInt(formJS.valMax.value);
    if(!isNaN(valMinimo) && !isNaN(valMaximo) && tentativa == 1){
        formJS.valMin.style.border = "2px #00e08a solid"; 
        formJS.valMax.style.border = "2px #00e08a solid";
        if(valMinimo > valMaximo){
            let aux = valMinimo;
            valMinimo = valMaximo;
            valMaximo = aux;
        }

        formJS.valMin.readOnly = true;
        formJS.valMax.readOnly = true;
        formJS.aposta.readOnly = false;

        document.getElementById("constMin").value = valMinimo;    
        document.getElementById("constMax").value = valMaximo;

        premio = DefinePremio(valMinimo, valMaximo);

        document.getElementById("statusPrem").value = "R$" + premio.toFixed(2);
    }
    else if(isNaN(valMinimo) && !isNaN(valMaximo)){ //Erro, digite novamente
        formJS.valMin.value = "";
        formJS.valMin.style.border = "2px red solid"; 
        formJS.valMax.style.border = "2px #00e08a solid"; 
    }
    else if(!isNaN(valMinimo) && isNaN(valMaximo)){
        formJS.valMax = ""; 
        formJS.valMax.style.border = "2px red solid";
        formJS.valMin.style.border = "2px #00e08a solid";
    }
    else if(isNaN(valMaximo) && isNaN(valMaximo)){
        formJS.valMin.value = "";
        formJS.valMax.value = ""; 
        formJS.valMin.style.border = "2px red solid";
        formJS.valMax.style.border = "2px red solid";
    }
}
function TestaAposta(formJS){
    var aposta = parseInt(formJS.aposta.value);

    if(!isNaN(aposta) && !isNaN(valMinimo) && !isNaN(valMaximo) && acabou == false){
        formJS.aposta.style.border = "2px #00e08a solid";

        if(tentativa == 1){
            numeroSorteado = NumeroAleatorioIntervalo(valMinimo, valMaximo);
            novoPremio = premio;
        }

        document.getElementById("numeroSorte").value = "X";

        if(numeroSorteado != aposta){
            novoPremio = CalculaPremioFinal(premio, tentativa, (valMaximo - valMinimo + 1));
            document.getElementById("statusPrem").value = "R$" + novoPremio.toFixed(2);
        }


        if(numeroSorteado == aposta && novoPremio > 0.00){
            document.getElementById("msgUsu").innerHTML = "PARABÉNS, VOCÊ GANHOU!";
            document.getElementById("numeroSorte").value = numeroSorteado;
            acabou = true;

            document.getElementById("saldoJogador").value = "R$" + (parseFloat((document.getElementById("saldoJogador").value).slice(2)) + novoPremio).toFixed(2);

            setTimeout(MostraBotaoReinicia, 2000);
        }
        else if(numeroSorteado != aposta && novoPremio > 0.00){
            document.getElementById("msgUsu").innerHTML = "VOCÊ AINDA NÃO ACERTOU!";
            formJS.aposta.value = "";

            tentativa++;
            document.getElementById("tentaSorteio").innerHTML = tentativa;
        }
        else if(novoPremio == 0.00){
            document.getElementById("msgUsu").innerHTML = "VOCÊ PERDEU!";
            document.getElementById("numeroSorte").value = numeroSorteado;
            acabou = true;

            setTimeout(MostraBotaoReinicia, 2000);                
        }
    }
    else if(isNaN(aposta) && !isNaN(valMinimo) && !isNaN(valMaximo)){
        formJS.aposta.value = "";
        formJS.aposta.style.border = "2px red solid";
    }
}
function NumeroAleatorioIntervalo(min, max) {
    var numero = Math.floor(Math.random() * (max - min + 1)) + min;
    return numero;
}
function DefinePremio(min, max){
    let intervalo = max - min + 1;

    if(intervalo < 5){
        return 0;
    }
    else if(intervalo >= 5 && intervalo <= 20){
        return 10;
    }
    else if(intervalo > 20 && intervalo <= 50){
        return 100;
    }
    else if(intervalo > 50 && intervalo <= 100){
        return 500;
    }
    else if(intervalo > 100){
        return 1000;
    }
    return "ERROR";
}
function CalculaPremioFinal(premioDef, tent, interval){
    let result;
    result = premioDef - (tent * premioDef)/(interval - 1);
    return result;
}
function MostraBotaoReinicia(){
    document.getElementById("botaoReinicia").style.display = "block";
}