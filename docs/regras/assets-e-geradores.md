# 📚 Regras do projeto — CSS, JS e geradores em assets/

> Parte das regras do projeto aulasenai (índice e regras de sempre no [`AGENTS.md`](../../AGENTS.md) e em `.claude/rules/`). Ao alterar este arquivo, registrar a mudança em [`docs/HISTORICO-REGRAS.md`](../HISTORICO-REGRAS.md).

---

## 🪟 REGRA CRÍTICA — AVISOS AO USUÁRIO: sempre POPUP, nunca `alert()`/`confirm()`

Registrada em 2026-09-30. Componente reutilizável: `assets/js/popup.js` + `assets/css/popup.css`
(`await mostrarPopup(texto, {tipo, titulo})` e `await confirmarPopup(texto, {...})`; tipos
`sucesso`, `erro`, `aviso`, `info`, `pergunta`). Todo código novo usa o popup; as páginas de
atividade carregam o `popup.js` sozinhas (via `respostas-atividade.js`) e as demais incluem o
`<script>`. Ainda usam `alert`/`confirm` (converter quando forem mexidas): `js/aulas.js`,
`js/curso.js`, `js/materia.js`, `js/unidade.js`, `assets/js/atividade.js` e
`assets/js/atividades-crud-modal.js`.

## 🎨 REGRA CRÍTICA — CSS E JS GENÉRICOS EM `assets/` (SEMPRE REUTILIZAR)

