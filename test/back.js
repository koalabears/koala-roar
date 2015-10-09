var test = require('tape');
var shot = require('shot');
var server = require('../server/handler.js');
var db = require('../server/redis.js');

console.log(typeof handler);

test("handler is function", function(t) {
  t.equal(typeof server.handler, 'function', 'the handler is a function');
  t.end();
});

function testGetResponse(url, statusCode) {
  var str = 'checking handler responds with status code ';
  test(str + statusCode + ' for url ' + url, function(t) {
    var req = {
      method: 'GET',
      url: url
    };
    shot.inject(server.handler, req, function(res) {
      t.equal(res.statusCode, statusCode, 'Status code for response and the actual status code matches!');
      console.log(res.statusCode);
      t.end();
    });
  });
}

var getTests = [
    {statusCode: 404, url: '/randomy/'},
    {statusCode: 200, url: '/'},
    {statusCode: 200, url: '/main.js'},
    {statusCode: 200, url: '/cookie.js'},
    {statusCode: 200, url: '/main.css'},
    {statusCode: 200, url: '/test.html'},
    {statusCode: 404, url: '/test.htmlwoah'},
    {statusCode: 200, url: '/roars/&codingisfun&naaz&2015-10-15'},
    {statusCode: 200, url: '/test.js'}
    // ,
    // {statusCode: 200, url: '/allPosts'},
    // {statusCode: 200, url: '/users'}

];

getTests.forEach(function(testCase) {
  testGetResponse(testCase.url, testCase.statusCode);
});

db.client.quit();
