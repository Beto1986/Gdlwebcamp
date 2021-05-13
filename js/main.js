// Se ejecuta solo 1 vez


(function() {
    "use strict";

    var regalo = document.getElementById('regalo');


    // Cuando ya detecte todo el html cargado, ejecuta el código de aquí dentro
    document.addEventListener('DOMContentLoaded', function() {


        if (document.getElementById('mapa')) {

            // Código para insertar mapa
            var map = L.map('mapa').setView([-33.350278, -60.235956], 17); // El 17 es el nivel del zoom

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([-33.350278, -60.235956]).addTo(map)
                .bindPopup('GDLWebCamp 2018 <br> Boletos ya disponibles')
                .openPopup()
                .bindTooltip('Un Tooltip')
                .openTooltip();

        };


        // Campos Datos usuarios
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        // Campos pases
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        // Botones y divs
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var listaProductos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        // Extras
        var camisas = document.getElementById('camisa_evento');
        var etiquetas = document.getElementById('etiquetas');

        if (document.getElementById('calcular')) {

            calcular.addEventListener('click', calcularMontos);

            // Con el evento blur al salir del foco queda el valor por default.
            pase_dia.addEventListener('blur', mostrarDias);
            pase_dosdias.addEventListener('blur', mostrarDias);
            pase_completo.addEventListener('blur', mostrarDias);

            // Validando campos obligatorios
            nombre.addEventListener('blur', validarCampos);
            apellido.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarMail);

            function validarCampos() {
                if (this.value == '') {
                    errorDiv.style.display = 'block';
                    errorDiv.innerHTML = "este campo es obligatorio";
                    this.style.border = '1px solid red';
                    errorDiv.style.border = '1px solid red';
                } else {
                    errorDiv.style.display = 'none';
                    this.style.border = '1px solid #cccccc';
                }
            }

            function validarMail() {
                if (this.value.indexOf("@") > -1) {
                    errorDiv.style.display = 'none';
                    this.style.border = '1px solid #cccccc';
                } else {
                    errorDiv.style.display = 'block';
                    errorDiv.innerHTML = "debe tener al menos un @";
                    this.style.border = '1px solid red';
                    errorDiv.style.border = '1px solid red';
                }
            }


            // Creamos la funcion "CalcularMontos" al presionar sobre el boton "Calcular"
            function calcularMontos(event) {
                event.preventDefault();
                //console.log("Has echo click en Calcular");
                //console.log(regalo.value);
                if (regalo.value === '') {
                    alert("Debes elegir un regalo");
                    regalo.focus();
                } else {

                    //console.log("Ya elegiste regalo");
                    // Se agrega el parseInt para asegurar que recibimos números. ",10"--> utilizacion de decimales.  
                    var boletosDia = parseInt(pase_dia.value, 10) || 0,
                        boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
                        boletoCompleto = parseInt(pase_completo.value, 10) || 0,
                        cantCamisas = parseInt(camisas.value, 10) || 0,
                        //cantEtiquetas = parseInt(etiquetas.value, 10) || 0;
                        cantEtiquetas = etiquetas.value;



                    //console.log("boletos Dia:" + boletosDia);
                    //console.log("boletos 2 Dias:" + boletos2Dias);
                    //console.log("boletos Completos:" + boletoCompleto);

                    var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) +
                        // Promocion del 7% de descuento
                        ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);

                    //console.log(totalPagar);

                    var listadoProductos = [];

                    if (boletosDia >= 1) {
                        listadoProductos.push(boletosDia + ' Pases por día');
                    }
                    if (boletos2Dias >= 1) {
                        listadoProductos.push(boletos2Dias + ' Pases por 2 días');
                    }
                    if (boletoCompleto >= 1) {
                        listadoProductos.push(boletoCompleto + ' Pases Completos');
                    }
                    if (cantCamisas >= 1) {
                        listadoProductos.push(cantCamisas + ' Camisas');
                    }
                    if (cantEtiquetas >= 1) {
                        listadoProductos.push(cantEtiquetas + ' Etiquetas');
                    }

                    //console.log(listadoProductos);

                    listaProductos.style.display = "block";

                    listaProductos.innerHTML = '';
                    for (var i = 0; i < listadoProductos.length; i++) {
                        listaProductos.innerHTML += listadoProductos[i] + '<br/>';
                    }

                    // Calcula el TOTAL con 2 decimales prefijados.
                    suma.innerHTML = "$ " + totalPagar.toFixed(2);

                }
            }

            function mostrarDias() {
                //console.log(pase_dia.value);
                var boletosDia = parseInt(pase_dia.value, 10) || 0,
                    boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
                    boletoCompleto = parseInt(pase_completo.value, 10) || 0;

                var diasElegidos = [];

                if (boletosDia > 0) {
                    diasElegidos.push('viernes');
                }
                if (boletos2Dias > 0) {
                    diasElegidos.push('viernes', 'sabado');
                }
                if (boletoCompleto > 0) {
                    diasElegidos.push('viernes', 'sabado', 'domingo');
                }
                for (var i = 0; i < diasElegidos.length; i++) {
                    document.getElementById(diasElegidos[i]).style.display = 'block';
                }
            }

        } // FIN si sxiste el elemento "calcular"

    }); // DOM CONTENT LOADED

})();



