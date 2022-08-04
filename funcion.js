var fechanac;
var salneto;
var txtVivienda;
var txtMonto;
var txtPlazo;
var txtTasa;
var nombre;
var email;
var pagoMensual;
function funcioncalc() {
    txtVivienda = document.getElementsByName("txtVivienda")[0].value;
    txtMonto = document.getElementsByName("txtMonto")[0].value;
    
	var labelError = document.getElementById("demo");

    var porc =(80 * parseFloat(txtVivienda)) / 100;
    if (parseFloat(txtMonto) >= porc) {
      labelError.innerHTML = " "; 
    }else{
       labelError.innerHTML = "El monto a solicitar debe ser como máximo el 80% del valor de la vivienda."; 
    }

  }
  function calcular() {

    var txtPagoMensual = document.getElementsByName("txtPagoMensual")[0];
    var txtIgresoNeto = document.getElementsByName("txtIgresoNeto")[0];
    var txtPorce = document.getElementsByName("txtPorce")[0];
    var lblValSalario = document.getElementById("lblValSalario");
    var lblValEdad = document.getElementById("lblValEdad");

    fechanac = document.getElementsByName("fechanac")[0].value;
    salneto = document.getElementsByName("salneto")[0].value;
   
    txtPlazo = document.getElementsByName("txtPlazo")[0].value;
    txtTasa = document.getElementsByName("txtTasa")[0].value;
    nombre = document.getElementsByName("nombre")[0].value;
    email = document.getElementsByName("email")[0].value;


    pagoMensual = pago(parseFloat(txtTasa) / 12, parseInt(txtPlazo) * 12, parseFloat(txtMonto));

    txtPagoMensual.value = pagoMensual;

    txtIgresoNeto.value = pagoMensual / 0.40;
	

    txtPorce.value = (parseFloat(txtMonto) / parseFloat(txtVivienda))*100;


    if (parseFloat(salneto) >= (pagoMensual / 0.40)) {
        lblValSalario.innerHTML = "Monto de salario suficiente para el crédito";
    }
    else {
        lblValSalario.innerHTML = "Monto de salario insuficiente";
    }

    var fn = new Date(fechanac); 
    var hoy = new Date(); 
    var edad = hoy.getYear() - fn.getYear(); 


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

    localStorage.setItem("fechanac", fechanac);
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

   
    pagoMensual = pago(parseFloat(txtTasa) / 12, parseInt(txtPlazo) * 12, parseFloat(txtMonto));
	
    for (var i = 1; i <= parseInt(txtPlazo) * 12; i++) {
        registro = "";
        interes = pagoInteres(parseFloat(txtTasa) / 12, i, parseInt(txtPlazo) * 12, parseFloat(txtMonto));
        amortiza = pagoMensual - interes;
        saldo = saldo - amortiza;
        htmlTabla += "<tr>";
        htmlTabla += "<td>" + i + "</td>";
        htmlTabla += "<td>" + pagoMensual.toLocaleString(); + "</td>";
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

    var getlocal = localStorage.getItem("fechanac");

    if (getlocal != null && getlocal != "" && getlocal != false && getlocal != undefined)
    {
        document.getElementsByName("nombre")[0].value = localStorage.getItem("nombre");
        document.getElementsByName("email")[0].value = localStorage.getItem("email");
        document.getElementsByName("fechanac")[0].value = localStorage.getItem("fechanac");
        document.getElementsByName("salneto")[0].value = localStorage.getItem("salneto");
        document.getElementsByName("txtVivienda")[0].value = localStorage.getItem("txtVivienda");
        document.getElementsByName("txtMonto")[0].value = localStorage.getItem("txtMonto");
        document.getElementsByName("txtPlazo")[0].value = localStorage.getItem("txtPlazo");
        document.getElementsByName("txtTasa")[0].value = localStorage.getItem("txtTasa");
        calcular();
    }
}

function pagoInteres(tasa, periodo, nper, montoIni) {

    var montoInteres = 0.00;
    montoInteres = interes(tasa, periodo, pago(tasa, nper, montoIni), montoIni);
    
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





 
