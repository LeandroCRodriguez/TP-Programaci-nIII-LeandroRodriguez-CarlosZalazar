const express = require('express');
const router = express.Router();
const ViajeController = require('../controllers/viajes.controller'); // Me traigo el controlador de viajes
const Viaje = require('../models/viajes');

// Defino las rutas y los métodos del controlador

//EJS
router.get("/crear", (req, res) => {
    res.render("crear_viajes");
});


router.get('/', ViajeController.traerTodos); // Trae todos los viajes 

router.get('/:id', ViajeController.traerPorId); // Trae un viaje por ID

router.post('/', ViajeController.crear); // Crea un nuevo viaje

router.put('/:id', ViajeController.modificar); // Modifica un viaje existente

router.delete('/:id', ViajeController.eliminar); // Elimina un viaje por ID




module.exports = router; // Exporto el router para usarlo en la aplicación principal   




