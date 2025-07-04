const ExperienciaModel = require('../models/experiencias.js'); //Importamos el modelo de Experiencia

class ExperienciaController 
{
    static async traerTodos(req, res) {
        const experiencias = await ExperienciaModel.findAll({where: { activo: true }});    
        res.send(experiencias); 
    }


        static async traerPorId(req) {
            const id = req.params.id;
            try {
                const experienciaEncontrada = await ExperienciaModel.findByPk(id);
                return experienciaEncontrada; 
            } catch (error) {
                console.error("Error al obtener la experiencia para formulario:", error);
                return null;
            }
        }

    static async crear(req, res) {
        const { experiencia, fecha, calificacion, comentario, precio } = req.body; //Obtenemos los datos de la experiencia del cuerpo de la petición
        let imagen = null;
        if (req.file) {
        imagen = "/img/" + req.file.filename; // Ruta donde se guardó la imagen
        }
        try {
            const nuevaExperiencia = await ExperienciaModel.create({
                experiencia, 
                fecha, 
                calificacion, 
                comentario, 
                precio, 
                imagen 
            })
            res.redirect('/admin/dashboard');
        } catch (error) {
            console.error('Error al crear la experiencia:', error);
            res.status(400).send({ error: 'Error al crear la experiencia', details: error.message, });  
        }
    }
    static async modificar(req, res) {
        const id = req.params.id; //Obtenemos el id de la experiencia
        const { experiencia, fecha, calificacion, comentario, precio} = req.body; 
        let imagen = null;
        if (req.file) {
        imagen = "/img/" + req.file.filename; // Ruta donde se guardó la imagen
        }
        try {
            const experienciaEncontrada = await ExperienciaModel.findByPk(id); 
            if (experienciaEncontrada) {
                await experienciaEncontrada.update({ experiencia, fecha, calificacion, comentario, precio, imagen  }); 
                 res.redirect('/admin/dashboard'); 
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
            const experienciaEncontrada = await ExperienciaModel.findByPk(id);  
            if (experienciaEncontrada) {
                experienciaEncontrada.activo = false;
                await experienciaEncontrada.save();
                res.redirect('/admin/dashboard'); 
            } else {
                res.status(404).send({ error: 'Experiencia no encontrada' }); 
            }
        } catch (error) {
            res.status(400).send({ error: 'Error al eliminar la experiencia' }); 
        }
    }

    static async restaurar(req, res) {
        const id = req.params.id;
        try {
            const experiencia = await ExperienciaModel.findByPk(id);
            if (experiencia) {
            experiencia.activo = true;
            await experiencia.save();
            res.redirect('/admin/dashboard');
            } else {
            res.status(404).send({ error: 'Experiencia no encontrada' });
            }
        } catch (error) {
            res.status(400).send({ error: 'Error al restaurar la experiencia' });
        }
    }

} 
module.exports = ExperienciaController; 