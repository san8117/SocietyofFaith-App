import { COMPARATIVO, DENOMINACOES_2022 } from './dados-ibge.js';
import { RELIGIOES } from './dados-religioes.js';
import { IMAGENS_RELIGIOES } from './imagens-religioes.js';
import { initCarrossel } from './carrossel.js';

const CRIADORES = [
  'Guilherme Oliveira de Santana',
  'Pedro Henrique Gomes',
  'Henrique Soares',
  'Lucas Cardoso',
  'Kaue Bueno'
];

const percentual = (valor) => `${valor.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}%`;
const denominacao = (nome) => DENOMINACOES_2022.find((item) => item.nome === nome)?.pct;
const DESTAQUES = {
  catolicismo: percentual(COMPARATIVO[2022][0]),
  evangelicos: percentual(COMPARATIVO[2022][1]),
  umbanda: percentual(denominacao('Umbanda')),
  candomble: percentual(denominacao('Candomblé')),
  'tradicoes-indigenas': percentual(COMPARATIVO[2022][4])
};
const SUBTITULOS_DESTAQUES = {
  umbanda: 'microdados do Censo 2022',
  candomble: 'microdados do Censo 2022',
  'tradicoes-indigenas': 'Censo 2022 · população 10+'
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
    figura.setAttribute('aria-label', `Ilustração de ${religiao.nome}`);
    figura.style.background = 'linear-gradient(135deg, rgba(138, 58, 28, 0.28), rgba(246, 238, 230, 0.5))';
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
  const subtitulo = religiao.sub || SUBTITULOS_DESTAQUES[religiao.id];
  if (subtitulo) corpo.append(criar('p', 'religion-product__sub', subtitulo));

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
  initCarrossel(listaReligioes, { autoplay: true, intervalo: 4500 });
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

initCarrossel(document.querySelector('#home-showcase'), { autoplay: true, intervalo: 4500 });
