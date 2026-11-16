import { ANOS_SEM_CENSO, CENSOS, LINKS, QUEDA_CATOLICOS, SERIE } from './dados-censos.js';
import { initCarrossel } from './carrossel.js';
import {
  aplicarTema as reconstruirTema,
  formatarNumero,
  gerarTabela as criarTabelaComum,
  obterFonteGrafico,
  lerCor,
  observarGraficos as observarElementos,
  opcoesBase as opcoesComuns
} from './charts-core.js';

const faixas = {
  catolica: { nome: 'Católica', cor: '--c-catolica' },
  evangelicas: { nome: 'Evangélicas', cor: '--c-evangelicas' },
  sem: { nome: 'Sem religião', cor: '--c-semreligiao' },
  espirita: { nome: 'Espírita', cor: '--c-espirita' }
};
const graficos = new Map();
const seriesAtivas = new Set(Object.keys(faixas));
const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
const temaEscuro = window.matchMedia('(prefers-color-scheme: dark)');

function formatar(valor) {
  return `${formatarNumero(valor)}%`;
}

function anunciar(mensagem) {
  document.querySelector('#live-region').textContent = mensagem;
}

function criarTabela(alvo, titulo, colunas, linhas) {
  const container = document.querySelector(`[data-censo-table="${alvo}"]`);
  return criarTabelaComum(container, titulo, colunas, linhas);
}

// Prepara os valores da série e marca explicitamente os percentuais ainda ausentes.
function montarTabelas() {
  const linhas = SERIE.map((item) => [
    String(item.ano),
    item.base,
    item.catolica === null ? '—' : formatar(item.catolica),
    item.evangelicas === null ? '—' : formatar(item.evangelicas),
    item.sem === null ? '—' : formatar(item.sem),
    item.espirita === null ? '—' : formatar(item.espirita)
  ]);
  criarTabela('serie', 'Percentual por grupo e base populacional', ['Ano', 'Base', 'Católica', 'Evangélicas', 'Sem religião', 'Espírita'], linhas);
  criarTabela(
    'queda',
    'Variação da proporção católica entre censos',
    ['Período', 'Variação'],
    QUEDA_CATOLICOS.map((item) => [item.periodo, `${item.pp < 0 ? '−' : '+'}${formatarNumero(Math.abs(item.pp))} p.p.`])
  );
}

function opcoesGrafico() {
  const options = opcoesComuns({ reducedMotion: movimentoReduzido.matches, duration: 450 });
  options.plugins.legend.display = false;
  return options;
}

// Desenha a série como pontos no eixo temporal real e deixa lacunas sem interpolação.
function criarSerie() {
  const cores = Object.fromEntries(Object.entries(faixas).map(([id, grupo]) => [id, lerCor(grupo.cor)]));
  const conjuntos = Object.entries(faixas).map(([id, grupo]) => ({
    label: grupo.nome,
    data: SERIE.map((item) => ({ x: item.ano, y: item[id], base: item.base })),
    borderColor: cores[id],
    backgroundColor: cores[id],
    pointRadius: 5,
    pointHoverRadius: 7,
    borderWidth: 2,
    showLine: true,
    spanGaps: false,
    clip: false,
    hidden: !seriesAtivas.has(id)
  }));
  const ticksDesktop = [1880, 1900, 1920, 1940, 1960, 1980, 2000, 2022];
  const ticksMobile = [1880, 1920, 1960, 2000, 2022];
  const marcadores = {
    id: 'marcadoresTemporais',
    afterDraw(chart) {
      const { ctx, chartArea, scales } = chart;
      if (!chartArea) return;
      const x = scales.x.getPixelForValue(1988);
      ctx.save();
      ctx.strokeStyle = lerCor('--line');
      ctx.setLineDash([4, 5]);
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = lerCor('--ink-soft');
      ctx.font = `500 11px ${obterFonteGrafico()}`;
      ctx.textAlign = 'left';
      ctx.fillText('CF 1988', x + 4, chartArea.top + 13);
      ctx.restore();
    }
  };
  const config = opcoesGrafico();
  config.layout = { padding: 12 };
  config.plugins.tooltip.callbacks = {
    title(items) {
      return items.length ? String(items[0].raw.x) : '';
    },
    label(context) {
      return `${context.dataset.label}: ${formatar(context.raw.y)} · base: ${context.raw.base}`;
    }
  };
  config.scales = {
    x: {
      type: 'linear',
      min: 1860,
      max: 2025,
      afterBuildTicks(scale) {
        const ticks = window.innerWidth < 600 ? ticksMobile : ticksDesktop;
        scale.ticks = ticks.map((value) => ({ value }));
      },
      ticks: {
        color: lerCor('--ink-soft'),
        callback(value) {
          const ticks = window.innerWidth < 600 ? ticksMobile : ticksDesktop;
          return ticks.includes(Number(value)) ? String(value) : '';
        },
        maxRotation: 0,
        minRotation: 0
      },
      grid: { color: lerCor('--line') }
    },
    y: {
      min: 0,
      max: 100,
      title: { display: true, text: 'População (%)', color: lerCor('--ink-soft') },
      ticks: { color: lerCor('--ink-soft'), callback: (valor) => formatar(valor) },
      grid: { color: lerCor('--line') }
    }
  };
  const canvas = document.querySelector('#chart-serie');
  if (!canvas || !window.Chart) return;
  graficos.set('serie', new window.Chart(canvas, {
    type: 'scatter',
    data: { datasets: conjuntos },
    options: config,
    plugins: [marcadores]
  }));
}

