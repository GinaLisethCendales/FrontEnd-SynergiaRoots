const params = window.location.search;

console.log(params);
const index = params.split('id=')[1].split('&')[0];



//Metodo recomendado para obtener queryParams es usando URLSearchParams
const paramsUrl = new URLSearchParams(params)
const paramsEntries = Object.fromEntries(paramsUrl)

const indice = paramsEntries.id;
// console.log(index);
const products = localStorage.getItem('products')

const products_list = JSON.parse(products) || [];

product = products_list.find(x => x.id == index)

imagen = document.getElementById('product-imagen')
nombre = document.getElementById('product-nombre')
precio = document.getElementById('product-precio')
descripcion = document.getElementById('product-descripcion')

imagen.src = product.imagen
nombre.innerHTML = product.nombre
precio.innerHTML = product.precio
descripcion.innerHTML = product.descripcion

cantidadInicial = 0
cantidad = document.getElementById('cantidad')
cantidad.value = cantidadInicial
console.log(cantidadInicial);

function agregar() {
    cantidadInicial += 1
    cantidad.value = cantidadInicial
    console.log(cantidadInicial);
}

function disminuir() {
    cantidadInicial -= 1
    cantidad.value = cantidadInicial
    console.log(cantidadInicial);
}

function añadirCarrito(cantidadInicial) {

    orden = JSON.parse(localStorage.getItem('orden')) || []

    let indice = orden.findIndex(x => x.id == index)

    if (indice === -1) {
        let orden_producto = {
            cantidad: parseInt(cantidadInicial),
            producto: product,
            id: index
        }

        orden.push(orden_producto)
    }
    else {
        orden[indice].cantidad += parseInt(cantidadInicial);
    }

    localStorage.setItem('orden', JSON.stringify(orden) || [])
}

function irAOrdenes() {
    window.location.href = '/pages/order/order.html'
}