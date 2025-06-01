import { Usuario } from "./js/usuario.js";
import { validateString } from './js/utils.js';

document.getElementById("form-nombre").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const divMensajeError = document.querySelector(".mensaje-error");
    

    // Limpiar cualquier mensaje previo
    divMensajeError.textContent = "";
    divMensajeError.style.color = "red";

    try {
        validateString(nombre); // puede lanzar error
        const usuario = new Usuario(nombre);
        localStorage.setItem("nombreUsuario", nombre);
        console.log("Usuario creado:", usuario);

        // Si todo va bien, podés redirigir o limpiar mensaje
        window.location.href = "products.html";

    } catch (error) {
        console.error(error.message);
        divMensajeError.textContent = error.message;
        setTimeout(() => {
            divMensajeError.textContent = "";
        }, 3000); // 3000 ms = 3 segundos
        
    }
});
