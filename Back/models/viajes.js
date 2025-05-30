const {DataTypes} = require('sequelize');
const sequelize = require('../db/sequelize.js'); //Me traigo Clase sequelize

const Viaje = sequelize.define("viajes", {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    origen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaSalida: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaLlegada: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});             


module.exports = Viaje; //Exportamos el modelo