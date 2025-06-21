const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Admin = sequelize.define("admins", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: false
});
// Admin.sync({force: true});

module.exports = Admin;
