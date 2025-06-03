const express = require('express');
const app = express();
const bodyParser = require('body-parser');
process.loadEnvFile();
const sequelize = require('./db/sequelize'); // Importo la conexión a la base de datos

// Importo los modelos
    const viajes = require('./models/viajes');

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