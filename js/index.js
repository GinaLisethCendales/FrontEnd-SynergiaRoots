let productos = [];

async function cargarProductos() {
    try {
        const response = await fetch('./data/products.json');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

cargarProductos().then(data => {
    productos = data;
    localStorage.setItem("products", JSON.stringify(productos));
    console.log(productos);
    // Aquí puedes realizar acciones después de cargar los productos.
});



const cardContainer = document.querySelector('.card-container');

const productsLS = JSON.parse(localStorage.getItem('products')) || [];

console.log(productos)

function renderizarProductos(products) {

    cardContainer.innerHTML = ``;
    products.forEach((product, index) => {


        const card = document.createElement('article');
        card.classList.add('card');

        card.innerHTML = `
        <div class="card__header">
   
                        <img src="${product.imagen}" alt="${product.nombre}" class="card__img">

                        </div>
                    <div class="card__body">
                        <div class="card__title">
                        ${product.nombre}
                        </div>
                        <p class="card__description">
                        ${product.descripcion}
                        </p>
                        <h3 class="card__price">
                            $ ${product.precio}
                        </h3>
                    </div>
                    <div class="card__footer">
                        <div class="card__date">
                            13/12/2022
                        </div>
                        <div class="card__btn-container">
                            <a class="crad__btn" href="/pages/product-detail/product-detail.html?id=${index + 1}">|
                                AÑADIR AL CARRITO
                            </a>
                        </div>
                    </div>`;

        // Agrega la tarjeta al contenedor
        cardContainer.appendChild(card);
    });

}

renderizarProductos(productsLS);


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
