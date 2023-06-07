const showAlert = function (text, type = 'sucess') {
    // *VAMOS A HACER NUESTRO ALERT CUSTOM
    //Crea un elemento HTML node
    const alertDialog = document.createElement('div');
    //Añade una clase 
    alertDialog.classList.add('alert-dialog');
    alertDialog.innerText = text;
    document.body.appendChild(alertDialog);


    if (type === 'error') {
        alertDialog.style.backgroundColor = 'red';
    }
    if (type === 'warning') {
        alertDialog.style.backgroundColor = 'orange';
    }

    //Para demorar su aparición luego de haberlo creado lineas anterior con document creatElement
    setTimeout(() => alertDialog.classList.add('show'), 10)

    setTimeout(() => {
        alertDialog.remove();
    }, 3000)

    alertDialog.innerText = text;

}





