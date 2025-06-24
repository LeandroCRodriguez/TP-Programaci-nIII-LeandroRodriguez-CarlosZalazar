const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../public/img/viajes');

// Crear el directorio si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Esperar a que el campo 'destino' esté disponible
    const ext = path.extname(file.originalname);

    // Obtenemos el valor de 'destino' del body
    const destino = req.body.destino ? req.body.destino.trim().replace(/\s+/g, '_') : 'sin-destino';

    const nombreArchivo = `${destino}${ext}`;
    cb(null, nombreArchivo);
  }
});

const upload = multer({ storage });

module.exports = upload;
