import {
  COMPARATIVO,
  COR_POR_RELIGIAO,
  DENOMINACOES_2022,
  EVANGELICOS_NAO_DETERMINADOS,
  GRUPOS,
  IDADES,
  INDICADORES,
  INSTRUCAO,
  REGIOES,
  RELIGIAO_POR_COR,
  SEXO
} from './dados-ibge.js';

const numero = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const graficos = new Map();
const observados = new WeakSet();
const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
const temaEscuro = window.matchMedia('(prefers-color-scheme: dark)');
const donutVisivel = GRUPOS.map(() => true);
let observadorGraficos;

const gruposRegionais = GRUPOS.filter((grupo) => grupo.id !== 'naosabe');
const coresRaca = ['--c-race-white', '--c-race-black', '--c-race-yellow', '--c-race-brown', '--c-race-indigenous'];
const rotulosRaca = ['Branca', 'Preta', 'Amarela', 'Parda', 'Indígena'];

function formatar(valor) {
  return `${numero.format(valor)}%`;
}

function lerCor(variavel) {
  return getComputedStyle(document.documentElement).getPropertyValue(variavel).trim();
}

function rgba(cor, alpha) {
  const hex = cor.replace('#', '');
  const completo = hex.length === 3 ? hex.split('').map((parte) => parte + parte).join('') : hex;
  const valor = Number.parseInt(completo, 16);
  return `rgba(${(valor >> 16) & 255}, ${(valor >> 8) & 255}, ${valor & 255}, ${alpha})`;
}

function paletaGrupos(grupos = GRUPOS) {
  return grupos.map((grupo) => lerCor(grupo.cssVar));
}

function anunciar(mensagem) {
  document.querySelector('#live-region').textContent = mensagem;
}

// Gera tabelas com cabeçalhos semânticos, números pt-BR e um caption descritivo.
function gerarTabela(alvo, titulo, cabecalhos, linhas, opcoes = {}) {
  const container = typeof alvo === 'string' ? document.querySelector(`[data-table="${alvo}"]`) : alvo;
  if (!container) return;

  const tabela = document.createElement('table');
  tabela.className = 'data-table';
  const caption = document.createElement('caption');
  caption.textContent = titulo;
  tabela.append(caption);

  const thead = document.createElement('thead');
  const linhaCabecalho = document.createElement('tr');
  cabecalhos.forEach((cabecalho) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = cabecalho;
    linhaCabecalho.append(th);
  });
  thead.append(linhaCabecalho);
  tabela.append(thead);

  const tbody = document.createElement('tbody');
  linhas.forEach((linha, indice) => {
    const tr = document.createElement('tr');
    if (opcoes.rowKeys) tr.dataset.rowKey = opcoes.rowKeys[indice];
    if (opcoes.rowKeys) tr.tabIndex = 0;
    linha.forEach((valor, coluna) => {
      const celula = document.createElement(coluna === 0 ? 'th' : 'td');
      if (coluna === 0) celula.scope = 'row';
      celula.textContent = valor;
      tr.append(celula);
    });
    tbody.append(tr);
  });
  tabela.append(tbody);

  const scroll = document.createElement('div');
  scroll.className = 'table-scroll';
  scroll.append(tabela);
  container.replaceChildren(scroll);
}

function tabelaGrupos(chave, titulo, cabecalhos, linhas, rowKeys) {
  gerarTabela(chave, titulo, cabecalhos, linhas, { rowKeys });
}

