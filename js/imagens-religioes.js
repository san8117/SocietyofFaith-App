const slots = ['capa', 'origens', 'brasil', 'hoje', 'galeria1', 'galeria2', 'galeria3'];

const sugestoes = {
  catolicismo: ['igreja católica arquitetura', 'cristianismo antigo arte', 'catolicismo no Brasil igrejas', 'missa comunidade católica', 'arte sacra católica', 'festa religiosa católica Brasil', 'catedral brasileira'],
  evangelicos: ['igreja protestante história', 'reforma protestante arte', 'igreja evangélica Brasil', 'culto evangélico comunidade', 'bíblia protestantismo', 'música evangélica comunidade', 'igreja protestante arquitetura'],
  espiritismo: ['Allan Kardec domínio público', 'espiritismo história Brasil', 'centro espírita Brasil', 'estudo espírita grupo', 'livro dos espíritos edição histórica', 'centro espírita arquitetura', 'biblioteca espírita']
};

export const IMAGENS_RELIGIOES = Object.fromEntries(
  Object.entries(sugestoes).map(([pagina, consultas]) => [
    pagina,
    Object.fromEntries(slots.map((slot, indice) => [slot, {
      status: 'pendente',
      src: null,
      alt: '',
      credito: null,
      licenca: null,
      consulta: consultas[indice]
    }]))
  ])
);
