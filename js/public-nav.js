// Ashton Vale — single shared public-site navigation.
//
// One source of truth for the public nav markup, order, and the "Begin
// Investigation" / "Continue Investigation" CTA swap, used by every
// public page instead of each page carrying its own copy-pasted <nav>
// block (the same consolidation already done for the protected game nav
// in js/game-nav.js). Include this script tag at the exact point the
// old hardcoded <nav> block used to sit -- it uses document.write() to
// insert the markup synchronously there, same technique as game-nav.js.
//
// Never shows Dashboard/Archive/Evidence/Vaults/Detective/Logout -- this
// is the public-only nav. The CTA is the only part that reacts to login
// state; the rest of the links are the same regardless.
(function () {
  var currentFile = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
  function activeClass(file) {
    return 'nav-link' + (currentFile === file ? ' active' : '');
  }

  var html =
    '<nav class="site-nav">' +
      '<a href="index.html" class="nav-brand"><span>Asten Vale</span><span>Archives</span></a>' +
      '<div class="nav-logo">' +
        '<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="30" cy="30" r="28" stroke="rgba(201,169,122,0.6)" stroke-width="1.2"/>' +
          '<circle cx="30" cy="30" r="22" stroke="rgba(201,169,122,0.35)" stroke-width="0.8"/>' +
          '<line x1="30" y1="4" x2="30" y2="10" stroke="rgba(201,169,122,0.7)" stroke-width="1.5"/>' +
          '<polygon points="30,13 23,26 37,26" fill="rgba(201,169,122,0.82)"/>' +
          '<polygon points="30,18 21,33 39,33" fill="rgba(201,169,122,0.82)"/>' +
          '<rect x="27" y="33" width="6" height="5" fill="rgba(201,169,122,0.7)"/>' +
          '<line x1="30" y1="50" x2="30" y2="56" stroke="rgba(201,169,122,0.5)" stroke-width="1"/>' +
          '<line x1="4" y1="30" x2="10" y2="30" stroke="rgba(201,169,122,0.5)" stroke-width="1"/>' +
          '<line x1="50" y1="30" x2="56" y2="30" stroke="rgba(201,169,122,0.5)" stroke-width="1"/>' +
        '</svg>' +
      '</div>' +
      '<div class="nav-links">' +
        '<a href="index.html" class="' + activeClass('index.html') + '">Home</a>' +
        '<a href="about.html" class="' + activeClass('about.html') + '">Briefing</a>' +
        '<a href="music.html" class="' + activeClass('music.html') + '">Music</a>' +
        '<a href="join.html" class="' + activeClass('join.html') + '">Join</a>' +
        '<a href="news.html" class="' + activeClass('news.html') + '">News</a>' +
        '<a href="login.html" class="nav-link nav-cta" id="navCta">Begin Investigation</a>' +
      '</div>' +
    '</nav>';

  document.write(html);

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.AVProgressSync) return;
    window.AVProgressSync.getUser().then(function (user) {
      if (!user) return;
      var cta = document.getElementById('navCta');
      if (!cta) return;
      // Logged in: this is no longer someone we're trying to recruit --
      // send them back into the game instead of through login again.
      cta.textContent = currentFile === 'index.html' ? 'Continue Investigation' : 'Return to Dashboard';
      cta.href = 'dashboard.html';
    }).catch(function () { /* not logged in / unreachable -- CTA stays as-is */ });
  });
})();
