import { COMPARATIVO, GRUPOS } from './dados-ibge.js';
import { SERIE } from './dados-censos.js';

export const FAMILIAS = [
  { id: 'cristianismo', nome: 'Cristianismo' },
  { id: 'afro-brasileiras', nome: 'Matrizes afro-brasileiras' },
  { id: 'indigenas', nome: 'Tradições indígenas' },
  { id: 'orientais', nome: 'Tradições orientais' },
  { id: 'outras', nome: 'Outras tradições e convicções' }
];

export const RELIGIOES = [
  { id: 'catolicismo', nome: 'Catolicismo', familia: 'cristianismo', status: 'disponivel', arquivo: 'catolicismo.html', resumo: 'História, crenças e presença do catolicismo no Brasil.' },
  { id: 'evangelicos', nome: 'Evangélicos e protestantismo', familia: 'cristianismo', status: 'disponivel', arquivo: 'evangelicos.html', resumo: 'Diversidade das tradições protestantes e evangélicas brasileiras.' },
  { id: 'testemunhas', nome: 'Testemunhas de Jeová', familia: 'cristianismo', status: 'breve' },
  { id: 'mormons', nome: 'Igreja de Jesus Cristo dos Santos dos Últimos Dias', familia: 'cristianismo', status: 'breve' },
  { id: 'espiritismo', nome: 'Espiritismo', familia: 'outras', status: 'disponivel', arquivo: 'espiritismo.html', resumo: 'Doutrina espírita, sua história e difusão no Brasil.' },
  { id: 'umbanda', nome: 'Umbanda', familia: 'afro-brasileiras', status: 'breve' },
  { id: 'candomble', nome: 'Candomblé', familia: 'afro-brasileiras', status: 'breve' },
  { id: 'tradicoes-indigenas', nome: 'Tradições indígenas', familia: 'indigenas', status: 'breve' },
  { id: 'judaismo', nome: 'Judaísmo', familia: 'outras', status: 'breve' },
  { id: 'islamismo', nome: 'Islamismo', familia: 'outras', status: 'breve' },
  { id: 'budismo', nome: 'Budismo', familia: 'orientais', status: 'breve' },
  { id: 'hinduismo', nome: 'Hinduísmo', familia: 'orientais', status: 'breve' },
  { id: 'esotericas', nome: 'Tradições esotéricas', familia: 'outras', status: 'breve' },
  { id: 'santo-daime', nome: 'Santo Daime e tradições ayahuasqueiras', familia: 'outras', status: 'breve' },
  { id: 'sem-religiao', nome: 'Ateísmo e pessoas sem religião', familia: 'outras', status: 'breve' }
];

export const EXTRAS = {
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
