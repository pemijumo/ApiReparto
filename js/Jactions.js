var CodArt = []; var NomArt = [];
//var urlDOM = ""; var Publi = 0;
//var urlDOM = "http://192.168.2.100:80/"; var Publi = 1;
 // var urlDOM = "http://192.168.2.204:70/"; var Publi = 1;

/*CÓDIGO - ALAN TORRES 
var urlDOMAUX = "http://187.237.98.114:80/"; var Publi = 1;
var urlWcfAUX = "http://187.237.98.114:100/wcf/WcfServiceLibrary1.Json.svc/"; 
var urlDOM    = ""; 
// var urlWcf    = ""; 
var urlDOM2    = "http://189.203.180.22:80/"; var Publi = 1; //activa
var urlWcf2    = "http://189.203.180.22:100/wcf/WcfServiceLibrary1.Json.svc/"; //activa

// var urlWcf = "http://192.168.2.100:100/wcf/WcfServiceLibrary1.Json.svc/"; 
// var urlWcf = "http://192.168.2.236/ws/WcfServiceLibrary1.Json.svc/"; 
 // var urlWcf = "http://192.168.2.204/FFF/WcfServiceLibrary1.Json.svc/"; 
var urlWcf = "http://localhost:8732/Design_Time_Addresses/WcfServiceLibrary1/Json/"; 
*/


var urlDOMAUX = "http://192.168.2.204:80/"; var Publi = 1;
var urlWcfAUX = "http://192.168.2.204:60/WcfServiceLibrary1.Json.svc/"; 
var urlDOM    = ""; 
// var urlWcf    = ""; 
var urlDOM2    = "http://192.168.2.204:80/"; var Publi = 1; //activa
var urlWcf2    = "http://192.168.2.204:60/WcfServiceLibrary1.Json.svc/"; //activa

// var urlWcf = "http://192.168.2.100:100/wcf/WcfServiceLibrary1.Json.svc/"; 
// var urlWcf = "http://192.168.2.236/ws/WcfServiceLibrary1.Json.svc/"; 
 // var urlWcf = "http://192.168.2.204/FFF/WcfServiceLibrary1.Json.svc/"; 
var urlWcf = "http://localhost:8732/Design_Time_Addresses/WcfServiceLibrary1/Json/"; 


var Latitud = 0; var Longitud = 0;
 var LatitudReparto = 0; var LongitudReparto = 0;
 var LatitudComida = 0; var LongitudComida = 0;
 var EnvioReparto =0;
 var EnvioComida =0;
 var clickCoordenadas = 0;
 var tiempoEspera = 10000;//15000;
 var tiempoSincroniza = 500000;
 options = { maximumAge: 500000,timeout: 20000,enableHighAccuracy: true}; // tiempos de respuesta de gps

