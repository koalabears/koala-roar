var front = (function() {

  var button = document.getElementById("button");
  var textInput = document.getElementById("roar");
  var username = document.getElementById("username");
  var dateInput = document.getElementById("date");
  var roarContent = document.getElementById("roarContent");

  button.addEventListener("click", function(e){
    e.preventDefault();
    var url= "/roars/" + "&" + textInput.value + "&" + username.value + "&" + dateInput.value;
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
      if(req.readyState === 4 && req.status === 200){
        // getPost();
        console.log(req.responseText);


      }
    };
    req.open("POST", url, true);
    req.send();

  });

  document.getElementById("tester").addEventListener("click", function(){
    var url= "/allPosts";
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
      if(req.readyState === 4 && req.status === 200){
        // getPost();
        console.log(req.responseText);
      }
    };
    req.open("GET", url, true);
    req.send();
  });

  document.getElementById("userID").addEventListener("click", function(){
    var url= "/users";
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
      if(req.readyState === 4 && req.status === 200){
        // getPost();
        console.log(req.responseText);
      }
    };
    req.open("GET", url, true);
    req.send();
  });


  // function getPost() {
  //   var url = '/allPosts';
  //   req = new XMLHttpRequest();
  //   req.open("GET", url);
  //   req.send();
  // }



})();
