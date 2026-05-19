/* ============================================================
   Shared header + footer injected as partials.
   Computes a relative URL prefix so the same code works at:
   - https://www.unstableinnovation.com/insights/key-takeaways/
   - https://nelsoninno.github.io/unstableinnovation-website/insights/key-takeaways/
   ============================================================ */

(function () {
  function computePrefix() {
    var path = location.pathname.replace(/\/index\.html$/, "/");
    if (/\.github\.io$/.test(location.hostname)) {
      path = path.replace(/^\/[^\/]+/, "");
    }
    if (path.charAt(path.length - 1) !== "/") path += "/";
    var segs = path.split("/").filter(function (s) { return !!s; });
    var depth = segs.length;
    if (depth === 0) return "./";
    var out = "";
    for (var i = 0; i < depth; i++) out += "../";
    return out;
  }
  window.PATH_PREFIX = computePrefix();
})();

window.renderHeader = function () {
  var p = window.PATH_PREFIX || "./";
  var el = document.getElementById("site-header-mount");
  if (!el) return;
  var html = ""
    + '<header class="site-header">'
    +   '<div class="container site-header__inner">'
    +     '<a href="' + p + '" class="site-logo" aria-label="Unstable Innovation Home">'
    +       '<img src="' + p + 'assets/images/og/unstable-innovation-logo-vector-nelson-inno.svg" alt="" width="38" height="38">'
    +       '<span>Unstable<br>Innovation</span>'
    +     '</a>'
    +     '<button class="menu-toggle" aria-label="Open menu" aria-expanded="false">'
    +       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'
    +     '</button>'
    +     '<nav class="site-nav" aria-label="Primary">'
    +       '<a href="' + p + '" data-path="/">Home</a>'
    +       '<a href="' + p + 'buy/" data-path="/buy">Buy</a>'
    +       '<a href="' + p + 'get/" data-path="/get">Free download</a>'
    +       '<a href="' + p + 'insights/" data-path="/insights">Insights</a>'
    +       '<a href="' + p + 'books/" data-path="/books">Books</a>'
    +       '<a href="' + p + 'author/" data-path="/author">Author</a>'
    +       '<a href="' + p + 'reviews/" data-path="/reviews">Reviews</a>'
    +     '</nav>'
    +   '</div>'
    + '</header>';
  el.outerHTML = html;
};

window.renderFooter = function () {
  var p = window.PATH_PREFIX || "./";
  var el = document.getElementById("site-footer-mount");
  if (!el) return;
  var year = new Date().getFullYear();
  var html = ""
    + '<footer class="site-footer">'
    +   '<div class="container">'
    +     '<div class="site-footer__grid">'
    +       '<div>'
    +         '<a href="' + p + '" class="site-logo" style="color:#fff">'
    +           '<img src="' + p + 'assets/images/og/unstable-innovation-logo-vector-nelson-inno.svg" alt="" width="38" height="38" style="filter:brightness(0) invert(1)">'
    +           '<span>Unstable<br>Innovation</span>'
    +         '</a>'
    +         '<p style="margin-top:16px;max-width:36ch;color:#a8a8a8;font-size:14px;">A book about innovation, entrepreneurship, and philosophy by Nelson Inno. Published by WeSpark.</p>'
    +       '</div>'
    +       '<div>'
    +         '<h5>The book</h5>'
    +         '<ul>'
    +           '<li><a href="' + p + 'buy/">Buy on Amazon</a></li>'
    +           '<li><a href="' + p + 'get/">Free PDF / EPUB</a></li>'
    +           '<li><a href="' + p + 'reviews/">Reader reviews</a></li>'
    +           '<li><a href="' + p + 'insights/">Insights</a></li>'
    +         '</ul>'
    +       '</div>'
    +       '<div>'
    +         '<h5>The author</h5>'
    +         '<ul>'
    +           '<li><a href="' + p + 'author/">About Nelson Inno</a></li>'
    +           '<li><a href="https://nelsoninno.com" rel="noopener">nelsoninno.com</a></li>'
    +           '<li><a href="https://wespark.io" rel="noopener">WeSpark</a></li>'
    +           '<li><a href="https://yourownterms.life" rel="noopener">Your Own Terms</a></li>'
    +         '</ul>'
    +       '</div>'
    +       '<div>'
    +         '<h5>Connect</h5>'
    +         '<ul>'
    +           '<li><a href="https://www.linkedin.com/in/nelsoninno/" rel="noopener">LinkedIn</a></li>'
    +           '<li><a href="https://youtu.be/trEo4g7MIUU" rel="noopener">TEDx talk</a></li>'
    +           '<li><a href="https://geyser.fund/project/unstableinnovation" rel="noopener">Geyser Fund</a></li>'
    +           '<li><a href="' + p + 'resources/">Resources</a></li>'
    +         '</ul>'
    +       '</div>'
    +     '</div>'
    +     '<div class="site-footer__bottom">'
    +       '<span>&copy; ' + year + ' Nelson Inno. Published by WeSpark.</span>'
    +       '<span>Built in El Salvador &middot; Hosted on GitHub Pages</span>'
    +     '</div>'
    +   '</div>'
    + '</footer>';
  el.outerHTML = html;
};

document.addEventListener("DOMContentLoaded", function () {
  if (typeof renderHeader === "function") renderHeader();
  if (typeof renderFooter === "function") renderFooter();
});