var opcionDescuento = 0;//0:mayoreo 1:transporte
$(document).bind("pageinit", function () {
   //MuestraRepartidor();
   $("#configura").click(function (){
            var ipServidor = window.localStorage.getItem("IPServidor");
            if(ipServidor == null || ipServidor ==""){
                $("#AXTEL").addClass('operando');
              }
              else{
                if(ipServidor == "TELMEX"){
                  $("#"+ipServidor).addClass('operando');            
                }
                if(ipServidor== "AXTEL"){
                  $("#"+ipServidor).addClass('operando');          
                }
              }
        $("#divConfigura").show();
        setTimeout(function(){
            $("#divConfigura").hide();
        },10000)
   });
   $(".botonConfigura").click(function (){
        var id = $(this).attr('id');
        //alert(id);
        $("#divConfigura").hide();
        $(".botonConfigura").removeClass('operando');
        $(this).addClass('operando');
        if(id == "TELMEX"){
          $("#TELMEX").addClass('operando');
          urlDOM = "http://187.237.98.114:80/"; 
          urlWcf = "http://187.237.98.114:100/wcf/WcfServiceLibrary1.Json.svc/"; 
        }
        if(id== "AXTEL"){
          $("#AXTEL").addClass('operando');
          urlDOM = "http://189.203.180.22:80/";
          urlWcf = "http://189.203.180.22:100/wcf/WcfServiceLibrary1.Json.svc/"; 
        }
        window.localStorage.removeItem("IPServidor");
        window.localStorage.setItem("IPServidor", id);
   });
    // MuestraRepartidor();
    //window.localStorage.removeItem('inicioRuta');
    var f = new Date();  
        $('#fechaIni').val(fechaFormato(f));
        $('#fechaFinal').val(fechaFormato(f));
    consultarClientesVendedores();
    $.datepicker.regional['es'] = {
         closeText: 'Cerrar',
         prevText: '<Ant',
         nextText: 'Sig>',
         currentText: 'Hoy',
         monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
         monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
         dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
         dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
         dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
         weekHeader: 'Sm',
         dateFormat: 'yy/mm/dd',
         firstDay: 1,
         isRTL: false,
         showMonthAfterYear: false,
         yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
    $( ".datepicker" ).datepicker();

    $( 'body,html' ).on( "click",".rutasVendedor", function(event) {
     event.preventDefault();
       var idRuta=$(this).attr('title');
      // alert(idRuta);
        ConsultaStatusRutaFactura(idRuta);
    });

    //ObtenerDatosIP();
    if (Publi == 1) {
        document.addEventListener("backbutton", handleBackButton, true);

        function handleBackButton() {

            if ($.mobile.activePage.attr('id') == 'inicio' || $.mobile.activePage.attr('id') == 'home') {
                navigator.app.exitApp();
            }
            //else {
            //    navigator.app.backHistory();
            //}          
        }
    }

    var Ident = "";
	$("#radioDescuento").hide();

    $("#btnBusqArt").bind("click", function (event, ui) {
        var Codigo = '';
		
		var codigoNombre = $("#txtItemCode").val();
		codigoNombre = codigoNombre.trim();	
		if(codigoNombre!='')
		{
			var divide = codigoNombre.split('//');
			Codigo = divide[0];
		}
        if (Publi == 1) {
            $.mobile.loading('show', {
                text: 'Consultando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });
        }
        VerificaDescripcionArticulo(Codigo);
		// ConsultaListaPreciosV2(Codigo);
		// ConsultaDescuento(Codigo);
		

    });

   

    $(".btnSalir").bind("click", function (event, ui) {
        window.localStorage.removeItem("ID");
        window.localStorage.removeItem("Us");
        window.localStorage.removeItem("Rl");
        LimpiaCodArtNoExistente();
        $("#txtItemCode").val('');
        $("#txtNombreArticulo").val('');
        $("#nombredeusuario").val('');
        $("#clave").val('');
        if (Publi == 1) {
            $.mobile.changePage("login.html")
        }
        else {
            location.href = 'login.html';
        }


    });

    $("#btnLogout").bind("click", function (event, ui) {
        window.localStorage.removeItem("ID");
        window.localStorage.removeItem("Us");
        window.localStorage.removeItem("Rl");
        LimpiaCodArtNoExistente();
        $("#txtItemCode").val('');
        $("#nombredeusuario").val('');
        $("#clave").val('');
        if (Publi == 1) {
            navigator.app.exitApp();
        }
        else {
            window.onbeforeunload = true;
        }
    });

    $("#botonLogin").bind("click", function (event, ui) {

        var datosUsuario = $("#nombredeusuario").val()
        var datosPassword = $("#clave").val()
        var UserName = "";
        UserName = window.localStorage.getItem('Us')
        if (Publi == 1) {
            $.mobile.loading('show', {
                text: 'Consultando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });

            Ident = /*device.model + "/" +*/device.uuid;
            // recolecta los valores del usuario que se esta logueando

            var devID = window.localStorage.getItem('ID')
            if (devID == "" || devID == null) {
                //Se consulta al usuario en BD
                $.ajax({
                    url: urlDOM + "CS.aspx/ObtenerUsuario",
                    data: "{ NombreUsuario: '" + datosUsuario + "', Contrasenha:'" + datosPassword + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        UserName = data.d.NombreUsuario;
                        if (data.d.NombreUsuario != null && data.d.NombreUsuario != "") {
                            window.localStorage.removeItem("ID");
                            window.localStorage.removeItem("Us");
                            window.localStorage.removeItem("Rl");

                            window.localStorage.setItem("ID", Ident);
                            window.localStorage.setItem("Us", UserName);
                            window.localStorage.setItem("Rl", data.d.Rol);

                            $.mobile.changePage("index.html")
                            $.mobile.loading("hide");
                            // if(data.d.Rol == 3 ){
                            //     $("#coordenadas").css('display','block');
                            //     $("#entregaReparto").css('display','none');
                            //     $("#catalogoProductos").css('display','block');
                            // }
                            // if(data.d.Rol == 5 ){
                            //     $("#coordenadas").css('display','none');
                            //     $("#catalogo").css('display','none');
                            //     $("#catalogoProductos").css('display','none');
                            //     $("#entregaReparto").css('display','block');
                            //     $.mobile.changePage("#reparto")
                            // }
                            // if(data.d.Rol == 1 ){
                            //     $("#catalogoProductos").css('display','block');

                            // }
                            MuestraRepartidor();

                        }
                        else {

                            alert("Usuario o contraseña invalida");
                            $.mobile.loading("hide");
                        }
                    }
                });
            }
            else if (username == Ident) {
                $.mobile.changePage("index.html");
                MuestraRepartidor();
                $.mobile.loading("hide");
            }
        }
        else {
            //es en aplic de escritorio solo validar el usuario
            if (UserName == datosUsuario) {
                //Se consulta al usuario en BD
                $.ajax({
                    url: urlDOM + "CS.aspx/ObtenerUsuario",
                    data: "{ NombreUsuario: '" + datosUsuario + "', Contrasenha:'" + datosPassword + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        UserName = data.d.NombreUsuario;
                        if (data.d.NombreUsuario != null && data.d.NombreUsuario != "") {
                            window.localStorage.removeItem("ID");
                            window.localStorage.removeItem("Us");
                            window.localStorage.removeItem("Rl");

                            window.localStorage.setItem("ID", Ident);
                            window.localStorage.setItem("Us", UserName);
                            window.localStorage.setItem("Rl", data.d.Rol);

                            location.href = 'index.html';
                        }
                        else {
                            alert("Usuario o contraseña invalida");
                        }
                    }
                });
            }
            else if (UserName != null) {
                location.href = 'index.html';
            }
        }
        return false;
    });

      

    $("#btnLimpArt").bind("click", function (event, ui) {
        $("#txtItemCode").val('');
        $("#txtNombreArticulo").val('');
        $("#txtPrecio").val('');
        $("#txtUtilidad").val('');
        $("#sDescripcionArticulo").text('');

        $("#txtPorcientoDesc").val('');
        $("#txtPrecioDescuentoMXP").val('');
        $("#txtUtilidadDescuentoMXP").val('');
        $("#txtPrecioDescuentoUSD").val('');
        $("#txtUtilidadDescuentoUSD").val('');

        //--------------------------------------
        var htmlTable = '';
        $("#tblLista").html('');
        $("#tblLista").html(htmlTable);

        $("#tblListaStock").html('');
        $("#tblListaStock").html(htmlTable);
        $('#idInformacion').css('display', 'none');

        if (Publi == 1) {
            $.mobile.loading('hide');
        }

    });

    $("#btnLimpCli").bind("click", function (event, ui) {
        $("#cliente").val('');
        $("#nombreC").val('');
        $("#descripcionC").val('');

    });


    $("#btnAplicPrecio").bind("click", function (event, ui) {
        var CodORNom = "";
        var codigoNombre = $("#txtItemCode").val();
        codigoNombre = codigoNombre.trim(); 
        if(codigoNombre!='')
        {
            var divide = codigoNombre.split('//');
            CodORNom = divide[0];
        }
        if (CodORNom != "") {
            var mon = $("#txtPrecio").val();
            if (mon != "") {
                var code = CodORNom;
                var TipoMoneda = -1;
                var TipoConsulta = -1;
                if ($('#rbtPesos').is(':checked')) {
                    TipoMoneda = 1;
                    TipoConsulta = 1;
                }
                if ($('#rbtDolares').is(':checked')) {
                    TipoMoneda = 2;
                    TipoConsulta = 2;
                }

                if (mon != "") {
                    if (Publi == 1) {
                        $.mobile.loading('show', {
                            text: 'Calculando...',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        });
                    }
                    //Se llena la tabla de precios
                    $.ajax({
                        url: urlDOM + "CS.aspx/CalculaUtilidadPrecio",
                        data: "{ TipoConsulta: " + TipoConsulta + ", CodArticulo: '" + code + "'" + ", TipoMoneda: " + TipoMoneda + ", Monto: '" + mon + "'}",
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            var Rol = window.localStorage.getItem('Rl')
                            if (data.d != null && data.d != undefined) {
                                if (Rol != 1) {
                                    if (data.d >= 13)
                                        $("#txtUtilidad").val(data.d);
                                    else {
                                        if (Publi == 1) {                                            
                                            navigator.notification.alert('Es mejor regalar el producto, que generar una utilidad por debajo del precio especificado..',
                                            alertDismissed, 'HalcoNet', 'Aceptar');
                                            $.mobile.loading("hide");

                                        }
                                        else {
                                            alert("Es mejor regalar el producto, que generar una utilidad por debajo del precio especificado..");
                                        }
                                    }
                                    //Mensaje("Es mejor regalar el producto, que generar una utilidad por debajo del precio especificado..", "HalcoNet", "Aceptar");
                                }
                                else {
                                    $("#txtUtilidad").val(data.d);
                                }
                            }
                            if (Publi == 1) {
                                $.mobile.loading('hide');
                            }
                        }
                    });
                }
            }
            else {
                Mensaje("Debe especificar un monto", "HalcoNET", "Aceptar");
            }

        }
        else {
            Mensaje("Debe consultar un articulo por código", "HalcoNET", "Aceptar");
        }
    });

    //----------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------

    $("#btnAplicUtilidad").bind("click", function (event, ui) {
        var CodORNom = "";
        var codigoNombre = $("#txtItemCode").val();
        codigoNombre = codigoNombre.trim(); 
        if(codigoNombre!='')
        {
            var divide = codigoNombre.split('//');
            CodORNom = divide[0];
        }
        // if (CodORNom == "")
            // CodORNom = $("#txtItemName").val();
        if (CodORNom != "") {
            var mon = $("#txtUtilidad").val();
            if (mon != "") {
                var Rol = window.localStorage.getItem('Rl');
                if (mon < 13 && Rol != 1) {
                    if (Publi == 1) {
                        
                        navigator.notification.alert('Es mejor regalar el producto, que generar un precio por debajo de la utilidad especificada..',
                                            alertDismissed, 'HalcoNet', 'Aceptar');
                        $.mobile.loading("hide");
                    }
                    else {
                        alert("Es mejor regalar el producto, que generar un precio por debajo de la utilidad especificada..");
                    }
                }
                else {
                    var code = CodORNom;
                    var TipoMoneda = -1;
                    var TipoConsulta = -1;
                    if ($('#rbtPesos').is(':checked')) {
                        TipoMoneda = 1;
                        TipoConsulta = 1;
                    }
                    if ($('#rbtDolares').is(':checked')) {
                        TipoMoneda = 2;
                        TipoConsulta = 2;
                    }
                    if (mon != "") {
                        if (Publi == 1) {
                            $.mobile.loading('show', {
                                text: 'Calculando...',
                                textVisible: true,
                                theme: 'a',
                                html: ""
                            });
                        }
                        //Se llena la tabla de precios
                        $.ajax({
                            url: urlDOM + "CS.aspx/CalculaUtilidadPorciento",
                            data: "{ TipoConsulta: " + TipoConsulta + ", DescripArticulo: '" + code + "'" + ", TipoMoneda: " + TipoMoneda + ", Monto: '" + mon + "'" + ", BDescripcion:" + 0 + "}",
                            dataType: "json",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                $("#txtPrecio").val(data.d);
                                if (Publi == 1) {
                                    $.mobile.loading('hide');
                                }
                            }
                        });
                    }
                }
            }
            else {
                Mensaje("Debe especificar un monto para la utilidad", "HalcoNET", "Aceptar");
            }
        }
        else {
            Mensaje("Debe consultar un articulo por código", "HalcoNET", "Aceptar");
        }
    });

    //---------------------------------------------------------------------------------------------------------

    $("#btnCalPorcientoDesc").bind("click", function (event, ui) {
        var CodORNom = "";
        var codigoNombre = $("#txtItemCode").val();
        codigoNombre = codigoNombre.trim(); 
        if(codigoNombre!='')
        {
            var divide = codigoNombre.split('//');
            CodORNom = divide[0];
        }
        
        //CodORNom = $("#txtItemCode").val();
        // if (CodORNom == "")
            // CodORNom = $("#txtItemName").val();
        if (CodORNom != "") {
            var mon = $("#txtPorcientoDesc").val();
            if (mon != "") {
                var code = CodORNom;
                var TipoConsulta = 11;
                if (mon != "") {
                    if (Publi == 1) {
                        $.mobile.loading('show', {
                            text: 'Calculando...',
                            textVisible: true,
                            theme: 'a',
                            html: ""
                        });
                    }
                    //Se llena la tabla de precios
                    $.ajax({
                        url: urlDOM + "CS.aspx/ObtenerDescuentos",
                        data: "{ TipoConsulta: " + TipoConsulta + ", CodArticulo: '" + code + "', Descuento:" + mon + "}",
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            $("#txtPrecioDescuentoMXP").val(data.d.PrecioCompraMXP);
                            $("#txtUtilidadDescuentoMXP").val(data.d.PrecionVentaMXP);
                            $("#txtPrecioDescuentoUSD").val(data.d.PrecioCompraUSD);
                            $("#txtUtilidadDescuentoUSD").val(data.d.PrecionVentaUSD);

                            if (Publi == 1) {
                                $.mobile.loading('hide');
                            }
                        }
                    });
                }
            }
            else {
                Mensaje("Debe especificar un monto para la utilidad", "HalcoNET", "Aceptar");
            }
        }
        else {
            Mensaje("Debe consultar un articulo por código", "HalcoNET", "Aceptar");
        }
    });
	
	$( "#txtItemCode" ).autocomplete({
      source:  function (request, response) {
                $.ajax({
						url: urlWcf + "AutoCompletarArticulo",
						data: { codArticulo: $('#txtItemCode').val(), tipoConsulta : 1},
						type: "GET",
						//timeout:20000,
						contentType: "application/json; charset=utf-8",
						dataType: "jsonp",
						success: function (data) {
							response($.map(data, function (item) {
								return {						
									label: recortar(item.ItemCode),
									val: item.Nombre
									}
								}))
						},
						error: function(err){
							$("#txtItemCode").removeClass( "ui-autocomplete-loading" );
						}
                });
            },
	  select: function( event, ui ) {
        $("#txtNombreArticulo").val( ui.item.val );
		//ConsultaDescuento($('#txtItemCode').val());//llamar funcion
      }
    });
	
	$( "#txtNombreArticulo" ).autocomplete({
      source:  function (request, response) {
                $.ajax({
						url: urlWcf + "AutoCompletarArticulo",
						data: { codArticulo: $('#txtNombreArticulo').val(), tipoConsulta : 2},
						type: "GET",
						//timeout:20000,
						contentType: "application/json; charset=utf-8",
						dataType: "jsonp",
						success: function (data) {
							response($.map(data, function (item) {
								return {						
									label:item.Nombre,
									val: recortar(item.ItemCode)
									}
								}))
						}/*,
						error: function(err){
							$("#txtItemCode").removeClass( "ui-autocomplete-loading" );
						}*/
                });
            },
	  select: function( event, ui ) {
        $("#txtItemCode").val( ui.item.val );
		//ConsultaDescuento($('#txtItemCode').val());//llamar funcion
      }
    });
    //cliente registro
    $( "#cliente" ).autocomplete({
      source: function (request, response) {
                $.ajax({
                        url: urlWcf + "CompletarClienteCodigo",
                        data: { valor: $('#cliente').val(), tipoConsulta : 1},
                        type: "GET",
                        timeout:20000,  // tiempo de espera de la llamada
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            response($.map(data, function (item) {
                                return {                        
                                    label: item.codigo,
                                    val: item.nombre
                                }
                            }))
                        },
                        error: function(err){
                            $("#cliente").removeClass( "ui-autocomplete-loading" );
                        }
                });
            },
      select: function( event, ui ) {
        $("#nombreC").val( ui.item.val );
      }
    });
    
    $( "#nombreC" ).autocomplete({
      source: function (request, response) {
                $.ajax({
                        url: urlWcf + "CompletarClienteCodigo",
                        data: { valor: $('#nombreC').val(), tipoConsulta : 4},
                        type: "GET",
                        timeout:20000,
                        contentType: "application/json; charset=utf-8",
                        dataType: "jsonp",
                        success: function (data) {
                            response($.map(data, function (item) {
                                return {                        
                                    label: item.nombre,
                                    val: item.codigo
                                    }
                                }))
                        },
                        error: function(err){
                            $("#nombreC").removeClass( "ui-autocomplete-loading" );
                        }
                });
            },
      select: function( event, ui ) {
        $("#cliente").val( ui.item.val );
      }
    });
	

    $("#enviarCliente").click(function(event){
        event.preventDefault();
        var cliente = $("#cliente").val();
        var nombreC = $("#nombreC").val();
        var coordenadasC = $("#coordenadasC").val();
        var descripcionC = $("#descripcionC option:selected").text();
        if(cliente != "" && nombreC != "" && coordenadasC != "" && descripcionC != ""){
            $.mobile.loading( 'show', {
                text: 'Enviando Información',
                textVisible: true,
                theme: 'a',
                html: ""
            });
            $("#enviarCliente").prop( "disabled", true );
            $.ajax({
                    url: urlWcf + "RegistrarCliente",
                    data: { cliente : cliente , nombreC:nombreC , latitud:Latitud , longitud : Longitud , descripcion:descripcionC},
                    type: "GET",
                    timeout:tiempoEspera,  // tiempo de espera de la llamada
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: function (data) {
                        $.mobile.loading('hide');
                        $("#enviarCliente").prop( "disabled", false );                      
                        $("#cliente").val( "" );    
                        $("#nombreC").val( "" );    
                        $("#descripcionC").val( "" );    
                        $("#coordenadasC").val( "" );   
                        //alert(data);
                        $("#mensajeEnvio").html("<label style='font-size:16px;padding:5px;background-color:#000;text-shadow:none;font-weight:bold;color:#FFF'>"+data+"</label>");
                        setTimeout(function(){$("#mensajeEnvio").html("");}, 3000)
                    },
                    error: function(err){
                        $.mobile.loading('hide');
                        // $("#enviarCliente").prop( "disabled", false );
                        // $("#cliente").val( "" );    
                        // $("#nombreC").val( "" );    
                        // $("#coordenadasC").val( "" );
                        // //alert("Es posible que haya una falla en el servicio");                      
                        // var sessionClientes= {
                        //   'cliente': []
                        // };
                        
                        // var restoredSessionClientes = JSON.parse(window.localStorage.getItem('clientes'));
                        // if(restoredSessionClientes!= null){
                        //     console.log(restoredSessionClientes);
                        //     $.each(restoredSessionClientes.cliente,function(index, value){
                        //         sessionClientes.cliente.push({ "cliente" : value.cliente , "nombreC":value.nombreC , "latitud":value.latitud , "longitud" : value.longitud});
                        //     });                             
                            
                        // }
                        // window.localStorage.removeItem("clientes");                     
                        
                        // sessionClientes.cliente.push({ "cliente" : cliente , "nombreC":nombreC , "latitud":Latitud , "longitud" : Longitud});

                        // window.localStorage.setItem('clientes', JSON.stringify(sessionClientes));
                        
                    }
                });
                
        }else{
            // alert("Todos los campos son necesarios");
            $("#mensajeEnvio").html( "<label style='font-size:16px;padding:5px;text-shadow:none;font-weight:bold;color:#F00'>* Todos los campos son necesarios</label>" );
            setTimeout(function(){$("#mensajeEnvio").html("");}, 3000)
        }
    }); 
});       //cierre de página


