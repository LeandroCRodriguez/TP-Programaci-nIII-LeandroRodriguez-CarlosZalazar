const viaje = require('../models/viajes'); //Importo el modelo de viajes

class ViajeController
{
    static async traerTodos(req, res) {
        const viajes = await viaje.findAll(); 
        res.send(viajes); 
    }

    static async traerPorId(req) {
        const id = req.params.id;
        try {
            const viajeEncontrado = await viaje.findByPk(id);
            return viajeEncontrado; 
        } catch (error) {
            console.error("Error al obtener viaje para formulario:", error);
            return null;
        }
    }


    static async crear(req, res) {
        const { origen, destino, fechaSalida, fechaLlegada, precio, imagen } = req.body; //Obtengo los datos del viaje del cuerpo de la petición
        try {
            const nuevoViaje = await viaje.create({ origen, destino, fechaSalida, fechaLlegada, precio, imagen }); 
            res.redirect('/admin/dashboard');
        } catch (error) {
            res.status(400).send({ error: 'Error al crear el viaje', details: error.message });
        }
    }   

    static async modificar(req, res) { 
        const id = req.params.id; 
        const { origen, destino, fechaSalida, fechaLlegada, precio, imagen } = req.body; 
        try {
            const viajeEncontrado = await viaje.findByPk(id); 
            if (viajeEncontrado) {
                await viajeEncontrado.update({ origen, destino, fechaSalida, fechaLlegada, precio, imagen }); 
                res.redirect('/admin/dashboard');
            } else {
                res.status(404).send({ error: 'Viaje no encontrado' }); 
            }
        } catch (error) {
            res.status(400).send({ error: 'Error al modificar el viaje' }); 
        }
    }       

    static async eliminar(req, res) {
        const id = req.params.id; 
        try {
            const viajeEncontrado = await viaje.findByPk(id); 
            if (viajeEncontrado) {
                await viajeEncontrado.destroy(); 
                res.redirect('/admin/dashboard');  
            } else {
                res.status(404).send({ error: 'Viaje no encontrado' }); 
            }
        } catch (error) {
            res.status(400).send({ error: 'Error al eliminar el viaje' }); 
        }
    }   
    
}

module.exports = ViajeController; 