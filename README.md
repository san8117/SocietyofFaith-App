# Society of Faith

**ReligiÃ£o e Sociedade no Brasil**: um site informativo que mostra como a sociedade brasileira se identifica em matÃ©ria de fÃ©, com textos, dados censitÃ¡rios (1872â€“2022), conceitos das CiÃªncias da ReligiÃ£o e ilustrações originais em SVG.

> Projeto educacional desenvolvido a partir das disciplinas de Fundamentos do Cristianismo e Antropologia CristÃ£ (UNASP).

## Criadores

- Guilherme Oliveira de Santana
- Pedro Henrique Gomes
- Henrique Soares
- Lucas Cardoso
- Kaue Bueno

## O que o site terÃ¡

- **ReligiÃ£o**: etimologia, definiÃ§Ãµes (Geertz, Durkheim, Marx, Nietzsche), classificaÃ§Ãµes (animismo, ateÃ­smo, teÃ­smo, panteÃ­smo, magismo) e constituintes (doutrina, ritos, Ã©tica, comunidade, mito).
- **Brasil em dados**: grÃ¡ficos interativos do IBGE (Censo 2010 Ã— 2022), perfis por regiÃ£o, idade, sexo, cor ou raÃ§a e escolaridade.
- **Todos os censos**: linha do tempo de 1872 a 2022 e como a religiÃ£o foi perguntada em cada recenseamento.
- **Cristianismo**: nascimento, cronologia, Edito de MilÃ£o, TeodÃ³sio e a estrutura das primeiras comunidades.
- **Fontes**: links oficiais do IBGE e referÃªncias bibliogrÃ¡ficas.

## Tecnologias

HTML5, CSS3 e JavaScript puro (ES modules). Sem frameworks e sem etapa de build. GrÃ¡ficos com Chart.js 4.4.7 (CDN, versÃ£o fixa). Hospedagem: Vercel.

## Estrutura do projeto

```text
SocietyofFaith-App/
  index.html, brasil.html, censos.html, religioes.html, religiao.html
  cristianismo.html, fontes.html
  catolicismo.html, evangelicos.html, espiritismo.html
  umbanda.html, candomble.html, tradicoes-indigenas.html
  judaismo.html, islamismo.html, budismo.html, hinduismo.html
  testemunhas-de-jeova.html, mormons.html, tradicoes-esotericas.html
  santo-daime.html, sem-religiao.html
  css/       tokens.css, base.css, home.css, graficos.css, censos.css, religioes.css, religiao-pagina.css
  js/        components.js, menu-data.js, charts-core.js, home.js, reveal.js
             carrossel.js
             dados-ibge.js, dados-censos.js, dados-religioes.js
             dados-sociedade.js
             dados-paginas-religiao.js
             graficos.js, censos.js, religioes.js, pagina-religiao.js
             imagens-religioes.js, imagens.js
  data/      dados complementares
  conteudo/  textos de apoio
  assets/    imagens e Ã­cones
```

## Como rodar localmente

1. Clone o repositÃ³rio.
2. Abra a pasta no VS Code.
3. Use a extensÃ£o "Live Server" ou execute `python -m http.server 5500`.
4. Acesse `http://localhost:5500/` para a home (`index.html`), ou `religioes.html`, `brasil.html` e `censos.html`.

## Imagens

- Regerar as ilustrações originais: `python tools/gerar_arte.py`
- O script escreve 112 SVGs em `assets/img/religioes/<slug>/<slot>.svg`, valida o XML e confirma o limite de 15 KB por arquivo.
- Para substituir uma arte por foto real: no manifesto em `js/imagens-religioes.js`, altere o item para `tipo: 'foto'`, `pendente: false`, defina `src` para a foto e preencha `credito` e `licenca` com autoria e licença compatíveis.
- A arte gerada em código mantém `width: 1600`, `height: 1000` e usa `credito: "Ilustração original do projeto Society of Faith (gerada em código)"` e `licenca: "Autoria própria"`.

## Como criar uma nova pÃ¡gina de religiÃ£o

