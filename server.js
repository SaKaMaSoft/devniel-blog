var http = require("http");
var express = require('express');
var app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next){

    if(req.get('x-mi-token') == '1234567890'){
        return next();
    }else{
        return res.status(401).send({
            code : "INVALID_ACCESS_TOKEN",
            message : "YOU SHALL NOT PASS"
        });
    }
})
// Routes
app.get("/admin", Views.admin)
app.post("/auth/login", Auth.login);

app.post("/api/users", Users.create);
app.get('/', Views.home);
app.get('/posts', Posts.list);
app.post('/posts', Posts.create);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})