/**
 * Handles errors during content loading by updating a specified content element.
 * @param {jQuery} contentElement - The jQuery element where the error message will be displayed.
 * @param {object} error - The error object from the AJAX call.
 * @param {string} context - A string describing the file or context of the error.
 */
function handleLoadError(contentElement, error, context) {
  contentElement.html(`<p>That page is unavailable now... Please, contact support.</p>`);
  console.error(`Error loading ${context}:`, error);
  if (error.status) {
    console.log(`Status: ${error.status}`);
    console.log(`Reference: ${error.statusText}`);
  }
}