function montarTabelasIniciais() {
  montarLegendaAcessivel();
  const cabecalhoGrupos = GRUPOS.map((grupo) => grupo.nome);
  const comparativo = GRUPOS.map((grupo, indice) => [
    grupo.nome,
    formatar(COMPARATIVO[2010][indice]),
    formatar(COMPARATIVO[2022][indice])
  ]);
  gerarTabela('comparison', 'Percentual por grupo religioso, população de 10 anos ou mais', ['Grupo', '2010', '2022'], comparativo);
  tabelaGrupos(
    'donut',
    'Distribuição por grupo religioso em 2010 e 2022',
    ['Grupo', '2010', '2022'],
    comparativo,
    GRUPOS.map((grupo) => grupo.id)
  );
  tabelaGrupos('donut-mini', 'Percentuais por grupo religioso', ['Grupo', '2010', '2022'], comparativo, GRUPOS.map((grupo) => grupo.id));

  gerarTabela(
    'denominations',
    'Denominações declaradas em 2022',
    ['Denominação', 'Percentual', 'Pessoas'],
    DENOMINACOES_2022.map((item) => [item.nome, formatar(item.pct), item.pessoas ?? 'Não informado'])
  );
  gerarTabela(
    'evangelicals',
    'Evangélicos não determinados',
    ['Ano', 'Percentual'],
    Object.entries(EVANGELICOS_NAO_DETERMINADOS).map(([ano, valor]) => [ano, formatar(valor)])
  );

  const linhasRegiao = Object.entries(REGIOES).map(([regiao, valores]) => [
    regiao,
    ...valores.map(formatar)
  ]);
  gerarTabela('regions', 'Percentual por Grande Região', ['Região', ...gruposRegionais.map((grupo) => grupo.nome)], linhasRegiao);

  gerarTabela(
    'ages',
    'Percentual por faixa etária e grupo religioso',
    ['Faixa etária', ...cabecalhoGrupos],
    Object.entries(IDADES).map(([faixa, valores]) => [faixa, ...valores.map(formatar)])
  );
  gerarTabela(
    'sex',
    'Composição por sexo em cada grupo religioso',
    ['Grupo', 'Homens', 'Mulheres'],
    Object.entries(SEXO).map(([grupo, valores]) => [grupo, ...valores.map(formatar)])
  );
  atualizarTabelaCor();
  gerarTabela(
    'color-religion',
    'Composição por cor ou raça em cada grupo religioso',
    ['Grupo', ...rotulosRaca],
    Object.entries(COR_POR_RELIGIAO).map(([grupo, valores]) => [grupo, ...valores.map(formatar)])
  );
  gerarTabela(
    'instruction',
    'Nível de instrução por grupo religioso, população de 25 anos ou mais',
    ['Grupo', 'Sem instrução/fundamental incompleto', 'Fundamental completo/médio incompleto', 'Médio completo/superior incompleto', 'Superior completo'],
    Object.entries(INSTRUCAO).map(([grupo, valores]) => [grupo, ...valores.map(formatar)])
  );
  atualizarTabelaIndicadores();
}

function montarLegendaAcessivel() {
  const legenda = document.querySelector('#donut-legend');
  GRUPOS.forEach((grupo, indice) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.dataset.legendIndex = String(indice);
    botao.setAttribute('aria-pressed', 'true');
    botao.style.setProperty('--legend-color', lerCor(grupo.cssVar));
    botao.textContent = grupo.nome;
    legenda.append(botao);
  });
}

function atualizarTabelaCor() {
  const cor = document.querySelector('#race-select')?.value ?? 'Branca';
  const valores = RELIGIAO_POR_COR[cor];
  gerarTabela(
    'race-religion',
    `Religiões declaradas entre pessoas de cor ou raça ${cor}`,
    ['Grupo religioso', 'Percentual'],
    gruposRegionais.map((grupo, indice) => [grupo.nome, formatar(valores[indice])])
  );
  const detalhes = document.querySelector('[data-table="race-religion"]')?.closest('details');
  if (detalhes?.open) anunciar(`Tabela atualizada para cor ou raça ${cor}.`);
}

function atualizarTabelaIndicadores() {
  const chave = document.querySelector('#indicator-select')?.value ?? 'analfabetismo15';
  const valores = INDICADORES[chave];
  gerarTabela(
    'indicators',
    'Indicador social por grupo religioso',
    ['Grupo', 'Percentual'],
    Object.entries(valores).map(([grupo, valor]) => [grupo, formatar(valor)])
  );
}

function opcoesBase() {
  const texto = lerCor('--ink');
  const textoSuave = lerCor('--ink-soft');
  const grade = lerCor('--line');
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: movimentoReduzido.matches ? false : { duration: 450 },
    plugins: {
      legend: { labels: { color: texto, usePointStyle: true, padding: 16 } },
      tooltip: {
        backgroundColor: lerCor('--surface'),
        titleColor: texto,
        bodyColor: texto,
        borderColor: grade,
        borderWidth: 1,
        callbacks: { label: (context) => `${context.dataset.label}: ${formatar(context.parsed.x ?? context.parsed.y ?? context.raw)}` }
      }
    },
    scales: {
      x: {
        ticks: { color: textoSuave },
        grid: { color: grade }
      },
      y: {
        ticks: { color: textoSuave },
        grid: { color: grade }
      }
    }
  };
}

