# 📖 Índice de Regras — .claude/rules/

**Carga rápida em contexto mínimo.** Cada arquivo é uma regra específica — abra conforme necessário.

## 🔴 Crítico — Sempre

- `essentials.md` — Checklist de início de sessão (30 segundos)
- `git-quick.md` — Commit, push, PR (resumido)
- `status-flow.md` — Ler STATUS.md, workflow de tarefas
- `toda-tarefa-e-task.md` — Toda tarefa vira TASK; a IA pede detalhes ao solicitante

## 🟠 Muito Comum

- `security-banco.md` — RLS, JWT, gabarito, o que não publica
- `seeds.md` — SEEDS-APLICADOS.md, conferência, aplicação
- `materias-global.md` — Regra global de matérias (substitui ITIC)
- `atividades-banco.md` — Questões só no banco, layout global

## 🟡 Por Funcionalidade

- `professor-admin.md` — Somente gelvazio.camargo@senai.local
- `colaboracao-sessoes.md` — Conversa entre licenças, RECADOS.md
- `codigo-solid.md` — SOLID, 1000 linhas, 45 por função, nomes PT
- `tarefas-agendadas.md` — Fila `tasks`, agendador

## 🌐 Regras Globais do Usuário (cópia de referência)

- `LEIA-ME-GLOBAIS.md` — O que são estas cópias (não são carregadas pelo Claude)
- `CLAUDE-GLOBAL.md` — Cópia de `~/.claude/CLAUDE.md`
- `CLAUDE-DOCS-BEFORE-EVERY-TASK.md` — Cópia de `~/.claude/CLAUDE-DOCS-BEFORE-EVERY-TASK.md`

## 🧩 Protocolo de Agentes (dividido do AGENTS.md)

- `agents-avisos-gerais.md` — Avisos gerais: fonte única, branch main, fetch antes do pull, tarefa concluída, scripts temporários
- `agents-protocolo-captura-tarefa.md` — Protocolo de captura de tarefa (lock em 3 partes)
- `agents-concorrencia.md` — Regras complementares de concorrência (seção 1.1)
- `agents-prioridade.md` — Prioridade das tarefas (seção 1.2)
- `agents-hooks-sincronizacao.md` — Hooks de sincronização (seção 1.3)
- `agents-subtarefas-dependencias.md` — Subdivisão em subtarefas e dependências (seção 2)
- `agents-identificacao-ia.md` — Identificação obrigatória da IA executora (seção 3)
- `agents-reporte-progresso.md` — Reporte de progresso ao monitor (seção 4, opcional)
- `agents-confirmacao-status.md` — Confirmação de status das tarefas (seção 5)
- `agents-plano-docs.md` — Plano em docs/ para tarefas grandes (seção 6)
- `agents-cerebro-memoria-mcp.md` — Plano do Cérebro de Memória Persistente (MCP + Supabase)

## 🔗 Referência

- `docs-index.md` — Onde está cada coisa em `docs/`
- `tabelas-banco.md` — Schema das principais tabelas

---

## Como Usar

**Ao iniciar sessão:** leia `essentials.md`

**Ao trabalhar:** procure a regra pelo tema e abra

Exemplo:
```
Vou gerar uma atividade prática → abre atividades-banco.md
Tenho dúvida sobre gabarito → abre security-banco.md
Preciso fazer PR → abre git-quick.md
```

---

Última atualização: 2026-10-13
