var fs = require('fs');

module.exports = function(req, res) {

  var index = fs.readFileSync(__dirname + '/../public/html/index.html');
  var indexStyle = fs.readFileSync(__dirname + '/../public/css/main.css');
  var indexJS = fs.readFileSync(__dirname + '/../public/js/main.js');

  var url = req.url;
  console.log(url);
  if (url === '/') {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(index);
  } else if (url === '/main.css') {
    res.writeHead(200, {'Content-Type' : 'text/css'});
    res.end(indexStyle);
  } else if (url === '/main.js') {
    res.writeHead(200, {'Content-Type' : 'text/js'});
    res.end(indexJS);
  } else {
    res.writeHead(404);
    res.end();
  }
}
