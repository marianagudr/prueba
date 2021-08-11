// Entidades

class Pedido {
    constructor(numeroPedido, nombre, apellido, email, tipo, tamano, precio, lugar, fecha){
        this.numeroPedido = numeroPedido;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.tipo = tipo;
        this.tamano = tamano;
        this.precio = precio;
        this.lugar = lugar;
        this.fecha = fecha;
    }
}

// Variables

let pedidos = [];
let precio = 0;
let boton1 = $("#boton1");
let botonEnviar = $("#botonEnviar");
let tipoIlustracion = $("#tipoIlustracion");
let tamano1 = $("#tamano");

// Funciones

function guardarPedido() {

    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let email = $("#email").val();
    let tipo = $("#tipoIlustracion").val();
    let tamano = $("#tamano").val();
    let lugar = $("#lugar").val();
    let fecha = $("#fecha").val();

    let listaPedidos = JSON.parse(localStorage.getItem("pedidos"));

    switch (tipo) {
        case "Artesanal":
            if (tamano === "A4") {
                precio = 6000;
            }
            else {
                alert("La ilustración artesanal sólo viene en tamaño A4, ingresar A4");
                nombre = "Invalido";
                apellido = "Invalido";
                email = "Invalido";
                tipo = "Invalido"
                tamano = "Invalido";
                precio = 0;
                lugar = "Inválido";
                fecha = "Inválido";
            }
            break;
        
        case "Digital":
            if ((tamano === "A4") || (tamano === "20x30")) {
                precio = 4000;
            }
            else {
                precio = 5000;
            }
            break;
        
        default:
            alert("Ingrese de nuevo todos los datos que faltan por favor");
            nombre = "Invalido";
            apellido = "Invalido";
            email = "Invalido";
            tipo = "Invalido"
            tamano = "Invalido";
            precio = 0;
            lugar = "Inválido";
            fecha = "Inválido";
    }

    if (localStorage.getItem("pedidos") != null) {
        let numeroPedido = listaPedidos.length + 1;
        let pedido = new Pedido(numeroPedido, nombre, apellido, email, tipo, tamano, precio, lugar, fecha);
        listaPedidos.push(pedido);
        localStorage.setItem("pedidos", JSON.stringify(listaPedidos));

    } else {
        localStorage.clear();
        let numeroPedido = 1;
        let pedido = new Pedido(numeroPedido, nombre, apellido, email, tipo, tamano, precio, lugar, fecha);
        pedidos.push(pedido);
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
    }
}

function imprimirPedido() {

    let imprimir = JSON.parse(localStorage.getItem("pedidos"));

    if (imprimir != null) {

        imprimir.forEach(elemento => {

            $('#tabla').append(
                `
                <tr>
                    <td class="col-1">${elemento.numeroPedido}</td>
                    <td class="col-1">${elemento.nombre}</td>
                    <td class="col-1">${elemento.apellido}</td>
                    <td class="col-1">${elemento.email}</td>
                    <td class="col-1">${elemento.tipo}</td>
                    <td class="col-1">${elemento.tamano}</td>
                    <td class="col-1">${elemento.precio}</td>
                    <td class="col-1">${elemento.lugar}</td>
                    <td class="col-1">${elemento.fecha}</td>
                </tr>
                `
            )
        }
    )} else {
        console.log("El Array está vacío");
    }
    refTamano.style.display = "none";
}

function desplegarTexto(e) {

    e.preventDefault()

    efecto.style.display = "block";   
    refTamano.style.display = "none"; 
}

function mostrarRefTamano() {
    refTamano.style.display = "block";
}

function ocultarBoton1() {
    boton1.style.display = "none";
}

// Eventos
boton1.on("click", desplegarTexto);

boton1.click(function() {
    $(this).hide();
});

botonEnviar.on("click", guardarPedido);

tamano1.on("focus", mostrarRefTamano);

imprimirPedido();