function criarQueda() {
  const pluginRotulos = {
    id: 'rotulosQueda',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      chart.getDatasetMeta(0).data.forEach((barra, indice) => {
        const valor = QUEDA_CATOLICOS[indice].pp;
        ctx.save();
        ctx.fillStyle = lerCor('--ink');
        ctx.font = `600 12px ${obterFonteGrafico()}`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(`−${formatarNumero(Math.abs(valor))} p.p.`, barra.x - 7, barra.y);
        ctx.restore();
      });
    }
  };
  const canvas = document.querySelector('#chart-queda');
  if (!canvas || !window.Chart) return;
  const config = opcoesGrafico();
  config.indexAxis = 'y';
  config.scales = {
    x: {
      min: -11,
      max: 0,
      ticks: { color: lerCor('--ink-soft'), callback: (valor) => `${formatarNumero(Math.abs(valor))} p.p.` },
      grid: { color: lerCor('--line') }
    },
    y: { ticks: { color: lerCor('--ink-soft') }, grid: { display: false } }
  };
  config.plugins.tooltip.callbacks = { label: (context) => `−${formatarNumero(Math.abs(context.raw))} p.p.` };
  graficos.set('queda', new window.Chart(canvas, {
    type: 'bar',
    data: {
      labels: QUEDA_CATOLICOS.map((item) => item.periodo.replace('→', ' → ')),
      datasets: [{
        label: 'Variação',
        data: QUEDA_CATOLICOS.map((item) => item.pp),
        backgroundColor: lerCor('--c-catolica'),
        borderRadius: 5,
        categoryPercentage: 0.72
      }]
    },
    options: config,
    plugins: [pluginRotulos]
  }));
}

function montarLinks(chaves) {
  return chaves.map((chave) => {
    const link = LINKS[chave];
    if (!link) return null;
    const ancora = document.createElement('a');
    ancora.href = link.url;
    ancora.target = '_blank';
    ancora.rel = 'noopener noreferrer';
    ancora.innerHTML = `${link.titulo} <span aria-hidden="true">↗</span><span class="sr-only">(abre em nova aba)</span>`;
    return ancora;
  }).filter(Boolean);
}

function montarDetalhesDialog(censo) {
  const conteudo = document.querySelector('#dialog-content');
  conteudo.replaceChildren();
  const ano = document.createElement('p');
  ano.className = 'dialog-year';
  ano.textContent = String(censo.ano);
  const titulo = document.createElement('h2');
  titulo.id = 'dialog-title';
  titulo.textContent = `Censo de ${censo.ano}`;
  const mudouTitulo = document.createElement('h3');
  mudouTitulo.textContent = 'O que mudou';
  const resumo = document.createElement('p');
  resumo.textContent = censo.resumo;
  const perguntaTitulo = document.createElement('h3');
  perguntaTitulo.textContent = 'Como a religião foi perguntada';
  const pergunta = document.createElement('p');
  pergunta.textContent = censo.pergunta;
  conteudo.append(ano, titulo, mudouTitulo, resumo, perguntaTitulo, pergunta);
  if (censo.numeros) {
    const numerosTitulo = document.createElement('h3');
    numerosTitulo.textContent = 'Números disponíveis';
    const numeros = document.createElement('p');
    numeros.textContent = censo.numeros;
    conteudo.append(numerosTitulo, numeros);
  }
  const linksTitulo = document.createElement('h3');
  linksTitulo.textContent = 'Onde acessar';
  const links = document.createElement('div');
  links.className = 'dialog-links';
  links.append(...montarLinks(censo.links));
  conteudo.append(linksTitulo, links);
}

let ultimoGatilho;

// Abre o diálogo nativo, que gerencia o foco modal e fecha com Escape.
function abrirDetalhes(censo, gatilho) {
  ultimoGatilho = gatilho;
  montarDetalhesDialog(censo);
  const dialogo = document.querySelector('#census-dialog');
  dialogo.showModal();
  dialogo.querySelector('.dialog-close').focus();
}

