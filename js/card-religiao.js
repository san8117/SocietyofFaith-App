import { figuraImagem } from './imagens.js';
import { COMPARATIVO, DENOMINACOES_2022 } from './dados-ibge.js';
import { formatarPercentual } from './charts-core.js';

const CORES_FAMILIA = {
  cristianismo: ['#A8502F', '#D9A58B', '#6B645D', '#E6DDD3'],
  'afro-brasileiras': ['#C8553D', '#B8742C', '#4E8A5B', '#D9A58B'],
  indigenas: ['#4E8A5B', '#A8502F', '#D9A58B', '#6B645D'],
  outras: ['#6C5B9E', '#3E5C99', '#1F7A6D', '#3D4A57']
};

function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

function obterDestaque(religiao) {
  if (religiao.destaque) return religiao.destaque;
  const indices = {
    catolicismo: 0,
    evangelicos: 1,
    espiritismo: 2,
    'sem-religiao': 3,
    'tradicoes-indigenas': 4
  };
  if (indices[religiao.id] !== undefined) return formatarPercentual(COMPARATIVO[2022][indices[religiao.id]]);
  const denominacao = DENOMINACOES_2022.find((item) => item.nome === religiao.nome);
  return denominacao ? formatarPercentual(denominacao.pct) : '—';
}

export function cardReligiao(religiao, { href } = {}) {
  const card = criar('article', 'religion-card');
  card.dataset.family = religiao.familia || 'outras';
  const imagem = figuraImagem(religiao.id, 'capa', null, { interactive: false });
  imagem.classList.add('religion-card__image');
  card.append(imagem);

  const corpo = criar('div', 'religion-card__body');
  const titulo = criar('h3', 'religion-card__title');
  const link = criar('a', '', religiao.nome);
  link.href = href || religiao.pagina || religiao.arquivo || 'religioes.html';
  titulo.append(link, criar('strong', 'religion-card__stat', obterDestaque(religiao)));
  corpo.append(titulo);
  corpo.append(criar('p', 'religion-card__summary', religiao.resumo || '—'));
  corpo.append(criar('p', 'religion-card__base', `Censo 2022 · ${religiao.baseCenso || 'base'}`));

  const rodape = criar('div', 'religion-card__footer');
  const bolinhas = criar('span', 'religion-card__dots');
  bolinhas.setAttribute('aria-hidden', 'true');
  (CORES_FAMILIA[religiao.familia] || CORES_FAMILIA.outras).forEach((cor) => {
    const bolinha = criar('span');
    bolinha.style.setProperty('--dot-color', cor);
    bolinhas.append(bolinha);
  });
  rodape.append(bolinhas, criar('span', 'religion-card__topics', 'história · dados · imagens'));
  rodape.append(criar('span', 'religion-card__arrow', '→'));
  corpo.append(rodape);
  card.append(corpo);
  return card;
}
