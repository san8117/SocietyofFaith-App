export const SERIE = [ // % da população; null = ainda não incluído
  { ano: 1872, base: 'população total', catolica: 99.7, evangelicas: null, espirita: null, sem: null },
  { ano: 1890, base: 'população total', catolica: null, evangelicas: null, espirita: null, sem: null },
  { ano: 1940, base: '10 anos ou mais', catolica: 94.7, evangelicas: 2.7, espirita: 1.2, sem: 0.2 },
  { ano: 1950, base: 'população total', catolica: null, evangelicas: null, espirita: null, sem: null },
  { ano: 1960, base: 'população total', catolica: null, evangelicas: null, espirita: null, sem: null },
  { ano: 1970, base: 'população total', catolica: 91.8, evangelicas: null, espirita: null, sem: null },
  { ano: 1980, base: 'população total', catolica: 89.0, evangelicas: 6.6, espirita: null, sem: null },
  { ano: 1991, base: 'população total', catolica: 83.3, evangelicas: 9.0, espirita: null, sem: null },
  { ano: 2000, base: 'população total', catolica: 73.6, evangelicas: 15.4, espirita: null, sem: 7.3 },
  { ano: 2010, base: 'população total', catolica: 64.6, evangelicas: 22.2, espirita: 2.0, sem: 8.0 },
  { ano: 2022, base: '10 anos ou mais', catolica: 56.7, evangelicas: 26.9, espirita: 1.8, sem: 9.3 }
];
// Observação: em 2010, na base de 10+ (comparável a 2022), os valores são 65,1 / 21,6 / 2,2 / 7,9. Mostrar em nota de rodapé do gráfico.
export const QUEDA_CATOLICOS = [
  { periodo: '1970→1980', pp: -2.8 }, { periodo: '1980→1991', pp: -5.7 }, { periodo: '1991→2000', pp: -9.7 },
  { periodo: '2000→2010', pp: -9.0 }, { periodo: '2010→2022', pp: -8.4 }
];
export const CENSOS = [
  { ano: 1872, status: 'divulgado', resumo: 'Primeiro censo do Império.', pergunta: 'Pergunta binária: "católico" ou "acatólico". Toda a população escravizada foi registrada como católica.', numeros: 'Católicos: 99,7%.', links: ['biblioteca','memoria','series'] },
  { ano: 1890, status: 'divulgado', resumo: 'Primeiro censo da República.', pergunta: 'Campo aberto sobre "culto". Aparecem católicos, protestantes, ortodoxos, "islamitas", positivistas e pessoas sem culto.', numeros: null, links: ['biblioteca','memoria','series'] },
  { ano: 1900, status: 'nao-divulgado', resumo: 'Religião coletada, mas nunca divulgada.', pergunta: 'A informação foi coletada, mas os resultados não foram divulgados por fragilidades dos dados.', numeros: null, links: ['biblioteca','memoria'] },
  { ano: 1920, status: 'nao-investigado', resumo: 'O tema não foi investigado.', pergunta: 'O censo de 1920 não perguntou sobre religião.', numeros: null, links: ['biblioteca','memoria'] },
  { ano: 1940, status: 'divulgado', resumo: 'Primeiro censo conduzido pelo IBGE.', pergunta: 'Campo aberto, "religião". Passam a constar espíritas, israelitas, budistas e xintoístas.', numeros: 'Católicos 94,7%; evangélicos 2,7%; espíritas 1,2%; sem religião 0,2% (10+ anos).', links: ['biblioteca','memoria','series'] },
  { ano: 1950, status: 'divulgado', resumo: 'Mesmo padrão de 1940.', pergunta: 'Campo aberto, "religião", seguindo o modelo de 1940.', numeros: null, links: ['biblioteca','memoria','series'] },
  { ano: 1960, status: 'divulgado', resumo: 'Religião passa à amostra; campo fechado.', pergunta: 'Questionário de amostra. Lista fechada: católica romana, protestante, espírita, budista, israelita, ortodoxa, maometana, outra, sem religião.', numeros: null, links: ['biblioteca','memoria','series'] },
  { ano: 1970, status: 'divulgado', resumo: 'Campo fechado com 5 opções.', pergunta: 'Lista fechada: católica romana, evangélica, espírita, outra, sem religião.', numeros: 'Católicos: 91,8%.', links: ['biblioteca','memoria','series'] },
  { ano: 1980, status: 'divulgado', resumo: 'Volta ao campo aberto.', pergunta: 'Campo aberto; aparece a categoria "espírita afro-brasileira".', numeros: 'Católicos 89,0%; evangélicos 6,6%.', links: ['biblioteca','series'] },
  { ano: 1991, status: 'divulgado', resumo: 'Quesito "religião ou culto".', pergunta: 'Pergunta "religião ou culto"; classificação feita em parceria com o ISER.', numeros: 'Católicos 83,3%; evangélicos 9,0%.', links: ['biblioteca','series','sidra'] },
  { ano: 2000, status: 'divulgado', resumo: 'Codificação informatizada.', pergunta: 'Sistema informatizado com banco descritor; surge a categoria "tradições indígenas".', numeros: 'Católicos 73,6%; evangélicos 15,4%; sem religião 7,3%.', links: ['biblioteca','series','sidra'] },
  { ano: 2010, status: 'divulgado', resumo: 'Coleta em dispositivo móvel.', pergunta: 'Semelhante a 2000; coleta em dispositivo móvel de coleta (DMC).', numeros: 'Católicos 64,6%; evangélicos 22,2%; espíritas 2,0%; sem religião 8,0% (população total).', links: ['censo2010','sidra','series'] },
  { ano: 2022, status: 'divulgado', resumo: 'Só para 10+ anos; quesito indígena.', pergunta: 'Semelhante a 2010, apenas para pessoas de 10 anos ou mais. Em terras indígenas: "Qual a sua crença, ritual indígena ou religião?".', numeros: 'Católicos 56,7%; evangélicos 26,9%; espíritas 1,8%; sem religião 9,3%.', links: ['censo2022','pdf2022','noticia2022','sidra'] }
];
export const ANOS_SEM_CENSO = [1880, 1910, 1930];
export const LINKS = {
  censo2022:   { titulo: 'Portal do Censo 2022', desc: 'Resultados do Censo Demográfico 2022.', url: 'https://censo2022.ibge.gov.br' },
  pdf2022:     { titulo: 'Censo 2022: Religiões (PDF)', desc: 'Resultados preliminares da amostra, com série histórica.', url: 'https://biblioteca.ibge.gov.br/visualizacao/livros/liv102182.pdf' },
  noticia2022: { titulo: 'Divulgação IBGE: religiões 2022', desc: 'Notícia da Agência IBGE sobre os resultados.', url: 'https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/43599-censo-2022-no-rio-de-janeiro-rj-ibge-divulga-resultados-preliminares-para-religioes' },
  censo2010:   { titulo: 'Censo 2010: católicos caem', desc: 'Notícia da Agência IBGE sobre religião em 2010.', url: 'https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/14244-asi-censo-2010-numero-de-catolicos-cai-e-aumenta-o-de-evangelicos-espiritas-e-sem-religiao' },
  sidra:       { titulo: 'SIDRA', desc: 'Tabelas dos censos por tema (Religião).', url: 'https://sidra.ibge.gov.br' },
  biblioteca:  { titulo: 'Biblioteca do IBGE', desc: 'Volumes originais dos recenseamentos (busque pelo ano).', url: 'https://biblioteca.ibge.gov.br' },
  series:      { titulo: 'Séries Estatísticas e Históricas', desc: 'Séries de longo prazo, incluindo religião.', url: 'https://seriesestatisticas.ibge.gov.br' },
  memoria:     { titulo: 'Memória IBGE', desc: 'História dos censos brasileiros.', url: 'https://memoria.ibge.gov.br' }
};
