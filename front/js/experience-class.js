export class Experiences{
    constructor(id, experiencia, fecha, calificacion, comentario, precio) {
        this.id = id;
        this.experiencia = experiencia;
        this.fecha = new Date(fecha);
        this.calificacion = calificacion;
        this.comentario = comentario 
        this.precio = precio;
    }

    createElementHtml() {
        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-md-3 mt-5";

        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit' };
        const fecha = this.fecha.toLocaleDateString('es-ES', options);

        const datosDelProducto = {
            id: this.id,
            experiencia: this.experiencia,
            precio: this.precio,};


        card.innerHTML = `
            <div class="card h-100">
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
                </div>
            </div>
        `;

        return card;
    }
    
}
