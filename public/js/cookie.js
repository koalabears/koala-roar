var cookies = (function() {
  function authenticate(callback) {
    if (!) { // TODO: check cookies exist
      // callback()
    } else {
      userAuth(callback);
    }

  }

  function setCookies(res) {
    // createUserAuth();
    var val = document.getElementById('username').innerHTML;
    // console.log(document.getElementById('name'.innerHTML));
    document.cookie = 'name='+ val;
    // console.log(document.cookie);
    // console.log(decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
      encodeURIComponent('name').replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null);
  }

  function userAuth(callback) {
    var userId, button;
    var html = "<div class=\"auth\"><input id=\"userNameInput\"></input>"
    var body = document.getElementsByTagName('body').innerHTML;
    var usrInput = document.getElementById('userNameInput')
    html += "<button id=\"authButton\">create user</button></div>"
    body.innerHTML += html;

    button = document.getElementById("authButton");
    button.addEventListener("click", function(e) {
      var req = new XMLHTTPRequest();
      req.open("POST", "/users/" + usrInput.value);
      req.onreadystatechange(function(res) {
        if (req.readyState === 4 && res.status === 200) {
          userId = setCookie(res);
          body.removeChild(document.getElementsByClassName('auth')[0]);
          callback(userId);
        }
      });
    });
  }


  return {
    auth: authenticate
  };
}());
