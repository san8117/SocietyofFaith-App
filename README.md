# Society of Faith

**Religião e Sociedade no Brasil**: um site informativo que mostra como a sociedade brasileira se identifica em matéria de fé, com textos, dados censitários (1872–2022), conceitos das Ciências da Religião e imagens em curadoria.

> Projeto educacional desenvolvido a partir das disciplinas de Fundamentos do Cristianismo e Antropologia Cristã (UNASP).

## Criadores

- Guilherme Oliveira de Santana
- Pedro Henrique Gomes
- Henrique Soares
- Lucas Cardoso
- Kaue Bueno

## O que o site terá

- **Religião**: etimologia, definições (Geertz, Durkheim, Marx, Nietzsche), classificações (animismo, ateísmo, teísmo, panteísmo, magismo) e constituintes (doutrina, ritos, ética, comunidade, mito).
- **Brasil em dados**: gráficos interativos do IBGE (Censo 2010 × 2022), perfis por região, idade, sexo, cor ou raça e escolaridade.
- **Todos os censos**: linha do tempo de 1872 a 2022 e como a religião foi perguntada em cada recenseamento.
- **Cristianismo**: nascimento, cronologia, Edito de Milão, Teodósio e a estrutura das primeiras comunidades.
- **Fontes**: links oficiais do IBGE e referências bibliográficas.

## Tecnologias

HTML5, CSS3 e JavaScript puro (ES modules). Sem frameworks e sem etapa de build. Gráficos com Chart.js 4.4.7 (CDN, versão fixa). Hospedagem: Vercel.

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
  assets/    imagens e ícones
```

## Como rodar localmente

1. Clone o repositório.
2. Abra a pasta no VS Code.
3. Use a extensão "Live Server" ou execute `python -m http.server 5500`.
4. Acesse `http://localhost:5500/` para a home (`index.html`), ou `religioes.html`, `brasil.html` e `censos.html`.

## Como adicionar imagens

1. Adicione a imagem selecionada em `assets/` e confirme que sua licença permite o uso no projeto.
2. Em `js/imagens-religioes.js`, informe o caminho local, texto alternativo, autoria/crédito e licença do slot correspondente (`capa`, `origens`, `brasil`, `hoje` ou `galeria1`–`galeria3`).
3. Só preencha `src`, `alt`, `credito` e `licenca` quando todos os dados estiverem confirmados. Os slots incompletos permanecem como placeholders; não use imagens sem procedência verificada.
4. Confira a descrição alternativa, a atribuição visível e a abertura/fechamento da lightbox por teclado.

## Como criar uma nova página de religião

1. Reaproveite a estrutura, navegação, estilos e módulos de `catolicismo.html`, `evangelicos.html` e `espiritismo.html`.
2. A seção **“Religião e sociedade”** é obrigatória no modelo e deve entrar entre “Para entender” e “Galeria”. Use o sistema comum de abas/painel, diagrama radial em telas largas e chips roláveis no mobile.
3. Use as seis áreas padrão: educação, assistência e saúde, cultura, política e leis, família e valores, convivência e diversidade. Se houver menos material, a página pode ter quatro áreas, mas deve sempre incluir **convivência e diversidade**.
4. Mantenha o texto completo no HTML em `<article>`s, com “Dois olhares” em `<details>` para o fallback sem JavaScript. O módulo interativo usa os dados correspondentes em `js/dados-sociedade.js`.
5. Preserve o tom descritivo e neutro, registre uma fonte por área, evite alegações de causalidade e marque itens que precisem de checagem com `conferir: true` nos dados.
6. Use linguagem respeitosa, os nomes escolhidos por cada tradição e comunidade, e evite generalizações. Para tradições indígenas, reconheça a diversidade entre povos; Umbanda e Candomblé são religiões distintas.
7. Marque todos os slots de imagem como sensíveis; não use imagens de pessoas identificáveis em rituais restritos, iniciações ou situações íntimas sem autorização documentada. Prefira arquitetura, patrimônio, festas públicas, objetos, mapas, ilustrações históricas e acervos oficiais. Registre fonte, crédito, licença, texto alternativo e legenda; informe que imagens de rituais exigem autorização de quem é retratado.
8. Quando uma tradição não tiver grupo próprio nos recortes do IBGE, marque `semGrupoIBGE: true` e informe `contexto` com o grupo censitário usado. Apresente esse grupo como contexto, nunca como retrato da tradição; explique as bases, os denominadores e qualquer percentual calculado.
9. Se o dado de 2010 não estiver disponível, registre `pessoas[2010]: null`, não desenhe uma comparação 2010 × 2022 e informe que o valor deve ser confirmado no SIDRA.
10. Em temas sensíveis, use imagens de paisagens, plantas, mapas, arquitetura e documentos; não publique imagens de pessoas em cerimônias, consumo ou preparo de substâncias. Marque os slots sensíveis e inclua avisos de segurança e de autorização quando aplicável.

