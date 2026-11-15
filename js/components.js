const botaoMenu = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-site-menu]');

if (botaoMenu && menu) {
  const paginaAtual = location.pathname.split('/').pop() || 'index.html';
  menu.querySelectorAll('a[href]').forEach((link) => {
    if (link.getAttribute('href') === paginaAtual) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  botaoMenu.addEventListener('click', () => {
    const aberto = botaoMenu.getAttribute('aria-expanded') !== 'true';
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    menu.classList.toggle('is-open', aberto);
    botaoMenu.querySelector('.sr-only').textContent = aberto ? 'Fechar menu' : 'Abrir menu';
  });

  menu.addEventListener('click', (evento) => {
    if (!evento.target.closest('a')) return;
    botaoMenu.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    botaoMenu.querySelector('.sr-only').textContent = 'Abrir menu';
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Escape') return;
    botaoMenu.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    botaoMenu.querySelector('.sr-only').textContent = 'Abrir menu';
    botaoMenu.focus();
  });
}