function Llena() {
    var str = "";
    var sugList = $('[data-role=listview]');

    $.ajax({
        url: urlDOM + "CS.aspx/AutoCompleteAll",
        data: "{CodArticulo: '" + 1 + "'}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null && $.isArray(data.d)) {
                $.each(data.d, function (index, value) {
                    CodArt.push(value.ItemCode);
                    NomArt.push(value.Dscription);
                    str += "<li class=ui-screen-hidden><a href='#'>" + value.ItemCode + "</a></li>";
                    sugList.html(str);
                    sugList.listview("refresh");
                });
            }
        }
    });
}

function Llena2() {
    var str = "";
    var sugList = $("#sugges1");
    $.ajax({
        url: urlDOM + "CS.aspx/AutoCompleteAll",
        data: "{CodArticulo: '" + 1 + "'}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var str = "";
            if (data != null && $.isArray(data.d)) {
                $.each(data.d, function (index, value) {
                    str += "<li><a href='#'>" + value.ItemCode + "</a></li>";
                    sugList.html(str);
                    sugList.listview("refresh");

                });
            
            }
        }
    });
}



function Llena3() {
    var str = "";
    var sugList = $("#sugges1");
    if (CodArt != null && $.isArray(CodArt)) {
        $.each(CodArt, function (index, value) {
            str += "<li class=ui-screen-hidden><a href='#'>" + value + "</a></li>";
            sugList.html(str);
            sugList.listview("refresh");
        });
    }        
}



