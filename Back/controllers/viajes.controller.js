const viaje = require('../models/viajes');

class ViajeController {
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
            console.error("Error al obtener viaje:", error);
            return null;
        }
    }

    static async crear(req, res) {
        const { origen, destino, fechaSalida, fechaLlegada, descripcion, precio } = req.body;
        const imagen = req.file ? req.file.filename : null;

        try {
            await viaje.create({
                origen,
                destino,
                fechaSalida,
                fechaLlegada,
                precio,
                descripcion,
                imagen
            });
            res.redirect('/admin/dashboard');
        } catch (error) {
            console.error("Error al crear el viaje:", error);
            res.status(400).send({ error: 'Error al crear el viaje', details: error.message });
        }
    }

    static async modificar(req, res) {
        const id = req.params.id;
        const { origen, destino, fechaSalida, fechaLlegada, precio, imagen } = req.body;
        try {
            const viajeEncontrado = await viaje.findByPk(id);
            if (viajeEncontrado) {
                await viajeEncontrado.update({
                    origen,
                    destino,
                    fechaSalida,
                    fechaLlegada,
                    precio,
                    imagen
                });
                res.redirect('/admin/dashboard');
            } else {
                res.status(404).send({ error: 'Viaje no encontrado' });
            }
        } catch (error) {
            console.error("Error al modificar el viaje:", error);
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
            console.error("Error al eliminar el viaje:", error);
            res.status(400).send({ error: 'Error al eliminar el viaje' });
        }
    }
}

module.exports = ViajeController;
