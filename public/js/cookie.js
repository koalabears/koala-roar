var cookies = (function() {
  var cookieName = 'koala-growl-id';
  function authenticate(callback) {

    var id =
  decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
    encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, "\\$&") +
    "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;


    if (id) {
      callback(id);
    } else {
      userAuth(callback);
    }
  }

  function setCookies(res) {
    var id = res.responseText;
    document.cookie = cookieName + '=' + val;
  }

  function userAuth(callback) {
    var userId, button, usrInput;
    var html = "<div class=\"auth\"><input id=\"userNameInput\"></input>";
    var body = document.getElementsByTagName('body')[0];
    html += "<button id=\"authButton\">create user</button></div>";
    body.innerHTML += html; // !!!!!!
    usrInput = document.getElementById('userNameInput');

    button = document.getElementById("authButton");
    button.addEventListener("click", function(e) {
      var req = new XMLHttpRequest();
      req.open("POST", "/users/" + usrInput.value);
      // TODO: check .value works ...
      req.onreadystatechange = function(res) {
        if (req.readyState === 4 && res.status === 200) {
          userId = setCookie(res);
          body.removeChild(document.getElementsByClassName('auth')[0]);
          callback(userId);
        }
      };
      req.send();
    });
  }

  return {
    auth: authenticate
  };
}());
