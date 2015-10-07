var http = require('http');


var Server = (function(){

  function handler(req, res){
    var url = req.url;
    if(url === "/"){
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end("HELLO WORLD (so generic)");
    }
  }

return {
  handler: handler
};



})();

module.exports = Server;
