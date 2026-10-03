# Padronizar a pasta da matéria Testes de Front-End

**Objetivo:** deixar a pasta da UC *Testes de Front-End* (Técnico em Informática para Internet) no
padrão das regras do `CLAUDE.md` da raiz **antes** de gerar as aulas. Só ficam as pastas que constam
nas regras: `ATIVIDADES/`, `AULAS/` e `DOCUMENTACAO/` (e, no futuro, `APOSTILA/`).

**Criado em:** 2026-10-03 · **Concluído em:** 2026-10-03 18:15 · **Tempo decorrido:** ~2h
**Tecnologias:** Markdown, JSON, HTML/CSS/JS (assets), Python (geradores de índice e status), Git.
**Status geral:** ✅ Concluído (aprovado em 2026-10-03: "SIM, PODE")
**Nome final da pasta:** `TESTES-DE-FRONTEND` (definido pelo professor; a pasta foi renomeada fora desta sessão e o professor pediu para continuar nela)
**Decisão do professor (2026-10-03):** pastas sem regra no `CLAUDE.md` → **opção 2: mover o conteúdo
para uma pasta que consta nas regras**. `REFERENCIA-TESTES-DE-SISTEMAS/` fica **ignorada** até o final.

## Escopo

- Pasta `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES DE FRONTEND/` (curso em `VERIFICAR`).
- Links que apontam para ela (índice do curso, `STATUS-EMENTAS-CURSOS.md`, status da matéria,
  `scripts/aplicar-template-ementa.py`, `scripts/ajustar-tamanho-final.py`).
- **Fora do escopo:** criar as aulas (`PLANO-AULAS.md`, `AULA-NN.md`) e as atividades de 50 questões
  (tarefa seguinte); alterar conteúdo oficial da ementa; banco de dados (a matéria não tem atividade
  cadastrada); `REFERENCIA-TESTES-DE-SISTEMAS/` (só renomeada junto com a pasta-mãe).
- Planos antigos em `docs/` da raiz são registros históricos e **não** são reescritos.

## Destino de cada pasta e arquivo

| # | Hoje | Consta nas regras? | Destino |
|---|---|---|---|
| 1 | Pasta `TESTES DE FRONTEND` (com espaços) | Nome = UC em maiúsculas, sem acento, com hífens | Renomear para **`TESTES-DE-FRONT-END`** |
| 2 | `AULAS-CHALKIE-AI/` (10 slides PDF) | ❌ | **Mover para `AULAS/`** com o nome padrão `AULA-NN-SLIDES.pdf` (ex.: `AULA-01-SLIDES.pdf`); PDFs continuam fora do Git (`*.pdf` no `.gitignore`) |
| 3 | `CONTEUDO/Guia-Aula-01-Fundamentos.md` | ❌ (só citada) | **Mover para `AULAS/AULA-01-GUIA-LABORATORIO.md`** (o gabarito do Exercício 1 que está dentro do guia vai para `AULAS/AULA-01-GABARITO-EXERCICIOS.md`, fora do Git) |
| 4 | `EXERCICIOS/AULA-01/Exercicio-01.md` e `Exercicio-02.md` | ❌ | **Mover para `AULAS/AULA-01-EXERCICIO-01.md` e `AULA-01-EXERCICIO-02.md`** |
| 5 | `ESTRUTURACAO-PLANO-ENSINO/` (blocos 01 e 02, SAs 01 e 02) | ❌ | **Mover para `DOCUMENTACAO/`** (`BLOCO-01-...md`, `BLOCO-02-...md`, `SA-BLOCO-01-...md`, `SA-BLOCO-02-...md`) |
| 6 | `EMENTA-TESTES-FRONT-END.md` (versão antiga de 43 KB, na raiz **e** cópia idêntica em `ESTRUTURACAO-PLANO-ENSINO/`) | Ementa da matéria = só `EMENTA-CHALKIE-AI.md` | **Apagar as duas cópias** (o Git guarda o histórico) |
| 7 | `AVALIACOES/` (vazia) | ❌ (avaliações `AVALIACAO-*.html` ficam em `ATIVIDADES/`) | **Remover** |
| 8 | `docs/expandir-ementa-chalkie-ai.md` (plano antigo: "ementa vazia") | Planos ficam no `docs/` da raiz | **Apagar** `docs/` da matéria |
| 9 | `.claude/` (planos de 08/09 e configuração de outro projeto) | Só permitida em pasta de curso | **Apagar** `.claude/` da matéria |
| 10 | `ATIVIDADES/ATIVIDADE-AULA-01..10.md` (roteiros de prática, não as objetivas) | Objetiva = `ATIVIDADES-AULA-NN-50-QUESTOES`; prática = `ATIVIDADE-PRATICA-AULA-NN` (modelo ITIC) | Renomear para **`ATIVIDADE-PRATICA-AULA-NN.md`**, apontar os slides para `AULAS/AULA-NN-SLIDES.pdf` e corrigir os conhecimentos da Aula 01 para os da ementa (5 · 4 · 1.1) |
| 11 | Sem `materia.json` | Arquivo único de dados da matéria | **Criar** com texto literal da ementa |
| 12 | Sem `STATUS-EMENTAS.md` | Status da ementa por matéria | **Criar** |
| 13 | `index.html` com `<style>`, `<script>` e `onclick`; carrega `PLANO-AULAS-TESTES-FRONT-END.md` (não existe) e a ementa antiga | Sem código embutido; CSS/JS em `assets/` | Extrair para `assets/css/pagina-materia.css` + `assets/js/pagina-materia.js` (caminhos por `data-*`); botões → `EMENTA-CHALKIE-AI.md` e `DOCUMENTACAO/PLANO-AULAS.md` |
| 14 | `planoEnsino.pdf` e `HORARIO.txt` na raiz | Arquivos (não pastas) | **Mover para `DOCUMENTACAO/`** (`PLANO-ENSINO.pdf`, `HORARIO.txt`) |
| 15 | `REFERENCIA-TESTES-DE-SISTEMAS/` | ❌ | ⛔ **Ignorada** por pedido do professor |

