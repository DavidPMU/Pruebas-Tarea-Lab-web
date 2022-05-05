let express = require('express');
let router = express.Router();
let usersController = require('../controllers/users')
let authenticate = require('./../controllers/authentication')

router.get('/', authenticate.validate_Login, usersController.list)
router.get('/create', authenticate.validate_Login, usersController.create_get)
router.post('/create', usersController.create)
router.get('/:id/update', authenticate.validate_Login, usersController.update_get)
router.post('/:id/update', usersController.update)
router.post('/:id/delete', usersController.delete)

module.exports = router;

