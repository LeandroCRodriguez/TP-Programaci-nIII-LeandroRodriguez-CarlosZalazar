document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  const nombreUsuario = localStorage.getItem("nombreUsuario");
  const contenedor = document.getElementById("carrito-container");
  const totalElement = document.getElementById("total-carrito");
  let total = 0;

  if (!carrito || carrito.length === 0) {
    contenedor.innerHTML = 
    `<p class='text-center'>${nombreUsuario}, El carrito está vacío.</p>`;
    totalElement.textContent = "Total: $0";
    return;
  }  

  carrito.forEach(producto => {
    const div = document.createElement("div");
    div.className = "tarjeta-carrito";

    if (producto.tipo === "viaje") {
      div.innerHTML = `
        <h4>${producto.origen} - ${producto.destino}</h4>
        <p>Precio: $${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Subtotal: $${producto.precio * producto.cantidad}</p>
        <button data-id="${producto.id}" data-tipo="${producto.tipo}" class="btn-agregar">+</button>
        <button data-id="${producto.id}" data-tipo="${producto.tipo}" class="btn-quitar">-</button>
      `;
    }

    if (producto.tipo === "experiencia") {
      div.innerHTML = `
        <h4>${producto.experiencia}</h4>
        <p>Precio: $${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Subtotal: $${producto.precio * producto.cantidad}</p>
        <button data-id="${producto.id}" data-tipo="${producto.tipo}" class="btn-agregar">+</button>
        <button data-id="${producto.id}" data-tipo="${producto.tipo}" class="btn-quitar">-</button>
      `;
    }

    total += producto.precio * producto.cantidad;
    contenedor.appendChild(div);
  });

  totalElement.textContent = 
  `${nombreUsuario}, tu Total es: $${total}`;
  
  contenedor.addEventListener("click", (e) => {
    if(e.target.classList.contains("btn-agregar"))
    {
      const id = e.target.dataset.id;
      const tipo = e.target.dataset.tipo;
      modificarCantidad(id, tipo, 1);
    }

    if(e.target.classList.contains("btn-quitar"))
    {
      const id = e.target.dataset.id;
      const tipo = e.target.dataset.tipo;
      modificarCantidad(id, tipo, -1);
    }  
  });
});

function modificarCantidad(id, tipo, cantidad) {
  let carrito = JSON.parse(localStorage.getItem("carrito"));

  carrito.forEach((producto, index) => {
    if (String(producto.id) === String(id) && producto.tipo === tipo) {
      producto.cantidad += cantidad;
      if (producto.cantidad <= 0) {
        carrito.splice(index, 1);
      }
    }
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  location.reload();
}

