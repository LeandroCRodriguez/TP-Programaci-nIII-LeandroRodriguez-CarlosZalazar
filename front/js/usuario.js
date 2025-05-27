export class Usuario{
    constructor(nombre, edad, email){
        this.nombre = nombre;
        this.edad = edad;
        this.email = email;
    }

    getNombre(){
        return this.nombre;
    }

    getEdad(){
        return this.edad;
    }

    getEmail(){
        return this.email;
    }
}