function montarLinhaDoTempo() {
  const trilha = document.querySelector('#timeline-track');
  trilha.replaceChildren();
  CENSOS.forEach((censo) => {
    const card = document.createElement('article');
    card.className = 'timeline-card';
    card.dataset.year = String(censo.ano);
    card.dataset.status = censo.status;
    card.dataset.reveal = '';

    const selo = document.createElement('span');
    selo.className = `timeline-status timeline-status--${censo.status}`;
    selo.textContent = censo.status === 'divulgado'
      ? 'Divulgado'
      : censo.status === 'nao-divulgado'
        ? 'Coletado e não divulgado'
        : 'Tema não investigado';
    const ano = document.createElement('h3');
    ano.textContent = String(censo.ano);
    const resumo = document.createElement('p');
    resumo.textContent = censo.resumo;
    const detalhes = document.createElement('button');
    detalhes.type = 'button';
    detalhes.textContent = 'Detalhes';
    detalhes.addEventListener('click', () => abrirDetalhes(censo, detalhes));
    card.append(selo, ano, resumo, detalhes);
    trilha.append(card);
  });
  document.querySelector('#census-count').textContent = `Mostrando ${CENSOS.length} de ${CENSOS.length} censos`;
  initCarrossel(trilha, { autoplay: false });
  observarRevelacao();
}

function filtrarCensos(filtro) {
  const censos = [...document.querySelectorAll('.timeline-card')];
  let visiveis = 0;
  censos.forEach((card) => {
    const mostrar = filtro === 'all'
      || (filtro === 'published' && card.dataset.status === 'divulgado')
      || (filtro === 'without' && card.dataset.status !== 'divulgado');
    card.hidden = !mostrar;
    if (mostrar) visiveis += 1;
  });
  document.querySelectorAll('[data-filter]').forEach((botao) => {
    botao.setAttribute('aria-pressed', String(botao.dataset.filter === filtro));
  });
  const mensagem = `Mostrando ${visiveis} de ${censos.length} censos`;
  document.querySelector('#census-count').textContent = mensagem;
  anunciar(mensagem);
}

function montarPergunta() {
  document.querySelectorAll('.question-table tbody tr').forEach((linha) => {
    [...linha.querySelectorAll('td')].forEach((celula, indice) => {
      celula.dataset.label = indice === 0 ? 'Tipo de campo' : 'Categorias e novidades';
    });
  });
  const slider = document.querySelector('#question-year');
  const rotulos = ['1872', '1960', '2022'];
  const exemplos = [
    '<h3>Qual é a sua religião?</h3><div class="mock-options"><p class="mock-option">◯ Católico</p><p class="mock-option">◯ Acatólico</p></div>',
    '<h3>Qual é a sua religião?</h3><div class="mock-options"><p class="mock-option">□ Católica romana</p><p class="mock-option">□ Protestante</p><p class="mock-option">□ Espírita</p><p class="mock-option">□ Budista</p><p class="mock-option">□ Israelita</p><p class="mock-option">□ Ortodoxa</p><p class="mock-option">□ Maometana</p><p class="mock-option">□ Outra</p><p class="mock-option">□ Sem religião</p></div>',
    '<h3>Qual é a sua religião ou culto?</h3><input class="mock-field" type="text" aria-label="Exemplo de resposta livre de religião" placeholder="Digite sua resposta">'
  ];
  const atualizar = () => {
    const indice = Number(slider.value);
    const ano = rotulos[indice];
    slider.setAttribute('aria-valuetext', ano);
    document.querySelector('#question-year-label').textContent = ano;
    document.querySelector('#form-mock').innerHTML = exemplos[indice];
    anunciar(`Exemplo de formulário do censo de ${ano}.`);
  };
  slider.addEventListener('input', atualizar);
  atualizar();
}

function montarAcessar() {
  const grade = document.querySelector('#resource-grid');
  Object.entries(LINKS).forEach(([chave, link]) => {
    const card = document.createElement('article');
    card.className = 'resource-card';
    const icone = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icone.setAttribute('viewBox', '0 0 24 24');
    icone.setAttribute('aria-hidden', 'true');
    icone.innerHTML = '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm2.1-7.8-.9.9c-.7.7-1.2 1.2-1.2 2.9h-2v-.5c0-1.1.5-2.1 1.2-2.8l1.2-1.2a2 2 0 1 0-3.4-1.4H8a4 4 0 1 1 7.1 2.1Z"/>';
    const titulo = document.createElement('h3');
    titulo.textContent = link.titulo;
    const descricao = document.createElement('p');
    descricao.textContent = link.desc;
    const ancora = document.createElement('a');
    ancora.href = link.url;
    ancora.target = '_blank';
    ancora.rel = 'noopener noreferrer';
    ancora.innerHTML = `Acessar <span aria-hidden="true">↗</span><span class="sr-only">(abre em nova aba)</span>`;
    card.append(icone, titulo, descricao, ancora);
    card.dataset.resource = chave;
    grade.append(card);
  });
  document.querySelector('#copy-citation').addEventListener('click', copiarCitacao);
}

