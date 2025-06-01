export class Usuario{
    constructor(nombre, edad, email){
        this.nombre = nombre;
        this.edad = edad;
        this.email = email;
    }

    getNombre(){
        return this.nombre;
    }

}