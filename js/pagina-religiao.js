// Modelo da página: a seção “Religião e sociedade” é obrigatória em novas páginas.
import { SOCIEDADE } from './dados-sociedade.js';
import { COMPARATIVO, COR_POR_RELIGIAO, GRUPOS, IDADES, INDICADORES, INSTRUCAO, REGIOES, SEXO } from './dados-ibge.js';
import { SERIE } from './dados-censos.js';
import { EXTRAS, RELIGIOES } from './dados-religioes.js';
import { PAGINAS_RELIGIAO } from './dados-paginas-religiao.js';
import { IMAGENS_RELIGIOES } from './imagens-religioes.js';
import { aplicarTema, formatarPercentual, gerarTabela, opcoesBase, observarGraficos } from './charts-core.js';
import { montarImagens } from './imagens.js';

const slug = document.body.dataset.religion;
const graficos = new Map();
let grupoComparado = 'outras';
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
  if (PAGINAS_RELIGIAO[slug]) {
    criarGraficoCenso(tipo);
    return;
  }
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
  const gruposDeAbas = [...document.querySelectorAll('.article-tabs')];
  const todasAsAbas = [];
  gruposDeAbas.forEach((grupoAbas) => {
    const tabs = [...grupoAbas.querySelectorAll('[role="tab"]')];
    todasAsAbas.push(...tabs);
    const ativar = (tab) => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
      });
      if (grupoAbas.classList.contains('census-tabs')) {
        requestAnimationFrame(atualizarGraficosContexto);
      }
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
  });
  const ativarPerfilPeloHash = () => {
    if (location.hash !== '#censos') return;
    const tab = todasAsAbas.find((item) => item.getAttribute('aria-controls') === 'censos');
    if (!tab) return;
    tab.click();
    requestAnimationFrame(() => {
      const painel = document.getElementById('censos');
      painel.focus({ preventScroll: true });
      painel.scrollIntoView({ block: 'start' });
    });
  };
  const linkPerfil = todasAsAbas.find((item) => item.getAttribute('aria-controls') === 'censos');
  document.querySelectorAll('a[href="#censos"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (linkPerfil) linkPerfil.click();
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
  if (area.conferir && new URLSearchParams(location.search).get('dev') === '1') {
    const seloResumo = document.createElement('small');
    seloResumo.className = 'society-review-badge';
    seloResumo.textContent = 'a conferir';
    resumo.append(' ', seloResumo);
  }
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
    if (area.conferirOlhares?.[indice] && new URLSearchParams(location.search).get('dev') === '1') {
      const selo = document.createElement('small');
      selo.className = 'society-review-badge';
      selo.textContent = 'a conferir';
      item.append(selo);
    }
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
  const nome = ({
    catolicismo: 'Catolicismo',
    evangelicos: 'Evangélicos',
    espiritismo: 'Espiritismo',
    umbanda: 'Umbanda',
    candomble: 'Candomblé',
    'tradicoes-indigenas': 'Tradições indígenas',
    judaismo: 'Judaísmo',
    islamismo: 'Islamismo',
    budismo: 'Budismo',
    hinduismo: 'Hinduísmo'
  })[slug];
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
  const grupoSociedade = GRUPOS.find((item) => item.id === ({
    catolicismo: 'catolica',
    evangelicos: 'evangelicas',
    espiritismo: 'espirita',
    umbanda: 'umbanda',
    candomble: 'umbanda',
    'tradicoes-indigenas': 'indigenas',
    judaismo: 'outras',
    islamismo: 'outras',
    budismo: 'outras',
    hinduismo: 'outras'
  })[slug]);
  secao.closest('.religion-society').style.setProperty(
    '--society-color',
    getComputedStyle(document.documentElement).getPropertyValue(grupoSociedade.cssVar).trim()
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
  const secoes = [...document.querySelectorAll('.religion-page [data-scroll-section][id], .religion-page > section[id]')];
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
  if (!gallery) return;
  for (const slot of Object.keys(IMAGENS_RELIGIOES[slug]).filter((item) => item.startsWith('galeria'))) {
    const container = document.createElement('div');
    container.dataset.imageSlot = slot;
    gallery.append(container);
  }
  montarImagens(IMAGENS_RELIGIOES[slug]);
}

function criarElemento(tag, className = '', texto = '') {
  const elemento = document.createElement(tag);
  if (className) elemento.className = className;
  if (texto) elemento.textContent = texto;
  return elemento;
}

function criarCallout(texto) {
  const aside = criarElemento('aside', 'callout');
  aside.append(criarElemento('span', '', '⚠️'), criarElemento('p', '', texto));
  return aside;
}

function criarImagemSlot(slot, className = 'article-image') {
  const container = criarElemento('div', className);
  container.dataset.imageSlot = slot;
  return container;
}

function criarSecao(id, label, titulo, className = 'container religion-article') {
  const section = criarElemento('section', className);
  section.id = id;
  section.dataset.scrollSection = '';
  section.setAttribute('aria-labelledby', `${id}-title`);
  section.append(criarElemento('p', 'eyebrow', label), criarElemento('h2', '', titulo));
  section.querySelector('h2').id = `${id}-title`;
  return section;
}

function criarBadgeConferencia(parent, conferir) {
  if (!conferir || new URLSearchParams(location.search).get('dev') !== '1') return;
  parent.append(criarElemento('small', 'society-review-badge', 'a conferir'));
}

function renderizarHistoria(conteudo, pagina) {
  const section = criarSecao('historia', 'História', 'Uma história em contextos diversos');
  const intro = criarElemento('p', 'body-copy', 'Conheça alguns marcos e leituras sobre a trajetória desta tradição, reconhecendo sua diversidade interna.');
  section.append(intro);
  const tabs = criarElemento('div', 'article-tabs');
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', `Tópicos sobre ${pagina.title}`);
  const panels = [];
  pagina.history.forEach((item, index) => {
    const tabId = `${slug}-history-tab-${index}`;
    const panelId = `${slug}-history-panel-${index}`;
    const tab = criarElemento('button', '', item.tab);
    tab.type = 'button';
    tab.id = tabId;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panelId);
    tab.setAttribute('aria-selected', String(index === 0));
    tab.tabIndex = index === 0 ? 0 : -1;
    tabs.append(tab);
    const panel = criarElemento('section', 'article-panel');
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.hidden = index !== 0;
    panel.append(criarElemento('h3', '', item.title), criarElemento('p', '', item.text));
    criarBadgeConferencia(panel, item.conferir);
    if (item.extra) {
      panel.append(criarElemento('p', '', item.extra));
      criarBadgeConferencia(panel, item.extraConferir);
    }
    if (item.note) panel.append(criarCallout(item.note));
    panel.append(criarImagemSlot(index === 0 ? 'origens' : index === 1 ? 'brasil' : 'hoje'));
    panels.push(panel);
  });
  section.append(tabs, ...panels);
  const timeline = criarElemento('ol', 'timeline-list');
  pagina.timeline.forEach((item) => {
    const li = criarElemento('li');
    const strong = criarElemento('strong', '', `${item.year}: `);
    li.append(strong, document.createTextNode(item.text));
    criarBadgeConferencia(li, item.conferir);
    timeline.append(li);
  });
  section.append(criarElemento('h3', 'mini-heading', 'Linha do tempo'), timeline);
  conteudo.append(section);
}

