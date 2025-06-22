const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller'); 
const viajeController = require('../controllers/viajes.controller'); 
const experienciaController = require('../controllers/experiencias.controller'); 
//Agregar middlewares
//Para usar middlewares ya hechos tengo que instalar
//npm i cors errorhandler morgan 


router.get('/dashboard', AdminController.mostrarDashboard);
router.get('/login', AdminController.mostrarLogin);
router.post('/login', AdminController.procesarLogin);

// Rutas para crear

router.get('/viajes/crear', (req, res) => {
    res.render('admin/crear_viajes'); // Renderiza tu vista EJS para crear viajes
});



//Middlewares 
const validarViaje = require('../middlewares/validarViaje'); 

// Procesa el formulario de creación de viajes
router.post('/viajes/crear',validarViaje, viajeController.crear); // Usa el método crear del controlador de viajes

// Muestra el formulario para crear una nueva experiencia
router.get('/experiencias/crear', (req, res) => {
    res.render('admin/crear_experiencias'); // Renderiza tu vista EJS para crear experiencias
});

// Procesa el formulario de creación de experiencias
router.post('/experiencias/crear', experienciaController.crear); // Usa el método crear del controlador de experiencias

//Rutas para eliminar

router.post('/viajes/eliminar/:id', viajeController.eliminar);
router.post('/experiencias/eliminar/:id', experienciaController.eliminar);

//Rutas para modificar

router.get("/viajes/modificar/:id", async (req, res) => { // ¡Ahora es async!
    try {
        const viajeEncontrado = await viajeController.traerPorId(req); 
        if (viajeEncontrado) {
            res.render("admin/modificar_viajes", { viaje: viajeEncontrado }); 
        } else {
            res.status(404).send('Viaje no encontrado para modificar');
        }
    } catch (error) {
        console.error("Error al obtener viaje para modificar:", error);
        res.status(500).send('Error interno del servidor al cargar el formulario de modificación de viaje');
    }
});

router.get("/experiencias/modificar/:id", async (req, res) => { // ¡Ahora es async!
    try {
        const experienciaEncontrada = await experienciaController.traerPorId(req); 
        if (experienciaEncontrada) {
            res.render("admin/modificar_experiencias", { experiencia: experienciaEncontrada }); 
        } else {
            res.status(404).send('Experiencia no encontrada para modificar');
        }
    } catch (error) {
        console.error("Error al obtener experienca para modificar:", error);
        res.status(500).send('Error interno del servidor al cargar el formulario de modificación de la experiencia');
    }
});

router.post('/viajes/modificar/:id', viajeController.modificar);
router.post('/experiencias/modificar/:id', experienciaController.modificar); 

module.exports = router; 

