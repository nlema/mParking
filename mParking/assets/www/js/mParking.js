// Variables globales
var db = null;

// Inicio p�gina, una vez que la librer�a PhoneGap est� cargada
 function init(){
	 //alert('Estoy en la funci�n init');
	 document.addEventListener("deviceready", dispositivoListo, false);
}

//Dispositivo listo para ejecutar PhoneGap
function dispositivoListo(){
	//alert('Dispositivo Listo');
	db = window.openDatabase("mParkingDB", "1.0", "DB MParking", 2048000);
	creaTablasDB();
	//cargarVehiculosInicio();
	//Inicializaci�n JQM
	//$(document).on("mobileinit", function () {
	//	$.mobile.allowCrossDomainPages = true;
	//	$.support.cors = true;
	//	$.mobile.page.prototype.options.backBtnText = "Atr�s";
	//});
	
	//Inicializaci�n de p�ginas
	$('#paginaInicio').on('pageshow', function() {
		//alert("Estoy en el pageshow de paginaInicio");
		//cargarVehiculosInicio();
	} );
	$('#paginaVehiculos').on( 'pageinit', function() {
		//cargarVehiculosDesdeDB();
	} );
	$('#paginaAgregarVehiculo').on( 'pageshow', function() {
		$('#ctMatricula').focus();
	} );
	
	//asignaci�n gestor de evento "click" a botones
	$(document).on( 'vclick', '#btnAgregarVehiculo', function() {
		$.mobile.changePage('#paginaAgregarVehiculo');
	} );
	$(document).on( 'vclick', '#btnAceptarVehiculo', function() {
		//agregarVehiculo();
	} );
}

function creaTablasDB(){
	db.transaction(creaTablas, errorCT, successCT);
}

function creaTablas(tx){
	//tx.executeSql('DROP TABLE IF EXISTS Autos');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Vehiculos (Matricula STRING PRIMARY KEY, Marca, Modelo, Preferido BOOLEAN)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Historial (IdHistorial INTEGER PRIMARY KEY, Fecha, Tiempo, Hora)');
}

//Error en la ejecuci�n de la sentencia SQL
function errorCT(error){
	//Registrar en el log
	console.log("creaTablas - Error al procesar SQL: Error: " + error.code + ' ' + error.message);
}

//Ejecuci�n sentencia SQL ok
function successCT(){
	//Registrar en el log
	console.log("creaTablas - Transacci�n SQL ejecutada con �xito!");	
}