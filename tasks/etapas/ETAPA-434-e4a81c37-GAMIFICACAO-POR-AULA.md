## Etapa 434-e4a81c37 — #305: Atividade de gamificação em cada aula (pasta GAMIFICACAO/AULA-NN)

**Tarefa:** #305 · **Pedido em:** 2026-10-20 13:18 · **Criada por:** Claude Code (Opus 5.5) (local · main · s30)
**Pedido:** "CRIE 1 TAREFA, QUE PARA CADA AULA, ADICIONA 1 ATIVIDADE DO TIPO GAMIFICACAO, QUE DEVE SER
UM LINK PRA PASTA *gamificacao* dentro da materia, e cada aula, deve ser 1 pasta dentro desta, de
nome *AULA-01*, *AULA-02*, *AULA-03*, *AULA-04*, *AULA-05*, ETC"
**Objetivo:** cada aula do banco ganha 1 atividade do tipo **gamificação**, com link para
`MATERIAIS/<CURSO>/<MATERIA>/GAMIFICACAO/AULA-NN/` (uma pasta por aula), para receber jogos como o
"Liga ou Desliga?" (#302).

### Escopo (proposto — confirmar nas perguntas abertas)

- **Entra:**
  - Pasta `GAMIFICACAO/` na matéria com uma subpasta `AULA-NN` por aula cadastrada na tabela `aulas`
    (número com 2 dígitos), cada uma com um `index.html` de entrada (gerado, padrão SENAI, sem
    `<style>`/JS inline).
  - Banco: 1 linha em `atividade` por aula, marcada como gamificação, com `pagina` apontando para
    `GAMIFICACAO/AULA-NN/index.html` (seed idempotente registrado em `SEEDS-APLICADOS.md`).
  - Telas que listam as atividades da aula mostram o card/link de gamificação (cards só do banco,
    regra 15 do `AGENTS.md`).
  - Regra e documentação: `materias-global.md` (estrutura de pasta) e `docs/regras/atividades.md`.
- **Não entra:** criar os jogos de cada aula (cada jogo é tarefa própria, como a #302); mudar
  nota/gabarito das atividades existentes.
- **Pronto quando:** consulta mostra 1 atividade de gamificação por aula do escopo, com a página
  certa; cada matéria do escopo tem `GAMIFICACAO/AULA-NN/index.html` para todas as suas aulas; o
  link aparece no card da aula (o professor confere na tela).

### Riscos

| Risco | Plano B |
|---|---|
| Mudança em massa (todas as matérias e aulas) | Começar por uma matéria piloto (Noções de Eletricidade, que já tem o jogo) e só depois o resto |
| A tabela `atividade` não tem campo de tipo "gamificação" | Decidir na #305.1 (coluna nova `tipo` × marcar pelo caminho `/GAMIFICACAO/`) — coluna nova é mudança de schema |
| Atividade sem gabarito entra na média/nota da turma | Na #305.1, definir se conta nota; se não conta, excluir do cálculo |
| Pasta vazia não vai para o Git | Cada `AULA-NN` nasce com o `index.html` de entrada |

### Perguntas abertas

- ⬜ 1. **Escopo:** todas as matérias de todos os cursos, só as ensaladas, ou só uma matéria (qual)?
- ⬜ 2. **Nome da pasta:** `GAMIFICACAO` em maiúsculas (padrão do projeto: `ATIVIDADES`, `CONTEUDO`)
  ou `gamificacao` em minúsculas, como no pedido?
- ⬜ 3. **Conteúdo de cada `AULA-NN`:** só a página de entrada ("em breve"/lista de jogos) ou já um
  jogo por aula?
- ⬜ 4. **Nota:** a atividade de gamificação conta nota (como o jogo da #302) ou é só um link?
- ⬜ 5. Aprovação do plano (tarefa grande: banco + mudança em massa).

### Decisões

| Quando | O quê | Quem |
|---|---|---|

### #305.1 — Definir como o banco marca a atividade de gamificação

**Próximo passo:** aguardar as perguntas abertas e o "sim" do plano.

- **Nível:** PESADO — banco (possível coluna nova em `atividade`).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** ver como a tabela `atividade` e as telas distinguem tipos hoje; decidir (com o
  usuário, se mudar schema) entre coluna `tipo` e marcação pelo caminho; registrar em Decisões.
- **Entrega:** — · **Verificação:** —

### #305.2 — Gerador das pastas GAMIFICACAO/AULA-NN

**Próximo passo:** depois da #305.1.

- **Nível:** PESADO — gerador novo e mudança em massa em muitas pastas.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** script em `assets/` que lê as aulas do banco (ou do `materia.json`) e cria
  `GAMIFICACAO/AULA-NN/index.html` em cada matéria do escopo, sem sobrescrever página feita à mão.
- **Entrega:** — · **Verificação:** —

### #305.3 — Seed: 1 atividade de gamificação por aula

**Próximo passo:** depois da #305.2.

- **Nível:** PESADO — banco (seed em massa).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** seed idempotente em `database/` com 1 `atividade` por aula do escopo; aplicar,
  conferir e registrar em `SEEDS-APLICADOS.md`.
- **Entrega:** — · **Verificação:** —

### #305.4 — Link de gamificação nos cards das aulas

**Próximo passo:** depois da #305.3.

- **Nível:** MEDIO — código de tela em até 3 arquivos.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** os cards de aula (vindos do banco) mostram o botão "🎮 Gamificação" para a
  atividade de gamificação da aula.
- **Entrega:** — · **Verificação:** —

### #305.5 — Regras e documentação

**Próximo passo:** depois da #305.4.

- **Nível:** LEVE — só `.md`.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** `GAMIFICACAO/AULA-NN` na estrutura de `materias-global.md` e o tipo em
  `docs/regras/atividades.md`; histórico em `docs/HISTORICO-REGRAS.md`.
- **Entrega:** — · **Verificação:** —
