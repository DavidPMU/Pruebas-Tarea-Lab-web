var express = require('express');
var router = express.Router();
let usuarioController = require('../../controllers/api/usuarioControllerAPI')

//Listar de users
router.get('/', usuarioController.users_list);

//Crear usuario
router.post('/create', usuarioController.users_create);

//Reservar
router.post('/reservar', usuarioController.usuario_reservar)

module.exports = router;

