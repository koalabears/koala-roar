function setCookie() {
  var val = document.getElementById('username').innerHTML;
  // console.log(document.getElementById('name'.innerHTML));
  document.cookie = 'name='+ val;
  console.log(document.cookie);
  console.log(decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
    encodeURIComponent('name').replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null);
}

setCookie();
