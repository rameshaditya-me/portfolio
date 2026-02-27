(function () {
  var STORAGE_KEY = 'theme';
  var LIGHT = 'light';
  var DARK = 'dark';

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  function applyTheme(value) {
    var body = document.body;
    if (value === DARK) {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
    } else {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
    }
  }

  function init() {
    var preferred = getStored();
    if (preferred === DARK || preferred === LIGHT) {
      applyTheme(preferred);
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme(DARK);
      } else {
        applyTheme(LIGHT);
      }
    }

    var btn = document.querySelector('.dark-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = document.body.classList.contains('theme-dark') ? LIGHT : DARK;
        applyTheme(next);
        setStored(next);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // KaTeX auto-render (if present)
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof renderMathInElement !== 'undefined') {
      var el = document.querySelector('.page-content');
      if (el) renderMathInElement(el, { delimiters: [ { left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false } ] });
    }
  });
})();
