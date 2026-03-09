/*! ClassPass - jQuery 3.7.1 Loader */
(function() {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://code.jquery.com/jquery-3.7.1.min.js', false);
    xhr.send(null);
    if (xhr.status === 200) {
      eval(xhr.responseText);
    }
  } catch(e) {
    var s = document.createElement('script');
    s.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    document.head.appendChild(s);
  }
})();
