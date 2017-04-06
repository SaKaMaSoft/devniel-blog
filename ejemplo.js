var fs = require("fs");

var Perro = require("./Perro");

console.log("HOLA"); //#1

fs.readFile("README", "utf-8", function(err, data){ // #2
    
    // Manejar error y no continuar
    if(err) {
        return console.error(err);
    }

    // Mostrar data
    console.log(data);

});

console.log("DANIEL"); // #3


var perro = new Perro("perro peruano");
perro.ladra();

perro.mover(
    "COLA", 
    function(error, data1, data2, data3, data4, data5){

        if(error){
            console.error("ERROR!!!!! :", error.message);
            return;
        }else{
            console.log("MI PERRO ACABÓ --> ", data1 , data2, data3, data4, data5);
        }

    }
);

perro.ladra();
perro.ladra();
perro.ladra();

setTimeout(function(){
    process.exit();
}, 5000);



var fs = require("fs");

var Perro = require("./Perro");

console.log("HOLA"); //#1

fs.readFile("README", "utf-8", function(err, data){ // #2
    
    // Manejar error y no continuar
    if(err) {
        return console.error(err);
    }

    // Mostrar data
    console.log(data);

});

console.log("DANIEL"); // #3


var perro = new Perro("perro peruano");
perro.ladra();

perro.mover(
    "COLA", 
    function(error, data1, data2, data3, data4, data5){

        if(error){
            console.error("ERROR!!!!! :", error.message);
            return;
        }else{
            console.log("MI PERRO ACABÓ --> ", data1 , data2, data3, data4, data5);
        }

    }
);

perro.ladra();
perro.ladra();
perro.ladra();

setTimeout(function(){
    process.exit();
}, 5000);



