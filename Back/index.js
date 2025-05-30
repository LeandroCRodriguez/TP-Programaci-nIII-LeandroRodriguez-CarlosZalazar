const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./db/sequelize'); // Importo la conexión a la base de datos
process.loadEnvFile();


//Traigo los Enrutadores
const viajeRouter = require('./routes/viajes.routes');
const experienciaRouter = require('./routes/experiencias.routes');

//Utilizo el bodyparser
app.use(bodyParser.json());

//Utilizo los enrutadores
app.use('/viajes', viajeRouter);
app.use('/experiencias', experienciaRouter);


// sequelize.sync({ force: true }) // <- solo durante el desarrollo
//     .then(() => {
//         console.log('Base de datos sincronizada');
//         app.listen(3000, () => {
//             console.log('Servidor escuchando en el puerto 3000');
//         });
//     })
//     .catch((err) => {
//         console.error('Error al sincronizar la base de datos:', err);
//     });


    
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});