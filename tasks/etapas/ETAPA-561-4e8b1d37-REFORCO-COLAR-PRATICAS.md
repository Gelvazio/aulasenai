## Etapa 561-4e8b1d37 — #414: Reforçar o bloqueio de copiar/colar nas atividades práticas

**Tarefa:** #414-4e8b1d37 · **Pedido em:** 2026-10-27 15:20 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "faça 1 análise de segurança, vendo se é possível usar CTRL+C e CTRL+V. NAS ATIVIDADES PRÁTICAS, REFORCE A SEGURANÇA PRA EVITAR ISSO"
**Objetivo:** o aluno ser obrigado a digitar as respostas das práticas discursivas, sem colar nem copiar a pergunta.

**Análise (leitura do código, sem navegador):**
- `assets/js/bloqueio-colar-discursiva.js` cancela paste/drop/copy/cut e `beforeinput` de colagem, mas **só liga com `data-bloquear-colar="sim"` no `<body>`** (opt-in).
- Das 57 práticas, **30** têm o atributo; **27 não têm** (inclui a Aula 02 de UI/UX): nelas Ctrl+V funciona.
- 8 práticas (Introdução à TIC e Comunicação Oral/Escrita) nem carregam o script.
- Lacunas mesmo com o bloqueio ligado: atalhos por teclado (Ctrl/Cmd+V/C/X, Shift+Insert) só dependem dos eventos; texto inserido de uma vez por extensão/ditado/autopreenchimento passa; o enunciado da pergunta pode ser copiado (para colar numa IA); menu de contexto liberado.
- Limite que não se resolve no navegador: DevTools, extensões e outro dispositivo.

### Escopo

- **Entra:** `bloqueio-colar-discursiva.js`: ligar por padrão em páginas `ATIVIDADE-PRATICA-*` (atributo `data-bloquear-colar="nao"` desliga); bloquear atalhos de teclado e menu de contexto nos campos; bloquear copiar/recortar/selecionar o enunciado dentro de `.topico-resposta`; detectar inserção em bloco (salto grande de texto num só `input`) e desfazer; atualizar `docs/regras/atividades.md`.
- **Não entra:** banco, provas/avaliações (continuam opt-in), regerar as páginas, as 8 práticas sem o script, professor.

### Critério de pronto

- `node --check` ok; funções ≤ 45 linhas; lendo o código, práticas sem o atributo ficam bloqueadas.
- O teste de colar na tela só o usuário confirma (sem navegador).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo classificados pelo Jev.
- Pequena/média (1 arquivo JS + doc, sem banco): sem aprovação prévia.

---

### #414.1 — Reforçar bloqueio de colar/copiar nas práticas

**Próximo passo:** rodar o Jev, reservar e editar `bloqueio-colar-discursiva.js`.

- **Nível:** MEDIO — classificado (jev (confiança 0.92))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.92)
- **Descrição:** conforme o escopo acima.
- **Critérios de Aceitação:** práticas sem o atributo bloqueiam colar; atalhos, menu e inserção em bloco bloqueados.
- **Entrega:** — · **Verificação:** —
