/* ============================================================
   Shared header + footer.
   Detects whether we are in /es/ and renders Spanish or English nav.
   The yellow flag-toggle is the only way to switch languages.
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

  // Detect Spanish version
  window.IS_ES = /(^|\/)es(\/|$)/.test(location.pathname);
  // Compute the counterpart URL (same page in the other language)
  window.LANG_COUNTERPART = (function () {
    var p = location.pathname;
    // Strip leading site prefix on github.io
    var sitePrefix = "";
    if (/\.github\.io$/.test(location.hostname)) {
      var m = p.match(/^(\/[^\/]+)/);
      if (m) { sitePrefix = m[1]; p = p.slice(sitePrefix.length); }
    }
    if (p.indexOf("/es/") === 0 || p === "/es") {
      // Currently Spanish - go to English equivalent
      var enPath = p.replace(/^\/es/, "");
      if (!enPath) enPath = "/";
      return sitePrefix + enPath;
    } else {
      // Currently English - go to Spanish equivalent
      return sitePrefix + "/es" + p;
    }
  })();
})();

window.playYT = function (el, id, extra) {
  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1' + (extra || '');
  iframe.title = 'YouTube video player';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  iframe.frameBorder = 0;
  iframe.style.cssText = 'width:100%;height:100%;border:0;position:absolute;inset:0;';
  el.parentNode.replaceChild(iframe, el);
};

window.renderHeader = function () {
  var p = window.PATH_PREFIX || "./";
  var isEs = window.IS_ES;
  var counterpart = window.LANG_COUNTERPART;
  var el = document.getElementById("site-header-mount");
  if (!el) return;
  // Labels
  var labels = isEs
    ? { home: "Inicio", buy: "Comprar", get: "Descarga gratis", insights: "Aprendizajes", books: "Libros", author: "Autor", reviews: "Reseñas" }
    : { home: "Home", buy: "Buy", get: "Free download", insights: "Insights", books: "Books", author: "Author", reviews: "Reviews" };
  // Paths from current page back to the *language* root (so Spanish nav stays in Spanish).
  // On Spanish pages langRoot = p + "es/" — e.g. from /es/get/ that becomes ../../es/ → /es/
  var langRoot = isEs ? (p + "es/") : p;
  var html = ""
    + '<header class="site-header">'
    +   '<div class="container site-header__inner">'
    +     '<a href="' + langRoot + '" class="site-logo" aria-label="Unstable Innovation">'
    +       '<img src="' + p + 'assets/images/og/unstable-innovation-logo-vector-nelson-inno.svg" alt="Unstable Innovation" width="38" height="38">'
    +     '</a>'
    +     '<button class="menu-toggle" aria-label="Open menu" aria-expanded="false">'
    +       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'
    +     '</button>'
    +     '<nav class="site-nav" aria-label="Primary">'
    +       '<a href="' + langRoot + '" data-path="/">' + labels.home + '</a>'
    +       '<a href="' + langRoot + 'buy/" data-path="/buy">' + labels.buy + '</a>'
    +       '<a href="' + langRoot + 'get/" data-path="/get">' + labels.get + '</a>'
    +       '<a href="' + langRoot + 'insights/" data-path="/insights">' + labels.insights + '</a>'
    +       '<a href="' + langRoot + 'books/" data-path="/books">' + labels.books + '</a>'
    +       '<a href="' + langRoot + 'author/" data-path="/author">' + labels.author + '</a>'
    +       '<a href="' + langRoot + 'reviews/" data-path="/reviews">' + labels.reviews + '</a>'
    +     '</nav>'
    +     '<div class="lang-toggle" role="group" aria-label="Language">'
    +       '<a href="' + (isEs ? counterpart : '#') + '" class="' + (isEs ? '' : 'is-active') + '" aria-label="English" ' + (isEs ? '' : 'aria-current="page"') + '><span class="flag flag-en" aria-hidden="true"></span>EN</a>'
    +       '<a href="' + (isEs ? '#' : counterpart) + '" class="' + (isEs ? 'is-active' : '') + '" aria-label="Español" ' + (isEs ? 'aria-current="page"' : '') + '><span class="flag flag-es" aria-hidden="true"></span>ES</a>'
    +     '</div>'
    +   '</div>'
    + '</header>';
  el.outerHTML = html;
};

window.renderFooter = function () {
  var p = window.PATH_PREFIX || "./";
  var isEs = window.IS_ES;
  var langRoot = isEs ? (p + "es/") : p;
  var labels = isEs
    ? { tagline: "Un libro sobre innovación, emprendimiento y filosofía por Nelson Inno. Publicado por WeSpark.",
        bookH: "El libro", buyAm: "Comprar en Amazon", getFree: "PDF / EPUB gratis", revs: "Reseñas de lectores", ins: "Aprendizajes",
        authorH: "El autor", aboutN: "Sobre Nelson Inno", connH: "Conecta", linked: "LinkedIn", tedx: "Charla TEDx", geyser: "Geyser Fund", res: "Recursos",
        copy: "© " + (new Date().getFullYear()) + " Nelson Inno. Publicado por WeSpark.",
        built: "Construido en El Salvador · Hospedado en GitHub Pages",
        madeWith: "Hecho con amor, por", ekyAlt: "Everybodyknowsyou.com" }
    : { tagline: "A book about innovation, entrepreneurship, and philosophy by Nelson Inno. Published by WeSpark.",
        bookH: "The book", buyAm: "Buy on Amazon", getFree: "Free PDF / EPUB", revs: "Reader reviews", ins: "Insights",
        authorH: "The author", aboutN: "About Nelson Inno", connH: "Connect", linked: "LinkedIn", tedx: "TEDx talk", geyser: "Geyser Fund", res: "Resources",
        copy: "© " + (new Date().getFullYear()) + " Nelson Inno. Published by WeSpark.",
        built: "Built in El Salvador · Hosted on GitHub Pages",
        madeWith: "Made with love, by", ekyAlt: "Everybodyknowsyou.com" };

  var el = document.getElementById("site-footer-mount");
  if (!el) return;
  var html = ""
    + '<footer class="site-footer">'
    +   '<div class="container">'
    +     '<div class="site-footer__grid">'
    +       '<div>'
    +         '<a href="' + langRoot + '" class="site-logo" style="color:#fff">'
    +           '<img src="' + p + 'assets/images/og/unstable-innovation-logo-vector-nelson-inno.svg" alt="Unstable Innovation" width="38" height="38" style="filter:brightness(0) invert(1)">'
    +         '</a>'
    +         '<p style="margin-top:16px;max-width:36ch;color:#a8a8a8;font-size:14px;">' + labels.tagline + '</p>'
    +       '</div>'
    +       '<div>'
    +         '<h5>' + labels.bookH + '</h5>'
    +         '<ul>'
    +           '<li><a href="' + langRoot + 'buy/">' + labels.buyAm + '</a></li>'
    +           '<li><a href="' + langRoot + 'get/">' + labels.getFree + '</a></li>'
    +           '<li><a href="' + langRoot + 'reviews/">' + labels.revs + '</a></li>'
    +           '<li><a href="' + langRoot + 'faq/">' + labels.faqLabel + '</a></li>'
    +           '<li><a href="' + langRoot + 'insights/">' + labels.ins + '</a></li>'
    +         '</ul>'
    +       '</div>'
    +       '<div>'
    +         '<h5>' + labels.authorH + '</h5>'
    +         '<ul>'
    +           '<li><a href="' + langRoot + 'author/">' + labels.aboutN + '</a></li>'
    +           '<li><a href="https://nelsoninno.com" rel="noopener">nelsoninno.com</a></li>'
    +           '<li><a href="https://wespark.io" rel="noopener">WeSpark</a></li>'
    +           '<li><a href="https://yourownterms.life" rel="noopener">Your Own Terms</a></li>'
    +         '</ul>'
    +       '</div>'
    +       '<div>'
    +         '<h5>' + labels.connH + '</h5>'
    +         '<ul>'
    +           '<li><a href="https://www.linkedin.com/in/nelsoninno/" rel="noopener">' + labels.linked + '</a></li>'
    +           '<li><a href="https://youtu.be/trEo4g7MIUU" rel="noopener">' + labels.tedx + '</a></li>'
    +           '<li><a href="https://geyser.fund/project/unstableinnovation" rel="noopener">' + labels.geyser + '</a></li>'
    +           '<li><a href="' + langRoot + 'resources/">' + labels.res + '</a></li>'
    +         '</ul>'
    +       '</div>'
    +     '</div>'
    +     '<div class="site-footer__made-with-love" style="display:flex; align-items:center; justify-content:center; gap:10px; padding:18px 0 6px; border-top:1px solid rgba(255,255,255,0.08); flex-wrap:wrap; color:#a8a8a8; font-size:13px;">'
    +       '<span>' + labels.madeWith + '</span>'
    +       '<a href="https://everybodyknowsyou.com/" rel="noopener" target="_blank" aria-label="' + labels.ekyAlt + '" style="display:inline-flex; align-items:center; gap:8px; color:#fff; text-decoration:none; line-height:1;">'
    +         '<img src="' + p + 'assets/images/logos-featured-on/eky-logo-complete-forblackbackground.png" alt="Everybodyknowsyou.com logo" width="170" height="32" loading="lazy" style="height:32px; width:auto; display:block;">'
    +         '<span>everybodyknowsyou.com</span>'
    +       '</a>'
    +     '</div>'
    +     '<div class="site-footer__bottom">'
    +       '<span>' + labels.copy + '</span>'
    +       '<span>' + labels.built + '</span>'
    +     '</div>'
    +   '</div>'
    + '</footer>';
  el.outerHTML = html;
};

document.addEventListener("DOMContentLoaded", function () {
  if (typeof renderHeader === "function") renderHeader();
  if (typeof renderFooter === "function") renderFooter();
});
