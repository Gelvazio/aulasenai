## Etapa 377-2680fc00 — #250: Botão "Gerenciar Aulas" (CRUD de aulas em modal)

**Tarefa:** #250-2680fc00-427c-43ed-a301-a4ce4c83b4e0 · **Pedido em:** 2026-10-17 10:05 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o)
**Pedido:** "coloque um botao ali de nome Gerenciar Aulas, que deve abrir um modal, que seja um CRUD
de aulas, listando as aulas e com opção de editar, excluir, inserir, ao clicar nas acoes deve abrir
novo modal com a opção completa do CRUD" (imagem: barra com "Turma:" e "Turma favorita"; o botão
vai no espaço vazio à esquerda)
**Objetivo:** o professor gerencia as aulas da matéria (listar, inserir, editar, excluir) sem sair
do índice das atividades.

> ⚠️ **Tarefa grande** (banco e permissões do professor, várias partes): plano na #250.1 e
> **"sim"** do usuário antes da #250.2.

### Riscos

| Risco | Plano B |
|---|---|
| A #249.1 (frente local · main · s18) mexe no card da aula do mesmo índice | Arquivos próprios para o CRUD; pull antes de cada commit |
| RLS da tabela `aulas` pode não deixar o professor inserir/excluir | Subtarefa de banco separada, só para o Claude Code local |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|

### #250.1 — Levantamento e plano (tarefa grande)

**Próximo passo:** achar a página da imagem, o editar aula e o excluir aula que já existem, as
colunas e a RLS da `aulas`; escrever o plano nesta etapa e pedir o "sim".

- **Nível:** PESADO — permissões do professor (RLS/JWT) e várias partes ligadas.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)

### #250.2 — Botão e modais do CRUD de aulas

**Próximo passo:** esperar a #250.1 aprovada.

- **Nível:** PESADO — tela ligada a permissões do professor, mais de 3 arquivos.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
