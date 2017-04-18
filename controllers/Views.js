class Views {

    static admin(req, res){
         res.render("admin");
    }

    static home(req, res){
        res.render('index', {
            name : "Home"
        });
    }

}

module.exports = Views;