function criarInstancia(id, tipo, dados, opcoes = {}, plugins = []) {
  const canvas = document.getElementById(id);
  if (!canvas || !window.Chart) return null;
  const configuracao = {
    type: tipo,
    data: dados,
    plugins,
    options: { ...opcoesBase(), ...opcoes }
  };
  const instancia = new window.Chart(canvas, configuracao);
  graficos.set(id, instancia);
  return instancia;
}

function atualizarTabelaDoughnut(index) {
  document.querySelectorAll('[data-table="donut-mini"] tbody tr').forEach((linha, linhaIndex) => {
    linha.classList.toggle('is-highlighted', linhaIndex === index);
  });
}

function criarGraficoComparativo() {
  const modo = document.querySelector('input[name="comparison-mode"]:checked')?.value ?? 'grouped';
  const cores = paletaGrupos();
  const agrupado = modo === 'grouped';
  const datasets = agrupado
    ? [
        { label: '2010', data: GRUPOS.map((_, i) => COMPARATIVO[2010][i]), backgroundColor: cores.map((cor) => rgba(cor, 0.48)), borderColor: cores, borderWidth: 1 },
        { label: '2022', data: GRUPOS.map((_, i) => COMPARATIVO[2022][i]), backgroundColor: cores, borderColor: cores, borderWidth: 1 }
      ]
    : [{
        label: 'Variação em pontos percentuais',
        data: GRUPOS.map((_, i) => Number((COMPARATIVO[2022][i] - COMPARATIVO[2010][i]).toFixed(1))),
        backgroundColor: cores,
        borderColor: cores,
        borderWidth: 1
      }];
  const config = opcoesBase();
  config.indexAxis = 'y';
  config.scales.x.beginAtZero = !agrupado;
  config.scales.x.min = agrupado ? 0 : undefined;
  config.scales.x.max = agrupado ? undefined : undefined;
  config.scales.x.ticks.callback = (valor) => formatar(valor);
  config.plugins.tooltip.callbacks.label = (context) => {
    const valor = context.parsed.x;
    return agrupado
      ? `${context.dataset.label}: ${formatar(valor)}`
      : `${valor > 0 ? '+' : valor < 0 ? '−' : ''}${numero.format(Math.abs(valor))} p.p.`;
  };
  if (!agrupado) {
    config.scales.x.ticks.callback = (valor) => `${valor > 0 ? '+' : valor < 0 ? '−' : ''}${numero.format(Math.abs(valor))} p.p.`;
  } else {
    config.scales.x.ticks.callback = (valor) => formatar(valor);
  }
  config.scales.x.grid = { ...config.scales.x.grid, ...(agrupado ? {} : { zeroLineColor: lerCor('--ink-soft') }) };
  crearInstancia('chart-comparison', 'bar', {
    labels: GRUPOS.map((grupo) => grupo.nome),
    datasets
  }, config);
}

function criarRosca() {
  const ano = document.querySelector('.year-button[aria-pressed="true"]')?.dataset.year ?? '2010';
  const pluginCentro = {
    id: 'textoCentroAno',
    afterDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;
      ctx.save();
      ctx.fillStyle = lerCor('--ink');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '700 1.35rem system-ui';
      ctx.fillText(String(chart.$ano), (chartArea.left + chartArea.right) / 2, (chartArea.top + chartArea.bottom) / 2);
      ctx.restore();
    }
  };
  const instancia = criarInstancia('chart-donut', 'doughnut', {
    labels: GRUPOS.map((grupo) => grupo.nome),
    datasets: [{ data: COMPARATIVO[ano], backgroundColor: paletaGrupos(), borderColor: lerCor('--surface'), borderWidth: 2 }]
  }, {
    cutout: '68%',
    plugins: {
      ...opcoesBase().plugins,
      legend: {
        position: 'bottom',
        labels: { color: lerCor('--ink'), usePointStyle: true, padding: 14 },
        onClick(evento, item, legenda) {
          const indice = item.index;
          donutVisivel[indice] = !legenda.chart.getDataVisibility(indice);
          legenda.chart.toggleDataVisibility(indice);
          legenda.chart.update();
          atualizarBotoesLegenda();
        }
      },
      tooltip: { ...opcoesBase().plugins.tooltip, callbacks: { label: (context) => `${context.label}: ${formatar(context.raw)}` } }
    }
  }, [pluginCentro]);
  if (!instancia) return;
  instancia.$ano = ano;
  donutVisivel.forEach((visivel, indice) => {
    if (!visivel) instancia.toggleDataVisibility(indice);
  });
  instancia.options.onHover = (_, elements) => {
    if (elements.length) atualizarTabelaDoughnut(elements[0].index);
  };
  atualizarBotoesLegenda();
  instancia.update('none');
}

