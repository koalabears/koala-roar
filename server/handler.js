var fs = require('fs');
var redis = require('redis');


var server = (function() {


  var index = fs.readFileSync(__dirname + '/../public/html/index.html');
  var indexStyle = fs.readFileSync(__dirname + '/../public/css/main.css');
  var indexJS = fs.readFileSync(__dirname + '/../public/js/main.js');
  var cookieJS = fs.readFileSync(__dirname + '/../public/js/cookie.js');

  var client = redis.createClient();

  function handler(req, res) {
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
    } else if (url === '/cookie.js') {
        res.writeHead(200, {'Content-Type' : 'text/js'});
        res.end(cookieJS);
    } else if (url.match(/^(\/test)/)) {
      serveTest(req, res);
    } else if (url.match(/^(\/roars)/)) {
      postRoar(req, res);
    } else if(url === '/allPosts') {
      printPosts(req, res);
    } else if(url.match(/^(\/users)/)) {
      //add function that creates client id in increments
    } else {
      res.writeHead(404);
      res.end();
    }
  }



  function serveTest(req, res){
    var test = fs.readFileSync(__dirname + '/../test/front-end/test.html');
    var testjs = fs.readFileSync(__dirname + '/../test/front-end/test.js');
    if (req.url === '/test.html'){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(test.toString());
    } else if (req.url === '/test.js') {
      console.log('WOAH');
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
      client.HMSET('roar:' + id, 'roar', details[1],'user', details[2], 'date', details[3], function(err, reply){
        if (err) {
          res.end("error");
        } else {
          details.push(id);
          res.end(JSON.stringify(details));

        }
      });

        //client.quit();
    });
    console.log(details);

  }

  function printPosts(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});

    console.log("________________");
    client.get('roarCount', function(err, reply) {
      var roarCount = reply;
      var count = 0;

      console.log(typeof roarCount + "  " + roarCount);
      for(var i = 1; i <= roarCount; i++) {


        client.HGETALL('roar:' + i, function(err, reply){
          count++;
          var post = reply;
          console.log(post + count + "  " + roarCount);
          res.write(JSON.stringify(post));

          if(count.toString() === roarCount) {
              console.log("*****END*****", roarCount);
            res.end();

          }
        });
      }
      // res.end("goodbye");
    });
      // TODO: where do we put this??

  }
    // res.write("hello");
    // res.end();
    // var clientQuit = client.quit;

  return {
    handler: handler,
    client: client,
    clientQuit: client.quit
  };


}());

module.exports = server;
