var assert = require('assert');
var User = require('./../../models/User');

// Carpeta User Tests
describe('User Tests', function(){
    
    // Basics
    describe('Basics', function(){

        it('debe imprimir el nombre del usuario', function(){
            
            var user = new User({
                id : 1,
                name : "REVIS",
                username : "devan",
                password : "1285216"
            });

            assert.equal(user.name, "REVIS");

        });

    });

});