function atualizarBotoesLegenda() {
  document.querySelectorAll('[data-legend-index]').forEach((botao) => {
    const indice = Number(botao.dataset.legendIndex);
    botao.setAttribute('aria-pressed', String(donutVisivel[indice]));
    botao.style.setProperty('--legend-color', lerCor(GRUPOS[indice].cssVar));
  });
}

function criarDenominacoes() {
  const familiaParaCor = new Map(GRUPOS.map((grupo) => [grupo.id, lerCor(grupo.cssVar)]));
  const itens = [...DENOMINACOES_2022].sort((a, b) => b.pct - a.pct);
  const config = opcoesBase();
  config.indexAxis = 'y';
  config.plugins.legend.display = false;
  config.scales.x.beginAtZero = true;
  config.scales.x.ticks.callback = (valor) => formatar(valor);
  criarInstancia('chart-denominations', 'bar', {
    labels: itens.map((item) => item.nome),
    datasets: [{
      label: 'População de 10 anos ou mais',
      data: itens.map((item) => item.pct),
      backgroundColor: itens.map((item) => familiaParaCor.get(item.familia) ?? lerCor('--c-outras')),
      borderWidth: 0
    }]
  }, config);
}

function criarEvangelicos() {
  const config = opcoesBase();
  config.plugins.legend.display = false;
  config.scales.y.beginAtZero = true;
  config.scales.y.ticks.callback = (valor) => formatar(valor);
  criarInstancia('chart-evangelicals', 'bar', {
    labels: Object.keys(EVANGELICOS_NAO_DETERMINADOS),
    datasets: [{
      label: 'Evangélicos não determinados',
      data: Object.values(EVANGELICOS_NAO_DETERMINADOS),
      backgroundColor: [rgba(lerCor('--c-evangelicas'), 0.55), lerCor('--c-evangelicas')]
    }]
  }, config);
}

function criarRegioes() {
  const ordenarPor = Number(document.querySelector('#region-sort')?.value ?? 0);
  const regioes = Object.entries(REGIOES).sort((a, b) => b[1][ordenarPor] - a[1][ordenarPor]);
  const config = opcoesBase();
  config.indexAxis = 'y';
  config.scales.x.stacked = true;
  config.scales.x.max = 100;
  config.scales.x.ticks.callback = (valor) => formatar(valor);
  config.scales.y.stacked = true;
  config.plugins.legend.position = 'bottom';
  config.onClick = (_, elements) => {
    if (!elements.length) return;
    const index = elements[0].index;
    selecionarRegiao(regioes[index][0]);
  };
  criarInstancia('chart-regions', 'bar', {
    labels: regioes.map(([nome]) => nome),
    datasets: gruposRegionais.map((grupo, indice) => ({
      label: grupo.nome,
      data: regioes.map(([, valores]) => valores[indice]),
      backgroundColor: lerCor(grupo.cssVar),
      stack: 'religioes'
    }))
  }, config);
}

function selecionarRegiao(nome) {
  const valores = REGIOES[nome];
  const painel = document.querySelector('#region-detail');
  painel.replaceChildren();
  const titulo = document.createElement('h3');
  titulo.textContent = nome;
  const resumo = document.createElement('p');
  resumo.textContent = gruposRegionais.map((grupo, indice) => `${grupo.nome}: ${formatar(valores[indice])}`).join(' · ');
  painel.append(titulo, resumo);
  document.querySelector('#region-select').value = nome;
  anunciar(`Região selecionada: ${nome}.`);
}

