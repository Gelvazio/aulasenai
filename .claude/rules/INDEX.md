# 📖 Índice de regras — `.claude/rules/`

Cada arquivo trata de **um assunto** e tem no máximo 5 KB. Abra só o que a tarefa pedir.
Regras detalhadas, com exemplos: `docs/regras/`. Histórico de mudanças: `docs/HISTORICO-REGRAS.md`.

## 🔴 Sempre (início de sessão)

| Arquivo | Assunto |
|---------|---------|
| `essentials.md` | Checklist de início: sincronizar, o que ler, regras que valem sempre |
| `status-flow.md` | Ciclo da TASK em `tasks/` (frentes, reserva, encerramento, frase final) |
| `toda-tarefa-e-task.md` | Toda tarefa vira TASK; pedir detalhes ao solicitante |
| `git-quick.md` | Commit + push por tarefa na `main`; o que é proibido |

## 🟠 Planejar e coordenar

| Arquivo | Assunto |
|---------|---------|
| `plano-docs.md` | Tarefa pequena × grande; plano em `docs/` e aprovação |
| `status-modelo.md` | Modelo do `STATUS.md` e regras de gestão |
| `docs-antes-de-editar.md` | Ler `docs/ORIENTACAO_*` antes de mexer em um arquivo |
| `multiplas-ias.md` | Várias IAs/frentes: fonte única, só `main`, reserva, prioridade, banco só local |

## 🟡 Código e validação

| Arquivo | Assunto |
|---------|---------|
| `codigo-solid.md` | SOLID e aplicação em JS, Python, HTML e CSS |
| `codigo-limites-nomes.md` | Limites (arquivo, função, linha), nomes em português, legibilidade |
| `testes-validacao.md` | Nunca abrir navegador; nunca escrever testes (exceto bug) |

## 🟢 Banco e segurança

| Arquivo | Assunto |
|---------|---------|
| `security-banco.md` | RLS + JWT, gabarito só no banco, SQL idempotente |
| `seeds.md` | Ciclo dos seeds e `database/SEEDS-APLICADOS.md` |

## 🔵 Conteúdo das matérias

| Arquivo | Assunto |
|---------|---------|
| `materias-global.md` | Estrutura de pasta, 1 aula = 4 h, status, critério de pronto |
| `apostilas.md` | `materia.json`, fluxo da apostila, identificação, PDF |
| `atividades-banco.md` | Questões só no banco, layout global, "você como aluno consultor" |
| `faixa-materias-ensalado.md` | Botões SOMENTE ENSALADO / VER TODAS e ON/OFF |

## ⚪ Ferramentas

| Arquivo | Assunto |
|---------|---------|
| `graphify.md` | Graphify só quando o usuário pedir |

## Onde mais procurar

- Schema do banco: `docs/database.md`
- Fila `tasks` e agendador: `docs/regras/tarefas-agendadas.md`
- Usuários, turmas e professor: `docs/regras/usuarios-turmas-paginas-professor.md`

## Como criar ou mudar uma regra

1. Ache o arquivo do assunto acima; se nenhum servir, crie um novo (≤ 5 KB) e liste aqui.
2. Não repita a regra em outro arquivo — aponte para ele.
3. Registre a mudança em `docs/HISTORICO-REGRAS.md`.

---

Última atualização: 2026-10-13 (reestruturação, tarefa #27)
