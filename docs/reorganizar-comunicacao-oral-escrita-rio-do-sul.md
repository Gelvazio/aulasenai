# Reorganizar a matéria de Comunicação Oral e Escrita (Rio do Sul Mais Tech) no padrão da ITIC

**Criado em:** 2026-10-07 21:25
**Concluído em:** —
**Tempo decorrido:** —
**Status geral:** 🔄 Em execução (aprovado em 2026-10-07 21:27)
**Pedido do usuário:** "Corrija tudo e deixa na regra padrão, seguindo a matéria padrão ITIC, apague o
que não atender a regra e crie do zero."

---

## 1. Objetivo

Recriar do zero a UC 5 do curso Rio do Sul Mais Tech, **Introdução à Comunicação Oral e Escrita
para o Mundo do Trabalho (33h)**, numa pasta com o nome padrão e com a mesma estrutura da matéria
modelo `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/`. Depois, apagar a pasta
antiga `MATERIAIS/RIO_DO_SUL_MAIS_TECH/Scripts-Comunicacao/`, que está fora do padrão.

## 2. Escopo

- **Entra:**
  - nova pasta da matéria;
  - ementa da matéria;
  - `materia.json`;
  - 9 aulas em `CONTEUDO/`;
  - atividades de 50 questões e atividades práticas por aula;
  - avaliações e média final;
  - menu e índice das atividades;
  - apostila;
  - STATUS da matéria, cadastro em `STATUS-EMENTAS-CURSOS.md` e card no `index.html` do curso;
  - exclusão da pasta antiga.
- **Não entra:**
  - alterar o banco de dados (cadastro de `materia`/`aulas`/`atividade` e seeds). Isso só é feito
    se o usuário pedir "aplique o SQL", conforme a regra "BANCO REAL ANTES DE ALTERAR O SCHEMA";
  - slides novos;
  - mudanças em outras matérias, inclusive nas semelhantes de outros cursos.
- **Critério de pronto:** a pasta nova tem as mesmas peças da ITIC (tabela da seção 4), todas
  conferidas com a ementa da UC 5. A pasta antiga não existe mais (os binários fora do Git ficam
  em backup). Cada etapa tem o aceite do usuário.
- **Premissas e restrições:**
  - a ementa do curso (`EMENTA-PRINCIPAL-RIO_DO_SUL_MAIS_TECH.md`, UC 5) é a fonte da verdade;
  - nada é extraído de PDF;
  - aulas, atividades e apostila são feitas **uma aula ou um capítulo por vez**, com validação do
    usuário;
  - nenhum teste automatizado;
  - nenhum `<style>`/`<script>` embutido nem `onclick`;
  - gabarito nunca em página de aluno nem no Git.

## 3. Situação atual (levantamento de 2026-10-07)

- A pasta `Scripts-Comunicacao` tem 25 slides, 21 infográficos e 6 "módulos", mas a UC tem **33h =
  9 aulas** (8 de 4h + 1 de 1h).
- Faltam `materia.json`, as aulas em `CONTEUDO/`, `AULAS/`, `APOSTILA/`, `ATIVIDADES/CONTEUDO/`,
  as atividades de 50 questões, as atividades práticas, o menu e as avaliações.
- Todos os HTML têm `<style>` embutido. Vários têm `<script>`, `onclick` e `alert()`.
- O `EMENTA-CHALKIE-AI.md` tem 15.909 caracteres (o limite é de 14.800 a 14.950). Nele, o nome da
  UC está incompleto.
- A matéria não aparece no `STATUS-EMENTAS-CURSOS.md`.
- ⚠️ **Arquivos fora do Git, que se perderiam para sempre se fossem apagados:**
  - `SLIDES/Slides_Introducao_Comunicacao_Oral_Escrita.pptx`;
  - os 25 `.pptx` de `SLIDES/VERSAO-POWERPOINT/`;
  - os 3 `.pdf` de `CONTEUDO/` (apostilas antigas).

  Os demais arquivos estão no Git e podem ser recuperados pelo histórico.

## 4. Estrutura alvo (espelho da ITIC)

Pasta nova: `MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/`. Esse é o nome
citado como exemplo em `docs/regras/ementas-e-cursos.md` e segue o padrão `_` das outras matérias do
curso.

| Peça | Caminho |
|---|---|
| Ementa e dados | `EMENTA-CHALKIE-AI.md`, `materia.json`, `STATUS-EMENTAS.md` |
| Aulas | `CONTEUDO/AULA-01-...md` … `CONTEUDO/AULA-09-...md` |
| Controle das aulas | `AULAS/STATUS-AULAS.md` |
| Atividade objetiva | `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md` → `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html` |
| Atividade prática | `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` (+ `-GABARITO.md`, fora do Git) → `.html` |
| Avaliações | `ATIVIDADES/AVALIACAO-OBJETIVA-NN.html`, `AVALIACAO-PRATICA.html`, `AVALIACAO-MEDIA-FINAL.html`, `media-final.json` |
| Menu e índice | `ATIVIDADES/MENU-ATIVIDADES.js`, `ATIVIDADES/index.html`, `ATIVIDADES/STATUS-ATIVIDADES.md` |
| Apostila | `APOSTILA/CONTEUDO/INTRODUCAO.md`, `CAPITULO-NN.md`, `APOSTILA-...md`, `.html`, `STATUS-APOSTILA.md` |

## 5. Passos