function ConsultaListaPrecios(Articulo, TipoConsulta, BDescripcion) {
    //Se llena la tabla de precios
    var Rol = window.localStorage.getItem('Rl')

    $.ajax({
        url: urlDOM + "CS.aspx/ConsultaPrecios", /* Llamamos a tu archivo */
        data: "{ 'DescripArticulo': '" + Articulo + "', TipoConsulta:" + TipoConsulta + ", BDescripcion:" + BDescripcion + ", Rol:" + Rol + "}", /* Ponemos los parametros de ser necesarios */
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",  /* Esto es lo que indica que la respuesta será un objeto JSon */
        success: function (data) {
            /* Supongamos que #contenido es el tbody de tu tabla */
            /* Inicializamos tu tabla */
            var htmlTable = '';
            $("#tblLista").html('');
            /* Vemos que la respuesta no este vacía y sea una arreglo */
            if (data != null && $.isArray(data.d)) {
                /* Recorremos tu respuesta con each */
                htmlTable += '<table class="phone-compare ui-shadow table-stroke">';
                $.each(data.d, function (index, value) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    htmlTable += '<tr>';
                    htmlTable += '<td class="col-stock-Izq">' + value.ListName + '</td>';
                    htmlTable += '<td class="col-stock-Der">' + value.MXP + '</td>';
                    htmlTable += '<td class="col-stock-Der">' + value.USD + '</td>';
                    htmlTable += '</tr>';
                    //$("#tblLista").append("<tr><td>" + value.ListName + "</td></tr>");
                    //i++;
                });

                htmlTable += '</table>';
                $("#tblLista").html(htmlTable);
            }
        }
    });
}

