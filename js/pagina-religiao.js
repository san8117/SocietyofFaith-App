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
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const ativar = (tab) => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
  };
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
iniciarGraficos();
observadorTema.addEventListener('change', () => aplicarTema(graficos, criarGrafico));
