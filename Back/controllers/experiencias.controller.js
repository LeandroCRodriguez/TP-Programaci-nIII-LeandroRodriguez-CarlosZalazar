const experiencia = require('../models/experiencias.js'); //Importamos el modelo de Experiencia

class ExperienciaController 
{
    static async traerTodos(req, res) {
        const experiencias = await experiencia.findAll();  
        res.send(experiencias); 
    }

    static async traerPorId(req, res) {
        const id = req.params.id; 
        const experienciaEncontrada = await experiencia.findByPk(id); //Buscamos la experiencia por su id
        if (experienciaEncontrada) {
            res.send(experienciaEncontrada); 
        } else {
            res.status(404).send({ error: 'Experiencia no encontrada' }); 
        }
    }

    static async crear(req, res) {
        const { experiencia, fecha, calificacion, comentario, precio } = req.body; //Obtenemos los datos de la experiencia del cuerpo de la petición
        try {
            const nuevaExperiencia = await experiencia.create({ experiencia, fecha, calificacion, comentario, precio }); 
            res.status(201).send(nuevaExperiencia); //Devolvemos la nueva experiencia creada con un estado 201
        } catch (error) {
            res.status(400).send({ error: 'Error al crear la experiencia' }); 
        }
    }
    static async modificar(req, res) {
        const id = req.params.id; //Obtenemos el id de la experiencia
        const { experiencia, fecha, calificacion, comentario, precio } = req.body; 
        try {
            const experienciaEncontrada = await experiencia.findByPk(id); 
            if (experienciaEncontrada) {
                await experienciaEncontrada.update({ experiencia, fecha, calificacion, comentario, precio }); 
                res.send(experienciaEncontrada); 
            } else {
                res.status(404).send({ error: 'Experiencia no encontrada' }); 
            }
        } catch (error) {
            res.status(400).send({ error: 'Error al modificar la experiencia' }); 
        }
    }
    static async eliminar(req, res) {
        const id = req.params.id; 
        try {
            const experienciaEncontrada = await experiencia.findByPk(id); 
            if (experienciaEncontrada) {
                await experienciaEncontrada.destroy(); 
                res.status(204).send(); 
            } else {
                res.status(404).send({ error: 'Experiencia no encontrada' }); 
            }
        } catch (error) {
            res.status(400).send({ error: 'Error al eliminar la experiencia' }); 
        }
    }
}
module.exports = ExperienciaController; 