# Card do índice com 100% dos dados da tabela `aulas`

> Atualizado em 2026-10-17 (#259): a coluna `aulas.rotulo_card` foi removida; o rótulo do card é sempre "AULA NN" de `aulas.numero`. O texto abaixo é o histórico.

- **Criado em:** 2026-10-06
- **Pedido do usuário:** "ajuste o card pra buscar 100% dos dados da tabela aulas, sempre" e
  "cada card deve estar ligado apenas a 1 aula".
- **Decisões do usuário (2026-10-06):** (1) copiar uma vez o texto atual do HTML de cada card
  para `aulas.rotulo_card`/`aulas.nome_card`; (2) separar agora todas as aulas compartilhadas;
  (3) no Reforço de Linguagens, juntar objetivas e discursivas da mesma aula num card só.

## Objetivo

O rótulo ("AULA 01"), o nome e a data de cada card do índice de atividades vêm sempre da linha
da tabela `aulas` ligada ao card; cada card tem a sua aula e nenhuma aula é dividida entre cards.

## Escopo

- **Entra:** gerador de índices (agrupar páginas da mesma aula), banco (`aulas`, `atividade.aula_id`),
  `assets/js/indice-aula-data.js`, `CLAUDE.md`, `STATUS.md`.
- **Não entra:** ícone e linha de descrição (meta) do card (não existem na tabela `aulas`);
  índices feitos à mão (só leitura dos textos para copiar ao banco).

## Passos

| # | Ação | Arquivos | Verificação | Status |
|---|------|----------|-------------|--------|
| 1 | Gerador de índices agrupa num card as páginas com o mesmo `AULA-NN` (só quando há 2+) | `assets/gerador-indices/gerar_indices.py`, índice do Reforço | Índice do Reforço com 10 cards | ✅ |
| 2 | Separar as aulas compartilhadas: o 1º card fica com a aula, os demais ganham aula nova (data copiada); atividade 13 vai para a aula do card AULA 03 da ITIC | `database/2026-10-06-separar-aulas-por-card.sql` | Levantamento cards × aulas sem repetição | ✅ |
| 3 | Copiar o rótulo e o nome atuais de cada card para `aulas.rotulo_card`/`nome_card` (só onde está vazio) | mesmo SQL | Consulta: todo card com aula tem rótulo e nome | ✅ |
| 4 | Card lê só da `aulas`: rótulo = `rotulo_card` ou "AULA NN"; nome = `nome_card` ou `titulo`; sem a atividade, a aula é achada pelo rótulo do card | `assets/js/indice-aula-data.js` | `node --check` | ✅ |
| 5 | Regra no `CLAUDE.md`, `STATUS.md`, commit | `CLAUDE.md`, `STATUS.md` | Leitura | ✅ |
| 6 | Modal CRUD da aula com a lista das atividades (✏️ Editar / 🗑️ Excluir / ➕ Nova) — pedido do usuário durante a tarefa | `assets/js/indice-aula-modal.js`, `assets/js/atividades-crud-modal.js`, `assets/css/indice-aula-data.css` | `node --check` | ✅ |
| 7 | Rótulos fora do padrão "AULA NN": listar ao usuário para ele decidir | — | Consulta no banco | ⬜ |

## Riscos

| Risco | Plano B |
|-------|---------|
| Regerar índices sobrescreve mudanças de outra sessão | Conferir `git diff` e só versionar o índice do Reforço |
| Aluno com atividade bloqueada não lê a atividade | A aula é achada pelo rótulo do card (o número da aula no banco pode diferir do "AULA NN") |

- **Concluído em:** 2026-10-06 (passos 1 a 6).
