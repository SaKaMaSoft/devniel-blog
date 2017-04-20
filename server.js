var http = require("http");
var express = require('express');
var app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');
var session = require('express-session');

/**
 * Controllers
 */
var Views = require("./controllers/Views");
var Auth = require("./controllers/Auth");
var Posts = require("./controllers/Posts");
var Users = require("./controllers/Users");

app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(morgan('dev'));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// POST 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


var TokenMiddleware = function(req, res, next){

    if(req.get('x-mi-token') == '1234567890'){
        return next();
    }else{
        return res.status(401).send({
            code : "INVALID_ACCESS_TOKEN",
            message : "YOU SHALL NOT PASS"
        });
    }
};

// Routes - Public
app.get('/',            Views.home);
app.get("/admin",       Views.admin)
app.post("/auth/login", Auth.login);
app.get('/auth/logout', Auth.logout);
app.get('/posts',       Posts.list);

// Routes - Private
app.post("/api/users",  TokenMiddleware, Users.create);
app.post('/posts',      TokenMiddleware, Posts.create);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})