import { COMPARATIVO, GRUPOS } from './dados-ibge.js';
import { SERIE } from './dados-censos.js';

export const FAMILIAS = [
  { id: 'cristianismo', nome: 'Cristianismo' },
  { id: 'afro-brasileiras', nome: 'Matrizes afro-brasileiras' },
  { id: 'indigenas', nome: 'Tradições indígenas' },
  { id: 'outras', nome: 'Outras tradições' }
];

export const RELIGIOES = [
  { id: 'catolicismo', nome: 'Catolicismo', familia: 'cristianismo', status: 'disponivel', arquivo: 'catolicismo.html', resumo: 'História, crenças e presença do catolicismo no Brasil.' },
  { id: 'evangelicos', nome: 'Evangélicos e protestantismo', familia: 'cristianismo', status: 'disponivel', arquivo: 'evangelicos.html', resumo: 'Diversidade das tradições protestantes e evangélicas brasileiras.' },
  { id: 'testemunhas', nome: 'Testemunhas de Jeová', familia: 'cristianismo', status: 'breve' },
  { id: 'mormons', nome: 'Igreja de Jesus Cristo dos Santos dos Últimos Dias', familia: 'cristianismo', status: 'breve' },
  { id: 'espiritismo', nome: 'Espiritismo', familia: 'outras', status: 'disponivel', arquivo: 'espiritismo.html', resumo: 'Doutrina espírita, sua história e difusão no Brasil.' },
  { id: 'umbanda', nome: 'Umbanda', familia: 'afro-brasileiras', status: 'pronta', arquivo: 'umbanda.html', pagina: 'umbanda.html', grupoIBGE: 'umbanda', tabela: 'Umbanda e Candomblé', resumo: 'Uma religião brasileira formada pelo encontro de diferentes tradições.' },
  { id: 'candomble', nome: 'Candomblé', familia: 'afro-brasileiras', status: 'pronta', arquivo: 'candomble.html', pagina: 'candomble.html', grupoIBGE: 'umbanda', tabela: 'Umbanda e Candomblé', resumo: 'Religião de matriz africana vivida em comunidades e terreiros diversos.' },
  { id: 'tradicoes-indigenas', nome: 'Tradições indígenas', familia: 'indigenas', status: 'pronta', arquivo: 'tradicoes-indigenas.html', pagina: 'tradicoes-indigenas.html', grupoIBGE: 'indigenas', tabela: 'Tradições indígenas', resumo: 'Cosmologias e tradições de povos indígenas diversos.' },
  { id: 'judaismo', nome: 'Judaísmo', familia: 'outras', status: 'pronta', pagina: 'judaismo.html', arquivo: 'judaismo.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '100 mil', sub: 'pessoas em 2022 (≈ 0,06%, calculado)', resumo: 'Uma tradição monoteísta com textos, história e comunidades diversas.' },
  { id: 'islamismo', nome: 'Islamismo', familia: 'outras', status: 'pronta', pagina: 'islamismo.html', arquivo: 'islamismo.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '41,2 mil', sub: 'pessoas em 2022 (≈ 0,02%, calculado)', resumo: 'Uma religião monoteísta vivida por comunidades de muitos povos.' },
  { id: 'budismo', nome: 'Budismo', familia: 'outras', status: 'pronta', pagina: 'budismo.html', arquivo: 'budismo.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '197 mil', sub: 'pessoas em 2022 (≈ 0,11%, calculado)', resumo: 'Uma tradição plural de ensinamentos, reflexão e prática.' },
  { id: 'hinduismo', nome: 'Hinduísmo', familia: 'outras', status: 'pronta', pagina: 'hinduismo.html', arquivo: 'hinduismo.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '6,7 mil', sub: 'pessoas em 2022 (≈ 0,004%, calculado)', resumo: 'Conjunto diverso de tradições originadas no subcontinente indiano.' },
  { id: 'esotericas', nome: 'Tradições esotéricas', familia: 'outras', status: 'breve' },
  { id: 'santo-daime', nome: 'Santo Daime e tradições ayahuasqueiras', familia: 'outras', status: 'breve' },
  { id: 'sem-religiao', nome: 'Ateísmo e pessoas sem religião', familia: 'outras', status: 'breve' }
];

export const EXTRAS = {
  umbanda: {
    avisoCombinado: true,
    chips: [['0,8%', 'da população (2022)'], ['1,4 mi', 'de pessoas'], ['1908', 'ano tradicional de fundação']],
    subgrupos: [
      { nome: 'Umbanda (2022, pop. 10+)', pct: 0.8, pessoas: '1,4 milhão' },
      { nome: 'Umbanda (2010, pop. total)', pct: 0.2, pessoas: '407.331' }
    ],
    recordes: [
      ['Rio Grande do Sul', '3,2%', 'maior % de Umbanda e Candomblé juntos (UF)'],
      ['Sul', '1,6%', 'maior % por região (Sudeste: 1,4%)'],
      ['2,3%', 'das pessoas pretas', 'seguem Umbanda ou Candomblé'],
      ['94,3%', 'com internet em casa', 'maior acesso entre os grupos menores']
    ]
  },
  candomble: {
    avisoCombinado: true,
    chips: [['0,3%', 'da população (2022)'], ['448,5 mil', 'de pessoas'], ['0,09%', 'em 2010 (pop. total)']],
    subgrupos: [
      { nome: 'Candomblé (2022, pop. 10+)', pct: 0.3, pessoas: '448,5 mil' },
      { nome: 'Candomblé (2010, pop. total)', pct: 0.09, pessoas: '167.363' }
    ],
    recordes: [
      ['Rio Grande do Sul', '3,2%', 'maior % de Umbanda e Candomblé juntos (UF)'],
      ['23,2%', 'são pessoas pretas', 'entre quem segue Umbanda ou Candomblé'],
      ['25,5%', 'com ensino superior', 'entre 25+ anos (Umbanda e Candomblé)'],
      ['61,7%', 'com domicílio próprio', 'o menor índice entre os grupos']
    ]
  },
  'tradicoes-indigenas': {
    avisoCombinado: false,
    chips: [['0,1%', 'da população (2022)'], ['7,6%', 'dos indígenas', 'declaram tradições indígenas (cor ou raça)'], ['74,5%', 'do grupo é indígena', 'por cor ou raça']],
    subgrupos: [],
    recordes: [
      ['Roraima', '1,7%', 'maior % de tradições indígenas'],
      ['24,6%', 'analfabetismo (15+)', 'a maior taxa entre os grupos'],
      ['52,9%', 'com internet em casa', 'o menor acesso entre os grupos'],
      ['85,8%', 'com domicílio próprio', 'o maior índice entre os grupos']
    ]
  },
  judaismo: {
    semGrupoIBGE: true,
    pessoas: { 2010: 107329, 2022: 100000 },
    pct: { 2010: 0.06, 2022: 0.06 },
    chips: [
      ['100 mil', 'pessoas (2022)'],
      ['107.329', 'pessoas (2010)'],
      ['70 d.C.', 'destruição do Segundo Templo']
    ],
    recordes: [
      ['2010 → 2022', '≈ −7 mil', 'diferença entre os censos (bases diferentes)'],
      ['≈ 0,06%', 'da população', '(calculado)']
    ]
  },
  islamismo: {
    semGrupoIBGE: true,
    pessoas: { 2010: 35167, 2022: 41200 },
    pct: { 2010: 0.02, 2022: 0.02 },
    conferir2010: true,
    chips: [
      ['41,2 mil', 'pessoas (2022)'],
      ['≈ 35 mil', 'pessoas (2010)'],
      ['622', 'Hégira, marco do calendário islâmico']
    ],
    recordes: [
      ['2010 → 2022', 'aumento', 'o Texto 01 já apontava crescimento em 2010 (comparação a conferir)'],
      ['≈ 0,02%', 'da população', '(calculado)']
    ],
    recordesConferir: [0]
  },
  budismo: {
    semGrupoIBGE: true,
    pessoas: { 2010: 243966, 2022: 197000 },
    pct: { 2010: 0.13, 2022: 0.11 },
    chips: [
      ['197 mil', 'pessoas (2022)'],
      ['243.966', 'pessoas (2010)'],
      ['1908', 'chegada de imigrantes japoneses']
    ],
    recordes: [
      ['2010 → 2022', '≈ −47 mil', 'diferença entre os censos (bases diferentes)'],
      ['≈ 0,11%', 'da população', '(calculado)']
    ]
  },
  hinduismo: {
    semGrupoIBGE: true,
    pessoas: { 2010: 5675, 2022: 6700 },
    pct: { 2010: 0.003, 2022: 0.004 },
    conferir2010: true,
    chipsConferir: [2],
    chips: [
      ['6,7 mil', 'pessoas (2022)'],
      ['≈ 5,7 mil', 'pessoas (2010)'],
      ['≈ 1500 a.C.', 'época dos textos védicos']
    ],
    recordes: [
      ['≈ 0,004%', 'da população', '(calculado)']
    ]
  },
  censo: {
    grupos: GRUPOS,
    comparativo: COMPARATIVO,
    serie: SERIE
  },
  fontes: [
    { titulo: 'IBGE — Censo Demográfico 2022: Religiões', url: 'https://www.ibge.gov.br/' },
    { titulo: 'IBGE — Censos Demográficos', url: 'https://www.ibge.gov.br/estatisticas/sociais/populacao.html' }
  ]
};