function renderizarParaEntender(conteudo, pagina) {
  const section = criarSecao('para-entender', 'Para entender', 'Conceitos e termos importantes');
  const cards = criarElemento('div', 'term-grid');
  pagina.understand.forEach(([term, definition]) => {
    const card = criarElemento('article', 'term-card');
    card.append(criarElemento('h3', '', term), criarElemento('p', '', definition));
    cards.append(card);
  });
  if (pagina.classification) {
    const classification = criarElemento('article', 'term-card');
    classification.append(
      criarElemento('h3', '', 'Na classificação dos Conceitos'),
      criarElemento('p', '', pagina.classification.text)
    );
    const link = criarElemento('a', '', pagina.classification.note);
    link.href = pagina.classification.href;
    classification.append(link);
    cards.append(classification);
  }
  const aviso = criarElemento('p', 'method-note', 'Descrição geral e respeitosa; cada comunidade pode ter entendimentos próprios.');
  const details = criarElemento('details', 'accordion');
  details.append(criarElemento('summary', '', 'Glossário rápido'));
  const list = criarElemento('dl', 'glossary-list');
  pagina.glossary.forEach(([term, definition]) => {
    list.append(criarElemento('dt', '', term), criarElemento('dd', '', definition));
  });
  details.append(list);
  section.append(cards, aviso, details);
  conteudo.append(section);
}

function renderizarSociedade(conteudo, pagina) {
  const section = criarSecao('sociedade', 'Religião e sociedade', 'Religião e sociedade', 'container religion-society');
  const intro = criarElemento('p', '', 'Como esta tradição dialoga com educação, cuidado, cultura, direitos, comunidade e convivência.');
  const conceito = criarElemento('a', 'society-link-card');
  conceito.dataset.societyConcept = '';
  conceito.href = pagina.conceito.href;
  conceito.append(
    criarElemento('span', '', 'Conceito relacionado'),
    criarElemento('strong', '', pagina.conceito.rotulo),
    criarElemento('p', '', pagina.conceito.frase),
    criarElemento('span', '', 'Ver conceito →')
  );
  const layout = criarElemento('div', 'society-layout');
  layout.dataset.society = '';
  const navigation = criarElemento('div', 'society-navigation');
  navigation.dataset.societyTabs = '';
  navigation.setAttribute('aria-label', 'Áreas de religião e sociedade');
  const panels = criarElemento('div', 'society-panels');
  panels.dataset.societyPanels = '';
  const areaLinks = criarElemento('div', 'society-links');
  areaLinks.append(conceito);
  section.append(intro, layout, areaLinks);
  layout.append(navigation, panels);
  conteudo.append(section);
}

