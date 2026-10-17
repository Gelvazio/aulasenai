## Etapa 353-cac80fd1 — Introdução à Tecnologia da Informação e Comunicação: aulas e atividades

**Tarefa:** #226-cac80fd1-0dd4-4e3e-98e6-e656b7ba5820 · **Pedido em:** 2026-10-16 21:26 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-a6bf2a33-1m21a1) (tarefa #225)
**Pedido:** "Faça 1 task pra cada matéria e 1 subtask pra cada aula da matéria e 1 subtask pra cada atividade objetiva e 1 pra cada atividade pratica, tipo discursiva, veja como esta na matéria ITIC padrao" (plano aprovado em 2026-10-16, com a subtarefa 0)
**Objetivo:** escrever as 10 aulas de Introdução à Tecnologia da Informação e Comunicação (40 h) com a objetiva de 50 questões e a prática discursiva de cada uma, tudo cadastrado no banco, no padrão da ITIC.

### Escopo

- **Pasta:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/INTRODUCAO-A-TECNOLOGIA-DA-INFORMACAO-E-COMUNICACAO/` · **Aulas:** 10 (1 aula = 4 h, arredondando para cima).
- **Regras:** `docs/regras/materias.md`, `docs/regras/atividades.md`, `.claude/rules/atividades-banco.md`, `seeds.md`, `security-banco.md` (gabarito nunca no site).
- **Em toda atividade:** "📄 Exportar Meu Gabarito" para o aluno; nas práticas, "Progresso da turma" (layout global); tudo no banco (seed PENDENTE → Claude Code local aplica e confere).
- **Ordem:** subtarefa 0 → Aula 01 → (Objetiva 01, Prática 01) → Aula 02 … → aceite.
- Plano geral e decisões: etapa `ETAPA-352-88c1272e-TAREFAS-POR-MATERIA-TECNICO-INFORMATICA.md` (#225).

### #226.0 — Ementa, `materia.json` e plano das aulas

**Próximo passo:** — (concluída).

- **Nível:** MEDIO — ementa e JSON de dados, sem banco.
- **Descrição:** Completar a `EMENTA-CHALKIE-AI.md` (14.800–14.950 caracteres, conferida com a UC da `EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md`) e criar o `materia.json` com o plano das aulas (1 aula = 4 h: tema, domínios, capacidades, conteúdos, indicadores, situação-problema, atividade); `DOCUMENTACAO/PLANO-AULAS.md` e os 5 status (`materias-global.md`).
- **Entrega:** `EMENTA-CHALKIE-AI.md` v2.0 (14.887 caracteres; C1–C5, S1–S4 e conhecimentos 1–9 literais da UC; a linha "2 - Desenvolver sistemas…" ficou como função do módulo), `materia.json` (10 aulas × 4 h, 13 indicadores, avaliação 30/20/20/30, SA 1 e SA 2), `DOCUMENTACAO/PLANO-AULAS.md`, temas no `STATUS-AULAS.md` e `STATUS-ATIVIDADES.md`, `STATUS-EMENTAS.md`, `STATUS-EMENTAS-CURSOS.md` e `STATUS_MATERIA.md` regerados.
- **Verificação:** tamanho medido com `len()` = 14.887; `materia.json` lido por `assets/gerador-materia/materia.py`; todos os conteúdos oficiais 1 a 9 aparecem em alguma aula (0 faltando); soma das horas = 40. Concluída em 2026-10-16 21:37.
- **Aviso:** a matéria está em `IGNORAR` no `STATUS-EMENTAS-CURSOS.md` (permissão por matéria); trabalho feito por pedido direto do usuário (#225/#226). A marcação não foi trocada (só o usuário troca).
