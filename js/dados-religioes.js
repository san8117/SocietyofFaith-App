import { COMPARATIVO, GRUPOS } from './dados-ibge.js';
import { SERIE } from './dados-censos.js';

export const FAMILIAS = [
  { id: 'cristianismo', nome: 'Cristianismo' },
  { id: 'afro-brasileiras', nome: 'Matrizes afro-brasileiras' },
  { id: 'indigenas', nome: 'Tradições indígenas' },
  { id: 'outras', nome: 'Outras tradições' }
];

export const RELIGIOES = [
  { id: 'cristianismo', nome: 'Cristianismo', familia: 'cristianismo', status: 'pronta', pagina: 'cristianismo.html', arquivo: 'cristianismo.html', destaque: '86,9%', sub: 'população cristã em 2022 (microdados)', semGrupoIBGE: true, contexto: 'Cristianismo (soma de denominações)', resumo: 'Origem de uma tradição universal a partir de um movimento judaico na Palestina.' },
  { id: 'catolicismo', nome: 'Catolicismo', familia: 'cristianismo', status: 'disponivel', arquivo: 'catolicismo.html', resumo: 'História, crenças e presença do catolicismo no Brasil.' },
  { id: 'evangelicos', nome: 'Evangélicos e protestantismo', familia: 'cristianismo', status: 'disponivel', arquivo: 'evangelicos.html', resumo: 'Diversidade das tradições protestantes e evangélicas brasileiras.' },
  { id: 'testemunhas-de-jeova', nome: 'Testemunhas de Jeová', familia: 'cristianismo', status: 'pronta', pagina: 'testemunhas-de-jeova.html', arquivo: 'testemunhas-de-jeova.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '1,2 mi', sub: 'pessoas em 2022 (0,7%)', resumo: 'Um grupo cristão de origem estadunidense com comunidades em todo o Brasil.' },
  { id: 'mormons', nome: 'Mórmons', familia: 'cristianismo', status: 'pronta', pagina: 'mormons.html', arquivo: 'mormons.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '148 mil', sub: 'pessoas em 2022 (< 0,1%; ≈ 0,08%, calculado)', resumo: 'Uma tradição cristã conhecida também como Santos dos Últimos Dias.' },
  { id: 'espiritismo', nome: 'Espiritismo', familia: 'outras', status: 'disponivel', arquivo: 'espiritismo.html', resumo: 'Doutrina espírita, sua história e difusão no Brasil.' },
  { id: 'umbanda', nome: 'Umbanda', familia: 'afro-brasileiras', status: 'pronta', arquivo: 'umbanda.html', pagina: 'umbanda.html', grupoIBGE: 'umbanda', tabela: 'Umbanda e Candomblé', resumo: 'Uma religião brasileira formada pelo encontro de diferentes tradições.' },
  { id: 'candomble', nome: 'Candomblé', familia: 'afro-brasileiras', status: 'pronta', arquivo: 'candomble.html', pagina: 'candomble.html', grupoIBGE: 'umbanda', tabela: 'Umbanda e Candomblé', resumo: 'Religião de matriz africana vivida em comunidades e terreiros diversos.' },
  { id: 'tradicoes-indigenas', nome: 'Tradições indígenas', familia: 'indigenas', status: 'pronta', arquivo: 'tradicoes-indigenas.html', pagina: 'tradicoes-indigenas.html', grupoIBGE: 'indigenas', tabela: 'Tradições indígenas', resumo: 'Cosmologias e tradições de povos indígenas diversos.' },
  { id: 'judaismo', nome: 'Judaísmo', familia: 'outras', status: 'pronta', pagina: 'judaismo.html', arquivo: 'judaismo.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '100 mil', sub: 'pessoas em 2022 (≈ 0,06%, calculado)', resumo: 'Uma tradição monoteísta com textos, história e comunidades diversas.' },
  { id: 'islamismo', nome: 'Islamismo', familia: 'outras', status: 'pronta', pagina: 'islamismo.html', arquivo: 'islamismo.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '41,2 mil', sub: 'pessoas em 2022 (≈ 0,02%, calculado)', resumo: 'Uma religião monoteísta vivida por comunidades de muitos povos.' },
  { id: 'budismo', nome: 'Budismo', familia: 'outras', status: 'pronta', pagina: 'budismo.html', arquivo: 'budismo.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '197 mil', sub: 'pessoas em 2022 (≈ 0,11%, calculado)', resumo: 'Uma tradição plural de ensinamentos, reflexão e prática.' },
  { id: 'hinduismo', nome: 'Hinduísmo', familia: 'outras', status: 'pronta', pagina: 'hinduismo.html', arquivo: 'hinduismo.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '6,7 mil', sub: 'pessoas em 2022 (≈ 0,004%, calculado)', resumo: 'Conjunto diverso de tradições originadas no subcontinente indiano.' },
  { id: 'tradicoes-esotericas', nome: 'Tradições esotéricas', familia: 'outras', status: 'pronta', pagina: 'tradicoes-esotericas.html', arquivo: 'tradicoes-esotericas.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '167 mil', sub: 'pessoas em 2022 (≈ 0,09%, calculado)', resumo: 'Um campo plural de saberes e práticas simbólicas.' },
  { id: 'santo-daime', nome: 'Santo Daime e tradições ayahuasqueiras', familia: 'outras', status: 'pronta', pagina: 'santo-daime.html', arquivo: 'santo-daime.html', semGrupoIBGE: true, contexto: 'Outras religiosidades', destaque: '14 mil', sub: 'pessoas em 2022 (≈ 0,008%, calculado)', resumo: 'Religiões brasileiras de origem amazônica, apresentadas em contexto informativo.' },
  { id: 'sem-religiao', nome: 'Ateísmo e pessoas sem religião', familia: 'outras', status: 'pronta', pagina: 'sem-religiao.html', arquivo: 'sem-religiao.html', grupoIBGE: 'sem', tabela: 'Sem religião', destaque: '9,3%', sub: 'da população em 2022 · 16,4 mi de pessoas', resumo: 'Um conjunto diverso de pessoas sem vínculo religioso institucional.' }
];

export const EXTRAS = {
  cristianismo: {
    semGrupoIBGE: true,
    contexto: 'Cristianismo (soma de denominações)',
    chips: [['86,9%', 'da população (2022)'], ['≈ 170 mi', 'de pessoas'], ['313', 'Edito de Milão']],
    pessoas: { 2010: null, 2022: 170000000 },
    pct: { 2010: null, 2022: 86.9 },
    recordes: [
      ['86,9%', 'da população', 'total cristão em 2022 (microdados)'],
      ['57,0%', 'católicos', 'na população de 10 anos ou mais'],
      ['26,9%', 'evangélicos', 'na mesma base']
    ]
  },
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
  'testemunhas-de-jeova': {
    semGrupoIBGE: true,
    pessoas: { 2010: 1393208, 2022: 1200000 },
    pct: { 2010: 0.7, 2022: 0.7 },
    contexto: 'Outras religiosidades',
    conferir: true,
    chips: [['1,2 mi', 'pessoas (2022)'], ['1.393.208', 'pessoas (2010)'], ['0,7%', 'em 2010 e em 2022']],
    recordesNumeroRotulo: true,
    recordes: [['4º lugar', 'na lista de 2010 do Texto 01'], ['≈ −0,2 milhão', 'diferença entre os censos', 'bases diferentes']]
  },
  mormons: {
    semGrupoIBGE: true,
    pessoas: { 2010: null, 2022: 148000 },
    pct: { 2010: null, 2022: '< 0,1' },
    pctCalculado2022: 0.08,
    conferir2010: true,
    contexto: 'Outras religiosidades',
    conferir: true,
    chipsConferir: [2],
    chips: [['148 mil', 'pessoas (2022)'], ['< 0,1%', 'da população'], ['1830', 'fundação nos EUA [conferir]']],
    recordesNumeroRotulo: true,
    recordes: [['≈ 0,08%', 'da população (calculado)']]
  },
  'tradicoes-esotericas': {
    semGrupoIBGE: true,
    pessoas: { 2010: 74013, 2022: 167000 },
    pct: { 2010: 0.04, 2022: 0.09 },
    pctCalculado2022: true,
    contexto: 'Outras religiosidades',
    conferir: true,
    chips: [['167 mil', 'pessoas (2022)'], ['74.013', 'pessoas (2010)'], ['276 mil', '"espiritualizados" (categoria à parte, 2022)']],
    recordesNumeroRotulo: true,
    recordes: [['mais que dobrou', 'de 2010 para 2022', 'bases diferentes'], ['≈ 0,09%', 'da população em 2022 (calculado)']]
  },
  'santo-daime': {
    semGrupoIBGE: true,
    pessoas: { 2010: null, 2022: 14000 },
    pct: { 2010: null, 2022: 0.008 },
    pctCalculado2022: true,
    conferir2010: true,
    contexto: 'Outras religiosidades',
    conferir: true,
    chipsConferir: [2],
    chips: [['14 mil', 'pessoas (2022)'], ['≈ 0,008%', 'da população (calculado)'], ['c. 1930', 'origem do Santo Daime [conferir]']],
    recordesNumeroRotulo: true,
    recordes: [['"ayahuasqueiros"', 'termo usado pelo IBGE para quem pratica Santo Daime e afins']]
  },
  'sem-religiao': {
    semGrupoIBGE: false,
    grupoIBGE: 'sem',
    tabela: 'Sem religião',
    chips: [['9,3%', 'da população (2022)'], ['16,4 mi', 'de pessoas'], ['0,2%', 'em 1940']],
    subgrupos: [
      { nome: 'Sem religião (total)', pct: 9.3, pessoas: '16,4 milhões' },
      { nome: 'Ateus', pct: 1.0, pessoas: '1,7 milhão' },
      { nome: 'Agnósticos', pct: 0.5, pessoas: '881 mil' },
      { nome: 'Espiritualizados (categoria à parte)', pct: null, pessoas: '276 mil', conferir: true }
    ],
    recordes: [
      ['Roraima', '16,9%', 'maior % de sem religião (UF)'],
      ['Chuí (RS)', '37,8%', 'maior % entre os municípios'],
      ['14,3%', 'dos 20 a 24 anos', 'pico por faixa etária'],
      ['56,2%', 'são homens', 'perfil do grupo (2022)']
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
