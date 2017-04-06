var http = require("http");

var callback = function(request, response){
    console.log(request);

    response.writeHead(200, {
        "Content-Type" : "text/html"
    });

    var fs = require("fs");
    fs.readFile("index.html", "utf-8", function(err, data){
        if(err) return response.writeHead(500);
        response.write(data);
        response.end();
    });
    
};

var server = http.createServer(callback);

server.listen(3000);