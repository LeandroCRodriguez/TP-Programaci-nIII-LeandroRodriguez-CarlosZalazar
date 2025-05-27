const MotoModel = require("../models/motos.js"); //Me traigo el modelo de autos

class MotoController
{
    static async traerTodos(req, res) {
        const motos = await MotoModel.findAll(); //Me traigo todas las motos
        res.send(motos); //Devuelvo las motos
        
    }

    static async traerPorId(req, res)
    {
        const id = req.params.id; //Me traigo el id de la url
        const resultado = await MotoModel.findByPk(id); //Busco la moto por id
        res.send(resultado); //Devuelvo la moto 
    }

    //Los datos vienen por el body, no por la url. 
    //1 Por seguridad, 2 por tamaño. El id si va por params
    static async crear(req, res) 
    {
        try
        {
            const body = req.body; //Me traigo el body
            const marca = body.marca; //Me traigo la marca
            const resultado = await MotoModel.create({marca: marca}); 
            res.send(resultado); //Devuelvo la moto creada

        }catch (error)
        {
            res.status(400);
            res.send({error:"hubo un error"});
        }
        
    }
    //Los datos vienen por el body, no por la url. 
    //1 Por seguridad, 2 por tamaño. El id si va por params
    static async modificar(req, res)
    {
        try
        {
            const id = req.params.id; //Me traigo el id de la url
            const marca = req.body.marca; //Me traigo la marca del body
            const resultado = await MotoModel.update(
            {marca: marca},
            {where: {id: id}}); //Busco la moto por id y la modifico
            res.send(resultado); //Devuelvo la moto modificada
        }catch (error)
        {
            res.status(400);
            res.send({error:"hubo un error"});
        }      
    }

    //Trae el id por params
    static async eliminar(req, res)
    {
        const id = req.params.id; //Me traigo el id de la url
        const resultado = await MotoModel.destroy({where: {id: id}}); //Busco la moto por id y la elimino
        res.send(resultado); //Devuelvo la moto eliminada
    }

}




module.exports = MotoController; //Exportamos la clase