const Viaje = require('../models/viajes'); 
const Experiencia = require('../models/experiencias');
const Admin = require("../models/admin")
const bcrypt = require("bcrypt");


class AdminController {
    static mostrarLogin(req, res) {
        res.render("admin/login", { error: null });
    }

    static async procesarLogin(req, res) { // La función debe ser asíncrona
        const { email, password } = req.body;

        try {
            // Busca el admin por email en la base de datos
            const adminEncontrado = await Admin.findOne({ where: { email: email } });

            if (adminEncontrado) {
                // Compara la contraseña ingresada por el usuario (sin hash) 
                // con la contraseña hasheada que está en la base de datos.
                const passwordCoincide = await bcrypt.compare(password, adminEncontrado.password);

                if (passwordCoincide) {
                    // Si las contraseñas coinciden, redirige al dashboard
                    return res.redirect("/admin/dashboard");
                }
            }
            // Si el admin no se encuentra o la contraseña no coincide, 
            // renderiza el login con un mensaje de error.
            return res.render("admin/login", { error: "Email o contraseña incorrectos" });
        } catch (error) {
            console.error("Error en el login:", error);
            // Envía un mensaje de error más detallado en la consola del servidor
            return res.status(500).send("Error interno del servidor durante el login.");
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
