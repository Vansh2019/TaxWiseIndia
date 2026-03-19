const express  = require('express');
const router   = express.Router();
const { page, adUnit, adBanner } = require('../utils/html');
const { articles, quizQuestions, glossary, faqs } = require('../utils/data');

const badgeMap = { popular:'badge-orange', new:'badge-green', guide:'badge-purple', beginner:'badge-blue', updated:'badge-yellow', comparison:'badge-purple', important:'badge-orange' };

function articleCard(a) {
  return `<a class="article-card" href="/blog/${a.slug}" data-cat="${a.category}">
  <div class="article-card-body">
    <div class="article-card-meta">
      <span class="badge ${badgeMap[a.badge]||'badge-green'}">${a.badge}</span>
      <span style="font-size:.72rem;color:#374555;font-family:'JetBrains Mono',monospace;">${a.readTime}</span>
    </div>
    <div class="article-card-title">${a.title}</div>
    <div class="article-card-excerpt">${a.excerpt}</div>
    <div class="article-card-footer">
      <span class="article-card-date">${a.date}</span>
      <span class="article-card-read">Read →</span>
    </div>
  </div>
</a>`;
}

// ── HOME ─────────────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  const featured = articles.slice(0, 6);
  const cats = [...new Set(articles.map(a => a.category))];
  res.send(page({
    title: 'TaxWise India — Free Income Tax Education for Young Indians',
    desc: 'Learn income tax basics, ITR filing, tax-saving deductions, and personal finance. Free tools, calculator, and guides updated for FY 2025-26.',
    path: '/',
    body: `
<!-- HERO -->
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-badge"><span class="hero-badge-dot"></span> Updated for FY 2025-26</div>
    <h1 class="hero-title">India's Free <span class="accent">Tax Education</span> Platform for <span class="accent2">Young Indians</span></h1>
    <p class="hero-desc">Master income tax, ITR filing, tax-saving strategies, and personal finance — in simple language. Zero jargon. 100% free.</p>
    <div class="hero-btns">
      <a href="/itr-guide" class="btn btn-primary btn-lg">📋 File Your ITR →</a>
      <a href="/calculator" class="btn btn-outline btn-lg">🧮 Tax Calculator</a>
    </div>
    <div class="hero-stats">
      <div><div class="hero-stat-val">₹0</div><div class="hero-stat-label">Tax up to ₹12.75L salary</div></div>
      <div><div class="hero-stat-val">₹1.5L</div><div class="hero-stat-label">80C deduction limit</div></div>
      <div><div class="hero-stat-val">15+</div><div class="hero-stat-label">Expert tax guides</div></div>
      <div><div class="hero-stat-val">FY 26</div><div class="hero-stat-label">Latest AY 2025-26 data</div></div>
    </div>
  </div>
</section>

<!-- QUICK LINKS -->
<div class="quick-links">
  <div class="container">
    <div class="quick-links-grid">
      <a href="/itr-guide" class="quick-link-item">
        <div class="quick-link-icon">📋</div>
        <div class="quick-link-label">ITR Guide</div>
        <div class="quick-link-sub">Step-by-step filing</div>
      </a>
      <a href="/calculator" class="quick-link-item">
        <div class="quick-link-icon">🧮</div>
        <div class="quick-link-label">Tax Calculator</div>
        <div class="quick-link-sub">Old vs New regime</div>
      </a>
      <a href="/learn" class="quick-link-item">
        <div class="quick-link-icon">📚</div>
        <div class="quick-link-label">Learn Tax</div>
        <div class="quick-link-sub">9 topic guides</div>
      </a>
      <a href="/quiz" class="quick-link-item">
        <div class="quick-link-icon">🎯</div>
        <div class="quick-link-label">Tax Quiz</div>
        <div class="quick-link-sub">Test your knowledge</div>
      </a>
      <a href="/glossary" class="quick-link-item">
        <div class="quick-link-icon">📖</div>
        <div class="quick-link-label">Glossary</div>
        <div class="quick-link-sub">27 tax terms</div>
      </a>
    </div>
  </div>
</div>

<!-- AD BANNER TOP -->
${adBanner()}

<!-- BUDGET 2025 HIGHLIGHT -->
<section class="section-sm">
  <div class="container">
    <div style="background:linear-gradient(135deg,rgba(0,214,143,.08),rgba(0,214,143,.03));border:1px solid rgba(0,214,143,.2);border-radius:1.25rem;padding:2rem 2.5rem;">
      <div class="flex-between">
        <div>
          <span class="badge badge-green" style="margin-bottom:.75rem;">🔔 Budget 2025 Update</span>
          <h2 style="font-size:1.5rem;margin-bottom:.5rem;">Zero Tax Up to <span class="accent">₹12.75 Lakh</span> for Salaried!</h2>
          <p style="max-width:560px;margin-bottom:1rem;">Finance Minister raised Section 87A rebate to ₹60,000. Salaried employees earning up to ₹12.75L pay absolutely zero income tax in FY 2025-26.</p>
          <div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-bottom:1.25rem;">
            <div><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:#00d68f;">₹60,000</div><div style="font-size:.75rem;color:#5a6a8a;">87A Rebate</div></div>
            <div><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:#00d68f;">₹75,000</div><div style="font-size:.75rem;color:#5a6a8a;">Standard Deduction</div></div>
            <div><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:#00d68f;">₹4L</div><div style="font-size:.75rem;color:#5a6a8a;">New Basic Exemption</div></div>
          </div>
          <a href="/blog/budget-2025-income-tax-changes" class="btn btn-primary btn-sm">Read Full Analysis →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FEATURED ARTICLES -->
<section class="section">
  <div class="container">
    <div class="flex-between section-header">
      <div>
        <div class="section-tag">📰 Latest Articles</div>
        <h2>Tax Guides & Resources</h2>
        <p>Expert-written guides on income tax, investing, and personal finance for young Indians.</p>
      </div>
      <a href="/blog" class="btn btn-outline btn-sm">View All →</a>
    </div>
    <div class="grid-3">
      ${featured.map(a => articleCard(a)).join('')}
    </div>
  </div>
</section>

<!-- AD UNIT MID -->
${adUnit()}

<!-- FEATURES / WHY TAXWISE -->
<section class="section" style="background:#0a1120;margin:0 -1.5rem;padding-left:1.5rem;padding-right:1.5rem;">
  <div class="container">
    <div class="section-header text-center" style="max-width:560px;margin:0 auto 2.5rem;">
      <div class="section-tag">🎯 Why TaxWise India</div>
      <h2>Everything You Need to File Taxes & Build Wealth</h2>
    </div>
    <div class="grid-3">
      <div class="card card-p">
        <div style="font-size:2rem;margin-bottom:.875rem;">🧮</div>
        <h3 style="margin-bottom:.5rem;">Free Tax Calculator</h3>
        <p style="font-size:.875rem;">Compare Old vs New regime instantly. Enter your income and deductions — get your exact tax liability in seconds.</p>
        <a href="/calculator" class="btn btn-sm btn-outline" style="margin-top:1rem;">Calculate Now</a>
      </div>
      <div class="card card-p">
        <div style="font-size:2rem;margin-bottom:.875rem;">📋</div>
        <h3 style="margin-bottom:.5rem;">ITR Filing Guide</h3>
        <p style="font-size:.875rem;">Step-by-step ITR filing walkthrough with form selector, document checklist, and regime comparison table.</p>
        <a href="/itr-guide" class="btn btn-sm btn-outline" style="margin-top:1rem;">Start Filing</a>
      </div>
      <div class="card card-p">
        <div style="font-size:2rem;margin-bottom:.875rem;">📚</div>
        <h3 style="margin-bottom:.5rem;">Learning Hub</h3>
        <p style="font-size:.875rem;">9 in-depth topic guides covering everything from basic tax concepts to advanced investment strategies.</p>
        <a href="/learn" class="btn btn-sm btn-outline" style="margin-top:1rem;">Start Learning</a>
      </div>
      <div class="card card-p">
        <div style="font-size:2rem;margin-bottom:.875rem;">🎯</div>
        <h3 style="margin-bottom:.5rem;">Tax Knowledge Quiz</h3>
        <p style="font-size:.875rem;">Test your tax knowledge with 15 questions. Get explanations for every answer and track your improvement.</p>
        <a href="/quiz" class="btn btn-sm btn-outline" style="margin-top:1rem;">Take Quiz</a>
      </div>
      <div class="card card-p">
        <div style="font-size:2rem;margin-bottom:.875rem;">📖</div>
        <h3 style="margin-bottom:.5rem;">Tax Glossary</h3>
        <p style="font-size:.875rem;">27 tax and finance terms explained in plain English. No more confusion with ITR jargon.</p>
        <a href="/glossary" class="btn btn-sm btn-outline" style="margin-top:1rem;">Browse Terms</a>
      </div>
      <div class="card card-p">
        <div style="font-size:2rem;margin-bottom:.875rem;">💰</div>
        <h3 style="margin-bottom:.5rem;">Money Tips</h3>
        <p style="font-size:.875rem;">Practical personal finance tips with a SIP compound interest calculator to see your wealth grow over time.</p>
        <a href="/tips" class="btn btn-sm btn-outline" style="margin-top:1rem;">Get Tips</a>
      </div>
    </div>
  </div>
</section>

<!-- NEWSLETTER -->
<section class="section">
  <div class="container">
    <div class="newsletter">
      <div class="section-tag" style="justify-content:center;">✉️ Newsletter</div>
      <h3 style="margin-bottom:.5rem;">Stay Updated on Tax & Finance</h3>
      <p>Get weekly tax tips, deadline reminders, and Budget updates — straight to your inbox.</p>
      <form class="newsletter-form" novalidate>
        <input name="name" type="text" class="form-input" placeholder="Your name (optional)">
        <input name="email" type="email" class="form-input" placeholder="your@email.com" required>
        <button type="submit" class="btn btn-primary">Subscribe →</button>
      </form>
      <div class="nl-msg form-alert" style="margin-top:1rem;max-width:480px;margin-left:auto;margin-right:auto;"></div>
      <p style="font-size:.78rem;color:#374555;margin-top:1rem;">No spam. Unsubscribe anytime. We respect your privacy.</p>
    </div>
  </div>
</section>

<!-- BOTTOM AD -->
${adBanner()}
`}));
});

