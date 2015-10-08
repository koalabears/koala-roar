var http = require("http");
var server = require("./handler.js");
var port = process.env.PORT || 5000;


http.createServer(server.handler).listen(port, function() {
  console.log('node http server listening on http://localhost:' + port);
});