function censusGroupIndex() {
  if (EXTRAS[slug]?.semGrupoIBGE) {
    return GRUPOS.findIndex((item) => item.id === grupoComparado);
  }
  return GRUPOS.findIndex((item) => item.id === (slug === 'tradicoes-indigenas' ? 'indigenas' : 'umbanda'));
}

function censusGroupLabel() {
  if (EXTRAS[slug]?.semGrupoIBGE) {
    const nome = GRUPOS[censusGroupIndex()]?.nome ?? 'Outras religiosidades';
    return `${nome} (grupo)`;
  }
  return slug === 'tradicoes-indigenas' ? 'Tradições indígenas' : 'Umbanda e Candomblé';
}

function formatarPessoas(valor) {
  return new Intl.NumberFormat('pt-BR').format(valor);
}

function censusValues(tipo) {
  const extras = EXTRAS[slug];
  if (tipo === 'population' && extras?.semGrupoIBGE) {
    const rows = [2010, 2022].map((ano) => [String(ano), formatarPessoas(extras.pessoas[ano])]);
    return { labels: ['2010', '2022'], values: [extras.pessoas[2010], extras.pessoas[2022]], rows };
  }
  const index = censusGroupIndex();
  const groupName = censusGroupLabel();
  if (tipo === 'comparison') return {
    labels: ['2010', '2022'],
    values: [COMPARATIVO[2010][index], COMPARATIVO[2022][index]],
    rows: [['2010', formatarPercentual(COMPARATIVO[2010][index])], ['2022', formatarPercentual(COMPARATIVO[2022][index])]]
  };
  if (tipo === 'subgroups') {
    const rows = EXTRAS[slug].subgrupos;
    const formatarSubgrupo = (value) => value > 0 && value < 0.1
      ? `${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}%`
      : formatarPercentual(value);
    return { labels: rows.map((item) => item.nome), values: rows.map((item) => item.pct), rows: rows.map((item) => [item.nome, formatarSubgrupo(item.pct), item.pessoas]) };
  }
  if (tipo === 'regions') {
    const rows = Object.entries(REGIOES).map(([name, values]) => [name, values[index]]);
    return { labels: rows.map(([name]) => name), values: rows.map(([, value]) => value), rows: rows.map(([name, value]) => [name, formatarPercentual(value)]) };
  }
  if (tipo === 'ages') {
    const rows = Object.entries(IDADES).map(([name, values]) => [name, values[index]]);
    return { labels: rows.map(([name]) => name), values: rows.map(([, value]) => value), rows: rows.map(([name, value]) => [name, formatarPercentual(value)]) };
  }
  if (tipo === 'sex') {
    const key = ({
      catolica: 'Católica',
      evangelicas: 'Evangélicas',
      espirita: 'Espírita',
      umbanda: 'Umbanda e Candomblé',
      indigenas: 'Tradições indígenas',
      outras: 'Outras religiosidades',
      sem: 'Sem religião'
    })[GRUPOS[index]?.id] ?? 'Outras religiosidades';
    const values = SEXO[key];
    return { labels: ['Homens', 'Mulheres'], values, rows: [['Homens', formatarPercentual(values[0])], ['Mulheres', formatarPercentual(values[1])]] };
  }
  if (tipo === 'color') {
    const labels = ['Branca', 'Preta', 'Amarela', 'Parda', 'Indígena'];
    const key = GRUPOS[index]?.nome === 'Católica Apostólica Romana' ? 'Católica' : GRUPOS[index]?.nome;
    const values = COR_POR_RELIGIAO[key];
    return { labels, values, rows: labels.map((label, itemIndex) => [label, formatarPercentual(values[itemIndex])]) };
  }
  if (tipo === 'education') {
    const key = GRUPOS[index]?.nome === 'Católica Apostólica Romana' ? 'Católica' : GRUPOS[index]?.nome;
    const labels = ['Sem instrução/fundamental incompleto', 'Fundamental completo/médio incompleto', 'Médio completo/superior incompleto', 'Superior completo'];
    const values = INSTRUCAO[key];
    return { labels, values, rows: labels.map((label, itemIndex) => [label, formatarPercentual(values[itemIndex])]) };
  }
  if (tipo === 'indicators') {
    const key = GRUPOS[index]?.nome === 'Católica Apostólica Romana' ? 'Católica' : GRUPOS[index]?.nome;
    const items = [
      ['Analfabetismo (15+)', INDICADORES.analfabetismo15[key]],
      ['Domicílio próprio', INDICADORES.domicilioProprio[key]],
      ['Internet em casa', INDICADORES.internetCasa[key]]
    ];
    return { labels: items.map(([name]) => name), values: items.map(([, value]) => value), rows: items.map(([name, value]) => [name, formatarPercentual(value)]) };
  }
  if (tipo === 'region-table') return { labels: [], values: [], rows: [] };
  return { labels: [groupName], values: [], rows: [] };
}

