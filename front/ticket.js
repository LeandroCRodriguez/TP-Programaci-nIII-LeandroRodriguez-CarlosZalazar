  document.addEventListener("DOMContentLoaded", () => {

  const carrito = JSON.parse(localStorage.getItem("carrito"));
  const nombreUsuario = localStorage.getItem("nombreUsuario");
  const mensajeUsuario = document.getElementById("nombreUsuario");
  const contenedor = document.getElementById("ticket-container");
  const totalElement = document.getElementById("total-ticket");
  const btnFinalizar = document.getElementById("btn-finalizar");

 let total = 0;

  mensajeUsuario.textContent = `UTN Trip & experiences te agradece por su compra, ${nombreUsuario}!`;

  const ticket = document.createElement("div");
  ticket.className = "ticket-carrito col-12 p-4 border rounded bg-light";
  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleString("es-AR");
  fechaAMostrar = document.createElement("h5");
  fechaAMostrar.textContent = `Fecha de compra: ${fechaFormateada}`;
  ticket.appendChild(fechaAMostrar);

  carrito.forEach(producto => {
    const detalle = document.createElement("div");
    detalle.className = "mb-3";

    if (producto.tipo === "viaje") {
      detalle.innerHTML = `
        <h5>${producto.origen} - ${producto.destino}</h5>
        <p>Precio: $${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
      `;
    } else if (producto.tipo === "experiencia") {
      detalle.innerHTML = `
        <h5>${producto.experiencia}</h5>
        <p>Precio: $${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
      `;
    }
    total += producto.precio * producto.cantidad;
    ticket.appendChild(detalle);
  });

  contenedor.appendChild(ticket);

  totalElement.textContent = `Total: $${total}`;

  btnFinalizar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
  });

//ticket para descargar
document.getElementById("btn-descargar-ticket").addEventListener("click", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  const nombreUsuario = localStorage.getItem("nombreUsuario");

  const carritoEncoded = encodeURIComponent(JSON.stringify(carrito));
  const nombreEncoded = encodeURIComponent(nombreUsuario);

  const url = `http://localhost:3000/descarga/ticket?carrito=${carritoEncoded}&nombre=${nombreEncoded}`;
  window.open(url, "_blank");
});



});