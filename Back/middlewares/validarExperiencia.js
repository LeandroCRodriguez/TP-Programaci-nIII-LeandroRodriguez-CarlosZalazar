function validarExperiencia(req, res, next) 
{
    const {experiencia, fecha, calificacion, comentario, precio, imagen} = req.body;
    const errores = {};

    if(experiencia.length <= 3)
    {
        errores.experiencia = "La experiencia debe tener al menos 4 caracteres";
    }
    if(comentario.length <= 3)
    {
        errores.comentario = "El comentario debe tener al menos 4 caracteres"; 
    }
    if(precio <= 0)
    {
        errores.precio = "El precio debe ser mayor a 0";
    }

    if (Object.keys(errores).length > 0) {
        return res.render("admin/crear_experiencias", { 
            errores            
        });
    }
    
    next();
}
module.exports = validarExperiencia;
