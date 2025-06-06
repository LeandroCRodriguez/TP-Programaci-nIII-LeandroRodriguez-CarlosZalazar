const express = require('express');
const router = express.Router();
const ExperienciaController = require('../controllers/experiencias.controller'); // Me traigo el controlador de experiencias    

// Defino las rutas y los métodos del controlador
router.get('/', ExperienciaController.traerTodos); // Trae todas las experiencias
router.get('/:id', ExperienciaController.traerPorId); // Trae una experiencia por ID        
router.post("/", ExperienciaController.crear); // Crea una nueva experiencia
router.put('/:id', ExperienciaController.modificar); // Modifica una experiencia existente
router.delete('/:id', ExperienciaController.eliminar); // Elimina una experiencia por ID


module.exports = router;  