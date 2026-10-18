## Etapa 402-c7e27893 — Versão PWA só do aluno na pasta `pwa/`

**Tarefa:** #275-c7e27893-0d94-47f2-9665-50a69cf4d450 · **Pedido em:** 2026-10-17 23:08 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-a26b3c0e-1ljztf)
**Pedido:** "Crie 1 versão só pra aluno na pasta pwa, seguindo o plano, divida no máximo de tasks possíveis"
**Objetivo:** criar, na pasta `pwa/` da raiz, uma versão PWA (instalável no celular) só com o que o aluno usa, seguindo o plano e a recomendação da análise da #267, com o trabalho dividido no maior número possível de subtarefas pequenas.

### Escopo

- **Entra:** a definir no plano de implantação (#275.1), escrito a partir do documento
  `pwa/ANALISE-PWA.md` da #267 (cenário recomendado, segurança e lista de subtarefas futuras).
- **Não entra:** páginas só do professor; banco; mudar as páginas que já estão no ar fora do que o
  plano aprovado disser.

### Riscos

| Risco | Plano B |
|---|---|

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 23:08 | A implantação depende da análise da #267 (o plano dela diz que o código do PWA só vem depois da análise) | Claude Code (nuvem · ccr-a26b3c0e-1ljztf) | "seguindo o plano" do pedido |

### #275.1 — Plano de implantação com o máximo de subtarefas (tarefa grande)

**Próximo passo:** esperar a #267.3; depois, escrever nesta etapa o plano (cenário, arquivos,
segurança) e as subtarefas, cada uma com nível e modelo, e pedir a aprovação do usuário.

- **Nível:** PESADO — arquitetura nova (pasta `pwa/`, service worker) e segurança (gabarito, JWT).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
