const play = require('audio-play');
const load = require('audio-loader');
const context = require('audio-context');

class Perro {

    constructor(nombre){
        this.nombre = nombre; 
    }

    ladra(){
        console.log("GUAU");
        load('./ladra.mp3').then(play);
    }

    mover(parte, callback){

        switch(parte){

            case "COLA":

                var veces = 0;

                var int = setInterval(function(){
                    console.log("🐶 MOVIENDO MI COLA...");
                    veces+=1 // veces = veces + 1;

                    if(veces > 5){
                        clearInterval(int);
                        callback(null, "ME CANSÉ 🐶", veces);
                    }
                }, 1000);                

                break;
            
            default:
                var ERROR = {
                    message : "NO TENGO " + parte
                };

                callback(ERROR);
        }
    }

}

module.exports = Perro;