1. Reaproveite a estrutura, navegaÃ§Ã£o, estilos e mÃ³dulos de `catolicismo.html`, `evangelicos.html` e `espiritismo.html`.
2. A seÃ§Ã£o **â€œReligiÃ£o e sociedadeâ€** Ã© obrigatÃ³ria no modelo e deve entrar entre â€œPara entenderâ€ e â€œGaleriaâ€. Use o sistema comum de abas/painel, diagrama radial em telas largas e chips rolÃ¡veis no mobile.
3. Use as seis Ã¡reas padrÃ£o: educaÃ§Ã£o, assistÃªncia e saÃºde, cultura, polÃ­tica e leis, famÃ­lia e valores, convivÃªncia e diversidade. Se houver menos material, a pÃ¡gina pode ter quatro Ã¡reas, mas deve sempre incluir **convivÃªncia e diversidade**.
4. Mantenha o texto completo no HTML em `<article>`s, com â€œDois olharesâ€ em `<details>` para o fallback sem JavaScript. O mÃ³dulo interativo usa os dados correspondentes em `js/dados-sociedade.js`.
5. Preserve o tom descritivo e neutro, registre uma fonte por Ã¡rea, evite alegaÃ§Ãµes de causalidade e marque itens que precisem de checagem com `conferir: true` nos dados.
6. Use linguagem respeitosa, os nomes escolhidos por cada tradiÃ§Ã£o e comunidade, e evite generalizaÃ§Ãµes. Para tradiÃ§Ãµes indÃ­genas, reconheÃ§a a diversidade entre povos; Umbanda e CandomblÃ© sÃ£o religiÃµes distintas.
7. Marque todos os slots de imagem como sensÃ­veis; nÃ£o use imagens de pessoas identificÃ¡veis em rituais restritos, iniciaÃ§Ãµes ou situaÃ§Ãµes Ã­ntimas sem autorizaÃ§Ã£o documentada. Prefira arquitetura, patrimÃ´nio, festas pÃºblicas, objetos, mapas, ilustraÃ§Ãµes histÃ³ricas e acervos oficiais. Registre fonte, crÃ©dito, licenÃ§a, texto alternativo e legenda; informe que imagens de rituais exigem autorizaÃ§Ã£o de quem Ã© retratado.
8. Quando uma tradiÃ§Ã£o nÃ£o tiver grupo prÃ³prio nos recortes do IBGE, marque `semGrupoIBGE: true` e informe `contexto` com o grupo censitÃ¡rio usado. Apresente esse grupo como contexto, nunca como retrato da tradiÃ§Ã£o; explique as bases, os denominadores e qualquer percentual calculado.
9. Se o dado de 2010 nÃ£o estiver disponÃ­vel, registre `pessoas[2010]: null`, nÃ£o desenhe uma comparaÃ§Ã£o 2010 Ã— 2022 e informe que o valor deve ser confirmado no SIDRA.
10. Em temas sensÃ­veis, use imagens de paisagens, plantas, mapas, arquitetura e documentos; nÃ£o publique imagens de pessoas em cerimÃ´nias, consumo ou preparo de substÃ¢ncias. Marque os slots sensÃ­veis e inclua avisos de seguranÃ§a e de autorizaÃ§Ã£o quando aplicÃ¡vel.

## Roadmap

- [x] Etapa 0: README e esqueleto do repositÃ³rio
- [x] Etapa 1: Estrutura, identidade visual e home
- [x] Etapa 1.1: Paleta clean e estilos-base
- [x] Etapa 2: ConteÃºdo teÃ³rico sobre religiÃ£o
- [x] Etapa 3: Dados do IBGE e grÃ¡ficos (2010 Ã— 2022)
- [x] Etapa 4: SÃ©rie histÃ³rica, linha do tempo e acesso aos dados dos censos (1872â€“2022)
- [x] Etapa 5: Ãndice e pÃ¡ginas de religiÃµes (imagens com crÃ©ditos geradas em SVG)
- [x] Etapa 6: Umbanda, CandomblÃ© e tradiÃ§Ãµes indÃ­genas
- [x] Etapa 7: JudaÃ­smo, Islamismo, Budismo e HinduÃ­smo
- [x] Etapa 8: Testemunhas de JeovÃ¡, MÃ³rmons, TradiÃ§Ãµes esotÃ©ricas, Santo Daime e Sem religiÃ£o
- [x] Etapa 9: Origens do cristianismo e pÃ¡gina Fontes
- [ ] Etapa 10: Acessibilidade, polimento, SEO e deploy

