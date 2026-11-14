export const GRUPOS = [
  { id: 'catolica',   nome: 'Católica Apostólica Romana', cssVar: '--c-catolica' },
  { id: 'evangelicas',nome: 'Evangélicas',                cssVar: '--c-evangelicas' },
  { id: 'espirita',   nome: 'Espírita',                   cssVar: '--c-espirita' },
  { id: 'umbanda',    nome: 'Umbanda e Candomblé',        cssVar: '--c-umbanda' },
  { id: 'indigenas',  nome: 'Tradições indígenas',        cssVar: '--c-indigenas' },
  { id: 'outras',     nome: 'Outras religiosidades',      cssVar: '--c-outras' },
  { id: 'sem',        nome: 'Sem religião',               cssVar: '--c-semreligiao' },
  { id: 'naosabe',    nome: 'Não sabe / sem declaração',  cssVar: '--c-naosabe' }
];
// Ordem dos valores = ordem de GRUPOS (8 itens). Pop. 10+ anos, em %.
export const COMPARATIVO = {
  2010: [65.1, 21.6, 2.2, 0.3, 0.0, 2.7, 7.9, 0.1],
  2022: [56.7, 26.9, 1.8, 1.0, 0.1, 4.0, 9.3, 0.2]
};
export const REGIOES = { // 7 valores: catolica, evangelicas, espirita, umbanda, indigenas, outras, sem
  'Norte':        [50.5, 36.8, 0.4, 0.3, 0.2, 3.4, 8.2],
  'Nordeste':     [63.9, 22.5, 0.8, 0.6, 0.1, 3.2, 8.9],
  'Sudeste':      [52.2, 28.0, 2.7, 1.4, 0.0, 4.9, 10.5],
  'Sul':          [62.4, 23.7, 1.9, 1.6, 0.0, 3.2, 7.1],
  'Centro-Oeste': [52.6, 31.4, 2.0, 0.6, 0.1, 4.1, 8.9]
};
export const IDADES = { // 8 valores como GRUPOS
  '10 a 14': [52.0, 31.6, 1.1, 0.8, 0.1, 3.9, 10.2, 0.2],
  '15 a 19': [52.2, 28.9, 1.1, 1.1, 0.1, 4.0, 12.5, 0.2],
  '20 a 24': [51.2, 27.5, 1.2, 1.3, 0.1, 4.2, 14.3, 0.2],
  '25 a 29': [51.2, 27.9, 1.3, 1.4, 0.1, 4.4, 13.5, 0.2],
  '30 a 39': [53.5, 28.1, 1.7, 1.3, 0.1, 4.4, 10.8, 0.2],
  '40 a 49': [56.2, 27.8, 2.2, 1.2, 0.0, 4.2, 8.3, 0.2],
  '50 a 59': [60.4, 25.8, 2.4, 0.9, 0.0, 3.9, 6.3, 0.1],
  '60 a 69': [65.0, 22.9, 2.7, 0.7, 0.0, 3.5, 5.1, 0.1],
  '70 a 79': [68.7, 21.0, 2.3, 0.5, 0.0, 3.2, 4.1, 0.1],
  '80 ou mais': [72.0, 19.0, 2.0, 0.4, 0.0, 3.1, 3.3, 0.1]
};
export const SEXO = { // % homens, % mulheres
  'Total': [48.2, 51.8], 'Católica': [49.0, 51.0], 'Evangélicas': [44.6, 55.4], 'Espírita': [39.4, 60.6],
  'Umbanda e Candomblé': [43.3, 56.7], 'Tradições indígenas': [50.9, 49.1], 'Outras religiosidades': [46.1, 53.9], 'Sem religião': [56.2, 43.8]
};
export const RELIGIAO_POR_COR = { // 7 valores: catolica, evangelicas, espirita, umbanda, indigenas, outras, sem
  'Branca':   [60.2, 23.5, 2.7, 1.0, 0.0, 4.0, 8.4],
  'Preta':    [49.0, 30.0, 1.5, 2.3, 0.0, 4.7, 12.3],
  'Parda':    [55.6, 29.3, 1.1, 0.8, 0.0, 3.8, 9.3],
  'Amarela':  [51.8, 14.3, 3.2, 0.8, 0.0, 13.6, 16.2],
  'Indígena': [42.7, 32.2, 0.5, 0.6, 7.6, 4.6, 11.0]
};
export const COR_POR_RELIGIAO = { // % branca, preta, amarela, parda, indígena
  'Total': [43.3, 10.7, 0.4, 44.9, 0.5], 'Católica': [45.9, 9.3, 0.4, 44.0, 0.4], 'Evangélicas': [38.0, 12.0, 0.2, 49.1, 0.7],
  'Espírita': [63.8, 9.0, 0.8, 26.3, 0.2], 'Umbanda e Candomblé': [42.9, 23.2, 0.3, 33.2, 0.3], 'Tradições indígenas': [11.9, 3.2, 0.4, 10.0, 74.5],
  'Outras religiosidades': [43.1, 12.6, 1.5, 42.2, 0.6], 'Sem religião': [39.2, 14.2, 0.8, 45.1, 0.6]
};
export const INSTRUCAO = { // 25+ anos: sem instrução/fund. incompleto, fund. completo/médio incompleto, médio completo/superior incompleto, superior completo
  'Total': [35.2, 14.0, 32.3, 18.4], 'Católica': [38.0, 13.4, 30.2, 18.4], 'Evangélicas': [34.9, 15.6, 35.2, 14.4], 'Espírita': [11.3, 8.6, 32.1, 48.0],
  'Umbanda e Candomblé': [19.9, 14.7, 39.9, 25.5], 'Tradições indígenas': [53.6, 11.3, 22.8, 12.2], 'Outras religiosidades': [23.6, 13.7, 39.0, 23.6], 'Sem religião': [30.1, 14.7, 34.8, 20.4]
};
export const INDICADORES = { // por grupo (Total quando existir)
  analfabetismo15: { 'Católica': 7.8, 'Evangélicas': 5.4, 'Espírita': 1.0, 'Umbanda e Candomblé': 2.4, 'Tradições indígenas': 24.6, 'Outras religiosidades': 3.0, 'Sem religião': 5.3 },
  domicilioProprio: { 'Total': 73.8, 'Católica': 77.0, 'Evangélicas': 71.5, 'Espírita': 72.1, 'Umbanda e Candomblé': 61.7, 'Tradições indígenas': 85.8, 'Outras religiosidades': 68.7, 'Sem religião': 65.1 },
  internetCasa: { 'Total': 89.2, 'Católica': 87.7, 'Evangélicas': 90.5, 'Espírita': 96.6, 'Umbanda e Candomblé': 94.3, 'Tradições indígenas': 52.9, 'Outras religiosidades': 93.9, 'Sem religião': 90.2 }
};
// Microdados do Censo 2022 (IBGE, divulgados em 31/08/2026; reportagem Folhapress, 02/09/2026). % da população de 10+ anos (176,6 milhões).
export const DENOMINACOES_2022 = [
  { nome: 'Católicos (total)', pct: 57.0, familia: 'catolica', pessoas: '100,6 milhões' },
  { nome: 'Evangélicos não determinados', pct: 15.6, familia: 'evangelicas', pessoas: null },
  { nome: 'Evangélicos pentecostais', pct: 8.1, familia: 'evangelicas', pessoas: '14,3 milhões' },
  { nome: 'Evangélicos de missão', pct: 3.2, familia: 'evangelicas', pessoas: '5,6 milhões' },
  { nome: 'Outras religiosidades cristãs', pct: 2.2, familia: 'outras', pessoas: '3,9 milhões' },
  { nome: 'Espíritas', pct: 1.8, familia: 'espirita', pessoas: '3,2 milhões' },
  { nome: 'Ateus', pct: 1.0, familia: 'sem', pessoas: '1,7 milhão' },
  { nome: 'Umbanda', pct: 0.8, familia: 'umbanda', pessoas: '1,4 milhão' },
  { nome: 'Testemunhas de Jeová', pct: 0.7, familia: 'outras', pessoas: '1,2 milhão' },
  { nome: 'Agnósticos', pct: 0.5, familia: 'sem', pessoas: '881 mil' },
  { nome: 'Candomblé', pct: 0.3, familia: 'umbanda', pessoas: '448,5 mil' },
  { nome: 'Católicos apostólicos brasileiros', pct: 0.2, familia: 'catolica', pessoas: '386 mil' }
];
export const EVANGELICOS_NAO_DETERMINADOS = { 2010: 4.8, 2022: 15.6 };
export const FONTES = {
  censo2022: 'IBGE, Censo Demográfico 2022: Religiões, resultados preliminares da amostra (2025). https://biblioteca.ibge.gov.br/visualizacao/livros/liv102182.pdf',
  microdados: 'IBGE, microdados do Censo 2022 (31/08/2026), segundo Folhapress, 02/09/2026.',
  censo2010: 'IBGE, Censo Demográfico 2010.'
};
