var cookies = (function() {
  var cookieName = 'koala-growl';
  function authenticate(callback) {

    var id =
  decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
    encodeURIComponent(cookieName+"-id").replace(/[\-\.\+\*]/g, "\\$&") +
    "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    var name =
    decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
    encodeURIComponent(cookieName+"-id").replace(/[\-\.\+\*]/g, "\\$&") +
    "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;


    if (id  !== null) {
      callback(id, name);
    } else {
      userAuth(callback);
    }
  }

  function setCookies(res, name) {
    var id = res.responseText;
    document.cookie = cookieName+"-id" + '=' + id;
    document.cookie = cookieName+"-name" + '=' + name;
  }

  function userAuth(callback) {
    var userId, button, usrInput;
    var html = "<div class=\"auth\"><input id=\"userNameInput\"></input>";
    var authDiv = document.getElementById('authDiv');
    var body = document.getElementsByTagName('body')[0];
    html += "<button id=\"authButton\">create user</button></div>";

    authDiv.innerHTML = html; // !!!!!!
    usrInput = document.getElementById('userNameInput');

    button = document.getElementById("authButton");
    button.addEventListener("click", function(e) {
      var req = new XMLHttpRequest();
      req.open("POST", "/users/" + usrInput.value);
      // TODO: check .value works ...
      req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
          userId = setCookies(req, usrInput.value);
          body.removeChild(document.getElementById('authDiv'));
          callback(userId, name);
        }
      };
      req.send();
    });
  }

  return {
    auth: authenticate
  };
}());
