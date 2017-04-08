class User {

    constructor(data){

        // properties 

        this.id = data.id;
        this.name = data.name;
        this.username = data.username;
        this.password = data.password;

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