/**
 *  CLASE
 * 
 * @class Post
 */

class Post {

    constructor(data){

        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.user = data.user;
        this.category = data.category;
        this.creation_date = data.creation_date;

    }
}

module.exports = Post;