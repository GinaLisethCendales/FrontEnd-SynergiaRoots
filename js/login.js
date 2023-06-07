//1a- guardo el formulario en una variable
const loginForm = document.getElementById('loginForm');

//1-Obtener los datos del formulrio

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.dir(loginForm);

    const { email , password } =  loginForm.elements;

//2-Checkear datos ingresados con los usuarios que tengo
//2a-O btener los usuarios almacenados
//const users = JSON.parse(localStorage.getItem('users')) || [];
/*
const user = users.find((usr) => {
      if(usr.email === email.value){
      return true;
    }
return false; 
});  //{ name, password, email, }

if(!user || user.password !== password.value){
    showAlert('Los Datos ingresados no son correctos', 'error');
    return;
}

localStorage.setItem('currentUser',JSON.stringify(user));
//Todo:insertar alerta custom


*/
const body = { 
    email : email.value,
    password : password.value
}

axios.post('http://localhost:8090/users/login', body)
  .then(function (response) {
    // La respuesta exitosa se maneja aquí
    
    showAlert('Login correcto te redireccionamos al incio en un momento...')
    
    localStorage.setItem('token',JSON.stringify(response.data["token"]));
    setTimeout(() => {
        window.location.href= '/index.html';
    }, 3000)


    console.log(response.data);
  })
  .catch(function (error) {
    // Si hay un error, se maneja aquí
    console.error(error);
    showAlert('usuario y/o contraseña incorrecto.', "warning")

  });
});





//a-Email que me ingreso lo tiene algún usuario de mi array
   //b-password deberian ser las mismas 
 //3-Vamos guardar en el localstorage un registro que va a ser currentUser - user
 
 //function logout
 //1-Borramos el registro del localStorage//