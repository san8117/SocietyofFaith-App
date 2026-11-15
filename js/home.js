import { COMPARATIVO } from './dados-ibge.js';
import { RELIGIOES } from './dados-religioes.js';
import { IMAGENS_RELIGIOES } from './imagens-religioes.js';

const CRIADORES = [
  'Guilherme Oliveira de Santana',
  'Pedro Henrique Gomes',
  'Henrique Soares',
  'Lucas Cardoso',
  'Kaue Bueno'
];

const DESTAQUES = {
  catolicismo: '56,7%',
  evangelicos: '26,9%',
  umbanda: `${COMPARATIVO[2022][3].toLocaleString('pt-BR', { minimumFractionDigits: 1 })}%`,
  candomble: `${COMPARATIVO[2022][3].toLocaleString('pt-BR', { minimumFractionDigits: 1 })}%`,
  'tradicoes-indigenas': `${COMPARATIVO[2022][4].toLocaleString('pt-BR', { minimumFractionDigits: 1 })}%`
};

const CORES = ['#A8502F', '#D9A58B', '#6B645D', '#E6DDD3'];

function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

function iniciais(nome) {
  const partes = nome.split(/\s+/).filter((parte) => !['de', 'da', 'do', 'dos', 'das'].includes(parte.toLowerCase()));
  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toLocaleUpperCase('pt-BR');
}

function figuraImagem(religiao) {
  const figura = criar('figure', 'religion-product__image');
  const imagem = IMAGENS_RELIGIOES[religiao.id]?.capa;

  if (imagem?.src && imagem.alt && imagem.credito && imagem.licenca && (!imagem.sensivel || imagem.fonte)) {
    const elemento = criar('img');
    elemento.src = imagem.src;
    elemento.alt = imagem.alt;
    elemento.loading = 'lazy';
    elemento.decoding = 'async';
    figura.append(elemento);
  } else {
    figura.setAttribute('role', 'img');
    figura.setAttribute('aria-label', `Imagem de ${religiao.nome} em curadoria`);
    figura.append(criar('figcaption', '', 'Imagem em curadoria'));
  }
  return figura;
}

function montarReligiao(religiao) {
  const artigo = criar('article', 'religion-product');
  artigo.append(figuraImagem(religiao));

  const corpo = criar('div', 'religion-product__body');
  const titulo = criar('h3', 'religion-product__title');
  const link = criar('a', '', religiao.nome);
  link.href = religiao.pagina || religiao.arquivo;
  titulo.append(link, criar('span', 'religion-product__stat', religiao.destaque || DESTAQUES[religiao.id] || ''));
  corpo.append(titulo, criar('p', 'religion-product__summary', religiao.resumo || 'Conheça a história e a presença desta tradição no Brasil.'));
  if (religiao.sub) corpo.append(criar('p', 'religion-product__sub', religiao.sub));

  const detalhes = criar('div', 'religion-product__details');
  const bolinhas = criar('span', 'religion-product__dots');
  bolinhas.setAttribute('aria-hidden', 'true');
  CORES.forEach((cor) => {
    const bolinha = criar('span');
    bolinha.style.setProperty('--dot-color', cor);
    bolinhas.append(bolinha);
  });
  detalhes.append(bolinhas, document.createTextNode('história · dados · imagens'));
  corpo.append(detalhes);
  artigo.append(corpo);
  return artigo;
}

const listaReligioes = document.querySelector('[data-home-religions]');
if (listaReligioes) {
  const prontas = RELIGIOES.filter((religiao) => religiao.status === 'pronta' && (religiao.pagina || religiao.arquivo));
  listaReligioes.replaceChildren(...prontas.map(montarReligiao));
}

const listaCriadores = document.querySelector('[data-home-creators]');
if (listaCriadores) {
  const itens = CRIADORES.map((nome) => {
    const item = criar('li', 'creator');
    const avatar = criar('span', 'creator__initials', iniciais(nome));
    avatar.setAttribute('aria-hidden', 'true');
    item.append(avatar, criar('span', 'creator__name', nome));
    return item;
  });
  listaCriadores.replaceChildren(...itens);
}

document.querySelectorAll('[data-counter]').forEach((contador) => {
  const destino = Number(contador.dataset.value);
  const casasDecimais = Number(contador.dataset.decimals || 0);
  const saida = (valor) => valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais
  });
  if (!Number.isFinite(destino) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (Number.isFinite(destino)) contador.textContent = saida(destino);
    return;
  }

  const inicio = performance.now();
  const duracao = 1100;
  const atualizar = (agora) => {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const suavizado = 1 - ((1 - progresso) ** 3);
    contador.textContent = saida(destino * suavizado);
    if (progresso < 1) requestAnimationFrame(atualizar);
  };
  contador.textContent = saida(0);
  requestAnimationFrame(atualizar);
});

const trilha = document.querySelector('#home-showcase');
document.querySelector('[data-carousel-prev]')?.addEventListener('click', () => {
  if (!trilha) return;
  trilha.scrollBy({ left: -trilha.clientWidth * 0.8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});
document.querySelector('[data-carousel-next]')?.addEventListener('click', () => {
  if (!trilha) return;
  trilha.scrollBy({ left: trilha.clientWidth * 0.8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});
