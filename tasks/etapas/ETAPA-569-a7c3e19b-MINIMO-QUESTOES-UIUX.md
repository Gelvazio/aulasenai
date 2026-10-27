## Etapa 569-a7c3e19b — #422: mínimo de questões em Fundamentos de UI/UX (aulas 3 em diante)

**Tarefa:** #422-a7c3e19b · **Pedido em:** 2026-10-27 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "crie um script que deixe a quantidade de questão mínima objetiva = 20 e prática = 10, em todas as atividades da matéria FUNDAMENTOS-DE-UI-UX, com numeroaula >= 3"
**Objetivo:** gravar no banco o padrão de questões mínimas (objetiva 20, prática 10) em todas as atividades das aulas 3 em diante da matéria FUNDAMENTOS-DE-UI-UX, sem fixar número no código nem no HTML.

### Escopo
- **Entra:** script de mudança em massa no banco, feito pelo Claude Code local com acesso ao Supabase; grava o padrão da atividade (campo que vale quando o aluno não tem mínimo próprio); confere a contagem.
- **Não entra:** `minimo_questoes_aluno` (mínimo por aluno já ajustado pelo professor não é sobrescrito); alteração de HTML, JS ou CSS; aulas 1 e 2; outras matérias.

### Critério de pronto
- Toda atividade objetiva das aulas com `numeroaula >= 3` da matéria FUNDAMENTOS-DE-UI-UX tem o padrão = 20.
- Toda atividade prática dessas mesmas aulas tem o padrão = 10.
- Consulta de conferência não mostra nenhuma linha fora do esperado.
- Nenhum número mágico no código: o script só lê e grava no banco.

### Premissas
- O campo do padrão da atividade é o mesmo que a regra global chama de "padrão da atividade" (`minimo_questoes_para_entregar`); confirmar o nome exato da coluna no schema antes de gravar (`docs/database.md`).
- O script roda uma vez, com a lista de atividades impressa antes de gravar.

### Riscos
- Gravar em atividade de aula 1 ou 2 por engano → plano B: filtro por `numeroaula >= 3` na consulta e conferência antes do commit.
- Atividade objetiva com menos de 20 questões no banco → o mínimo não pode passar do total: plano B é avisar o usuário e não gravar essa linha.
- Atividade sem tipo claro (objetiva ou prática) → não grava; lista para o usuário decidir.

### Decisões
- 2026-10-27: o usuário escolheu gravar no **padrão da atividade** (não no mínimo por aluno).
- Tarefa grande (banco, mudança em massa): aguarda o "sim" do usuário antes de executar.

### #422.1 — Gravar o padrão de questões mínimas (objetiva 20, prática 10)

**Próximo passo:** confirmar o nome da coluna do padrão em `docs/database.md`; listar as atividades da matéria com `numeroaula >= 3`; imprimir a lista; após o "sim" do usuário, gravar e conferir.

- **Nível:** a classificar pelo Jev (não escrito pela IA; C52).
- **Modelo:** a definir pelo Jev (só modelo elegível para PESADO, pela matriz).
- **Descrição:** script único (fora do Git ou em `scripts/`) que lê as atividades da matéria, filtra `numeroaula >= 3`, grava o padrão por tipo e imprime o antes e o depois.
- **Critérios de aceitação:** ver "Critério de pronto".
- **Entrega:** —
- **Verificação:** consulta de contagem por tipo antes e depois; lista de ids gravados conferida contra a lista impressa.

### #422.2 — Conferência e registro

**Próximo passo:** depois do #422.1, rodar consulta de conferência e registrar o resultado aqui.

- **Nível:** a classificar pelo Jev.
- **Modelo:** a definir pelo Jev.
- **Descrição:** conferir que nenhuma atividade de aula 1 ou 2 mudou e que as de aula 3 em diante têm 20 (objetiva) e 10 (prática).
- **Critérios de aceitação:** resultado da consulta colado nesta etapa.
- **Entrega:** —
- **Verificação:** —
