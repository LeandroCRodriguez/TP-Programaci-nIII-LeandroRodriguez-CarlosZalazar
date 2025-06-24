const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Crear carpeta si no existe
const uploadDir = 'public/img/viajes';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    // Usamos "destino" para el nombre del archivo si está disponible
    const destino = req.body?.destino?.replace(/\s+/g, '_').toLowerCase() || 'imagen';
    cb(null, `${destino}-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'));
    }
  }
});

// Controladores
const AdminController = require('../controllers/admin.controller');
const viajeController = require('../controllers/viajes.controller');
const experienciaController = require('../controllers/experiencias.controller');

// Middlewares de validación
const validarViaje = require('../middlewares/validarViaje');
const validarExperiencia = require('../middlewares/validarExperiencia');

// Dashboard y Login
router.get('/dashboard', AdminController.mostrarDashboard);
router.get('/login', AdminController.mostrarLogin);
router.post('/login', AdminController.procesarLogin);

// Crear viajes
router.get('/viajes/crear', (req, res) => {
  res.render('admin/crear_viajes', { errores: {} });
});

router.post(
  '/viajes/crear',
  upload.single('file'),
  validarViaje,
  viajeController.crear
);

// Crear experiencias
router.get('/experiencias/crear', (req, res) => {
  res.render('admin/crear_experiencias', { errores: {} });
});

router.post(
  '/experiencias/crear',
  validarExperiencia,
  experienciaController.crear
);

// Eliminar
router.post('/viajes/eliminar/:id', viajeController.eliminar);
router.post('/experiencias/eliminar/:id', experienciaController.eliminar);

// Modificar viajes
router.get('/viajes/modificar/:id', async (req, res) => {
  try {
    const viajeEncontrado = await viajeController.traerPorId(req);
    if (viajeEncontrado) {
      res.render('admin/modificar_viajes', {
        viaje: viajeEncontrado,
        errores: {}
      });
    } else {
      res.status(404).send('Viaje no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener viaje:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.post(
  '/viajes/modificar/:id',
  upload.single('file'),
  validarViaje,
  viajeController.modificar
);

// Modificar experiencias
router.get('/experiencias/modificar/:id', async (req, res) => {
  try {
    const experienciaEncontrada = await experienciaController.traerPorId(req);
    if (experienciaEncontrada) {
      res.render('admin/modificar_experiencias', {
        experiencia: experienciaEncontrada,
        errores: {}
      });
    } else {
      res.status(404).send('Experiencia no encontrada');
    }
  } catch (error) {
    console.error('Error al obtener experiencia:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.post(
  '/experiencias/modificar/:id',
  validarExperiencia,
  experienciaController.modificar
);

module.exports = router;
