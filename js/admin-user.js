window.onload = function () {
    cargarTabla();
}

//obtener boton y formulario
const userForm = document.getElementById('RegisterUser');
const userBtn = document.getElementById('submitbtn');

//agregar evento submit a boton 
userForm.addEventListener('submit', (event) => {

    console.log(`Submit event`)


    //a-preventDefault
    event.preventDefault();

    //b-Tomar los datos y armar el objeto usuario 
    const el = event.target.elements;
    let fecha = new Date().toLocaleDateString();


    const user = {
        nombre: el.nombre.value,
        email: el.email.value,
        rol: el.rol.value,
        fecha: fecha
    }

    //i-Obtener los usuarios guardados en el localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];


    users.push(user)

    //e-Guardarlo en el localStorage
    localStorage.setItem('users', JSON.stringify(users)) //users ahora tiene un usuario más
    userForm.reset()
    showAlert('el user se agrego exitosamente', 'sucess')
    cargarTabla();
})

function cargarTabla() {

    const usersLS = JSON.parse(localStorage.getItem('users')) || [];

    var tabla = document.getElementById('Table');
    var contenidoTabla = '';
    tabla.innerHTML = '';
    usersLS.forEach(function (dato) {
        contenidoTabla += '<tr>';
        contenidoTabla += '<td class="item-nombre" id="item-nombre">' + dato.nombre + '</td>';
        contenidoTabla += '<td class="item-email">' + dato.email + '</td>';
        contenidoTabla += '<td class="item-rol">' + dato.rol + '</td>';
        contenidoTabla += '<td class="item-fecha">' + dato.fecha + '</td>';
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
    const users = JSON.parse(localStorage.getItem('users')) || [];

    var item = users.filter(function (user) {
        return user.nombre == id;
    });

    const nombre = document.getElementById('nombreinput');
    const email = document.getElementById('emailinput');
    const rol = document.getElementById('rolinput');


    nombre.value = item[0].nombre;
    email.value = item[0].email;
    rol.value = item[0].rol;


    // Código que se ejecutará cuando se haga clic en el icono
}

// eliminar registro del localstorage
function eliminar(_nombre) {

    var id = _nombre
    const users = JSON.parse(localStorage.getItem('users')) || []

    var items = users.filter(function (user) {
        return user.nombre != id;
    })


    localStorage.setItem('users', JSON.stringify(items))
    cargarTabla()
}
