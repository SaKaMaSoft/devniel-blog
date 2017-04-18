/**
 *  CLASE
 * 
 * @class Post
 */

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

class Post {

    constructor(data){

        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.user = data.user;
        this.category = data.category;
        this.creation_date = data.creation_date;

    }

    save(callback){

        var self = this;
 
        pool.connect(function(err, client, done){

            if(err){
                console.error(err);
                return callback(err);
            }

            client.query(`
                INSERT INTO blog.post
                (title, content, user_id, category_id)
                VALUES 
                ($1, $2, $3, $4) RETURNING *
            `, [self.title, self.contet, self.user.id, (self.category != null)? self.category.id : null], function(err, result){

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
                DELETE FROM blog.post
                WHERE id = $1
            `, [self.id], function(err, result){

                if(err){
                    console.error(err);
                    callback(err);
                    return;
                }
                
                console.log("Post.delete() RESULTS :", result);

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
                SELECT * FROM blog.post
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

module.exports = Post;