// Create web server and listen on port 3000
// Load the module dependencies
var http = require('http'), 
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    comments = require('./comments');

// Create the HTTP server
http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true, false),
        filename = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname,
        filepath = path.join(__dirname, filename);

    fs.exists(filepath, function(exists) {
        if (exists) {
            fs.readFile(filepath, function(err, data) {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.end("Internal Server Error");
                } else {
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.end(data);
                }
            });
        } else if (urlObj.pathname === '/comments') {
            if (request.method === 'GET') {
                response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify(comments.get()));
            } else if (request.method === 'POST') {
                var body = '';
                request.on('data', function(data) {
                    body += data;
                });
                request.on('end', function() {
                    comments.add(JSON.parse(body));
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.end(JSON.stringify(comments.get()));
                });
            }
        } else {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.end("404 Not Found");
        }
    });
}).listen(3000);

console.log('Server running at http://localhost:3000/');