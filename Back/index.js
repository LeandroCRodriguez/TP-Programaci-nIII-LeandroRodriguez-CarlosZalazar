const express = require('express');
const app = express();
const bodyParser = require('body-parser');
process.loadEnvFile();
const sequelize = require('./db/sequelize'); // Importo la conexión a la base de datos

//Utilizo el bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));// Para datos de formularios (como login EJS)
//EJS
const Path = require('path'); // Importar el módulo 'path' para manejar rutas de archivos
app.set('view engine', 'ejs'); // Configurar EJS como motor de plantillas
app.set("views", Path.join(__dirname, "views")); // Configurar la carpeta de vistas 
//EJS

// Configuro CORS para permitir solicitudes desde el frontend
const cors = require('cors');
app.use(cors());


//Traigo los Enrutadores
const viajeRouter = require('./routes/viajes.routes');
const experienciaRouter = require('./routes/experiencias.routes');
const adminRouter = require('./routes/admin.routes'); 



//Utilizo los enrutadores
app.use('/viajes', viajeRouter);
app.use('/experiencias', experienciaRouter);
app.use('/admin', adminRouter);
//Configurar carpeta public
app.use(express.static(Path.join(__dirname, 'public')));




    
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});