class Category {

    constructor(data){

        this._id = data.id;
        this._name = data.name;
        this._description = data.description;
        
        this._creation_date = data.creation_date;

    }

    // ID

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    // NAME

    get name(){

        if(this._name == null)
            return this._name;
        else
            return this._name.toUpperCase();

    }

    set name(value){
        this._name = value;
    }

    // DESCRIPTION

    get description(){
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    // CREATION_DATE

    get creation_date(){
        return this._creation_date;
    }

    set creation_date(value){
        this._creation_date = value;
    }

}

/**
 
 var category = new Category({
     id : 10,
     name : "chicas",
     description : "x",
     creation_date : null
 });

 console.log( category.name );

 // ---> CHICAS
 
 */

module.exports = Category;