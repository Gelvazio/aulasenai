## Etapa 524-c900a2d7 — Diagnosticar "Não foi possível carregar as notas" no card "Notas e média"

**Tarefa:** #375-c900a2d7 · **Pedido em:** 2026-10-24 · **Criada por:** Devin (SWE-2) (local · main)
**Pedido:** o card do índice de atividades mostra "Não foi possível carregar as notas. Tente
novamente mais tarde." com rodapé "0 de 0 atividades na média" (screenshot do usuário).
**Objetivo:** descobrir qual chamada falha e corrigir.

### Escopo

- **Entra:** mostrar o detalhe real do erro no aviso do card (padrão já usado em
  `MSG_ERRO_GRAVAR_NOTAS`), nos dois pontos que mostram `MSG_ERRO_NOTAS` (catch de
  `iniciarCardNotas` e catch de `escolherAlunoNotas`).
- **Não entra:** mudar regras de média, RLS ou o fluxo do card além do diagnóstico.

### Fatos já conferidos nesta sessão

- Banco ok: funções `notas_media_final`, `notas_aluno_para_professor`, `eh_professor`,
  `professor_tem_turma`, `media_finalizada_auditar` existem; policies de `turma`, `aluno`,
  `atividade`, `media_atividade_config`, `media_finalizada` intactas.
- JS novo da #374 é todo protegido por try/catch ou DOM puro — não pode lançar a exceção.
- "0 de 0" = `renderizarTabelaNotas` rodou com `estadoNotas.atividades` vazio (só alcançável
  pelo clique no filtro "Apenas atividade de média" ou caminhos com aviso próprio).

### #375.1 — Aviso do card com o detalhe do erro (diagnóstico)

**Próximo passo:** editar os dois catch que mostram `MSG_ERRO_NOTAS` para incluir `erro.message`,
pedir ao usuário o texto novo na tela.

- **Nível:** MEDIO — JS com lógica, 1 arquivo
- **Modelo:** MEDIO · só Sonnet — pedido direto do usuário (Devin)
- **Effort:** low · **JEV-AI-SUGGESTION:** NAO
- **Verificação:** `node --check`; leitura.
