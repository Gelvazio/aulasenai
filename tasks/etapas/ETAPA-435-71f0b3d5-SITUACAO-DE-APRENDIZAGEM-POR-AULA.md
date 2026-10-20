## Etapa 435-71f0b3d5 — #306: Atividade "Situação de Aprendizagem" em cada aula

**Tarefa:** #306 · **Pedido em:** 2026-10-20 13:31 · **Criada por:** Claude Code (Opus 5.5) (local · main · s30)
**Pedido:** "CRIE 1 TAREFA, QUE PARA CADA AULA, ADICIONA 1 ATIVIDADE DO TIPO SITUACAO DE APRENDIZAGEM,
O MODELO DA SITUACAO DE APRENDIZAGEM É ESTE DAQUI: C:\fontes\aulasenai\GERADOR-AULAS\GAMIFICACAO-AULAS"
**Objetivo:** cada aula do banco, de todas as matérias, ganha 1 atividade do tipo **Situação de
Aprendizagem (SA)** no modelo SENAI/MSEP da pasta `GERADOR-AULAS/GAMIFICACAO-AULAS/`, com entrega e nota, ligada à aula pelo
`aula_id`.

### Modelo (o que tem na pasta)

- `Modelo Plano de Ensino_ SA_PlanoAulaAbaixo160Horas.docx` e `..._Acima160Horas.docx` e as versões
  `.md` (`..._Menor_160_Horas.md` e `..._Acima160_Horas.md`, hoje **iguais** byte a byte).
- Blocos da SA: capacidades básicas, técnicas e socioemocionais; estratégia desafiadora
  (situação-problema, estudo de caso, projeto ou pesquisa aplicada); **contextualização**,
  **desafio** e **resultado esperado**; plano de aula (capacidades, conhecimentos, estratégias,
  recursos, critérios e instrumentos de avaliação).

### Escopo (aprovado)

- **Entra:**
  - Versionar no Git os arquivos do modelo da pasta `GERADOR-AULAS/GAMIFICACAO-AULAS/` (`.docx` e `.md`).
  - Página da SA por aula em `MATERIAIS/<CURSO>/<MATERIA>/SITUACAO-APRENDIZAGEM/AULA-NN/`, gerada a
    partir do `materia.json`/ementa da própria matéria, no modelo conforme a carga da UC (até 160 h =
    "Abaixo160Horas"; acima = "Acima160Horas"), com o papel **"Você como aluno consultor"** (sem
    empresa fictícia).
  - **Entrega com nota:** o aluno responde ao desafio (atividade prática/discursiva) e o professor
    corrige; nota no banco pelo fluxo atual.
  - Banco: 1 linha em `atividade` por aula de todas as matérias, marcada como SA, com a `pagina` da
    SA (seed idempotente registrado em `SEEDS-APLICADOS.md`).
  - Card da aula mostra o link da SA (cards só do banco, regra 15 do `AGENTS.md`).
  - Regra e documentação; a parte "situação de aprendizagem em toda aula" da #300 passa para cá.
- **Não entra:** mudar as atividades existentes; o plano de ensino completo da UC em `.docx`.
- **Pronto quando:** consulta mostra 1 SA por aula de todas as matérias; cada SA tem
  contextualização, desafio, resultado esperado e critérios; o aluno entrega e o professor corrige;
  o link aparece no card da aula (o professor confere na tela).

### Riscos

| Risco | Plano B |
|---|---|
| Mudança em massa (todas as aulas de todas as matérias) e conteúdo gerado por IA | Executar uma matéria por vez, começando por Noções de Eletricidade, com conferência antes da próxima |
| Conteúdo fora da UC | Só ementa e `materia.json` da própria matéria (`materias-global.md`) |
| Matéria sem `materia.json` | Fica fora da rodada e vai para Pendências, com o motivo |
| A tabela `atividade` não tem campo de tipo | Decidir na #306.1 (coluna `tipo` × marcação pelo caminho); coluna nova é mudança de schema |

### Perguntas abertas

- ✅ 1. Escopo → **todas as matérias** (professor, 2026-10-20 13:31).
- ✅ 2. Relação com a #300 → **a #306 substitui** a parte "situação de aprendizagem em toda aula".
- ✅ 3. Uso pelo aluno → **entrega com nota** (prática/discursiva, correção do professor).
- ✅ 4. Pasta → **`SITUACAO-APRENDIZAGEM/AULA-NN`** dentro da matéria.
- ✅ 5. Modelo → **conforme a carga da UC**; **versionar** os arquivos do modelo no Git.
- ✅ 6. Aprovação do plano → **"Sim, aprovo"** (professor, 2026-10-20 13:31).

### Decisões

| Quando | O quê | Quem |
|---|---|---|
| 2026-10-20 13:31 | Respostas 1 a 6 acima (escolhas na tela) e plano aprovado | Professor |
| 2026-10-20 13:31 | A parte "situação de aprendizagem em toda aula" da #300 sai de lá e fica só na #306 | Professor |

### #306.1 — Definir como o banco marca a atividade de SA

**Próximo passo:** ver como `atividade` e as telas distinguem tipos hoje (alinhar com a #305.1).

- **Nível:** PESADO — banco (possível coluna nova em `atividade`).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** decidir com o usuário (se mudar schema) e registrar em Decisões.
- **Entrega:** — · **Verificação:** —

### #306.2 — Gerador das páginas de SA por aula

**Próximo passo:** depois da #306.1.

- **Nível:** PESADO — gerador novo, conteúdo em massa.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** versionar o modelo; gerador em `assets/` que lê o `materia.json` e monta a SA de
  cada aula no modelo da carga da UC, padrão SENAI, sem `<style>`/JS inline e sem gabarito na página.
- **Entrega:** — · **Verificação:** —

### #306.3 — Seed: 1 atividade de SA por aula

**Próximo passo:** depois da #306.2.

- **Nível:** PESADO — banco (seed em massa).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** seed idempotente em `database/`; aplicar, conferir e registrar em `SEEDS-APLICADOS.md`.
- **Entrega:** — · **Verificação:** —

### #306.4 — Link da SA nos cards das aulas

**Próximo passo:** depois da #306.3.

- **Nível:** MEDIO — código de tela em até 3 arquivos.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** os cards de aula mostram o botão "🧩 Situação de Aprendizagem".
- **Entrega:** — · **Verificação:** —

### #306.5 — Regras e documentação

**Próximo passo:** depois da #306.4.

- **Nível:** LEVE — só `.md`.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** estrutura em `materias-global.md`, tipo em `docs/regras/atividades.md`, histórico em
  `docs/HISTORICO-REGRAS.md`.
- **Entrega:** — · **Verificação:** —
