document.addEventListener('DOMContentLoaded', () => {
  console.log('Projeto Quintal Vivo GO iniciado.');

  if (window.AOS) {
    AOS.init({
      duration: 850,
      once: true,
      offset: 80
    });
  }

  const anoAtual = document.querySelector('#anoAtual');
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  const menu = document.querySelector('#menu');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (!menu || !menu.classList.contains('show') || !window.bootstrap) return;
      const collapse = bootstrap.Collapse.getOrCreateInstance(menu);
      collapse.hide();
    });
  });

  const sections = document.querySelectorAll('header[id], section[id]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
  }
});
