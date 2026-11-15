import { EXTRAS, FAMILIAS, RELIGIOES } from './dados-religioes.js';
import { formatarPercentual, gerarTabela } from './charts-core.js';

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
  const busca = search.value.trim().toLocaleLowerCase('pt-BR');
  const resultado = RELIGIOES.filter((religiao) => {
    const correspondeFamilia = familiaAtual === 'todas' || religiao.familia === familiaAtual;
    return correspondeFamilia && religiao.nome.toLocaleLowerCase('pt-BR').includes(busca);
  });
  cards.replaceChildren(...resultado.map((religiao) => {
    const familia = FAMILIAS.find((item) => item.id === religiao.familia);
    const article = elemento('article', 'religion-card');
    article.append(elemento('p', 'eyebrow', familia?.nome ?? 'Tradição religiosa'));
    article.append(elemento('h3', '', religiao.nome));
    if (religiao.resumo) article.append(elemento('p', '', religiao.resumo));
    if (religiao.status === 'disponivel') {
      const link = elemento('a', 'button--secondary', 'Conheça esta tradição');
      link.href = religiao.arquivo;
      article.append(link);
    } else {
      const emBreve = elemento('span', 'religion-card__status', 'Conteúdo em breve');
      emBreve.setAttribute('aria-label', `${religiao.nome}: conteúdo em breve`);
      article.append(emBreve);
    }
    return article;
  }));
  status.textContent = `${resultado.length} ${resultado.length === 1 ? 'tradição encontrada' : 'tradições encontradas'}.`;
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