## Roadmap

- [x] Etapa 0: README e esqueleto do repositório
- [x] Etapa 1: Estrutura, identidade visual e home
- [x] Etapa 1.1: Paleta clean e estilos-base
- [x] Etapa 2: Conteúdo teórico sobre religião
- [x] Etapa 3: Dados do IBGE e gráficos (2010 × 2022)
- [x] Etapa 4: Série histórica, linha do tempo e acesso aos dados dos censos (1872–2022)
- [x] Etapa 5: Índice e páginas de religiões (imagens com créditos pendentes de curadoria)
- [x] Etapa 6: Umbanda, Candomblé e tradições indígenas
- [x] Etapa 7: Judaísmo, Islamismo, Budismo e Hinduísmo
- [x] Etapa 8: Testemunhas de Jeová, Mórmons, Tradições esotéricas, Santo Daime e Sem religião
- [x] Etapa 9: Origens do cristianismo e página Fontes
- [ ] Etapa 10: Acessibilidade, polimento, SEO e deploy

## Changelog

### Etapa 6.0 — 15/11/2026: index.html refeito, 'Início' corrigido

### Etapa 0 — 14/11/2026
- Preparada a documentação inicial e a estrutura básica do repositório.

### Etapa 1.1 — 14/11/2026
- Aplicada a paleta clean em `css/tokens.css` e criados estilos visuais base.

### Etapa 3 — 14/11/2026
- Criados `brasil.html`, `css/graficos.css`, `js/dados-ibge.js` e `js/graficos.js`; atualizados `README.md`.
- Entregues gráficos interativos do Censo 2010 e 2022, tabelas acessíveis, filtros por perfil, navegação por seção, animações respeitando movimento reduzido e ressalvas metodológicas.

### Etapa 4 — 14/11/2026
- Criados `censos.html`, `css/censos.css`, `js/dados-censos.js` e `js/censos.js`; criado `js/components.js` e atualizado o menu em `brasil.html`.
- Entregues série histórica com lacunas explícitas e tabela de dados, gráficos de variação, linha do tempo filtrável com diálogo acessível, comparação interativa de formulários, links oficiais do IBGE e cópia de citação ABNT.

### Etapa 5 — concluída
- Criados o índice de religiões, as páginas de Catolicismo, Evangélicos e Espiritismo e seus estilos, dados e módulos de interação.
- Adicionado menu compartilhado com base declarativa, sistema de slots de imagem com placeholders/créditos e lightbox acessível, além da extração de utilitários comuns para `js/charts-core.js`.
- As imagens permanecem pendentes de curadoria; não foram incluídas imagens externas sem licença e crédito confirmados.

### Etapa 5.1 — 15/11/2026
- Adicionada a seção “Religião e sociedade” ao modelo e às páginas de Catolicismo, Evangélicos e Espiritismo, com dados em `js/dados-sociedade.js`.
- Incluídos navegação radial/chips acessível, progressão por teclado, suporte a movimento reduzido e links para conceitos e perfil censitário.