function ConsultaStock(Articulo, TipoConsulta, BDescripcion) {
    //Se llena la tabla de precios
    $.ajax({
        url: urlDOM + "CS.aspx/ConsultaStocks", /* Llamamos a tu archivo */
        data: "{ 'DescripArticulo': '" + Articulo + "', TipoConsulta:" + TipoConsulta + ", BDescripcion:" + BDescripcion + "}", /* Ponemos los parametros de ser necesarios */
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",  /* Esto es lo que indica que la respuesta será un objeto JSon */
        success: function (data) {
            /* Supongamos que #contenido es el tbody de tu tabla */
            /* Inicializamos tu tabla */
            var htmlTable = '';
            $("#tblListaStock").html('');
            /* Vemos que la respuesta no este vacía y sea una arreglo */
            if (data != null && $.isArray(data.d)) {
                /* Recorremos tu respuesta con each */
                htmlTable += '<table class="precios" cellspacing="0">';
                $.each(data.d, function (index, value) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    htmlTable += '<tr>';
                    htmlTable += '<td width=50% >' + value.Almacen + '</td>';
                    htmlTable += '<td width=25% style="text-align:right">' + value.Stock + '</td>';
                    htmlTable += '<td width=25% style="text-align:right">' + value.Solicitado + '</td>';
                    htmlTable += '</tr>';
                    //$("#tblLista").append("<tr><td>" + value.ListName + "</td></tr>");
                    //i++;
                });

                htmlTable += '</table>';
                $("#tblListaStock").html(htmlTable);
            }
        }
    });
}