function adicionarFiguraCenso(section, tipo, titulo, descricao, tableColumns = ['Categoria', 'Percentual'], contexto = false) {
  const figure = criarElemento('figure', 'religion-chart census-figure');
  if (contexto) {
    figure.dataset.contextChart = tipo;
    figure.dataset.contextTitle = titulo;
    figure.dataset.contextColumns = JSON.stringify(tableColumns);
  }
  const canvas = document.createElement('canvas');
  canvas.dataset.religionChart = tipo;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', descricao);
  const caption = criarElemento('figcaption');
  caption.append(criarElemento('h3', '', titulo));
  figure.append(canvas, caption);
  const details = criarElemento('details', 'data-details');
  details.append(criarElemento('summary', '', 'Ver tabela de dados'));
  const table = criarElemento('div');
  table.dataset.table = tipo;
  details.append(table);
  figure.append(details);
  section.append(figure);
  const data = censusValues(tipo);
  gerarTabela(table, contexto ? `${titulo} — ${censusGroupLabel()}` : titulo, tableColumns, data.rows);
}

function atualizarGraficosContexto() {
  document.querySelectorAll('[data-context-chart]').forEach((figure) => {
    const tipo = figure.dataset.contextChart;
    const data = censusValues(tipo);
    const tabela = figure.querySelector(`[data-table="${tipo}"]`);
    const colunas = JSON.parse(figure.dataset.contextColumns);
    gerarTabela(tabela, `${figure.dataset.contextTitle} — ${censusGroupLabel()}`, colunas, data.rows);
    const chart = graficos.get(tipo);
    if (chart) {
      chart.destroy();
      graficos.delete(tipo);
    }
    const canvas = figure.querySelector('canvas');
    if (canvas.getClientRects().length) criarGraficoCenso(tipo);
  });
}

// Exibe os números-resumo próprios de cada tradição.
function renderizarChipsCenso(section, extras) {
  const chips = criarElemento('div', 'stat-grid');
  extras.chips.forEach(([value, label, complement], index) => {
    const card = criarElemento('article', 'stat-card');
    card.append(criarElemento('p', 'stat-card__value', value), criarElemento('h3', '', label));
    if (complement) card.append(criarElemento('p', '', complement));
    if (extras.conferir2010 && label.includes('(2010)')) criarBadgeConferencia(card, true);
    if (extras.chipsConferir?.includes(index)) criarBadgeConferencia(card, true);
    chips.append(card);
  });
  section.append(chips);
}

