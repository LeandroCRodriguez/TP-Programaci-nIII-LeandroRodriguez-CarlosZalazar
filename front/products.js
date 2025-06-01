// products.js
const nombreUsuario = localStorage.getItem("nombreUsuario");

if (nombreUsuario) {
    document.getElementById("usuario-nombre").textContent = `Hola ${nombreUsuario}`;
} else {
    // si no hay nombre, redirigí de nuevo al index
    window.location.href = "main.html";
}

const btnViajes = document.getElementById("btnViajes");
btnViajes.addEventListener("click", () => {
    const btnExperiencias = document.getElementById("btnExperciencias");
    btnExperiencias.remove();
    btnViajes.remove();
});