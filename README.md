# Society of Faith

**Religião e Sociedade no Brasil**: um site informativo e interativo que mostra como a sociedade brasileira se identifica em matéria de fé, com dados dos censos do IBGE (1872–2022), conceitos das Ciências da Religião, história do cristianismo, vídeos e quiz de revisão.

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
- **Vídeos**: seleção sobre religião e sociedade.
- **Quiz**: perguntas de revisão com feedback.
- **Fontes**: links oficiais do IBGE e referências bibliográficas.

## Tecnologias

HTML5, CSS3 e JavaScript puro (ES modules). Sem frameworks e sem etapa de build. Gráficos com Chart.js 4.4.7 (CDN, versão fixa). Hospedagem prevista: GitHub Pages.

## Estrutura do projeto

```text
SocietyofFaith-App/
  brasil.html, censos.html, religioes.html, religiao.html
  catolicismo.html, evangelicos.html, espiritismo.html
  css/       tokens.css, base.css, graficos.css, censos.css, religioes.css, religiao-pagina.css
  js/        components.js, menu-data.js, charts-core.js
             dados-ibge.js, dados-censos.js, dados-religioes.js
             dados-sociedade.js
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
4. Acesse `http://localhost:5500/religioes.html`, `http://localhost:5500/brasil.html` ou `http://localhost:5500/censos.html`.

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

## Roadmap

- [x] Etapa 0: README e esqueleto do repositório
- [x] Etapa 1: Estrutura, identidade visual e home
- [x] Etapa 1.1: Paleta clean e estilos-base
- [x] Etapa 2: Conteúdo teórico sobre religião
- [x] Etapa 3: Dados do IBGE e gráficos (2010 × 2022)
- [x] Etapa 4: Série histórica, linha do tempo e acesso aos dados dos censos (1872–2022)
- [x] Etapa 5: Índice e páginas de religiões (imagens com créditos pendentes de curadoria)
- [ ] Etapa 6: Cristianismo e sociedade brasileira
- [ ] Etapa 7: Vídeos, fontes e links
- [ ] Etapa 8: Quiz, acessibilidade, polimento e deploy

## Changelog

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

## Fontes de dados

- IBGE, Censo Demográfico 2022 — Religiões: resultados preliminares da amostra (2025).
- IBGE, Censos Demográficos de 1872, 1890, 1940, 1950, 1960, 1970, 1980, 1991, 2000 e 2010.
- Microdados do Censo 2022 (divulgados em 31/08/2026) para o detalhamento por denominação.
- Cada gráfico e tabela do site informa fonte e ano. Onde há divergência entre fontes, o site sinaliza.

## Aviso metodológico

Os censos mudaram a forma de perguntar sobre religião ao longo do tempo (campo aberto, campo fechado, categorias novas). As comparações históricas devem ser lidas com essa ressalva. No Censo 2022, a categoria "evangélicos não determinados" cresceu muito, o que pode subestimar o peso das denominações pentecostais.

## Licença

Conteúdo educativo. Dados: IBGE. Referências completas na página "Fontes" do site. Licença: MIT (ajuste se necessário).
