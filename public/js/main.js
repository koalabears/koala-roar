var front = (function() {

  var dateInput = document.getElementById("date");
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
      var tweetDiv = document.getElementById('tweetWrap');
      if(req.readyState === 4 && req.status === 200){
        tweet = JSON.parse(req.responseText);
        // getPost();
        tweetWrap.innerHTML = makeTweet(tweet) + tweetWrap.innerHTML;
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
    };
    req.send();
  }

  function makeTweet(data) {
    var html = "<div class=\"growl\">";
    html += "[" + data.date + "]" + data.user + "(" + data.usrId + "): " + data.roar;
    if (userID === data.usrId) {
      html = "<div class=\"growl remove\">" + "[" + data.date + "]" + data.user + "(" + data.usrId + "): " + data.roar;
      html += "<button class=\"delete\">x</button>";
    }
    html += "</div>";

    return html;
  }

function addDeleteListeners() {
    var wrapper = document.getElementById('roarContent');
    var tweetDivs = Array.prototype.slice.call(document.getElementsByClassName("remove"));
    tweetDivs.forEach(function(tweetDiv){
      tweetDiv.getElementsByClassName("delete")[0].addEventListener('click', function(){
        wrapper.removeChild(tweetDiv);
      });
    });
  }

  function createPageHtml(data, userId) {
    var i, body, button;
    //dynamically build site!
    var html =
        "<input placeholder=\"text\" id=\"roar\"></input>" +
        "<button id=\"button\">submit</button>" +
        "<div id =\"tweetWrap\">";
    for (i = data.length-1; i >= 0; i--) {
      html += makeTweet(data[i]);
      console.log(i + " : " + data[i]);
    }
    html += "</div>";

    div.innerHTML = html;
    addDeleteListeners();
    button = document.getElementById("button");
    button.addEventListener("click", postEvent);
    console.log(html);
  }

  cookies.auth(createPage);
})();
