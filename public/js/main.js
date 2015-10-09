var front = (function() {

  var dateInput = document.getElementById("date");
  // var roarContent = document.getElementById("roarContent");
  var div = document.getElementById('roarContent');
  var userName, userID;


  function postEvent(e) {
    e.preventDefault();
    var textInput = document.getElementById("roar");
    var d = new Date();
    var timeStamp = d.getTime();
    var url= "/roars/" + "&" + textInput.value + "&" +
      userName + "&" + timeStamp + "&" + userID;
    var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
      var tweet, data;
      if(req.readyState === 4 && req.status === 200){
        tweet = JSON.parse(req.responseText);
        // getPost();
        div.innerHTML += makeTweet(tweet);
        // console.log(req.responseText);
      }
    };
    req.open("POST", url, true);
    req.send();

  }

  function createPage(userId, name) {
    userName = name;
    userID = userId;
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
    html += "[" + data.date + "]" + data.user + "(" + data.usrId + "): " + data.roar;
    if (userID === data.usrId) {
      html += "!";
      // TODO: add delete button
    }
    html += "</div>";

    return html;
  }

  function createPageHtml(data, userId) {
    var i, body, button;
    //dynamically build site!
    var html =
        "<input placeholder=\"text\" id=\"roar\"></input>" +
        "<button id=\"button\">submit</button>";
    // console.log(typeof JSON.parse(data));
    for (i = 0; i < data.length; i++) {
      html += makeTweet(data[i]);
      console.log(i + " : " + data[i]);
    }
    // console.log(data);

    div.innerHTML = html;
    button = document.getElementById("button");
    button.addEventListener("click", postEvent);
    console.log(html);
  }

  cookies.auth(createPage);
})();
