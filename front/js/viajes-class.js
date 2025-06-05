export class Viajes {
    constructor(origen, destino, fechaSalida, fechaLlegada, precio) {
        this.origen = origen;
        this.destino = destino;
        this.fechaSalida = new Date(fechaSalida);
        this.fechaLlegada = new Date(fechaLlegada);
        this.precio = precio;
    }

    createElementHtml() {
        const card = document.createElement("div");

        card.className = "col-12 col-sm-6 col-md-3 mt-5";
    
        card.innerHTML = `
            <div class="card h-100">
                <img src="img/perrito.jpeg" class="card-img-top" alt="imagen de viaje">
                <div class="card-header">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-center">${this.origen}</h5>
                    <p class="card-text text-center">${this.destino}</p>
                    <a href="#" class="btn btn-primary mt-auto">¡Lo quqiero!</a>                    
                </div>
            </div>
        `;
    
        return card;
    }
    
    
}