⚠️ **Todo CSS e JavaScript genérico fica em `C:\fontes\aulasenai\assets\` e deve ser REUTILIZADO, nunca copiado para dentro dos HTML.**

```
assets/
├─ css/                → estilos reutilizáveis (ex.: atividade.css, indice-atividades.css,
│                        atividade-pratica-excel.css)
├─ js/                 → scripts reutilizáveis (ex.: atividade.js — exportação de atividades em PDF;
│                        atividade-pratica-excel.js — imprimir e marcar passo concluído;
│                        termos-tentativa.js — textos de tentativa/recuperação (avaliações);
│                        notas-fixas-turma.js — nota fixa por turma (ex.: 10 nas Aulas 01-03
│                        de Análise de Dados p/ turma 133933; 04 a 07 pelo banco), usada pelo
│                        relatorioAtividades.html e pelo painel-professor.html;
│                        tabela-notas-professor.js + css/tabela-notas-professor.css — tabela
│                        "Notas dos alunos" (só professor) abaixo do relatório da atividade:
│                        nome e nota (melhor tentativa) em ordem alfabética, da turma da aba, com
│                        "📥 Exportar PDF (notas)"; em TODAS as atividades com relatório do
│                        professor, de todas as matérias (desde 2026-10-06); desligar numa
│                        página só com body data-tabela-notas="nao";
│                        respostas-atividade.js + css/respostas-atividade.css — marcação das
│                        alternativas, folha de respostas no fim da página e entrega; grava
│                        SOMENTE no banco (sem localStorage); ativado com
│                        `- **Folha de respostas:** sim` no .md;
│                        lista-presenca.js + css/lista-presenca.css — página LISTA-PRESENCA.html
│                        da matéria, uma tabela por turma (UC em data-uc) a partir de scripts/LISTAPRESENCA.js;
│                        css/login.css — página login.html da raiz, com js/login.js (Supabase Auth,
│                        orientação em docs/ORIENTACAO_JS_LOGIN.md);
│                        respostas-atividade-banco.js — grava alternativas/entrega no Supabase
│                        (login só para responder; sem banco, bloqueia); painel-professor.js +
│                        css/painel-professor.css — painel-professor.html da raiz;
│                        atividades-crud-repositorio.js + atividades-crud-modal.js + css/
│                        atividades-crud-modal.css — botão CADASTRAR ATIVIDADES em cada card do
│                        ATIVIDADES/index.html (só professor logado): modal com CRUD da tabela
│                        `atividade`; link = páginas HTML da própria pasta; SQL em
│                        database/2026-09-29-atividade-crud-professor.sql; o gerador-indices
│                        inclui as tags, índices feitos à mão recebem as tags manualmente;
│                        turmas-professor-repositorio.js + turmas-professor-pagina.js + css/
│                        turmas-professor.css — turmas.html da raiz (menu TURMAS, só Professor
│                        Administrador): CRUD da tabela `turmaprofessor`;
│                        turmas-aluno-repositorio.js + turmas-aluno-pagina.js + css/
│                        turmas-aluno.css — alunos.html da raiz (menu ALUNOS, só Professor Administrador):
│                        CRUD da tabela `turmaaluno`;
│                        pendencias-repositorio.js + pendencias-pagina.js + css/
│                        pendencias.css — MATERIAIS/AGENDA_COLABORADOR/pendencias.html
│                        (menu PENDÊNCIAS, só Professor Administrador): CRUD da
│                        tabela `pendencias`;
│                        documento-word.js + exportar-word.js + exportar-word-pratica.js —
│                        exportação em Word (hoje só nas atividades práticas de Excel;
│                        Word não é obrigatório: só onde o usuário pedir);
│                        exportar-pagina.js + css/exportar-pagina.css — "📥 Exportar Para PDF"
│                        (página inteira, igual à tela); Word ao lado desligado com data-word="nao")
├─ gerador-materia/    → materia.py: lê o <MATERIA>/materia.json (arquivo ÚNICO de dados da
│                        matéria), usado por todos os geradores (ver "REGRAS APOSTILAS")
├─ gerador-apostilas/  → gerar_apostila.py + markdown_apostila.py + conferir_ementa.py +
│                        template_apostila.html:
│                        capítulos (APOSTILA/CONTEUDO/) → Markdown completo (--markdown) → HTML
│                        da apostila (css/apostila.css, js/apostila.js, img/logo-sesi-senai.png)
├─ gerador-atividades/ → gerar_atividades.py + template_atividade.html: gera as páginas de
│                        atividade de 50 questões e o index.html de qualquer pasta ATIVIDADES/
├─ gerador-atividade-excel/ → gerar_atividade_excel.py (+ desenho_excel.py, tela_excel.py,
│                        sobreposicoes_excel.py, graficos_excel.py, base_excel.py): gera capa,
│                        questões e telas do Excel em SVG (inclui tabela dinâmica, gráficos,
│                        segmentação e linha do tempo) e, se pedido, o .xlsx de base para o aluno
│                        baixar, tudo a partir do atividade.json
├─ gerador-indices/    → gerar_indices.py: gera o índice de atividades em 3 níveis — index.html
                         (raiz, cards de cursos) → MATERIAIS/<CURSO>/index.html (cards de
                         matérias) → <MATERIA>/ATIVIDADES/index.html (atividades da matéria).
                         Lista só páginas .html, em ordem crescente da data DD-MM-AAAA do nome
                         (sem data vão para o fim). Preserva índices sem o marcador, salvo
                         `--forcar <pasta ATIVIDADES>`.
                         Rodar de novo sempre que surgir curso, matéria ou atividade.
                         Liberar/bloquear atividade = BANCO DE DADOS, POR TURMA (atividade.bloqueio;
                         atividade.ativo = false bloqueia todas): o professor usa o interruptor de
                         cada card (assets/js/indice-atividades-bloqueio.js), que vale só para a
                         turma favorita: "Bloquear (turma X)" / "Desbloquear (turma X)".
                         Não existe mais lista em arquivo (ATIVIDADES-LIBERADAS.js foi removida).
├─ gerador-avaliacao-media-final/ → gerar_avaliacao_media_final.py + template: gera a
│                        AVALIACAO-MEDIA-FINAL.html (composição da nota, 100 pontos) de cada matéria a
│                        partir de ATIVIDADES/media-final.json (+ materia.json). `--propor` cria o
│                        json de proposta (30 atividades / 40 objetivas / 30 prática ou Excel) sem
│                        sobrescrever; `--todas` gera em todas as matérias com json; página sem o
│                        marcador só com `--forcar`. Mudou a composição = editar o json e rodar de novo.
├─ css/menu.css        → estilos do menu de atividades (montado por js/menu.js)
├─ gerador-capacidades/ → capacidades.py + css/capacidades.css: quadro "CAPACIDADES" no início e
│                        caixa "🎯 CAPACIDADE" (igual à de CONTEXTO) em cada questão das atividades
│                        e avaliações (gerador-atividades e gerador-avaliacao-discursiva); o PDF
│                        (assets/js/atividade.js) leva os dois. Questão: `- **Capacidade:** C1` ou
│                        `C1, C3` no .md; textos oficiais no campo `capacidades` do
│                        materia.json da matéria (código inexistente = erro).
└─ gerador-menu/       → tags_menu.py: monta as tags do menu para o <head>; usado pelos três
                         geradores acima e, direto, para aplicar o menu em páginas existentes:
                         `python assets\gerador-menu\tags_menu.py <arquivo.html> [...]`
