require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');
const path      = require('path');

const pagesRouter = require('./routes/pages');
const apiRouter   = require('./routes/api');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── SECURITY ──────────────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'pagead2.googlesyndication.com', 'adservice.google.com', '*.googletagmanager.com', '*.google-analytics.com', 'connect.facebook.net'],
      styleSrc:    ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
      fontSrc:     ["'self'", 'fonts.gstatic.com'],
      imgSrc:      ["'self'", 'data:', '*.googlesyndication.com', '*.google.com', '*.gstatic.com', '*.googleapis.com'],
      frameSrc:    ["'self'", '*.googlesyndication.com', '*.doubleclick.net'],
      connectSrc:  ["'self'", '*.google-analytics.com', '*.googlesyndication.com'],
      objectSrc:   ["'none'"],
    }
  }
}));

app.set('trust proxy', 1);

// Rate limit for API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 30,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

// ── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  etag: true
}));

// ── DATABASE ──────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.warn('⚠️  MongoDB connection failed — running without DB:', err.message));

// ── ADS.TXT ──────────────────────────────────────────────────────────────────
app.get('/ads.txt', (req, res) => {
  res.type('text/plain');
  res.send('google.com, pub-8491879806233542, DIRECT, f08c47fec0942fa0');
});

// ── SITEMAP ──────────────────────────────────────────────────────────────────
app.get('/sitemap.xml', (req, res) => {
  const base = process.env.SITE_URL || 'https://taxwiseindia.netlify.app';
  const { articles } = require('./utils/data');
  const pages = ['', '/learn', '/blog', '/itr-guide', '/calculator', '/quiz', '/faq', '/glossary', '/tips', '/contact', '/about', '/privacy-policy', '/terms', '/disclaimer'];
  const allPages = [...pages, ...articles.map(a => `/blog/${a.slug}`)];
  const urls = allPages.map(p => `<url><loc>${base}${p}</loc><changefreq>${p.startsWith('/blog/') ? 'monthly' : 'weekly'}</changefreq><priority>${p === '' ? '1.0' : '0.8'}</priority></url>`).join('\n');
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
});

// ── ROBOTS.TXT ───────────────────────────────────────────────────────────────
app.get('/robots.txt', (req, res) => {
  const base = process.env.SITE_URL || 'https://taxwiseindia.netlify.app';
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml`);
});

// ── ROUTES ───────────────────────────────────────────────────────────────────
app.use('/api', apiLimiter, apiRouter);
app.use('/', pagesRouter);

// ── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  const { page } = require('./utils/html');
  res.status(404).send(page({
    title: 'Page Not Found — TaxWise India',
    desc: 'The page you are looking for does not exist.',
    body: `
<div class="page-hero" style="min-height:60vh;display:flex;align-items:center;">
  <div class="container" style="text-align:center;">
    <div style="font-size:5rem;margin-bottom:1rem;">😕</div>
    <h1 style="margin-bottom:.5rem;">404 — Page Not Found</h1>
    <p style="margin-bottom:2rem;">The page you're looking for doesn't exist or has been moved.</p>
    <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
      <a href="/" class="btn btn-primary">Go Home →</a>
      <a href="/blog" class="btn btn-outline">Browse Articles</a>
    </div>
  </div>
</div>`
  }));
});

// ── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 TaxWise India running at http://localhost:${PORT}`);
  console.log(`   Ads.txt: http://localhost:${PORT}/ads.txt`);
  console.log(`   Sitemap: http://localhost:${PORT}/sitemap.xml`);
});