function VerificaDescripcionArticulo(Codigo) {
    var result = "";
    var Rol = window.localStorage.getItem('Rl')
    if (Rol != null && Rol != undefined && Rol > 0) {
        if (Codigo != "") {
            $.ajax({
                url: urlDOM + "CS.aspx/ObtenerDescripcionArticulo",
                data: "{ TipoConsulta: " + 9 + ", CodArticulo:'" + Codigo + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    result = response.d;
                    if (result != "") {
                        //$("#sDescripcionArticulo").text(result);
                        MustraSegunRol();
                        // ConsultaListaPrecios(Codigo, 3, 0);
                        ConsultaListaPreciosV2(Codigo);
                        ConsultaStock(Codigo, 5, 0);
						ConsultaDescuento(Codigo);
                        if (Publi == 1) {
                            $.mobile.loading("hide");
                        }
                    }
                    else {
                        Mensaje("No existe ningun articulo con el código especificado", "HalcoNET", "Aceptar");
                        LimpiaCodArtNoExistente();
                        $('#idInformacion').css('display', 'none');

                    }
                }
            });
        }
        else {
            Mensaje("Debe especificar un código de articulo", "HalcoNET", "Aceptar");
        }
    }
    else {
        if (Publi == 1) {
            $.mobile.loading("hide");
        }
    }
}


function LimpiaCodArtNoExistente() {
    //Se llena la tabla de precios
    $("#txtPrecio").val('');
    $("#txtUtilidad").val('');
    $("#sDescripcionArticulo").text('');

    //--------------------------------------
    var htmlTable = '';
    $("#tblLista").html('');
    $("#tblLista").html(htmlTable);

    $("#tblListaStock").html('');
    $("#tblListaStock").html(htmlTable);

    $('#idInformacion').css('display', 'none');
    $('#CalUtil').css('display', 'none');
    $('#DescMax').css('display', 'none');
    $('#LstPrice').css('display', 'none');
    $('#LstStock').css('display', 'none');
    
}


function Mensaje(TextMensaje, Titulo, Boton) {
    if (Publi == 1) {
        navigator.notification.alert(TextMensaje, null, Titulo, Boton);
        $.mobile.loading("hide");
    }
    else {
        alert(TextMensaje);
    }
}

