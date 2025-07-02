export class Experiences {
    constructor(id, experiencia, fecha, calificacion, comentario, precio, imagen) {
        this.id = id;
        this.experiencia = experiencia;
        this.fecha = new Date(fecha);
        this.calificacion = calificacion;
        this.comentario = comentario;
        this.precio = precio;
        this.imagen = imagen; 
    }

    createElementHtml() {
        const card = document.createElement("div");
        // Agregamos la clase 'tarjeta-producto' para insertar mensajes temporales
        card.className = "tarjeta-producto col-12 col-sm-6 col-md-3 mt-5";
        const imageUrl = `http://localhost:3000${this.imagen}`;
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit' };
        const fecha = this.fecha.toLocaleDateString('es-ES', options);

        const datosDelProducto = {
            id: this.id,
            experiencia: this.experiencia,
            precio: this.precio
        };

        card.innerHTML = `
            <div class="card h-100">
                <img src="${imageUrl}" class="card-img-top" alt="imagen de viaje">
                <div class="card-header bg-light text-center fw-bold">
                    ${this.experiencia}
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                    <p class="card-text text-center mb-2">
                        Fecha: ${fecha} hs
                    </p>
                    <p class="card-text text-center">Calificación: ${this.calificacion}</p>
                    <p class="card-text text-center fst-italic">${this.comentario}</p>
                    <p class="card-text text-center text-success fw-bold fs-4">Precio: $${this.precio.toFixed(2)}</p> 

                    <!-- Botones para el carrito -->
                    <div class="d-flex justify-content-center gap-2 mt-3">
                        <button class="btn btn-primary btn-add-to-cart" 
                            data-product-id="${this.id}" 
                            data-product-type="experiencia"
                            data-product-data='${JSON.stringify(datosDelProducto)}'>
                            Agregar al Carrito
                        </button>
                        <button class="btn btn-danger btn-remove-from-cart" 
                            data-product-id="${this.id}" 
                            data-product-type="experiencia">
                            Eliminar
                        </button>
                    </div>
                    <div class="mensaje-container mt-2"></div> <!-- contenedor para mostrar mensajes -->
                </div>
            </div>
        `;

        return card;
    }
}
