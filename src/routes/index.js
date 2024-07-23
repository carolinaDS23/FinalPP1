// src/routes/index.js

var express = require('express');
var router = express.Router();

// Importa el módulo controllers
const controllers = require('../controllers/controllers'); // Asegúrate de que la ruta es correcta

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CRUD' });
});

// Rutas de Persona
router.get('/personal', controllers.listPersonal);
router.get('/agregarPersonal', controllers.agregarPersonal);
router.post('/agregarPersonal', controllers.postAgregarPersonal);
router.get('/editarPersonal/:id', controllers.getEditarPersonal);
router.post('/updatePersonal/:id', controllers.postUpdatePersonal);
router.get('/deletePersonal/:id', controllers.getDeletePersonal);
router.post('/deletePersonal/:id', controllers.postDeletePersonal);
router.get('/buscarPersonal', controllers.buscarPersonal);
router.post('/resultadosPersonal', controllers.buscarPersonalResultados);

module.exports = router;
 