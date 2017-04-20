var User = require('./../models/User');

var async = require('async');

class Auth {

    static login(req, res){

        console.log("Auth.login()");
        console.log(req.body);

        // data.username
        // data.password
        var data = req.body;

        async.waterfall([

            function(cb){

                User.getByUsername(data.username, function(err, user){
                    if(err) return cb(err);
                    cb(null, user);
                });
            },

            function(user, cb){

                if(data.password == user.password){
                    return cb(null, user);
                }else{
                    return cb({
                        message : "NO autorizado"
                    })
                }       

            }
        ], function(err, user){
            if(err) return res.status(401).send({
                message: err.message
            });

            delete user.password;

            req.session.user = user;

            /*return res.status(200).send({
                message : "Bienvenido",
                data : user
            })*/

            return res.redirect("/");
        })

    }

    static logout(req, res){
        req.session.user = null;
        res.redirect("/");
    }

}

module.exports = Auth;