// Element variables
const sidebar = $('#sidebar');
const brainButton = $('#brainButton');
const signOutLink = $('#sign-out-link');

// Load initial content and set up listeners when the DOM is ready
$(() => {
  brainButton.on('click', function (e) {
    e.preventDefault();
    toggleSidebar();
  });

  // Redirect to login page when click to sign out
  signOutLink.on('click', function (e) {
    e.preventDefault();
    window.location.href = 'login.html';
  });
});

/**
 * Toggles the sidebar's expanded state.
 * If expanded, collapses it; if collapsed, expands it.
 */
function toggleSidebar() {
  const widthExpandida = 200;
  const widthNormal = 90;
  const animationDuration = 100;
  const labelTransitionDuration = 500;

  if (sidebar.hasClass('expanded')) {
    // Collapse: Labels fade out, then sidebar shrinks
    sidebar.removeClass('expanded');
    setTimeout(() => {
      sidebar.animate({ width: widthNormal }, animationDuration);
    }, labelTransitionDuration);
    return;
  }

  // Expand: Sidebar grows, then labels fade in
  sidebar.animate({ width: widthExpandida }, animationDuration, function () {
    sidebar.addClass('expanded');
  });
}