import { RELIGIOES } from './dados-religioes.js';
import { initCarrossel } from './carrossel.js';
import { cardReligiao } from './card-religiao.js';

const CRIADORES = [
  'Guilherme Oliveira de Santana',
  'Pedro Henrique Gomes',
  'Henrique Soares',
  'Lucas Cardoso',
  'Kaue Bueno'
];

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

function montarReligiao(religiao) {
  return cardReligiao(religiao);
}

const listaReligioes = document.querySelector('[data-home-religions]');
if (listaReligioes) {
  const prontas = RELIGIOES.filter((religiao) => religiao.status === 'pronta' && (religiao.pagina || religiao.arquivo));
  listaReligioes.replaceChildren(...prontas.map(montarReligiao));
  initCarrossel(listaReligioes, { autoplay: true, intervalo: 5000 });
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

initCarrossel(document.querySelector('#home-showcase'), { autoplay: true, intervalo: 5000 });