// Compara os percentuais censitários e, quando há dados, os subgrupos separados.
function renderizarEvolucaoCenso(section, extras) {
  section.append(criarElemento('h3', 'mini-heading', 'Evolução: 2010 × 2022'));
  if (extras.semGrupoIBGE) {
    const pessoas2010 = extras.pessoas[2010];
    const pessoas2022 = extras.pessoas[2022];
    const variacao = pessoas2022 - pessoas2010;
    const comparisonStats = criarElemento('div', 'stat-grid stat-grid--three');
    [
      ['2010', formatarPessoas(pessoas2010)],
      ['2022', formatarPessoas(pessoas2022)],
      ['Variação', `${variacao > 0 ? '↑' : variacao < 0 ? '↓' : '→'} ${formatarPessoas(Math.abs(variacao))}`]
    ].forEach(([label, value]) => {
      const card = criarElemento('article', 'stat-card');
      card.append(criarElemento('p', 'stat-card__value', value), criarElemento('h3', '', label));
      comparisonStats.append(card);
    });
    section.append(comparisonStats);
    if (extras.conferir2010) {
      const notaConferencia = criarElemento('p', 'method-note', '2010: valor a confirmar no SIDRA.');
      criarBadgeConferencia(notaConferencia, true);
      section.append(notaConferencia);
    }
    adicionarFiguraCenso(
      section,
      'population',
      'Pessoas declaradas: 2010 × 2022',
      'Comparação do número de pessoas declarado em 2010 e 2022.',
      ['Ano', 'Pessoas']
    );
    section.append(criarElemento('p', 'method-note', 'Bases diferentes: população total em 2010; população de 10 anos ou mais em 2022. Compare a ordem de grandeza, não diferenças pequenas.'));
    return;
  }
  const index = censusGroupIndex();
  const value2010 = COMPARATIVO[2010][index];
  const value2022 = COMPARATIVO[2022][index];
  const delta = value2022 - value2010;
  const comparisonStats = criarElemento('div', 'stat-grid stat-grid--three');
  [
    ['2010', formatarPercentual(value2010)],
    ['2022', formatarPercentual(value2022)],
    ['Variação', `${delta > 0 ? '↑ ' : delta < 0 ? '↓ ' : ''}${formatarNumero(delta)} p.p.`]
  ].forEach(([label, value]) => {
    const card = criarElemento('article', 'stat-card');
    card.append(criarElemento('p', 'stat-card__value', value), criarElemento('h3', '', label));
    comparisonStats.append(card);
  });
  section.append(comparisonStats);
  adicionarFiguraCenso(section, 'comparison', 'Comparação do grupo nos censos', `Comparação do percentual de ${censusGroupLabel()} em 2010 e 2022.`);
  if (extras.subgrupos.length) {
    adicionarFiguraCenso(section, 'subgroups', 'Percentuais separados nas bases informadas', 'Comparação dos percentuais individuais de Umbanda ou Candomblé nas bases indicadas.', ['Grupo e base', 'Percentual', 'Pessoas']);
    section.append(criarElemento('p', 'method-note', 'Em 2010 os dados separados vêm do Texto de estudo (população total); em 2022, dos microdados (população de 10+). As bases são diferentes: compare apenas a ordem de grandeza.'));
    section.append(criarElemento('p', 'method-note', 'Em números de pessoas, Umbanda e Candomblé mais que dobraram entre os dois censos, mas lembre-se de que as bases diferem.'));
  }
}

// Mostra os recortes censitários com seus valores tabulados e gráficos acessíveis.
function renderizarPerfilCenso(section, extras) {
  const heading = criarElemento('h3', 'mini-heading', extras.semGrupoIBGE
    ? `Perfil de ${censusGroupLabel()}`
    : `Perfil do grupo ${extras.avisoCombinado ? 'Umbanda e Candomblé' : 'Tradições indígenas'}`);
  if (extras.semGrupoIBGE) heading.dataset.contextGroupLabel = '';
  section.append(heading);
  adicionarFiguraCenso(section, 'regions', 'Por região', 'Percentual por região no recorte censitário informado.', ['Região', 'Percentual'], extras.semGrupoIBGE);
  adicionarFiguraCenso(section, 'ages', 'Por faixa etária', 'Percentual por faixa etária no recorte censitário informado.', ['Faixa etária', 'Percentual'], extras.semGrupoIBGE);
  adicionarFiguraCenso(section, 'sex', 'Composição por sexo', 'Composição percentual por sexo no recorte censitário informado.', ['Sexo', 'Percentual'], extras.semGrupoIBGE);
  adicionarFiguraCenso(section, 'color', 'Composição por cor ou raça', 'Composição percentual por cor ou raça no recorte censitário informado.', ['Cor ou raça', 'Percentual'], extras.semGrupoIBGE);
  if (!extras.semGrupoIBGE) {
    adicionarFiguraCenso(section, 'education', 'Escolaridade (pessoas de 25 anos ou mais)', 'Distribuição percentual por nível de instrução.');
    adicionarFiguraCenso(section, 'indicators', 'Condições de vida', 'Indicadores de analfabetismo, domicílio próprio e internet em casa.');
  }
}

function renderizarCondicoesCenso(section, extras) {
  const heading = criarElemento('h3', 'mini-heading', `Condições de vida: ${censusGroupLabel()}`);
  heading.dataset.contextGroupLabel = '';
  section.append(heading);
  adicionarFiguraCenso(section, 'education', 'Escolaridade (pessoas de 25 anos ou mais)', 'Distribuição percentual por nível de instrução no grupo de contexto.', ['Nível de instrução', 'Percentual'], extras.semGrupoIBGE);
  adicionarFiguraCenso(section, 'indicators', 'Indicadores sociais', 'Indicadores de analfabetismo, domicílio próprio e internet em casa no grupo de contexto.', ['Indicador', 'Percentual'], extras.semGrupoIBGE);
}

