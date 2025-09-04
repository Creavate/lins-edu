// Element variables
const content = $('#content');
const sidebarLinks = $('#sidebar .nav-link');

// Load initial content and set up listeners when the DOM is ready
$(document).ready(function () {
  // Load the default page
  loadContent('dashboard');
  updateActiveLink($('a[data-page="dashboard"]'));

  // Add click listener to sidebar links
  sidebarLinks.on('click', function (e) {
    e.preventDefault();
    const page = $(this).data('page');

    if (!page) {
      alert('Someting went wrong');
      return;
    }

    loadContent(page);
    updateActiveLink($(this));
  });
});

/**
 * Loads the specified page content into the #content div.
 * @param {string} page - The name of the page to load (e.g., 'student').
 */
function loadContent(page) {
  content.animate({ opacity: 0 }, 'fast', function () {
    content.load(`./content/${page}.html`, function (response, status, xhr) {
      if (status == "error") {
        content.html(`<p>Sorry, but there was an error loading the page: ${xhr.status} ${xhr.statusText}</p>`);
      }

      if (page === 'student') {
        $('#search-student-button').on('click', function () {
          loadStudentMenu();
        });
      }
      content.animate({ opacity: 1 }, 'fast');
    });
  });
}

/**
 * Loads the student menu content into the #content div.
 */
function loadStudentMenu() {
  content.animate({ opacity: 0 }, 'fast', function () {
    content.load('./content/student/student-menu.html', function (response, status, xhr) {
      if (status == "error") {
        content.html(`<p>Sorry, but there was an error loading the page: ${xhr.status} ${xhr.statusText}</p>`);
      } else {
        // Add click listener for the student detail card after the menu is loaded
        $('#student-detail-card').on('click', function () {
          loadStudentDetail();
        });
      }
      content.animate({ opacity: 1 }, 'fast');
    });
  });
}

/**
 * Loads the student detail content into the #content div.
 */
function loadStudentDetail() {
  content.animate({ opacity: 0 }, 'fast', function () {
    content.load('./content/student/student-detail.html', function (response, status, xhr) {
      if (status == "error") {
        content.html(`<p>Sorry, but there was an error loading the page: ${xhr.status} ${xhr.statusText}</p>`);
      } else {
        // Load the chart script after the content is loaded
        $.getScript('./js/student-detail.js');
      }
      content.animate({ opacity: 1 }, 'fast');
    });
  });
}

/**
 * Updates the active state of the sidebar links.
 * @param {jQuery} activeLink - The link element to be marked as active.
 */
function updateActiveLink(activeLink) {
  sidebarLinks.removeClass('active');
  activeLink.addClass('active');
}