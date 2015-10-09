module.exports = (function() {

  var redis = require('redis');
  var client = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});

  function postRoar(req, res){
    var url = req.url;
    var details = url.split("&");
    details[1] = details[1].replace(/%20/g, ' ');
    details[2] = details[2].replace(/%20/g, ' ');
    console.log(typeof client);
    console.log('-------------------');
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
    });
  }

  function printPosts(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    client.get('roarCount', function(err, reply) {
      var roarCount = reply;
      var count = 0;
      res.write("{");
      for(var i = 1; i <= roarCount; i++) {
        client.HGETALL('roar:' + i, function(err, reply){
          count++;
          var post = reply;
          if(count.toString() === roarCount) {
            res.write("\"" + (count-1) + "\":" + JSON.stringify(post));
            res.end(", \"length\": \"" + count + "\"}");
          } else {
            res.write("\"" + (count-1) + "\":" + JSON.stringify(post) + ',');
          }
        });
      }
    });
  }

  function userID(req,res){
    client.INCR('userID', function(err, reply) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        console.log("!!!" + reply);
        res.end(reply.toString());
    });
  }

  return {
    postRoar: postRoar,
    printPosts: printPosts,
    createUserId: userID,
    client: client
  }
}());
