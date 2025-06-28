export class Viajes {
    constructor(id, origen, destino, descripcion, fechaSalida, fechaLlegada, imagen, precio) {
        this.id = id; 
        this.origen = origen;
        this.destino = destino;
        this.description = descripcion; // Mantenemos la propiedad por si se usa en otro lugar o para futuras funcionalidades
        this.fechaSalida = new Date(fechaSalida);
        this.fechaLlegada = new Date(fechaLlegada);
        this.imagen = imagen;
        this.precio = precio;
    }

createElementHtml() {
    const card = document.createElement("div");
    card.className = "col-12 col-sm-6 col-md-3 mt-5";

    const imageUrl = `http://localhost:3000${this.imagen}`;
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit' };
    const fechaSalida = this.fechaSalida.toLocaleDateString('es-ES', options);
    const fechaLlegada = this.fechaLlegada.toLocaleDateString('es-ES', options);
    const datosDelProducto = {
            id: this.id,
            origen: this.origen,
            destino: this.destino,
            precio: this.precio};

    card.innerHTML = `
        <div class="card h-100">
            <img src="${imageUrl}" class="card-img-top" alt="imagen de viaje">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title text-center">${this.origen} - ${this.destino}</h5>
                <p class="card-text text-center">
                    Salida: ${fechaSalida} hs<br>
                    Llegada: ${fechaLlegada} hs
                </p>
                <p class="card-text text-center text-success fw-bold fs-4">Precio: $${this.precio}</p>
                <!-- Botones para el carrito -->
                        <div class="d-flex justify-content-center gap-2 mt-3">
                            <button class="btn btn-primary btn-add-to-cart" 
                                data-product-id="${this.id}" 
                                data-product-type="viaje"
                                data-product-data='${JSON.stringify(datosDelProducto)}'>
                                Agregar al Carrito
                            </button>
                            <button class="btn btn-danger btn-remove-from-cart" 
                                data-product-id="${this.id}" 
                                data-product-type="viaje">
                                Eliminar
                            </button>
                        </div>
            </div>
        </div>
    `;

    return card;
}

    
}

