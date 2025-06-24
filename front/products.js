import { Viajes } from "./js/viajes-class.js";
import { Experiences } from "./js/experience-class.js";

// Obtener nombre de usuario del localStorage
const nombreUsuario = localStorage.getItem("nombreUsuario");

// Si no hay usuario, redirigir al login
if (!nombreUsuario) {
    window.location.href = "main.html";
} else {
    document.getElementById("usuario-nombre").textContent = `Hola ${nombreUsuario}`;
}

// Configurar el botón de viajes
const btnViajes = document.getElementById("btnViajes");

btnViajes.addEventListener("click", () => {
    const btnExperiencias = document.getElementById("btnExperciencias");

    if (btnExperiencias) btnExperiencias.remove();
    btnViajes.remove();

    cargarViajes();
});

// Configurar el botón de experiencias
const btnExperiencias = document.getElementById("btnExperciencias");

btnExperiencias.addEventListener("click", () => {
    const btnViajes = document.getElementById("btnViajes");

    if (btnViajes) btnViajes.remove();
    btnExperiencias.remove();

    cargarExperiencias();
});

btnExperiencias.add


// Función para cargar los viajes desde la API y renderizarlos
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
        viajesRow.innerHTML = ""; // Limpiar contenedor

        // Renderizar cada viaje como tarjeta
        viajesAPI.forEach((viaje) => {
            const viajeObj = new Viajes(
                viaje.origen,
                viaje.destino,
                viaje.descripcion || "Descripción no disponible",
                viaje.fechaSalida,
                viaje.fechaLlegada,
                viaje.imagen || "default.jpg", // Imagen por defecto si no se proporciona
                viaje.precio
            );
            console.log(viajeObj);

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
        console.log(experienciasAPI);

        const experienciasRow = document.getElementById("products-row");
        experienciasRow.innerHTML = ""; // Limpiar contenedor

        // Renderizar cada experiencia como tarjeta
        experienciasAPI.forEach((experiencia) => {
            const experienciaObj = new Experiences(
                experiencia.title,
                experiencia.description || "Descripción no disponible",
                experiencia.fechaDesde,
                experiencia.fechaHasta,
                experiencia.imagen || "default.jpg", // Imagen por defecto si no se proporciona
                experiencia.price
            );
            console.log(experienciaObj);

            const experienciaElement = experienciaObj.createElementHtml();
            experienciasRow.appendChild(experienciaElement);
        });

        console.log("Experiencias cargadas correctamente");

    } catch (error) {
        console.error("No se han podido obtener las experiencias, sorry", error);
    }
}
