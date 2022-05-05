var express = require('express');
var router = express.Router();
let bicicletaController = require('../controllers/bicicleta')
let authenticate = require('./../controllers/authentication')

router.get('/', authenticate.validate_Login, bicicletaController.bicicleta_list);
router.get('/create', authenticate.validate_Login, bicicletaController.bicicleta_create_get)
router.post('/create', bicicletaController.bicicleta_create_post)
router.post('/:id/delete', bicicletaController.bicicleta_delete_post)
router.get('/:id/update', authenticate.validate_Login, bicicletaController.bicicleta_update_get)
router.post('/:id/update', bicicletaController.bicicleta_update_post)

module.exports = router;
