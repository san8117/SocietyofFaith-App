function seletorDoElemento(elemento) {
  if (elemento.id) return `#${CSS.escape(elemento.id)}`;
  const classes = [...elemento.classList].slice(0, 2).map((classe) => `.${CSS.escape(classe)}`).join('');
  return `${elemento.tagName.toLowerCase()}${classes}`;
}

function verificarOverflow() {
  if (new URLSearchParams(location.search).get('dev') !== '1') return;
  const larguraJanela = window.innerWidth;
  if (document.documentElement.scrollWidth <= larguraJanela) return;

  const elementos = [...document.body.querySelectorAll('*')].filter((elemento) => {
    if (elemento.closest('[data-carousel], .table-scroll, .section-nav')) return false;
    const caixa = elemento.getBoundingClientRect();
    return caixa.width > larguraJanela || caixa.left < -1 || caixa.right > larguraJanela + 1;
  });

  console.table(elementos.map((elemento) => ({
    seletor: seletorDoElemento(elemento),
    largura: Math.round(elemento.getBoundingClientRect().width),
    esquerda: Math.round(elemento.getBoundingClientRect().left),
    direita: Math.round(elemento.getBoundingClientRect().right)
  })));
}

if (new URLSearchParams(location.search).get('dev') === '1') {
  requestAnimationFrame(verificarOverflow);
  window.addEventListener('load', verificarOverflow, { once: true });
  window.addEventListener('resize', verificarOverflow);
  document.fonts?.ready.then(verificarOverflow);
}
