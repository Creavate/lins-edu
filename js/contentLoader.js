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
async function loadContent(page) {
  const filePath = `./content/${page}.html`;
  try {
    await content.animate({ opacity: 0 }, 'fast').promise();
    const response = await $.get(filePath);
    content.html(response);

    if (page === 'student') {
      $('#search-student-button').on('click', loadStudentMenu);
    }
  } catch (error) {
    handleLoadError(content, error, filePath);
  } finally {
    content.animate({ opacity: 1 }, 'fast');
  }
}

/**
 * Loads the student menu content into the #content div.
 */
async function loadStudentMenu() {
  const filePath = './content/student/student-menu.html';
  try {
    await content.animate({ opacity: 0 }, 'fast').promise();
    const response = await $.get(filePath);
    content.html(response);

    $('#student-detail-btn').on('click', loadStudentDetail);
  } catch (error) {
    handleLoadError(content, error, filePath);
  } finally {
    content.animate({ opacity: 1 }, 'fast');
  }
}

/**
 * Loads the student detail content into the #content div.
 */
async function loadStudentDetail() {
  const detailPath = './content/student/student-detail.html';
  const scriptPath = './js/student-detail.js';
  try {
    await content.animate({ opacity: 0 }, 'fast').promise();
    const response = await $.get(detailPath);
    content.html(response);
    await $.getScript(scriptPath);
  } catch (error) {
    handleLoadError(content, error, 'student detail page');
  } finally {
    content.animate({ opacity: 1 }, 'fast');
  }
}

/**
 * Updates the active state of the sidebar links.
 * @param {jQuery} activeLink - The link element to be marked as active.
 */
function updateActiveLink(activeLink) {
  sidebarLinks.removeClass('active');
  activeLink.addClass('active');
}