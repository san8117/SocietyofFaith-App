import { MENU } from './menu-data.js';

const botaoMenu = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-site-menu]');

function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

function criarLink(item) {
  if (item.breve) {
    const breve = criar('span', 'menu-coming-soon');
    breve.setAttribute('aria-disabled', 'true');
    breve.append(document.createTextNode(item.rotulo));
    breve.append(criar('small', '', 'em breve'));
    return breve;
  }
  const link = criar('a', 'menu-link', item.rotulo);
  link.href = item.href;
  if (link.pathname.split('/').pop() === location.pathname.split('/').pop()) link.setAttribute('aria-current', 'page');
  return link;
}

function renderizarItem(item, indice) {
  if (!item.grupos) return criarLink(item);

  const raiz = criar('div', `menu-dropdown menu-dropdown--${item.rotulo.toLowerCase()}`);
  const botao = criar('button', 'menu-dropdown__toggle', item.rotulo);
  const panelId = `menu-panel-${indice}`;
  botao.type = 'button';
  botao.setAttribute('aria-expanded', 'false');
  botao.setAttribute('aria-controls', panelId);
  botao.append(criar('span', 'menu-caret', '▾'));
  const painel = criar('div', 'menu-panel');
  painel.id = panelId;
  painel.hidden = true;

  if (item.rotulo === 'Religiões') {
    const todas = criarLink({ rotulo: 'Ver todas as religiões', href: 'religioes.html' });
    todas.classList.add('menu-all-link');
    painel.append(todas);
  }

  item.grupos.forEach((grupo) => {
    const coluna = criar('section', 'menu-column');
    const titulo = criar('h2');
    const toggleGrupo = criar('button', 'menu-column__toggle', grupo.titulo);
    const inicialmenteExpandido = matchMedia('(min-width: 900px)').matches;
    if (inicialmenteExpandido) coluna.classList.add('is-expanded');
    toggleGrupo.type = 'button';
    toggleGrupo.setAttribute('aria-expanded', String(inicialmenteExpandido));
    toggleGrupo.addEventListener('click', () => {
      const expandido = coluna.classList.toggle('is-expanded');
      toggleGrupo.setAttribute('aria-expanded', String(expandido));
    });
    titulo.append(toggleGrupo);
    const lista = criar('div', 'menu-column__items');
    grupo.itens.forEach((subitem) => lista.append(criarLink(subitem)));
    coluna.append(titulo, lista);
    painel.append(coluna);
  });
  raiz.append(botao, painel);
  botao.addEventListener('click', () => alternarDropdown(raiz, !raiz.classList.contains('is-open')));
  raiz.addEventListener('mouseenter', () => {
    if (matchMedia('(min-width: 900px)').matches) alternarDropdown(raiz, true);
  });
  raiz.addEventListener('mouseleave', () => {
    if (matchMedia('(min-width: 900px)').matches) alternarDropdown(raiz, false);
  });
  raiz.addEventListener('keydown', (evento) => navegarItensMenu(evento, raiz));
  return raiz;
}

function alternarDropdown(raiz, aberto) {
  if (aberto) document.querySelectorAll('.menu-dropdown.is-open').forEach((outro) => {
    if (outro === raiz) return;
    outro.classList.remove('is-open');
    outro.querySelector('.menu-dropdown__toggle').setAttribute('aria-expanded', 'false');
    outro.querySelector('.menu-panel').hidden = true;
    outro.querySelectorAll('.menu-column').forEach((grupo) => {
      grupo.classList.remove('is-expanded');
      grupo.querySelector('.menu-column__toggle')?.setAttribute('aria-expanded', 'false');
    });
  });
  const botao = raiz.querySelector('.menu-dropdown__toggle');
  const painel = raiz.querySelector('.menu-panel');
  raiz.classList.toggle('is-open', aberto);
  botao.setAttribute('aria-expanded', String(aberto));
  painel.hidden = !aberto;
  if (aberto && matchMedia('(min-width: 900px)').matches) {
    raiz.querySelectorAll('.menu-column').forEach((grupo) => {
      grupo.classList.add('is-expanded');
      grupo.querySelector('.menu-column__toggle')?.setAttribute('aria-expanded', 'true');
    });
  }
  if (!aberto) raiz.querySelectorAll('.menu-column').forEach((grupo) => {
    grupo.classList.remove('is-expanded');
    grupo.querySelector('.menu-column__toggle')?.setAttribute('aria-expanded', 'false');
  });
}

function navegarItensMenu(evento, raiz) {
  const itens = [...raiz.querySelectorAll('a, button')].filter((item) => (
    !item.closest('[hidden]') && item.getClientRects().length > 0
  ));
  const atual = itens.indexOf(evento.target.closest('a, button'));
  let proximo = null;
  if (evento.key === 'ArrowDown') proximo = (atual + 1) % itens.length;
  if (evento.key === 'ArrowUp') proximo = (atual - 1 + itens.length) % itens.length;
  if (proximo !== null) {
    evento.preventDefault();
    itens[proximo]?.focus();
  }
}

function fecharTudo(devolverFoco = false) {
  document.querySelectorAll('.menu-dropdown.is-open').forEach((raiz) => alternarDropdown(raiz, false));
  menu.classList.remove('is-open');
  botaoMenu.setAttribute('aria-expanded', 'false');
  botaoMenu.querySelector('.sr-only').textContent = 'Abrir menu';
  if (devolverFoco) botaoMenu.focus();
}

if (menu && botaoMenu) {
  const nav = document.createDocumentFragment();
  MENU.forEach((item, indice) => nav.append(renderizarItem(item, indice)));
  menu.replaceChildren(nav);

  botaoMenu.addEventListener('click', () => {
    const aberto = botaoMenu.getAttribute('aria-expanded') !== 'true';
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.querySelector('.sr-only').textContent = aberto ? 'Fechar menu' : 'Abrir menu';
    menu.classList.toggle('is-open', aberto);
    if (aberto) menu.querySelector('a, button')?.focus();
  });
  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) fecharTudo();
  });
  document.addEventListener('click', (evento) => {
    if (!evento.target.closest('.site-header')) fecharTudo();
  });
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') fecharTudo(true);
  });
}
