window.onload = async function () {
    await cargarTabla();
}

//obtener boton y formulario
const userForm = document.getElementById('RegisterUser');
const userBtn = document.getElementById('submitbtn');
const editarBtn = document.getElementById('editarbtn');

//agregar evento submit a boton 
userForm.addEventListener('submit', async (event) => {

    console.log(`Submit event`)


    //a-preventDefault
    event.preventDefault();

    //b-Tomar los datos y armar el objeto usuario 
    const el = event.target.elements;
    let fecha = new Date().toLocaleDateString();


    const user = {
        username: el.nombre.value,
        email: el.email.value,
        role: el.rol.value,
        createdAt: fecha,
    }

    const responseBackend = await requestBackend('/users','post',true, user)
    if(responseBackend){
        cargarTabla()
        showAlert('Usuario registrado correctamente.')
        editarBtn.id = "";
    }
    else{
        showAlert('Ha ocurrido un error inesperado.', 'error')
    }

    userForm.reset()
    showAlert('el user se agrego exitosamente', 'sucess')
    cargarTabla();
})

async function cargarTabla() {

    const responseBackend = await requestBackend('/users/table','get',true)
    var tabla = document.getElementById('Table');
    var contenidoTabla = responseBackend;
    tabla.innerHTML = '';
    tabla.innerHTML += contenidoTabla;
    editarBtn.style.display = 'none';
}

async function ActualizarUsuario(_id) {

    const UpdatedUser  = {
        username: document.getElementById('nombreinput').value,
        email: document.getElementById('emailinput').value,
        role: document.getElementById('rolinput').value
    }

    const responseBackend = await requestBackend('/users/'+_id, 'put', true, UpdatedUser, 'user')

    if(responseBackend){
        cargarTabla()
        showAlert('Usuario actualizado correctamente.')
        editarBtn.id = "";
    }
    else{
        showAlert('Ha ocurrido un error inesperado.', 'error')
    }
}

async function editar(_id){ 

    editarBtn.id = "";
    const fila = document.getElementById(`${_id}`);

    const nombre = fila.cells[0].textContent;
    const email= fila.cells[1].textContent;
    const rol = fila.cells[1].textContent;

    document.getElementById('nombreinput').value = nombre;
    document.getElementById('emailinput').value = email;
    document.getElementById('rolinput').value = rol;

    editarBtn.style.display = 'block';
    editarBtn.id = _id;
}

// eliminar registro del localstorage
async function eliminar(_id) {

    const responseBackend = await requestBackend('/users/'+_id, 'delete', true)

    if(responseBackend){
        cargarTabla()
        showAlert('Usuario eliminado correctamente.')
        editarBtn.id = "";
    }
    else{
        showAlert('Ha ocurrido un error inesperado.', 'error')
    }

    cargarTabla()
}
