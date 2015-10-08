var front = (function() {

  var button = document.getElementById("button");
  var textInput = document.getElementById("roar");
  var username = document.getElementById("username");
  var dateInput = document.getElementById("date");

  button.addEventListener("click", function(e){
    e.preventDefault();
    var url= "/roars/" + "&" + textInput.value + "&" + username.value + "&" + dateInput.value;
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.send();

  });

  function createPage() {
    var req = new XMLHttpRequest();
    req.open('GET', '/allPosts')
  }

  function createPageHtml(userId) {
    //dynamically build site!
    console.log('page created. User id = ' + userId);
  }

  cookies.auth(createPage);
})();
