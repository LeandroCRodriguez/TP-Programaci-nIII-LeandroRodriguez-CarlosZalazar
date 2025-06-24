export class Viajes {
    constructor(origen, destino, descripcion, fechaSalida, fechaLlegada, imagen, precio) {
        this.origen = origen;
        this.destino = destino;
        this.description = descripcion;
        this.fechaSalida = new Date(fechaSalida);
        this.fechaLlegada = new Date(fechaLlegada);
        this.imagen = "not-found.jpeg"; // Imagen por defecto, se puede cambiar según el viaje
        this.precio = precio;
    }

    createElementHtml() {
        const card = document.createElement("div");
        const destinoLower = this.destino.toLowerCase();
    
        const imagenJpg = `http://localhost:3000/img/viajes/${destinoLower}.jpg`;
        const imagenJpeg = `http://localhost:3000/img/viajes/${destinoLower}.jpeg`;
        const imagenDefault = `http://localhost:3000/img/not-found.jpg`;
    
        card.className = "col-12 col-sm-6 col-md-3 mt-5";
    
        card.innerHTML = `
    <div class="card h-100">
        <img 
            src="${imagenJpg}" 
            onerror="
                this.onerror=null;
                this.src='${imagenJpeg}';
                this.onerror=function() {
                    this.onerror=null;
                    this.src='${imagenDefault}';
                };
            "
            class="card-img-top" 
            alt="imagen de viaje"
        >
        <div class="card-body">
            <h5 class="card-title text-center">${this.origen} - ${this.destino}</h5>
            <p class="card-text text-center">${this.description}</p>                    
            <p class="card-text text-center text-success fw-bold fs-4">Precio: $${this.precio}</p>
        </div>
    </div>
`;

    
        console.log("Imagen cargada:", imagenJpg);
    
        return card;
    }
    
}