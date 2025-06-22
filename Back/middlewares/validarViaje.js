function validarViaje(req, res, next)
{
    const {origen, destino, fechaSalida, fechaLlegada, precio} = req.body;
    const errores = {};

    if(origen.length <= 3)
    {
        errores.origen = "Origen debe tener al menos 3 caracteres";
    }
    if(destino.length <= 3)
    {
        errores.destino = "Destino debe tener al menos 3 caracteres";
    }
    if(precio < 0)
    {
        errores.precio = "El precio debe ser un número positivo";
    }

    if (Object.keys(errores).length > 0) {
        return res.render("admin/crear_viajes", {
            errores,
            viaje: { origen, destino, fechaSalida, fechaLlegada, precio, imagen }
        });
    }
    
    next();
}
module.exports = validarViaje;