```

> ⛔ **Desligado em 2026-10-08, a pedido do usuário:** a barra do menu das atividades (nome da
> matéria + "Equipes") não aparece mais em nenhuma página — tudo o que ela oferecia já está no
> menu base do header (`js/header-usuario.js`, com o botão 👥 EQUIPES global). Chave única:
> `MENU_ATIVIDADES_LIGADO = false` em `js/menu.js` (as páginas continuam com as tags; não é
> preciso editar página por página). Só religar a pedido do usuário.

**Menu das atividades** (registrado em 2026-09-27, plano `docs/criar-menu-js-atividades.md`):
- ✅ Script em **`js/menu.js`** (na raiz do projeto, por pedido do usuário — exceção à regra de
  `assets/js/`). Monta o menu no topo do primeiro `<header>` da página.
- ✅ Os itens vêm de **`ATIVIDADES/MENU-ATIVIDADES.js`** da pasta de atividades
  (`window.MENU_ATIVIDADES = { titulo, itens: [{ rotulo, link } | { rotulo, subitens }] }`),
  com links relativos a essa pasta. Nada de nomes fixos no `menu.js`.
- ✅ Pastas com menu: `GESTAO_E_CONTROLE_MATERIAIS/.../AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/`,
  `ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/` e
  `RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/` (2026-10-07, com a apostila) e
  `TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/` (2026-10-16, #244.2).
- ✅ Página ou atividade nova numa dessas pastas: acrescentar o item no `MENU-ATIVIDADES.js`.
  Os geradores já incluem as tags quando o arquivo de dados existe.

**Header do usuário logado** (registrado em 2026-09-29, plano `docs/barra-usuario-logado-e-botao-entrar.md`):
- ✅ Script genérico **`js/header-usuario.js`** + `assets/css/header-usuario.css`: preenche o
  `<div id="header-usuario"></div>` da página com "👤 nome · perfil" e **SAIR** (logado) ou o botão
  **ENTRAR** (deslogado, volta à página atual). Caminhos calculados a partir do próprio script.
- ✅ Toda página de `MATERIAIS/` e o `index.html` da raiz têm `<script src=".../js/header-usuario.js"
  defer>` no `<head>` e o `<div id="header-usuario">` logo após `<body>`. Página nova: rodar
  `C:\Python314\python.exe assets\gerador-menu\tags_header.py [arquivo.html]` (idempotente); os
  geradores (`gerar_atividades`, `gerar_indices`, `gerar_atividade_excel`) já inserem sozinhos.

**Gerador de atividades** (fonte única: os `.md` de questões da pasta):
```powershell
C:\Python314\python.exe assets\gerador-atividades\gerar_atividades.py <pasta ATIVIDADES da matéria>
```
A matéria precisa do `<MATERIA>/materia.json` (arquivo único: `uc`, `uc_curta`, `curso`, `docente`,
`capacidades`...), lido por `assets/gerador-materia/materia.py`.

- ✅ **Antes** de criar CSS ou JS, verificar se já existe algo em `assets/css/` ou `assets/js/` que resolva — e reutilizar.
- ✅ HTML referencia os arquivos por **caminho relativo** até `assets/` (ex.: `../../../../assets/css/atividade.css`).
- ❌ **Proibido** `<style>` e `<script>` com código embutido nos HTML, e atributos `onclick`/`onchange` etc. Eventos são ligados pelo `.js`.
- ✅ O que muda de página para página entra no HTML **apenas como dados**: atributos `data-*` (ex.: `data-aula`, `data-tema`, `data-uc`, `data-docente`) ou `<script type="application/json">` (ex.: gabarito).
- ✅ Scripts em `assets/js/` não podem ter nomes, matérias ou docentes fixos no código — tudo vem dos dados da página.
- ✅ Ao criar um CSS/JS novo e reutilizável, colocá-lo em `assets/` e registrar aqui no exemplo acima.

**Arquivos antigos na raiz de `assets/`** (`style.css`, `script.js`, `GERAR-MATERIAS.bat`) continuam onde estão; novos arquivos vão para `assets/css/` e `assets/js/`.
