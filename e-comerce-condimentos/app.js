var swiper = new Swiper('.mySwiper',{
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWidthBlank: true,
    pagination: {
        el: 'swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        0:{
            slidesPerView: 1
        },
        520:{
            slidesPerView: 2
        },
        950:{
            slidesPerView: 3
        }
    }
})

var contadorEgresos = 0;


// Carrito

const carrito = document.getElementById('carrito');
const elementos = document.getElementById('lista');
const elementos2 = document.getElementById('lista-2');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const comprarBtn = document.querySelector('#comprar');

cargarEventListeners();

function cargarEventListeners() {
    elementos.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);

    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    comprarBtn.addEventListener('click', comprarProductos);

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarElemento(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: Date.now()
    }

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    let id = Date.now();

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src='${elemento.imagen}' width=100>
        </td>

        <td>
            ${elemento.titulo}
        </td>

        <td>
            ${elemento.precio}
        </td>

        <td>
            <a href='#' class='borrar' data-id='${elemento.id}'>X</a>
        </td>
    `;

    lista.appendChild(row);
    guardarElementoLocalStorage(elemento);
    calcularCuenta();
}

function eliminarElemento(e) {
    e.preventDefault();

    let elemento,
        elementoId;

    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }

    eliminarElementoLocalStorage(elementoId);
}

function vaciarCarrito() {
    while(lista.firstChild){
        lista.removeChild(lista.firstChild)
    }

    vaciarLocalStorage();
    calcularCuenta();
    return false;
}

function guardarElementoLocalStorage(elemento) {
    let elementos;

    elementos = obtenerElementosLocalStorage();
    elementos.push(elemento);

    localStorage.setItem('elementos', JSON.stringify(elementos));
}


function comprarProductos() {
    let elementosLS = JSON.parse(localStorage.getItem('elementos'));
    let cliente = 'Jesus Parra';
    let tlf = '+584245939080';
    let producto = '';
    let cuenta = calcularCuenta();
    
    for(let elem of elementosLS){
        producto += `${elem.titulo}  ${elem.precio}
`;
    }

    result = confirm('Te vamos a contactar para concretar la compra');
    result ?  
        fetch("https://formsubmit.co/ajax/parra2089@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Cliente: cliente,
                Contacto: tlf,
                Producto: producto,
                Total: '$'+cuenta
            })
        })
            .then(response => response.json())
            .then(data => console.log(data), vaciarLocalStorage(), setTimeout(() => {
                window.location.reload();
              },"1000"))
            .catch(error => console.log(error))
    : console.log('compra cancelada');    


}

function obtenerElementosLocalStorage() {
    let elementosLS;

    if(localStorage.getItem('elementos') === null) {
        elementosLS = [];
    } else{
        elementosLS = JSON.parse(localStorage.getItem('elementos'));
    }

    return elementosLS;
}

function leerLocalStorage() {
    let elementosLS;

    elementosLS = obtenerElementosLocalStorage();
    elementosLS.forEach(function(elemento) {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${elemento.imagen}' width=100>
            </td>
    
            <td>
                ${elemento.titulo}
            </td>
    
            <td>
                ${elemento.precio}
            </td>
    
            <td>
                <a href='#' class='borrar' data-id='${elemento.id}'>X</a>
            </td>
        `;
        
        lista.appendChild(row);       
    });

    calcularCuenta();

}

function eliminarElementoLocalStorage(elemento) {
    let elementosLS;

    elementosLS = obtenerElementosLocalStorage();
    let filtered = elementosLS.filter(e => e.id !== parseInt(elemento));

    localStorage.setItem('elementos', JSON.stringify(filtered));
    calcularCuenta();
}

function vaciarLocalStorage() {
    localStorage.clear();
}

function calcularCuenta(){
    let elementosLS = JSON.parse(localStorage.getItem('elementos'));
    let cuenta = 0;
    
    if(elementosLS){
        for(let elem of elementosLS){
            cuenta += parseInt(elem.precio.slice(1));
        }
    }
    
    document.getElementById('total').innerHTML= `Total: $${cuenta}`;
    return cuenta;
}