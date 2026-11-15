// Modelo da página: a seção “Religião e sociedade” é obrigatória em novas páginas.
import { SOCIEDADE } from './dados-sociedade.js';
import { COMPARATIVO, GRUPOS } from './dados-ibge.js';
import { SERIE } from './dados-censos.js';
import { IMAGENS_RELIGIOES } from './imagens-religioes.js';
import { aplicarTema, formatarPercentual, gerarTabela, opcoesBase, observarGraficos } from './charts-core.js';
import { montarImagens } from './imagens.js';

const slug = document.body.dataset.religion;
const graficos = new Map();
const grupo = GRUPOS.find((item) => item.id === ({
  catolicismo: 'catolica',
  evangelicos: 'evangelicas',
  espiritismo: 'espirita'
}[slug]));
const campoSerie = ({ catolicismo: 'catolica', evangelicos: 'evangelicas', espiritismo: 'espirita' })[slug];
const campoGrupo = ({ catolicismo: 'catolica', evangelicos: 'evangelicas', espiritismo: 'espirita' })[slug];
const observadorTema = matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const iconesSociedade = {
  educacao: '<path d="M3 5.5c4-1.5 7-.5 9 1.5v13c-2-2-5-3-9-1.5zM21 5.5c-4-1.5-7-.5-9 1.5v13c2-2 5-3 9-1.5z"/><path d="M6 9h3M6 12h3M15 9h3M15 12h3"/>',
  assistencia: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M2.5 14.5h3l2 3 2-5 2 3h3M16 15h5.5"/>',
  cultura: '<path d="M4 20V9l8-5 8 5v11"/><path d="M8 20v-6h8v6M3 9l9 5 9-5M12 4v10"/>',
  politica: '<path d="M12 3v18M5 6h14M7 6l-4 8h8L7 6zm10 0-4 8h8l-4-8zM7 21h10"/>',
  familia: '<path d="m3 11 9-7 9 7v9H3z"/><path d="M9 20v-6h6v6M7 11h.01M17 11h.01"/>',
  convivencia: '<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/><path d="M12 6.8a6 6 0 0 1 0 10.4"/>'
};

function gerarTabelas() {
  gerarTabela(
    document.querySelector('[data-table="history"]'),
    `Série censitária disponível para ${grupo.nome}`,
    ['Ano', 'Percentual', 'Base informada'],
    SERIE.map((item) => [
      String(item.ano),
      item[campoSerie] === null ? '—' : formatarPercentual(item[campoSerie]),
      item.base
    ])
  );
  const indice = GRUPOS.findIndex((item) => item.id === grupo.id);
  gerarTabela(
    document.querySelector('[data-table="comparison"]'),
    `Percentual de pessoas de 10 anos ou mais: ${grupo.nome}`,
    ['Ano', 'Percentual'],
    [2010, 2022].map((ano) => [String(ano), formatarPercentual(COMPARATIVO[ano][indice])])
  );
}

function criarGrafico(tipo) {
  if (!window.Chart || graficos.has(tipo)) return;
  const canvas = document.querySelector(`[data-religion-chart="${tipo}"]`);
  if (!canvas) return;
  let labels;
  let valores;
  let datasets;
  if (tipo === 'history') {
    datasets = [{
      label: `${grupo.nome} (%)`,
      data: SERIE.map((item) => ({ x: item.ano, y: item[campoSerie] })),
      borderColor: getComputedStyle(document.documentElement).getPropertyValue(grupo.cssVar).trim(),
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(grupo.cssVar).trim(),
      tension: 0.25,
      spanGaps: false
    }];
  } else {
    const indice = GRUPOS.findIndex((item) => item.id === campoGrupo);
    labels = ['2010', '2022'];
    valores = [COMPARATIVO[2010][indice], COMPARATIVO[2022][indice]];
    datasets = [{
      label: `${grupo.nome} (%)`,
      data: valores,
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(grupo.cssVar).trim(),
      borderColor: getComputedStyle(document.documentElement).getPropertyValue(grupo.cssVar).trim()
    }];
  }
  const options = opcoesBase();
  options.plugins.legend.display = true;
  options.scales.y.beginAtZero = true;
  options.scales.y.ticks.callback = (valor) => `${valor}%`;
  if (tipo === 'history') {
    options.scales.x.type = 'linear';
    options.scales.x.min = SERIE[0].ano;
    options.scales.x.max = SERIE[SERIE.length - 1].ano;
    options.scales.x.ticks.callback = (valor) => String(valor);
  }
  options.plugins.tooltip.callbacks = {
    label: (context) => `${context.dataset.label}: ${formatarPercentual(context.parsed.y)}`
  };
  graficos.set(tipo, new window.Chart(canvas, {
    type: tipo === 'history' ? 'line' : 'bar',
    data: { labels: labels ?? [], datasets },
    options
  }));
}