function MustraSegunRol() {
    
    $('#idInformacion').css('display', 'block');
    var Rol = window.localStorage.getItem('Rl');
    // var Rol = 3;

    if (Rol == null || Rol == undefined || Rol ==0) {
        $('#DescMax').css('display', 'none');
        $('#CalUtil').css('display', 'none');
        $('#LstPrice').css('display', 'none');
        $('#LstStock').css('display', 'none');
        $('#consultaReparto').css('display', 'none');
        //$('#footer').css('display', 'none');
    }
    else if (Rol == 1) {
        // $('#DescMax').css('display', 'block');
        $('#CalUtil').css('display', 'block');
        $('#LstPrice').css('display', 'block');
        $('#LstStock').css('display', 'block');
        $('#coordenadas').css('display', 'block');
        // $('#rutaRepartidor').css('display', 'block');
        // $('#consultaRep').css('display', 'block');
        //$('#footer').css('display', 'block');
    }
    else if (Rol == 2) {
        // $('#DescMax').css('display', 'block');
        $('#CalUtil').css('display', 'block');
        $('#LstPrice').css('display', 'block');
        $('#LstStock').css('display', 'block');
        // $('#consultaRep').css('display', 'block');
        //$('#footer').css('display', 'block');
    }
    else if (Rol == 3) {
        // $('#DescMax').css('display', 'block');
        $('#CalUtil').css('display', 'none');
        $('#LstPrice').css('display', 'block');
        $('#LstStock').css('display', 'block');
        // $('#coordenadas').css('display', 'block');
        // $('#rutaRepartidor').css('display', 'block');
        // $('#consultaRep').css('display', 'block');
    }
    else if (Rol == 4) {
        $('#DescMax').css('display', 'none');
        $('#CalUtil').css('display', 'none');
        $('#LstPrice').css('display', 'none');
        $('#LstStock').css('display', 'none');
        // $('#consultaRep').css('display', 'none');
        //$('#footer').css('display', 'none');
    }
    else if (Rol == 5) {
        $('#DescMax').css('display', 'none');
        $('#CalUtil').css('display', 'none');
        $('#LstPrice').css('display', 'none');
        $('#LstStock').css('display', 'none');
        // $('#coordenadas').css('display', 'none');
        // $('#rutaRepartidor').css('display', 'block');
        // $('#consultaRep').css('display', 'none');
        //$('#footer').css('display', 'none');
    }
}

function ObtenerDatosIP() {
    $.ajax({
        url: urlDOM + "CS.aspx/ObtenerIP",
        data: "{ TipoConsulta: " + 2 + ", Correo:'" + 0 + "'}",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            urlDOM = data.d.IP_Publica;
            Publi = data.d.Publicado;
            
        }
    });
}


function ValidaPorcentaje(monto) {
    var Rol = window.localStorage.getItem('Rl')
    if (monto < 13 && Rol > 1) {
        return false;
    }
}

function alertDismissed() {
    // hacer algo aquÃ­
}
function ConsultaListaPreciosV2(codigo){
	var UserName = window.localStorage.getItem('Us')
	var Id = window.localStorage.getItem('ID')
	var html ="";
    $.ajax({
			url: urlWcf + "ConsultaPreciosV2",
			data: {usuario : UserName, codArticulo: codigo, },
			// data: {  usuario : "peter3", codArticulo: codigo},
			type: "GET",
			//timeout:20000,
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			success: function (data) {				
				var htmlTable = '';
				$("#tblLista").html('');
				htmlTable += '<table class="precios" cellspacing="0">';				
				for(var i = 0; i< data.length; i++){
					htmlTable+='<tr >'+
						'<td width=50% >'+data[i].ListName+'</td>'+
						'<td width=25% style="text-align:right">'+data[i].MXP+'</td>'+
						'<td width=25% style="text-align:right">'+data[i].USD;+'</td>'+
					'</tr>'
				}
				htmlTable += '</table>';
				$("#tblLista").html(htmlTable);

			}/*,
			error: function(err){
				$("#txtItemCode").removeClass( "ui-autocomplete-loading" );
			}*/
	});   
}

function ConsultaDescuento(codigo){
	var UserName = window.localStorage.getItem('Us')
	var Id = window.localStorage.getItem('ID')
	 // alert(UserName+' ' +Id);
	//alert(codigo);
	$("#radioDescuento").hide();
	var html ="";
    $.ajax({
			url: urlWcf + "CalcularDescuento",
			data: { codArticulo: codigo, usuario : UserName, idUsuario: 1},
			// data: { codArticulo: codigo, usuario : "peter3", idUsuario: 1},
			type: "GET",
			//timeout:20000,
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			success: function (data) {
				
				if(data.mayoreo == 1 && data.transporte == 1  )
				{						
					if(data.DescuentoMayoreo != '$0.00' && data.DescuentoTransporte != '$0.00')
					{
						$("#radioDescuento").show();
						$("#descuentoM").addClass("activo");
						$("#descuentoT").removeClass("activo");
						$("#descuentoMayoreo").show();
						$("#descuentoMayoreo").html("Descuento: " +  data.DescuentoMayoreo  );
						$("#descuentoTransporte").html("Descuento: " +  data.DescuentoTransporte);
						$("#descuentoTransporte").hide()
					}
					else if(data.DescuentoMayoreo != '$0.00')
						{
							$("#radioDescuento").show();
							$("#descuentoM").addClass("activo");
							$("#descuentoT").removeClass("activo");
							$("#descuentoMayoreo").show();
							$("#descuentoMayoreo").html("Descuento: " +  data.DescuentoMayoreo  );
							$("#descuentoTransporte").html("Descuento: " +  data.DescuentoMayoreo);
							$("#descuentoTransporte").hide();
						}
						else if(data.DescuentoTransporte != '$0.00')
							{
								$("#radioDescuento").show();
								$("#descuentoM").addClass("activo");
								$("#descuentoT").removeClass("activo");
								$("#descuentoMayoreo").show();
								$("#descuentoMayoreo").html("Descuento: " +  data.DescuentoTransporte  );
								$("#descuentoTransporte").html("Descuento: " +  data.DescuentoTransporte);
								$("#descuentoTransporte").hide();
							}
							else{
								$("#descuentoMayoreo").html( '');
								$("#descuentoTransporte").html('' );
								$("#radioDescuento").hide();
							}
				}
				if(data.mayoreo == 1 && data.transporte == 0)
				{
					$("#radioDescuento").hide();
					if(data.DescuentoMayoreo != '$0.00')
						$("#descuentoMayoreo").html("Descuento: " +  data.DescuentoMayoreo  );
				}
				if(data.mayoreo == 0 && data.transporte == 1)
				{
					$("#radioDescuento").hide();
					if(data.DescuentoTransporte != '$0.00')
						$("#descuentoTransporte").html("Descuento: " + data.DescuentoTransporte);
				}
			}/*,
			error: function(err){
				$("#txtItemCode").removeClass( "ui-autocomplete-loading" );
			}*/
	});   
}
function recortar(cadena){
	if(cadena.length > 30)
		cadena = cadena.substring(0,30) + '...';
	return cadena;
}

