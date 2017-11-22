//Funciones
var calculadora = (function(){

    var pantalla = document.getElementById("display");
    var valor1 = 0.0;
    var valor2 = 0.0;
    var tipoOperacion = "";
    var banderaIgual = 0;

    return{
        //Cambia el tamano de la tecla pulsada
        tamanoTeclas: {
            pequena: function(teclaId) {
                if (teclaId == "mas") {
                    document.getElementById(teclaId).style.height = "99%";
                } else {
                    document.getElementById(teclaId).style.height = "60px";
                }
            },
            grande: function(teclaId){
                if (teclaId == "mas") {
                    document.getElementById(teclaId).style.height = "100%";
                } else {
                    document.getElementById(teclaId).style.height = "62.91px";
                }
            }
        },
        //Funcion para mostrar numero en pantalla e identificar operacion a realizar
        mostrarNum: function(teclaId) {
            if(teclaId == "0" || teclaId == "1" || teclaId == "2" || teclaId == "3" || teclaId == "4" || teclaId == "5" || teclaId == "6" || teclaId == "7" || teclaId == "8" || teclaId == "9" || teclaId == "punto" || teclaId == "sign" ){

                banderaIgual = 0;

                var valorActualMostrado = pantalla.innerHTML;

                if(valorActualMostrado == "0" && teclaId != "punto" && teclaId != "sign"){
                    pantalla.innerHTML = teclaId;
                }else if(valorActualMostrado == "0" && teclaId == "punto"){
                    pantalla.append(".");
                }else if(valorActualMostrado != "0" && teclaId != "punto" && teclaId != "sign" && valorActualMostrado.length < 8){
                    pantalla.append(teclaId);
                }else if(valorActualMostrado.indexOf(".") < 0 && teclaId == "punto"){
                    pantalla.append(".");
                }else if(valorActualMostrado != "0" && teclaId == "sign" && valorActualMostrado.indexOf("-") < 0){
                    valorActualMostrado = "-" + valorActualMostrado;
                    pantalla.innerHTML = valorActualMostrado;
                }else if(teclaId == "sign" && valorActualMostrado.indexOf("-") == 0){
                    valorActualMostrado = valorActualMostrado.slice(1);
                    pantalla.innerHTML = valorActualMostrado;
                }

            }else if(teclaId == "on"){

                pantalla.innerHTML = "0";
                banderaIgual = 0;

            }else if(teclaId == "mas"){

                valor1 = parseFloat(pantalla.innerHTML);
                pantalla.innerHTML = "";
                tipoOperacion = "+";

            }else if(teclaId == "por"){

                valor1 = parseFloat(pantalla.innerHTML);
                pantalla.innerHTML = "";
                tipoOperacion = "*";

            }else if(teclaId == "menos"){

                valor1 = parseFloat(pantalla.innerHTML);
                pantalla.innerHTML = "";
                tipoOperacion = "-";

            }else if(teclaId == "dividido"){

                valor1 = parseFloat(pantalla.innerHTML);
                pantalla.innerHTML = "";
                tipoOperacion = "/";

            }else if(teclaId == "igual"){

                if(banderaIgual == 0){
                    valor2 = parseFloat(pantalla.innerHTML);
                }

                if(tipoOperacion == "+"){
                    var valorCalculado = calculadora.operaciones.suma(valor1, valor2);
                    valorCalculado = valorCalculado.toString();
                    if(valorCalculado.length > 8){
                        valorCalculado = valorCalculado.slice(0,8);
                    }
                    pantalla.innerHTML = valorCalculado;
                    valor1 = parseFloat(pantalla.innerHTML);
                    banderaIgual++;
                }else if(tipoOperacion == "-"){
                    var valorCalculado = calculadora.operaciones.resta(valor1, valor2);
                    valorCalculado = valorCalculado.toString();
                    if(valorCalculado.length > 8){
                        valorCalculado = valorCalculado.slice(0,8);
                    }
                    pantalla.innerHTML = valorCalculado;
                }else if(tipoOperacion == "*"){
                    var valorCalculado = calculadora.operaciones.multiplicacion(valor1, valor2);
                    valorCalculado = valorCalculado.toString();
                    alert(valorCalculado);
                    if(valorCalculado.length > 8){
                        valorCalculado = valorCalculado.slice(0,8);
                    }
                    pantalla.innerHTML = valorCalculado;
                }else if(tipoOperacion == "/"){
                    var valorCalculado = calculadora.operaciones.division(valor1, valor2);
                    valorCalculado = valorCalculado.toString();
                    if(valorCalculado.length > 8){
                        valorCalculado = valorCalculado.slice(0,8);
                    }
                    pantalla.innerHTML = valorCalculado;
                }

            }
        },
        //funciones para suma, resta, multiplicacion, division
        operaciones:{
            suma: function(val1, val2){
                return val1 + val2;
            },
            resta: function(val1, val2){
                return val1 - val2;
            },
            multiplicacion: function(val1, val2){
                return val1 * val2;
            },
            division: function(val1, val2){
                return val1 / val2;
            }
        }
    };

})();
//Detecta que tecla fue clickeada
var teclado = document.querySelector('.teclado');
function botonInClick(e) {
    calculadora.tamanoTeclas.pequena(e.target.id);
}
function botonOutClick(e) {
    calculadora.tamanoTeclas.grande(e.target.id);
}
function botonClick(e) {
    calculadora.mostrarNum(e.target.id);
}
teclado.addEventListener("mousedown", botonInClick);
teclado.addEventListener("mouseup", botonOutClick);
teclado.addEventListener("click", botonClick);

