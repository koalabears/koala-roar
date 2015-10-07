var test = require('tape');
var shot = require('shot');
var handler = require('../server/handler.js');

console.log(typeof handler);

test("handler is function", function(t) {
  t.equal(typeof handler, 'function');
  t.end();
});

function testGetResponse(url, statusCode) {
  var str = 'checking handler responds with status code ';
  test(str + statusCode + ' for url ' + url, function(t) {
    var req = {
      method: 'GET',
      url: url
    };
    shot.inject(handler, req, function(res) {
      t.equal(res.statusCode, statusCode);
      t.end();
    });
  });
}

var getTests = [
    {statusCode: 404, url: '/randomy/'},
    {statusCode: 200, url: '/'},
    {statusCode: 200, url: '/main.js'},
    {statusCode: 200, url: '/main.css'},
    {statusCode: 200, url: '/test.html'},
    {statusCode: 404, url: '/test.htmlwoah'},
    {statusCode: 200, url: '/test.js'}
];

getTests.forEach(function(testCase) {
  testGetResponse(testCase.url, testCase.statusCode)
});
