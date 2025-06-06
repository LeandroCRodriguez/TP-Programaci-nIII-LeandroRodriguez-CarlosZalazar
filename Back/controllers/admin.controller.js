
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
            return res.render("admin/login", { error: "Credenciales incorrectas" });
        }
    }
}

module.exports = AdminController; 
