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


  // document.getElementById("tester").addEventListener("click", function(){
  //   var url= "/allPosts";
  //   var req = new XMLHttpRequest();
  //
  //   req.onreadystatechange = function(){
  //     if(req.readyState === 4 && req.status === 200){
  //       // getPost();
  //       console.log(req.responseText);
  //     }
  //   };
  //   req.open("GET", url, true);
  //   req.send();
  // });

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
  }
  
    var b2 = document.getElementById("tester");
    b2.addEventListener("click", function(e) {
      console.log('click!');
      createPage();
  });


  // function(){
  //   var url= "/allPosts";
  //   var req = new XMLHttpRequest();
  //
  //   req.onreadystatechange = function(){
  //     if(req.readyState === 4 && req.status === 200){
  //       // getPost();
  //       console.log(req.responseText);
  //
  //
  //     }
  //   };
  //   req.open("GET", url, true);
  //   req.send();
  //
  // });

  function createPage(userId) {
    var req = new XMLHttpRequest();
    req.open('GET', '/allPosts');
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        createPageHtml(JSON.parse(req.responseText), userId);
      }
    }
    req.send();
  }

  function makeTweet(data) {
    var html = "<div class=\"growl\">"
    html += data.roar;
    html += "</div>";
    return html;
  }

  function createPageHtml(data, userId) {
    var i, body;
    //dynamically build site!
    var html = ""
    // console.log(typeof JSON.parse(data));
    for (i = 0; i < data.length; i++) {
      html += makeTweet(data[i]);
      console.log(i + " : " + data[i]);
    }
    // console.log(data);
    var div = document.getElementById('roarContent');
    div.innerHTML = html;
    console.log(html);
  }

  cookies.auth(createPage);
})();