$(function() {

    // Invocando el plugin Lettering
    $('.nombre-sitio').lettering();

    // Menu o barra fija al scrollear
    var windowHeight = $(window).height(); // es el metodo que nos dice la altura de la ventana
    var barraAltura = $('.barra').innerHeight();
    //console.log(barraAltura);
    //console.log(windowHeight);

    $(window).scroll(function() {
        var scroll = $(window).scrollTop(); // es lo que ayuda a detectar el scrolling
        //console.log(scroll);
        if (scroll > windowHeight) {
            //console.log("Ya pasaste de la altura de la pantalla");
            $('.barra').addClass('fixed');
            $('body').css({ 'margin-top': barraAltura + 'px' });
        } else {
            //console.log("Aún no pasaste la altura de la pantalla");
            $('.barra').removeClass('fixed');
            $('body').css({ 'margin-top': '0px' });
        }
    });

    // Menu responsive

    $('.menu-movil').on('click', function() {
        $('.navegacion-principal').slideToggle();
    });


    //$('div.ocultar').hide(); lo mando en el CSS mejor.


    // Programa de conferencias
    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo');

    $('.menu-programa a').on('click', function() {
        //$('.menu-programa a:first').addClass('activo');
        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');
        $('.ocultar').hide();
        var enlace = $(this).attr('href');
        //console.log(enlace);
        $(enlace).fadeIn(1000);
        return false;
    });


    // Animaciones para los Números (Utilizando plugin de JQuery--> jquery.animateNumber.min.js)
    // Tambien se utiliza el metodo waypoint del plugin (jquery.waypoints.min.js) para activar la animacion al llegar a este punto
    var resumenLista = jQuery('.resumen-evento');
    if (resumenLista.length > 0) {
        $('.resumen-evento').waypoint(function() {
            $('.resumen-evento li:nth-child(1) p').animateNumber({ number: 6 }, 1200); // nth-child porque son 4
            $('.resumen-evento li:nth-child(2) p').animateNumber({ number: 15 }, 1200);
            $('.resumen-evento li:nth-child(3) p').animateNumber({ number: 3 }, 1500);
            $('.resumen-evento li:nth-child(4) p').animateNumber({ number: 9 }, 1500);

        }, {
            offset: '70%' // es para determinar la altura en que queremos que se ejecute la animación.
        });
    }

    //Animaciones para los Números en CUENTA REGRESIVA.
    $('.cuenta-regresiva').countdown('2021/12/10 09:00:00', function(event) {
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));

    });

});