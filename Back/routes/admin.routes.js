const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller'); 
const Experiencia = require('../models/experiencias');
const Viaje = require('../models/viajes');
const viajeController = require('../controllers/viajes.controller'); // Importa el controlador de Viajes
const experienciaController = require('../controllers/experiencias.controller'); // Importa el controlador de Experiencias

//Agregar middlewares


// RUTAS PARA LA CREACIÓN DE VIAJES
// Muestra el formulario para crear un nuevo viaje
router.get('/viajes/crear', (req, res) => {
    res.render('admin/crear_viajes'); // Renderiza tu vista EJS para crear viajes
});

// Procesa el formulario de creación de viajes
router.post('/viajes/crear', viajeController.crear); // Usa el método crear del controlador de viajes

// RUTAS PARA LA CREACIÓN DE EXPERIENCIAS
// Muestra el formulario para crear una nueva experiencia
router.get('/experiencias/crear', (req, res) => {
    res.render('admin/crear_experiencias'); // Renderiza tu vista EJS para crear experiencias
});

// Procesa el formulario de creación de experiencias
router.post('/experiencias/crear', experienciaController.crear); // Usa el método crear del controlador de experiencias

// Mostrar formulario de login
router.get('/login', AdminController.mostrarLogin);
// Procesar login
router.post('/login', AdminController.procesarLogin);

//Ruta para experiencias ejs
router.get('/crear-experiencias', (req, res) => {
    res.render('admin/crear_experiencias');
});

router.get('/dashboard', async (req, res) => {
  try {
    const experiencias = await Experiencia.findAll();
    const viajes = await Viaje.findAll();
    res.render('admin/dashboard', { experiencias, viajes });
  } catch (error) {
    console.error("Error al obtener datos del dashboard:", error);
    res.status(500).send('Error al cargar dashboard'); 
  }
});


module.exports = router; 

