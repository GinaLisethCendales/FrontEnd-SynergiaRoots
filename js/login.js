//1a- guardo el formulario en una variable
const loginForm = document.getElementById('loginForm');

//1-Obtener los datos del formulrio

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.dir(loginForm);

    const { email , password } =  loginForm.elements;

//2-Checkear datos ingresados con los usuarios que tengo
//2a-O btener los usuarios almacenados
const users = JSON.parse(localStorage.getItem('users')) || [];

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

showAlert('Login correcto te redireccionamos al incio en un momento...')


setTimeout(() => {
    window.location.href= '/index.html';
}, 3000)


});





//a-Email que me ingreso lo tiene algún usuario de mi array
   //b-password deberian ser las mismas 
 //3-Vamos guardar en el localstorage un registro que va a ser currentUser - user
 
 //function logout
 //1-Borramos el registro del localStorage//