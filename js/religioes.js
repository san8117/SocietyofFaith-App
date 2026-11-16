import { EXTRAS, FAMILIAS, RELIGIOES } from './dados-religioes.js';
import { formatarPercentual, gerarTabela } from './charts-core.js';
import { cardReligiao } from './card-religiao.js';

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
  const resultado = RELIGIOES.filter((religiao) => religiao.nome.toLocaleLowerCase('pt-BR').includes(busca));
  const familias = FAMILIAS.filter((familia) => familiaAtual === 'todas' || familia.id === familiaAtual);
  const grupos = familias.map((familia) => {
    const itens = resultado.filter((religiao) => religiao.familia === familia.id);
    if (!itens.length) return null;
    const grupo = elemento('section', 'religion-family');
    const titulo = elemento('h3', 'religion-family__title', familia.nome);
    titulo.id = `religion-family-${familia.id}-title`;
    grupo.setAttribute('aria-labelledby', titulo.id);
    const grade = elemento('div', 'religion-family__grid');
    grade.append(...itens.map((religiao) => cardReligiao(religiao)));
    grupo.append(titulo, grade);
    return grupo;
  }).filter(Boolean);
  cards.replaceChildren(...grupos);
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
