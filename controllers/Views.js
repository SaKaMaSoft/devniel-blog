class Views {

    static admin(req, res){
         res.render("admin");
    }

    static home(req, res){

        console.log("SESSION VARS: ", req.session);
        console.log("SESSION VARS USER : ", req.session.user);

        if(req.session.user){
            res.render('index', {
                name : req.session.user.name
            });
        }else{
            res.render('index', {
                name : 'HOME'
            });
        }
        
    }

}

module.exports = Views;