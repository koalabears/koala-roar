var fs = require('fs');
var redis = require('redis');
var client = redis.createClient();

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
  } else if (url.match(/^(\/test)/)) {
    serveTest(req, res);
  } else if (url.match(/^(\/roars)/)) {
    postRoar(req, res);
  } else if(url === '/allPosts') {
    printPosts();
  } else {
    res.writeHead(404);
    res.end();
  }

  function serveTest(req, res){
    var test = fs.readFileSync(__dirname + '/../test/front-end/test.html');
    var testjs = fs.readFileSync(__dirname + '/../test/front-end/test.js');
    if (req.url === '/test.html'){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(test.toString());
    } else if (req.url === '/test.js') {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.end(testjs.toString());
    } else {
      res.writeHead(404, {'Content-Type': 'text/javascript'});
      res.end('error: ' + req.url + ' not found');
    }
  }

  function postRoar(req, res){
    var url = req.url;
    var details = url.split("&");
    client.INCR('roarCount', function(err, roarCount){
      var id = roarCount;
      client.HMSET('roar:' + id, 'roar', details[1],'user', details[2], 'date', details[3], redis.print);
    });
    console.log(details);
    res.writeHead(200);
    res.end();
  }

  function printPosts(){
    res.writeHead(200, {'Content-Type':'text/html'});
    console.log("________________");
    client.get('roarCount', function(err, reply) {
      var roarCount = reply;
      for(var i = 1; i <= roarCount; i++) {
        // var count = 1;
        // count ++;
        client.HGETALL('roar:' + i, function(err, reply){
          var post = '<li>' + reply.roar + '</li>';
        res.end(post);
        });
      }
    });
    // res.write("hello");
    // res.end();
  }



};
