const {DataTypes} = require('sequelize');
const sequelize = require('../db/sequelize.js'); //Me traigo Clase sequelize

const Experiencia = sequelize.define("experiencias", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaDesde: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaHasta: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Imagen: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    timestamps: false
});


console.log("Modelo Viaje creado correctamente");

//Experiencia.sync({force: true}) //Sincroniza el modelo con la base de datos, force: false no elimina la tabla si ya existe
console.log("Tabla Experiencia sincronizada correctamente");

module.exports = Experiencia; //Exportamos el modelo