### Etapa 6 — 15/11/2026
- Criadas `umbanda.html`, `candomble.html` e `tradicoes-indigenas.html`, com história, glossário, linha do tempo, dados dos censos, seção “Religião e sociedade” e navegação entre tradições.
- Atualizados `religiao.html`, `js/dados-religioes.js`, `js/dados-sociedade.js`, `js/dados-paginas-religiao.js`, `js/menu-data.js`, `js/religioes.js`, `js/imagens-religioes.js`, `js/imagens.js`, `js/pagina-religiao.js` e `css/religiao-pagina.css`.
- Adicionados comparativos 2010 × 2022, perfis combinados quando exigido pela divulgação do IBGE, tabelas acessíveis, callouts metodológicos e slots sensíveis de imagens ainda pendentes de curadoria.

### Etapa 7 — 15/11/2026
- Criadas `judaismo.html`, `islamismo.html`, `budismo.html` e `hinduismo.html`, com história em abas, linha do tempo, glossário, classificação, seção “Religião e sociedade”, galerias pendentes e navegação entre páginas.
- Atualizados `js/menu-data.js`, `js/dados-religioes.js`, `js/dados-paginas-religiao.js`, `js/dados-sociedade.js`, `js/imagens-religioes.js`, `js/pagina-religiao.js`, `js/religioes.js`, `js/home.js`, `css/religioes.css` e `css/religiao-pagina.css`.
- Incluídos dados censitários sem grupo próprio no IBGE, comparações contextuais identificadas, percentuais calculados, avisos de bases distintas, selos de conferência para `?dev=1` e consultas de imagem sem baixar arquivos.

### Etapa 7.1 — 15/11/2026
- Skip link escondido até o foco; título do hero sem corte; submenus com ponte e atraso (hover estável); carrosséis automáticos e arrastáveis sem barra; Quiz e Vídeos removidos.
- Incluída uma chamada editorial para as atualizações do Censo 2022 e imagens de capa nos cards de religiões, com placeholders enquanto a curadoria/licença não estiver completa.

### Etapa 7.1b — 15/11/2026
- Tipografia restaurada (Cormorant Garamond e Jost), menu mobile só com ícone e painel completo, carrossel mobile sem setas, gráfico da série histórica legível, barra de chips sem sobreposição.

### Etapa 8 — 15/11/2026
- Criadas as páginas de Testemunhas de Jeová, Mórmons, Tradições esotéricas, Santo Daime e Ateísmo e sem religião usando o modelo compartilhado.
- Atualizados `js/menu-data.js`, `js/dados-religioes.js`, `js/dados-paginas-religiao.js`, `js/dados-sociedade.js`, `js/imagens-religioes.js`, `js/pagina-religiao.js`, `js/religioes.js`, `religioes.html` e `css/religioes.css`.
- As 15 tradições agora estão ativas; a série de pessoas sem religião inclui evolução histórica, comparação 2010 × 2022, subgrupos e tabelas de perfil. Slots de imagens das novas páginas seguem pendentes de curadoria.

## Fontes de dados

- IBGE, Censo Demográfico 2022 — Religiões: resultados preliminares da amostra (2025).
- IBGE, Censos Demográficos de 1872, 1890, 1940, 1950, 1960, 1970, 1980, 1991, 2000 e 2010.
- Microdados do Censo 2022 (divulgados em 31/08/2026) para o detalhamento por denominação.
- Cada gráfico e tabela do site informa fonte e ano. Onde há divergência entre fontes, o site sinaliza.

## Aviso metodológico

Os censos mudaram a forma de perguntar sobre religião ao longo do tempo (campo aberto, campo fechado, categorias novas). As comparações históricas devem ser lidas com essa ressalva. No Censo 2022, a categoria "evangélicos não determinados" cresceu muito, o que pode subestimar o peso das denominações pentecostais.

## Licença

Conteúdo educativo. Dados: IBGE. Referências completas na página "Fontes" do site. Licença: MIT (ajuste se necessário).