## Changelog

### Etapa 10 — 16/11/2026: Ilustrações originais geradas por tools/gerar_arte.py (112 arquivos)

### Etapa 6.0 — 15/11/2026: index.html refeito, 'Início' corrigido

### Etapa 0 â€” 14/11/2026
- Preparada a documentaÃ§Ã£o inicial e a estrutura bÃ¡sica do repositÃ³rio.

### Etapa 1.1 â€” 14/11/2026
- Aplicada a paleta clean em `css/tokens.css` e criados estilos visuais base.

### Etapa 3 â€” 14/11/2026
- Criados `brasil.html`, `css/graficos.css`, `js/dados-ibge.js` e `js/graficos.js`; atualizados `README.md`.
- Entregues grÃ¡ficos interativos do Censo 2010 e 2022, tabelas acessÃ­veis, filtros por perfil, navegaÃ§Ã£o por seÃ§Ã£o, animaÃ§Ãµes respeitando movimento reduzido e ressalvas metodolÃ³gicas.

### Etapa 4 â€” 14/11/2026
- Criados `censos.html`, `css/censos.css`, `js/dados-censos.js` e `js/censos.js`; criado `js/components.js` e atualizado o menu em `brasil.html`.
- Entregues sÃ©rie histÃ³rica com lacunas explÃ­citas e tabela de dados, grÃ¡ficos de variaÃ§Ã£o, linha do tempo filtrÃ¡vel com diÃ¡logo acessÃ­vel, comparaÃ§Ã£o interativa de formulÃ¡rios, links oficiais do IBGE e cÃ³pia de citaÃ§Ã£o ABNT.

### Etapa 5 â€” concluÃ­da
- Criados o Ã­ndice de religiÃµes, as pÃ¡ginas de Catolicismo, EvangÃ©licos e Espiritismo e seus estilos, dados e mÃ³dulos de interaÃ§Ã£o.
- Adicionado menu compartilhado com base declarativa, sistema de slots de imagem com placeholders/crÃ©ditos e lightbox acessÃ­vel, alÃ©m da extraÃ§Ã£o de utilitÃ¡rios comuns para `js/charts-core.js`.
- As imagens permanecem geradas em SVG; nÃ£o foram incluÃ­das imagens externas sem licenÃ§a e crÃ©dito confirmados.

### Etapa 5.1 â€” 15/11/2026
- Adicionada a seÃ§Ã£o â€œReligiÃ£o e sociedadeâ€ ao modelo e Ã s pÃ¡ginas de Catolicismo, EvangÃ©licos e Espiritismo, com dados em `js/dados-sociedade.js`.
- IncluÃ­dos navegaÃ§Ã£o radial/chips acessÃ­vel, progressÃ£o por teclado, suporte a movimento reduzido e links para conceitos e perfil censitÃ¡rio.

### Etapa 6 â€” 15/11/2026
- Criadas `umbanda.html`, `candomble.html` e `tradicoes-indigenas.html`, com histÃ³ria, glossÃ¡rio, linha do tempo, dados dos censos, seÃ§Ã£o â€œReligiÃ£o e sociedadeâ€ e navegaÃ§Ã£o entre tradiÃ§Ãµes.
- Atualizados `religiao.html`, `js/dados-religioes.js`, `js/dados-sociedade.js`, `js/dados-paginas-religiao.js`, `js/menu-data.js`, `js/religioes.js`, `js/imagens-religioes.js`, `js/imagens.js`, `js/pagina-religiao.js` e `css/religiao-pagina.css`.
- Adicionados comparativos 2010 Ã— 2022, perfis combinados quando exigido pela divulgaÃ§Ã£o do IBGE, tabelas acessÃ­veis, callouts metodolÃ³gicos e slots sensÃ­veis de imagens ainda geradas em SVG.