function criarIdades() {
  const extrasAtivos = new Set(
    [...document.querySelectorAll('[data-age-group][aria-pressed="true"]')].map((botao) => botao.dataset.ageGroup)
  );
  const escolhidos = ['catolica', 'evangelicas', 'sem', ...extrasAtivos];
  const config = opcoesBase();
  config.plugins.legend.position = 'bottom';
  config.scales.y.beginAtZero = true;
  config.scales.y.max = 80;
  config.scales.y.ticks.callback = (valor) => formatar(valor);
  const annotation = {
    id: 'anotacoesIdade',
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      const pontos = [
        { grupo: 'sem', indice: 2, texto: 'Sem religião: 14,3% (pico)', dx: 8, dy: -12 },
        { grupo: 'catolica', indice: 9, texto: 'Católicos: 72,0%', dx: -105, dy: -12 }
      ];
      pontos.forEach((ponto) => {
        if (!escolhidos.includes(ponto.grupo)) return;
        const datasetIndex = escolhidos.indexOf(ponto.grupo);
        const pontoMeta = chart.getDatasetMeta(datasetIndex).data[ponto.indice];
        if (!pontoMeta) return;
        ctx.save();
        ctx.font = '600 11px system-ui';
        ctx.fillStyle = lerCor('--ink');
        ctx.fillText(ponto.texto, pontoMeta.x + ponto.dx, pontoMeta.y + ponto.dy);
        ctx.restore();
      });
    }
  };
  const datasets = escolhidos.map((id) => {
    const grupo = GRUPOS.find((item) => item.id === id);
    const indice = GRUPOS.indexOf(grupo);
    const cor = lerCor(grupo.cssVar);
    return {
      label: grupo.nome,
      data: Object.values(IDADES).map((valores) => valores[indice]),
      borderColor: cor,
      backgroundColor: cor,
      tension: 0.25
    };
  });
  criarInstancia('chart-ages', 'line', {
    labels: Object.keys(IDADES),
    datasets
  }, {
    ...config
  }, [annotation]);
}

function criarSexo() {
  const grupos = Object.entries(SEXO).filter(([nome]) => nome !== 'Total');
  const config = opcoesBase();
  config.indexAxis = 'y';
  config.scales.x.stacked = true;
  config.scales.x.max = 100;
  config.scales.x.ticks.callback = (valor) => formatar(valor);
  config.scales.y.stacked = true;
  config.plugins.legend.position = 'bottom';
  criarInstancia('chart-sex', 'bar', {
    labels: grupos.map(([nome]) => nome),
    datasets: [
      { label: 'Homens', data: grupos.map(([, valores]) => valores[0]), backgroundColor: grupos.map(([,], index) => rgba(lerCor(GRUPOS[index]?.cssVar ?? '--c-outras'), 0.48)), stack: 'sexo' },
      { label: 'Mulheres', data: grupos.map(([, valores]) => valores[1]), backgroundColor: grupos.map(([,], index) => lerCor(GRUPOS[index]?.cssVar ?? '--c-outras')), stack: 'sexo' }
    ]
  }, config);
}

function criarCorRaca() {
  const cor = document.querySelector('#race-select').value;
  const valores = RELIGIAO_POR_COR[cor];
  const config = opcoesBase();
  config.plugins.legend.position = 'bottom';
  criarInstancia('chart-race-religion', 'doughnut', {
    labels: gruposRegionais.map((grupo) => grupo.nome),
    datasets: [{
      label: `Cor ou raça ${cor}`,
      data: valores,
      backgroundColor: paletaGrupos(gruposRegionais),
      borderColor: lerCor('--surface'),
      borderWidth: 2
    }]
  }, {
    ...config,
    cutout: '62%',
    plugins: { ...config.plugins, legend: { position: 'bottom', labels: { color: lerCor('--ink'), usePointStyle: true } } }
  });
  atualizarTabelaCor();
}

