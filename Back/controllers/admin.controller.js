const Viaje = require('../models/viajes'); 
const Experiencia = require('../models/experiencias');

class AdminController {
    static mostrarLogin(req, res) {
        res.render("admin/login", { error: null });
    }

    static procesarLogin(req, res) {
        const { email, password } = req.body;

        // Credenciales hardcodeadas
        if (email === "admin@admin.com" && password === "1234") {
            return res.redirect("/admin/dashboard");
        } else {
            return res.render("admin/login", { error: "contraseña incorrectas" }); 
        }
    }

    static async mostrarDashboard(req, res) {
        try {
            const experiencias = await Experiencia.findAll(); // Obtiene todas las experiencias de la DB
            const viajes = await Viaje.findAll(); // Obtiene todos los viajes de la DB
            // Renderiza la vista 'admin/dashboard.ejs' y le pasa los datos
            res.render('admin/dashboard', { experiencias, viajes });
        } catch (error) {
            console.error("Error al obtener datos del dashboard:", error);
            res.status(500).send('Error al cargar dashboard: ' + error.message); // Envía un mensaje de error más útil
        }
    }
}

module.exports = AdminController;  
