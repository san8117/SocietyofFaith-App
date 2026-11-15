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
    const figura = criar('figure', 'image-figure');
    if (item.src && item.alt && item.credito && item.licenca && (!item.sensivel || item.fonte)) {
      const imagem = criar('img', 'image-figure__image');
      imagem.src = item.src;
      imagem.alt = item.alt;
      imagem.loading = 'lazy';
      imagem.decoding = 'async';
      const abrir = criar('button', 'image-figure__open');
      abrir.type = 'button';
      abrir.setAttribute('aria-label', `Ampliar imagem: ${item.alt}`);
      abrir.append(imagem);
      abrir.addEventListener('click', () => {
        if (dialogo) mostrarImagem(dialogo, item, item.credito, item.licenca);
      });
      figura.append(abrir);
      figura.append(criar('figcaption', '', [item.legenda, item.credito, item.licenca, item.fonte].filter(Boolean).join(' · ')));
    } else {
      const placeholder = criar('div', 'image-placeholder');
      placeholder.setAttribute('role', 'img');
      placeholder.setAttribute('aria-label', `Imagem ainda não selecionada. Sugestão de pesquisa: ${item.consulta}`);
      placeholder.append(criar('span', '', 'Imagem em curadoria'));
      placeholder.append(criar('small', '', `Sugestão de pesquisa: ${item.consulta}`));
      figura.append(placeholder, criar('figcaption', '', item.legenda || 'Imagem pendente de seleção e verificação de licença.'));
    }
    container.replaceChildren(figura);
  });
}
