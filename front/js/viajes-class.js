export class Viajes {
    constructor(origen, destino, descripcion, fechaSalida, fechaLlegada, imagen, precio) {
        this.origen = origen;
        this.destino = destino;
        this.description = descripcion;
        this.fechaSalida = new Date(fechaSalida);
        this.fechaLlegada = new Date(fechaLlegada);
        this.imagen = "1.jpeg"; // Imagen por defecto, se puede cambiar según el viaje
        this.precio = precio;
    }

    createElementHtml() {
        const card = document.createElement("div");

        card.className = "col-12 col-sm-6 col-md-3 mt-5";

        card.innerHTML = `
        <div class="card h-100">       
        
        <div>
        <div class="card-header">
        <div class="card-body d-flex flex-column justify-content-between">
                <img src="http://localhost:3000/img/${this.imagen}" class="card-img-top" alt="imagen de viaje">
                    <h5 class="card-title text-center">${this.origen} - ${this.destino} </h5>
                    <p class="card-text text-center">${this.description}</p>                    
                    <p class="card-text text-center text-success fw-bold fs-4">Precio: $${this.precio}</p>
                </div>
            </div>
        `;
        console.log("Imagen cargada:", this.imagen); // debería decir bariloche.jpg, no undefined

        return card;
    }

    
}