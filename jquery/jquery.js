/*! ClassPass - jQuery 3.7.1 Loader
 * Loads jQuery synchronously so all scripts that depend on $ work correctly.
 */
(function() {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://code.jquery.com/jquery-3.7.1.min.js', false); // false = synchronous
    xhr.send(null);
    if (xhr.status === 200) {
      eval(xhr.responseText);
    }
  } catch(e) {
    // Fallback: inject script tag (async, may not work for immediate use)
    var s = document.createElement('script');
    s.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    document.head.appendChild(s);
  }
})();
