// Variables globales
var db = null;

// Inicio página, una vez que la librería PhoneGap está cargada
 function init(){
	 //alert('Estoy en la función init');
	 document.addEventListener("deviceready", dispositivoListo, false);
}

//Dispositivo listo para ejecutar PhoneGap
function dispositivoListo(){
	//alert('Dispositivo Listo');
	db = window.openDatabase("mParkingDB", "1.0", "DB MParking", 2048000);
	creaTablasDB();
	//cargarVehiculosInicio();
	//Inicialización JQM
	//$(document).on("mobileinit", function () {
	//	$.mobile.allowCrossDomainPages = true;
	//	$.support.cors = true;
	//	$.mobile.page.prototype.options.backBtnText = "Atrás";
	//});
	
	//Inicialización de páginas
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
	
	//asignación gestor de evento "click" a botones
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

//Error en la ejecución de la sentencia SQL
function errorCT(error){
	//Registrar en el log
	console.log("creaTablas - Error al procesar SQL: Error: " + error.code + ' ' + error.message);
}

//Ejecución sentencia SQL ok
function successCT(){
	//Registrar en el log
	console.log("creaTablas - Transacción SQL ejecutada con éxito!");	
}