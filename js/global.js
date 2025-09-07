const noSelect = 'no-select';
const body = $('body');

// When the document is ready, disable text selection by default.
$(() => {
  disableTextSelection();
});

/**
 * Disables text selection on the entire page by adding a 'no-select' class to the body.
 */
function disableTextSelection() {
  body.addClass(noSelect);
}

/**
 * Enables text selection for a specific element by overriding the 'user-select' property.
 * @param {jQuery|HTMLElement|string} element The element selector or object to enable selection on.
 */
function enableTextSelectionFor(element) {
  // By setting it to 'auto', we revert to the browser's default behavior for that element.
  $(element).css('user-select', 'auto');
}