## Estrutura final

```
TESTES-DE-FRONT-END/
├─ EMENTA-CHALKIE-AI.md        (só caminhos atualizados; conteúdo oficial igual)
├─ STATUS-EMENTAS.md           (novo)
├─ materia.json                (novo)
├─ index.html                  (sem código embutido)
├─ ATIVIDADES/                 ATIVIDADE-PRATICA-AULA-01..10.md · STATUS-ATIVIDADES.md · index.html
├─ AULAS/                      AULA-01..10-SLIDES.pdf · AULA-01-GUIA-LABORATORIO.md ·
│                              AULA-01-EXERCICIO-01.md · AULA-01-EXERCICIO-02.md · STATUS-AULAS.md
├─ DOCUMENTACAO/               INDEX.md · PLANO-ENSINO.pdf · HORARIO.txt · BLOCO-01/02 · SA-BLOCO-01/02
└─ REFERENCIA-TESTES-DE-SISTEMAS/   (ignorada até o final)
```

## Riscos e dependências

- **Links quebrados:** atualizar todas as referências (`EMENTA-CHALKIE-AI.md`, roteiros, status,
  `INDEX.md`, índice do curso) e procurar os nomes antigos com `grep` no fim.
- **Tamanho da ementa:** os caminhos citados no `EMENTA-CHALKIE-AI.md` (linhas 8, 155 e 203) mudam;
  manter entre 14.800 e 14.950 caracteres e atualizar `STATUS-EMENTAS.md` e
  `STATUS-EMENTAS-CURSOS.md`.
- **Gabarito:** o guia da Aula 01 traz o gabarito do Exercício 1 dentro dele e já está versionado;
  ao mover, o gabarito sai para um arquivo `*GABARITO*` fora do Git.
- **Apagar arquivos (itens 6, 7, 8, 9):** só os listados; versionados ou vazios.
- Sem navegador: a página `index.html` é conferida por leitura; o professor testa.

## Passos

| Passo | Ação | Verificação | Status |
|---|---|---|---|
| 1 | Renomear a pasta (item 1) | renomeações no Git | ✅ Concluído: pasta agora é `TESTES-DE-FRONTEND` |
| 2 | Mover slides, guia, exercícios, blocos, SAs, plano de ensino e horário (itens 2–5, 14); separar o gabarito do guia | pastas de origem vazias e removidas | ✅ Concluído (gabarito do guia e do Exercício 01 em `AULAS/AULA-01-GABARITO-EXERCICIOS.md`) |
| 3 | Apagar ementa antiga, `AVALIACOES/`, `docs/` e `.claude/` da matéria (itens 6–9) | arquivos ausentes | ✅ Concluído |
| 4 | Renomear e ajustar os roteiros de prática (item 10) | 10 arquivos; Aula 01 = 5 · 4 · 1.1 | ✅ Concluído (conhecimentos das 10 aulas alinhados à ementa) |
| 5 | Atualizar caminhos no `EMENTA-CHALKIE-AI.md` | tamanho 14.800–14.950; conteúdo oficial intacto | ✅ Concluído (14.818 chars) |
| 6 | Criar `materia.json` (item 11) | `json.tool`; capacidades/conhecimentos = ementa do curso; 10 × 4h = 40h | ✅ Concluído (lido por `materia.py`; 5 C, 2 S, 7 domínios, 23 conhecimentos) |
| 7 | Página da matéria sem código embutido (item 13) | `node --check`; HTML sem `<style>`/`onclick`/script inline | ✅ Concluído (`assets/css/pagina-materia.css` + `assets/js/pagina-materia.js`) |
| 8 | `INDEX.md`, `STATUS-EMENTAS.md` (novo), `STATUS-EMENTAS-CURSOS.md`, `STATUS-AULAS.md`, `STATUS-ATIVIDADES.md` | caminhos novos | ✅ Concluído |
| 9 | Atualizar índice do curso, scripts com o caminho antigo e regerar o índice de atividades | `grep` sem o nome antigo (fora de `docs/` históricos) | ✅ Concluído |
| 10 | Registrar em `docs/regra-pasta-materia-vinculo-uc.md` | — | ✅ Concluído |
| 11 | Commit local + graphify | `git diff --cached --name-only` sem gabarito/dados pessoais | ✅ Concluído |

## Resultado

Pasta `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/` com `ATIVIDADES/`, `AULAS/`, `DOCUMENTACAO/` e `REFERENCIA-TESTES-DE-SISTEMAS/` (ignorada até o final); `materia.json`, `STATUS-EMENTAS.md` e `index.html` sem código embutido. Links do curso, status e scripts apontam para o nome novo.
