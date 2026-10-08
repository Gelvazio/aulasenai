# Tarefa #2 — Organizar apostilas em Markdown (.md)

**Data:** 2026-10-08 · **Status:** ⏳ plano aguardando aprovação do usuário · **Ambiente:** nuvem

## 1. Objetivo (TASKS.md #2)

Garantir que toda apostila esteja em **Markdown (.md)** — sem PDF/DOCX como fonte —, consolidar
arquivos redundantes e manter a estrutura padrão da matéria modelo (ITIC):
`<MATERIA>/APOSTILA/` com `CONTEUDO/INTRODUCAO.md`, `CONTEUDO/CAPITULO-NN.md`,
`APOSTILA-<MATERIA>.md` (Markdown completo), `APOSTILA-<MATERIA>.html` e `STATUS-APOSTILA.md`.

## 2. Levantamento (arquivos versionados no Git, 2026-10-08)

### 2.1 Já no padrão (nada a fazer nesta tarefa)

| Matéria | Situação |
|---|---|
| ASSISTENTE-DE-OPERACOES-LOGISTICAS / INTRODUCAO-TIC | ✅ padrão (piloto) |
| TECNICO-INFORMATICA-INTERNET / TESTES-DE-FRONTEND | ✅ padrão |
| RIO_DO_SUL_MAIS_TECH / REFORCO_LINGUAGENS | ✅ padrão (vídeos: TASKS #11) |
| RIO_DO_SUL_MAIS_TECH / FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO | ✅ padrão (vídeos: TASKS #12) |

### 2.2 PDF/DOCX de apostila

- ✅ **Nenhuma apostila em PDF ou DOCX está no repositório.** Os PDFs/PPTX existentes são só
  **slides** (`INTRODUCAO-TIC/ATIVIDADES/*.pdf`, `REFORCO_LINGUAGENS/AULAS-CHALKIE-AI/*.pdf`),
  permitidos como material de apresentação (regra "CONTEÚDO SÓ PELOS MARKDOWNS").
- ⚠️ Na nuvem só existe o que está no Git (`*.docx` e a maioria dos `*.pdf` ficam no
  `.gitignore`). PDF/DOCX de apostila que existam **só na máquina local** precisam ser conferidos
  lá (ver item 4.6).

### 2.3 Apostilas fora do padrão (decisão do usuário)

| # | Arquivo | O que é | Proposta |
|---|---|---|---|
| A | `RIO_DO_SUL_MAIS_TECH/NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS/Apostila_Nocoes_Eletricidade_Circuitos_Basicos.md` (64 KB, 36 h) | Apostila antiga em Markdown único, na raiz da matéria | Mover para `APOSTILA/LEGADO/` (guardada como fonte de apoio); a apostila nova sai no padrão depois das aulas em `CONTEUDO/` (a matéria ainda não tem `materia.json` nem aulas) |
| B | `RIO_DO_SUL_MAIS_TECH/REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO/AULAS/APOSTILA-ORIGINAL.html` (114 KB) | Apostila antiga em HTML (sem Markdown) | Manter publicada como está (os módulos `modulo-N-*.html` da pasta seguem em uso); converter para o padrão só quando a matéria ganhar `materia.json` e aulas em `CONTEUDO/` |
| C | `RIO_DO_SUL_MAIS_TECH/Scripts-Comunicacao/CONTEUDO/APOSTILA-COMUNICACAO-15H.md` e `APOSTILA-CEPLAS-VESPERTINO-2026-02.md` | Duas apostilas de Comunicação Oral e Escrita (versão expandida 15 h e fase final de uma turma, 13 h) — possível redundância | Confirmar com o usuário: (1) `Scripts-Comunicacao` é a matéria "Introdução à Comunicação Oral e Escrita"? (2) qual das duas é a vigente; a outra vai para `APOSTILA/LEGADO/` |
| D | `RIO_DO_SUL_MAIS_TECH/EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/MATERIAIS/scripts/gerar_apostila.js` + `conteudo_apostila.js` | Gerador antigo que monta a apostila em **.docx** (biblioteca `docx`) | Desativar como fonte: extrair o conteúdo de `conteudo_apostila.js` para Markdown (`APOSTILA/LEGADO/APOSTILA-EXPLORACAO-CARREIRAS.md`) e mover os dois scripts para `MATERIAIS/scripts/LEGADO/` (não apagar) |
| E | `RIO_DO_SUL_MAIS_TECH/scripts/analisar-apostilas-redundantes.py` | Script de análise com caminho fixo `C:\fontes\aulas-senai` (pasta antiga) | Corrigir o caminho para relativo ao repositório e usá-lo na conferência de redundâncias (item 4.5) |

Matérias **sem apostila nenhuma** (COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO,
OFICINAS_IMPRESSAO_3D_ROBOTICA): fora desta tarefa — a apostila nasce no fim, depois das aulas em
`CONTEUDO/` (regra "AULAS EXTRAÍDAS DA EMENTA").

## 3. Fora do escopo

- ⛔ Gerar apostilas novas no padrão (exige aulas em `CONTEUDO/` + `materia.json` e é feito
  capítulo a capítulo, com validação).
- ⛔ Extrair dados de PDF (regra "CONTEÚDO SÓ PELOS MARKDOWNS").
- ⛔ Apagar arquivos: tudo o que sai do lugar vai para uma pasta `LEGADO/`.
- ⛔ Matérias semelhantes de outros cursos (só as pastas listadas).

## 4. Passos (depois da aprovação)

1. Item A — mover a apostila de Eletricidade para `APOSTILA/LEGADO/` e criar o
   `APOSTILA/STATUS-APOSTILA.md` da matéria ("aguardando aulas em CONTEUDO/").
2. Item B — criar `APOSTILA/STATUS-APOSTILA.md` de Matemática registrando a apostila HTML antiga.
3. Item C — conforme a resposta do usuário, organizar as duas apostilas de Comunicação.
4. Item D — converter `conteudo_apostila.js` para Markdown e mover os scripts para `LEGADO/`.
5. Item E — corrigir o caminho do script e rodar a análise de redundâncias; registrar o
   resultado neste plano.
6. Na máquina **local**: listar PDF/DOCX de apostila fora do Git (`*apostila*.pdf|docx`) e
   decidir com o usuário (fica como subtarefa pendente no TASKS.md).
7. Atualizar links que apontem para arquivos movidos (`grep` no repositório), o TASKS.md (#2) e
   fazer um commit único da tarefa (na nuvem, push na `main`).

## 5. Perguntas ao usuário

1. Aprova os itens A, B, D e E como propostos?
2. Item C: `Scripts-Comunicacao` é a matéria de Comunicação Oral e Escrita? Qual apostila é a
   vigente (15 h expandida ou CEPLAS 2026-02)?
