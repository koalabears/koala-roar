var fs = require('fs');
var redis = require('redis');


var server = (function() {


  var index = fs.readFileSync(__dirname + '/../public/html/index.html');
  var indexStyle = fs.readFileSync(__dirname + '/../public/css/main.css');
  var indexJS = fs.readFileSync(__dirname + '/../public/js/main.js');
  var cookieJS = fs.readFileSync(__dirname + '/../public/js/cookie.js');

  var client = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
  

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
    } else if (url === '/allPosts') {
      printPosts(req, res);
    } else if(url.match(/^(\/users)/)) {
      userID(req,res);//add function that creates client id in increments
    } else {
      res.writeHead(404);
      res.end();
    }
  }

// function that creates client id in increments
  function userID(req,res){
    client.INCR('userID', function(err, reply) {
      // redis.print;
      // client.get('userID', function(err, reply) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        console.log("!!!" + reply);
        res.end(reply.toString());
      // })
    });
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
      client.HMSET('roar:' + id, 'roar', details[1],'user', details[2],
      'date', details[3],  'usrId', details[4], function(err, reply){
        if (err) {
          res.end("error");
        } else {
          details.push(id);
          tweet = {
            date: details[3],
            user: details[2],
            usrId: details[4],
            roar: details[1]
          };
          res.end(JSON.stringify(tweet));
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
      res.write("{");
      console.log(typeof roarCount + "  " + roarCount);
      for(var i = 1; i <= roarCount; i++) {


        client.HGETALL('roar:' + i, function(err, reply){
          count++;
          var post = reply;
          console.log(post + count + "  " + roarCount);

          if(count.toString() === roarCount) {
              console.log("*****END*****", roarCount);
              // res.write(JSON.stringify(post));
            res.write("\"" + (count-1) + "\":" + JSON.stringify(post));
            res.end(", \"length\": \"" + count + "\"}");
          } else {
            res.write("\"" + (count-1) + "\":" + JSON.stringify(post) + ',');
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
