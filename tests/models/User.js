var assert = require('assert');
var User = require('./../../models/User');
var async = require('async');

// Carpeta User Tests
describe('User Tests', function(){
    
    // Basics
    describe('Basics', function(){

        it('debe imprimir el nombre del usuario', function(done){
            
            var user = new User({
                id : 1,
                name : "REVIS",
                username : "devan",
                password : "1285216"
            });

            assert.equal(user.name, "REVIS");
            done();

        });

        it('debe guardar el usuario en base de datos y retornar un resultado', function(done){
            
            var user = new User({
                id : 1,
                name : "REVIS",
                username : "devan",
                password : "1285216"
            });

            user.save(function(err, resultado){

                if(err){
                    console.error(err);
                    return done(err);
                }

                assert.notEqual(resultado, null);

                console.log("RESULTADOS --> ", resultado); 
                done();
            });

        });

        it('debe guardar el usuario en base de datos y retornar el id en el resultado', function(done){
            
            var user = new User({
                name : "REVIS",
                username : "devan",
                password : "1285216"
            });

            user.save(function(err, resultado){

                if(err){
                    console.error(err);
                    return done(err);
                }

                assert.notEqual(resultado.id, null);
                done();
            });

        });

        it('debe borrar un usuario de la base de datos', function(done){

            var ID_USUARIO_CREADO = null;

            async.waterfall([

                function primero_crear_usuario(cb){

                    // Primero crear nuevo usuario.

                    var user = new User({
                        name : "DEVNIEL",
                        username : "devniel",
                        password : "1285216"
                    }); 

                    user.save(function(err){
                        if(err) return cb(err);
                        cb(null, user);
                    });

                },

                function luego_borrar_usuario(user, cb){

                    ID_USUARIO_CREADO = user.id;
                    user.delete(function(err){
                        if(err) return cb(err);
                        cb();
                    });

                },

                function luego_buscar_usuario(cb){
                    User.findById(ID_USUARIO_CREADO, function(err, resultados){
                        if(err) return cb(err);
                        assert.equal(resultados.length, 0);
                        cb();
                    });
                }  

            ], function(err){
                if(err) return done(err);
                done();
            });

        });

    }); 

    // Advanced
    describe("findById", function(){

        var USER = null;

        before(function(done){

            // Crear usuario

            var user = new User({
                name : "Moises",
                username : "moises",
                password : "1285216"
            });

            user.save(function(err, resultado){
                if(err) return done(err);
                USER = user;
                done();
            });
            
        }); 

        it('debe obtener un usuario por id', function(done){
            // Buscar usuario

            User.findById(USER.id, function(err, resultados){
                if(err) return done(err);
                assert.equal(resultados.length, 1);
                done();
            });

        });

        /*
        it('debe retornar error porque no existe un usuario con ese id', function(done){

            User.findById(999999, function(err){
                if(err) {
                    assert.notEqual(err, null);
                    return done();
                }else{
                    return done({
                        message : "DEBE RETORNAR ERROR!"
                    })
                }
            });
        }); */

        it('debe retornar error de código ID_INVALIDO porque es un id inválido', function(done){

            User.findById('a', function(err){
                if(err) {
                    assert.equal(err.code, 'ID_INVALIDO');
                    return done();
                }else{
                    return done({
                        message : "DEBE RETORNAR ERROR de código ID_INVALIDO!"
                    })
                }
            });
        })

        after(function(done){

            // BOrrar usuario 

            USER.delete(function(err){
                if(err) return done(err);
                done();
            })

        });

    })

});