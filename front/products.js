import { Viajes } from "./js/viajes-class.js";
import { Experiences } from "./js/experience-class.js"; 

let viajesAPI = []; 
let experienciasAPI = []; 
let paginaActual = 1;
let tipoActual = ""; // "viajes" o "experiencias"
const viajesPorPagina = 8;
const experienciasPorPagina = 8;

// Si no hay un usuario logueado, redirige al inicio
const nombreUsuario = localStorage.getItem("nombreUsuario");
if (!nombreUsuario) {
    window.location.href = "index.html"; 
} else {
    document.getElementById("usuario-nombre").textContent = `Hola ${nombreUsuario}`;
}

// Botón VIAJES
const btnViajes = document.getElementById("btnViajes");
btnViajes.addEventListener("click", () => {
    const btnExperienciasElement = document.getElementById("btnExperiencias"); 
    if (btnExperienciasElement) btnExperienciasElement.remove();
    btnViajes.remove();
    cargarViajes();
});

// Botón EXPERIENCIAS
const btnExperiencias = document.getElementById("btnExperiencias"); 
btnExperiencias.addEventListener("click", () => {
    const btnViajesElement = document.getElementById("btnViajes");
    if (btnViajesElement) btnViajesElement.remove();
    btnExperiencias.remove(); 
    cargarExperiencias(); 
});

// Mostrar una página
function mostrarPagina(numeroPagina) {
    const container = document.getElementById("products-row");
    container.innerHTML = "";

    let items = [];
    let itemsPorPagina = 8;

    if (tipoActual === "viajes") {
        items = viajesAPI;
        itemsPorPagina = viajesPorPagina;
    } else if (tipoActual === "experiencias") {
        items = experienciasAPI;
        itemsPorPagina = experienciasPorPagina;
    }

    const inicio = (numeroPagina - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const paginaItems = items.slice(inicio, fin);

    paginaItems.forEach(item => {
        let itemObj;
        if (tipoActual === "viajes") {
            itemObj = new Viajes(
                item.id, item.origen, item.destino, item.descripcion,
                item.fechaSalida, item.fechaLlegada, item.imagen, item.precio
            );
        } else {
            itemObj = new Experiences(
                item.id, item.experiencia, item.fecha, item.calificacion,
                item.comentario, item.precio, item.imagen
            );
        }
        container.appendChild(itemObj.createElementHtml());
    });

    let totalPaginas = items.length / itemsPorPagina;
    if (items.length % itemsPorPagina !== 0) {
        totalPaginas += 1;
    }
    totalPaginas = parseInt(totalPaginas);

    const botones = document.getElementById("botones");
    if (totalPaginas > 1) {
        botones.style.display = "block";
        document.getElementById("anterior").disabled = paginaActual === 1;
        document.getElementById("siguiente").disabled = paginaActual >= totalPaginas;
    } else {
        botones.style.display = "none";
    }
}

// Paginación siguiente
window.paginaSiguiente = function () {
    let items = tipoActual === "viajes" ? viajesAPI : experienciasAPI;
    let porPagina = tipoActual === "viajes" ? viajesPorPagina : experienciasPorPagina;

    let totalPaginas = items.length / porPagina;
    if (items.length % porPagina !== 0) {
        totalPaginas += 1;
    }
    totalPaginas = parseInt(totalPaginas);

    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarPagina(paginaActual);
    }
};

// Paginación anterior
window.paginaAnterior = function () {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarPagina(paginaActual);
    }
};

// Cargar VIAJES
async function cargarViajes() {
    const Title = document.getElementById("title-container");
    Title.textContent = "Viajes disponibles";
    tipoActual = "viajes";
    paginaActual = 1;

    try {
        const response = await fetch("http://localhost:3000/viajes");
        if (!response.ok) throw new Error(`Error al cargar viajes: ${response.status}`);
        viajesAPI = await response.json();
        mostrarPagina(paginaActual);
    } catch (error) {
        console.error("No se han podido obtener los viajes", error);
    }
}

// Cargar EXPERIENCIAS
async function cargarExperiencias() {
    const Title = document.getElementById("title-container");
    Title.textContent = "Experiencias disponibles";
    tipoActual = "experiencias";
    paginaActual = 1;

    try {
        const response = await fetch("http://localhost:3000/experiencias");
        if (!response.ok) throw new Error(`Error al cargar experiencias: ${response.status}`);
        experienciasAPI = await response.json();
        mostrarPagina(paginaActual);
    } catch (error) {
        console.error("No se han podido obtener las experiencias", error);
    }
}

// Carrito - Agregar / Quitar
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-add-to-cart")) {
        const tipo = e.target.dataset.productType;
        const id = e.target.dataset.productId;
        const datos = JSON.parse(e.target.dataset.productData);

        addToCart(id, tipo, datos);

        const tarjeta = e.target.closest(".tarjeta-producto");
        if (tarjeta) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "Producto agregado al carrito";
            mensaje.className = "mensaje-temp text-success";
            tarjeta.appendChild(mensaje);
            setTimeout(() => mensaje.remove(), 1000);
        }
    }

    if (e.target.classList.contains("btn-remove-from-cart")) {
        const productId = e.target.dataset.productId;
        const type = e.target.dataset.productType;
        removeFromCart(productId, type);

        const tarjeta = e.target.closest(".tarjeta-producto");
        if (tarjeta) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "Producto eliminado del carrito";
            mensaje.className = "mensaje-temp text-success";
            tarjeta.appendChild(mensaje);
            setTimeout(() => mensaje.remove(), 1000);
        }
    }
});

// Carrito - Agregar producto
function addToCart(id, tipo, datos) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const yaExiste = carrito.find(item => String(item.id) === id && String(item.tipo) === tipo);
    if (yaExiste) {
        yaExiste.cantidad += 1;
    } else {
        carrito.push({ ...datos, tipo, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Carrito - Quitar producto
function removeFromCart(id, tipo) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(item => String(item.id) === String(id) && item.tipo === tipo);
    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        } else {
            carrito.splice(index, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log("Producto eliminado:", id, tipo);
    }
}
