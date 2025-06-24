const ExperienciaModel = require('../models/experiencias.js'); //Importamos el modelo de Experiencia

class ExperienciaController {
    static async traerTodos(req, res) {
        try {
            const experiencias = await ExperienciaModel.findAll();
            res.json(experiencias);
        } catch (error) {
            console.error("Error al obtener todas las experiencias:", error);
            res.status(500).send({ error: "Error interno del servidor" });
        }
    }

    static async traerPorId(req, res) {
        const id = req.params.id;
        try {
            const experienciaEncontrada = await ExperienciaModel.findByPk(id);
            if (experienciaEncontrada) {
                res.json(experienciaEncontrada);
            } else {
                res.status(404).send({ error: "Experiencia no encontrada" });
            }
        } catch (error) {
            console.error("Error al obtener la experiencia por ID:", error);
            res.status(500).send({ error: "Error interno del servidor" });
        }
    }

    static async crear(req, res) {
        const { title, description, fechaDesde, fechaHasta, price } = req.body;
        try {
            await ExperienciaModel.create({ title, description, fechaDesde, fechaHasta, price });
            res.redirect('/admin/dashboard');
        } catch (error) {
            console.error('Error al crear la experiencia:', error);
            res.status(400).send({
                error: 'Error al crear la experiencia',
                details: error.message,
            });
        }
    }

    static async modificar(req, res) {
        const id = req.params.id;
        const { title, description, fechaDesde, fechaHasta, price } = req.body;
        try {
            const experienciaEncontrada = await ExperienciaModel.findByPk(id);
            if (experienciaEncontrada) {
                await experienciaEncontrada.update({ title, description, fechaDesde, fechaHasta, price });
                res.redirect('/admin/dashboard');
            } else {
                res.status(404).send({ error: 'Experiencia no encontrada' });
            }
        } catch (error) {
            console.error('Error al modificar la experiencia:', error);
            res.status(400).send({
                error: 'Error al modificar la experiencia',
                details: error.message,
            });
        }
    }

    static async eliminar(req, res) {
        const id = req.params.id;
        try {
            const experienciaEncontrada = await ExperienciaModel.findByPk(id);
            if (experienciaEncontrada) {
                await experienciaEncontrada.destroy();
                res.redirect('/admin/dashboard');
            } else {
                res.status(404).send({ error: 'Experiencia no encontrada' });
            }
        } catch (error) {
            console.error('Error al eliminar la experiencia:', error);
            res.status(400).send({ error: 'Error al eliminar la experiencia' });
        }
    }
}

module.exports = ExperienciaController;
