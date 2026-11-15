const area = (id, titulo, icone, resumo, exemplos, olhares, refletir, fonte, conferir = false, conferirOlhares = []) => ({
  id, titulo, icone, resumo, exemplos, olhares, refletir, fonte, conferir, conferirOlhares
});

export const SOCIEDADE = {
  catolicismo: {
    conceito: {
      rotulo: 'Campo religioso (Bourdieu)',
      frase: 'Por muito tempo, o catolicismo foi a religião de referência do país, o que muda a forma como as demais tradições aparecem no campo religioso.',
      href: 'religiao.html#identidade'
    },
    areas: [
      area('educacao', 'Educação', 'educacao',
        'A história da educação brasileira só pode ser compreendida à luz da relação com a Igreja Católica, que durante séculos teve papel central nas escolas.',
        [
          { titulo: 'Jesuítas (1549)', texto: 'Chegam para fundar colégios e missões.' },
          { titulo: 'Universidades confessionais', texto: 'A LDB (art. 19) permite instituições confessionais, como a PUC-SP, católica.' },
          { titulo: 'Ensino Religioso', texto: 'Componente curricular discutido em escolas públicas.' }
        ],
        ['Escolas confessionais ampliaram o acesso à educação e formaram gerações de estudantes.', 'Num Estado laico (desde 1891), a escola pública deve tratar a religião de modo plural, sem privilegiar uma tradição.'],
        'Como ensinar sobre religiões sem favorecer nenhuma?',
        'CARVALHO; CARVALHO, 2011, p. 56 (Aula 1, Antropologia Cristã, UNASP); LDB 9.394/96, art. 19.'),
      area('assistencia', 'Assistência social e saúde', 'assistencia',
        'Instituições ligadas à Igreja atuam há séculos em saúde e assistência.',
        [
          { titulo: 'Santas Casas de Misericórdia', texto: 'Presentes no Brasil desde o século XVI.' },
          { titulo: 'Pastoral da Criança', texto: 'Criada em 1983.', conferir: true },
          { titulo: 'Cáritas', texto: 'Rede católica de ação social.', conferir: true }
        ],
        ['A ação caritativa alcança quem o Estado nem sempre alcança.', 'Serviços essenciais dependem do Estado; a caridade não substitui políticas públicas.'],
        'Qual é a diferença entre caridade e direito social?',
        'Texto de apoio; IBGE para o contexto social (links da página).'),
      area('cultura', 'Cultura e festas', 'cultura',
        'O calendário e a arte do país carregam marcas católicas.',
        [
          { titulo: 'Círio de Nazaré', texto: 'Festa em Belém desde 1793.' },
          { titulo: 'Nossa Senhora Aparecida', texto: 'Padroeira do Brasil desde 1930; 12 de outubro é feriado nacional.', conferir: true },
          { titulo: 'Festas juninas', texto: 'Ligadas a santos como Santo Antônio, São João e São Pedro.' },
          { titulo: 'Carnaval e Quaresma', texto: 'O carnaval se relaciona ao calendário litúrgico.' }
        ],
        ['Festas e romarias unem comunidades, preservam tradições e movimentam a cultura popular.', 'Há quem se sinta católico pela cultura, sem praticar; o censo registra “declarantes não praticantes”.'],
        'Uma festa religiosa é fé, cultura ou as duas coisas?',
        'Texto 01 (declarantes não praticantes); Aulas 2 e 3.'),
      area('politica', 'Política e leis', 'politica',
        'Do padroado à separação entre Igreja e Estado, a política brasileira sempre dialogou com o catolicismo.',
        [
          { titulo: 'Religião oficial do Império', texto: 'O catolicismo foi a religião oficial no Império (1824).' },
          { titulo: 'Estado laico', texto: 'A separação entre Igreja e Estado foi estabelecida em 1891.' },
          { titulo: 'CNBB (1952)', texto: 'Reúne os bispos e participa do debate público.' },
          { titulo: 'CEBs e Teologia da Libertação', texto: 'A partir dos anos 1960 e 1970, ligam fé e justiça social.' }
        ],
        ['A Igreja deu voz a causas sociais e à defesa de direitos.', 'Instituições religiosas, ao atuarem na política, devem respeitar a pluralidade de crenças.'],
        'Até onde a religião pode influenciar uma lei num Estado laico?',
        'Texto de apoio (história do catolicismo no Brasil); Texto 01.'),
      area('familia', 'Família e valores', 'familia',
        'Ritos como batismo e matrimônio marcam a vida de muitas famílias.',
        [
          { titulo: 'Batismo e primeira comunhão', texto: 'Ritos de passagem.' },
          { titulo: 'Casamento religioso', texto: 'Uma celebração religiosa presente na vida de algumas famílias.' },
          { titulo: 'Debates públicos', texto: 'Posições da Igreja sobre família e vida participam do debate, onde convivem opiniões diversas, inclusive entre católicos.' }
        ],
        ['Para muitos, os ritos dão sentido e vínculo comunitário.', 'Para outros, as normas da instituição nem sempre acompanham a vida das pessoas.'],
        'Pertencer a uma religião é seguir todas as suas regras?',
        'Texto 01 (declarantes não praticantes; fronteiras tênues).'),
      area('convivencia', 'Convivência e diversidade', 'convivencia',
        'No Brasil, o catolicismo conviveu e se misturou com outras tradições.',
        [
          { titulo: 'Sincretismo', texto: 'Aproximações entre tradições católicas e religiões afro-brasileiras, sem reduzir suas diferenças.' },
          { titulo: 'Dupla pertença', texto: 'Frequentar mais de uma religião.' },
          { titulo: 'Trânsito religioso', texto: 'A queda católica — de 99,7% em 1872 a 56,7% em 2022 — vem junto de maior diversidade.' }
        ],
        ['O encontro de tradições é parte da riqueza cultural brasileira.', 'Sincretismo também nasceu de imposição e apagamento de religiões africanas e indígenas.'],
        'Quando a mistura é troca e quando é imposição?',
        'Texto 01; Aulas 2 e 3 (sincretismo, dupla pertença, trânsito religioso); IBGE.')
    ]
  },
  evangelicos: {
    conceito: {
      rotulo: 'Trânsito religioso e identidade (Hervieu-Léger)',
      frase: 'Os fiéis circulam entre igrejas e a identidade religiosa se revela nas interações com a sociedade, não só na doutrina.',
      href: 'religiao.html#identidade'
    },
    areas: [
      area('educacao', 'Educação', 'educacao',
        'Igrejas protestantes e evangélicas mantêm escolas e instituições de ensino superior confessionais.',
        [
          { titulo: 'Instituições confessionais', texto: 'Mackenzie (presbiteriana), UMESP (metodista) e UNASP (adventista) são exemplos em São Paulo, previstos na LDB.' },
          { titulo: 'Escola bíblica dominical', texto: 'Ensino religioso e comunitário nas igrejas.', conferir: true },
          { titulo: 'Alfabetização e leitura da Bíblia', texto: 'O foco no texto bíblico incentivou, historicamente, a leitura.', conferir: true }
        ],
        ['Instituições confessionais oferecem ensino de qualidade com identidade própria.', 'O ensino confessional não deve se confundir com doutrinação na escola pública.'],
        'Educação com identidade religiosa e ensino plural podem caminhar juntos?',
        'Aula 1 (Antropologia Cristã, UNASP); LDB 9.394/96, art. 19.'),
      area('assistencia', 'Assistência social e comunidade', 'assistencia',
        'Estudos e reportagens apontam a assistência social e o acolhimento comunitário como fatores de atração e fidelização, sobretudo em contextos de migração do campo para a cidade.',
        [
          { titulo: 'Êxodo rural', texto: 'Recém-chegados encontram rede de apoio na igreja.' },
          { titulo: 'Ações sociais', texto: 'Distribuição de alimentos, atendimento e grupos de apoio.' },
          { titulo: 'Linguagem acessível', texto: 'Culto e pregação mais próximos do cotidiano.' }
        ],
        ['Para muitos, a igreja oferece pertencimento, apoio emocional e prático.', 'O Texto 01 lembra que a dimensão econômica também pode motivar conversões, o que merece análise cuidadosa.'],
        'O que leva alguém a escolher uma comunidade religiosa?',
        'BBC News Brasil, “O que explica a multiplicação de igrejas” (Aula 3); Texto 01.'),
      area('cultura', 'Cultura e mídia', 'cultura',
        'As igrejas evangélicas produzem cultura própria.',
        [
          { titulo: 'Música gospel', texto: 'Produção musical e festivais.' },
          { titulo: 'Rádio, TV, internet e editoras', texto: 'Meios de comunicação e publicação próprios.', conferir: true },
          { titulo: 'Marcha para Jesus', texto: 'Evento de rua com grande participação; o ano de criação requer conferência.', conferir: true }
        ],
        ['A produção cultural fortalece a comunidade e gera economia criativa.', 'A fronteira entre evangelização, entretenimento e mercado pode ser debatida.'],
        'Quando a cultura religiosa se torna cultura de massa?',
        'BBC News Brasil (Aula 3: “produtor de cultura”).'),
      area('politica', 'Política e leis', 'politica',
        'A Constituição de 1988 ampliou a liberdade religiosa, e a presença evangélica na vida pública cresceu.',
        [
          { titulo: 'Constituição Federal de 1988', texto: 'Apontada entre as mudanças legais que favoreceram a multiplicação de igrejas.' },
          { titulo: 'Disputa de subcampos', texto: 'Segundo o Texto 01, a disputa entre religiões chegou ao Congresso Nacional e às câmaras estaduais e municipais.' },
          { titulo: 'Pergunta de Lellis (Texto 02)', texto: 'Cristãos disputam se Jesus defenderia a “direita” ou a “esquerda”.' }
        ],
        ['Representar eleitores religiosos é parte legítima da democracia.', 'A laicidade exige cuidado para que leis não privilegiem uma única crença.'],
        'Como separar convicção pessoal e regra para todos?',
        'Texto 01; Texto 02 (LELLIS, 2020); BBC News Brasil (Aula 3).'),
      area('familia', 'Família e valores', 'familia',
        'Muitas igrejas dão grande peso à vida familiar, à vida em comunidade e à conduta pessoal.',
        [
          { titulo: 'Culto e vida comunitária', texto: 'Grupos de jovens, casais e famílias.' },
          { titulo: 'Perfil jovem', texto: 'O Texto 01 aponta maior número de jovens e crianças entre evangélicos (Censo 2010).' },
          { titulo: 'Mulheres', texto: '55,4% dos evangélicos são mulheres (Censo 2022).' }
        ],
        ['Para muitos fiéis, a igreja oferece rede de cuidado para a família.', 'Há debates sobre o papel das mulheres e das lideranças nas igrejas.'],
        'Como a comunidade religiosa influencia escolhas familiares?',
        'Texto 01; IBGE, Censo 2022.'),
      area('convivencia', 'Convivência e diversidade', 'convivencia',
        'O crescimento evangélico acontece num país plural, com tensões e convivência.',
        [
          { titulo: 'Relações com religiões afro-brasileiras', texto: 'O Texto 01 diz que o combate empreendido pelo neopentecostalismo não reduziu o número de adeptos das religiões afro.' },
          { titulo: 'Trânsito entre igrejas', texto: 'Há circulação entre pentecostais e neopentecostais e também protestantes históricos que frequentam igrejas pentecostais.' },
          { titulo: 'Intolerância religiosa', texto: 'Conflitos que contrariam princípios éticos e religiosos (Texto 01).' }
        ],
        ['Liberdade de proselitismo faz parte da liberdade religiosa.', 'O respeito às outras religiões também é um direito protegido; ofensas e violência não são liberdade.'],
        'Como convencer sem desrespeitar?',
        'Texto 01 (seção 4.2.2, “educar para a diversidade”); Aula 2 (charges sobre intolerância).')
    ]
  },
  espiritismo: {
    conceito: {
      rotulo: 'Dupla pertença e sincretismo',
      frase: 'Muitos brasileiros usam serviços de uma religião e se declaram de outra; o censo nem sempre capta essas fronteiras.',
      href: 'religiao.html#identidade'
    },
    areas: [
      area('educacao', 'Educação e estudo', 'educacao',
        'A doutrina valoriza o estudo sistemático e a leitura.',
        [
          { titulo: 'Obras de Allan Kardec', texto: 'Base do estudo.' },
          { titulo: 'Estudo sistematizado', texto: 'Os centros oferecem cursos e grupos de estudo; o nome do programa requer conferência.', conferir: true },
          { titulo: 'Perfil de escolaridade', texto: '48,0% dos espíritas com 25 anos ou mais têm ensino superior (Censo 2022).' }
        ],
        ['O estudo contínuo é parte da vida espírita e forma leitores críticos.', 'A associação entre religião e escolaridade tem muitas variáveis (renda, região, idade) e não deve ser lida como causa.'],
        'O que o perfil de um grupo diz, e o que não diz?',
        'IBGE, Censo 2022 (Tabela 5).'),
      area('assistencia', 'Assistência social e saúde', 'assistencia',
        'A caridade é um princípio central e se traduz em ações sociais.',
        [
          { titulo: 'Centros espíritas', texto: 'Atendimento fraterno, oração e assistência a famílias.' },
          { titulo: 'Instituições de saúde e assistência', texto: 'Mantidas por entidades espíritas em diversas cidades.', conferir: true },
          { titulo: '“Médico dos pobres”', texto: 'Bezerra de Menezes é lembrado por seu atendimento a pessoas pobres.' }
        ],
        ['A caridade organizada atende pessoas e fortalece vínculos de solidariedade.', 'Práticas de cura espiritual convivem com o debate sobre o papel da medicina e da ciência.'],
        'Como religião e saúde podem colaborar sem se confundir?',
        'Texto de apoio (história do espiritismo no Brasil).'),
      area('cultura', 'Cultura e literatura', 'cultura',
        'A psicografia popularizou obras que alcançaram o grande público.',
        [
          { titulo: 'Chico Xavier', texto: 'Primeiro livro em 1932; Nosso Lar (1944).' },
          { titulo: 'Cinema', texto: 'Nosso Lar foi levado às telas; ano e direção precisam de conferência.', conferir: true },
          { titulo: 'Editoras e livrarias espíritas', texto: 'Publicação e circulação de obras espíritas.' }
        ],
        ['A literatura mediúnica levou a doutrina a leitores de várias religiões.', 'Há quem veja as obras psicografadas como fé; outros as analisam como fenômeno literário.'],
        'Uma obra mediúnica é religião, literatura ou ambas?',
        'Texto de apoio.'),
      area('politica', 'Política e leis', 'politica',
        'O espiritismo, como outras religiões de matriz não católica, já enfrentou restrições legais.',
        [
          { titulo: 'Código Penal de 1890', texto: 'Previa punição para práticas associadas ao espiritismo, à magia e ao curandeirismo; artigo e redação exata precisam de conferência.', conferir: true },
          { titulo: 'Estado laico', texto: 'A liberdade de crença protegida hoje é fruto de lutas.' }
        ],
        ['A liberdade religiosa é conquista que protege todas as crenças.', 'Ainda há debates sobre práticas de cura e o limite entre crença e exercício ilegal da medicina.'],
        'Quem decide o que é religião e o que é crime?',
        'Texto de apoio (confirmar na legislação histórica).'),
      area('familia', 'Família e valores', 'familia',
        'O Evangelho no lar e a evangelização infantil levam a doutrina à vida familiar.',
        [
          { titulo: 'Evangelho no lar', texto: 'Leitura e reflexão em família.' },
          { titulo: 'Reencarnação', texto: 'Visão de que o espírito evolui em várias vidas, o que influencia a forma de ver o sofrimento e a responsabilidade.' },
          { titulo: 'Mulheres', texto: '60,6% dos espíritas são mulheres (Censo 2022).' }
        ],
        ['A ideia de evolução dá sentido a perdas e recomeços.', 'A reencarnação, pensada à luz de outras religiões, pode ser vista de formas bem diferentes.'],
        'Como uma crença sobre a vida após a morte muda a vida de hoje?',
        'IBGE, Censo 2022; Texto 01 (reencarnacionismo).'),
      area('convivencia', 'Convivência e diversidade', 'convivencia',
        'O espiritismo dialoga e se confunde, na percepção popular, com outras tradições.',
        [
          { titulo: 'Espiritismo kardecista e Umbanda', texto: 'Tradições distintas; o censo as separa.' },
          { titulo: 'Declarações por preconceito', texto: 'O Texto 01 nota que muitos afro-brasileiros se declaram espíritas ou católicos, o que sugere subnotificação de umbandistas e candomblecistas.' },
          { titulo: 'Reencarnação em outras religiões', texto: 'Ideias reencarnacionistas crescem até entre fiéis de religiões que as rejeitam.' }
        ],
        ['A mistura de crenças é característica do campo religioso brasileiro.', 'Cada tradição quer ser reconhecida por seu próprio nome e história.'],
        'Por que algumas pessoas escondem sua religião de origem?',
        'Texto 01 (seção 4.2.2).')
    ]
  },
  umbanda: {
    conceito: {
      rotulo: 'Sincretismo religioso',
      frase: 'A Umbanda nasce do encontro de tradições católicas, espíritas, africanas e indígenas: um exemplo vivo de sincretismo no campo religioso brasileiro.',
      href: 'religiao.html#identidade'
    },
    areas: [
      area('educacao', 'Educação e formação', 'educacao',
        'A transmissão acontece sobretudo na prática e na oralidade, dentro do terreiro; também há cursos de formação em algumas casas.',
        [
          { titulo: 'Oralidade', texto: 'Saberes passados em giras, conversas e vivência.' },
          { titulo: 'Lei 10.639/2003', texto: 'Torna obrigatório o ensino de história e cultura afro-brasileira e africana, o que dialoga com o debate sobre religiões de matriz africana.' },
          { titulo: 'Ensino Religioso', texto: 'Debate sobre o espaço das religiões afro-brasileiras no currículo.' }
        ],
        ['Aprender a história dessas tradições ajuda a combater o preconceito.', 'Há quem defenda que a escola pública informe sobre as religiões sem ensinar práticas religiosas.'],
        'Conhecer uma religião é o mesmo que praticá-la?',
        'Aulas 1 e 2 (Ensino Religioso); Texto 01.', true),
      area('assistencia', 'Assistência e cuidado', 'assistencia',
        'Muitos terreiros oferecem acolhimento, atendimento espiritual e ações solidárias.',
        [
          { titulo: 'Consulta e passe', texto: 'Atendimento espiritual (o Texto 01 fala na procura por serviços terapêuticos das religiões).' },
          { titulo: 'Ações solidárias', texto: 'Distribuição de alimentos e roupas por casas.', conferir: true },
          { titulo: 'Dupla pertença', texto: 'Pessoas usam serviços de uma religião e se declaram de outra.' }
        ],
        ['Para muitos, o terreiro é lugar de escuta, cuidado e pertencimento.', 'Práticas religiosas de cuidado e a medicina convencional podem coexistir, cada uma respeitando seus limites.'],
        'Por que tantas pessoas procuram religiões em momentos de dificuldade?',
        'Texto 01 (seção 4.2.2).'),
      area('cultura', 'Cultura, música e festas', 'cultura',
        'Música, dança e festas públicas fazem da Umbanda parte da cultura brasileira.',
        [
          { titulo: 'Festas para Iemanjá', texto: 'Celebrações de fim de ano em praias, como Copacabana (RJ) e Santos (SP).', conferir: true },
          { titulo: 'Música', texto: 'Pontos cantados e atabaques.' },
          { titulo: 'Cores e símbolos', texto: 'Presentes em festas populares.' }
        ],
        ['Festas públicas mostram a vitalidade e a abertura da religião.', 'A espetacularização pode deslocar o sentido religioso, e há debates sobre isso entre os próprios fiéis.'],
        'Quando a cultura religiosa vira espetáculo?',
        'Texto de apoio.'),
      area('politica', 'Política e leis', 'politica',
        'A liberdade de crença é garantida pela Constituição, mas a história foi marcada por perseguição.',
        [
          { titulo: 'Código Penal de 1890', texto: 'Previa punição a práticas ligadas a magia e curandeirismo.', conferir: true },
          { titulo: 'Constituição de 1988, art. 5º', texto: 'Liberdade de consciência e de crença e proteção aos locais de culto.' },
          { titulo: 'Dia Nacional da Umbanda (15 de novembro)', texto: 'A data tem reconhecimento em lei federal.', conferir: true }
        ],
        ['O reconhecimento legal protege direitos e dá visibilidade.', 'Leis, sozinhas, não eliminam o preconceito: são necessárias educação e fiscalização.'],
        'Direitos garantidos no papel são sempre vividos na prática?',
        'Texto 01 (afro-brasileiros mais organizados por direitos constitucionais).'),
      area('familia', 'Comunidade e família de santo', 'familia',
        'A vida religiosa envolve a comunidade do terreiro.',
        [
          { titulo: 'Lideranças', texto: 'Mães e pais de santo orientam a casa.' },
          { titulo: 'Entidades como guias', texto: 'Caboclos, pretos-velhos e crianças, vistos como orientadores (descrição geral).' },
          { titulo: 'Mulheres', texto: '56,7% de quem segue Umbanda ou Candomblé são mulheres (IBGE, 2022).' }
        ],
        ['A “família de santo” amplia a rede de apoio de seus membros.', 'Algumas pessoas escondem a religião da família ou do trabalho por receio de preconceito.'],
        'O que significa pertencer a uma “família de santo”?',
        'IBGE, Censo 2022; Texto 01.'),
      area('convivencia', 'Convivência e diversidade', 'convivencia',
        'A Umbanda simboliza o trânsito e a mistura religiosa brasileira, e também é alvo de intolerância.',
        [
          { titulo: 'Subnotificação', texto: 'Muitos afro-brasileiros se declaram espíritas ou católicos, o que sugere haver mais umbandistas e candomblecistas do que o censo registra.' },
          { titulo: 'Censo 2022', texto: 'Umbanda e Candomblé passaram de 0,3% (2010) para 1,0%.' },
          { titulo: 'Intolerância religiosa', texto: 'Ataques a praticantes e terreiros, tema da campanha #LiberdadeReligiosa (Aulas 2 e 3).' }
        ],
        ['O aumento pode refletir mais pessoas se declarando sem medo.', 'Também pode envolver mudanças na coleta e na classificação das respostas; pesquisadores discutem o tema.'],
        'O que muda quando alguém se sente seguro para dizer qual é sua religião?',
        'Texto 01; IBGE, Censo 2022; Aula 2.', false, [false, true])
    ]
  },
  candomble: {
    conceito: {
      rotulo: 'Estratégias × táticas (Chartier, conforme as aulas)',
      frase: 'Diante de perseguição, comunidades de matriz africana criaram formas de preservar sua fé, como aproximar divindades africanas de santos católicos: uma das leituras do sincretismo.',
      href: 'religiao.html#identidade'
    },
    areas: [
      area('educacao', 'Educação e saberes', 'educacao',
        'Os saberes do Candomblé são transmitidos pela oralidade e pela convivência, sob a orientação das lideranças do terreiro.',
        [
          { titulo: 'Oralidade', texto: 'Mitos dos orixás narrados e vividos.' },
          { titulo: 'Mito de Olorun', texto: 'O Texto 03 cita esse ser supremo africano entre os mitos de criação.' },
          { titulo: 'Lei 10.639/2003', texto: 'Ensino de história e cultura afro-brasileira.' }
        ],
        ['A tradição oral é uma forma legítima de conhecimento.', 'Para a escola, o desafio é falar de religião sem fazer catequese.'],
        'Que saberes só se aprendem vivendo?',
        'Texto 03; Texto 01; Aula 1.'),
      area('assistencia', 'Assistência e cuidado', 'assistencia',
        'O terreiro costuma ser lugar de acolhimento.',
        [
          { titulo: 'Acolhimento comunitário', texto: 'Alimentação, escuta e apoio.', conferir: true },
          { titulo: 'Jogo de búzios', texto: 'Consulta oracular procurada por pessoas de várias religiões.' },
          { titulo: 'Ervas e saberes tradicionais', texto: 'Plantas usadas em ritos e cuidados (descrição geral).', conferir: true }
        ],
        ['Muitas pessoas encontram no terreiro apoio emocional e comunitário.', 'Cuidar da saúde exige também acompanhamento médico; as práticas podem se complementar.'],
        'Quando um saber tradicional é considerado cuidado?',
        'Texto 01 (4.2.2).'),
      area('cultura', 'Cultura, culinária e festas', 'cultura',
        'A cultura afro-brasileira, em especial a baiana, tem forte ligação com o Candomblé.',
        [
          { titulo: 'Acarajé', texto: 'O Ofício das Baianas de Acarajé é patrimônio imaterial desde 2005.', conferir: true },
          { titulo: 'Festa de Iemanjá', texto: 'Celebrada em Salvador, no Rio Vermelho, em 2 de fevereiro.', conferir: true },
          { titulo: 'Lavagem do Bonfim', texto: 'Festa em Salvador que mistura tradições católicas e de matriz africana.', conferir: true }
        ],
        ['A cultura de matriz africana é patrimônio do país.', 'Quando símbolos religiosos viram atração turística, há debate sobre respeito e sentido.'],
        'Quem pode contar a história de uma festa religiosa?',
        'Texto de apoio.'),
      area('politica', 'Política e leis', 'politica',
        'Da repressão ao reconhecimento: a trajetória legal dos terreiros.',
        [
          { titulo: 'Repressão histórica', texto: 'Invasões policiais e exigência de registro dos terreiros.', conferir: true },
          { titulo: 'Tombamento de terreiros pelo Iphan', texto: 'A Casa Branca do Engenho Velho é um exemplo.', conferir: true },
          { titulo: 'Dia Nacional de Combate à Intolerância Religiosa (21 de janeiro)', texto: 'A data foi instituída por lei.', conferir: true },
          { titulo: 'Estatuto da Igualdade Racial (Lei 12.288/2010)', texto: 'Marco legal relacionado à igualdade racial.', conferir: true }
        ],
        ['O reconhecimento como patrimônio protege a memória e os espaços de culto.', 'A proteção legal precisa vir acompanhada de combate efetivo à violência.'],
        'Como o Estado laico protege todas as religiões por igual?',
        'Texto 01.'),
      area('familia', 'Família de santo e comunidade', 'familia',
        'O terreiro funciona como uma grande família.',
        [
          { titulo: 'Casa de santo', texto: 'Comunidade em torno de uma liderança.' },
          { titulo: 'Iniciação', texto: 'Processo ritual de entrada na comunidade.' },
          { titulo: 'Liderança feminina', texto: 'Mãe Menininha do Gantois (1894–1986) é referência nacional.' }
        ],
        ['A comunidade oferece vínculo e identidade.', 'Para quem vem de famílias de outras religiões, a escolha pode gerar conflitos.'],
        'Como equilibrar a fé individual e os laços familiares?',
        'Texto de apoio; IBGE, Censo 2022.'),
      area('convivencia', 'Convivência e diversidade', 'convivencia',
        'O Candomblé dialoga com o catolicismo e enfrenta intolerância.',
        [
          { titulo: 'Sincretismo', texto: 'Aproximações entre divindades africanas e santos católicos, que variam entre casas e regiões.' },
          { titulo: 'Neopentecostalismo', texto: 'Segundo o Texto 01, o combate às religiões afro não reduziu o número de adeptos.' },
          { titulo: 'Dupla pertença', texto: 'Pessoas que frequentam mais de uma religião.' }
        ],
        ['O diálogo inter-religioso pode reduzir conflitos.', 'Existem diferenças religiosas reais que não precisam virar violência.'],
        'Como discordar de uma religião sem desrespeitar quem a pratica?',
        'Texto 01; Aula 2 (charges sobre intolerância).')
    ]
  },
  'tradicoes-indigenas': {
    conceito: {
      rotulo: 'Animismo e estranhamento (Texto 03; Antropologia)',
      frase: 'O Texto 03 lembra que as classificações são ocidentais; para os povos indígenas, a antropologia pede estranhamento e cuidado, pois cada povo tem sua própria cosmologia.',
      href: 'religiao.html#classificacoes'
    },
    areas: [
      area('educacao', 'Educação', 'educacao',
        'A educação escolar indígena busca ser diferenciada, bilíngue e intercultural.',
        [
          { titulo: 'Saberes tradicionais', texto: 'Transmitidos por anciões e pela vida comunitária.' },
          { titulo: 'Escolas indígenas', texto: 'Currículo com língua e cultura do povo.', conferir: true },
          { titulo: 'Missões', texto: 'Histórico de escolarização ligada a missões religiosas, como a dos jesuítas.' }
        ],
        ['Escolas próprias fortalecem línguas e tradições.', 'Garantir qualidade e infraestrutura nas aldeias é um desafio.'],
        'Quem decide o que e como se ensina numa aldeia?',
        'LDB 9.394/96 (arts. 78 e 79); Aula 1.', true),
      area('assistencia', 'Saúde e cuidado', 'assistencia',
        'Os cuidados com a saúde envolvem especialistas tradicionais e serviços públicos.',
        [
          { titulo: 'Pajés e especialistas', texto: 'Cuidam conforme a cosmologia do povo.' },
          { titulo: 'Subsistema de Atenção à Saúde Indígena', texto: 'Integra o SUS.', conferir: true },
          { titulo: 'Interculturalidade em saúde', texto: 'Diálogo entre saberes.' }
        ],
        ['Respeitar os saberes tradicionais melhora a confiança no atendimento.', 'Os serviços de saúde precisam seguir protocolos médicos e adaptar-se às culturas.'],
        'Como unir conhecimento tradicional e ciência?',
        'Texto de apoio.'),
      area('cultura', 'Cultura, ritual e arte', 'cultura',
        'Cantos, danças, grafismos e plumária fazem parte de um sistema de símbolos que cada povo mantém.',
        [
          { titulo: 'Kuarup', texto: 'Ritual funerário de povos do Alto Xingu.', conferir: true },
          { titulo: 'Toré', texto: 'Ritual de vários povos do Nordeste.', conferir: true },
          { titulo: 'Arte plumária e grafismos', texto: 'Expressões visuais com significado próprio.' }
        ],
        ['Rituais e artes sustentam memória e identidade.', 'Alguns saberes e rituais são restritos e não devem ser expostos sem autorização.'],
        'O que pode ser mostrado ao público, e quem decide?',
        'Texto 03 (conceito de mito e símbolo); Texto de apoio.'),
      area('politica', 'Direitos e território', 'politica',
        'O território é central para a vida social e espiritual dos povos.',
        [
          { titulo: 'Constituição de 1988 (art. 231)', texto: 'Reconhece organização social, costumes, línguas, crenças e tradições e direitos sobre terras tradicionalmente ocupadas.', conferir: true },
          { titulo: 'Terra Indígena', texto: 'Espaço reconhecido pelo Estado.' },
          { titulo: 'Censo 2022', texto: 'Quesito próprio sobre “crença, ritual indígena ou religião” em terras indígenas.' }
        ],
        ['A proteção do território é condição para a continuidade das tradições.', 'As demarcações são debatidas no país, com interesses e leituras jurídicas diferentes.'],
        'Como proteger direitos coletivos sem ignorar interesses diversos?',
        'IBGE, Censo 2022; Constituição Federal.'),
      area('familia', 'Família e comunidade', 'familia',
        'Parentesco, comunidade e ritual organizam a vida em cada povo.',
        [
          { titulo: 'Lideranças', texto: 'Pajés, caciques e anciões (os papéis variam por povo).' },
          { titulo: 'Perfil no Censo 2022', texto: 'No grupo “tradições indígenas”, 50,9% são homens e 49,1%, mulheres.' },
          { titulo: 'Migração para cidades', texto: 'Muda a vida comunitária e as formas de transmitir saberes.', conferir: true }
        ],
        ['A comunidade é a base da identidade.', 'Mudanças como a migração e novas religiões transformam a vida comunitária.'],
        'Como manter tradições em contextos diferentes?',
        'IBGE, Censo 2022 (Tabela 2).'),
      area('convivencia', 'Convivência e diversidade', 'convivencia',
        'Muitas pessoas indígenas se declaram de diversas religiões.',
        [
          { titulo: 'Pluralidade religiosa', texto: '42,7% católicos, 32,2% evangélicos e 7,6% de tradições indígenas entre indígenas por cor ou raça (Censo 2022).' },
          { titulo: 'Missões', texto: 'Ao longo da história, várias igrejas atuaram junto a povos indígenas.' },
          { titulo: 'Roraima', texto: 'Maior percentual de tradições indígenas (1,7%).' }
        ],
        ['Cada pessoa tem o direito de escolher e mudar de fé.', 'Comunidades e missionários debatem o respeito a modos de vida e crenças.'],
        'Como respeitar a escolha individual e a cultura coletiva ao mesmo tempo?',
        'IBGE, Censo 2022 (Tabelas 3 e 4); Texto 01.')
    ]
  },
  judaismo: {
    conceito: {
      rotulo: 'Diáspora e identidade',
      frase: 'A experiência de viver como grupo religioso em muitos países mostra como identidade e religião se constroem nas interações com a sociedade.',
      href: 'religiao.html#identidade'
    },
    areas: [
      area('educacao', 'Educação e estudo', 'educacao',
        'O estudo de textos é muito valorizado na tradição.',
        [
          { titulo: 'Estudo da Torá e do Talmude', texto: 'Prática de debate e interpretação.' },
          { titulo: 'Escolas e centros comunitários', texto: 'Muitas comunidades mantêm instituições próprias.', conferir: true }
        ],
        ['A tradição de estudo e debate forma gerações de leitores críticos.', 'Escolas confessionais e escolas plurais podem complementar-se.'],
        'O que se aprende quando se estuda um texto por séculos?',
        'Texto 03; LDB art. 19 (instituições confessionais).'),
      area('assistencia', 'Solidariedade e comunidade', 'assistencia',
        'A ajuda mútua (tzedacá) é um valor central.',
        [
          { titulo: 'Tzedacá', texto: 'Justiça e caridade.', conferir: true },
          { titulo: 'Associações comunitárias', texto: 'Apoio a famílias e idosos.', conferir: true }
        ],
        ['Redes comunitárias oferecem proteção e pertencimento.', 'Cada pessoa pode vivenciar a identidade judaica de formas diferentes, mais ou menos religiosas.'],
        'Como a solidariedade organiza uma comunidade?',
        'Texto de apoio.', true),
      area('cultura', 'Cultura e festas', 'cultura',
        'O calendário judaico marca a vida de muitas famílias.',
        [
          { titulo: 'Shabat', texto: 'Descanso semanal.' },
          { titulo: 'Rosh Hashaná, Yom Kipur e Pessach', texto: 'Festas do ano.' },
          { titulo: 'Culinária e música', texto: 'Tradições variam por região de origem.' }
        ],
        ['As festas conectam gerações e preservam memória.', 'Muitos se sentem judeus pela cultura, mesmo sem prática religiosa, algo parecido com os “declarantes não praticantes”.'],
        'Religião e cultura se separam?',
        'Texto 01 (declarantes não praticantes).'),
      area('politica', 'Política, leis e liberdade', 'politica',
        'A liberdade de crença é protegida pela Constituição de 1988.',
        [
          { titulo: 'Inquisição', texto: 'Perseguição a cristãos-novos no período colonial.' },
          { titulo: 'Liberdade de crença (art. 5º)', texto: 'Proteção constitucional.' },
          { titulo: 'Estado de Israel (1948)', texto: 'Tema de debate político distinto da religião; esta página trata do judaísmo como religião.', conferir: true }
        ],
        ['Reconhecer a história de perseguição ajuda a combater o preconceito.', 'É importante não confundir religião, povo e Estado nas conversas públicas.'],
        'Por que é útil distinguir religião, identidade e política?',
        'Constituição Federal de 1988.'),
      area('familia', 'Família e rituais', 'familia',
        'Rituais marcam a vida familiar.',
        [
          { titulo: 'Brit milá e bar/bat mitzvá', texto: 'Ritos de passagem.', conferir: true },
          { titulo: 'Mesa de shabat', texto: 'Encontro semanal.' },
          { titulo: 'Casamento religioso', texto: 'Rito vivido de formas diversas pelas comunidades.' }
        ],
        ['Os ritos dão sentido a momentos de passagem.', 'Há comunidades que se organizam de modos diferentes sobre papéis e regras.'],
        'Como os ritos de passagem criam pertencimento?',
        'Texto 03 (constituintes: ritos e comunidade).'),
      area('convivencia', 'Convivência e diversidade', 'convivencia',
        'Judeus e não judeus convivem em muitos espaços, e há esforços de diálogo.',
        [
          { titulo: 'Antissemitismo', texto: 'Preconceito e violência contra pessoas judias, ainda presentes.' },
          { titulo: 'Diálogo inter-religioso', texto: 'Iniciativas conjuntas com cristãos e muçulmanos.', conferir: true },
          { titulo: 'Dupla pertença', texto: 'Nem todo mundo vive a religião da mesma forma.' }
        ],
        ['O diálogo reduz estereótipos.', 'Conflitos políticos no mundo podem se refletir em discriminação local, o que exige cuidado.'],
        'Como conhecer sem generalizar?',
        'Texto 01 (educar para a diversidade); Aula 2 (charges sobre intolerância).')
    ]
  },
  islamismo: {
    conceito: {
      rotulo: 'Fronteiras simbólicas',
      frase: 'O Texto 01 lembra que as fronteiras simbólicas entre religiões são cada vez mais tênues, mas estereótipos ainda criam distância entre grupos.',
      href: 'religiao.html#identidade'
    },
    areas: [
      area('educacao', 'Educação', 'educacao',
        'O estudo do Alcorão e da língua árabe é valorizado em muitas comunidades.',
        [
          { titulo: 'Aulas nas mesquitas', texto: 'Ensino religioso e cultural.', conferir: true },
          { titulo: 'Escolas comunitárias', texto: 'Em algumas cidades.', conferir: true },
          { titulo: 'Ensino Religioso na escola pública', texto: 'Debate sobre como abordar o islamismo sem estereótipos.' }
        ],
        ['Conhecer a religião pelas fontes dos próprios fiéis combate o preconceito.', 'A escola pública deve apresentar todas as tradições sem privilegiar uma.'],
        'Quem deve falar sobre uma religião na sala de aula?',
        'Aulas 1 e 2.'),
      area('assistencia', 'Caridade e comunidade', 'assistencia',
        'A caridade (zakat) é um dos cinco pilares.',
        [
          { titulo: 'Zakat', texto: 'Contribuição para ajudar quem precisa.' },
          { titulo: 'Ramadã', texto: 'Mês de jejum e de solidariedade, com refeições partilhadas.' },
          { titulo: 'Associações', texto: 'Apoio a imigrantes e refugiados.', conferir: true }
        ],
        ['A solidariedade religiosa pode apoiar pessoas em situação vulnerável.', 'Cada pessoa vive o jejum e a caridade de formas diferentes.'],
        'Como a prática de ajudar faz parte da fé?',
        'Texto de apoio.'),
      area('cultura', 'Cultura e alimentação', 'cultura',
        'A cultura árabe e a muçulmana se cruzam, mas não são a mesma coisa.',
        [
          { titulo: 'Culinária árabe', texto: 'Popular no Brasil; muitos imigrantes sírio-libaneses eram cristãos.' },
          { titulo: 'Halal', texto: 'Regras sobre o que é permitido na alimentação.' },
          { titulo: 'Caligrafia e arquitetura', texto: 'Expressões artísticas do mundo muçulmano.' }
        ],
        ['A cultura de origem do Oriente Médio é parte da vida brasileira.', 'É preciso distinguir o que é religião do que é cultura de um país específico.'],
        'O que é religioso e o que é cultural numa tradição?',
        'Texto 01 (fronteiras simbólicas).'),
      area('politica', 'Política e leis', 'politica',
        'A liberdade de crença protege todas as religiões.',
        [
          { titulo: 'Constituição de 1988, art. 5º', texto: 'Liberdade de crença e proteção aos locais de culto.' },
          { titulo: 'Revolta dos Malês (1835)', texto: 'Levante de escravizados, muitos deles muçulmanos.' },
          { titulo: 'Debate sobre liberdade de expressão', texto: 'Caso Charlie Hebdo, lembrado nas aulas.' }
        ],
        ['A liberdade de expressão é fundamental numa democracia.', 'A liberdade religiosa também exige respeito, e ofensas podem machucar quem tem fé.'],
        'Onde termina a crítica e começa o desrespeito?',
        'Aula 2 (Charlie Hebdo); Constituição Federal.'),
      area('familia', 'Família e vida comunitária', 'familia',
        'A comunidade e a família são centrais.',
        [
          { titulo: 'Oração de sexta-feira', texto: 'Encontro comunitário.' },
          { titulo: 'Vestuário religioso', texto: 'Escolhas pessoais e religiosas, como o véu para algumas mulheres.' },
          { titulo: 'Casamento e ritos', texto: 'Práticas vividas de formas diversas.' }
        ],
        ['Para muitas pessoas, as práticas dão identidade e pertencimento.', 'Há debates dentro e fora das comunidades sobre liberdade e escolhas individuais.'],
        'Como respeitar escolhas religiosas pessoais?',
        'Texto de apoio.'),
      area('convivencia', 'Convivência e diversidade', 'convivencia',
        'Há convivência e também preconceito.',
        [
          { titulo: 'Estereótipos', texto: 'Associar a religião a violência é uma generalização injusta.' },
          { titulo: 'Islamofobia', texto: 'Preconceito contra pessoas muçulmanas.' },
          { titulo: 'Diálogo', texto: 'Iniciativas entre comunidades.', conferir: true }
        ],
        ['Educar para a diversidade ajuda a reduzir o preconceito.', 'Notícias internacionais podem reforçar imagens simplificadas; é preciso olhar com cuidado.'],
        'Como ler notícias sem generalizar?',
        'Texto 01 (seção 4.2.2: educar para a diversidade).')
    ]
  },
  budismo: {
    conceito: {
      rotulo: 'Dupla pertença e trânsito religioso',
      frase: 'Muita gente pratica meditação budista sem deixar sua religião de origem: um exemplo de dupla pertença.',
      href: 'religiao.html#identidade'
    },
    areas: [
      area('educacao', 'Educação e meditação', 'educacao',
        'Ensinamentos e práticas de atenção chegam a escolas, empresas e clínicas.',
        [
          { titulo: 'Meditação e mindfulness', texto: 'Práticas inspiradas na tradição.', conferir: true },
          { titulo: 'Escolas e centros budistas', texto: 'Cursos e retiros.' },
          { titulo: 'Ensino Religioso', texto: 'Debate sobre como tratar tradições orientais.' }
        ],
        ['Práticas de atenção podem ajudar a lidar com o estresse.', 'É importante distinguir a prática laica da religião de origem e reconhecer sua fonte.'],
        'É possível separar a técnica da tradição?',
        'Aula 7; Texto 01 (novas religiosidades).'),
      area('assistencia', 'Cuidado e compaixão', 'assistencia',
        'A compaixão é valor central.',
        [
          { titulo: 'Voluntariado', texto: 'Ações de templos e centros.', conferir: true },
          { titulo: 'Meditação e saúde', texto: 'Uso complementar em contextos de cuidado.', conferir: true },
          { titulo: 'Cuidado com pessoas', texto: 'Práticas de atenção.' }
        ],
        ['Para muitas pessoas, a prática ajuda no bem-estar emocional.', 'A saúde exige cuidado profissional e as práticas são complementares.'],
        'Como a compaixão se traduz em atitudes?',
        'Texto de apoio.'),
      area('cultura', 'Cultura e imigração japonesa', 'cultura',
        'O budismo no Brasil está ligado à história da imigração japonesa.',
        [
          { titulo: 'Kasato Maru (1908)', texto: 'Início da imigração japonesa.' },
          { titulo: 'Bairro da Liberdade (São Paulo)', texto: 'Templos e comércio.' },
          { titulo: 'Festas, como o Obon', texto: 'Celebração de memória aos antepassados em comunidades nipo-brasileiras.', conferir: true }
        ],
        ['A cultura nipo-brasileira é parte importante da formação do país.', 'Nem todo descendente de japoneses é budista, e nem todo budista é de origem asiática.'],
        'Como a imigração traz e transforma religiões?',
        'Texto de apoio; Texto 01.'),
      area('politica', 'Política e leis', 'politica',
        'A liberdade religiosa protege todas as crenças.',
        [
          { titulo: 'Constituição de 1988, art. 5º', texto: 'Proteção da liberdade de crença.' },
          { titulo: 'Tolerância e Estado laico', texto: 'Princípios da convivência entre diferentes tradições.' },
          { titulo: 'Debate sobre religião ou filosofia', texto: 'A Aula 7 mostra visões que classificam o budismo como tradição ateísta, o que levanta a discussão sobre como o Estado lida com cada tradição.' }
        ],
        ['Reconhecer as tradições como religiões garante direitos de culto.', 'Chamar uma tradição de “filosofia” pode ser uma escolha do fiel e não deve diminuir seu valor religioso.'],
        'Quem define o que é religião?',
        'Aula 7; Texto 03.'),
      area('familia', 'Família e vida cotidiana', 'familia',
        'A prática pode ser doméstica e comunitária.',
        [
          { titulo: 'Altar doméstico', texto: 'Em muitas casas, um pequeno espaço de devoção.' },
          { titulo: 'Ritos de passagem', texto: 'Nascimento, casamento e funerais conforme a escola.', conferir: true },
          { titulo: 'Meditação em família', texto: 'Prática compartilhada em alguns contextos.' }
        ],
        ['A prática cotidiana dá ritmo à vida em casa.', 'Em famílias de religiões diferentes, as práticas convivem de formas diversas.'],
        'Como manter práticas pessoais no cotidiano?',
        'Texto de apoio.'),
      area('convivencia', 'Convivência e diversidade', 'convivencia',
        'O budismo dialoga com outras religiões e com a cultura contemporânea.',
        [
          { titulo: 'Trânsito religioso', texto: 'Pessoas que praticam sem se converter.' },
          { titulo: 'Queda entre censos', texto: 'De 243.966 (2010) a cerca de 197 mil (2022), com bases diferentes.' },
          { titulo: 'Novas religiões orientais', texto: 'Categoria distinta no Texto 01 (155.951 pessoas em 2010).' }
        ],
        ['O interesse por tradições orientais mostra a abertura da sociedade a outras referências.', 'A apropriação de símbolos religiosos como decoração ou moda gera debate sobre respeito.'],
        'Quando usar um símbolo religioso é respeito e quando é banalização?',
        'Texto 01; Aulas 2 e 3.')
    ]
  },
  hinduismo: {
    conceito: {
      rotulo: 'Classificações ocidentais',
      frase: 'O Texto 03 lembra que as classificações de religião nascem do olhar ocidental, e o hinduísmo desafia categorias simples.',
      href: 'religiao.html#classificacoes'
    },
    areas: [
      area('educacao', 'Educação e filosofia', 'educacao',
        'Textos antigos e filosofias são parte do estudo.',
        [
          { titulo: 'Bhagavad Gita', texto: 'Lida em vários contextos.' },
          { titulo: 'Yoga e filosofia', texto: 'Práticas e reflexão.' },
          { titulo: 'Ensino Religioso', texto: 'Desafio de tratar tradições com muitas formas.' }
        ],
        ['Estudar a diversidade do hinduísmo evita reduzi-lo a estereótipos.', 'O yoga ensinado fora do contexto religioso é uma escolha de muita gente e merece reconhecimento da origem.'],
        'Como ensinar sem simplificar?',
        'Texto 03; Aula 7.'),
      area('assistencia', 'Serviço e devoção', 'assistencia',
        'Templos e movimentos devocionais costumam oferecer refeições e atividades comunitárias.',
        [
          { titulo: 'Distribuição de alimentos vegetarianos', texto: 'Prática de movimentos como o Hare Krishna.', conferir: true },
          { titulo: 'Seva (serviço desinteressado)', texto: 'Valor presente em tradições hindus.', conferir: true }
        ],
        ['Ações sociais conectam a prática religiosa à vida cotidiana.', 'Cada comunidade tem sua forma de ajudar e de se organizar.'],
        'Como o serviço ao próximo faz parte do espiritual?',
        'Texto de apoio.'),
      area('cultura', 'Cultura, música e festas', 'cultura',
        'A cultura indiana é parte da vida de muitos brasileiros.',
        [
          { titulo: 'Diwali', texto: 'Festival das luzes.' },
          { titulo: 'Holi', texto: 'Festival das cores.', conferir: true },
          { titulo: 'Música devocional e dança', texto: 'Expressões culturais diversas.' }
        ],
        ['Festas e músicas aproximam as pessoas e promovem o diálogo cultural.', 'Há debate sobre apropriação cultural quando símbolos sagrados são usados sem respeito.'],
        'O que é inspiração e o que é apropriação?',
        'Texto de apoio.'),
      area('politica', 'Política e leis', 'politica',
        'A liberdade religiosa protege também as comunidades menores em número.',
        [
          { titulo: 'Constituição de 1988, art. 5º', texto: 'Proteção da liberdade de crença.' },
          { titulo: 'Estado laico', texto: 'Princípio de neutralidade religiosa do Estado.' },
          { titulo: 'Pluralismo', texto: 'O Texto 01 diz que não se pode falar em maiorias e minorias religiosas, pois as fronteiras são tênues.' }
        ],
        ['Garantir direitos a grupos pequenos fortalece a democracia.', 'Políticas públicas precisam considerar a diversidade sem privilegiar nenhuma tradição.'],
        'O tamanho de um grupo muda seus direitos?',
        'Texto 01; Constituição Federal.'),
      area('familia', 'Família e rituais', 'familia',
        'A vida familiar é cheia de ritos.',
        [
          { titulo: 'Puja doméstico', texto: 'Culto em casa.' },
          { titulo: 'Ritos de passagem', texto: 'Nascimento, casamento e funerais (variam muito).', conferir: true },
          { titulo: 'Vegetarianismo', texto: 'Adotado por muitas comunidades.', conferir: true }
        ],
        ['Os ritos dão forma à rotina e à memória.', 'As práticas variam muito entre famílias e regiões.'],
        'Como o culto doméstico fortalece laços?',
        'Texto 03 (constituintes: ritos).'),
      area('convivencia', 'Convivência e diversidade', 'convivencia',
        'O hinduísmo está presente sobretudo no diálogo com o yoga, o vegetarianismo e a cultura indiana.',
        [
          { titulo: 'Yoga no Brasil', texto: 'Prática popular entre pessoas de várias religiões.' },
          { titulo: 'Sincretismo e dupla pertença', texto: 'O Texto 01 aponta o crescimento de ideias que atravessam fronteiras religiosas.' },
          { titulo: 'Reencarnação', texto: 'O Texto 01 diz que ideias reencarnacionistas crescem até em religiões que as rejeitam.' }
        ],
        ['A circulação de ideias enriquece a cultura.', 'A mistura pode simplificar o significado original de práticas e conceitos.'],
        'Como respeitar a origem de uma prática ao adotá-la?',
        'Texto 01 (4.2.2).')
    ]
  }
};
