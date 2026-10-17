## Etapa 386-009facc1 — Remover o `rotulo_card` de tudo (o card usa só `aulas.numero`)

**Tarefa:** #259-009facc1-b742-4bba-ab6a-7c58c2b54d6f · **Pedido em:** 2026-10-17 12:34 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "remova o campo rotulo do card de tudo e troque pelo numero da aula e, aula.numero,
sempre" · "faça a remoção do rotulo_card de tudo" · "faça a remoção do rotulo_card obedecendo os
modelos"
**Objetivo:** a coluna `aulas.rotulo_card` deixa de existir (telas, banco e documentação); onde
ela era usada, vale "AULA NN" de `aulas.numero`.

### Escopo

- **Entra:** tirar `rotulo_card` das consultas e do campo do "✏️ Editar aula"/"📚 Gerenciar
  Aulas"; o rótulo em títulos e mensagens passa a ser "AULA NN"; achar a aula de um card pelo
  texto do HTML passa a comparar "AULA NN" e, se não bater, o nome (`nome_card`/`titulo` × `h2`
  do card); guardar os 77 valores atuais num SQL de cópia em `database/` e então
  `alter table aulas drop column rotulo_card`; atualizar a documentação.
- **Não entra:** mudar o HTML dos cards nas pastas `MATERIAIS` (o rótulo do HTML é trocado na
  hora pelo "AULA NN"); apagar `nome_card`; os SQL antigos de `database/` (são histórico).

### Riscos

- **Sem volta no banco:** os 77 rótulos somem. Plano B: o SQL de cópia (`update ... set
  rotulo_card = ...`) permite recriar a coluna e os valores.
- **Card sem aula achada:** cards antigos têm no HTML rótulos como "ATIVIDADES"; se a atividade
  do card não vier (aluno com atividade bloqueada), a aula é achada pelo nome. Se nem o nome bater,
  o card fica como no HTML (igual a um card sem aula hoje). Verificação: consulta comparando nomes.
- **Ordem:** a coluna só sai do banco depois que as telas (.2 e .3) estiverem publicadas; antes
  disso, as telas que pedem `rotulo_card` falhariam.

### Decisões

- **Plano aprovado** pelo usuário em 2026-10-17 12:38 ("SIM").

### #259.1 — Plano e aprovação

**Próximo passo:** — (aprovado em 2026-10-17 12:38).

- **Nível:** PESADO — apagar coluna do banco.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro

### #259.2 — Tirar o `rotulo_card` das consultas e do modal

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — JS de tela, 3 arquivos, sem banco.
- **Modelo:** só Sonnet — nunca outro
- **Arquivos:** `assets/js/indice-aula-repositorio.js`, `indice-gerenciar-aulas-repositorio.js`,
  `indice-aula-modal.js` (campo "Rótulo do card" sai de `CAMPOS_MODAL_AULA`).
- **Entrega (2026-10-17 12:39, Sonnet · executor-medio; líder Opus 5.5, s14):** `rotulo_card` saiu de
  `CAMPOS_AULA_CARD`, `CAMPOS_AULA_GERENCIAR` e `CAMPOS_MODAL_AULA` (o "📚 Gerenciar Aulas" usa os
  mesmos campos do modal).
- **Verificação (líder):** diff só nos 3 arquivos (3 linhas); `node --check` passou; `grep
  rotulo_card` em `assets/js` só acha `indice-aula-data.js` (é a #259.3).

### #259.3 — Rótulo e busca da aula só por `numero` (e nome)

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — JS de tela, 2 arquivos, sem banco.
- **Modelo:** só Sonnet — nunca outro
- **Arquivos:** `assets/js/indice-aula-data.js` (`obterRotuloDaAula` = "AULA NN"; sai a
  `obterRotuloNumeroDaAula` repetida; `encontrarAulaPeloRotulo` cai para o nome) e
  `indice-aula-atividades-vinculadas.js` (dono do card pelo rótulo e, sem ele, pelo nome).
- **Correção do líder antes da entrega (consulta ao banco):** em 33 aulas o "AULA NN" do HTML
  do card não é o do `numero` (ex.: o card "AULA 03" da matéria 27 é a aula 38, de `numero` 2):
  comparar pelo rótulo ligaria o card à aula errada. Por isso a ordem virou **nome primeiro**
  (sem diferenciar maiúsculas: a aula 69 está em maiúsculas no banco) e só depois o rótulo; os
  nomes não se repetem dentro da matéria (consulta).
- **Entrega (2026-10-17 12:41, Sonnet · executor-medio; líder Opus 5.5, s14):** `indice-aula-data.js`:
  `obterRotuloDaAula` = "AULA NN" (saiu a `obterRotuloNumeroDaAula`), nova
  `normalizarNomeCardAula`, `encontrarAulaPeloNome` e `encontrarAulaPeloTextoDoCard` (nome →
  rótulo); `indice-aula-atividades-vinculadas.js`: dono do card pelo nome, depois rótulo, depois
  o primeiro.
- **Verificação (líder):** `node --check` nos 2; `rotulo_card` zero em `assets/js`; das 41 aulas
  cujo rótulo antigo não era o "AULA NN" do `numero`, 36 têm card no HTML com o mesmo nome; das 5
  restantes, 4 não têm card no HTML (só do banco) e a 82 tem `h2` "ATIVIDADE SEXTA FEIRA" (no
  banco, "ATIVIDADE SEXTA FEIRA 09/10/2026-CEPLAS TARDE"): só no caso do aluno sem a atividade
  lida esse card não acha a aula e fica como no HTML.

### #259.4 — Cópia dos valores e `drop column` no banco

**Próximo passo:** aplicar `database/2026-10-17-aulas-remover-rotulo-card.sql` (cópia já pronta).

- **Nível:** PESADO — banco, apagar coluna.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro

### #259.5 — Documentação

**Próximo passo:** depois da #259.4.

- **Nível:** LEVE — só `.md`/comentários.
- **Modelo:** só Haiku — nunca outro
- **Arquivos:** `docs/database.md`, `docs/relatorio_verificacao_database.html`,
  `docs/card-dados-100-tabela-aulas.md`, `docs/rotulos-aulas-ajustar.md`,
  `docs/regras/atividades.md`, `docs/regras/usuarios-turmas-paginas-professor.md`,
  `MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ATIVIDADES/STATUS-ATIVIDADES.md`,
  comentário de `scripts/gerar-seed-atividades.py`.
