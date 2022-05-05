const mongoose = require('mongoose')
const Bicicleta = require('../../models/bicicleta')
const {expect} = require('chai')

describe('TEST', function(){
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
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err)
            const db = mongoose.connection
            db.close()
            done()
        })
    })

    describe('Bicicleta.create', ()=>{
        it('crea una instancia de la bicicleta', ()=>{
            let bici = Bicicleta.create(1, 'verde', 'urbana', [19.28, -99.13])
            expect(bici.code).to.be.eq(1)
            expect(bici.color).to.be.eq('verde')
            expect(bici.modelo).to.be.eq('urbana')
            expect(bici.ubicacion[0]).to.be.eq(19.28)
            expect(bici.ubicacion[1]).to.be.eq(-99.13)
        })
    });

    describe('Bicicleta.array', ()=>{
        it('comienza vacía', (done)=>{
            Bicicleta.array(function(err, bicis){
                expect(bicis.length).to.be.eq(0)
                done()
            })
        })
    })

    describe('Bicicletas.add', ()=>{
        it('agrega una bici', (done)=>{
            let bici = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'})
            Bicicleta.add(bici, function(err, newBici){
                if(err) console.log(err)
                Bicicleta.array(function(err, bicis){
                    expect(bicis.length).to.be.eq(1)
                    expect(bicis[0].code).to.be.eq(bici.code)
                    done()
                })
            })
        })
    })

    describe('Bicicleta by ID', ()=>{
        it('There should not be any bike instance', (done)=>{
            Bicicleta.array(function(err, bicis){
                expect(bicis.length).to.be.eq(0)
                done()
            })
        })
        it('Returns bike', (done)=>{
            let bici = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'})
            Bicicleta.add(bici, function(err, newBike){
                if(err) console.log(err)

                let bici2 = new Bicicleta({code: 2, color: 'blanca', modelo: 'montaña'})
                Bicicleta.add(bici2, function(err, newBike){                        
                    if(err) console.log(err)

                    Bicicleta.findByCode(1, function(err, targetBici){
                        expect(targetBici.code).to.be.eq(bici.code)
                        expect(targetBici.color).to.be.eq(bici.color)
                        expect(targetBici.modelo).to.be.eq(bici.modelo)
                        done()
                    })
                })
            })
        })
    })


    describe('Remove bike', ()=>{
        it('It doesnt apear in array', (done)=>{
            Bicicleta.array(function(err, bicis){
                expect(bicis.length).to.be.eq(0)
                done()
            })
        })
        it('Should delete bike with code 1', (done)=>{
            let bici = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'})
            Bicicleta.add(bici, function(err, newBike){
                if(err) console.log(err)
                Bicicleta.array(function(err, bicis){
                    expect(bicis.length).to.be.eq(1)
                    Bicicleta.removeByCode(1, function(err, cb){
                        Bicicleta.array(function(err, bicis){
                            expect(bicis.length).to.be.eq(0)
                            done()
                        })
                    })
                })
            })
        })
    })



})
