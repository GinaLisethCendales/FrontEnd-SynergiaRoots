
window.onload = function () {
    cargarTabla();
}

function cargarTabla() {

    const orden = JSON.parse(localStorage.getItem('orden')) || [];

    var tabla = document.getElementById('Table');
    var contenidoTabla = '';
    tabla.innerHTML = '';
    total = 0
    orden.forEach(function (item) {

        dato = item.producto

        contenidoTabla += '<tr>';
        contenidoTabla += '<td class="item-imagen" id="item-imagen">' +
            '<img src="' + dato.imagen + '"  width="50" height="50"></td>';
        contenidoTabla += '<td class="item-nombre">' + dato.nombre + '</td>';
        contenidoTabla += '<td class="item-descripcion">' + dato.descripcion + '</td>';
        contenidoTabla += '<td class="item-cantidad">' + item.cantidad + '</td>';
        contenidoTabla += '<td class="item-precio">  $ ' + dato.precio + '</td>';
        contenidoTabla += '<td class="item-subtotal"> $ ' + dato.precio * item.cantidad +
        `<button class="eliminar" onclick="eliminar('${dato.nombre}')">` +
        '<i class="fa-solid fa-lg fa-trash" style="color:red;"></i></button></td>';
        contenidoTabla += '</tr>';
        tabla.innerHTML = contenidoTabla
        total = total + (dato.precio * item.cantidad)


    });

    const valorTotal = document.getElementById('valorTotal')
    valorTotal.innerHTML = total


}