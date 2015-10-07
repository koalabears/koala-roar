var http = require("http");
var fs = require('fs');
var serverFile = require("./server.js");
var port = process.env.PORT || 5000;


http.createServer(serverFile.handler).listen(port);
console.log('node http server listening on http://localhost:' + port);
