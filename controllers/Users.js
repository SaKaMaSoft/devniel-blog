var User = require('./../models/User');

class Users {

    static create(req, res){
        
        console.log("Users.create()");
        console.log("HEADERS : ", req.headers);

        var data = req.body;

        var user = new User({
            name : data.name,
            username : data.username,
            password : data.password
        });

        user.save(function(err){
            if(err){

                //res.status(500).end();

                return res.status(500).send({
                    message : err.message
                })
            }

            return res.json({
                message : "Usuario satisfactoriamente creado",
                data : user.toJSON()
            })
        })


    }

}

module.exports = Users;