function renderizarFonteCenso(section) {
  const textoFonte = EXTRAS[slug]?.semGrupoIBGE
    ? 'Fonte: 2010 — Texto 01 para Judaísmo e Budismo; pesquisa complementar para Islamismo e Hinduísmo (valores a confirmar no SIDRA quando indicado). 2022 — microdados do IBGE divulgados em 31/08/2026 (população de 10+; base de 176,6 milhões), segundo Folhapress, 02/09/2026. Percentuais aproximados calculados. Consulte também as '
    : 'Fonte: IBGE, Censo Demográfico 2010 e 2022; microdados do Censo 2022 divulgados em 31/08/2026. Consulte também as ';
  const fonte = criarElemento('p', 'method-note', textoFonte);
  const ibge = criarElemento('a', '', 'fontes oficiais do IBGE');
  ibge.href = 'https://www.ibge.gov.br/';
  ibge.target = '_blank';
  ibge.rel = 'noopener noreferrer';
  ibge.append(criarElemento('span', 'sr-only', ' (abre em nova aba)'));
  fonte.append(ibge, document.createTextNode('.'));
  section.append(fonte);
}

function renderizarCensos(conteudo, pagina) {
  const section = criarSecao('censos', 'Nos censos do IBGE', 'O que os censos registram?');
  section.classList.add('religion-numbers');
  section.append(criarElemento('p', '', 'O Censo registra a religião declarada, não a prática nem a frequência. O comparativo principal considera pessoas de 10 anos ou mais; bases de anos distintos exigem cautela.'));
  const extras = EXTRAS[slug];
  if (extras.semGrupoIBGE) {
    section.append(criarCallout('O IBGE divulga esta religião separadamente só nos microdados de 2022 (número de pessoas). Nas tabelas por região, idade, sexo, cor ou raça e escolaridade, ela entra no grupo “Outras religiosidades”, que também reúne outras tradições. Os gráficos de Território, Perfil e Condições de vida mostram esse grupo como CONTEXTO, não como retrato desta religião.'));
    const seletorRotulo = criarElemento('label', 'census-comparison', 'Comparar com:');
    const seletor = document.createElement('select');
    seletor.dataset.censusComparison = '';
    GRUPOS.filter((item) => item.id !== 'naosabe').forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.nome;
      option.selected = item.id === grupoComparado;
      seletor.append(option);
    });
    seletorRotulo.append(seletor);
    section.append(seletorRotulo);

    const abas = criarElemento('div', 'article-tabs census-tabs');
    abas.setAttribute('role', 'tablist');
    abas.setAttribute('aria-label', 'Recortes dos censos');
    const paineis = [
      ['evolucao', 'Evolução'],
      ['territorio', 'Território'],
      ['perfil', 'Perfil'],
      ['condicoes', 'Condições de vida']
    ].map(([id, titulo], indice) => {
      const tab = criarElemento('button', '', titulo);
      tab.type = 'button';
      tab.id = `${slug}-census-tab-${id}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `${slug}-census-panel-${id}`);
      tab.setAttribute('aria-selected', String(indice === 0));
      tab.tabIndex = indice === 0 ? 0 : -1;
      abas.append(tab);
      const painel = criarElemento('section', 'census-tab-panel');
      painel.id = `${slug}-census-panel-${id}`;
      painel.setAttribute('role', 'tabpanel');
      painel.setAttribute('aria-labelledby', tab.id);
      painel.tabIndex = 0;
      painel.hidden = indice !== 0;
      return { id, painel };
    });
    const painelPorId = Object.fromEntries(paineis.map(({ id, painel }) => [id, painel]));
    renderizarChipsCenso(painelPorId.evolucao, extras);
    renderizarEvolucaoCenso(painelPorId.evolucao, extras);
    const territoryHeading = criarElemento('h3', 'mini-heading', `Território: ${censusGroupLabel()}`);
    territoryHeading.dataset.contextGroupLabel = '';
    painelPorId.territorio.append(territoryHeading);
    adicionarFiguraCenso(painelPorId.territorio, 'regions', 'Por região', 'Percentual por região no grupo de contexto selecionado.', ['Região', 'Percentual'], true);
    renderizarPerfilCenso(painelPorId.perfil, extras);
    renderizarCondicoesCenso(painelPorId.condicoes, extras);
    section.append(abas, ...paineis.map(({ painel }) => painel));
    seletor.addEventListener('change', () => {
      grupoComparado = seletor.value;
      section.querySelectorAll('[data-context-group-label]').forEach((label) => {
        const prefix = label.classList.contains('mini-heading')
          ? (label.textContent.startsWith('Território:') ? 'Território: ' : label.textContent.startsWith('Condições de vida:') ? 'Condições de vida: ' : 'Perfil de ')
          : '';
        label.textContent = `${prefix}${censusGroupLabel()}`;
      });
      atualizarGraficosContexto();
    });
    section.append(criarElemento('p', 'method-note', 'Os gráficos contextuais apresentam dados agregados do grupo selecionado em “Comparar com”, não estimativas específicas desta religião.'));
    renderizarFonteCenso(section);
    conteudo.append(section);
    return;
  }
  if (extras.avisoCombinado) {
    section.append(criarCallout('O IBGE divulga Umbanda e Candomblé juntos na maioria dos recortes (região, idade, sexo, cor ou raça e escolaridade). Os gráficos desta página mostram o grupo combinado; só os microdados de 2022 separam as duas religiões.'));
  }
  pagina.censusCallouts.forEach((text) => section.append(criarCallout(text)));
  renderizarChipsCenso(section, extras);
  renderizarEvolucaoCenso(section, extras);
  renderizarPerfilCenso(section, extras);
  renderizarFonteCenso(section);
  conteudo.append(section);
}

function renderizarCuriosidades(conteudo, pagina) {
  const section = criarSecao('curiosidades', 'Você sabia?', 'Números e destaques');
  const facts = criarElemento('div', 'stat-grid');
  pagina.facts.forEach((fact) => {
    const card = criarElemento('article', 'stat-card');
    const texto = typeof fact === 'string' ? fact : fact.texto;
    card.append(criarElemento('p', '', texto));
    if (typeof fact !== 'string') criarBadgeConferencia(card, fact.conferir);
    facts.append(card);
  });
  section.append(facts);
  const records = criarElemento('div', 'record-grid');
  EXTRAS[slug].recordes.forEach(([name, value, detail], index) => {
    const card = criarElemento('article', 'record-card');
    card.append(criarElemento('p', '', name), criarElemento('strong', '', value), criarElemento('p', '', detail));
    if (EXTRAS[slug].recordesConferir?.includes(index)) criarBadgeConferencia(card, true);
    records.append(card);
  });
  section.append(criarElemento('h3', 'mini-heading', 'Destaques dos dados'), records);
  conteudo.append(section);
}

function renderizarGaleria(conteudo, pagina) {
  const section = criarSecao('galeria', 'Galeria', 'Imagens e créditos', 'container religion-gallery');
  section.append(criarElemento('p', '', 'As imagens permanecem pendentes de curadoria de origem, autorização, direitos de uso, descrição alternativa e crédito. Priorizaremos arquitetura, patrimônio, festas públicas, objetos, mapas, ilustrações históricas e acervos oficiais.'));
  section.append(criarElemento('div', 'image-gallery'));
  section.querySelector('.image-gallery').dataset.imageGallery = '';
  const credits = criarElemento('details', 'accordion');
  credits.append(criarElemento('summary', '', 'Créditos das imagens'));
  credits.append(criarElemento('p', '', pagina.imageSensitivityCallout
    ? 'Imagens de pessoas em contexto religioso exigem confirmação e, quando possível, autorização.'
    : 'Imagens de rituais exigem autorização de quem é retratado.'));
  section.append(credits);
  conteudo.append(section);
}

function renderizarNavegacaoReligioes() {
  const nav = document.querySelector('[data-religion-pagination]');
  if (!nav) return;
  const ativas = RELIGIOES.filter((religiao) => religiao.status !== 'breve' && (religiao.pagina || religiao.arquivo));
  const indice = ativas.findIndex((religiao) => religiao.id === slug);
  const anterior = ativas[indice - 1];
  const proxima = ativas[indice + 1];
  const linkAnterior = criarElemento('a', '', anterior ? `← Anterior: ${anterior.nome}` : '← Índice de religiões');
  linkAnterior.href = anterior ? (anterior.pagina ?? anterior.arquivo) : 'religioes.html';
  const linkProxima = criarElemento('a', '', proxima ? `Próxima: ${proxima.nome} →` : 'Índice de religiões →');
  linkProxima.href = proxima ? (proxima.pagina ?? proxima.arquivo) : 'religioes.html';
  nav.replaceChildren(linkAnterior, linkProxima);
}

function criarTabelaFallbackSociedade(area) {
  const article = criarElemento('article', 'society-static-panel');
  article.dataset.area = area.id;
  const resumo = criarElemento('p', '', area.resumo);
  if (area.conferir && new URLSearchParams(location.search).get('dev') === '1') {
    resumo.append(' ', criarElemento('small', 'society-review-badge', 'a conferir'));
  }
  article.append(criarElemento('h3', '', area.titulo), resumo, criarElemento('h4', '', 'Exemplos'));
  const list = criarElemento('ul');
  area.exemplos.forEach((exemplo) => {
    const item = criarElemento('li');
    item.append(criarElemento('strong', '', `${exemplo.titulo}: `), document.createTextNode(exemplo.texto));
    criarBadgeConferencia(item, exemplo.conferir);
    list.append(item);
  });
  const views = criarElemento('details', 'society-static-views');
  views.append(criarElemento('summary', '', 'Dois olhares'));
  const grid = criarElemento('div', 'society-static-views__grid');
  area.olhares.forEach((text, index) => {
    const p = criarElemento('p');
    p.append(criarElemento('strong', '', index === 0 ? 'Um olhar: ' : 'Outro olhar: '), document.createTextNode(text));
    if (area.conferirOlhares?.[index] && new URLSearchParams(location.search).get('dev') === '1') {
      p.append(' ', criarElemento('small', 'society-review-badge', 'a conferir'));
    }
    grid.append(p);
  });
  views.append(grid);
  article.append(list, views, criarElemento('blockquote', '', area.refletir), criarElemento('p', 'society-source', `Fonte: ${area.fonte}`));
  return article;
}

function montarPainelSociedadeEstatico() {
  const data = SOCIEDADE[slug];
  const container = document.querySelector('[data-society-panels]');
  if (!data || !container) return;
  container.replaceChildren(...data.areas.map(criarTabelaFallbackSociedade));
}

function renderizarPaginaNova() {
  const pagina = PAGINAS_RELIGIAO[slug];
  const conteudo = document.querySelector('[data-religion-content]');
  if (!pagina || !conteudo) return false;
  const nav = document.querySelector('[data-page-navigation]');
  [
    ['frase', 'Em uma frase'],
    ['historia', 'História'],
    ['para-entender', 'Para entender'],
    ['sociedade', 'Religião e sociedade'],
    ['censos', 'Nos censos do IBGE'],
    ['curiosidades', 'Você sabia?'],
    ['galeria', 'Galeria']
  ].forEach(([id, label]) => {
    const link = criarElemento('a', '', label);
    link.href = `#${id}`;
    nav.append(link);
  });
  const frase = criarSecao('frase', 'Em uma frase', 'Uma síntese');
  frase.append(criarElemento('p', 'section-intro', pagina.sentence));
  frase.append(criarImagemSlot('capa', 'article-cover'));
  conteudo.append(frase);
  renderizarHistoria(conteudo, pagina);
  renderizarParaEntender(conteudo, pagina);
  renderizarSociedade(conteudo, SOCIEDADE[slug]);
  renderizarCensos(conteudo, pagina);
  renderizarCuriosidades(conteudo, pagina);
  renderizarGaleria(conteudo, pagina);
  const pagination = criarElemento('nav', 'religion-pagination');
  pagination.dataset.religionPagination = '';
  pagination.setAttribute('aria-label', 'Anterior e próxima religião');
  conteudo.append(pagination);
  montarPainelSociedadeEstatico();
  return true;
}

