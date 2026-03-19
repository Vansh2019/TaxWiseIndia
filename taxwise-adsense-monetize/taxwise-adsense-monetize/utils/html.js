const ADSENSE_PUB = 'ca-pub-8491879806233542';

// Full page HTML wrapper - AdSense head tag + meta included
function page(opts = {}) {
  const {
    title = 'TaxWise India — Free Income Tax & Finance Education',
    desc  = 'Free income tax guides, ITR filing help, tax calculator, and financial literacy resources for young Indians. Stay updated with FY 2025-26 tax changes.',
    path  = '/',
    body  = '',
    scripts = ''
  } = opts;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/learn', label: 'Learn' },
    { href: '/blog', label: 'Blog' },
    { href: '/itr-guide', label: 'ITR Guide' },
    { href: '/calculator', label: 'Calculator' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/faq', label: 'FAQ' },
    { href: '/glossary', label: 'Glossary' },
    { href: '/contact', label: 'Contact' }
  ];

  const navHtml = navLinks.map(l =>
    `<li><a href="${l.href}" class="${path === l.href ? 'active' : ''}">${l.label}</a></li>`
  ).join('');

  const mobileNavHtml = navLinks.map(l =>
    `<a href="${l.href}" class="${path === l.href ? 'active' : ''}">${l.label}</a>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google-adsense-account" content="${ADSENSE_PUB}">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="TaxWise India">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://taxwiseindia.netlify.app${path}">
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="https://taxwiseindia.netlify.app${path}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/style.css">
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB}" crossorigin="anonymous"></script>
</head>
<body>
<!-- ── NAVBAR ── -->
<nav class="navbar" id="navbar">
  <div class="navbar-inner">
    <a href="/" class="navbar-brand" aria-label="TaxWise India Home">
      <div class="navbar-logo" aria-hidden="true">₹</div>
      <span class="navbar-brand-text">Tax<span>Wise</span> India</span>
    </a>
    <ul class="navbar-links" role="navigation" aria-label="Main navigation">
      ${navHtml}
    </ul>
    <button class="navbar-menu-btn" id="menuBtn" aria-label="Toggle menu" aria-expanded="false">☰</button>
  </div>
  <div class="navbar-mobile" id="mobileMenu" role="navigation" aria-label="Mobile navigation">
    ${mobileNavHtml}
  </div>
</nav>

<!-- ── PAGE CONTENT ── -->
<main>
${body}
</main>

<!-- ── FOOTER ── -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="flex" style="gap:.6rem;margin-bottom:1rem;">
          <div class="navbar-logo">₹</div>
          <span style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;color:#e8f0fe;">Tax<span style="color:#00d68f;">Wise</span> India</span>
        </div>
        <p style="font-size:.875rem;color:#374555;line-height:1.7;max-width:280px;">Free income tax education and financial literacy for young Indians. Not financial advice — always consult a CA for complex matters.</p>
        <p style="font-size:.8rem;color:#374555;margin-top:.75rem;">📧 <a href="mailto:vanshmahajan8082@gmail.com" style="color:#374555;">vanshmahajan8082@gmail.com</a></p>
      </div>
      <div>
        <p class="footer-heading">Tax Resources</p>
        <ul class="footer-links">
          <li><a href="/learn">Tax Learning Hub</a></li>
          <li><a href="/itr-guide">ITR Filing Guide</a></li>
          <li><a href="/calculator">Tax Calculator</a></li>
          <li><a href="/blog">Tax Articles</a></li>
          <li><a href="/quiz">Tax Quiz</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-heading">Quick Links</p>
        <ul class="footer-links">
          <li><a href="/faq">FAQs</a></li>
          <li><a href="/glossary">Tax Glossary</a></li>
          <li><a href="/tips">Money Tips</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-heading">Legal</p>
        <ul class="footer-links">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Use</a></li>
          <li><a href="/disclaimer">Disclaimer</a></li>
        </ul>
        <p class="footer-heading" style="margin-top:1.25rem;">Official Sites</p>
        <ul class="footer-links">
          <li><a href="https://incometax.gov.in" target="_blank" rel="noopener noreferrer">Income Tax Portal ↗</a></li>
          <li><a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer">SEBI ↗</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 TaxWise India. All rights reserved. Information provided is for educational purposes only and does not constitute professional tax or financial advice.</p>
      <p style="margin-top:.5rem;font-size:.75rem;">Built with ❤️ for young Indians learning to manage their finances.</p>
    </div>
  </div>
</footer>

<script src="/js/main.js"></script>
${scripts}
</body>
</html>`;
}

// AdSense in-article ad unit
function adUnit(style = '') {
  return `<div class="ad-unit" style="${style}">
  <ins class="adsbygoogle"
       style="display:block;text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="${ADSENSE_PUB}"
       data-ad-slot="auto"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>`;
}

// AdSense display ad (sidebar or banner)
function adBanner(slot = 'auto') {
  return `<div class="ad-banner">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="${ADSENSE_PUB}"
       data-ad-slot="${slot}"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>`;
}

module.exports = { page, adUnit, adBanner, ADSENSE_PUB };
