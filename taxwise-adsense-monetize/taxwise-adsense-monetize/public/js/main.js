// ── NAVBAR ──────────────────────────────────────────────────────────────────
const navbar  = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const mobile  = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

if (menuBtn && mobile) {
  menuBtn.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? '✕' : '☰';
  });
}

// Close mobile menu on link click
document.querySelectorAll('.navbar-mobile a').forEach(a => {
  a.addEventListener('click', () => {
    mobile.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', false);
    menuBtn.textContent = '☰';
  });
});

// ── ACCORDION ──────────────────────────────────────────────────────────────
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
    // Open clicked if it was closed
    if (!isOpen) item.classList.add('open');
  });
});

// ── LEARN CARDS ─────────────────────────────────────────────────────────────
document.querySelectorAll('.learn-card').forEach(card => {
  card.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');
    document.querySelectorAll('.learn-card.open').forEach(c => c.classList.remove('open'));
    if (!isOpen) card.classList.add('open');
  });
});

// ── SEARCH / FILTER ─────────────────────────────────────────────────────────
function initSearch(inputId, itemSelector, textSelector) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll(itemSelector).forEach(el => {
      const text = el.querySelector(textSelector)?.textContent.toLowerCase() || el.textContent.toLowerCase();
      el.style.display = (!q || text.includes(q)) ? '' : 'none';
    });
  });
}

initSearch('faqSearch', '.accordion-item', '.accordion-btn');
initSearch('glossSearch', '.gloss-item', '.gloss-term');
initSearch('blogSearch', '.article-card', '.article-card-title');

