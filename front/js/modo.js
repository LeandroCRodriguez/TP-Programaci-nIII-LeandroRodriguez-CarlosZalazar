let html = document.getElementsByTagName("html")[0]; //Obtengo el tag de mi html, a pesar de que es "elements", HTML tiene un solo elemento. 
let icono = document.getElementById("icono"); //obengo el icono

function modoClaroModoOscuro()
{
    if(html.getAttribute("data-bs-theme")=="light")
        {
            icono.classList.remove("bi-brightness-high");
            icono.classList.add("bi-moon");
            html.setAttribute("data-bs-theme", "dark");
            localStorage.setItem("Modo","dark");
        }
        else
        {
            icono.classList.remove("bi-moon");
            icono.classList.add("bi-brightness-high");
            html.setAttribute("data-bs-theme", "light");
            localStorage.setItem("Modo","light");

        }
}







// let html = document.getElementsByTagName("html")[0];
// let icono = document.getElementById("icono");

// function aplicarModo() {
//     const modoGuardado = localStorage.getItem("Modo");
//     if (modoGuardado === "dark") {
//         html.setAttribute("data-bs-theme", "dark");
//         if (icono) {
//             icono.classList.remove("bi-brightness-high");
//             icono.classList.add("bi-moon");
//         }
//     } else {
//         html.setAttribute("data-bs-theme", "light");
//         if (icono) {
//             icono.classList.remove("bi-moon");
//             icono.classList.add("bi-brightness-high");
//         }
//     }
// }

// function modoClaroModoOscuro() {
//     if (html.getAttribute("data-bs-theme") === "light") {
//         html.setAttribute("data-bs-theme", "dark");
//         localStorage.setItem("Modo", "dark");
//         if (icono) {
//             icono.classList.remove("bi-brightness-high");
//             icono.classList.add("bi-moon");
//         }
//     } else {
//         html.setAttribute("data-bs-theme", "light");
//         localStorage.setItem("Modo", "light");
//         if (icono) {
//             icono.classList.remove("bi-moon");
//             icono.classList.add("bi-brightness-high");
//         }
//     }
// }

// // Ejecutar cuando se carga la página
// document.addEventListener("DOMContentLoaded", aplicarModo);




