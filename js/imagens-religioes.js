const slots = ['capa', 'origens', 'brasil', 'hoje', 'galeria1', 'galeria2', 'galeria3'];

const nomes = {
  cristianismo: 'Cristianismo',
  catolicismo: 'Catolicismo',
  evangelicos: 'Evangélicos',
  espiritismo: 'Espiritismo',
  umbanda: 'Umbanda',
  candomble: 'Candomblé',
  'tradicoes-indigenas': 'Tradições indígenas',
  judaismo: 'Judaísmo',
  islamismo: 'Islamismo',
  budismo: 'Budismo',
  hinduismo: 'Hinduísmo',
  'testemunhas-de-jeova': 'Testemunhas de Jeová',
  mormons: 'Mórmons',
  'tradicoes-esotericas': 'Tradições esotéricas',
  'santo-daime': 'Santo Daime',
  'sem-religiao': 'Sem religião',
};

const legendaPorSlot = {
  capa: 'Capa',
  origens: 'Origens',
  brasil: 'No Brasil',
  hoje: 'Hoje',
  galeria1: 'Detalhe 1',
  galeria2: 'Detalhe 2',
  galeria3: 'Detalhe 3',
};

function criarItem(slug, slot, nome) {
  const legendaBase = legendaPorSlot[slot] || slot;
  const extra = slug === 'tradicoes-indigenas'
    ? 'Padrão geométrico ilustrativo; não representa um povo específico'
    : '';
  const legenda = extra ? `${legendaBase} · ${extra}` : legendaBase;
  const arquivo = `${slot}.svg`;

  return {
    arquivo,
    status: 'pronto',
    pendente: false,
    tipo: 'arte',
    width: 1600,
    height: 1000,
    src: `assets/img/religioes/${slug}/${arquivo}`,
    alt: `Ilustração abstrata inspirada em ${nome} — ${legendaBase}`,
    legenda: slot === 'capa' ? nome : legenda,
    credito: 'Ilustração original do projeto Society of Faith (gerada em código)',
    licenca: 'Autoria própria',
    fonte: '',
    sensivel: slug === 'santo-daime'
      || (['umbanda', 'candomble', 'tradicoes-indigenas', 'judaismo', 'islamismo', 'budismo', 'hinduismo'].includes(slug)
        && ['hoje', 'galeria1', 'galeria2', 'galeria3'].includes(slot)),
  };
}

export const IMAGENS_RELIGIOES = Object.fromEntries(
  Object.entries(nomes).map(([slug, nome]) => [
    slug,
    Object.fromEntries(slots.map((slot) => [slot, criarItem(slug, slot, nome)]))
  ])
);
