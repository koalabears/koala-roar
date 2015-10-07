var fs = require('fs');

module.exports = function(req, res) {
  var index = fs.readFileSync(__dirname + '/../public/html/index.html');
  var indexStyle = fs.readFileSync(__dirname + '/../public/css/main.css');
  var indexJS = fs.readFileSync(__dirname + '/../public/js/main.js');

  var url = req.url;
  if (url === '/') {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(index);
  } else if (url === '/main.css') {
    res.writeHead(200, {'Content-Type' : 'text/css'});
    res.end(indexStyle);
  } else if (url === '/main.js') {
    res.writeHead(200, {'Content-Type' : 'text/js'});
    res.end(indexJS);
  } else if (url.match(/^(\/test)/)) {
    serveTest(req, res);
  } else {
    res.writeHead(404);
    res.end();
  }

  function serveTest(req, res){
    var test = fs.readFileSync(__dirname + '/test/front-end/test.html');
    var testjs = fs.readFileSync(__dirname + '/test/front-end/test.js');
    if (req.url === '/test.html'){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(test.toString());
    } else if (req.url === 'test.html/test.js') {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.end(testjs.toString());
    } else {
      res.writeHead(404, {'Content-Type': 'text/javascript'});
      res.end('error: ' + req.url + ' not found');
    }
  }
};
