const express = require('express');
const app = express();
const bodyParser = require('body-parser');
process.loadEnvFile();
const sequelize = require('./db/sequelize'); // Importo la conexión a la base de datos

// Configuro CORS para permitir solicitudes desde el frontend
const cors = require('cors');
app.use(cors());


// Importo los modelos
    const viajes = require('./models/viajes');
    const experiencias = require('./models/experiencias');

//Traigo los Enrutadores
const viajeRouter = require('./routes/viajes.routes');
const experienciaRouter = require('./routes/experiencias.routes');

//Utilizo el bodyparser
app.use(bodyParser.json());

//Utilizo los enrutadores
app.use('/viajes', viajeRouter);
app.use('/experiencias', experienciaRouter);

    
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});