window.onload = async function () {
    
    renderizarProductos(await cargarProductos());
}


async function cargarProductos() {
    try {
        const response = await requestBackend('/products/cards','get')
        return response;
    } catch (error) {
        console.log(error);
        return "";
    }
}

function renderizarProductos(products) {
    const cardContainer = document.querySelector('.section-cards__body');
    cardContainer.innerHTML = products;
}

function filtrarProductos(palabra) {
    const filteredProducts = productsLS.filter(product => {
        return product.nombre.toLowerCase().includes(palabra.toLowerCase());
    });
    return filteredProducts;
}

// Función para mostrar productos filtrados en la lista
function mostrarProductosFiltrados(_products) {
    cardContainer.innerHTML = ``;
    renderizarProductos(_products)
}

const searchInput = document.getElementById('searchInput');
const totalResults = document.getElementById('totalResults');

searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value;
    const filteredProducts = filtrarProductos(searchTerm);
    mostrarProductosFiltrados(filteredProducts);
    const numResults = filteredProducts.length;
    totalResults.textContent = `${numResults} productos encontrados`;
});
