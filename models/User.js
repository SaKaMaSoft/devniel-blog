/** BASE DE DATOS */

const pg = require('pg');

var config = {
  user: 'admin', //env var: PGUSER
  database: 'blog2', //env var: PGDATABASE
  password: 'YZSEDYOYZQSSOUVY', //env var: PGPASSWORD
  host: 'bluemix-sandbox-dal-9-portal.7.dblayer.com', // Server hosting the postgres database
  port: 25390, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

class User {

    constructor(data){

        // properties 

        this.id = data.id;
        this.name = data.name;
        this.username = data.username;
        this.password = data.password;

    }

    save(callback){

        var self = this;
 
        pool.connect(function(err, client, done){

            if(err){
                console.error(err);
                return callback(err);
            }

            client.query(`
                INSERT INTO blog.user
                (name, username, password)
                VALUES 
                ($1, $2, $3) RETURNING *
            `, [self.name, self.username, self.password], function(err, result){

                if(err){
                    console.error(err);
                    callback(err);
                    return;
                }

                var row = result.rows[0];

                self.id = row.id;

                callback(null, row);

            });

        });

    }

    delete(callback){

        var self = this;
 
        pool.connect(function(err, client, done){

            if(err){
                console.error(err);
                return callback(err);
            }

            client.query(`
                DELETE FROM blog.user
                WHERE id = $1
            `, [self.id], function(err, result){

                if(err){
                    console.error(err);
                    callback(err);
                    return;
                }

                callback(null, result);

            });

        });

    }

    static findById(id, callback){
        
        var self = this;
        
        if(id == "a"){
            return callback({
                code : "ID_INVALIDO",
                message : "ID INVÁLIDO"
            })
        }

        pool.connect(function(err, client, done){

            if(err){
                console.error(err);
                return callback(err);
            }

            client.query(`
                SELECT * FROM blog.user
                WHERE id = $1
            `, [id], function(err, result){

                if(err){
                    console.error(err);
                    callback(err);
                    return;
                }

                var rows = result.rows;
                callback(null, rows);

            });

        });

    }


}

module.exports = User;

/*


var user = new User({
    id : 1,
    name : 2,
    username: 'hola',
    password: 'xxxx'
});



*/