function criarComposicaoCor() {
  const grupos = Object.entries(COR_POR_RELIGIAO);
  const config = opcoesBase();
  config.indexAxis = 'y';
  config.scales.x.stacked = true;
  config.scales.x.max = 100;
  config.scales.x.ticks.callback = (valor) => formatar(valor);
  config.scales.y.stacked = true;
  config.plugins.legend.position = 'bottom';
  criarInstancia('chart-color-religion', 'bar', {
    labels: grupos.map(([nome]) => nome),
    datasets: rotulosRaca.map((nome, indice) => ({
      label: nome,
      data: grupos.map(([, valores]) => valores[indice]),
      backgroundColor: lerCor(coresRaca[indice]),
      stack: 'cor-raca'
    }))
  }, config);
}

function criarInstrucao() {
  const linhas = Object.entries(INSTRUCAO).filter(([nome]) => nome !== 'Total');
  const niveis = [
    'Sem instrução/fundamental incompleto',
    'Fundamental completo/médio incompleto',
    'Médio completo/superior incompleto',
    'Superior completo'
  ];
  const config = opcoesBase();
  config.indexAxis = 'y';
  config.scales.x.stacked = true;
  config.scales.x.max = 100;
  config.scales.x.ticks.callback = (valor) => formatar(valor);
  config.scales.y.stacked = true;
  config.plugins.legend.position = 'bottom';
  criarInstancia('chart-instruction', 'bar', {
    labels: linhas.map(([grupo]) => grupo),
    datasets: niveis.map((nome, indice) => ({
      label: nome,
      data: linhas.map(([, valores]) => valores[indice]),
      backgroundColor: lerCor(`--c-neutral-${indice + 1}`),
      stack: 'instrucao'
    }))
  }, config);
}

function criarIndicadores() {
  const chave = document.querySelector('#indicator-select').value;
  const indicadores = INDICADORES[chave];
  const linhas = Object.entries(indicadores).filter(([grupo]) => grupo !== 'Total').sort((a, b) => b[1] - a[1]);
  const config = opcoesBase();
  config.indexAxis = 'y';
  config.scales.x.beginAtZero = true;
  config.scales.x.max = 100;
  config.scales.x.ticks.callback = (valor) => formatar(valor);
  config.plugins.legend.display = false;
  config.plugins.tooltip.callbacks.label = (context) => formatar(context.parsed.x);
  const total = indicadores.Total;
  const pluginTotal = total === undefined ? [] : [{
    id: 'totalBrasil',
    afterDatasetsDraw(chart) {
      const x = chart.scales.x.getPixelForValue(total);
      const ctx = chart.ctx;
      ctx.save();
      ctx.strokeStyle = lerCor('--ink-soft');
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(x, chart.chartArea.top);
      ctx.lineTo(x, chart.chartArea.bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = lerCor('--ink-soft');
      ctx.font = '11px system-ui';
      ctx.fillText(`Brasil: ${formatar(total)}`, x + 4, chart.chartArea.top + 12);
      ctx.restore();
    }
  }];
  criarInstancia('chart-indicators', 'bar', {
    labels: linhas.map(([grupo]) => grupo),
    datasets: [{
      label: document.querySelector('#indicator-select').selectedOptions[0].textContent,
      data: linhas.map(([, valor]) => valor),
      backgroundColor: linhas.map(([grupo]) => {
        const grupoDados = GRUPOS.find((item) => item.nome === grupo || (grupo === 'Católica' && item.id === 'catolica'));
        return lerCor(grupoDados?.cssVar ?? '--c-outras');
      })
    }]
  }, config, pluginTotal);
  atualizarTabelaIndicadores();
}

const criadores = {
  comparison: criarGraficoComparativo,
  donut: criarRosca,
  denominations: criarDenominacoes,
  evangelicals: criarEvangelicos,
  regions: criarRegioes,
  ages: criarIdades,
  sex: criarSexo,
  'race-religion': criarCorRaca,
  'color-religion': criarComposicaoCor,
  instruction: criarInstrucao,
  indicators: criarIndicadores
};

function criarGrafico(chave) {
  const canvasId = {
    comparison: 'chart-comparison',
    donut: 'chart-donut',
    denominations: 'chart-denominations',
    evangelicals: 'chart-evangelicals',
    regions: 'chart-regions',
    ages: 'chart-ages',
    sex: 'chart-sex',
    'race-religion': 'chart-race-religion',
    'color-religion': 'chart-color-religion',
    instruction: 'chart-instruction',
    indicators: 'chart-indicators'
  }[chave];
  if (!canvasId || graficos.has(canvasId)) return;
  criadores[chave]?.();
}

function observarGraficos() {
  if (!window.Chart) {
    document.querySelector('#chart-fallback').hidden = false;
    document.querySelector('#donut-legend').hidden = true;
    document.querySelectorAll('.data-details').forEach((details) => { details.open = true; });
    return;
  }
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-chart]').forEach((figure) => criarGrafico(figure.dataset.chart));
    return;
  }
  if (!observadorGraficos) {
    observadorGraficos = new IntersectionObserver((entradas, observer) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        criarGrafico(entrada.target.dataset.chart);
        observer.unobserve(entrada.target);
        observados.add(entrada.target);
      });
    }, { rootMargin: '140px 0px' });
  }
  document.querySelectorAll('[data-chart]').forEach((figure) => {
    if (observados.has(figure) || figure.closest('[hidden]')) return;
    observadorGraficos.observe(figure);
  });
}

