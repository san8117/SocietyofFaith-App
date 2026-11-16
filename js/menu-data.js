export const MENU = [
  { rotulo: 'Início', href: 'index.html' },
  { rotulo: 'Conceitos', href: 'religiao.html' },
  { rotulo: 'Religiões', href: 'religioes.html', grupos: [
    { titulo: 'Cristianismo', itens: [
      { rotulo: 'Origens do cristianismo', href: 'cristianismo.html', breve: true },
      { rotulo: 'Catolicismo', href: 'catolicismo.html' },
      { rotulo: 'Evangélicos e protestantismo', href: 'evangelicos.html' },
      { rotulo: 'Testemunhas de Jeová', href: 'testemunhas-de-jeova.html' },
      { rotulo: 'Mórmons', href: 'mormons.html' }
    ] },
    { titulo: 'Espiritismo e matrizes afro-brasileiras', itens: [
      { rotulo: 'Espiritismo', href: 'espiritismo.html' },
      { rotulo: 'Umbanda', href: 'umbanda.html' },
      { rotulo: 'Candomblé', href: 'candomble.html' }
    ] },
    { titulo: 'Povos indígenas', itens: [{ rotulo: 'Tradições indígenas', href: 'tradicoes-indigenas.html' }] },
    { titulo: 'Outras tradições', itens: [
      { rotulo: 'Judaísmo', href: 'judaismo.html' },
      { rotulo: 'Islamismo', href: 'islamismo.html' },
      { rotulo: 'Budismo', href: 'budismo.html' },
      { rotulo: 'Hinduísmo', href: 'hinduismo.html' }
    ] },
    { titulo: 'Novas religiosidades e sem religião', itens: [
      { rotulo: 'Tradições esotéricas', href: 'tradicoes-esotericas.html' },
      { rotulo: 'Santo Daime e ayahuasca', href: 'santo-daime.html' },
      { rotulo: 'Ateísmo e sem religião', href: 'sem-religiao.html' }
    ] }
  ] },
  { rotulo: 'Dados', grupos: [{ titulo: 'IBGE', itens: [
    { rotulo: 'Brasil em dados (2010 × 2022)', href: 'brasil.html' },
    { rotulo: 'Todos os censos (1872–2022)', href: 'censos.html' }
  ] }] },
  { rotulo: 'Fontes', breve: true }
];
