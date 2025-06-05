import { Viajes } from "./js/viajes-class.js";

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
                viaje.fechaSalida,
                viaje.fechaLlegada,
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