// ── BLOG LIST ────────────────────────────────────────────────────────────────
router.get('/blog', (req, res) => {
  const cats = ['All', ...new Set(articles.map(a => a.category))];
  res.send(page({
    title: 'Income Tax Articles & Guides — TaxWise India Blog',
    desc: 'Read expert articles on income tax, ITR filing, tax saving, investing, and personal finance for Indians. Updated for FY 2025-26.',
    path: '/blog',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">📰 Blog</div>
    <h1>Income Tax <span class="accent">Articles & Guides</span></h1>
    <p>Expert-written guides on income tax, ITR filing, investments, and personal finance — updated for FY 2025-26.</p>
  </div>
</div>
<section class="section">
  <div class="container">
    ${adBanner()}
    <div class="search-wrap" style="max-width:420px;margin-bottom:1rem;">
      <span class="search-icon">🔍</span>
      <input id="blogSearch" type="search" class="search-input" placeholder="Search articles…" aria-label="Search articles">
    </div>
    <div class="filter-group">
      ${cats.map((c,i) => `<button class="filter-btn${i===0?' active':''}" data-group="main" data-cat="${i===0?'all':c}" data-target=".article-card">${c}</button>`).join('')}
    </div>
    <div class="grid-3" id="articleGrid">
      ${articles.map(a => articleCard(a)).join('')}
    </div>
    ${adUnit()}
  </div>
</section>`
  }));
});

// ── ARTICLE PAGE ─────────────────────────────────────────────────────────────
router.get('/blog/:slug', (req, res) => {
  const a = articles.find(x => x.slug === req.params.slug);
  if (!a) return res.redirect('/blog');

  const related = articles.filter(x => x.slug !== a.slug && x.category === a.category).slice(0,3);
  const others  = articles.filter(x => x.slug !== a.slug).slice(0,5);

  res.send(page({
    title: `${a.title} — TaxWise India`,
    desc: a.excerpt,
    path: `/blog/${a.slug}`,
    body: `
<div class="page-hero" style="padding-bottom:2rem;">
  <div class="container">
    <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem;">
      <a href="/blog" style="font-size:.8rem;color:#5a6a8a;">← All Articles</a>
      <span style="color:#374555;font-size:.8rem;">/</span>
      <span style="font-size:.8rem;color:#5a6a8a;">${a.category}</span>
    </div>
    <span class="badge ${badgeMap[a.badge]||'badge-green'}" style="margin-bottom:.875rem;">${a.badge}</span>
    <h1 style="font-size:clamp(1.5rem,3.5vw,2.2rem);max-width:820px;margin-bottom:.875rem;">${a.title}</h1>
    <div style="display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap;">
      <span style="font-size:.8rem;color:#5a6a8a;">📅 ${a.date}</span>
      <span style="font-size:.8rem;color:#5a6a8a;">⏱ ${a.readTime} read</span>
      <span class="badge badge-purple">${a.category}</span>
    </div>
  </div>
</div>
<section class="section" style="padding-top:2rem;">
  <div class="container">
    ${adBanner()}
    <div class="article-layout" style="margin-top:1.5rem;">
      <div>
        <div class="article-content">
          ${a.content}
        </div>
        ${adUnit()}
        <div style="margin-top:2.5rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,.05);">
          <p style="font-size:.8rem;color:#374555;font-style:italic;">Disclaimer: This article is for educational purposes only. Consult a Chartered Accountant for personalised tax advice.</p>
        </div>
        ${related.length ? `
        <div style="margin-top:2.5rem;">
          <h3 style="margin-bottom:1.25rem;">Related Articles</h3>
          <div class="grid-2">${related.map(r => articleCard(r)).join('')}</div>
        </div>` : ''}
      </div>
      <aside class="article-sidebar">
        <div class="sidebar-card">
          <div class="sidebar-heading">Quick Tools</div>
          <a href="/calculator" class="sidebar-link">🧮 Tax Calculator</a>
          <a href="/itr-guide" class="sidebar-link">📋 ITR Filing Guide</a>
          <a href="/quiz" class="sidebar-link">🎯 Tax Quiz</a>
          <a href="/glossary" class="sidebar-link">📖 Tax Glossary</a>
        </div>
        ${adBanner()}
        <div class="sidebar-card" style="margin-top:0;">
          <div class="sidebar-heading">More Articles</div>
          ${others.map(o => `<a href="/blog/${o.slug}" class="sidebar-link" style="flex-direction:column;align-items:flex-start;gap:.2rem;"><span style="font-size:.83rem;color:#8a9bbf;line-height:1.35;">${o.title}</span><span style="font-size:.7rem;color:#374555;">${o.readTime}</span></a>`).join('')}
        </div>
        ${adBanner()}
      </aside>
    </div>
  </div>
</section>`
  }));
});

// ── LEARN ────────────────────────────────────────────────────────────────────
router.get('/learn', (req, res) => {
  const topics = [
    { icon:'💰', bg:'rgba(0,214,143,.12)', label:'Income Tax Basics', badge:'Beginner', badge_c:'badge-blue',
      desc:'What is income tax, who pays it, financial year vs assessment year, and how the two tax regimes work.',
      points:['Income tax is levied on income earned in a financial year (April–March)','Two regimes: Old (deductions allowed) vs New (lower rates, fewer deductions)','Basic exemption under new regime is ₹4 lakh in FY 2025-26','Income up to ₹12.75L is tax-free for salaried (new regime + standard deduction)','File ITR every year by July 31 to declare income and claim refunds'] },
    { icon:'🗂️', bg:'rgba(129,140,248,.12)', label:'ITR Forms & Filing', badge:'Essential', badge_c:'badge-purple',
      desc:'Which ITR form to use, how to file online, important deadlines, and what happens if you miss them.',
      points:['ITR-1: Salaried income up to ₹50L (no capital gains)','ITR-2: Capital gains, foreign income, multiple properties','ITR-4: Presumptive business income under 44AD/44ADA','File at incometax.gov.in — completely free, 20–45 minutes','Deadline: July 31 for individuals; penalty ₹5,000 for belated filing'] },
    { icon:'🏷️', bg:'rgba(255,107,53,.12)', label:'Tax Saving Deductions', badge:'Save More', badge_c:'badge-orange',
      desc:'All major deductions under Section 80C, 80D, HRA, home loan, NPS — and how to maximise them.',
      points:['80C: Up to ₹1.5L — EPF, PPF, ELSS, LIC, NSC, school fees','80D: Health insurance ₹25K self + ₹25K parents (₹50K if senior citizens)','HRA: Exempt if you pay rent — metro 50%, non-metro 40% of basic','Home Loan: Interest up to ₹2L (80EEA) + principal under 80C','NPS extra: ₹50,000 under 80CCD(1B) over and above ₹1.5L 80C limit'] },
    { icon:'📈', bg:'rgba(251,191,36,.12)', label:'Capital Gains & Investing', badge:'Investor', badge_c:'badge-yellow',
      desc:'STCG and LTCG on stocks and mutual funds, indexation benefits, and tax-efficient investment strategies.',
      points:['Equity LTCG (>1 year): 12.5% on gains above ₹1.25L per year','Equity STCG (≤1 year): 20% on entire gain','LTCG tax harvesting: Book ₹1.25L gains every March, rebuy — saves tax','Crypto: Flat 30% + 1% TDS, no set-off of losses allowed','Debt funds: Gains added to income, taxed at slab rate (no indexation)'] },
    { icon:'💼', bg:'rgba(56,189,248,.12)', label:'Freelancer & Business Tax', badge:'Self-Employed', badge_c:'badge-blue',
      desc:'Taxation for freelancers, consultants, and business owners — presumptive taxation, advance tax, GST.',
      points:['Section 44ADA: Declare 50% of receipts (up to ₹75L) as profit — no books needed','Advance tax mandatory if tax >₹10,000 — pay quarterly (Jun 15, Sep 15, Dec 15, Mar 15)','Business expenses fully deductible: laptop, software, internet, office rent','GST registration required if turnover >₹20L (₹10L special states)','Export of services = zero GST — major benefit for foreign clients'] },
    { icon:'🏠', bg:'rgba(0,214,143,.08)', label:'House Property & Rent', badge:'Property', badge_c:'badge-green',
      desc:'Tax on rental income, home loan benefits, deemed let-out rules, and NRI property taxation.',
      points:['Rental income taxable under "Income from House Property"','Standard deduction: 30% of net rent for maintenance','Home loan interest: Up to ₹2L deductible under Section 24(b)','Two self-occupied properties can be declared without notional rent','TDS on rent threshold raised to ₹6L/year in Budget 2025'] },
    { icon:'🎓', bg:'rgba(129,140,248,.08)', label:'Education & Loans', badge:'Students', badge_c:'badge-purple',
      desc:'Section 80E for education loan interest, scholarship exemptions, and tax on stipends.',
      points:['Section 80E: Entire interest on education loan deductible (no upper limit)','Applies for 8 years from start of repayment','Scholarship income is fully exempt from tax','Stipends from research/training programs — taxable if substantial','Student\'s own income below ₹2.5L — no tax, but filing ITR is good practice'] },
    { icon:'👴', bg:'rgba(255,107,53,.08)', label:'Senior Citizen Benefits', badge:'Seniors', badge_c:'badge-orange',
      desc:'Special tax benefits for senior citizens — higher exemptions, FD TDS threshold, and Section 80TTB.',
      points:['Senior (60-79): Basic exemption ₹3L | Super senior (80+): ₹5L','Senior FD interest TDS threshold: ₹1L (Budget 2025)','Section 80TTB: Up to ₹50,000 deduction on interest income (FD, savings, post office)','No advance tax for senior citizens without business income','SCSS (Senior Citizen Savings Scheme): 8.2% interest, ₹30L max deposit'] },
    { icon:'🌏', bg:'rgba(56,189,248,.08)', label:'NRI Taxation', badge:'NRI', badge_c:'badge-blue',
      desc:'Tax rules for NRIs — residency status, DTAA benefits, NRE vs NRO accounts, and TDS on Indian income.',
      points:['NRI status: Stay in India <182 days in FY (or <60 days + <365 days in 4 preceding years)','NRE account interest: Fully tax-free in India','NRO account interest: Taxable + 30% TDS deducted','DTAA (Double Tax Avoidance Agreement): Avoid paying tax twice in India and abroad','Capital gains from Indian stocks/property: Taxable in India for NRIs'] }
  ];

  res.send(page({
    title: 'Learn Income Tax — Complete Tax Education Hub | TaxWise India',
    desc: 'Master income tax with 9 in-depth topic guides covering basics, deductions, ITR filing, investing, freelancer tax, and more. Updated for FY 2025-26.',
    path: '/learn',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">📚 Learning Hub</div>
    <h1>Complete <span class="accent">Tax Education</span> Hub</h1>
    <p>9 in-depth topic guides covering everything you need to know about income tax and personal finance in India.</p>
  </div>
</div>
<section class="section">
  <div class="container">
    ${adBanner()}
    <div class="grid-2" style="margin-top:1.5rem;">
      ${topics.map(t => `
      <div class="learn-card" tabindex="0" role="button" aria-expanded="false">
        <div class="learn-card-header">
          <div class="learn-card-icon" style="background:${t.bg};">${t.icon}</div>
          <div style="flex:1;">
            <div class="learn-card-title">${t.label}</div>
            <span class="badge ${t.badge_c} learn-card-badge">${t.badge}</span>
          </div>
          <span class="learn-card-arrow">▼</span>
        </div>
        <p style="font-size:.875rem;color:#5a6a8a;line-height:1.65;">${t.desc}</p>
        <div class="learn-body">
          <div class="learn-body-inner">
            <ul>${t.points.map(p => `<li>${p}</li>`).join('')}</ul>
            <div style="margin-top:1rem;display:flex;gap:.6rem;flex-wrap:wrap;">
              <a href="/blog" class="btn btn-sm btn-outline">Read Articles →</a>
              <a href="/calculator" class="btn btn-sm btn-outline">Tax Calculator</a>
            </div>
          </div>
        </div>
      </div>`).join('')}
    </div>
    ${adUnit()}
    <div class="newsletter" style="margin-top:3rem;">
      <div class="section-tag" style="justify-content:center;">✉️ Stay Updated</div>
      <h3>Get Weekly Tax Tips in Your Inbox</h3>
      <p>Tax deadlines, new schemes, budget updates — delivered weekly. Free forever.</p>
      <form class="newsletter-form" novalidate>
        <input name="email" type="email" class="form-input" placeholder="your@email.com" required>
        <button type="submit" class="btn btn-primary">Subscribe →</button>
      </form>
      <div class="nl-msg form-alert" style="margin-top:.75rem;max-width:400px;margin-left:auto;margin-right:auto;"></div>
    </div>
  </div>
</section>`
  }));
});

