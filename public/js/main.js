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
    req.onreadystatechange = function(){
      if(req.readyState === 4 && req.status === 200){
        getPost();
        
      }
    };
    req.send();

  });

  function getPost(req, res) {
    var url = '/allPosts';
    req = new XMLHttpRequest();
    req.open("GET", url);
    req.send();
  }



})();
