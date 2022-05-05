const mongoose = require('mongoose')
const Bicicleta = require('../../models/bicicleta')
const Usuario = require('../../models/usuario')
const Reserva = require('../../models/reserva')
const {expect} = require('chai')

describe('Testing users', function(){
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost:27017/red_bicicletas'
        mongoose.connect(mongoDB, {useNewUrlParser: true})

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', function(){
            done()
        })
    })

    afterEach(function(done){
        Reserva.deleteMany({}, function(err, success){
            if(err) console.log(err)
            Usuario.deleteMany({}, function(err, success){
                if(err) console.log(err)
                Bicicleta.deleteMany({}, function(err, success){
                    if(err) console.log(err)
                    const db = mongoose.connection
                    db.close()
                    done()
                })
            })
        })
    })

    describe('Reservacion', ()=>{
        it('reserva', (done)=>{
            let usuario = new Usuario({nombre: 'Jose', password: 'contra!23/', email: 'jose@joseempresas.com'})
            usuario.save()
            let bicicleta = new Bicicleta({code: 1, color: 'brown', modelo: 'benoto'})
            bicicleta.save()
            let hoy = new Date()
            let mañana = new Date()
            mañana.setDate(hoy.getDate()+1)

            usuario.reservar(bicicleta.id, hoy, mañana, function(err, reserva){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
                    expect(reservas.length).to.be.eq(1)
                    expect(reservas[0].diasDeReserva()).to.be.eq(2)
                    expect(reservas[0].bicicleta.code).to.be.eq(1)
                    expect(reservas[0].usuario.nombre).to.be.eq(usuario.nombre)
                    done()
                })
            })
        })
    }); 
})