function aplicarTema() {
  if (!window.Chart) return;
  atualizarBotoesLegenda();
  const idsCriados = [...graficos.keys()];
  idsCriados.forEach((id) => {
    graficos.get(id)?.destroy();
    graficos.delete(id);
  });
  idsCriados.forEach((id) => {
    const chave = Object.entries({
      'chart-comparison': 'comparison',
      'chart-donut': 'donut',
      'chart-denominations': 'denominations',
      'chart-evangelicals': 'evangelicals',
      'chart-regions': 'regions',
      'chart-ages': 'ages',
      'chart-sex': 'sex',
      'chart-race-religion': 'race-religion',
      'chart-color-religion': 'color-religion',
      'chart-instruction': 'instruction',
      'chart-indicators': 'indicators'
    }).find(([canvasId]) => canvasId === id)?.[1];
    if (chave) criadores[chave]();
  });
}

function animarContadores() {
  const contadores = document.querySelectorAll('[data-counter]');
  const atualizar = (elemento) => {
    const final = Number(elemento.dataset.counter);
    if (movimentoReduzido.matches) {
      elemento.textContent = numero.format(final);
      return;
    }
    const inicio = performance.now();
    const duracao = 1200;
    const passo = (agora) => {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const suavizado = 1 - (1 - progresso) ** 3;
      elemento.textContent = numero.format(final * suavizado);
      if (progresso < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  if (!('IntersectionObserver' in window)) {
    contadores.forEach(atualizar);
    return;
  }
  const observador = new IntersectionObserver((entradas, instancia) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      atualizar(entrada.target);
      instancia.unobserve(entrada.target);
    });
  }, { threshold: 0.5 });
  contadores.forEach((contador) => observador.observe(contador));
}

