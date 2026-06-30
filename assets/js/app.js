document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({ duration: 650, once: true, offset: 80 });
  }

  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  const menu = document.getElementById('menu');
  const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menu && menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  const sections = [...document.querySelectorAll('main section[id], body > header[id]')];
  const onScroll = () => {
    const y = window.scrollY + 120;
    let active = 'inicio';
    document.querySelectorAll('section[id]').forEach(section => {
      if (y >= section.offsetTop) active = section.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${active}`);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const form = document.getElementById('whatsappForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const nome = document.getElementById('nome')?.value?.trim() || '';
      const cidade = document.getElementById('cidade')?.value?.trim() || '';
      const servico = document.getElementById('servico')?.value?.trim() || '';
      const texto = `Olá, vim pelo site Quintal Vivo GO.

Nome: ${nome}
Cidade/Bairro: ${cidade}
Serviço: ${servico}

Gostaria de solicitar um orçamento.`;
      window.location.href = `https://wa.me/5564999075881?text=${encodeURIComponent(texto)}`;
    });
  }
});
