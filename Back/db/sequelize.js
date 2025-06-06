require('dotenv').config(); //ES necesaria esta linea?
const {Sequelize} = require('sequelize'); //Clase sequelize


const sequelize = new Sequelize("Viajes_y_Experiencias",
    process.env.SQL_USER, 
    process.env.SQL_PASSWORD, {
        dialect: "mysql",
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT
    }
)

module.exports = sequelize; //Exportamos la conexion