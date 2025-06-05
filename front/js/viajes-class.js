export class Viajes {
    constructor(origen, destino, fechaSalida, fechaLlegada, precio) {
        this.origen = origen;
        this.destino = destino;
        this.fechaSalida = new Date(fechaSalida);
        this.fechaLlegada = new Date(fechaLlegada);
        this.precio = precio;
    }

    createElementHtml() {
        const viajeElement = document.createElement("div");
        viajeElement.className = "viaje";
        viajeElement.innerHTML = `
            <h3>Origen: ${this.origen}</h3>
            <p>Destino: ${this.destino}</p>
            <p>Fecha de Salida: ${this.fechaSalida.toLocaleDateString()}</p>
            <p>Fecha de Llegada: ${this.fechaLlegada.toLocaleDateString()}</p>
            <p>Precio: $${this.precio.toFixed(2)}</p>
        `;
        return viajeElement;
        
    }
}