function configurarControles() {
  document.querySelectorAll('input[name="comparison-mode"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      destruirECriar('chart-comparison', criarGraficoComparativo);
      anunciar(`Modo de comparação: ${radio.value === 'change' ? 'variação em pontos percentuais' : 'lado a lado'}.`);
    });
  });
  document.querySelectorAll('.year-button[data-year]').forEach((botao) => {
    botao.addEventListener('click', () => {
      document.querySelectorAll('.year-button[data-year]').forEach((outro) => outro.setAttribute('aria-pressed', String(outro === botao)));
      destruirECriar('chart-donut', criarRosca);
      atualizarTabelaDoughnut(-1);
      anunciar(`Distribuição selecionada para ${botao.dataset.year}.`);
    });
  });
  document.querySelectorAll('[data-legend-index]').forEach((botao) => {
    botao.addEventListener('focusin', () => atualizarTabelaDoughnut(Number(botao.dataset.legendIndex)));
    botao.addEventListener('click', () => {
      const indice = Number(botao.dataset.legendIndex);
      if (!graficos.has('chart-donut')) criarGrafico('donut');
      const instancia = graficos.get('chart-donut');
      if (!instancia) return;
      donutVisivel[indice] = !donutVisivel[indice];
      instancia.toggleDataVisibility(indice);
      instancia.update();
      atualizarTabelaDoughnut(indice);
      atualizarBotoesLegenda();
      anunciar(`${GRUPOS[indice].nome} ${donutVisivel[indice] ? 'mostrado' : 'ocultado'} no gráfico.`);
    });
  });
  document.querySelector('#region-sort').addEventListener('change', () => {
    destruirECriar('chart-regions', criarRegioes);
    anunciar(`Regiões ordenadas por ${document.querySelector('#region-sort').selectedOptions[0].textContent}.`);
  });
  document.querySelector('#race-select').addEventListener('change', () => {
    destruirECriar('chart-race-religion', criarCorRaca);
    atualizarTabelaCor();
    anunciar(`Distribuição atualizada para pessoas de cor ou raça ${document.querySelector('#race-select').value}.`);
  });
  document.querySelector('#indicator-select').addEventListener('change', () => {
    destruirECriar('chart-indicators', criarIndicadores);
    anunciar(`Indicador selecionado: ${document.querySelector('#indicator-select').selectedOptions[0].textContent}.`);
  });
  document.querySelector('#region-select').addEventListener('change', (evento) => selecionarRegiao(evento.target.value));
  document.querySelectorAll('[data-age-group]').forEach((botao) => {
    botao.addEventListener('click', () => {
      const ativado = botao.getAttribute('aria-pressed') !== 'true';
      botao.setAttribute('aria-pressed', String(ativado));
      destruirECriar('chart-ages', criarIdades);
      anunciar(`${botao.textContent} ${ativado ? 'adicionado' : 'removido'} do gráfico.`);
    });
  });
  document.querySelectorAll('[role="tab"]').forEach((aba, indice, abas) => {
    aba.addEventListener('click', () => selecionarAba(aba));
    aba.addEventListener('keydown', (evento) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(evento.key)) return;
      evento.preventDefault();
      const proximo = evento.key === 'Home' ? 0
        : evento.key === 'End' ? abas.length - 1
          : (indice + (evento.key === 'ArrowRight' ? 1 : -1) + abas.length) % abas.length;
      abas[proximo].focus();
      selecionarAba(abas[proximo]);
    });
  });

}

function selecionarAba(abaSelecionada) {
  document.querySelectorAll('[role="tab"]').forEach((aba) => {
    const selecionada = aba === abaSelecionada;
    aba.setAttribute('aria-selected', String(selecionada));
    aba.tabIndex = selecionada ? 0 : -1;
    document.getElementById(aba.getAttribute('aria-controls')).hidden = !selecionada;
  });
  observarGraficos();
  anunciar(`Visão selecionada: ${abaSelecionada.textContent}.`);
}

function destruirECriar(id, criar) {
  const instancia = graficos.get(id);
  if (!instancia) {
    const figura = document.querySelector(`#${id}`)?.closest('[data-chart]');
    if (figura && !figura.closest('[hidden]')) criarGrafico(figura.dataset.chart);
    return;
  }
  instancia.destroy();
  graficos.delete(id);
  criar();
}

function configurarScrollspy() {
  if (!('IntersectionObserver' in window)) return;
  const secoes = document.querySelectorAll('main section[id]');
  const links = [...document.querySelectorAll('.section-nav a')];
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((link) => {
        if (link.hash === `#${entrada.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  secoes.forEach((secao) => observador.observe(secao));
}

function configurarDestaquesDoughnut() {
  const tabela = document.querySelector('[data-table="donut-mini"]');
  tabela.addEventListener('mouseover', (evento) => {
    const linha = evento.target.closest('tr');
    if (linha?.parentElement.tagName === 'TBODY') atualizarTabelaDoughnut([...linha.parentElement.children].indexOf(linha));
  });
  tabela.addEventListener('focusin', (evento) => {
    const linha = evento.target.closest('tr');
    if (linha?.parentElement.tagName === 'TBODY') atualizarTabelaDoughnut([...linha.parentElement.children].indexOf(linha));
  });
}

function iniciar() {
  document.querySelector('#js-fallback').hidden = true;
  montarTabelasIniciais();
  document.querySelector('#region-select').value = Object.keys(REGIOES)[0];
  configurarControles();
  configurarDestaquesDoughnut();
  configurarScrollspy();
  animarContadores();
  observarGraficos();
  temaEscuro.addEventListener('change', aplicarTema);
  movimentoReduzido.addEventListener('change', aplicarTema);
}

document.addEventListener('DOMContentLoaded', iniciar, { once: true });