### Etapa 7 â€” 15/11/2026
- Criadas `judaismo.html`, `islamismo.html`, `budismo.html` e `hinduismo.html`, com histÃ³ria em abas, linha do tempo, glossÃ¡rio, classificaÃ§Ã£o, seÃ§Ã£o â€œReligiÃ£o e sociedadeâ€, galerias pendentes e navegaÃ§Ã£o entre pÃ¡ginas.
- Atualizados `js/menu-data.js`, `js/dados-religioes.js`, `js/dados-paginas-religiao.js`, `js/dados-sociedade.js`, `js/imagens-religioes.js`, `js/pagina-religiao.js`, `js/religioes.js`, `js/home.js`, `css/religioes.css` e `css/religiao-pagina.css`.
- IncluÃ­dos dados censitÃ¡rios sem grupo prÃ³prio no IBGE, comparaÃ§Ãµes contextuais identificadas, percentuais calculados, avisos de bases distintas, selos de conferÃªncia para `?dev=1` e consultas de imagem sem baixar arquivos.

### Etapa 7.1 â€” 15/11/2026
- Skip link escondido atÃ© o foco; tÃ­tulo do hero sem corte; submenus com ponte e atraso (hover estÃ¡vel); carrossÃ©is automÃ¡ticos e arrastÃ¡veis sem barra; Quiz e VÃ­deos removidos.
- IncluÃ­da uma chamada editorial para as atualizaÃ§Ãµes do Censo 2022 e imagens de capa nos cards de religiÃµes, com placeholders enquanto a /licenÃ§a nÃ£o estiver completa.

### Etapa 7.1b â€” 15/11/2026
- Tipografia restaurada (Cormorant Garamond e Jost), menu mobile sÃ³ com Ã­cone e painel completo, carrossel mobile sem setas, grÃ¡fico da sÃ©rie histÃ³rica legÃ­vel, barra de chips sem sobreposiÃ§Ã£o.

### Etapa 8 â€” 15/11/2026
- Criadas as pÃ¡ginas de Testemunhas de JeovÃ¡, MÃ³rmons, TradiÃ§Ãµes esotÃ©ricas, Santo Daime e AteÃ­smo e sem religiÃ£o usando o modelo compartilhado.
- Atualizados `js/menu-data.js`, `js/dados-religioes.js`, `js/dados-paginas-religiao.js`, `js/dados-sociedade.js`, `js/imagens-religioes.js`, `js/pagina-religiao.js`, `js/religioes.js`, `religioes.html` e `css/religioes.css`.
- As 15 tradiÃ§Ãµes agora estÃ£o ativas; a sÃ©rie de pessoas sem religiÃ£o inclui evoluÃ§Ã£o histÃ³rica, comparaÃ§Ã£o 2010 Ã— 2022, subgrupos e tabelas de perfil. Slots de imagens das novas pÃ¡ginas seguem geradas em SVG.

### Etapa 9.1 â€” 16/11/2026: Fontes refeita (cartÃµes, citaÃ§Ã£o, avisos)
- Reescrita `fontes.html` com o mesmo esqueleto do site, links corrigidos e hero/chips de navegaÃ§Ã£o.
- Criados `css/fontes.css` e `js/fontes.js` para layout, scrollspy, cÃ³pia da citaÃ§Ã£o e datas dinÃ¢micas.
- Ajustados os links globais em `css/base.css` para remover o padrÃ£o azul do navegador e manter o visual do projeto.

## Fontes de dados

- IBGE, Censo DemogrÃ¡fico 2022 â€” ReligiÃµes: resultados preliminares da amostra (2025).
- IBGE, Censos DemogrÃ¡ficos de 1872, 1890, 1940, 1950, 1960, 1970, 1980, 1991, 2000 e 2010.
- Microdados do Censo 2022 (divulgados em 31/08/2026) para o detalhamento por denominaÃ§Ã£o.
- Cada grÃ¡fico e tabela do site informa fonte e ano. Onde hÃ¡ divergÃªncia entre fontes, o site sinaliza.

## Aviso metodolÃ³gico

Os censos mudaram a forma de perguntar sobre religiÃ£o ao longo do tempo (campo aberto, campo fechado, categorias novas). As comparaÃ§Ãµes histÃ³ricas devem ser lidas com essa ressalva. No Censo 2022, a categoria "evangÃ©licos nÃ£o determinados" cresceu muito, o que pode subestimar o peso das denominaÃ§Ãµes pentecostais.

## LicenÃ§a

ConteÃºdo educativo. Dados: IBGE. ReferÃªncias completas na pÃ¡gina "Fontes" do site. LicenÃ§a: MIT (ajuste se necessÃ¡rio).

