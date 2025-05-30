const Viaje = require('../models/viajes.js'); //Importo el modelo de viajes

class ViajeController
{
    static async traerTodos(req, res) {
        const viajes = await Viaje.findAll(); 
        res.send(viajes); 
    }

    static async traerPorId(req, res) {
        //Logica
    }

    static async crear(req, res) {
        //Logica
    }   

    static async modificar(req, res) {
        //Logica
    }       

    static async eliminar(req, res) {
        //Logica
    }   

}

module.exports = ViajeController; //Exporto el controlador de viajes