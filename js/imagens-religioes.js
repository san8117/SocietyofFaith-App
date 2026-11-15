const slots = ['capa', 'origens', 'brasil', 'hoje', 'galeria1', 'galeria2', 'galeria3'];

const sugestoes = {
  catolicismo: ['igreja católica arquitetura', 'cristianismo antigo arte', 'catolicismo no Brasil igrejas', 'missa comunidade católica', 'arte sacra católica', 'festa religiosa católica Brasil', 'catedral brasileira'],
  evangelicos: ['igreja protestante história', 'reforma protestante arte', 'igreja evangélica Brasil', 'culto evangélico comunidade', 'bíblia protestantismo', 'música evangélica comunidade', 'igreja protestante arquitetura'],
  espiritismo: ['Allan Kardec domínio público', 'espiritismo história Brasil', 'centro espírita Brasil', 'estudo espírita grupo', 'livro dos espíritos edição histórica', 'centro espírita arquitetura', 'biblioteca espírita'],
  umbanda: ['Zélio Fernandino de Moraes licença', 'Neves São Gonçalo Niterói mapa paisagem', 'Festa de Iemanjá Copacabana', 'Tenda de umbanda fachada arquitetura', 'Atabaque instrumento', 'Festa de Iemanjá Santos praia', 'Brasão Federação Umbanda licença'],
  candomble: ['Terreiro da Casa Branca Salvador fachada', 'Ilê Axé Iyá Nassô Oká', 'Lavagem do Bonfim Salvador', 'Festa de Iemanjá Rio Vermelho Salvador', 'Acarajé baiana de acarajé Salvador', 'Ilê Axé Opô Afonjá', 'Mãe Menininha do Gantois licença'],
  'tradicoes-indigenas': ['Kuarup Alto Xingu autorização licença', 'Debret índios do Brasil domínio público', 'Terra Indígena Xingu mapa', 'Escola indígena aldeia Agência Brasil', 'Arte plumária indígena museu', 'Grafismo indígena cerâmica museu', 'Davi Kopenawa licença']
};

export const IMAGENS_RELIGIOES = Object.fromEntries(
  Object.entries(sugestoes).map(([pagina, consultas]) => [
    pagina,
    Object.fromEntries(slots.map((slot, indice) => [slot, {
      status: 'pendente',
      pendente: true,
      sensivel: ['umbanda', 'candomble', 'tradicoes-indigenas'].includes(pagina),
      src: null,
      alt: `${slot === 'capa' ? 'Imagem de abertura' : `Imagem ${slot}`} sugerida para ${pagina.replaceAll('-', ' ')}: ${consultas[indice]}.`,
      legenda: `Sugestão de imagem: ${consultas[indice]}.`,
      credito: '',
      licenca: '',
      fonte: '',
      consulta: consultas[indice]
    }]))
  ])
);
