export const formatadorPtBr = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

export function formatarNumero(valor) {
  return formatadorPtBr.format(valor);
}

export function formatarPercentual(valor) {
  return `${formatarNumero(valor)}%`;
}

export function lerCor(cssVar, elemento = document.documentElement) {
  return getComputedStyle(elemento).getPropertyValue(cssVar).trim();
}

export function obterFonteGrafico() {
  return getComputedStyle(document.documentElement).getPropertyValue('--font-sans').trim() || 'sans-serif';
}

export function atualizarFonteGrafico() {
  if (window.Chart) window.Chart.defaults.font.family = obterFonteGrafico();
}

export function opcoesBase(tema = {}) {
  atualizarFonteGrafico();
  const tinta = tema.ink ?? lerCor('--ink');
  const tintaSuave = tema.inkSoft ?? lerCor('--ink-soft');
  const linha = tema.line ?? lerCor('--line');
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: tema.reducedMotion ?? matchMedia('(prefers-reduced-motion: reduce)').matches
      ? false
      : { duration: tema.duration ?? 450 },
    plugins: {
      legend: { labels: { color: tinta, usePointStyle: true, padding: 16 } },
      tooltip: {
        backgroundColor: tema.surface ?? lerCor('--surface'),
        titleColor: tinta,
        bodyColor: tinta,
        borderColor: linha,
        borderWidth: 1
      }
    },
    scales: {
      x: { ticks: { color: tintaSuave }, grid: { color: linha } },
      y: { ticks: { color: tintaSuave }, grid: { color: linha } }
    }
  };
}

export function gerarTabela(container, titulo, colunas, linhas, opcoes = {}) {
  if (!container) return null;
  const tabela = document.createElement('table');
  tabela.className = opcoes.className ?? 'data-table';
  const caption = document.createElement('caption');
  caption.textContent = titulo;
  tabela.append(caption);

  const thead = document.createElement('thead');
  const linhaCabecalho = document.createElement('tr');
  colunas.forEach((coluna) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = coluna;
    linhaCabecalho.append(th);
  });
  thead.append(linhaCabecalho);
  tabela.append(thead);

  const tbody = document.createElement('tbody');
  linhas.forEach((linha, indice) => {
    const tr = document.createElement('tr');
    if (opcoes.rowKeys) {
      tr.dataset.rowKey = opcoes.rowKeys[indice];
      tr.tabIndex = 0;
    }
    linha.forEach((valor, coluna) => {
      const celula = document.createElement(coluna === 0 ? 'th' : 'td');
      if (coluna === 0) celula.scope = 'row';
      celula.textContent = valor;
      tr.append(celula);
    });
    tbody.append(tr);
  });
  tabela.append(tbody);

  const rolagem = document.createElement('div');
  rolagem.className = 'table-scroll';
  rolagem.append(tabela);
  container.replaceChildren(rolagem);
  return tabela;
}

export function observarGraficos(elementos, criar, options = {}) {
  const lista = [...elementos];
  if (!('IntersectionObserver' in window)) {
    lista.forEach(criar);
    return null;
  }
  const observador = new IntersectionObserver((entradas, instancia) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      criar(entrada.target);
      if (options.once !== false) instancia.unobserve(entrada.target);
    });
  }, { rootMargin: options.rootMargin ?? '140px 0px', threshold: options.threshold ?? 0 });
  lista.forEach((elemento) => observador.observe(elemento));
  return observador;
}

export function animarContadores(elementos, options = {}) {
  const contadores = [...elementos];
  const reduzir = options.reducedMotion ?? matchMedia('(prefers-reduced-motion: reduce)').matches;
  const formatar = options.formatter ?? formatarNumero;
  const animar = (elemento) => {
    const final = Number(elemento.dataset.counter);
    if (!Number.isFinite(final)) return;
    if (reduzir) {
      elemento.textContent = formatar(final);
      return;
    }
    const inicio = performance.now();
    const duracao = options.duration ?? 1200;
    const passo = (agora) => {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      elemento.textContent = formatar(final * (1 - (1 - progresso) ** 3));
      if (progresso < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  if (reduzir || !('IntersectionObserver' in window)) {
    contadores.forEach(animar);
    return null;
  }
  return observarGraficos(contadores, (entrada) => animar(entrada.target), {
    threshold: 0.5,
    once: true,
    rootMargin: '0px'
  });
}

export function aplicarTema(graficos, recriar) {
  atualizarFonteGrafico();
  const ativos = [...graficos.keys()];
  graficos.forEach((grafico) => grafico.destroy());
  graficos.clear();
  ativos.forEach(recriar);
}
