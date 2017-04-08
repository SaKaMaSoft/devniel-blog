class Comment {

    constructor(data){

        this.id = data.id;
        this.author = data.author;
        this.content = data.content;
        this.creation_date = data.creation_date;

        this.post = data.post;
    }
}

module.exports = Comment;