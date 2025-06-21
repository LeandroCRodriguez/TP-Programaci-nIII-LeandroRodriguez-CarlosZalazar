const Viaje = require('../models/viajes'); 
const Experiencia = require('../models/experiencias');
const Admin = require("../models/admin")
const BCrypt = require("bcrypt");


class AdminController {
    static mostrarLogin(req, res) {
        res.render("admin/login", { error: null });
    }

    static async procesarLogin(req, res) {
    const { email, password } = req.body;    
    
    try {
      const admin = await Admin.findOne({ where: { email } });

      if (!admin) {
        return res.render("admin/login", { error: "Email incorrecto" });
      }

      const esValido = BCrypt.compareSync(password, admin.password);

      if (esValido) {
        return res.redirect("/admin/dashboard");
      } else {
        return res.render("admin/login", { error: "Contraseña incorrecta" });
      }
    } catch (error) {
      return res.render("admin/login", { error: "Error en el servidor" });
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
