const multer = require('multer');
const path = require('path');

// Almacenamiento personalizado
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img'); // Carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname); // .jpg, .png, etc.
    const nombre = path.basename(file.originalname, extension);
    const nombreUnico = nombre + '-' + Date.now() + extension;
    cb(null, nombreUnico);
  }
});

// Filtro solo para imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen (jpg, jpeg, png, gif)'));
  }
};

// Exporto el middleware ya listo para usar
const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
