const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('nav-open');
    navToggle.textContent = siteNav.classList.contains('nav-open') ? '✕' : '☰';
  });
}

const links = document.querySelectorAll('.site-nav a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (siteNav.classList.contains('nav-open')) {
        siteNav.classList.remove('nav-open');
        navToggle.textContent = '☰';
      }
    }
  });
});
