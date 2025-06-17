export class Experiences{
    constructor(title, description, date, price) {
        this.title = title;
        this.description = description;
        this.date = new Date(date);
        this.price = price;
    }

    createElementHtml() {
        const card = document.createElement("div");

        card.className = "col-12 col-sm-6 col-md-3 mt-5";

        card.innerHTML = `
            <div class="card h-100">
                <img src="img/experience.jpg" class="card-img-top" alt="imagen de experiencia">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-center">${this.title}</h5>
                    <p class="card-text text-center">${this.description}</p>
                    <p class="card-text text-center">Precio: $${this.price.toFixed(2)}</p>  
                </div>
            </div>
        `;
        return card;
    }    
}