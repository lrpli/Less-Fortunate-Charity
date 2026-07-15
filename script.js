// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  const setNav = (open) => {
    navLinks.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  };
  navToggle.addEventListener('click', () => {
    setNav(!navLinks.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      setNav(false);
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      setNav(false);
      navToggle.focus();
    }
  });
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Without IntersectionObserver the .fade-in base rule would leave content stuck at opacity 0.
  if (reduced || !('IntersectionObserver' in window)) {
    fadeEls.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => {
        if (el.isIntersecting) {
          el.target.classList.add('visible');
          observer.unobserve(el.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
  }
}

// Donation amount buttons
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmount = document.getElementById('customAmount');
amountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    amountBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (customAmount) customAmount.value = btn.dataset.amount || '';
  });
});

// Forms
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Sent!'; btn.disabled = true; }
    setTimeout(() => { if (btn) { btn.textContent = orig; btn.disabled = false; } form.reset(); }, 2800);
  });
});