function configurarAbas() {
  const tabs = [...document.querySelectorAll('.article-tabs [role="tab"]')];
  const ativar = (tab) => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
  };
  tabs.forEach((tab) => {
    const selecionado = tab.getAttribute('aria-selected') === 'true';
    const painel = document.getElementById(tab.getAttribute('aria-controls'));
    painel.hidden = !selecionado;
  });
  tabs.forEach((tab, indice) => {
    tab.addEventListener('click', () => ativar(tab));
    tab.addEventListener('keydown', (evento) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(evento.key)) return;
      evento.preventDefault();
      const proximo = evento.key === 'Home' ? 0
        : evento.key === 'End' ? tabs.length - 1
          : (indice + (evento.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[proximo].focus();
      ativar(tabs[proximo]);
    });
  });
  const ativarPerfilPeloHash = () => {
    if (location.hash !== '#censos') return;
    const tab = tabs.find((item) => item.getAttribute('aria-controls') === 'censos');
    if (!tab) return;
    ativar(tab);
    requestAnimationFrame(() => {
      const painel = document.getElementById('censos');
      painel.focus({ preventScroll: true });
      painel.scrollIntoView({ block: 'start' });
    });
  };
  const linkPerfil = tabs.find((item) => item.getAttribute('aria-controls') === 'censos');
  document.querySelectorAll('a[href="#censos"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (linkPerfil) ativar(linkPerfil);
    });
  });
  window.addEventListener('hashchange', ativarPerfilPeloHash);
  ativarPerfilPeloHash();
}

function criarIcone(nome) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.innerHTML = iconesSociedade[nome];
  return svg;
}

// Monta um painel interativo usando os dados e preserva o texto estático como fallback.
function montarPainelSociedade(area) {
  const painel = document.createElement('article');
  painel.className = 'society-panel';
  painel.id = 'society-panel';
  painel.setAttribute('role', 'tabpanel');
  painel.setAttribute('tabindex', '0');
  painel.setAttribute('aria-live', 'polite');
  painel.setAttribute('aria-labelledby', `society-tab-${area.id}`);

  const titulo = document.createElement('h3');
  titulo.textContent = area.titulo;
  const resumo = document.createElement('p');
  resumo.className = 'society-panel__summary';
  resumo.textContent = area.resumo;
  const exemplosTitle = document.createElement('h4');
  exemplosTitle.textContent = 'Exemplos';
  const exemplos = document.createElement('div');
  exemplos.className = 'society-examples';
  const emDesenvolvimento = new URLSearchParams(location.search).get('dev') === '1';

  area.exemplos.forEach((exemplo) => {
    const card = document.createElement('div');
    card.className = 'society-example';
    const bolinha = document.createElement('span');
    bolinha.className = 'society-example__dot';
    bolinha.setAttribute('aria-hidden', 'true');
    const texto = document.createElement('p');
    const nome = document.createElement('strong');
    nome.textContent = `${exemplo.titulo}: `;
    texto.append(nome, document.createTextNode(exemplo.texto));
    card.append(bolinha, texto);
    if (exemplo.conferir && emDesenvolvimento) {
      const selo = document.createElement('small');
      selo.className = 'society-review-badge';
      selo.textContent = 'a conferir';
      card.append(selo);
    }
    exemplos.append(card);
  });

  const olharesTitle = document.createElement('h4');
  olharesTitle.textContent = 'Dois olhares';
  const olhares = document.createElement('div');
  olhares.className = 'society-viewpoints';
  ['Um olhar', 'Outro olhar'].forEach((label, indice) => {
    const item = document.createElement('div');
    item.className = 'society-viewpoint';
    const subtitulo = document.createElement('h5');
    subtitulo.textContent = label;
    const texto = document.createElement('p');
    texto.textContent = area.olhares[indice];
    item.append(subtitulo, texto);
    olhares.append(item);
  });
  const refletir = document.createElement('blockquote');
  refletir.className = 'society-reflection';
  refletir.textContent = area.refletir;
  const fonte = document.createElement('p');
  fonte.className = 'society-source';
  fonte.textContent = `Fonte: ${area.fonte}`;
  painel.append(titulo, resumo, exemplosTitle, exemplos, olharesTitle, olhares, refletir, fonte);
  return painel;
}

