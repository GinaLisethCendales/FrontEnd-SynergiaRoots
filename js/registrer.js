//1-Obtener formulario y almacenarlo en uma variable js
const registrerForm = document.querySelector('#formRegistroUsuario');
//b.Obtener botón de submit
const registerBtn = document.getElementById('registrar');

//2-Vamos a escuchar el evento directamente en JS
registrerForm.addEventListener('submit', (event) => {

    console.log(`Submit event`)


    //a-preventDefault
    event.preventDefault();

    //b-Tomar los datos y armar el objeto usuario 
    const el = event.target.elements;

    //c-Verificar que los datos ingresados de password y password2 son exactamente igual
    if (el.password.value !== el.password2.value) {
        console.warn(`El password no coninciden`)
        return;
    }

    let _createdAt = new Date().toLocaleDateString();
    const user = {
        username: el.fullName.value,
        email: el.email.value,
        password: el.password.value,
        role: el.rol.value,
        age: el.age.value,
        birthdate: el.birthdate.value,
        country: el.country.value,
        gender: el.gender.value,
        createdAt : _createdAt,
        isActive: true
    }
    //d-Verificar si hay en el localStorage algun usuaio guardado con ese email

    //i-Obtener los usuarios guardados en el localStorage
    //const users = JSON.parse(localStorage.getItem('users')) || [];
/*
    const userExist = checkIfUserExist(user, el.email.value);
    // existe:retorno y muestro un alert
    if (userExist) {
        alert(`El email ya existe`)
        return;
    }*/


    // no existe:sigo con mi sintaxi s normalmente
    console.log(`sigue`)


axios.post('http://localhost:8090/users', user)
  .then(function (response) {
    // La respuesta exitosa se maneja aquí
    console.log(response.data);
  })
  .catch(function (error) {
    // Si hay un error, se maneja aquí
    console.error(error);
  });


    //e-insertar en mi array de usuarios el nuevo user (lista de usuarios)
    //users.push(user)

    //e-Guardarlo en el localStorage
    //localStorage.setItem('users', JSON.stringify(users)) //users ahora tiene un usuario más

    //f-Limpiamos el formulario, podemos llevar al usuario a la pagina de login
    //a-Resetear el formulario

    //registerForm.reset();
    showAlert('el usuario se registro exitosamente, sucess')
})


function checkIfUserExist(users, emailToSearch) {
    //**3 versiones
    //ii-Recorrer el array con un forEach

    //*======Solución3
    const index0fUser = users.findIndex(usuario => {
        if (usuario.email === emailToSearch) {
            //solamente trabaja dentro del findIndex
            return true
        }
    })

    if (index0fUser >= 0) {
        console.warn(`El usuario ya existe findIndex`);

        //! retorno de mi función
        return true;
    }


    // userEmailExist = false;
    // //!=========Solucion1
    // users.forEach(usr => {
    //     if (usr.email === el.email.value) {
    //         console.warn(`El usuario ya existe`)
    //         userEmailExist = true;
    //     }
    // })
    // if (userEmailExist) {
    //     console.warn(`El usuario ya existe`);
    //     return
    // }

    // //*=======Solución2

    // const userExist = users.find(user => {

    //     if (user.email === el.email.value) {
    //         return true;
    //     }
    //     return false; //no es necesario ya que si no lo defino se hace un return undefined (false)

    // })

    // if (userExist) {
    //     console.warn(`El usuario ya existe`);
    //     return;
    // }
}