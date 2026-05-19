/* ============================================================
   Shared header + footer injected as partials.
   Each page calls renderHeader() and renderFooter() at the bottom
   of <body>, which writes the markup into placeholder <div>s.
   This avoids 12 duplicated copies of nav HTML across the site.
   ============================================================ */

window.renderHeader = function () {
  const el = document.getElementById("site-header-mount");
  if (!el) return;
  el.outerHTML = `
<header class="site-header">
  <div class="container site-header__inner">
    <a href="/" class="site-logo" aria-label="Unstable Innovation — Home">
      <img src="/assets/images/og/Unstable Innovation - Logo Vector.svg" alt="" width="38" height="38">
      <span>Unstable<br>Innovation</span>
    </a>
    <button class="menu-toggle" aria-label="Open menu" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
    <nav class="site-nav" aria-label="Primary">
      <a href="/" data-path="/">Home</a>
      <a href="/buy/" data-path="/buy">Buy</a>
      <a href="/get/" data-path="/get">Free download</a>
      <a href="/insights/" data-path="/insights">Insights</a>
      <a href="/books/" data-path="/books">Books</a>
      <a href="/author/" data-path="/author">Author</a>
      <a href="/reviews/" data-path="/reviews">Reviews</a>
    </nav>
  </div>
</header>`;
};

window.renderFooter = function () {
  const el = document.getElementById("site-footer-mount");
  if (!el) return;
  const year = new Date().getFullYear();
  el.outerHTML = `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div>
        <a href="/" class="site-logo" style="color:#fff">
          <img src="/assets/images/og/Unstable Innovation - Logo Vector.svg" alt="" width="38" height="38" style="filter:brightness(0) invert(1)">
          <span>Unstable<br>Innovation</span>
        </a>
        <p style="margin-top:16px; max-width:36ch; color:#a8a8a8; font-size:14px;">
          A book about innovation, entrepreneurship, and philosophy by Nelson Inno. Published by WeSpark.
        </p>
      </div>
      <div>
        <h5>The book</h5>
        <ul>
          <li><a href="/buy/">Buy on Amazon</a></li>
          <li><a href="/get/">Free PDF / EPUB</a></li>
          <li><a href="/reviews/">Reader reviews</a></li>
          <li><a href="/insights/">Insights</a></li>
        </ul>
      </div>
      <div>
        <h5>The author</h5>
        <ul>
          <li><a href="/author/">About Nelson Inno</a></li>
          <li><a href="https://nelsoninno.com" rel="noopener">nelsoninno.com</a></li>
          <li><a href="https://wespark.io" rel="noopener">WeSpark</a></li>
          <li><a href="https://yourownterms.life" rel="noopener">Your Own Terms</a></li>
        </ul>
      </div>
      <div>
        <h5>Connect</h5>
        <ul>
          <li><a href="https://www.linkedin.com/in/nelsoninno/" rel="noopener">LinkedIn</a></li>
          <li><a href="https://youtu.be/trEo4g7MIUU" rel="noopener">TEDx talk</a></li>
          <li><a href="https://geyser.fund/project/unstableinnovation" rel="noopener">Geyser Fund</a></li>
          <li><a href="/resources/">Resources</a></li>
        </ul>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>&copy; ${year} Nelson Inno. Published by WeSpark.</span>
      <span>Built in El Salvador · Hosted on GitHub Pages</span>
    </div>
  </div>
</footer>`;
};

document.addEventListener("DOMContentLoaded", function () {
  if (typeof renderHeader === "function") renderHeader();
  if (typeof renderFooter === "function") renderFooter();
});
