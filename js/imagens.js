import { IMAGENS_RELIGIOES } from './imagens-religioes.js';

function criar(tag, className, texto) {
  const elemento = document.createElement(tag);
  if (className) elemento.className = className;
  if (texto) elemento.textContent = texto;
  return elemento;
}

function mostrarImagem(dialogo, imagem, credito, licenca) {
  const ampliada = dialogo.querySelector('img');
  const legenda = dialogo.querySelector('p');
  ampliada.src = imagem.src;
  ampliada.alt = imagem.alt;
  legenda.textContent = [imagem.legenda, credito, licenca, imagem.fonte].filter(Boolean).join(' · ');
  dialogo.showModal();
}

export function figuraImagem(slug, id, item = null, { interactive = true } = {}) {
  const imagem = item || IMAGENS_RELIGIOES[slug]?.[id];
  const figura = criar('figure', 'image-figure');

  const mostrarFallback = () => {
    const bloco = criar('div', 'image-placeholder');
    bloco.setAttribute('role', 'img');
    bloco.setAttribute('aria-label', slug ? `Ilustração de ${slug}` : 'Ilustração do projeto');
    const cor = imagem?.cor || '#A8502F';
    bloco.style.background = `linear-gradient(135deg, ${cor}66, #F6EEE677)`;
    figura.append(bloco);
  };

  if (!imagem || imagem.pendente || !imagem.src) {
    mostrarFallback();
    return figura;
  }

  const imagemElem = criar('img', 'image-figure__image');
  imagemElem.src = imagem.src;
  imagemElem.alt = imagem.alt || `Ilustração inspirada em ${slug || 'tradição religiosa'}`;
  imagemElem.width = Number(imagem.width) || 1600;
  imagemElem.height = Number(imagem.height) || 1000;
  imagemElem.dataset.imageType = imagem.tipo || 'arte';
  imagemElem.loading = 'lazy';
  imagemElem.decoding = 'async';
  imagemElem.addEventListener('error', () => {
    figura.replaceChildren();
    mostrarFallback();
  }, { once: true });

  if (interactive) {
    const abrir = criar('button', 'image-figure__open');
    abrir.type = 'button';
    abrir.setAttribute('aria-label', `Ampliar imagem: ${imagemElem.alt}`);
    abrir.append(imagemElem);
    abrir.addEventListener('click', () => {
      const dialogo = document.querySelector('#image-lightbox');
      if (dialogo) mostrarImagem(dialogo, imagem, imagem.credito, imagem.licenca);
    });
    figura.append(abrir);
  } else {
    figura.append(imagemElem);
  }
  const legenda = [imagem.legenda, imagem.credito, imagem.licenca, imagem.fonte].filter(Boolean).join(' · ');
  figura.append(criar('figcaption', '', legenda));
  if (new URLSearchParams(location.search).get('dev') === '1') {
    const selo = criar('span', 'image-figure__badge', imagem.tipo === 'foto' ? 'foto' : 'ilustração');
    selo.setAttribute('aria-label', `Tipo de imagem: ${imagem.tipo === 'foto' ? 'foto' : 'ilustração'}`);
    figura.append(selo);
  }
  return figura;
}

export function montarImagens(manifesto) {
  const dialogo = document.querySelector('#image-lightbox');
  if (dialogo) {
    dialogo.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialogo.close());
    dialogo.addEventListener('click', (evento) => {
      if (evento.target === dialogo) dialogo.close();
    });
  }

  document.querySelectorAll('[data-image-slot]').forEach((container) => {
    const item = manifesto[container.dataset.imageSlot];
    if (!item) return;
    container.replaceChildren(figuraImagem('', '', item));
  });
}
