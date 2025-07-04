const {DataTypes} = require('sequelize');
const sequelize = require('../db/sequelize'); //Me traigo Clase sequelize

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
    descripcion: {
        type: DataTypes.TEXT, 
        // allowNull: false,
    },
    imagen: {
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
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
}

}, {
    timestamps: false 
});
console.log("Modelo Viaje creado correctamente");
 
// Viaje.sync({alter: true}) //Sincroniza el modelo con la base de datos, force: false no elimina la tabla si ya existe
console.log("Tabla Viaje sincronizada correctamente");

module.exports = Viaje; //Exportamos el modelo