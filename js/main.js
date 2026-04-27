/* main.js — Todas las interacciones del portafolio */

/* ═══════════════════════════════
   1. CURSOR PERSONALIZADO
═══════════════════════════════ */
(function () {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  function animRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, .sk-card, .p-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
})();

/* ═══════════════════════════════
   2. TYPEWRITER — EYEBROW HERO
═══════════════════════════════ */
(function () {
  const el = document.getElementById('eyebrowType');
  if (!el) return;

  const phrases = [
    'Ing. en Desarrollo y Gestión de Software',
    'Especialista en Odoo ERP',
    'Desarrolladora Full Stack',
    'Área de Sistemas'
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();
})();

/* ═══════════════════════════════
   3. CODE CARD — ANIMACIÓN TYPING
═══════════════════════════════ */
(function () {
  const pre = document.getElementById('codePre');
  if (!pre) return;

  const lines = [
    '<span class="c-cm"># perfil.py — Anays Flores</span>',
    '',
    '<span class="c-kw">class</span> <span class="c-cn">Anays</span>(<span class="c-cn">SoftwareEngineer</span>):',
    '    <span class="c-kw">def</span> <span class="c-fn">__init__</span>(self):',
    '        self.<span class="c-pr">name</span>    = <span class="c-st">"Erika Anays Morales Flores"</span>',
    '        self.<span class="c-pr">role</span>    = <span class="c-st">"Ing. Desarrollo y Gestión de Software"</span>',
    '        self.<span class="c-pr">company</span> = <span class="c-st">"SigueMED"</span>',
    '        self.<span class="c-pr">stack</span>   = [<span class="c-st">"Odoo"</span>, <span class="c-st">"Python"</span>,',
    '                            <span class="c-st">"React"</span>, <span class="c-st">"SQL"</span>]',
    '        self.<span class="c-pr">status</span>  = <span class="c-st">"✓ disponible"</span>',
    '',
    '    <span class="c-kw">def</span> <span class="c-fn">get_contact</span>(self):',
    '        <span class="c-kw">return</span> <span class="c-st">"erikaanaysm@gmail.com"</span>',
  ];

  let li = 0;
  pre.innerHTML = '';

  function addLine() {
    if (li >= lines.length) return;
    const div = document.createElement('div');
    div.innerHTML = lines[li] + (li === lines.length - 1 ? '<span class="c-cursor c-va">▍</span>' : '');
    pre.appendChild(div);
    li++;
    // blink cursor removal on previous line
    const cursors = pre.querySelectorAll('.c-cursor');
    if (cursors.length > 1) cursors[0].remove();
    setTimeout(addLine, 120);
  }

  // Start when visible
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { addLine(); obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(pre);
})();

/* ═══════════════════════════════
   4. TERMINAL — ABOUT SECTION
═══════════════════════════════ */
(function () {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  const steps = [
    { delay: 0,    html: '<span class="t-prompt">❯</span> <span class="t-cmd">whoami</span>' },
    { delay: 600,  html: '<span class="t-out">erika_anays_morales · sistemas · siguemed</span>' },
    { delay: 1200, html: '' },
    { delay: 1400, html: '<span class="t-prompt">❯</span> <span class="t-cmd">cat skills.txt</span>' },
    { delay: 2000, html: '<span class="t-out">→ Odoo Enterprise 19 (Studio, Python ORM, XML)</span>' },
    { delay: 2300, html: '<span class="t-out">→ React · JavaScript · HTML/CSS</span>' },
    { delay: 2600, html: '<span class="t-out">→ PostgreSQL · MySQL · MongoDB</span>' },
    { delay: 2900, html: '<span class="t-out">→ Git · GitHub · REST APIs</span>' },
    { delay: 3600, html: '' },
    { delay: 5600, html: '<span class="t-prompt">❯</span> <span class="t-cmd">echo $STATUS</span>' },
    { delay: 6200, html: '<span class="t-ok">✓ disponible para proyectos y colaboraciones</span>' },
    { delay: 6700, html: '<span class="t-prompt">❯</span> <span class="t-cursor">▍</span>' },
  ];

  let started = false;

  function run() {
    if (started) return;
    started = true;
    steps.forEach(({ delay, html }) => {
      setTimeout(() => {
        if (!html) { body.appendChild(document.createElement('br')); return; }
        const div = document.createElement('div');
        div.innerHTML = html;
        // Remove old blinking cursor
        body.querySelectorAll('.t-cursor').forEach(c => c.parentElement.remove());
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
      }, delay);
    });
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { run(); obs.disconnect(); }
  }, { threshold: 0.3 });
  obs.observe(body);
})();

/* ═══════════════════════════════
   5. CONTADORES HERO
═══════════════════════════════ */
(function () {
  const nums = document.querySelectorAll('.hc-n');
  if (!nums.length) return;

  function animCount(el) {
    const target = parseInt(el.dataset.to, 10);
    let current = 0;
    const step  = Math.max(1, Math.floor(target / 30));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 50);
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      nums.forEach(animCount);
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  if (nums[0]) obs.observe(nums[0].closest('.hero-counters') || nums[0]);
})();

/* ═══════════════════════════════
   6. SKILL BARS ANIMADAS
═══════════════════════════════ */
(function () {
  const bars = document.querySelectorAll('.sk-bar');
  if (!bars.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(b => { b.style.width = '0%'; obs.observe(b); });
})();

/* ═══════════════════════════════
   7. REVEAL ON SCROLL
═══════════════════════════════ */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.style.getPropertyValue('--d')) || (i * 60);
        setTimeout(() => e.target.classList.add('in'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
})();

/* ═══════════════════════════════
   8. NAV — scrolled + active link
═══════════════════════════════ */
(function () {
  const nav    = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-a');
  const secs   = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled state
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // Active link
    let current = '';
    secs.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      const href = a.getAttribute('href').replace('#', '');
      a.classList.toggle('active', href === current);
    });
  });
})();

/* ═══════════════════════════════
   9. HAMBURGER MENU
═══════════════════════════════ */
(function () {
  const btn    = document.getElementById('hamburger');
  const mobile = document.getElementById('navMobile');
  if (!btn || !mobile) return;

  btn.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobile.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();

/* ═══════════════════════════════
   10. FILTRO DE PROYECTOS
═══════════════════════════════ */
(function () {
  const btns  = document.querySelectorAll('.pf-btn');
  const cards = document.querySelectorAll('.p-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.f;

      cards.forEach(card => {
        const match = f === 'all' || card.dataset.cat === f;
        card.style.transition = 'opacity .3s, transform .3s';
        if (match) {
          card.classList.remove('hidden');
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => card.classList.add('hidden'), 300);
        }
      });
    });
  });
})();

/* ═══════════════════════════════
   11. FORM — feedback visual
═══════════════════════════════ */
(function () {
  const btn = document.getElementById('fSend');
  const txt = document.getElementById('fTxt');
  if (!btn || !txt) return;

  btn.addEventListener('click', () => {
    txt.textContent = '✓ ¡Mensaje enviado!';
    btn.style.background = 'linear-gradient(135deg,#16a34a,#15803d)';
    btn.disabled = true;
    setTimeout(() => {
      txt.textContent = 'Enviar mensaje';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
})();

/* ═══════════════════════════════
   12. SMOOTH ANCHOR SCROLL
═══════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});