# 📖 Índice de regras — `.claude/rules/`

Cada arquivo trata de **um assunto** e tem no máximo 5 KB. Abra só o que a tarefa pedir.
Para ler em cards: `index.html` desta pasta (gerado — ver `visualizador-regras.md`).
Regras detalhadas, com exemplos: `docs/regras/`. Histórico de mudanças: `docs/HISTORICO-REGRAS.md`.

## 🔴 Sempre (início de sessão)

| Arquivo | Assunto |
|---------|---------|
| `essentials.md` | Checklist de início: sincronizar, o que ler e em que ordem |
| `git-quick.md` | Tudo na `main`; quando commitar; commit + push; Git × site; proibições |

## 🗂️ Tarefas — pasta tasks/, reutilizável em outros projetos

| Arquivo | Assunto |
|---------|---------|
| `tasks/quadro.md` | Fonte única: onde fica cada informação; modelos do `STATUS.md` e da etapa |
| `tasks/ciclo-da-task.md` | O que vira TASK; abrir, pequena × grande (plano na etapa), executar, encerrar, retomar |
| `tasks/frentes-e-reserva.md` | Várias sessões/IAs: frentes, reserva, prioridade, limites, conflitos |
| `tasks/verificacao.md` | Mensagem `verify`: conflitos do quadro, entregas aplicadas e coluna Verificado |

## 🟠 Coordenar neste projeto

| Arquivo | Assunto |
|---------|---------|
| `multiplas-ias.md` | Nome das frentes; banco só pelo Claude Code local |
| `niveis.md` | Nível de cada subtarefa (LEVE/MEDIO/PESADO), qual IA e modelo pega cada um, equipe de agentes |
| `docs-antes-de-editar.md` | Ler a orientação em `docs/` antes de mexer em um arquivo |

## 🟡 Código e validação

| Arquivo | Assunto |
|---------|---------|
| `codigo-solid.md` | SOLID e aplicação em JS, Python, HTML e CSS |
| `codigo-limites-nomes.md` | Limites (arquivo, função, linha), constantes, nomes em português, legibilidade |
| `testes-validacao.md` | Nunca abrir navegador; nunca escrever testes (exceto bug) |

## 🟢 Banco e segurança

| Arquivo | Assunto |
|---------|---------|
| `security-banco.md` | RLS + JWT, onde o gabarito pode estar, SQL idempotente |
| `seeds.md` | Ciclo dos seeds, exceções e `database/SEEDS-APLICADOS.md` |

## 🔵 Conteúdo das matérias

| Arquivo | Assunto |
|---------|---------|
| `materias-global.md` | Estrutura de pasta, 1 aula = 4 h, fontes do conteúdo, hierarquia, critério de pronto, cards de aula só da tabela `aulas` |
| `apostilas.md` | `materia.json`, fluxo da apostila, identificação, PDF |
| `atividades-banco.md` | Alvo da migração #25, tamanho padrão, "você como aluno consultor" |
| `faixa-materias-ensalado.md` | Botões SOMENTE ENSALADO / VER TODAS e ON/OFF |

## ⚪ Ferramentas

| Arquivo | Assunto |
|---------|---------|
| `graphify.md` | Graphify: ler o relatório antes de criar e de executar tarefa; update no início da conversa e ao fim da tarefa (regra global C25) |
| `claude-code.md` | Comandos, subagentes, skills e hooks do Claude Code (estrutura do infográfico, #170) |
| `visualizador-regras.md` | `index.html` desta pasta: só visualizador; gerar só com pedido explícito, no local |

## Onde mais procurar

- Schema do banco: `docs/database.md`
- Agendador de tarefas: `docs/regras/tarefas-agendadas.md`
- Usuários, turmas e professor: `docs/regras/usuarios-turmas-paginas-professor.md`

## Como criar ou mudar uma regra

1. Ache o arquivo do assunto acima; se nenhum servir, crie um novo (≤ 5 KB) e liste aqui. Regra
   de tarefas que sirva para qualquer projeto vai para `tasks/`, sem nada específico deste projeto.
2. Não repita a regra em outro arquivo — aponte para ele.
3. Registre a mudança em `docs/HISTORICO-REGRAS.md` (único histórico).
4. Não regenere o `index.html` (só com pedido explícito do usuário — `visualizador-regras.md`).

---

Última atualização: 2026-10-17 (cards de aula só do banco, tarefa #272)
