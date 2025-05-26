// products.js
const nombreUsuario = localStorage.getItem("nombreUsuario");

if (nombreUsuario) {
    document.getElementById("usuario-nombre").textContent = `Hola, ${nombreUsuario}`;
} else {
    // si no hay nombre, redirigí de nuevo al index
    window.location.href = "index.html";
}
