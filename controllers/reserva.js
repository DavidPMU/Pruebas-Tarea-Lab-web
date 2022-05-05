const Reserva = require('../models/reserva')
const Bicicleta = require('../models/bicicleta')
const Usuario = require('../models/usuario')

exports.validar_disponibilidad = function (req, res){
    Reserva.findOne({bicicleta : req.params.id}).then(function (reserva){
        res.render('reservas/ocupada', {codigo: req.params.id, dias: reserva.diasDeReserva})
    }).catch(error)
        res.render()
    Bicicleta.findOne({ code: req.params.id }).then(function (bici) {

    });
}

exports.obtener_reservas_get = function (req, res) {
    Reserva.find({usuario : req.user._id}, function (err, reservas) {
        let bicis = []
        if (err) console.log(err)
        if (reservas.length != 0) {
            reservas.forEach(reserva => {
                Bicicleta.findOne({_id : reserva.bicicleta}, function (err, bici){
                    if (bici != null) bicis.push(bici)
                })
            });
        }
        console.log(reservas)
        res.render('reservas/index', { reservas: reservas, bicis: bicis })
    })
}

exports.reserva_create_get = function (req, res) {
    res.render('reservas/create', {codigo: req.params.id})
}

exports.reserva_create_post = function (req, res) {
    Bicicleta.findOne({code : req.params.id}).then(function (bici){
        Reserva.find({bicicleta : bici._id}).then(function (reservas){
            if(validateDates(req, reservas)==true){
                let reserva = Reserva.createInstance(req.body.desde, req.body.hasta, bici.id, req.user._id)
                Reserva.add(reserva)
                res.redirect('/reserva')
            } else{
                console.log('Ya hay una reservacion')
                res.render('reservas/ocupada', {codigo: req.params.id})
            }
        })
    })
}

function validateDates(req, reservas){
    if (reservas.length != 0) {
        let flag = false
        reservas.forEach(reserva => {
            let start = reserva.desde
            let end = reserva.hasta
            let comparaStart = stringToDate(req.body.desde)
            let comparaEnd = stringToDate(req.body.hasta)
            console.log(start, 'start')
            console.log(end, 'end')
            console.log(comparaStart, 'compara 1')
            console.log(comparaEnd, 'compara 2')
            if ( ((start <= comparaStart)&&(end >= comparaStart)) || ((start <= comparaEnd)&&(end >= comparaEnd))) {
                flag = true
                return false
            }
        })
        if (flag == false){
            return true
        }
    } else{
        console.log('Caigo fuera')
        return true
    }
}

function stringToDate(dateString) {
    let year = +dateString.substring(0, 4)
    let month = +dateString.substring(5, 7)
    let day = +dateString.substring(8, 10)
    console.log(year, month, day, 'Experimento')
    let date = new Date(year, month - 1 ,day)
    return date
}