function GPS(){
    clickCoordenadas = 1; 
    $("#obtenerCoordenadas").prop( "disabled", true );  
   setTimeout(function(){ if (clickCoordenadas == 1 && Longitud == 0){
        clickCoordenadas = 0;
        $("#obtenerCoordenadas").prop( "disabled", false ); 
        alert("Probablemente su GPS esta apagado");
    } }, 20000);
    navigator.geolocation.getCurrentPosition(
        function (pocicion){
            $("#obtenerCoordenadas").prop( "disabled", false ); 
            Latitud = pocicion.coords.latitude;
            Longitud = pocicion.coords.longitude;   
            $("#coordenadasC").val( Latitud+ '_' + Longitud);       
        }, 
        function (error) {  
            $('#error').val('Codigo: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
            
        },options
    );
}
function consultarClientesVendedores(){
    var UserName = window.localStorage.getItem('Us');
    
    var fechaIni = $("#fechaIni").val();
    var fechaFinal = $("#fechaFinal").val();
    
    $.ajax({
        url: urlWcf + "ConsultaClientesVendedor",
            data: {usuario : UserName, rol: 3 ,fechaIni:fechaIni,fechaFinal:fechaFinal},
            // data: {  usuario : "1", rol: 1,fechaIni:fechaIni,fechaFinal:fechaFinal},
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
        success: function (data) {
            var htmlTable = '';
            $("#tablaClientesVendedor").html('');
            htmlTable+='<table class="precios" cellspacing="0">';
            for(var i = 0; i< data.length; i++){                
                htmlTable+='<tr >'+
                    '<td width=30% ><a class="rutasVendedor" title="'+data[i].IdRuta+'" style="text-decoration:none;"  href="#"><div class="enlaceRuta">'+data[i].IdRuta+'</div></a></td>'+
                    '<td width=70% style="text-align:left"><a class="rutasVendedor" style="text-decoration:none;" title="'+data[i].IdRuta+'" href="#"><div class="enlaceRuta">'+data[i].Repartidor+'</div></a></td>'+
                '</tr>';                
            }
            htmlTable+='</table>';
            $("#tablaClientesVendedor").html(htmlTable);
        }
    });
}
function ConsultaStatusRutaFactura(idRuta){
    var UserName = window.localStorage.getItem('Us');

    $.ajax({
        url: urlWcf + "ConsultaStatusRutaFactura",
            data: { IdRuta: idRuta,usuario : UserName },
            // data: {  IdRuta: idRuta,usuario:"Vendedor"},
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
        success: function (data) {
            var htmlTable = '';
            $("#tablaFacturasVendedor").html('');
            htmlTable+='<b>FACTURAS</b><br><br>'+'<table id="" class="tablaPrecios" cellspacing="0">'+
              '<thead>'+
                  '<tr>'+
                      '<th width=30% >Factura</th>'+
                      '<th width=70% style="text-align:center">Estado</th>'+
                  '</tr>'+
              '</thead>'+
            '</table>';
            htmlTable+='<table class="precios" cellspacing="0">';
            for(var i = 0; i< data.length; i++){                
                htmlTable+='<tr >'+
                    '<td width=30% >'+data[i].numFactura+'</td>'+
                    '<td width=70% style="text-align:left">'+data[i].statusFactura+'</td>'+
                '</tr>';                
            }
            htmlTable+='</table>';
            $("#tablaFacturasVendedor").html(htmlTable);
        }
    });
}

function fechaFormato(fecha) {          
        var yyyy = fecha.getFullYear().toString();                                    
        var mm = (fecha.getMonth()+1).toString(); // getMonth() is zero-based         
        var dd  = fecha.getDate().toString();             
                            
        return yyyy + '/' + (mm[1]?mm:"0"+mm[0]) + '/' + (dd[1]?dd:"0"+dd[0]);
   };  