async function copiarCitacao() {
  const data = new Intl.DateTimeFormat('pt-BR').format(new Date());
  const citacao = `IBGE. Censo Demográfico 2022: Religiões – resultados preliminares da amostra. Rio de Janeiro: IBGE, 2025. Disponível em: ${LINKS.pdf2022.url}. Acesso em: ${data}.`;
  let copiada = false;
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(citacao);
      copiada = true;
    } catch (erro) {
      if (!['NotAllowedError', 'SecurityError', 'NotSupportedError'].includes(erro.name)) {
        document.querySelector('#citation-toast').textContent = 'Falha ao copiar a citação. Tente novamente ou copie o texto manualmente.';
        return;
      }
    }
  }
  if (!copiada) {
    const temporario = document.createElement('textarea');
    temporario.value = citacao;
    temporario.setAttribute('readonly', '');
    temporario.style.position = 'fixed';
    temporario.style.opacity = '0';
    document.body.append(temporario);
    temporario.select();
    copiada = document.execCommand('copy');
    temporario.remove();
  }
  document.querySelector('#citation-toast').textContent = copiada
    ? 'Citação copiada'
    : 'Não foi possível copiar. Selecione e copie a citação manualmente.';
}

function configurarTimeline() {
  document.querySelectorAll('[data-filter]').forEach((botao) => {
    botao.addEventListener('click', () => filtrarCensos(botao.dataset.filter));
  });
  document.querySelectorAll('[data-serie]').forEach((botao) => {
    botao.addEventListener('click', () => {
      const id = botao.dataset.serie;
      const grafico = graficos.get('serie');
      const indice = Object.keys(faixas).indexOf(id);
      if (!grafico) criarGrafico('serie');
      const serie = graficos.get('serie');
      if (!serie) return;
      if (seriesAtivas.has(id)) seriesAtivas.delete(id);
      else seriesAtivas.add(id);
      botao.setAttribute('aria-pressed', String(seriesAtivas.has(id)));
      serie.setDatasetVisibility(indice, seriesAtivas.has(id));
      serie.update();
      anunciar(`${faixas[id].nome} ${seriesAtivas.has(id) ? 'mostrada' : 'ocultada'} no gráfico.`);
    });
  });
  const dialogo = document.querySelector('#census-dialog');
  dialogo.addEventListener('close', () => ultimoGatilho?.focus());
  dialogo.addEventListener('click', (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });
}

function observarGraficos() {
  if (!window.Chart) {
    document.querySelector('#chart-fallback').hidden = false;
    document.querySelectorAll('.data-details').forEach((details) => { details.open = true; });
    return;
  }
  observarElementos(document.querySelectorAll('[data-censo-chart]'), (figure) => {
    criarGrafico(figure.dataset.censoChart);
  });
}

function criarGrafico(tipo) {
  if (graficos.has(tipo)) return;
  if (tipo === 'serie') criarSerie();
  if (tipo === 'queda') criarQueda();
}

function aplicarTema() {
  reconstruirTema(graficos, criarGrafico);
}

function scrollspy() {
  if (!('IntersectionObserver' in window)) return;
  const links = [...document.querySelectorAll('.section-nav a')];
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((link) => {
        if (link.hash === `#${entrada.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach((secao) => observer.observe(secao));
}

function observarRevelacao() {
  const caminho = document.querySelector('.timeline-wave');
  if (!('IntersectionObserver' in window)) {
    caminho.classList.add('is-drawn');
    return;
  }
  const observer = new IntersectionObserver((entradas, instancia) => {
    if (!entradas.some((entrada) => entrada.isIntersecting)) return;
    caminho.classList.add('is-drawn');
    instancia.disconnect();
  }, { threshold: 0.2 });
  observer.observe(document.querySelector('#linha-do-tempo'));
}

function iniciar() {
  montarTabelas();
  montarLinhaDoTempo();
  montarPergunta();
  montarAcessar();
  configurarTimeline();
  document.querySelector('.no-census-note').textContent = `Anos em que não houve censo: ${ANOS_SEM_CENSO.join(', ')} (conturbações políticas).`;
  scrollspy();
  observarGraficos();
  temaEscuro.addEventListener('change', aplicarTema);
  movimentoReduzido.addEventListener('change', aplicarTema);
}

document.addEventListener('DOMContentLoaded', iniciar, { once: true });
