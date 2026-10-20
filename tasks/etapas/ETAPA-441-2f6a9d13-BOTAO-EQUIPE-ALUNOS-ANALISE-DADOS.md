## Etapa 441-2f6a9d13 — #312: Botão de equipe para os alunos no índice de Análise de Dados

**Tarefa:** #312 · **Pedido em:** 2026-10-20 16:20 · **Criada por:** Claude Code (Opus 5.5) (local · main · s31)
**Pedido:** "o botao de equipe para os alunos deve ficar no indice da materia em:
https://aulasenai.vercel.app/MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/index.html,
crie 1 tarefa pra isso nessa materia, e mais outra tarefa pra fazer isso em todas as demais
atividades, a primeira tarefa [...] execute agora, a outra deixe no quadro pra outra IA fazer".
**Objetivo:** todo aluno logado (não só o aluno líder da turma) tem, no índice de atividades da
matéria, um botão "👥 Minha equipe" que abre o modal de equipes na visão do aluno (a equipe dele,
as atividades ligadas e, para o líder 👑, o "✅ Confirmar Respostas" da #310).

### Situação

- Hoje o botão 👥 EQUIPES do topo (`js/header-usuario.js`, `incluirBotaoEquipesHeader`) aparece só
  para o professor e para o aluno líder da turma (`usuario.lider = 1`).
- O modal (`assets/js/menu-acao-equipes.js` → `equipes-modal.js`) já tem a visão do aluno
  (`iniciarModoAluno`).

### #312.1 — Botão "👥 Minha equipe" no índice de atividades de Análise de Dados

**Próximo passo:** executor-medio cria o script reutilizável e inclui a tag no índice da matéria.

- **Nível:** MEDIO — JS + HTML, até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** script reutilizável `assets/js/botao-equipes-materia.js` (sem lógica no HTML): se
  o usuário logado não é professor nem aluno líder da turma (esses já têm o botão do topo), põe no
  índice um botão "👥 Minha equipe" que abre o modal de equipes da matéria pela ação existente; uma
  tag `<script>` no `ATIVIDADES/index.html` desta matéria; CSS por classe.
- **Critérios de aceitação:** `node --check`; aluno comum vê o botão; professor/aluno líder não
  ganham botão duplicado; a #313 só precisa repetir a tag nas demais páginas.
- **Entrega:** — · **Verificação:** —
