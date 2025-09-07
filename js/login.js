const loginForm = $("#login-form");

// When the login form is submitted, prevent the default form submission and redirect to the index page.
$(() => {
  loginForm.on("submit", function (e) {
    e.preventDefault();
    window.location.href = "index.html";
  });
});