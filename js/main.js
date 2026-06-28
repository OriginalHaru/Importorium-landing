const navbar = document.getElementById('navbar');

const handleScroll = () => {
  if (window.scrollY > 20) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
};

window.addEventListener('scroll', handleScroll, { passive: true });

const hamburger = document.querySelector('.navbar__hamburger');
const navLinks = document.querySelector('.navbar__nav');

hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isOpen);
  navLinks.classList.toggle('navbar__nav--open');
  hamburger.classList.toggle('navbar__hamburger--open');
});

document.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('navbar__nav--open');
    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.classList.remove('navbar__hamburger--open');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  });
});

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
  observer.observe(el);
});
