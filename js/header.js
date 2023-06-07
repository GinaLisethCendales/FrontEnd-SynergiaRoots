const signInMenu = document.getElementById('sign-in');


function renderHeaderActions() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    signInMenu.innerHTML = '';
    if (currentUser) {

        const logout = document.createElement('li');
        logout.innerHTML = '<a href="#" onclick="logout()" class="navbar__nav-link">Logout</a>';
        signInMenu.appendChild(logout);

        const adminuser = document.createElement('li');
        adminuser.innerHTML = '<a href="/pages/admin-user/admin-user.html" class="navbar__nav-link">admin usuarios</a>';
        signInMenu.appendChild(adminuser);

        const adminproducts = document.createElement('li');
        adminproducts.innerHTML = '<a href="/pages/admin-product/admin-product.html" class="navbar__nav-link">admin producto</a>';
        signInMenu.appendChild(adminproducts);
    } else {

        const login = document.createElement('li');
        login.innerHTML = '<a href="/pages/login/login.html" class="navbar__nav-link">Login</a>';
        signInMenu.appendChild(login);
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    renderHeaderActions();
}


renderHeaderActions();

