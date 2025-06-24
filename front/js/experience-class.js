export class Experiences{
    constructor(title, description, fechaDesde, fechaHasta, imagen, price) {
        this.title = title;
        this.description = description;
        this.fechaDesde = new Date(fechaDesde);
        this.fechaHasta = new Date(fechaHasta);
        this.imagen = imagen || "not-found.jpeg"; // Imagen por defecto, se puede cambiar según la experiencia
        this.price = price;

    }

    createElementHtml() {
        const card = document.createElement("div");
    
        const experienceLower = this.title.toLowerCase().replace(/\s+/g, "-"); // para evitar espacios
        const imagenJpg = `http://localhost:3000/img/${experienceLower}.jpg`;
        const imagenJpeg = `http://localhost:3000/img/${experienceLower}.jpeg`;
        const imagenDefault = `http://localhost:3000/img/not-found.jpg`;
    
        const desde = this.fechaDesde.toLocaleDateString("es-AR");
        const hasta = this.fechaHasta.toLocaleDateString("es-AR");
    
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
                        };" 
                    class="card-img-top" 
                    alt="imagen de experiencia"
                >
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-center">${this.title}</h5>
                    <p class="card-text text-center">${this.description}</p>
                    <p class="card-text text-center text-muted">Válido desde el <strong>${desde}</strong> hasta el <strong>${hasta}</strong></p>
                    <p class="card-text text-center text-success fw-bold fs-4">Precio: $${this.price}</p>
                </div>
            </div>
        `;
    
        return card;
    }
}