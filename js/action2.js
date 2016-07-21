


function MuestraRepartidor(){
    var Rol = window.localStorage.getItem('Rl');
     // var Rol = 5;
    // alert(Rol);
    if (Rol == 5) {
        $('#coordenadas').css('display', 'none');
        $('#catalogo').css('display', 'none');
        $('#entregaReparto').css('display', 'block');
        $('#consultaRep').css('display', 'none');
        $('#rutaRepartidor').css('display', 'block');
        $.mobile.changePage("#reparto");
        consultaRuta(0);
        $("#terminarRuta").hide();
    }
    if (Rol == 3) {
        $('#coordenadas').css('display', 'block');
        $('#catalogo').css('display', 'block');
        $('#entregaReparto').css('display', 'none');
        $('#consultaRep').css('display', 'block');
        var f = new Date();  
        $('#fechaIni').val(fechaFormato(f));
        $('#fechaFinal').val(fechaFormato(f));
        }
    if (Rol == 1) {
        $('#coordenadas').css('display', 'block');
        $('#catalogo').css('display', 'block');
        $('#entregaReparto').css('display', 'block');
        $('#consultaRep').css('display', 'block');
    }
    if (Rol == 2 || Rol == 4) {
        $('#coordenadas').css('display', 'block');
        $('#catalogo').css('display', 'block');
        $('#entregaReparto').css('display', 'none');
        $('#consultaRep').css('display', 'none');
    }
    if(Rol == null || Rol == undefined || Rol ==0){
        $('#rutaRepartidor').css('display', 'none');
        $('#registroFactura').css('display', 'none');
        $('#registroCliente').css('display', 'none');
        $('#buscarArticulo').css('display', 'none');
        
    }
}


