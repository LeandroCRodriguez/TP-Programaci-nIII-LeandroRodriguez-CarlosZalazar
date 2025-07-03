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
app.use(express.static(Path.join(__dirname, '../front')));

app.get('/', (req, res) => {
    res.sendFile(Path.join(__dirname, '../front/index.html'));
});




//ticket para descargar
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


app.get("/descarga/ticket", (req, res) => {
  const carrito = JSON.parse(decodeURIComponent(req.query.carrito || "[]")); //recibo el carrito
  const nombre = decodeURIComponent(req.query.nombre || "Usuario"); //recibo el nombre

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=ticket.pdf");
  doc.pipe(res);

  doc.text(`Ticket de Compra\nCliente: ${nombre}\nFecha: ${new Date().toLocaleString("es-AR")}\n`);

  let total = 0;
  carrito.forEach((p, i) => {
    doc.text(`${i + 1}. ${p.tipo === "viaje" ? `${p.origen} - ${p.destino}` : p.experiencia}`);
    doc.text(`   Precio: $${p.precio} | Cantidad: ${p.cantidad}\n`);
    total += p.precio * p.cantidad;
  });

  doc.text(`\nTotal: $${total}`);
  doc.end();
});






    
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});