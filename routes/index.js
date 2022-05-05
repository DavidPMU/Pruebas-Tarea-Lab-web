var express = require('express');
const passport = require('passport');
var router = express.Router();
let Usuario = require('../models/usuario')
let authenticate = require('../controllers/authentication')


router.get('/', authenticate.validate_Login, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', authenticate.validate_Logout, function(req, res, next) {
  res.render('session/login');
});

router.get('/signup', function(req, res, next) {
  res.render('session/signUp', { errors:{}, usuario: new Usuario() });
});

router.post('/login', function(req, res, next) {
  console.log(req.body, 'Esto envia el login')
  passport.authenticate('local', function(err, usuario, info){
    console.log(err, 'Este es el error')
    console.log(usuario, 'Este es el usuario')
    console.log(info, 'Este es el info')
    if(err) return next(err)
    if(!usuario) return res.render('session/login', {info})
    if(usuario.verificado == false) return res.render('session/login', {information: 'Usuario aun no verificado por mail'})
    req.logIn(usuario, function(err){
      if(err) return next(err)
      return res.redirect('/')
    })
  })(req, res, next)
});

router.get('/logout', function(req, res, next){
  req.logOut()
  res.redirect('/login');
});



module.exports = router;
