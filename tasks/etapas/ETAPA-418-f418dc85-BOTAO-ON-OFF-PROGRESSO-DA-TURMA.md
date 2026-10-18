## Etapa 418-f418dc85 — #289: Botão ON/OFF ao lado de "Progresso da turma"

**Tarefa:** #289-f418dc85-5962-40ba-86eb-aae0f4c83ec2 · **Pedido em:** 2026-10-18 20:24 · **Criada por:** Claude Code (Opus 5.5) (local · main · s23, sessão lateral aberta pela s22)
**Pedido:** "ao lado de *Progresso da turma*, adicione um botão do tipo on/off, por padrão desligado e que salva status no localstorage, se ele estiver desligado, deve esconder o quadro abaixo de Progresso da Turma, padrão deixe desligado em todas as turmas e todas as atividades"
**Objetivo:** em toda página de atividade, o painel "Progresso da turma" ganha um botão ON/OFF ao
lado do título; desligado (padrão) esconde o quadro logo abaixo do título, ligado mostra; o estado
fica salvo no `localStorage`.

### Decisões

| Quando | Quem | O quê | Por quê |
|---|---|---|---|
| 2026-10-18 20:24 | Claude Code (Opus 5.5, líder s23) | Tarefa pequena (tela, JS/CSS, sem banco) com 1 subtarefa `MEDIO` | Sem banco, segurança ou mudança em massa; se o painel não for de um módulo único, reclassificar antes de delegar |

### #289.1 — Botão ON/OFF do "Progresso da turma" com estado no localStorage

**Próximo passo:** localizar onde o título "Progresso da turma" é montado (`assets/js/` e páginas
de `MATERIAIS/**/ATIVIDADES/`), decidir a chave do `localStorage` e delegar ao executor-medio.

- **Nível:** MEDIO — tela (JS/CSS) em 1 a 3 arquivos; sem banco, sem RLS, sem mudança de dados.
- **Modelo:** só Sonnet — nunca outro (#247); executor-medio, líder Opus 5.5 (s23)
- **Effort:** medium
- **Descrição:** ao lado do título "Progresso da turma", botão ON/OFF no mesmo estilo dos ON/OFF do
  projeto; padrão **OFF** em todas as turmas e atividades; OFF esconde o quadro abaixo do título,
  ON mostra; estado salvo no `localStorage` (chave em constante, leitura e gravação com
  `try/catch`); vale para todos os perfis que já veem o painel.
- **Critérios de aceitação:** botão presente em todas as páginas de atividade (objetiva e
  prática/discursiva); sem estado salvo = OFF e quadro escondido; trocar o botão mostra/esconde e
  grava; recarregar mantém o estado; `node --check` OK; nada de banco.
- **Entrega:** — · **Verificação:** —
