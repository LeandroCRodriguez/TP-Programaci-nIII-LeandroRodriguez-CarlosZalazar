const viaje = require('../models/viajes.js'); //Importo el modelo de viajes

class ViajeController
{
    static async traerTodos(req, res) {
        const viajes = await viaje.findAll(); 
        res.send(viajes); 
    }

    static async traerPorId(req, res) {
        const id = req.params.id; //Obtengo el id del viaje
        const viajeEncontrado = await viaje.findByPk(id); //Busco el viaje por su id
        if (viajeEncontrado) {
            res.send(viajeEncontrado); //Si lo encuentro, lo devuelvo
        } else {
            res.status(404).send({ error: 'Viaje no encontrado' }); //Si no lo encuentro, devuelvo un error 404
        }
    }


    static async crear(req, res) {
        const { origen, destino, fechaSalida, fechaLlegada, precio } = req.body; //Obtengo los datos del viaje del cuerpo de la petición
        try {
            const nuevoViaje = await viaje.create({ origen, destino, fechaSalida, fechaLlegada, precio }); //Creo el nuevo viaje
            res.status(201).send(nuevoViaje); //Devuelvo el nuevo viaje creado con un estado 201
        } catch (error) {
            res.status(400).send({ error: 'Error al crear el viaje' }); //Si hay un error, devuelvo un error 400
        }
    }   

    static async modificar(req, res) {
        const id = req.params.id; //Obtengo el id del viaje
        const { origen, destino, fechaSalida, fechaLlegada, precio } = req.body; //Obtengo los datos del viaje del cuerpo de la petición
        try {
            const viajeEncontrado = await viaje.findByPk(id); //Busco el viaje por su id
            if (viajeEncontrado) {
                await viajeEncontrado.update({ origen, destino, fechaSalida, fechaLlegada, precio }); //Actualizo el viaje
                res.send(viajeEncontrado); //Devuelvo el viaje actualizado
            } else {
                res.status(404).send({ error: 'Viaje no encontrado' }); //Si no lo encuentro, devuelvo un error 404
            }
        } catch (error) {
            res.status(400).send({ error: 'Error al modificar el viaje' }); //Si hay un error, devuelvo un error 400
        }
    }       

    static async eliminar(req, res) {
        const id = req.params.id; //Obtengo el id del viaje
        try {
            const viajeEncontrado = await viaje.findByPk(id); //Busco el viaje por su id
            if (viajeEncontrado) {
                await viajeEncontrado.destroy(); //Elimino el viaje
                res.status(204).send(); //Devuelvo un estado 204 sin contenido
            } else {
                res.status(404).send({ error: 'Viaje no encontrado' }); //Si no lo encuentro, devuelvo un error 404
            }
        } catch (error) {
            res.status(400).send({ error: 'Error al eliminar el viaje' }); //Si hay un error, devuelvo un error 400
        }
    }   

}

module.exports = ViajeController; //Exporto el controlador de viajes