// Desenha as ligações SVG que conectam o centro aos tópicos selecionáveis.
function desenharRadial(navegacao, areas) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('society-radial-lines');
  svg.setAttribute('viewBox', '0 0 800 520');
  svg.setAttribute('aria-hidden', 'true');
  const centro = { x: 400, y: 260 };
  const pontos = [
    { x: 400, y: 57 }, { x: 646, y: 158 }, { x: 646, y: 362 },
    { x: 400, y: 463 }, { x: 154, y: 362 }, { x: 154, y: 158 }
  ];
  pontos.slice(0, areas.length).forEach((ponto, indice) => {
    const caminho = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    caminho.dataset.lineFor = areas[indice].id;
    caminho.setAttribute('d', `M ${centro.x} ${centro.y} Q ${(centro.x + ponto.x) / 2 + (ponto.y - centro.y) * 0.12} ${(centro.y + ponto.y) / 2 - (ponto.x - centro.x) * 0.12} ${ponto.x} ${ponto.y}`);
    svg.append(caminho);
  });
  const nome = ({ catolicismo: 'Catolicismo', evangelicos: 'Evangélicos', espiritismo: 'Espiritismo' })[slug];
  const centroLabel = document.createElement('span');
  centroLabel.className = 'society-center';
  centroLabel.textContent = nome;
  centroLabel.setAttribute('aria-hidden', 'true');
  navegacao.prepend(svg, centroLabel);
  return svg;
}

// Sincroniza o estado acessível dos tópicos e a indicação visual de progresso.
function atualizarProgresso(navegacao, selecionado, animar) {
  navegacao.querySelectorAll('[role="tab"]').forEach((tab, indice) => {
    const ativo = indice === selecionado;
    tab.setAttribute('aria-selected', String(ativo));
    tab.tabIndex = ativo ? 0 : -1;
    tab.classList.toggle('is-active', ativo);
    tab.style.setProperty('--society-progress-duration', animar ? '16s' : '0s');
  });
  navegacao.querySelectorAll('.society-radial-lines path').forEach((path, indice) => {
    path.classList.toggle('is-active', indice === selecionado);
  });
}

// Troca o tópico ativo, atualiza o painel e agenda o avanço automático opcional.
function trocarArea(indice, navegacao, painelContainer, areas, autoplayState) {
  const selecionado = (indice + areas.length) % areas.length;
  const area = areas[selecionado];
  const tabs = [...navegacao.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab, index) => {
    tab.setAttribute('aria-controls', 'society-panel');
    tab.classList.toggle('is-active', index === selecionado);
  });
  atualizarProgresso(navegacao, selecionado, autoplayState.active && !reducedMotion.matches);
  painelContainer.replaceChildren(montarPainelSociedade(area));
  if (autoplayState.active && !reducedMotion.matches) {
    window.clearTimeout(autoplayState.timer);
    autoplayState.timer = window.setTimeout(() => {
      trocarArea(selecionado + 1, navegacao, painelContainer, areas, autoplayState);
    }, 16000);
  }
}

