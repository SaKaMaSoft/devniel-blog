var fs = require("fs");

var Perro = require("./Perro");

console.log("HOLA"); //#1

fs.readFile("README", "utf-8", function(err, data){ // #2
    
    // Manejar error y no continuar
    if(err) {
        return console.error(err);
    }

    // Mostrar data
    console.log("DATA--->", data);

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

// perro.habla("CHAU") --> { on : function(event) { } }
// method chain

var saludoPerro = perro.habla("CHAU");

saludoPerro.on("finish", function(err){
    console.log("por fin acabado");
});

saludoPerro.on("error", function(err){
    console.error(err);
})

/*
perro.habla2({
    mensaje : "CHAU2",
    onFinish : function(err){
        console.log("ACABADO2");
    }
});*/

perro.ladra();
perro.ladra();
perro.ladra();

setTimeout(function(){
    process.exit();
}, 5000);



