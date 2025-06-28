import { Viajes } from "./js/viajes-class.js";
import { Experiences } from "./js/experience-class.js"; // Importa la clase Experiences



// Obtener nombre de usuario del localStorage
const nombreUsuario = localStorage.getItem("nombreUsuario");

if (!nombreUsuario) {
    window.location.href = "index.html"; 
} else {
    document.getElementById("usuario-nombre").textContent = `Hola ${nombreUsuario}`;
}

// Configurar el botón de viajes
const btnViajes = document.getElementById("btnViajes");

btnViajes.addEventListener("click", () => {
    const btnExperienciasElement = document.getElementById("btnExperiencias"); 

    if (btnExperienciasElement) btnExperienciasElement.remove();
    btnViajes.remove();

    cargarViajes();
});

const btnExperiencias = document.getElementById("btnExperiencias"); 

btnExperiencias.addEventListener("click", () => {
    const btnViajesElement = document.getElementById("btnViajes"); // Nombre de variable distinto

    if (btnViajesElement) btnViajesElement.remove();
    btnExperiencias.remove();

    cargarExperiencias(); 
});


async function cargarViajes() {
    const Title = document.getElementById("title-container");
    Title.textContent = "Viajes disponibles";
    try {
        const response = await fetch("http://localhost:3000/viajes");

        if (!response.ok) {
            throw new Error(`Error al cargar viajes: ${response.status}`);
        }

        const viajesAPI = await response.json();

        const viajesRow = document.getElementById("products-row");
        viajesRow.innerHTML = ""; 

        viajesAPI.forEach((viaje) => {
            const viajeObj = new Viajes(
                viaje.id, 
                viaje.origen,
                viaje.destino,
                viaje.descripcion,
                viaje.fechaSalida,
                viaje.fechaLlegada,
                viaje.imagen, 
                viaje.precio
            );
            console.log("Objeto Viaje creado:", viajeObj); 

            const viajeElement = viajeObj.createElementHtml();
            viajesRow.appendChild(viajeElement);
        });

        console.log("Viajes cargados correctamente");

    } catch (error) {
        console.error("No se han podido obtener los viajes, sorry", error);
    }
}

async function cargarExperiencias() {
    const Title = document.getElementById("title-container");
    Title.textContent = "Experiencias disponibles";
    try {
        const response = await fetch("http://localhost:3000/experiencias");

        if (!response.ok) {
            throw new Error(`Error al cargar experiencias: ${response.status}`);
        }

        const experienciasAPI = await response.json(); 

        const experienciasRow = document.getElementById("products-row"); 
        experienciasRow.innerHTML = ""; 

        experienciasAPI.forEach((experiencia) => {
            const experienciaObj = new Experiences(
                 experiencia.id,
                experiencia.experiencia, 
                experiencia.fecha,      
                experiencia.calificacion, 
                experiencia.comentario, 
                experiencia.precio     
            );
            console.log("Objeto Experiencia creado:", experienciaObj); 


            const experienciaElement = experienciaObj.createElementHtml();
            experienciasRow.appendChild(experienciaElement);
        });

        console.log("Experiencias cargadas correctamente");

    } catch (error) {
        console.error("No se han podido obtener las experiencias, sorry", error);
    }
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-add-to-cart")) {
        const tipo = e.target.dataset.productType;
        const id = e.target.dataset.productId;
        const datos = JSON.parse(e.target.dataset.productData);

        addToCart(id, tipo, datos);
        console.log("Producto agregado:", datos);
    }
     if (e.target.classList.contains('btn-remove-from-cart')) {
        const productId = e.target.dataset.productId;
        const type = e.target.dataset.productType;

        removeFromCart(productId, type);
    }
});


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

function removeFromCart(id, tipo) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscamos el producto
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