// ── ITR GUIDE ────────────────────────────────────────────────────────────────
router.get('/itr-guide', (req, res) => {
  res.send(page({
    title: 'How to File ITR Online — Step-by-Step Guide FY 2025-26 | TaxWise India',
    desc: 'Complete ITR filing guide for FY 2025-26. Learn how to file income tax return online, which form to use, documents needed, and deadlines.',
    path: '/itr-guide',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">📋 ITR Guide</div>
    <h1>File Your <span class="accent">ITR Online</span> — Step-by-Step</h1>
    <p>Complete guide to filing your Income Tax Return for FY 2025-26 (AY 2026-27). Free, clear, and jargon-free.</p>
  </div>
</div>
<section class="section">
  <div class="container">
    ${adBanner()}
    <!-- IMPORTANT DATES -->
    <div style="background:rgba(255,107,53,.07);border:1px solid rgba(255,107,53,.2);border-radius:1.25rem;padding:1.75rem 2rem;margin-bottom:2.5rem;">
      <h3 style="color:#ff6b35;margin-bottom:1rem;">⏰ Key Deadlines — AY 2026-27</h3>
      <div class="grid-3" style="gap:1rem;">
        <div style="text-align:center;"><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;color:#ff6b35;">July 31, 2025</div><div style="font-size:.8rem;color:#5a6a8a;">Salaried / No Audit</div></div>
        <div style="text-align:center;"><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;color:#fbbf24;">Oct 31, 2025</div><div style="font-size:.8rem;color:#5a6a8a;">Audit Cases</div></div>
        <div style="text-align:center;"><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;color:#818cf8;">Dec 31, 2025</div><div style="font-size:.8rem;color:#5a6a8a;">Belated Return</div></div>
      </div>
    </div>
    <!-- STEPS -->
    <h2 style="margin-bottom:1.5rem;">7 Steps to File ITR Online</h2>
    <div style="display:flex;flex-direction:column;gap:1.25rem;margin-bottom:2.5rem;">
      ${[
        ['1','Register / Login at incometax.gov.in','Visit the official Income Tax e-filing portal and login with your PAN as User ID. If first time, register first and verify with your Aadhaar-linked mobile OTP.'],
        ['2','Check Form 26AS and AIS','Download Form 26AS (TDS details) and Annual Information Statement (AIS) from the portal. Verify that all TDS deducted matches. Any mismatch must be resolved before filing.'],
        ['3','Select the Correct ITR Form','Choose ITR-1 for salary+interest (up to ₹50L), ITR-2 for capital gains, ITR-3 for business, or ITR-4 for presumptive income. Wrong form = invalid return.'],
        ['4','Fill in Income Details','Enter salary details from Form 16. Add other income: bank interest, rental income, dividends, capital gains. The portal pre-fills salary and TDS data — verify and correct if needed.'],
        ['5','Enter Deductions','Add all deductions under 80C (PPF, ELSS, LIC), 80D (health insurance), HRA, home loan interest, etc. These reduce your taxable income.'],
        ['6','Verify Tax Payable / Refund','The portal automatically calculates tax liability. If you owe tax, pay it via Challan 280. If excess TDS was deducted, you get a refund — enter your pre-validated bank account.'],
        ['7','E-Verify Your ITR','E-verify within 30 days using Aadhaar OTP, net banking, or Demat account. Without verification, your ITR is not considered filed. You can also send signed ITR-V by post to Bengaluru CPC.']
      ].map(([n,title,desc]) => `
      <div style="display:flex;gap:1.25rem;background:#0d1420;border:1px solid rgba(255,255,255,.06);border-radius:1rem;padding:1.5rem;">
        <div style="width:36px;height:36px;background:#00d68f;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:.9rem;color:#060b14;flex-shrink:0;">${n}</div>
        <div><h3 style="font-size:1rem;margin-bottom:.4rem;">${title}</h3><p style="font-size:.875rem;margin:0;">${desc}</p></div>
      </div>`).join('')}
    </div>
    ${adUnit()}
    <!-- FORM SELECTOR -->
    <h2 style="margin-bottom:1.25rem;">Which ITR Form Should You Use?</h2>
    <div class="table-wrap" style="margin-bottom:2.5rem;">
      <table class="tax-table">
        <thead><tr><th>Form</th><th>Who Should File</th><th>Income Sources</th></tr></thead>
        <tbody>
          <tr><td class="highlight">ITR-1</td><td>Salaried individuals, pensioners</td><td>Salary, one house property, interest — income up to ₹50L</td></tr>
          <tr><td class="highlight">ITR-2</td><td>Individuals with capital gains</td><td>Salary + capital gains + foreign income + multiple properties</td></tr>
          <tr><td class="highlight">ITR-3</td><td>Business owners, professionals</td><td>Business/profession income with books of accounts</td></tr>
          <tr><td class="highlight">ITR-4</td><td>Small businesses, freelancers</td><td>Presumptive income under Sections 44AD, 44ADA, 44AE</td></tr>
        </tbody>
      </table>
    </div>
    <!-- TAX SLABS -->
    <h2 style="margin-bottom:1.25rem;">New Regime Tax Slabs — FY 2025-26</h2>
    <div class="table-wrap" style="margin-bottom:2.5rem;">
      <table class="tax-table">
        <thead><tr><th>Income Slab</th><th>Tax Rate</th><th>Tax on Slab</th></tr></thead>
        <tbody>
          <tr><td>Up to ₹4,00,000</td><td class="highlight">NIL</td><td>₹0</td></tr>
          <tr><td>₹4L – ₹8L</td><td>5%</td><td>₹20,000</td></tr>
          <tr><td>₹8L – ₹12L</td><td>10%</td><td>₹40,000</td></tr>
          <tr><td>₹12L – ₹16L</td><td>15%</td><td>₹60,000</td></tr>
          <tr><td>₹16L – ₹20L</td><td>20%</td><td>₹80,000</td></tr>
          <tr><td>₹20L – ₹24L</td><td>25%</td><td>₹1,00,000</td></tr>
          <tr><td>Above ₹24L</td><td>30%</td><td>On balance</td></tr>
        </tbody>
      </table>
    </div>
    <!-- DOCUMENT CHECKLIST -->
    <h2 style="margin-bottom:1.25rem;">📎 Documents Needed for ITR Filing</h2>
    <div class="grid-2" style="margin-bottom:2.5rem;">
      ${[
        ['Identity & Bank','PAN Card (mandatory)','Aadhaar Card (linked to PAN)','Bank account number + IFSC','Form 16 from employer','Bank statements (Jan–Mar)'],
        ['Income Proof','Form 26AS (TDS statement)','AIS (Annual Information Statement)','Salary slips for the year','Rent receipts (if claiming HRA)','Capital gains statement from broker'],
        ['Investment Proof','PPF passbook or statement','ELSS mutual fund statement','LIC / insurance premium receipts','NPS contribution statement','NSC / tax-saver FD certificates'],
        ['Loan & Property','Home loan interest certificate','Home loan principal statement','Property purchase deed (if applicable)','Rental agreement (if claiming HRA)','Landlord PAN (if rent >₹1L/year)']
      ].map(([title,...items]) => `
      <div class="card card-p">
        <h3 style="font-size:.9rem;margin-bottom:.875rem;">${title}</h3>
        ${items.map(i => `<div style="display:flex;align-items:center;gap:.5rem;padding:.4rem 0;border-bottom:1px solid rgba(255,255,255,.03);"><span style="color:#00d68f;font-size:.8rem;">✓</span><span style="font-size:.85rem;color:#8a9bbf;">${i}</span></div>`).join('')}
      </div>`).join('')}
    </div>
    ${adUnit()}
    <div style="background:rgba(0,214,143,.06);border:1px solid rgba(0,214,143,.15);border-radius:1rem;padding:1.75rem 2rem;text-align:center;">
      <h3 style="margin-bottom:.5rem;">Ready to File? Use Our Free Tax Calculator First</h3>
      <p style="margin-bottom:1.25rem;">Find out which regime saves you more money before you file.</p>
      <a href="/calculator" class="btn btn-primary">Open Tax Calculator →</a>
    </div>
  </div>
</section>`
  }));
});

// ── CALCULATOR ───────────────────────────────────────────────────────────────
router.get('/calculator', (req, res) => {
  res.send(page({
    title: 'Free Income Tax Calculator FY 2025-26 — Old vs New Regime | TaxWise India',
    desc: 'Calculate your income tax liability for FY 2025-26. Compare Old vs New tax regime instantly with live calculation. Free and accurate.',
    path: '/calculator',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">🧮 Tax Calculator</div>
    <h1>Income Tax Calculator <span class="accent">FY 2025-26</span></h1>
    <p>Compare Old vs New regime instantly. Enter your income and deductions — get your exact tax liability in seconds.</p>
  </div>
</div>
<section class="section">
  <div class="container">
    ${adBanner()}
    <div class="calc-grid" id="taxCalc" style="margin-top:1.5rem;">
      <!-- INPUTS -->
      <div>
        <div class="card card-p-lg">
          <h3 style="margin-bottom:1.5rem;">Enter Your Details</h3>
          <div class="form-group">
            <div class="calc-label">
              <span class="calc-label-text">Annual Salary / Income</span>
              <span class="calc-label-val" data-val="income">₹0</span>
            </div>
            <input id="income" type="range" min="0" max="5000000" step="25000" value="1000000">
          </div>
          <div class="form-group">
            <div class="calc-label">
              <span class="calc-label-text">80C Investments (EPF, PPF, ELSS…)</span>
              <span class="calc-label-val" data-val="deduction80c">₹0</span>
            </div>
            <input id="ded80c" type="range" min="0" max="150000" step="5000" value="150000">
          </div>
          <div class="form-group">
            <div class="calc-label">
              <span class="calc-label-text">HRA Exemption</span>
              <span class="calc-label-val" data-val="hra">₹0</span>
            </div>
            <input id="dedHra" type="range" min="0" max="300000" step="5000" value="0">
          </div>
          <div class="form-group">
            <div class="calc-label">
              <span class="calc-label-text">80D Health Insurance</span>
              <span class="calc-label-val" data-val="d80d">₹0</span>
            </div>
            <input id="ded80d" type="range" min="0" max="75000" step="2500" value="25000">
          </div>
          <div class="form-group">
            <div class="calc-label">
              <span class="calc-label-text">Home Loan Interest (Section 24b)</span>
              <span class="calc-label-val" data-val="homeloan">₹0</span>
            </div>
            <input id="dedHomeLoan" type="range" min="0" max="200000" step="10000" value="0">
          </div>
          <div class="form-group">
            <div class="calc-label">
              <span class="calc-label-text">NPS — 80CCD(1B) Extra</span>
              <span class="calc-label-val" data-val="nps">₹0</span>
            </div>
            <input id="dedNps" type="range" min="0" max="50000" step="5000" value="0">
          </div>
          <p style="font-size:.78rem;color:#374555;margin-top:1rem;">* Old regime includes ₹50,000 standard deduction; New regime includes ₹75,000 standard deduction for salaried.</p>
        </div>
      </div>
      <!-- RESULTS -->
      <div class="calc-result">
        <h3 style="margin-bottom:1.5rem;">Tax Comparison</h3>
        <div class="calc-result-row">
          <span class="calc-result-label">New Regime Tax</span>
          <span class="calc-result-val green" id="newTaxVal">₹0</span>
        </div>
        <div class="calc-result-row">
          <span class="calc-result-label">Old Regime Tax</span>
          <span class="calc-result-val" id="oldTaxVal">₹0</span>
        </div>
        <div class="calc-result-row" style="border-bottom:none;">
          <span class="calc-result-label">Difference</span>
          <span class="calc-result-val green" id="diffVal">₹0</span>
        </div>
        <div class="calc-winner" style="margin-top:1.25rem;">
          <div class="calc-winner-label">Best Regime for You</div>
          <div class="calc-winner-regime" id="winnerRegime">—</div>
          <div class="calc-winner-save" id="winnerSave">—</div>
        </div>
        <div style="margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid rgba(255,255,255,.05);">
          <p style="font-size:.78rem;color:#374555;">Includes 4% Health & Education Cess. Does not include surcharge (applicable for income >₹50L).</p>
        </div>
        ${adBanner()}
      </div>
    </div>
    ${adUnit()}
    <!-- TAX TIPS -->
    <div class="grid-3" style="margin-top:1.5rem;">
      <div class="card card-p"><h3 style="font-size:.9rem;margin-bottom:.5rem;">💡 Section 87A Rebate</h3><p style="font-size:.82rem;">Under new regime, if net taxable income is ≤ ₹12L, Section 87A provides ₹60,000 rebate making tax zero.</p></div>
      <div class="card card-p"><h3 style="font-size:.9rem;margin-bottom:.5rem;">💡 Standard Deduction</h3><p style="font-size:.82rem;">Salaried employees get ₹75,000 standard deduction in new regime and ₹50,000 in old regime — automatically.</p></div>
      <div class="card card-p"><h3 style="font-size:.9rem;margin-bottom:.5rem;">💡 Employer NPS</h3><p style="font-size:.82rem;">Ask HR to contribute 14% of salary to NPS (80CCD(2)) — deductible in both regimes, saves tax significantly.</p></div>
    </div>
  </div>
</section>`
  }));
});