// Transforma os artigos HTML acessíveis em uma navegação radial ou em chips.
function montarSociedade() {
  const secao = document.querySelector('[data-society]');
  const dados = SOCIEDADE[slug];
  if (!secao || !dados) return;
  const navegacao = secao.querySelector('[data-society-tabs]');
  const painelContainer = secao.querySelector('[data-society-panels]');
  const grupo = GRUPOS.find((item) => item.id === ({ catolicismo: 'catolica', evangelicos: 'evangelicas', espiritismo: 'espirita' })[slug]);
  secao.closest('.religion-society').style.setProperty(
    '--society-color',
    getComputedStyle(document.documentElement).getPropertyValue(grupo.cssVar).trim()
  );
  navegacao.setAttribute('role', 'tablist');
  navegacao.setAttribute('aria-label', 'Áreas de religião e sociedade');
  const svg = desenharRadial(navegacao, dados.areas);
  dados.areas.forEach((area, indice) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.id = `society-tab-${area.id}`;
    botao.className = 'society-tab';
    botao.dataset.index = String(indice);
    botao.setAttribute('role', 'tab');
    botao.setAttribute('aria-selected', 'false');
    botao.setAttribute('aria-controls', 'society-panel');
    botao.tabIndex = -1;
    botao.append(criarIcone(area.icone), document.createTextNode(area.titulo));
    const progresso = document.createElement('span');
    progresso.className = 'society-tab__progress';
    progresso.setAttribute('aria-hidden', 'true');
    botao.append(progresso);
    navegacao.append(botao);
  });

  const autoplayState = { active: !reducedMotion.matches, timer: 0 };
  trocarArea(0, navegacao, painelContainer, dados.areas, autoplayState);
  const pararAvanco = () => {
    if (!autoplayState.active) return;
    autoplayState.active = false;
    window.clearTimeout(autoplayState.timer);
    navegacao.classList.add('is-autoplay-paused');
  };
  navegacao.addEventListener('pointerenter', pararAvanco, { once: true });
  navegacao.addEventListener('focusin', pararAvanco, { once: true });
  navegacao.addEventListener('click', (evento) => {
    const tab = evento.target.closest('[role="tab"]');
    if (!tab) return;
    pararAvanco();
    trocarArea(Number(tab.dataset.index), navegacao, painelContainer, dados.areas, autoplayState);
    tab.focus();
  });
  navegacao.addEventListener('keydown', (evento) => {
    const tab = evento.target.closest('[role="tab"]');
    if (!tab) return;
    let proximo = null;
    if (['ArrowRight', 'ArrowDown'].includes(evento.key)) proximo = Number(tab.dataset.index) + 1;
    if (['ArrowLeft', 'ArrowUp'].includes(evento.key)) proximo = Number(tab.dataset.index) - 1;
    if (evento.key === 'Home') proximo = 0;
    if (evento.key === 'End') proximo = dados.areas.length - 1;
    if (proximo === null) return;
    evento.preventDefault();
    pararAvanco();
    const destino = (proximo + dados.areas.length) % dados.areas.length;
    trocarArea(destino, navegacao, painelContainer, dados.areas, autoplayState);
    navegacao.querySelector(`[data-index="${destino}"]`).focus();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) pararAvanco();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, instance) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      svg.classList.add('is-visible');
      instance.disconnect();
    }, { threshold: 0.15 });
    observer.observe(secao);
  } else {
    svg.classList.add('is-visible');
  }

  const conceito = dados.conceito;
  const linkConceito = document.querySelector('[data-society-concept]');
  if (linkConceito) {
    linkConceito.href = conceito.href;
    linkConceito.querySelector('strong').textContent = conceito.rotulo;
    linkConceito.querySelector('[data-concept-description]').textContent = conceito.frase;
  }
}

function configurarScrollspy() {
  const secoes = [...document.querySelectorAll('.religion-page > section[id]')];
  const links = [...document.querySelectorAll('.section-nav a')];
  if (!('IntersectionObserver' in window)) return;
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((link) => {
        if (link.hash === `#${entrada.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-20% 0px -65% 0px' });
  secoes.forEach((secao) => observador.observe(secao));
}

function iniciarGraficos() {
  const figures = [...document.querySelectorAll('[data-religion-chart]')];
  if (!window.Chart) {
    document.querySelectorAll('.data-details').forEach((details) => { details.open = true; });
    document.querySelectorAll('[data-chart-fallback]').forEach((notice) => { notice.hidden = false; });
    return;
  }
  observarGraficos(figures, (figure) => criarGrafico(figure.dataset.religionChart));
}

function montarGaleria() {
  const gallery = document.querySelector('[data-image-gallery]');
  for (const slot of Object.keys(IMAGENS_RELIGIOES[slug]).filter((item) => item.startsWith('galeria'))) {
    const container = document.createElement('div');
    container.dataset.imageSlot = slot;
    gallery.append(container);
  }
  montarImagens(IMAGENS_RELIGIOES[slug]);
}

gerarTabelas();
configurarAbas();
montarGaleria();
montarSociedade();
configurarScrollspy();
iniciarGraficos();
observadorTema.addEventListener('change', () => aplicarTema(graficos, criarGrafico));
