# Aulas em Markdown (`CONTEUDO/`) — Testes de Front-End

**Objetivo:** gerar as 10 aulas da UC Testes de Front-End em Markdown na pasta
`MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/CONTEUDO/`, extraídas da ementa, para
servirem de fonte das atividades, das avaliações e da apostila.

**Tech Stack:** Markdown. Exemplos de código das aulas: Node.js/npm, Vitest 3, Testing Library
(React 16 e user-event 14), MSW 2, Cypress 14 e Playwright 1.5x, axe-core, Lighthouse e GitHub Actions.

**Criado em:** 2026-10-08 20:00:46
**Concluído em:** 2026-10-08 20:16:25 (aguardando aceite)
**Tempo decorrido:** cerca de 16 min

**Pedido do usuário:** "crie o plano em docs e gere as aulas md em CONTEUDO" (2026-10-08 20:00:46).
O pedido já traz a aprovação para executar este plano.

**STATUS:** [`STATUS.md`](../STATUS.md), Etapa 102 · **Controle por aula:**
`MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/AULAS/STATUS-AULAS.md`

---

## Escopo

- **Entra:**
  - as 10 aulas `CONTEUDO/AULA-NN-*.md`, de 4 h cada (40 h ÷ 4 = 10, conta exata);
  - o resumo `DOCUMENTACAO/PLANO-AULAS.md`;
  - a coluna "Aula em `CONTEUDO/`" no `AULAS/STATUS-AULAS.md`;
  - a Etapa 102 no `STATUS.md`.
- **Não entra:**
  - as páginas HTML das aulas (o padrão ainda não está definido e não há gerador);
  - as atividades de 50 questões, as avaliações e o banco;
  - a revisão da apostila;
  - mover as práticas para `ATIVIDADES/CONTEUDO/`;
  - renomear a pasta da matéria.
- **Critério de pronto:** 10 arquivos em `CONTEUDO/`, cada um com todas as seções da regra
  "AULAS EXTRAÍDAS DA EMENTA" (módulo, tema, 4 h, conhecimentos, capacidades, indicadores,
  objetivos, roteiro com tempos somando 240 min, conteúdo, exemplo, situação-problema/entrega,
  pelo menos 1 dinâmica, verificação e recursos).
- **Premissas e restrições:**
  - fonte só em Markdown (`EMENTA-CHALKIE-AI.md` e `materia.json`); nenhum PDF;
  - conhecimentos e capacidades **[oficial]** literais, numerados como na ementa do curso
    (conferida: a UC "Testes de Front-End (40h)" bate com a ementa da matéria);
  - uma aula por vez, com o status atualizado a cada aula;
  - sem empresa fictícia: exemplos no papel **"você como aluno consultor"** (regra global de
    2026-10-08, que é mais nova que a regra 4 da Seção IX da ementa);
  - recursos só os previstos na UC.

## Arquivos previstos

| Aula | Arquivo |
|---|---|
| 01 | `CONTEUDO/AULA-01-FUNDAMENTOS-DE-TESTES-DE-SOFTWARE.md` |
| 02 | `CONTEUDO/AULA-02-PLANEJAMENTO-VERIFICACAO-VALIDACAO-E-CASOS-DE-TESTE.md` |
| 03 | `CONTEUDO/AULA-03-TESTES-UNITARIOS-COM-VITEST.md` |
| 04 | `CONTEUDO/AULA-04-TESTES-DE-INTEGRACAO-COM-TESTING-LIBRARY.md` |
| 05 | `CONTEUDO/AULA-05-INTEGRACAO-AVANCADA-E-MOCK-DE-APIS.md` |
| 06 | `CONTEUDO/AULA-06-TESTES-END-TO-END-COM-CYPRESS-E-PLAYWRIGHT.md` |
| 07 | `CONTEUDO/AULA-07-METRICAS-E-COBERTURA-DE-TESTES.md` |
| 08 | `CONTEUDO/AULA-08-TDD-E-DEBUGGING-NO-FRONT-END.md` |
| 09 | `CONTEUDO/AULA-09-QUALIDADE-PERFORMANCE-ACESSIBILIDADE-E-CI-CD.md` |
| 10 | `CONTEUDO/AULA-10-PROJETO-INTEGRADOR-SUITE-DE-TESTES.md` |
| — | `DOCUMENTACAO/PLANO-AULAS.md` (resumo; não é fonte) |

## Riscos

