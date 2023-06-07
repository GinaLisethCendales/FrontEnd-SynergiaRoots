window.onload = function () {
    cargarTabla();
}

//obtener boton y formulario
const productForm = document.getElementById('Registerproduct');
const productoBtn = document.getElementById('submitbtn');

//agregar evento submit a boton 
productForm.addEventListener('submit', (event) => {

    console.log(`Submit event`)


    //a-preventDefault
    event.preventDefault();

    //b-Tomar los datos y armar el objeto usuario 
    const el = event.target.elements;



    const product = {
        nombre: el.nombre.value,
        descripcion: el.descripcion.value,
        precio: el.precio.value,
        imagen: el.imagen.value
    }

    //i-Obtener los usuarios guardados en el localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];


    products.push(product)

    //e-Guardarlo en el localStorage
    localStorage.setItem('products', JSON.stringify(products)) //users ahora tiene un usuario más
    productForm.reset()
    showAlert('el producto se agrego exitosamente', 'sucess')
    cargarTabla();
})

function cargarTabla() {

    const productsLS = JSON.parse(localStorage.getItem('products')) || [];

    var tabla = document.getElementById('Table');
    var contenidoTabla = '';
    tabla.innerHTML = '';
    productsLS.forEach(function (dato) {
        contenidoTabla += '<tr>';
        contenidoTabla += '<td class="item-nombre" id="item-nombre">' + dato.nombre + '</td>';
        contenidoTabla += '<td class="item-descripcion">' + dato.descripcion + '</td>';
        contenidoTabla += '<td class="item-precio">' + dato.precio + '</td>';
        contenidoTabla += '<td class="item-imagen"> <img src="' + dato.imagen + '"  width="50" height="50"></td>';
        contenidoTabla += `<td> <button class="editar" onclick="editar('${dato.nombre}')">` +
            '<i class="fa-solid fa-lg fa-pen-to-square" style="color:green;"></i></button>' +
            `<button class="eliminar" onclick="eliminar('${dato.nombre}')">` +
            '<i class="fa-solid fa-lg fa-trash" style="color:red;"></i></button></td>';
        contenidoTabla += '</tr>';
    });

    tabla.innerHTML += contenidoTabla;

}

function editar(_nombre) {

    var id = _nombre;
    const products = JSON.parse(localStorage.getItem('products')) || [];

    var item = products.filter(function (product) {
        return product.nombre == id;
    });

    const nombre = document.getElementById('nombreinput');
    const descripcion = document.getElementById('descripcioninput');
    const precio = document.getElementById('precio');
    const imagen = document.getElementById('imagen');

    nombre.value = item[0].nombre;
    descripcion.innerHTML = item[0].descripcion;
    precio.value = item[0].precio;
    imagen.value = item[0].imagen;

    // Código que se ejecutará cuando se haga clic en el icono
}

// eliminar registro del localstorage
function eliminar(_nombre) {

    var id = _nombre
    const products = JSON.parse(localStorage.getItem('products')) || []

    var items = products.filter(function (product) {
        return product.nombre != id;
    })


    localStorage.setItem('products', JSON.stringify(items))
    cargarTabla()
}
