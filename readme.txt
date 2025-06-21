Agregar fecha.

30-5 instale:
//npm install express Instalar express
//npm init -y
//npm install sequelize
//npm install mysql2
//npm install nodemon -D
//npm install ejs
//npm i Bcrypt

Armé las siguientes carpetas en el Back:
-viajes.controller.js
-sequelize
-viajes.js
-experiencias.routes
-viajes.routes
-env

-----------------------------------------------------------------
30-5 Nota:
LEAN:
PROXIMA fecha debemos tener incorporado al proyecto:

* CRUD PRODUCTOS Back
* PANTALA PRODUCTOS

en lo posible DASHBOARD DEL BACK (OP).

Clase producto/viajes
*Titulo
*Imagen
*Destino
*Descripcion
*Servicios Adicionañes (busqueda a aeropuerto, media pension, pension completa)
*Precio
*Personas (podriamos poner dos botones +/-)

Clase producto/Experiencias
*Titulo
*Imagen
*Descripcion
*Precio
*Personas (podriamos poner dos botone +/- )

Validé el campo de ingreso del nombre y lanza mensaje de error.

--------------------------------------------------

1) - ARCHIVO SEQUELIZE, codigo de la conexion a nuestra base.
2) - ARCHIVO EN MODELS, definimos el modelo de la tabla o formato.
3) - ARCHIVO CONTROLLERS, definimos las acciones del get, post, put y delete.
4) - ARCHIVO ROUTES, definimos la ruta hacia el controlador

LEAN, NO OLVIDES INSTALAR EL npm install body-parse.

Ahí le metí mano al crud y va como piña.


--------------------------------------------------
6/6 
CARLOS:

-Ya agregué experiencias a las 3 carpetas.
-CONTROLLERS, MODELS y ROUTES. 
-importé los modelos y los enrutadores en el index y anda todo joya!
-Pude levantar las tablas en la base de datos tambien.
Un gol!


_________________________________________________________________________

MODELO DEL MODAL:

<!-- Botón para abrir el modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cursoModal">
  Ver curso
</button>

<!-- Modal -->
<div class="modal fade" id="cursoModal" tabindex="-1" aria-labelledby="cursoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="cursoModalLabel">Desarrollo de Aplicaciones Web</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <img src="https://via.placeholder.com/600x300" class="img-fluid mb-3" alt="Imagen del curso">
        <p>
          Aprende a desarrollar sitios web y aplicaciones modernas usando HTML, CSS, JavaScript, y frameworks como Angular o React.
        </p>
        <p class="fw-bold text-primary fs-5">Precio: 2.950 €</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-success">Inscribirme</button>
      </div>
    </div>
  </div>
</div>


para el bootstrap

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>


iconos

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">

<i class="bi bi-plus"></i>      <!-- icono de + -->
<i class="bi bi-dash"></i>      <!-- icono de - -->
<i class="bi bi-plus-circle"></i>  <!-- + en un círculo -->
<i class="bi bi-dash-circle"></i>  <!-- - en un círculo -->
