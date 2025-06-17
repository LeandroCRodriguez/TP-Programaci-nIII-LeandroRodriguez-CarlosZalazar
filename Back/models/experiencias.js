const {DataTypes} = require('sequelize');
const sequelize = require('../db/sequelize.js'); //Me traigo Clase sequelize

const Experiencia = sequelize.define("experiencias", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    experiencia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    calificacion: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false // Evita la creación de las columnas createdAt y updatedAt
});

console.log("Modelo Viaje creado correctamente");

// Experiencia.sync({force: true}) //Sincroniza el modelo con la base de datos, force: false no elimina la tabla si ya existe
console.log("Tabla Experiencia sincronizada correctamente");

module.exports = Experiencia; //Exportamos el modelo
