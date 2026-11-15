export const MENU = [
  { rotulo: 'Início', href: 'religioes.html' },
  { rotulo: 'Conceitos', href: 'religiao.html' },
  { rotulo: 'Religiões', href: 'religioes.html', grupos: [
    { titulo: 'Cristianismo', itens: [
      { rotulo: 'Origens do cristianismo', href: 'cristianismo.html', breve: true },
      { rotulo: 'Catolicismo', href: 'catolicismo.html' },
      { rotulo: 'Evangélicos e protestantismo', href: 'evangelicos.html' },
      { rotulo: 'Testemunhas de Jeová', breve: true },
      { rotulo: 'Mórmons', breve: true }
    ] },
    { titulo: 'Espiritismo e matrizes afro-brasileiras', itens: [
      { rotulo: 'Espiritismo', href: 'espiritismo.html' },
      { rotulo: 'Umbanda', breve: true },
      { rotulo: 'Candomblé', breve: true }
    ] },
    { titulo: 'Povos indígenas', itens: [{ rotulo: 'Tradições indígenas', breve: true }] },
    { titulo: 'Outras tradições', itens: [
      { rotulo: 'Judaísmo', breve: true },
      { rotulo: 'Islamismo', breve: true },
      { rotulo: 'Budismo', breve: true },
      { rotulo: 'Hinduísmo', breve: true }
    ] },
    { titulo: 'Novas religiosidades e sem religião', itens: [
      { rotulo: 'Tradições esotéricas', breve: true },
      { rotulo: 'Santo Daime e ayahuasca', breve: true },
      { rotulo: 'Ateísmo e sem religião', breve: true }
    ] }
  ] },
  { rotulo: 'Dados', grupos: [{ titulo: 'IBGE', itens: [
    { rotulo: 'Brasil em dados (2010 × 2022)', href: 'brasil.html' },
    { rotulo: 'Todos os censos (1872–2022)', href: 'censos.html' }
  ] }] },
  { rotulo: 'Vídeos', breve: true },
  { rotulo: 'Quiz', breve: true },
  { rotulo: 'Fontes', breve: true }
];