// ── QUIZ ─────────────────────────────────────────────────────────────────────
router.get('/quiz', (req, res) => {
  res.send(page({
    title: 'Income Tax Quiz — Test Your Knowledge | TaxWise India',
    desc: 'Test your income tax knowledge with 15 questions covering basics, deductions, ITR filing, and Budget 2025 changes.',
    path: '/quiz',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">🎯 Tax Quiz</div>
    <h1>Test Your <span class="accent">Tax Knowledge</span></h1>
    <p>15 questions covering income tax basics, deductions, ITR filing, investing, and Budget 2025 updates. Get instant explanations.</p>
  </div>
</div>
<section class="section">
  <div class="container">
    ${adBanner()}
    <div class="quiz-wrap" style="margin-top:1.5rem;">
      <div class="card card-p-lg">
        <div id="quizApp">
          <div style="text-align:center;padding:2rem;">
            <div style="font-size:3rem;margin-bottom:1rem;">🎯</div>
            <h3 style="margin-bottom:.5rem;">Tax Knowledge Quiz</h3>
            <p style="margin-bottom:1.5rem;">15 questions · ~10 minutes · Instant explanations</p>
            <div style="display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;margin-bottom:2rem;">
              <div style="text-align:center;"><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:#00d68f;">15</div><div style="font-size:.75rem;color:#5a6a8a;">Questions</div></div>
              <div style="text-align:center;"><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:#818cf8;">FY 26</div><div style="font-size:.75rem;color:#5a6a8a;">Updated</div></div>
              <div style="text-align:center;"><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:#fbbf24;">100%</div><div style="font-size:.75rem;color:#5a6a8a;">Free</div></div>
            </div>
            <button onclick="startQuiz()" class="btn btn-primary btn-lg" type="button">Start Quiz →</button>
          </div>
        </div>
        <script id="quizData" type="application/json">${JSON.stringify(quizQuestions)}</script>
      </div>
      ${adUnit()}
    </div>
  </div>
</section>
<script>
function startQuiz() {
  initQuiz();
  document.getElementById('quizApp').innerHTML = '';
  // Re-init will run automatically since quizData is present
  const quizEl = document.getElementById('quizApp');
  let current=0,score=0,answered=false;
  const questions = JSON.parse(document.getElementById('quizData').textContent);
  const total=questions.length;
  function render(){
    if(current>=total){showScore();return;}
    const q=questions[current];answered=false;
    const progress=((current/total)*100).toFixed(1);
    quizEl.innerHTML=\`<div class="quiz-progress"><div class="quiz-progress-bar" style="width:\${progress}%"></div></div>
    <p style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:#5a6a8a;text-align:right;margin-bottom:1.5rem;">Question \${current+1} of \${total}</p>
    <p class="quiz-question">\${q.q}</p>
    <div class="quiz-options" id="opts">\${q.opts.map((o,i)=>\`<button class="quiz-option" data-idx="\${i}" type="button"><span class="quiz-option-letter">\${'ABCD'[i]}</span> \${o}</button>\`).join('')}</div>
    <div class="quiz-exp" id="exp"><strong>📚 Explanation:</strong> \${q.exp}</div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:.5rem;"><span style="font-family:'JetBrains Mono',monospace;font-size:.75rem;color:#5a6a8a;">Score: \${score}/\${current}</span><button id="nextBtn" class="btn btn-primary btn-sm" disabled type="button">Next →</button></div>\`;
    document.querySelectorAll('.quiz-option').forEach(btn=>{btn.addEventListener('click',()=>{if(answered)return;answered=true;const chosen=parseInt(btn.dataset.idx);document.querySelectorAll('.quiz-option').forEach((b,i)=>{b.disabled=true;if(i===q.ans)b.classList.add('correct');else if(i===chosen&&chosen!==q.ans)b.classList.add('wrong');});if(chosen===q.ans)score++;document.getElementById('exp').classList.add('show');document.getElementById('nextBtn').disabled=false;});});
    document.getElementById('nextBtn').addEventListener('click',()=>{current++;render();});
  }
  function showScore(){
    const pct=Math.round((score/total)*100);
    const grade=pct>=90?'🏆 Expert':pct>=70?'🎓 Proficient':pct>=50?'📚 Learner':'💡 Beginner';
    const msg=pct>=80?'Excellent! You know your taxes well.':pct>=60?'Good effort! A few areas to brush up on.':'Keep learning — TaxWise India has all the resources you need.';
    quizEl.innerHTML=\`<div class="quiz-score"><div class="quiz-score-num">\${score}/\${total}</div><div class="quiz-score-label">\${pct}% correct</div><div style="margin:1rem 0;font-size:1.5rem;">\${grade}</div><p style="color:#8a9bbf;font-size:.9rem;max-width:400px;margin:.5rem auto 2rem;">\${msg}</p><div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;"><button onclick="location.reload()" class="btn btn-primary" type="button">🔄 Try Again</button><a href="/learn" class="btn btn-outline">📚 Study More</a></div></div>\`;
    fetch('/api/quiz',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({score,total,percentage:pct})}).catch(()=>{});
  }
  render();
}
</script>`
  }));
});

// ── FAQ ──────────────────────────────────────────────────────────────────────
router.get('/faq', (req, res) => {
  const cats = ['All', 'Filing', 'Deductions', 'Investments', 'NRI', 'Other'];
  res.send(page({
    title: 'Income Tax FAQs — Frequently Asked Questions | TaxWise India',
    desc: 'Answers to the most common income tax questions asked by Indians — ITR filing, deductions, tax regimes, refunds, and more.',
    path: '/faq',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">❓ FAQs</div>
    <h1>Frequently Asked <span class="accent">Tax Questions</span></h1>
    <p>Answers to the most common income tax questions from Indians — updated for FY 2025-26.</p>
  </div>
</div>
<section class="section">
  <div class="container">
    ${adBanner()}
    <div style="max-width:800px;margin:1.5rem auto 0;">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input id="faqSearch" type="search" class="search-input" placeholder="Search FAQs…" aria-label="Search FAQs">
      </div>
      <div class="accordion" id="faqAccordion">
        ${faqs.map((f,i) => `
        <div class="accordion-item${i===0?' open':''}">
          <button class="accordion-btn" type="button">
            <span class="accordion-icon">+</span>
            ${f.q}
            <span class="accordion-arrow">▼</span>
          </button>
          <div class="accordion-body">
            <div class="accordion-body-inner"><p>${f.a}</p></div>
          </div>
        </div>`).join('')}
      </div>
      ${adUnit()}
      <div style="text-align:center;padding:2rem;background:#0d1420;border-radius:1rem;border:1px solid rgba(255,255,255,.06);margin-top:2rem;">
        <h3 style="margin-bottom:.5rem;">Still Have Questions?</h3>
        <p style="margin-bottom:1.25rem;">We're here to help. Send us your question and we'll answer it personally.</p>
        <a href="/contact" class="btn btn-primary">Contact Us →</a>
      </div>
    </div>
  </div>
</section>`
  }));
});

// ── GLOSSARY ─────────────────────────────────────────────────────────────────
router.get('/glossary', (req, res) => {
  const letters = [...new Set(glossary.map(g => g.term[0]))].sort();
  res.send(page({
    title: 'Income Tax Glossary — 27 Tax Terms Explained | TaxWise India',
    desc: 'Plain-English definitions of 27 important income tax and finance terms used in India — from AIS to TDS and everything in between.',
    path: '/glossary',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">📖 Glossary</div>
    <h1>Income Tax <span class="accent">Glossary</span></h1>
    <p>27 key income tax and finance terms explained in simple, plain English. No jargon.</p>
  </div>
</div>
<section class="section">
  <div class="container">
    ${adBanner()}
    <div style="max-width:800px;margin:1.5rem auto 0;">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input id="glossSearch" type="search" class="search-input" placeholder="Search terms…" aria-label="Search glossary">
      </div>
      <div class="gloss-filters">
        <button class="gloss-btn active" data-letter="ALL">All</button>
        ${letters.map(l => `<button class="gloss-btn" data-letter="${l}">${l}</button>`).join('')}
      </div>
      ${glossary.map(g => `
      <div class="gloss-item" data-letter="${g.term[0]}">
        <div class="gloss-term">${g.term}</div>
        <div class="gloss-def">${g.def}</div>
      </div>`).join('')}
      ${adUnit()}
    </div>
  </div>
</section>`
  }));
});

// ── TIPS ─────────────────────────────────────────────────────────────────────
router.get('/tips', (req, res) => {
  const tips = [
    { icon:'🏦', title:'Maximise Section 80C', desc:'Invest the full ₹1.5 lakh in 80C instruments — EPF, PPF, or ELSS. At 30% bracket, this saves ₹46,800 in tax annually. ELSS gives market returns with just 3-year lock-in.' },
    { icon:'🏥', title:'Don\'t Skip Health Insurance', desc:'₹25,000 premium for self/family + ₹25,000 for parents = ₹50,000 deduction under 80D. Plus you\'re protected from medical emergencies. Parents over 60 get ₹50,000 limit.' },
    { icon:'📈', title:'Use LTCG Harvesting', desc:'Sell equity investments worth ₹1.25 lakh gains every March and rebuy. This resets your cost basis and eliminates future LTCG tax. Free money — no actual selling needed.' },
    { icon:'🏢', title:'Ask HR for NPS Contribution', desc:'Ask your employer to contribute 14% of salary to NPS under Section 80CCD(2). Deductible in both old and new regimes. This one change can save ₹50,000+ in tax.' },
    { icon:'💳', title:'File ITR Even If Below Taxable Limit', desc:'File ITR annually even if income is below ₹2.5L. It serves as income proof for loans, visa, credit cards. 3 years of ITRs are often required by banks.' },
    { icon:'🏠', title:'Pay Rent to Parents (Legally!)', desc:'If you live with parents, pay them market-rate rent. Claim HRA exemption on your side. Parents declare it as rental income — usually at lower tax or nil (if their income is low).' },
    { icon:'⚡', title:'Verify AIS Before Filing', desc:'Download AIS (Annual Information Statement) from incometax.gov.in before filing. Check for unreported income — mutual fund redemptions, FD interest, property sales. Mismatches invite scrutiny.' },
    { icon:'📅', title:'Never Miss Advance Tax Deadlines', desc:'If your tax liability is >₹10,000, pay advance tax quarterly. Missing deadlines costs 1%/month interest under 234B and 234C. Set calendar reminders: Jun 15, Sep 15, Dec 15, Mar 15.' }
  ];
  res.send(page({
    title: 'Money Tips & Tax Saving Strategies for Young Indians | TaxWise India',
    desc: '8 practical money tips and tax-saving strategies for young Indians. Includes a SIP compound interest calculator to project your wealth.',
    path: '/tips',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">💰 Money Tips</div>
    <h1>Smart <span class="accent">Money Tips</span> for Young Indians</h1>
    <p>8 practical strategies to save tax, grow wealth, and make smarter financial decisions in FY 2025-26.</p>
  </div>
</div>
<section class="section">
  <div class="container">
    ${adBanner()}
    <div class="grid-2" style="margin-top:1.5rem;">
      ${tips.map((t,i) => `
      <div class="tip-card">
        <div class="tip-number">Tip ${String(i+1).padStart(2,'0')}</div>
        <span class="tip-icon">${t.icon}</span>
        <div class="tip-title">${t.title}</div>
        <div class="tip-desc">${t.desc}</div>
      </div>`).join('')}
    </div>
    ${adUnit()}
    <!-- SIP CALCULATOR -->
    <div style="margin-top:3rem;background:#0d1420;border:1px solid rgba(255,255,255,.06);border-radius:1.25rem;padding:2rem;">
      <h2 style="margin-bottom:.5rem;">SIP Compound Interest Calculator</h2>
      <p style="margin-bottom:2rem;">See how your monthly SIP investment grows over time.</p>
      <div class="calc-grid">
        <div>
          <div class="form-group">
            <div class="calc-label"><span class="calc-label-text">Monthly SIP Amount</span><span class="calc-label-val" id="sipAmtVal">₹5,000</span></div>
            <input id="sipAmt" type="range" min="500" max="100000" step="500" value="5000">
          </div>
          <div class="form-group">
            <div class="calc-label"><span class="calc-label-text">Investment Period (Years)</span><span class="calc-label-val" id="sipYrVal">10 yrs</span></div>
            <input id="sipYr" type="range" min="1" max="40" step="1" value="10">
          </div>
          <div class="form-group">
            <div class="calc-label"><span class="calc-label-text">Expected Annual Returns</span><span class="calc-label-val" id="sipRateVal">12%</span></div>
            <input id="sipRate" type="range" min="4" max="25" step="0.5" value="12">
          </div>
        </div>
        <div style="background:#060b14;border-radius:1rem;padding:1.75rem;border:1px solid rgba(255,255,255,.05);">
          <div class="calc-result-row"><span class="calc-result-label">Total Invested</span><span class="calc-result-val" id="sipInvested">₹0</span></div>
          <div class="calc-result-row"><span class="calc-result-label">Returns Earned</span><span class="calc-result-val green" id="sipReturns">₹0</span></div>
          <div class="calc-result-row" style="border:none;"><span class="calc-result-label">Maturity Value</span><span class="calc-result-val big" id="sipMaturity">₹0</span></div>
          <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.05);"><p style="font-size:.78rem;color:#374555;">Past performance of mutual funds is not indicative of future returns. This is for illustrative purposes only.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
<script>
function fmtCr(n){if(n>=10000000)return'₹'+(n/10000000).toFixed(2)+' Cr';if(n>=100000)return'₹'+(n/100000).toFixed(1)+' L';return'₹'+n.toLocaleString('en-IN');}
function sipCalc(){
  const amt=parseInt(document.getElementById('sipAmt').value)||5000;
  const yr=parseInt(document.getElementById('sipYr').value)||10;
  const rate=parseFloat(document.getElementById('sipRate').value)||12;
  document.getElementById('sipAmtVal').textContent='₹'+amt.toLocaleString('en-IN');
  document.getElementById('sipYrVal').textContent=yr+' yrs';
  document.getElementById('sipRateVal').textContent=rate+'%';
  const n=yr*12,r=rate/100/12;
  const maturity=Math.round(amt*((Math.pow(1+r,n)-1)/r)*(1+r));
  const invested=amt*n;
  const returns=maturity-invested;
  document.getElementById('sipInvested').textContent=fmtCr(invested);
  document.getElementById('sipReturns').textContent=fmtCr(returns);
  document.getElementById('sipMaturity').textContent=fmtCr(maturity);
}
['sipAmt','sipYr','sipRate'].forEach(id=>document.getElementById(id)?.addEventListener('input',sipCalc));
sipCalc();
</script>`
  }));
});

// ── CONTACT ──────────────────────────────────────────────────────────────────
router.get('/contact', (req, res) => {
  res.send(page({
    title: 'Contact Us — TaxWise India',
    desc: 'Get in touch with TaxWise India for questions, feedback, or partnership inquiries. We respond within 2–3 business days.',
    path: '/contact',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">✉️ Contact</div>
    <h1>Get in <span class="accent">Touch</span></h1>
    <p>Have a question about taxes or the website? We'd love to hear from you. We respond within 2–3 business days.</p>
  </div>
</div>
<section class="section">
  <div class="container">
    ${adBanner()}
    <div class="contact-grid" style="margin-top:1.5rem;">
      <div>
        <div class="contact-info-item">
          <div class="contact-info-icon">📧</div>
          <div>
            <div class="contact-info-label">Email</div>
            <div class="contact-info-val"><a href="mailto:vanshmahajan8082@gmail.com">vanshmahajan8082@gmail.com</a></div>
          </div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-icon">⏱</div>
          <div>
            <div class="contact-info-label">Response Time</div>
            <div class="contact-info-val">2–3 business days</div>
          </div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-icon">🌏</div>
          <div>
            <div class="contact-info-label">Location</div>
            <div class="contact-info-val">India</div>
          </div>
        </div>
        <div style="background:#0d1420;border:1px solid rgba(255,255,255,.06);border-radius:1rem;padding:1.5rem;margin-top:1rem;">
          <h3 style="font-size:.95rem;margin-bottom:1rem;">Disclaimer</h3>
          <p style="font-size:.85rem;color:#5a6a8a;line-height:1.7;">TaxWise India provides general tax education only. We are not a registered tax advisor or Chartered Accountant. For specific tax advice, please consult a qualified CA.</p>
        </div>
      </div>
      <div class="card card-p-lg">
        <h3 style="margin-bottom:1.5rem;">Send a Message</h3>
        <div id="formAlert" class="form-alert"></div>
        <form id="contactForm" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="cf-name">Your Name *</label>
              <input id="cf-name" name="name" type="text" class="form-input" placeholder="Rahul Sharma" required maxlength="100">
            </div>
            <div class="form-group">
              <label class="form-label" for="cf-email">Email Address *</label>
              <input id="cf-email" name="email" type="email" class="form-input" placeholder="rahul@gmail.com" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="cf-subject">Subject *</label>
            <select id="cf-subject" name="subject" class="form-select" required>
              <option value="">Select a topic…</option>
              <option>ITR Filing Help</option>
              <option>Tax Calculator Issue</option>
              <option>New Tax Regime Query</option>
              <option>Section 80C Question</option>
              <option>Capital Gains Tax</option>
              <option>HRA / Deductions</option>
              <option>Website Feedback</option>
              <option>Content Suggestion</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="cf-message">Message *</label>
            <textarea id="cf-message" name="message" class="form-textarea" placeholder="Describe your question in detail…" required maxlength="2000"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</section>`
  }));
});

// ── ABOUT ────────────────────────────────────────────────────────────────────
router.get('/about', (req, res) => {
  res.send(page({
    title: 'About TaxWise India — Our Mission & Story',
    desc: 'TaxWise India is a free income tax education platform for young Indians. Learn about our mission to make tax literacy accessible to everyone.',
    path: '/about',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">ℹ️ About Us</div>
    <h1>About <span class="accent">TaxWise India</span></h1>
    <p>Making income tax simple, accessible, and free for every young Indian.</p>
  </div>
</div>
<section class="section">
  <div class="container-sm prose">
    ${adBanner()}
    <h2>Our Mission</h2>
    <p>TaxWise India was created with a single mission: to make income tax education accessible to every Indian, regardless of their background or financial knowledge. Millions of young Indians file their first ITR every year with zero guidance — we're changing that.</p>
    <p>We believe that financial literacy is a right, not a privilege. Our platform provides free, accurate, and jargon-free content on income tax, ITR filing, investments, and personal finance — updated every year with the latest Budget changes.</p>
    <h2>What We Offer</h2>
    <ul>
      <li><strong>Free Tax Calculator:</strong> Instantly compare Old vs New regime tax liability</li>
      <li><strong>ITR Filing Guide:</strong> Step-by-step walkthrough with form selector and document checklist</li>
      <li><strong>Tax Learning Hub:</strong> 9 in-depth topic guides from basics to advanced concepts</li>
      <li><strong>Tax Articles:</strong> Expert-written guides on specific tax topics and deductions</li>
      <li><strong>Tax Quiz:</strong> 15-question quiz with explanations to test your knowledge</li>
      <li><strong>Glossary:</strong> 27 tax terms explained in plain English</li>
      <li><strong>Money Tips:</strong> Practical personal finance advice with SIP calculator</li>
    </ul>
    <h2>Important Disclaimer</h2>
    <blockquote>TaxWise India provides general income tax information for educational purposes only. We are not a registered tax advisor, Chartered Accountant, or SEBI-registered investment advisor. Nothing on this website constitutes professional financial or legal advice. Please consult a qualified CA for your specific tax situation.</blockquote>
    <h2>Content Accuracy</h2>
    <p>All content on TaxWise India is thoroughly researched and updated for the current financial year. We cross-reference information with official sources including the Income Tax Act, CBDT circulars, and the official incometax.gov.in portal.</p>
    <p>However, tax laws change frequently. We recommend verifying critical details with official government sources or a qualified tax professional before making financial decisions.</p>
    <h2>Contact Us</h2>
    <p>Have suggestions, corrections, or questions? We'd love to hear from you.</p>
    <p>📧 Email: <a href="mailto:vanshmahajan8082@gmail.com">vanshmahajan8082@gmail.com</a></p>
    <p>We respond within 2–3 business days.</p>
    ${adUnit()}
  </div>
</section>`
  }));
});

// ── PRIVACY POLICY ───────────────────────────────────────────────────────────
router.get('/privacy-policy', (req, res) => {
  res.send(page({
    title: 'Privacy Policy — TaxWise India',
    desc: 'Privacy Policy for TaxWise India. Learn how we collect, use, and protect your personal information.',
    path: '/privacy-policy',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">🔒 Privacy</div>
    <h1>Privacy <span class="accent">Policy</span></h1>
    <p>Last updated: January 2025</p>
  </div>
</div>
<section class="section">
  <div class="container-sm prose">
    <p>This Privacy Policy describes how TaxWise India ("we", "our", "us") collects, uses, and shares information about you when you use our website at taxwiseindia.netlify.app.</p>
    <h2>Information We Collect</h2>
    <h3>Information You Provide</h3>
    <ul>
      <li><strong>Contact Form:</strong> When you submit our contact form, we collect your name, email address, subject, and message content.</li>
      <li><strong>Newsletter Subscription:</strong> When you subscribe to our newsletter, we collect your email address and optional name.</li>
      <li><strong>Quiz Responses:</strong> We collect anonymous quiz scores (no personally identifiable information) to improve our content.</li>
    </ul>
    <h3>Information Collected Automatically</h3>
    <ul>
      <li><strong>Usage Data:</strong> We may collect information about how you interact with the site, including pages visited and time spent.</li>
      <li><strong>Device Information:</strong> Browser type, operating system, and IP address for security and analytics purposes.</li>
      <li><strong>Cookies:</strong> We use cookies to improve your browsing experience. You can disable cookies in your browser settings.</li>
    </ul>
    <h2>Google AdSense</h2>
    <p>We use Google AdSense to display advertisements on this website. Google AdSense uses cookies to serve ads based on your visits to this site and other sites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</p>
    <p>You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a>. You can also opt out of a third-party vendor's use of cookies for personalised advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener">aboutads.info</a>.</p>
    <h2>How We Use Your Information</h2>
    <ul>
      <li>To respond to your contact form messages</li>
      <li>To send you the newsletter you subscribed to</li>
      <li>To improve our website content and user experience</li>
      <li>To ensure the security and proper functioning of our website</li>
    </ul>
    <h2>Information Sharing</h2>
    <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with trusted service providers (MongoDB Atlas for database storage, Gmail for email) who assist us in operating our website, subject to confidentiality agreements.</p>
    <h2>Data Security</h2>
    <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.</p>
    <h2>Data Retention</h2>
    <p>We retain contact form submissions for 12 months and newsletter subscriptions until you unsubscribe. You may request deletion of your data by emailing us.</p>
    <h2>Your Rights</h2>
    <ul>
      <li>Access the personal information we hold about you</li>
      <li>Request correction of inaccurate information</li>
      <li>Request deletion of your personal data</li>
      <li>Unsubscribe from our newsletter at any time</li>
    </ul>
    <h2>Third-Party Links</h2>
    <p>Our website may contain links to external sites such as incometax.gov.in, SEBI, and others. We are not responsible for the privacy practices of these sites and encourage you to review their privacy policies.</p>
    <h2>Contact Us</h2>
    <p>For any privacy-related questions, contact us at: <a href="mailto:vanshmahajan8082@gmail.com">vanshmahajan8082@gmail.com</a></p>
  </div>
</section>`
  }));
});

// ── TERMS ────────────────────────────────────────────────────────────────────
router.get('/terms', (req, res) => {
  res.send(page({
    title: 'Terms of Use — TaxWise India',
    desc: 'Terms of Use for TaxWise India. Read our terms before using the website.',
    path: '/terms',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">📜 Legal</div>
    <h1>Terms of <span class="accent">Use</span></h1>
    <p>Last updated: January 2025</p>
  </div>
</div>
<section class="section">
  <div class="container-sm prose">
    <p>By accessing and using TaxWise India, you accept and agree to be bound by these Terms of Use.</p>
    <h2>Educational Purpose Only</h2>
    <p>TaxWise India provides income tax and financial information for <strong>educational purposes only</strong>. We are not a licensed Chartered Accountant, tax advisor, or SEBI-registered investment advisor. Nothing on this website should be construed as professional tax or financial advice.</p>
    <p>Always consult a qualified Chartered Accountant (CA) or tax professional for your specific financial situation before making tax-related decisions.</p>
    <h2>Accuracy of Information</h2>
    <p>While we make every effort to ensure the accuracy of information on this site, we make no warranties about the completeness, reliability, or suitability of the information for any purpose. Tax laws change frequently — verify all information with official government sources including incometax.gov.in.</p>
    <h2>Use of Tax Calculator</h2>
    <p>Our tax calculator provides estimates only. Actual tax liability may differ based on individual circumstances, surcharge applicability, special provisions, and professional assessment. Do not use calculator results as final tax amounts without verification.</p>
    <h2>User Responsibilities</h2>
    <ul>
      <li>Use the website only for lawful purposes</li>
      <li>Do not submit false or misleading information through our contact form</li>
      <li>Do not attempt to disrupt or damage the website</li>
      <li>Verify tax information with official sources before acting on it</li>
    </ul>
    <h2>Intellectual Property</h2>
    <p>All content on TaxWise India including text, tools, and design is protected by copyright. You may not reproduce or redistribute content without prior written permission.</p>
    <h2>Limitation of Liability</h2>
    <p>TaxWise India shall not be liable for any financial losses, penalties, or other damages arising from reliance on information provided on this website. Use at your own risk.</p>
    <h2>Changes to Terms</h2>
    <p>We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.</p>
    <h2>Contact</h2>
    <p>Questions about these terms? Email us at: <a href="mailto:vanshmahajan8082@gmail.com">vanshmahajan8082@gmail.com</a></p>
  </div>
</section>`
  }));
});

// ── DISCLAIMER ───────────────────────────────────────────────────────────────
router.get('/disclaimer', (req, res) => {
  res.send(page({
    title: 'Disclaimer — TaxWise India',
    desc: 'Important disclaimer for TaxWise India. This site is for educational purposes only and does not constitute professional tax advice.',
    path: '/disclaimer',
    body: `
<div class="page-hero">
  <div class="container">
    <div class="page-hero-tag">⚠️ Disclaimer</div>
    <h1>Important <span class="accent">Disclaimer</span></h1>
    <p>Please read this before using information from TaxWise India.</p>
  </div>
</div>
<section class="section">
  <div class="container-sm prose">
    <blockquote>TaxWise India is an educational platform. We are NOT a Chartered Accountant, tax lawyer, or financial advisor. Information provided is for general educational purposes only.</blockquote>
    <h2>No Professional Tax Advice</h2>
    <p>The information on TaxWise India is provided for general informational and educational purposes only. It is not intended to be and should not be construed as professional tax, legal, or financial advice. Every individual's tax situation is unique and may be subject to different rules, provisions, and interpretations of the law.</p>
    <h2>Consult a Professional</h2>
    <p>Before making any tax-related decisions — especially those involving significant amounts of money, complex situations like business income, capital gains, foreign income, or NRI status — please consult a qualified and registered Chartered Accountant (CA) or tax professional.</p>
    <h2>Information May Be Outdated</h2>
    <p>Tax laws, rates, and thresholds change with every Union Budget and through CBDT circulars throughout the year. While we make every effort to keep content current for FY 2025-26, some information may become outdated. Always verify with official sources:</p>
    <ul>
      <li><a href="https://incometax.gov.in" target="_blank" rel="noopener">Income Tax Department — incometax.gov.in</a></li>
      <li><a href="https://cbdt.gov.in" target="_blank" rel="noopener">CBDT — cbdt.gov.in</a></li>
      <li><a href="https://finmin.nic.in" target="_blank" rel="noopener">Ministry of Finance — finmin.nic.in</a></li>
    </ul>
    <h2>Calculator Limitations</h2>
    <p>Our tax calculator provides approximate estimates based on commonly applicable provisions. It does not account for surcharge (applicable for income >₹50 lakh), marginal relief, special rates for specific income types, AMT, or state-specific provisions.</p>
    <h2>No Liability</h2>
    <p>TaxWise India, its creators, and contributors shall not be held liable for any financial loss, penalty, interest, or other harm resulting from reliance on information published on this website.</p>
    <h2>Contact</h2>
    <p>If you find incorrect information, please let us know: <a href="mailto:vanshmahajan8082@gmail.com">vanshmahajan8082@gmail.com</a></p>
  </div>
</section>`
  }));
});

module.exports = router;