| Risco | Plano B |
|---|---|
| Código de exemplo com sintaxe ou API desatualizada | Usar só APIs estáveis e conferir os blocos de código por leitura |
| A aula cobrar conteúdo de outra UC | Só os conhecimentos da linha da aula na Seção IV da ementa |
| As práticas atuais usam empresa fictícia ("Loja Vale Digital") | Fica registrado como pendência; as aulas não citam empresa |

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Plano, Etapa 102 no `STATUS.md` e coluna no `STATUS-AULAS.md` | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:02 | 01:14 |
| 2 | Aula 01 | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:03:56 | — |
| 3 | Aula 02 | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:05:02 | — |
| 4 | Aula 03 | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:06:15 | — |
| 5 | Aula 04 | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:07:15 | — |
| 6 | Aula 05 | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:08:32 | — |
| 7 | Aula 06 | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:09:35 | — |
| 8 | Aula 07 | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:10:47 | — |
| 9 | Aula 08 | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:12:09 | — |
| 10 | Aula 09 | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:13:12 | — |
| 11 | Aula 10 | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:14:19 | — |
| 12 | `DOCUMENTACAO/PLANO-AULAS.md` | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:14:54 | — |
| 13 | Conferência das 10 aulas (seções, 240 min, conhecimentos) | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:15:40 | — |
| 14 | Commit local + graphify | ✅ Concluído | 2026-10-08 20:00:46 | 2026-10-08 20:16:25 | — |

---

### Passos 2 a 11: Aulas 01 a 10

**Status:** ver a tabela acima

**Arquivo:** criar `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/CONTEUDO/AULA-NN-*.md`
(nomes na tabela "Arquivos previstos").

**Ação:** escrever a aula a partir da linha dela na Seção IV da ementa e do item `aulas[NN]` do
`materia.json`. A estrutura é a mesma do modelo
`MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/CONTEUDO/AULA-01-*.md`:

```markdown
# Aula NN — <tema>

- **Matéria:** Testes de Front-End · Técnico em Informática para Internet — SENAI · Módulo Específico I
- **Carga horária:** 4 h · **Data prevista:** <HORARIO>
- **Conhecimentos (ementa do curso):** <numeração literal>
- **Capacidades:** <Cn/Sn literais>
- **Estratégias:** …
- **Prática da aula:** ../ATIVIDADES/ATIVIDADE-PRATICA-AULA-NN.md

## Indicadores
## Objetivos
## Roteiro da aula (4 h = 240 min)
## Conteúdo
## Exemplo no contexto do curso — você como aluno consultor
## Dinâmica — <nome> (tempo, grupos)
## Situação-problema e entrega da aula
## Verificação da aprendizagem
## Recursos
```

Ao terminar cada aula: marcar ✅ (com data e hora) no item da Etapa 102 do `STATUS.md`, neste
plano e na coluna "Aula em `CONTEUDO/`" do `STATUS-AULAS.md`.

**Verificação:**

```bash
grep -c "^## " CONTEUDO/AULA-NN-*.md
grep -n "min |" CONTEUDO/AULA-NN-*.md
```

Esperado: as 9 seções `##` do modelo, mais as do conteúdo, e um roteiro cujos tempos somam 240 min.

### Passo 12: `DOCUMENTACAO/PLANO-AULAS.md`

**Status:** ⬜ Pendente

**Ação:** tabela-resumo `Aula | Tema | Horas | Conhecimentos | Capacidades | Arquivo`, com o total
de 40 h e o aviso de que a fonte são as aulas de `CONTEUDO/`.

**Verificação:** a soma das horas dá 40 e há 10 linhas.

### Passo 13: Conferência

**Status:** ⬜ Pendente

**Ação:** script de leitura (no scratchpad) que soma os tempos do roteiro de cada aula e confere
as seções obrigatórias e se os conhecimentos de cada aula batem com a Seção IV.

### Passo 14: Commit

**Status:** ⬜ Pendente

**Ação:** `git add` só dos arquivos da tarefa, conferir com `git diff --cached --name-only`,
fazer o commit local (sem push) e rodar `C:\Python314\python.exe -m graphify update .`.

---

## Resultado

10 aulas em `CONTEUDO/` (4 h cada, roteiro de 240 min, 9 seções obrigatórias, pelo menos 1
dinâmica, conhecimentos e capacidades iguais ao `materia.json`, sem empresa fictícia) e o resumo
`DOCUMENTACAO/PLANO-AULAS.md` (40 h). Aguardando o aceite do usuário (item 102.15).

## Pendências

| Item | Motivo | Quando retomar |
|---|---|---|
| Páginas HTML das aulas | Falta definir o padrão (template e CSS em `assets/`) e o gerador | A pedido do usuário |
| Práticas sem empresa fictícia e movidas para `ATIVIDADES/CONTEUDO/` | Fora do escopo deste plano | A pedido do usuário |
| Atividades de 50 questões, avaliações e banco | Próxima peça na ordem da regra | Depois do aceite das aulas |
