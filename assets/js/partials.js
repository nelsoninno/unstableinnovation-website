/* ============================================================
   Shared header + footer injected as partials.
   Each page calls renderHeader() and renderFooter() at the bottom
   of <body>, which writes the markup into placeholder <div>s.
   This avoids 12 duplicated copies of nav HTML across the site.

   We compute a relative URL prefix so the same code works at:
   - https://www.unstableinnovation.com/insights/key-takeaways/
   - https://nelsoninno.github.io/unstableinnovation-website/insights/key-takeaways/
   ============================================================ */

(function () {
  function computePrefix() {
    var path = location.pathname.replace(/\/index\.html$/, "/");
    // Strip the GitHub Pages project-site prefix if present
    if (/\.github\.io$/.test(location.hostname)) {
      path = path.replace(/^\/[^\/]+/, "");
    }
    // Ensure trailing slash so split counts directories correctly
    if (!path.endsWith("/")) path += "/";
    var segs = path.split("/").filter(Boolean);
    var depth = segs.length;
    return depth === 0 ? "./" : "../".repeat(depth);
  }
  window.PATH_PREFIX = computePrefix();
})();

window.renderHeader = function () {
  var p = window.PATH_PREFIX || "./";
  var el = document.getElementById("site-header-mount");
  if (!el) return;
  el.outerHTML =
    '<header class="site-header">' +
    '<div class="container site-header__inner">' +
      '<a href="' + p + '" class="site-logo" aria-label="Unstable Innovation — Home">' +
        '<img src="' + p + 'assets/images/og/unstable-innovation-logo-vector-nelson-inno.svg" alt="" width="38" height="38">' +
        '<span>Unstable<br>Innovation</span>' +
      '</a>' +
      '<button class="menu-toggle" aria-label="Open menu" aria-expanded="false">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
      '</button>' +
      '<nav class="site-nav" aria-label="Primary">' +
        '<a href="' + p + '" data-path="/">Home</a>' +
        '<a href="' + p + 'buy/" data-path="/buy">Buy</a>' +
        '<a href="' + p + 'get/" data-path="/get">Free download</a>' +
        '<a href="' + p + 'insights/" data-path="/insights">Insights</a>' +
        '<a href="' + p + 'books/" data-path="/books">Books</a>' +
        '<a href="' + p + 'author/" data-path="/author">Author</a>' +
        '<a href="' + p + 'reviews/" data-path="/reviews">Reviews</a>' +
      '</nav>' +
    '</div>' +
    '</header>';
};

window.renderFooter = function () {
  var p = window.PATH_PREFIX || "./";
  var el = document.getElementById("site-footer-mount");
  if (!el) return;
  var year = new Date().getFullYear();
  el.outerHTML =
    '<footer class="site-footer">' +
    '<div class="container">' +
      '<div class="site-footer__grid">' +
        '<div>' +
          '<a href="' + p + '" class="site-logo" style="color:#fff">' +
            '<img src="' + p + 'assets/images/og/unstable-innovation-logo-vector-nelson-inno.svg" alt="" width="38" height="38" style="filter:brightness(0) invert(1)">' +
            '<span>Unstable<br>Innovation</span>' +
          '</a>' +
          '<p style="margin-top:16px; max-width:36ch; color:#a8a8a8; font-size:14px;">A book about innovation, entrepreneurship, and philosophy by Nelson Inno. Published by WeSpark.</p>' +
        '</div>' +
        '<div>' +
          '<h5>The book</h5>' +
          '<ul>' +
            '<li><a href="' + p + 'buy/">Buy on Amazon</a></li>' +
            '<li><a href="' + p + 'get/">Free PDF / EPUB</a></li>' +
            '<li><a href="' + p + 'reviews/">Reader reviews</a></li>' +
            '<li><a href="' + p + 'insights/">Insights</a></li>' +
          '</ul>' +
        '</div>' +
        '<div>' 