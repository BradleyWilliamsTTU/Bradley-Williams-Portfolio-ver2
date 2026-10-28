// AI USED HERE CLAUDE
// Shared behaviour for every page: mobile menu, navbar shadow, fade-in sections.

// ── BURGER MENU ──
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

function closeMenu() {
  navLinks.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Open navigation menu');
}

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  burger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// ── NAVBAR SCROLL SHADOW ──
const navbar = document.querySelector('.navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── FADE-IN SECTIONS ──
// Content is visible by default; it is only hidden for the fade once this runs.
const revealables = document.querySelectorAll('.section, .entry');
const reveal = el => el.classList.add('visible');

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('reveal-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        reveal(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px -40px 0px' });
  revealables.forEach(s => observer.observe(s));

  // Jumping to a link (e.g. #about or #photo-18) shows the target straight away
  const revealHash = () => {
    const target = location.hash && document.querySelector(location.hash);
    if (target) reveal(target.closest('.section, .entry') || target);
  };
  window.addEventListener('hashchange', revealHash);
  revealHash();
}
