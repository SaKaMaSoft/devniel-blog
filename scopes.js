function Perro(){

    var self = this;
    
    this.ladra = function(){
        console.log("LADRAR");
    }
    
    function x(){

        // ladra ??
        console.log(this.ladra);
        console.log(self.ladra);

    }

    this.x = function(){
        x();
    }

}


var x = new Perro();
x.ladra();
x.x();