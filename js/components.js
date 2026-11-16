import { MENU } from './menu-data.js';

const botaoMenu = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-site-menu]');
const atrasosAbertura = new WeakMap();
const atrasosFechamento = new WeakMap();
const header = document.querySelector('.site-header');
let bodyOverflowAntes = '';

function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

function limparAtraso(mapa, item) {
  const atraso = mapa.get(item);
  if (atraso) window.clearTimeout(atraso);
  mapa.delete(item);
}

function obterBotao(item) {
  return item.querySelector('.menu-dropdown__toggle');
}

function obterPainel(item) {
  return item.querySelector('.menu-panel');
}

function posicionarPainel(item) {
  if (matchMedia('(max-width: 899px)').matches) return;
  const painel = obterPainel(item);
  const limites = item.getBoundingClientRect();
  const megaMenu = item.classList.contains('menu-item--religioes');
  const largura = Math.min(megaMenu ? 896 : 288, window.innerWidth - 32);
  const esquerda = megaMenu
    ? (window.innerWidth - largura) / 2
    : Math.max(16, Math.min(limites.left, window.innerWidth - largura - 16));
  painel.style.left = `${esquerda - limites.left}px`;
}

function fecharItem(item, devolverFoco = false) {
  limparAtraso(atrasosAbertura, item);
  limparAtraso(atrasosFechamento, item);
  item.classList.remove('is-open');
  item.removeAttribute('data-pinned');
  obterBotao(item).setAttribute('aria-expanded', 'false');
  obterPainel(item).hidden = true;
  if (devolverFoco) obterBotao(item).focus();
}

function fecharSubmenus(devolverFoco = false) {
  const abertos = [...document.querySelectorAll('.menu-item.is-open')];
  abertos.forEach((item, index) => fecharItem(item, devolverFoco && index === 0));
}

function abrirItem(item, fixar = false) {
  document.querySelectorAll('.menu-item.is-open').forEach((outro) => {
    if (outro !== item) fecharItem(outro);
  });
  limparAtraso(atrasosAbertura, item);
  limparAtraso(atrasosFechamento, item);
  item.classList.add('is-open');
  if (fixar) item.dataset.pinned = 'true';
  obterBotao(item).setAttribute('aria-expanded', 'true');
  obterPainel(item).hidden = false;
  posicionarPainel(item);
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
  const paginaAtual = location.pathname.split('/').pop() || 'index.html';
  if ((link.pathname.split('/').pop() || 'index.html') === paginaAtual) link.setAttribute('aria-current', 'page');
  return link;
}

function navegarItensMenu(evento, raiz) {
  if (!['ArrowDown', 'ArrowUp'].includes(evento.key)) return;
  const itens = [...raiz.querySelectorAll('a, button')].filter((item) => (
    !item.closest('[hidden]') && item.getClientRects().length > 0
  ));
  const atual = itens.indexOf(evento.target.closest('a, button'));
  if (atual < 0 || !itens.length) return;
  evento.preventDefault();
  const passo = evento.key === 'ArrowDown' ? 1 : -1;
  itens[(atual + passo + itens.length) % itens.length].focus();
}

function renderizarItem(item, indice) {
  if (!item.grupos) return criarLink(item);

  const nome = item.rotulo === 'Religiões' ? 'religioes' : 'dados';
  const raiz = criar('div', `menu-item menu-dropdown menu-item--${nome}`);
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
    const titulo = criar('h2', '', grupo.titulo);
    const lista = criar('div', 'menu-column__items');
    grupo.itens.forEach((subitem) => lista.append(criarLink(subitem)));
    coluna.append(titulo, lista);
    painel.append(coluna);
  });

  raiz.append(botao, painel);
  botao.addEventListener('click', () => {
    if (raiz.classList.contains('is-open')) fecharItem(raiz);
    else abrirItem(raiz, true);
  });
  raiz.addEventListener('mouseenter', () => {
    if (!matchMedia('(pointer: fine)').matches || raiz.hasAttribute('data-pinned')) return;
    limparAtraso(atrasosFechamento, raiz);
    limparAtraso(atrasosAbertura, raiz);
    atrasosAbertura.set(raiz, window.setTimeout(() => abrirItem(raiz), 80));
  });
  raiz.addEventListener('mouseleave', () => {
    if (!matchMedia('(pointer: fine)').matches || raiz.hasAttribute('data-pinned')) return;
    limparAtraso(atrasosAbertura, raiz);
    limparAtraso(atrasosFechamento, raiz);
    atrasosFechamento.set(raiz, window.setTimeout(() => {
      if (!raiz.matches(':hover') && !raiz.contains(document.activeElement)) fecharItem(raiz);
    }, 250));
  });
  raiz.addEventListener('focusout', () => {
    window.setTimeout(() => {
      if (!raiz.contains(document.activeElement) && !raiz.matches(':hover')) fecharItem(raiz);
    }, 0);
  });
  raiz.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
      evento.preventDefault();
      evento.stopPropagation();
      if (menu.classList.contains('is-open') && matchMedia('(max-width: 899px)').matches) {
        fecharTudo(true);
        return;
      }
      fecharItem(raiz, true);
      return;
    }
    navegarItensMenu(evento, raiz);
  });
  return raiz;
}

