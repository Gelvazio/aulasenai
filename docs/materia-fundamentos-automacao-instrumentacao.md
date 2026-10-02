# Estrutura da matéria Fundamentos de Automação/Instrumentação (Operador de Produção Industrial)

**Objetivo:** criar na pasta `MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/`
tudo o que as regras do `CLAUDE.md` raiz exigem de uma matéria, a partir da UC 10.12 da
`EMENTA-PRINCIPAL-OPERADOR_PRODUCAO_INDUSTRIAL.md` (fonte da verdade, 60h, capacidades C1–C4).

**Tech Stack:** Markdown, JSON, Python 3.14 (scripts de status e gerador de índices do projeto).

**Criado em:** 2026-10-02 11:01
**Concluído em:** 2026-10-02 11:10
**Tempo decorrido:** ~09:00

**Escopo:** só esta matéria (regra "matérias semelhantes: atualizar só a pasta pedida").
**Fora do escopo (tarefas futuras, a pedido):** slides, atividades de 50 questões, avaliações e
`dashboard.html` (a regra do dashboard está em "AGUARDANDO ACERTO DE EMENTA").

**Riscos:** ementa de matéria divergir da UC do curso (mitigação: copiar capacidades e conhecimentos
literalmente); tamanho fora de 14.800–14.950 caracteres (mitigação: medir e ajustar); scripts de
status regenerarem arquivos de outros cursos (só registram, não alteram ementas).

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar `EMENTA-CHALKIE-AI.md` (17 seções, 60h, C1–C4, 14.800–14.950 caracteres) | ✅ Concluído |
| 2 | Criar `DOCUMENTACAO/` (`PLANO-AULAS.md`, `INDEX.md`, `VERIFICACAO_COBERTURA_EMENTA.md`) | ✅ Concluído |
| 3 | Criar `ATIVIDADES/atividades.json` (uc, curso, docente, capacidades C1–C4) | ✅ Concluído |
| 4 | Criar pastas `AULAS/` e `AVALIACOES/` vazias com `LEIA-ME.md` (o que entra em cada uma) | ✅ Concluído |
| 5 | Gerar índices (`ATIVIDADES/index.html`, `MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/index.html` e raiz) | ✅ Concluído |
| 6 | Atualizar `STATUS-EMENTAS.md` da matéria e `STATUS-EMENTAS-CURSOS.md` (scripts) | ✅ Concluído |
| 7 | Commit local + graphify | ✅ Concluído |

---

### Passo 1: EMENTA-CHALKIE-AI.md

**Arquivo:** criar `.../FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/EMENTA-CHALKIE-AI.md`

- Mesmas seções da matéria modelo (`RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`):
  contexto, capacidades e indicadores, conteúdos, estratégias, avaliação (rubrica de 4 níveis),
  cronograma, integração com UCs, exemplos, BNCC (IC1), prompts, implementação, métricas/checklist,
  FAQ, glossário, recursos/inclusão/recuperação, orientações por módulo, situações-problema.
- **Nome e CH:** Fundamentos de Automação/Instrumentação, **60h**.
- **Capacidades C1–C4 literais** da ementa do curso (sem inventar novas; indicadores de desempenho
  detalham cada uma).
- **8 módulos** na ordem do original: Lógica Digital; CLP (características e arquitetura); CLP
  (linguagem e estruturas de programação); Supervisórios e IHM; Simbologia, malhas e sinais;
  Pressão; Nível e vazão; Temperatura.
- **Cronograma:** 15 aulas de 4h = 60h (última com avaliação integradora).
- Público 18–24 anos; segurança em laboratório; recursos só os da UC.

**Verificação:** `(Get-Content EMENTA-CHALKIE-AI.md -Raw).Length` entre 14.800 e 14.950.

### Passo 2: DOCUMENTACAO/

- `PLANO-AULAS.md` — 15 aulas: data a definir, tema, conhecimentos (números da ementa), capacidade,
  estratégia e recursos.
- `INDEX.md` — mapa da pasta e links.
- `VERIFICACAO_COBERTURA_EMENTA.md` — tabela conhecimento × aula (todos os itens 1.1 a 4.16 cobertos).

**Verificação:** todo conhecimento da UC aparece em pelo menos uma aula.

### Passo 3: ATIVIDADES/atividades.json

Campos como no modelo: `uc`, `uc_curta`, `curso`, `docente`, `capacidades` (C1–C4 literais),
mais `disciplina` e `curso` exigidos pelo gerador de atividades.

**Verificação:** `python -c "import json; json.load(open(...))"`.

### Passo 4: AULAS/ e AVALIACOES/

Pastas com `LEIA-ME.md` explicando o padrão (aulas `AULA-NN.md`, atividades com folha de respostas,
avaliações `AVALIACAO-*`).

### Passo 5: Índices

`C:\Python314\python.exe assets\gerador-indices\gerar_indices.py` (gera os 3 níveis; preserva
índices feitos à mão). A matéria aparece como "Nenhuma atividade" até existir a primeira.

### Passo 6: Status

`criar-status-ementas.py` e `criar-status-cursos.py`; conferir que o curso continua em VERIFICAR.

### Passo 7: Commit

`git add` só dos arquivos da tarefa; conferir `git diff --cached --name-only`; commit local
(sem push); `graphify update .`.

---

## Resultado final

- ✅ EMENTA-CHALKIE-AI.md com 14.834 caracteres, 60h, C1–C4 literais, 8 módulos / 15 aulas.
- ✅ DOCUMENTACAO/ (PLANO-AULAS, INDEX, VERIFICACAO_COBERTURA_EMENTA: 28/28 conhecimentos cobertos).
- ✅ ATIVIDADES/atividades.json e index.html; índices do curso e da raiz.
- ✅ AULAS/ e AVALIACOES/ com LEIA-ME.md.
- ✅ STATUS-EMENTAS.md da matéria (manual: o script só cobre o Rio do Sul) e STATUS-EMENTAS-CURSOS.md.
- Observação: o gerador de índices também incluía o curso CURSO_ATIVIDADES_PADLET (IGNORAR); ficou fora do índice da raiz.
- Pendente (próximas tarefas): aulas, atividades de 50 questões, avaliação integradora e dashboard.
