const instances = new WeakMap();
let generatedId = 0;

function criarBotao(classe, texto, rotulo, alvo) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = classe;
  botao.setAttribute('aria-label', rotulo);
  botao.setAttribute('aria-controls', alvo);
  const icone = document.createElement('span');
  icone.setAttribute('aria-hidden', 'true');
  icone.textContent = texto;
  botao.append(icone);
  return botao;
}

function obterItens(trilha) {
  return [...trilha.children].filter((item) => !item.hidden && item.getAttribute('aria-hidden') !== 'true');
}

function indiceMaisProximo(trilha, itens) {
  let indice = 0;
  let distancia = Infinity;
  itens.forEach((item, posicao) => {
    const atual = Math.abs(item.offsetLeft - trilha.scrollLeft);
    if (atual < distancia) {
      distancia = atual;
      indice = posicao;
    }
  });
  return indice;
}

export function initCarrossel(trilha, { autoplay = false, intervalo = 4500 } = {}) {
  if (!trilha) return null;
  if (instances.has(trilha)) return instances.get(trilha);

  generatedId += 1;
  if (!trilha.id) trilha.id = `carrossel-${generatedId}`;
  trilha.dataset.carousel = '';
  if (!trilha.hasAttribute('tabindex')) trilha.tabIndex = 0;
  if (!trilha.hasAttribute('aria-label')) {
    trilha.setAttribute('aria-label', 'Carrossel. Use as setas do teclado para percorrer os itens.');
  }

  const shell = trilha.closest('[data-carousel-shell]') ?? trilha.parentElement;
  shell.classList.add('carousel-shell');
  let controles = shell.querySelector('[data-carousel-controls]');
  if (!controles) {
    controles = document.createElement('div');
    controles.className = 'carousel-controls';
    controles.dataset.carouselControls = '';
    controles.setAttribute('role', 'group');
    controles.setAttribute('aria-label', 'Controles do carrossel');
    shell.insertBefore(controles, trilha);
  }
  if (!controles.hasAttribute('role')) controles.setAttribute('role', 'group');

  let anterior = controles.querySelector('[data-carousel-prev]');
  let proximo = controles.querySelector('[data-carousel-next]');
  if (!anterior) {
    anterior = criarBotao('carousel-arrow', '←', 'Item anterior', trilha.id);
    anterior.dataset.carouselPrev = '';
    controles.append(anterior);
  }
  if (!proximo) {
    proximo = criarBotao('carousel-arrow', '→', 'Próximo item', trilha.id);
    proximo.dataset.carouselNext = '';
    controles.append(proximo);
  }

  let botaoReproducao = null;
  if (autoplay) {
    botaoReproducao = controles.querySelector('[data-carousel-toggle]');
    if (!botaoReproducao) {
      botaoReproducao = criarBotao('carousel-toggle', 'Ⅱ', 'Pausar avanço automático', trilha.id);
      botaoReproducao.dataset.carouselToggle = '';
      controles.append(botaoReproducao);
    }
  }

  let pontos = controles.querySelector('[data-carousel-dots]');
  if (!pontos) {
    pontos = document.createElement('div');
    pontos.className = 'carousel-dots';
    pontos.dataset.carouselDots = '';
    pontos.setAttribute('role', 'group');
    pontos.setAttribute('aria-label', 'Posição no carrossel');
    controles.insertBefore(pontos, botaoReproducao);
  }
  controles.classList.add('carousel-controls');
  shell.append(controles);

  const movimentoReduzido = matchMedia('(prefers-reduced-motion: reduce)');
  const eventos = new AbortController();
  function ouvir(alvo, tipo, callback, opcoes = {}) {
    alvo.addEventListener(tipo, callback, { ...opcoes, signal: eventos.signal });
  }
  const estado = {
    autoplay,
    intervalo: Math.max(1000, intervalo),
    pausado: autoplay && movimentoReduzido.matches,
    optInMovimento: false,
    temporizador: 0,
    retomada: 0,
    mouseSobreShell: false,
    ponteiroAtivo: false,
    ponteiroId: null,
    arrasto: null,
    cancelarCliqueAte: 0
  };

  function atualizaControles() {
    const itens = obterItens(trilha);
    const temRolagem = trilha.scrollWidth > trilha.clientWidth + 2;
    shell.classList.toggle('has-carousel-overflow', temRolagem);
    controles.hidden = !temRolagem;
    while (pontos.children.length > itens.length) pontos.lastElementChild.remove();
    while (pontos.children.length < itens.length) {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'carousel-dot';
      botao.setAttribute('aria-label', `Ir ao item ${pontos.children.length + 1}`);
      pontos.append(botao);
    }
    atualizarPontoAtivo(itens);
    if (botaoReproducao) {
      const ativo = !estado.pausado;
      botaoReproducao.setAttribute('aria-pressed', String(ativo));
      botaoReproducao.setAttribute('aria-label', ativo ? 'Pausar avanço automático' : 'Reproduzir carrossel');
      botaoReproducao.firstElementChild.textContent = ativo ? 'Ⅱ' : '▶';
    }
    return temRolagem;
  }

  function atualizarPontoAtivo(itens = obterItens(trilha)) {
    const atual = indiceMaisProximo(trilha, itens);
    [...pontos.children].forEach((botao, indice) => {
      if (indice === atual) botao.setAttribute('aria-current', 'true');
      else botao.removeAttribute('aria-current');
    });
  }

  function interacaoAtiva() {
    return document.hidden
      || estado.mouseSobreShell
      || estado.ponteiroAtivo
      || shell.contains(document.activeElement);
  }

  function limparTemporizadores() {
    window.clearTimeout(estado.temporizador);
    window.clearTimeout(estado.retomada);
    estado.temporizador = 0;
    estado.retomada = 0;
  }

  function rolarPara(indice, comportamento) {
    const itens = obterItens(trilha);
    if (!itens.length) return;
    const indiceSeguro = (indice + itens.length) % itens.length;
    trilha.scrollTo({ left: itens[indiceSeguro].offsetLeft, behavior: comportamento });
  }

  function avancar(direcao = 1, automatico = false) {
    const itens = obterItens(trilha);
    if (!itens.length) return;
    const atual = indiceMaisProximo(trilha, itens);
    if (automatico && direcao > 0 && trilha.scrollLeft + trilha.clientWidth >= trilha.scrollWidth - 8) {
      rolarPara(0, movimentoReduzido.matches ? 'auto' : 'smooth');
    } else {
      rolarPara(atual + direcao, movimentoReduzido.matches ? 'auto' : 'smooth');
    }
    if (!automatico) agendarRetomada();
  }

  function agendarAvanco() {
    window.clearTimeout(estado.temporizador);
    if (!estado.autoplay || estado.pausado || interacaoAtiva()) {
      atualizaControles();
      return;
    }
    if (!atualizaControles()) return;
    estado.temporizador = window.setTimeout(() => {
      avancar(1, true);
      agendarAvanco();
    }, estado.intervalo);
  }

  function agendarRetomada(atraso = 3000) {
    window.clearTimeout(estado.retomada);
    if (!estado.autoplay || estado.pausado) return;
    estado.retomada = window.setTimeout(() => {
      if (!interacaoAtiva()) agendarAvanco();
    }, atraso);
  }

  function pausarPorInteracao() {
    window.clearTimeout(estado.temporizador);
    estado.temporizador = 0;
  }

  ouvir(anterior, 'click', () => {
    pausarPorInteracao();
    avancar(-1);
  });
  ouvir(proximo, 'click', () => {
    pausarPorInteracao();
    avancar(1);
  });
  ouvir(pontos, 'click', (evento) => {
    const botao = evento.target.closest('.carousel-dot');
    if (!botao) return;
    const indice = [...pontos.children].indexOf(botao);
    if (indice < 0) return;
    pausarPorInteracao();
    rolarPara(indice, movimentoReduzido.matches ? 'auto' : 'smooth');
    agendarRetomada();
  });
  ouvir(trilha, 'scroll', () => atualizarPontoAtivo(), { passive: true });

  if (botaoReproducao) {
    ouvir(botaoReproducao, 'click', () => {
      estado.pausado = !estado.pausado;
      if (!estado.pausado) estado.optInMovimento = true;
      atualizaControles();
      if (estado.pausado) limparTemporizadores();
      else agendarRetomada(0);
    });
    ouvir(shell, 'pointerenter', (evento) => {
      if (evento.pointerType !== 'mouse') return;
      estado.mouseSobreShell = true;
      pausarPorInteracao();
    });
    ouvir(shell, 'pointerleave', (evento) => {
      if (evento.pointerType !== 'mouse') return;
      estado.mouseSobreShell = false;
      agendarRetomada();
    });
    ouvir(shell, 'focusin', pausarPorInteracao);
    ouvir(shell, 'focusout', () => agendarRetomada());
    ouvir(document, 'visibilitychange', () => {
      if (document.hidden) pausarPorInteracao();
      else agendarRetomada();
    });
    ouvir(movimentoReduzido, 'change', (evento) => {
      if (evento.matches && !estado.optInMovimento) {
        estado.pausado = true;
        limparTemporizadores();
      } else if (!evento.matches && estado.pausado && !estado.optInMovimento) {
        estado.pausado = false;
        agendarRetomada();
      }
      atualizaControles();
    });
  }

  ouvir(trilha, 'pointerdown', (evento) => {
    pausarPorInteracao();
    estado.ponteiroAtivo = true;
    estado.ponteiroId = evento.pointerId;
    if (evento.pointerType !== 'mouse' || evento.button !== 0) return;
    estado.arrasto = {
      id: evento.pointerId,
      x: evento.clientX,
      scroll: trilha.scrollLeft,
      ativo: false
    };
  });
  ouvir(trilha, 'pointermove', (evento) => {
    const arrasto = estado.arrasto;
    if (!arrasto || evento.pointerId !== arrasto.id) return;
    const distancia = evento.clientX - arrasto.x;
    if (!arrasto.ativo && Math.abs(distancia) > 6) {
      arrasto.ativo = true;
      trilha.classList.add('is-dragging');
      trilha.setPointerCapture(evento.pointerId);
    }
    if (arrasto.ativo) {
      evento.preventDefault();
      trilha.scrollLeft = arrasto.scroll - distancia;
    }
  });

  function finalizarPonteiro(evento) {
    const corresponde = estado.ponteiroId === evento.pointerId || estado.arrasto?.id === evento.pointerId;
    if (!corresponde) return;
    if (estado.ponteiroId === evento.pointerId) {
      estado.ponteiroAtivo = false;
      estado.ponteiroId = null;
    }
    if (estado.arrasto?.id === evento.pointerId) {
      if (estado.arrasto.ativo) {
        estado.cancelarCliqueAte = performance.now() + 400;
        trilha.classList.remove('is-dragging');
      }
      estado.arrasto = null;
    }
    agendarRetomada();
  }
  ouvir(document, 'pointerup', finalizarPonteiro);
  ouvir(document, 'pointercancel', finalizarPonteiro);
  ouvir(trilha, 'click', (evento) => {
    if (performance.now() > estado.cancelarCliqueAte) return;
    evento.preventDefault();
    evento.stopImmediatePropagation();
  }, { capture: true });

  ouvir(trilha, 'keydown', (evento) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(evento.key)) return;
    evento.preventDefault();
    pausarPorInteracao();
    if (evento.key === 'Home') rolarPara(0, movimentoReduzido.matches ? 'auto' : 'smooth');
    else if (evento.key === 'End') rolarPara(obterItens(trilha).length - 1, movimentoReduzido.matches ? 'auto' : 'smooth');
    else avancar(evento.key === 'ArrowRight' ? 1 : -1);
  });

  const aoRedimensionar = () => {
    atualizaControles();
    agendarAvanco();
  };
  ouvir(window, 'resize', aoRedimensionar);
  const observadorItens = 'MutationObserver' in window
    ? new MutationObserver(() => {
      atualizaControles();
      agendarAvanco();
    })
    : null;
  observadorItens?.observe(trilha, { childList: true, attributes: true, attributeFilter: ['hidden'] });
  atualizaControles();
  if (autoplay && !estado.pausado) agendarAvanco();

  const instancia = { track: trilha, destroy: () => {
    limparTemporizadores();
    eventos.abort();
    observadorItens?.disconnect();
    estado.mouseSobreShell = false;
    estado.ponteiroAtivo = false;
    estado.ponteiroId = null;
    trilha.classList.remove('is-dragging');
    instances.delete(trilha);
  } };
  instances.set(trilha, instancia);
  return instancia;
}

export function destroyCarrossel(trilha) {
  instances.get(trilha)?.destroy();
}
