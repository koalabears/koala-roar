var front = (function() {

  var button = document.getElementById("button");
  var textInput = document.getElementById("roar");
  var dateInput = document.getElementById("date");
  var roarContent = document.getElementById("roarContent");
  var userName;

  button.addEventListener("click", function(e){
    e.preventDefault();
    var d = new Date();
    var timeStamp = d.getTime();
    var url= "/roars/" + "&" + textInput.value + "&" + userName + "&" + timeStamp;
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

  function createPage(userId, name) {
    userName = name;
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
