const loginForm = $("#login-form");

$(document).ready(function () {

  loginForm.on("submit", function (e) {
    e.preventDefault();
    window.location.href = "index.html";
  });
});