### Etapa A — Preparação
| Passo | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| A.1 | Copiar os binários fora do Git (26 `.pptx` e 3 `.pdf`) para um backup fora do repositório | `C:\fontes\BACKUP-SCRIPTS-COMUNICACAO-2026-10-07\` | Contar os arquivos na origem e no destino | ✅ 2026-10-07 21:28 — 29 arquivos (333 MB) |
| A.2 | Cadastrar a matéria como `VERIFICAR` na tabela STATUS-PERMISSAO-MATERIA | `MATERIAIS/STATUS-EMENTAS-CURSOS.md` | Ler a linha | ✅ 2026-10-07 21:29 |
| A.3 | Ler as regras de `docs/regras/` (ementas, atividades, apostilas, assets) e as peças da ITIC | — | — | ✅ 2026-10-07 21:30 |

### Etapa B — Ementa e dados
| Passo | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| B.1 | Criar a pasta nova e o `EMENTA-CHALKIE-AI.md` a partir da UC 5: nome exato, 33h, 4 capacidades e 4 conhecimentos da ementa do curso, sequência de 9 aulas | `.../INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/EMENTA-CHALKIE-AI.md` | `wc -c` entre 14.800 e 14.950 e conferência com a UC 5 | ✅ 2026-10-07 21:31 — 14.835 caracteres |
| B.2 | Criar o `materia.json` (formato da ITIC, `autor_apostila` = Gelvazio Camargo, `versao_apostila` = 1.0) | `materia.json` | `python -m json.tool` e leitura por `assets/gerador-materia/materia.py` | ✅ 2026-10-07 21:31 — 9 aulas, soma 33h |
| B.3 | Criar o `STATUS-EMENTAS.md` da matéria e regenerar `STATUS-EMENTAS-CURSOS.md` | script `criar-status-cursos.py` | Ler o resultado | ✅ 2026-10-07 21:33 — script passou a ignorar `AGENDA_COLABORADOR` (não é curso, regra do CLAUDE.md) |
| B.4 | Aceite do usuário (ementa e plano das 9 aulas) | — | — | ✅ 2026-10-07 21:37 — 9 temas, só C1–C4, Vale Tech, prática 6,0 + objetiva 4,0 |

### Etapa C — Aulas (uma por vez, com `AULAS/STATUS-AULAS.md`)
| Passo | Ação | Status |
|---|---|---|
| C.1 a C.9 | Aulas 01 a 09 em `CONTEUDO/AULA-NN-....md`. Cada uma com roteiro, conteúdo, exemplos, pelo menos 1 dinâmica e verificação. A aula 09 tem 1h. Validação do usuário a cada aula | ✅ 2026-10-07 21:43 — 9 aulas geradas a pedido do usuário; roteiros somam 33h; 1 dinâmica por aula |

### Etapa D — Atividades (uma aula por vez, com `ATIVIDADES/STATUS-ATIVIDADES.md`)
| Passo | Ação | Status |
|---|---|---|
| D.1 a D.9 | Para cada aula: fonte `ATIVIDADES-AULA-NN-50-QUESTOES.md` (fora do Git) → HTML pelo `assets/gerador-atividades`, mais a atividade prática `.md` → `.html` | ⬜ |
| D.10 | Avaliações (objetiva, prática, média final) pelos geradores de `assets/` | ⬜ |
| D.11 | `MENU-ATIVIDADES.js` e `ATIVIDADES/index.html` (geradores de menu e índices); card da matéria no `index.html` do curso | ⬜ |
| D.12 | Aceite do usuário | ⬜ |

### Etapa E — Apostila (um capítulo por vez)
| Passo | Ação | Status |
|---|---|---|
| E.1 | `APOSTILA/CONTEUDO/INTRODUCAO.md` | ⬜ |
| E.2 a E.10 | Capítulos 01 a 09 (1 capítulo = 1 aula, no mínimo 5 exercícios, sem gabarito), com validação a cada capítulo | ⬜ |
| E.11 | Conferência 100% com a ementa (`conferir_ementa.py`), Markdown completo e HTML (`gerar_apostila.py`) | ⬜ |
| E.12 | Aceite do usuário | ⬜ |

### Etapa F — Limpeza
| Passo | Ação | Verificação | Status |
|---|---|---|---|
| F.1 | Apagar `MATERIAIS/RIO_DO_SUL_MAIS_TECH/Scripts-Comunicacao/` (depois do backup A.1) | `ls` não encontra a pasta; o backup continua | ⬜ |
| F.2 | Procurar links para `Scripts-Comunicacao` no projeto e corrigir | `grep` sem resultado | ⬜ |
| F.3 | Aceite final do usuário | — | ⬜ |

Cada passo concluído ganha um commit local, sem push (ambiente local).

## 6. Riscos

| Risco | Plano B |
|---|---|
| Perder slides e PDFs que não estão no Git | Backup A.1 antes de qualquer exclusão. A exclusão (F.1) só acontece no fim |
| A pasta tem 2 versões ao mesmo tempo durante o trabalho | A antiga só é apagada na Etapa F |
| As atividades não gravam respostas sem cadastro no banco | Avisar o usuário; o SQL fica em `database/` e só é aplicado a pedido |
| Trabalho longo (9 aulas, 9 atividades, 9 capítulos) e a sessão cair | `STATUS.md` (Etapa 71) e os STATUS da matéria atualizados a cada item |
| O `.gitignore` raiz está hoje sem as regras de gabarito | Restaurar o `.gitignore` antes do primeiro commit de atividade (pendência do usuário) |
