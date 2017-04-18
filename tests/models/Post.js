var assert = require('assert');
var async = require('async');
var Post = require('./../../models/Post');
var User = require('./../../models/User');

// Carpeta User Tests
describe('Post Tests', function(){
    
    // Basics
    describe('Basics', function(){

        var USER = null;
        var POST = null;

        before(function(done){

            var user = new User({
                name : "DEVNIEL",
                username : "devniel",
                password : "1285216"
            });

            user.save(function(err){
                if(err) return done(err);

                USER = user;
                done();
            });

        })

        it('debe crear un post y asignarle ID al objeto', function(done){
            
            var post = POST = new Post({
                user : USER, 
                title : "Hello World",
                content : "Hello World Content"
            });

            console.log("SAVE POST ...");

            post.save(function(err){
                console.log("POST WAS SAVED.....");
                if(err) return done(err);
                assert.notEqual(post.id, null);
                done();
            });

        });


        after(function(done){

            async.series([

                function delete_post(cb){

                    console.log("POST ID :", POST.id);

                    POST.delete(function(err){
                        if(err){
                            console.error(err);
                            return cb(err);
                        }

                        cb();
                    });
                },

                function delete_user(cb){

                    console.log("Deleting USER...");

                    USER.delete(cb);
                }

            ], done);
    
        });

    });

});