import { Usuario } from "./js/usuario.js";

document.getElementById("form-nombre").addEventListener("submit", function (e) {
    e.preventDefault(); // evita que recargue la página
    const nombre = document.getElementById("nombre").value.trim();

    if (nombre) {
        console.log("Nombre ingresado:", nombre);
        const usuario = new Usuario(nombre);
        console.log("Usuario creado:", usuario);
        localStorage.setItem("nombreUsuario", nombre); // guardamos el nombre
        window.location.href = "products.html"; // redirige a otra página
  
        
        // Acá podés guardar el nombre, mostrarlo, cambiar de pantalla, etc.
    } else {
        alert("Por favor ingresá tu nombre");
    }
});

