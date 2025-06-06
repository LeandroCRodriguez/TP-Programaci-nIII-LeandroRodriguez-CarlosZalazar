const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');

// Mostrar formulario de login
router.get('/login', AdminController.mostrarLogin);

// Procesar login
router.post('/login', AdminController.procesarLogin);

// Ruta temporal para simular dashboard (todavía no lo hiciste, así que lo agregamos fijo)
router.get("/dashboard", (req, res) => {
    res.render("admin/dashboard"); 
});


module.exports = router; 
 