// ── CATEGORY FILTERS ────────────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group || 'main';
    document.querySelectorAll(`.filter-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    const target = btn.dataset.target || '.article-card';
    document.querySelectorAll(target).forEach(el => {
      if (cat === 'all' || el.dataset.cat === cat) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  });
});

// ── GLOSSARY ALPHA FILTER ───────────────────────────────────────────────────
document.querySelectorAll('.gloss-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gloss-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const letter = btn.dataset.letter;
    document.querySelectorAll('.gloss-item').forEach(item => {
      if (letter === 'ALL' || item.dataset.letter === letter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ── TAX CALCULATOR ──────────────────────────────────────────────────────────
function initCalculator() {
  const calcEl = document.getElementById('taxCalc');
  if (!calcEl) return;

  const inputs = {
    income: document.getElementById('income'),
    deduction80c: document.getElementById('ded80c'),
    hra: document.getElementById('dedHra'),
    d80d: document.getElementById('ded80d'),
    homeloan: document.getElementById('dedHomeLoan'),
    nps: document.getElementById('dedNps')
  };

  function fmt(n) {
    if (n >= 10000000) return '₹' + (n/10000000).toFixed(1) + ' Cr';
    if (n >= 100000)   return '₹' + (n/100000).toFixed(1)  + ' L';
    if (n >= 1000)     return '₹' + (n/1000).toFixed(0)    + ' K';
    return '₹' + n;
  }

  function calcNewRegime(income) {
    if (income <= 0) return 0;
    const net = Math.max(0, income - 75000); // standard deduction
    if (net <= 400000) return 0;
    let tax = 0;
    const slabs = [[400000,800000,.05],[800000,1200000,.10],[1200000,1600000,.15],[1600000,2000000,.20],[2000000,2400000,.25],[2400000,Infinity,.30]];
    for (const [lo,hi,rate] of slabs) {
      if (net > lo) tax += (Math.min(net,hi) - lo) * rate;
    }
    if (net <= 1200000) tax = Math.max(0, tax - 60000); // 87A rebate
    return Math.round(tax * 1.04); // + 4% cess
  }

  function calcOldRegime(income, d80c, hra, d80d, home, nps) {
    const totalDed = Math.min(d80c, 150000) + Math.min(hra, income*0.5) + Math.min(d80d, 50000) + Math.min(home, 200000) + Math.min(nps, 50000) + 50000;
    const net = Math.max(0, income - totalDed);
    if (net <= 250000) return 0;
    let tax = 0;
    if (net > 1000000) tax += (net - 1000000) * 0.30;
    if (net > 500000)  tax += (Math.min(net, 1000000) - 500000) * 0.20;
    if (net > 250000)  tax += (Math.min(net, 500000) - 250000) * 0.05;
    if (net <= 500000) tax = Math.max(0, tax - 12500); // 87A
    return Math.round(tax * 1.04);
  }

  function update() {
    const income = parseInt(inputs.income?.value || 0);
    const d80c   = parseInt(inputs.deduction80c?.value || 0);
    const hra    = parseInt(inputs.hra?.value || 0);
    const d80d   = parseInt(inputs.d80d?.value || 0);
    const home   = parseInt(inputs.homeloan?.value || 0);
    const nps    = parseInt(inputs.nps?.value || 0);

    // Update display values
    document.querySelectorAll('[data-val]').forEach(el => {
      const id = el.dataset.val;
      if (inputs[id]) el.textContent = fmt(parseInt(inputs[id].value || 0));
    });

    const newTax = calcNewRegime(income);
    const oldTax = calcOldRegime(income, d80c, hra, d80d, home, nps);
    const diff   = Math.abs(newTax - oldTax);
    const winner = newTax <= oldTax ? 'New Regime' : 'Old Regime';

    const el = (id) => document.getElementById(id);
    if (el('newTaxVal'))    el('newTaxVal').textContent    = fmt(newTax);
    if (el('oldTaxVal'))    el('oldTaxVal').textContent    = fmt(oldTax);
    if (el('diffVal'))      el('diffVal').textContent      = diff > 0 ? `Save ${fmt(diff)}` : 'Equal';
    if (el('winnerRegime')) el('winnerRegime').textContent = winner;
    if (el('winnerSave'))   el('winnerSave').textContent   = diff > 0 ? `You save ₹${diff.toLocaleString('en-IN')} by choosing ${winner}` : 'Both regimes give same tax';
  }

  Object.values(inputs).forEach(inp => inp?.addEventListener('input', update));
  update();
}
initCalculator();

// ── QUIZ ─────────────────────────────────────────────────────────────────────
function initQuiz() {
  const quizEl = document.getElementById('quizApp');
  if (!quizEl) return;

  let current = 0, score = 0, answered = false;
  const questions = JSON.parse(document.getElementById('quizData').textContent);
  const total = questions.length;

  function render() {
    if (current >= total) { showScore(); return; }
    const q = questions[current];
    answered = false;
    const progress = ((current / total) * 100).toFixed(1);

    quizEl.innerHTML = `
      <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${progress}%"></div></div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:#5a6a8a;text-align:right;margin-bottom:1.5rem;">Question ${current+1} of ${total}</p>
      <p class="quiz-question">${q.q}</p>
      <div class="quiz-options" id="opts">
        ${q.opts.map((o,i) => `
          <button class="quiz-option" data-idx="${i}" type="button">
            <span class="quiz-option-letter">${'ABCD'[i]}</span> ${o}
          </button>`).join('')}
      </div>
      <div class="quiz-exp" id="exp"><strong>📚 Explanation:</strong> ${q.exp}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:.5rem;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:.75rem;color:#5a6a8a;">Score: ${score}/${current}</span>
        <button id="nextBtn" class="btn btn-primary btn-sm" disabled type="button">Next →</button>
      </div>`;

    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const chosen = parseInt(btn.dataset.idx);
        const correct = q.ans;
        document.querySelectorAll('.quiz-option').forEach((b, i) => {
          b.disabled = true;
          if (i === correct) b.classList.add('correct');
          else if (i === chosen && chosen !== correct) b.classList.add('wrong');
        });
        if (chosen === correct) score++;
        document.getElementById('exp').classList.add('show');
        document.getElementById('nextBtn').disabled = false;
      });
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      current++;
      render();
    });
  }

  function showScore() {
    const pct = Math.round((score / total) * 100);
    const grade = pct >= 90 ? '🏆 Expert' : pct >= 70 ? '🎓 Proficient' : pct >= 50 ? '📚 Learner' : '💡 Beginner';
    const msg = pct >= 80 ? 'Excellent! You know your taxes well.' : pct >= 60 ? 'Good effort! A few areas to brush up on.' : 'Keep learning! TaxWise India has all the resources you need.';

    quizEl.innerHTML = `
      <div class="quiz-score">
        <div class="quiz-score-num">${score}/${total}</div>
        <div class="quiz-score-label">${pct}% correct</div>
        <div style="margin:1rem 0;font-size:1.5rem;">${grade}</div>
        <p style="color:#8a9bbf;font-size:.9rem;max-width:400px;margin:.5rem auto 2rem;">${msg}</p>
        <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
          <button onclick="location.reload()" class="btn btn-primary" type="button">🔄 Try Again</button>
          <a href="/learn" class="btn btn-outline">📚 Study More</a>
        </div>
        <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.05);">
          <p style="font-size:.8rem;color:#374555;margin-bottom:.5rem;">Share your score!</p>
          <p style="font-family:'JetBrains Mono',monospace;font-size:.85rem;color:#00d68f;">I scored ${score}/${total} on TaxWise India's Tax Quiz! 🎯</p>
        </div>
      </div>`;

    // Save score to backend
    fetch('/api/quiz', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ score, total, percentage: pct }) }).catch(() => {});
  }

  render();
}
initQuiz();

// ── NEWSLETTER FORM ─────────────────────────────────────────────────────────
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('[name=email]').value.trim();
    const name  = form.querySelector('[name=name]')?.value.trim() || '';
    const btn   = form.querySelector('button[type=submit]');
    const msg   = form.parentElement.querySelector('.nl-msg');
    if (!email) return;
    btn.disabled = true; btn.textContent = 'Subscribing…';
    try {
      const r = await fetch('/api/subscribe', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email, name }) });
      const d = await r.json();
      if (msg) {
        msg.textContent = d.message || 'Subscribed! Check your inbox.';
        msg.className = 'nl-msg form-alert success';
      }
      form.reset();
    } catch {
      if (msg) { msg.textContent = 'Something went wrong. Please try again.'; msg.className = 'nl-msg form-alert error'; }
    } finally {
      btn.disabled = false; btn.textContent = 'Subscribe →';
    }
  });
});

// ── CONTACT FORM ────────────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type=submit]');
    const alert = document.getElementById('formAlert');
    const data = Object.fromEntries(new FormData(contactForm));
    btn.disabled = true; btn.textContent = 'Sending…';
    if (alert) alert.className = 'form-alert';
    try {
      const r = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
      const d = await r.json();
      if (d.success) {
        if (alert) { alert.textContent = '✅ Message sent! We\'ll reply within 2–3 business days.'; alert.className = 'form-alert success'; }
        contactForm.reset();
      } else throw new Error(d.message);
    } catch (err) {
      if (alert) { alert.textContent = '❌ ' + (err.message || 'Something went wrong. Please try again.'); alert.className = 'form-alert error'; }
    } finally {
      btn.disabled = false; btn.textContent = 'Send Message';
    }
  });
}

// ── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
