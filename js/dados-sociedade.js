const area = (id, titulo, icone, resumo, exemplos, olhares, refletir, fonte) => ({
  id, titulo, icone, resumo, exemplos, olhares, refletir, fonte
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
  }
};
