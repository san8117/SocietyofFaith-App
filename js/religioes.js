import { EXTRAS, FAMILIAS, RELIGIOES } from './dados-religioes.js';
import { IMAGENS_RELIGIOES } from './imagens-religioes.js';
import { formatarPercentual, gerarTabela } from './charts-core.js';
import { destroyCarrossel, initCarrossel } from './carrossel.js';

const filtros = document.querySelector('[data-family-filters]');
const cards = document.querySelector('[data-religion-cards]');
const search = document.querySelector('#religion-search');
const status = document.querySelector('[data-filter-status]');
let familiaAtual = 'todas';

function elemento(tag, classe, texto) {
  const node = document.createElement(tag);
  if (classe) node.className = classe;
  if (texto) node.textContent = texto;
  return node;
}

function renderizarFiltros() {
  const opcoes = [{ id: 'todas', nome: 'Todas' }, ...FAMILIAS];
  filtros.replaceChildren(...opcoes.map((familia) => {
    const botao = elemento('button', 'filter-chip', familia.nome);
    botao.type = 'button';
    botao.setAttribute('aria-pressed', String(familia.id === familiaAtual));
    botao.addEventListener('click', () => {
      familiaAtual = familia.id;
      renderizarFiltros();
      renderizarCards();
    });
    return botao;
  }));
}

function renderizarCards() {
  cards.querySelectorAll('[data-carousel]').forEach(destroyCarrossel);
  const busca = search.value.trim().toLocaleLowerCase('pt-BR');
  const resultado = RELIGIOES.filter((religiao) => religiao.nome.toLocaleLowerCase('pt-BR').includes(busca));
  const familias = FAMILIAS.filter((familia) => familiaAtual === 'todas' || familia.id === familiaAtual);
  const vitrines = familias.map((familia) => {
    const itens = resultado.filter((religiao) => religiao.familia === familia.id);
    if (!itens.length) return null;
    const vitrine = elemento('section', 'religion-family');
    vitrine.dataset.carouselShell = '';
    const titulo = elemento('h3', 'religion-family__title', familia.nome);
    titulo.id = `religion-family-${familia.id}-title`;
    vitrine.setAttribute('aria-labelledby', titulo.id);
    const trilha = elemento('div', 'religion-cards');
    trilha.id = `religion-family-${familia.id}`;
    trilha.tabIndex = 0;
    trilha.setAttribute('aria-label', `${familia.nome}, role horizontalmente para explorar`);
    const cardsFamilia = itens.map((religiao) => {
      const article = elemento('article', 'religion-card');
      const figure = elemento('figure', 'religion-card__image');
      const imagem = IMAGENS_RELIGIOES[religiao.id]?.capa;
      if (imagem?.src && imagem.alt && imagem.credito && imagem.licenca && (!imagem.sensivel || imagem.fonte)) {
        const img = elemento('img');
        img.src = imagem.src;
        img.alt = imagem.alt;
        img.loading = 'lazy';
        img.decoding = 'async';
        figure.append(img);
      } else {
        figure.setAttribute('role', 'img');
        figure.setAttribute('aria-label', `Capa de ${religiao.nome} em curadoria`);
        figure.append(elemento('figcaption', '', 'Imagem em curadoria'));
      }
      article.append(figure);
      article.append(elemento('h4', '', religiao.nome));
      if (religiao.resumo) article.append(elemento('p', '', religiao.resumo));
      if (religiao.destaque) article.append(elemento('p', 'religion-card__highlight', religiao.destaque));
      if (religiao.sub) article.append(elemento('p', 'religion-card__sub', religiao.sub));
      if (religiao.status === 'disponivel' || religiao.status === 'pronta' || religiao.pagina) {
        const link = elemento('a', 'button--secondary', 'Conheça esta tradição');
        link.href = religiao.pagina ?? religiao.arquivo;
        article.append(link);
      } else {
        const emBreve = elemento('span', 'religion-card__status', 'Conteúdo em breve');
        emBreve.setAttribute('aria-label', `${religiao.nome}: conteúdo em breve`);
        article.append(emBreve);
      }
      return article;
    });
    trilha.replaceChildren(...cardsFamilia);
    vitrine.append(titulo, trilha);
    initCarrossel(trilha, { autoplay: true, intervalo: 4500 });
    return vitrine;
  }).filter(Boolean);
  cards.replaceChildren(...vitrines);
  const visiveis = resultado.filter((religiao) => familiaAtual === 'todas' || religiao.familia === familiaAtual).length;
  status.textContent = `Mostrando ${visiveis} de ${RELIGIOES.length} tradições.`;
}

function renderizarDados() {
  const valores = EXTRAS.censo.grupos.map((grupo, indice) => ({
    nome: grupo.nome,
    valor: EXTRAS.censo.comparativo[2022][indice]
  }));
  const container = document.querySelector('[data-religion-bars]');
  container.replaceChildren(...valores.map(({ nome, valor }) => {
    const linha = elemento('div', 'religion-bar');
    const label = elemento('div', 'religion-bar__label');
    label.append(elemento('span', '', nome), elemento('strong', '', formatarPercentual(valor)));
    const track = elemento('div', 'religion-bar__track');
    track.setAttribute('role', 'img');
    track.setAttribute('aria-label', `${nome}: ${formatarPercentual(valor)}`);
    const fill = elemento('span', 'religion-bar__fill');
    fill.style.width = `${Math.max(0, Math.min(100, valor))}%`;
    track.append(fill);
    linha.append(label, track);
    return linha;
  }));
  gerarTabela(
    document.querySelector('[data-table="religion-summary"]'),
    'Percentual por grupo religioso, Censo 2022',
    ['Grupo', '2022'],
    valores.map(({ nome, valor }) => [nome, formatarPercentual(valor)])
  );
}

search.addEventListener('input', renderizarCards);
renderizarFiltros();
renderizarCards();
renderizarDados();
