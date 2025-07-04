const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller'); 
const viajeController = require('../controllers/viajes.controller'); 
const experienciaController = require('../controllers/experiencias.controller'); 
const upload = require("../middlewares/upload"); 

router.get('/dashboard', AdminController.mostrarDashboard);
router.get('/login', AdminController.mostrarLogin);
router.post('/login', AdminController.procesarLogin);

// Rutas para crear

router.get('/viajes/crear', (req, res) => {
    res.render('admin/crear_viajes',{errores:{}}); // Renderiza tu vista EJS para crear viajes
});


//Middleware para crear viaje
const validarViaje = require('../middlewares/validarViaje'); 

// Procesa el formulario de creación de viajes
router.post("/viajes/crear",upload.single("imagen"), validarViaje, viajeController.crear); // Usa el método crear del controlador de viajes con multer

// Muestra el formulario para crear una nueva experiencia
router.get('/experiencias/crear', (req, res) => {
    res.render('admin/crear_experiencias',{errores:{}}); // Renderiza tu vista EJS para crear experiencias
});


//Middleware para crear experiencia
const validarExperiencia = require("../middlewares/validarExperiencia");  

router.post(
  '/experiencias/crear',
  upload.single("imagen"),          // Middleware de subida de imagen
  validarExperiencia,               // Middleware de validación
  experienciaController.crear       // Controlador
);


//Rutas para eliminar

router.post('/viajes/eliminar/:id', viajeController.eliminar);
router.post('/experiencias/eliminar/:id', experienciaController.eliminar);
router.post('/viajes/restaurar/:id', viajeController.restaurar);
router.post('/experiencias/restaurar/:id', experienciaController.restaurar);



//Rutas para modificar

router.get("/viajes/modificar/:id", async (req, res) => {
    try {
        const viajeEncontrado = await viajeController.traerPorId(req); 
        if (viajeEncontrado) {
            res.render("admin/modificar_viajes", { viaje: viajeEncontrado , errores:{}}); 
        } else {
            res.status(404).send('Viaje no encontrado para modificar');
        }
    } catch (error) {
        console.error("Error al obtener viaje para modificar:", error);
        res.status(500).send('Error interno del servidor al cargar el formulario de modificación de viaje');
    }
});

router.get("/experiencias/modificar/:id", async (req, res) => { 
    try {
        const experienciaEncontrada = await experienciaController.traerPorId(req); 
        if (experienciaEncontrada) {
            res.render("admin/modificar_experiencias", { experiencia: experienciaEncontrada, errores:{} }); 
        } else {
            res.status(404).send('Experiencia no encontrada para modificar');
        }
    } catch (error) {
        console.error("Error al obtener experienca para modificar:", error);
        res.status(500).send('Error interno del servidor al cargar el formulario de modificación de la experiencia');
    }
});

router.post("/viajes/modificar/:id",upload.single("imagen"), validarViaje, viajeController.modificar); 

router.post(
  '/experiencias/modificar/:id',
  upload.single("imagen"),          // Middleware de subida de imagen
  validarExperiencia,               // Middleware de validación
  experienciaController.modificar       // Controlador
);
module.exports = router; 