function fecharTudo(devolverFoco = false) {
  fecharSubmenus();
  menu.classList.remove('is-open');
  botaoMenu.setAttribute('aria-expanded', 'false');
  botaoMenu.setAttribute('aria-label', 'Abrir menu');
  document.body.style.overflow = bodyOverflowAntes;
  if (devolverFoco) botaoMenu.focus();
}

if (menu && botaoMenu) {
  const nav = document.createDocumentFragment();
  MENU.forEach((item, indice) => nav.append(renderizarItem(item, indice)));
  menu.replaceChildren(nav);

  const aparencia = criar('section', 'menu-appearance');
  aparencia.setAttribute('aria-label', 'Aparência');
  aparencia.append(criar('h2', '', 'Aparência'));
  const opcoes = criar('div', 'menu-appearance__options');
  [
    ['claro', 'Claro'],
    ['escuro', 'Escuro'],
    ['auto', 'Automático']
  ].forEach(([valor, rotulo]) => {
    const opcao = criar('button', '', rotulo);
    opcao.type = 'button';
    opcao.dataset.themeOption = valor;
    opcoes.append(opcao);
  });
  aparencia.append(opcoes);
  menu.append(aparencia);

  const alternador = criar('button', 'theme-toggle');
  alternador.type = 'button';
  alternador.dataset.themeToggle = '';
  alternador.setAttribute('aria-label', 'Tema atual: Claro. Alterar para Escuro.');
  alternador.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"></svg>';
  menu.parentElement.insertBefore(alternador, menu);

  botaoMenu.addEventListener('click', () => {
    const aberto = botaoMenu.getAttribute('aria-expanded') !== 'true';
    if (aberto) {
      bodyOverflowAntes = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      botaoMenu.setAttribute('aria-expanded', 'true');
      botaoMenu.setAttribute('aria-label', 'Fechar menu');
      menu.classList.add('is-open');
      menu.querySelector('a, button')?.focus();
    } else {
      fecharTudo(true);
    }
  });
  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) fecharTudo();
  });
  document.addEventListener('click', (evento) => {
    if (!evento.target.closest('.site-header')) fecharTudo();
  });
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Tab' && menu.classList.contains('is-open') && matchMedia('(max-width: 899px)').matches) {
      const focaveis = [...menu.querySelectorAll('a, button')].filter((item) => (
        !item.closest('[hidden]') && item.getClientRects().length > 0
      ));
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (evento.shiftKey && (document.activeElement === primeiro || !menu.contains(document.activeElement))) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && (document.activeElement === ultimo || !menu.contains(document.activeElement))) {
        evento.preventDefault();
        primeiro.focus();
      }
      return;
    }
    if (evento.key !== 'Escape') return;
    if (menu.classList.contains('is-open') && matchMedia('(max-width: 899px)').matches) {
      fecharTudo(true);
      return;
    }
    const itemAberto = document.querySelector('.menu-item.is-open');
    if (itemAberto) {
      fecharItem(itemAberto, true);
    } else if (menu.classList.contains('is-open')) {
      fecharTudo(true);
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 899 && menu.classList.contains('is-open')) fecharTudo();
    document.querySelectorAll('.menu-item.is-open').forEach(posicionarPainel);
  });
}

if (header) {
  const atualizarAlturas = () => {
    const alturaHeader = header.getBoundingClientRect().height;
    const alturaNavegacao = document.querySelector('.section-nav')?.getBoundingClientRect().height ?? 0;
    document.documentElement.style.setProperty('--header-h', `${alturaHeader}px`);
    document.documentElement.style.setProperty('--header-height', `${alturaHeader}px`);
    document.documentElement.style.setProperty('--section-nav-h', `${alturaNavegacao}px`);
  };
  atualizarAlturas();
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(atualizarAlturas);
    observer.observe(header);
    const sectionNav = document.querySelector('.section-nav');
    if (sectionNav) observer.observe(sectionNav);
  } else {
    window.addEventListener('resize', atualizarAlturas);
  }
}