function criarGraficoCenso(tipo) {
  if (!window.Chart || graficos.has(tipo)) return;
  const canvas = document.querySelector(`[data-religion-chart="${tipo}"]`);
  if (!canvas) return;
  const data = censusValues(tipo);
  const grupoCor = GRUPOS[censusGroupIndex()];
  const cor = getComputedStyle(document.documentElement).getPropertyValue(grupoCor.cssVar).trim();
  const options = opcoesBase();
  options.plugins.legend.display = false;
  options.plugins.tooltip.callbacks = {
    label: (context) => {
      const value = Number(context.parsed.x ?? context.parsed.y);
      if (tipo === 'population') return `${context.dataset.label}: ${formatarPessoas(value)} pessoas`;
      const formatted = tipo === 'subgroups' && value > 0 && value < 0.1
        ? `${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}%`
        : formatarPercentual(value);
      return `${context.dataset.label}: ${formatted}`;
    }
  };
  if (['population', 'regions', 'ages', 'education', 'indicators', 'subgroups'].includes(tipo)) {
    options.indexAxis = 'y';
    options.scales.x.beginAtZero = true;
    options.scales.x.ticks.callback = (value) => tipo === 'population'
      ? formatarPessoas(Number(value))
      : `${value}%`;
  } else {
    options.scales.y.beginAtZero = true;
    options.scales.y.ticks.callback = (value) => `${value}%`;
  }
  const chart = new window.Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: censusGroupLabel(),
        data: data.values,
        backgroundColor: cor,
        borderColor: cor,
        borderWidth: 1
      }]
    },
    options
  });
  graficos.set(tipo, chart);
}

if (!renderizarPaginaNova()) gerarTabelas();
renderizarNavegacaoReligioes();
configurarAbas();
montarGaleria();
montarSociedade();
configurarScrollspy();
iniciarGraficos();
observadorTema.addEventListener('change', () => aplicarTema(graficos, criarGrafico));
