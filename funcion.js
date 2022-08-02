var fnace;
var salneto;
var txtVivienda;
var txtMonto;
var txtPlazo;
var txtTasa;
var nombre;
var email;
var pm;
function funcioncalc() {
    txtVivienda = document.getElementsByName("Valuehome")[0].value;
    txtMonto = document.getElementsByName("monto")[0].value;
    
	var labelError = document.getElementById("demo");

    var porc =(80 * parseFloat(txtVivienda)) / 100;
    if (parseFloat(txtMonto) >= porc) {
      labelError.innerHTML = " "; 
    }else{
       labelError.innerHTML = "El monto a solicitar debe ser como máximo el 80% del valor de la vivienda."; 
    }

  }
  function procesarCalculo() {

    var txtPM = document.getElementsByName("txtPM")[0];
    var txtINR = document.getElementsByName("txtINR")[0];
    var txtPF = document.getElementsByName("txtPF")[0];
    var lblValSalario = document.getElementById("lblValSalario");
    var lblValEdad = document.getElementById("lblValEdad");

    fnace = document.getElementsByName("fnace")[0].value;
    salneto = document.getElementsByName("salneto")[0].value;
    txtVivienda = document.getElementsByName("txtVivienda")[0].value;
    txtMonto = document.getElementsByName("txtMonto")[0].value;
    txtPlazo = document.getElementsByName("txtPlazo")[0].value;
    txtTasa = document.getElementsByName("txtTasa")[0].value;
    nombre = document.getElementsByName("nombre")[0].value;
    email = document.getElementsByName("email")[0].value;

//calculo de pago mensual
    pm = pago(parseFloat(txtTasa) / 12, parseInt(txtPlazo) * 12, parseFloat(txtMonto));

    txtPM.value = pm;
//calculo de salario minimo requerido
    txtINR.value = pm / 0.40;
	
//Calculo del porcentaje a financiar
    txtPF.value = (parseFloat(txtMonto) / parseFloat(txtVivienda))*100;

//validación de salario suficiente
    if (parseFloat(salneto) >= (pm / 0.40)) {
        lblValSalario.innerHTML = "Monto de salario suficiente para el crédito";
    }
    else {
        lblValSalario.innerHTML = "Monto de salario insuficiente";
    }

    var fn = new Date(fnace); //se obtiene la fecha que seleccionó el usuario
    var hoy = new Date(); // se obtiene la fecha del día de hoy
    var edad = hoy.getYear() - fn.getYear(); //calculo de la edad

//validación de la edad del cliente
	if (edad > 22 && edad < 55)
    {
        lblValEdad.innerHTML = "Cliente con edad suficiente para crédito";
    }
    else
    {
        lblValEdad.innerHTML = "Cliente no califica para crédito por edad";
    }

    guardarLocal();
}

function guardarLocal() {

    localStorage.setItem("fnace", fnace);
    localStorage.setItem("salneto", salneto);
    localStorage.setItem("txtVivienda", txtVivienda);
    localStorage.setItem("txtMonto", txtMonto);
    localStorage.setItem("txtPlazo", txtPlazo);
    localStorage.setItem("txtTasa", txtTasa);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("email", email);
}

function proyeccion()
{
    var interes = 0;
    var amortiza = 0;
    var htmlTabla = "";
    var saldo = parseFloat(txtMonto);
    var table = document.createElement('table');
    
    htmlTabla = "<caption>Proyección de Crédito</caption>";
    htmlTabla += "<tr>";
    htmlTabla += "<th>Periodo</th>";
    htmlTabla += "<th>Pago Mensual</th>";
    htmlTabla += "<th>Interes</th>";
    htmlTabla += "<th>Amortiza</th>";
    htmlTabla += "<th>Saldo</th>";
    htmlTabla += "</tr>";

    //calculo de pago mensual
    pm = pago(parseFloat(txtTasa) / 12, parseInt(txtPlazo) * 12, parseFloat(txtMonto));
	
    for (var i = 1; i <= parseInt(txtPlazo) * 12; i++) {
        registro = "";
        interes = pagoINT(parseFloat(txtTasa) / 12, i, parseInt(txtPlazo) * 12, parseFloat(txtMonto));
        amortiza = pm - interes;
        saldo = saldo - amortiza;
        htmlTabla += "<tr>";
        htmlTabla += "<td>" + i + "</td>";
        htmlTabla += "<td>" + pm.toLocaleString(); + "</td>";
        htmlTabla += "<td>" + interes.toLocaleString(); + "</td>";
        htmlTabla += "<td>" + amortiza.toLocaleString(); + "</td>";
        htmlTabla += "<td>" + saldo.toLocaleString(); + "</td>";
        htmlTabla += "</tr>";

    }
    table.innerHTML = htmlTabla;

    var div = document.getElementById('tblData');
    div.appendChild(table);

}

function recuperarLocal() {

    var getlocal = localStorage.getItem("fnace");

    if (getlocal != null && getlocal != "" && getlocal != false && getlocal != undefined)
    {
        document.getElementsByName("nombre")[0].value = localStorage.getItem("nombre");
        document.getElementsByName("email")[0].value = localStorage.getItem("email");
        document.getElementsByName("fnace")[0].value = localStorage.getItem("fnace");
        document.getElementsByName("salneto")[0].value = localStorage.getItem("salneto");
        document.getElementsByName("txtVivienda")[0].value = localStorage.getItem("txtVivienda");
        document.getElementsByName("txtMonto")[0].value = localStorage.getItem("txtMonto");
        document.getElementsByName("txtPlazo")[0].value = localStorage.getItem("txtPlazo");
        document.getElementsByName("txtTasa")[0].value = localStorage.getItem("txtTasa");
        procesarCalculo();
    }
}

function pagoINT(tasa, periodo, nper, montoIni) {

    var montoInteres = 0.00;
    montoInteres = interes(tasa, periodo, pago(tasa, nper, montoIni), montoIni);
    //alert(montoInteres);
    return montoInteres;

}

function pago(tasa, nper, montoIni) {

    var cuotaInicial = 0.00;
    var numerador = 0.00;
    var divisor = 0.00;
    var potencia = 0.00;

    potencia = Math.pow(1 + (tasa / 100), nper);
    numerador = montoIni * (tasa / 100) * potencia;
    divisor = potencia - 1;

    cuotaInicial = numerador / divisor;
    
    return cuotaInicial;
}

function interes(tasaMensual, mes, pagoMensual, montoSolicitado) {

    var vInteres = 0;
    var amortiza = montoSolicitado;

    for (var i = 1; i <= mes; i++)
    {
        vInteres = (amortiza * (tasaMensual / 100));
        amortiza = amortiza - (pagoMensual - vInteres);
    }
    return vInteres;
}





 