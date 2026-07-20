// Ashton Vale — single shared protected-game navigation.
//
// One source of truth for the game nav markup, order, and wiring
// (Dashboard / Archive / Evidence / Vaults / Detective dropdown /
// Logout), used by every protected page instead of each page carrying
// its own copy-pasted <nav> block. Include this script tag as the very
// first thing inside <body> (before any other content) -- it uses
// document.write() to insert the nav markup synchronously at that exact
// point, the same way a server-side include would, so there is never a
// flash of missing/duplicate nav.
//
// Requires js/progress-sync.js (for logout + the owner-only admin
// check) to already be loaded on the page; fails gracefully without it.
(function () {
  var ADMIN_EMAIL = 'marketingaftermidnight@gmail.com';

  var currentFile = (window.location.pathname.split('/').pop() || 'dashboard.html').split('?')[0];
  function activeClass(file) {
    return 'nav-link nav-link-primary' + (currentFile === file ? ' active' : '');
  }

  // archive.html / cabinet.html / progress.html drop the Detective
  // dropdown from their top nav entirely (explicit exception, requested
  // for these three pages only -- every other protected page keeps it).
  var NO_DETECTIVE_PAGES = ['archive.html', 'cabinet.html', 'progress.html'];
  var showDetective = NO_DETECTIVE_PAGES.indexOf(currentFile) === -1;

  var detectiveHtml = showDetective
    ? '<div class="nav-dropdown" id="detectiveMenu">' +
        '<button type="button" class="nav-dropdown-toggle" id="detectiveToggle" aria-haspopup="true" aria-expanded="false">Detective <span class="nav-caret">&#9662;</span></button>' +
        '<div class="nav-dropdown-menu" id="detectiveDropdown">' +
          '<a href="profile.html" class="nav-dropdown-item">Profile</a>' +
          '<a href="progress.html" class="nav-dropdown-item">Progress</a>' +
          '<a href="achievements.html" class="nav-dropdown-item">Achievements</a>' +
          '<a href="settings.html" class="nav-dropdown-item">Settings</a>' +
          '<a href="admin.html" class="nav-dropdown-item" id="navAdminLink" style="display:none;">Admin</a>' +
          '<a href="index.html" class="nav-dropdown-item">Return to Frontend</a>' +
        '</div>' +
      '</div>'
    : '';

  var html =
    '<nav class="site-nav">' +
      '<a href="dashboard.html" class="nav-brand">Asten Vale Archives</a>' +
      '<button type="button" class="nav-hamburger" id="navHamburger" aria-label="Menu" aria-haspopup="true" aria-expanded="false" aria-controls="navLinks">' +
        '<span class="nav-hamburger-bar"></span><span class="nav-hamburger-bar"></span><span class="nav-hamburger-bar"></span>' +
      '</button>' +
      '<div class="nav-links" id="navLinks">' +
        '<a href="archive.html" class="' + activeClass('archive.html') + '">Archive</a>' +
        '<a href="cabinet.html" class="nav-link">Evidence</a>' +
        '<a href="vaults.html" class="nav-link">Vaults</a>' +
        '<a href="dashboard.html" class="' + activeClass('dashboard.html') + '">Dashboard</a>' +
        detectiveHtml +
        '<span class="nav-link logout" id="navLogoutLink">Logout</span>' +
      '</div>' +
    '</nav>';

  document.write(html);

  document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('navHamburger');
    var navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
      function closeNavLinks() {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
      hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      navLinks.addEventListener('click', function (e) {
        // Collapse the mobile menu after choosing a plain link, but not
        // when the click just opened the Detective sub-dropdown.
        if (e.target.tagName === 'A' || e.target.id === 'navLogoutLink') closeNavLinks();
      });
      document.addEventListener('click', function (e) {
        if (!navLinks.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) closeNavLinks();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNavLinks();
      });
    }

    var toggle = document.getElementById('detectiveToggle');
    var menu = document.getElementById('detectiveDropdown');
    if (toggle && menu) {
      function closeMenu() {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      document.addEventListener('click', function (e) {
        if (!menu.contains(e.target) && e.target !== toggle) closeMenu();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });
    }

    if (!window.AVProgressSync) return;
    var logoutLink = document.getElementById('navLogoutLink');
    if (logoutLink) {
      logoutLink.addEventListener('click', function () {
        window.AVProgressSync.signOut(function () { window.location.href = 'index.html'; });
      });
    }
    var adminLink = document.getElementById('navAdminLink');
    if (adminLink) {
      window.AVProgressSync.getUser().then(function (user) {
        if (user && user.email === ADMIN_EMAIL) {
          adminLink.style.display = '';
        }
      });
    }
  });
})();
