## Etapa 504-07b5ba8a — Deploys da Vercel falhando no ignoreCommand (fatal: bad object)

**Tarefa:** #355-07b5ba8a-f19d-48d3-8f0b-a45d15225a65 · **Pedido em:** 2026-10-24 17:04 · **Criada por:** Devin (local · main)
**Pedido:** "VEJA POR QUE ESTA DANDO ERRO NO DEPLOY DA VERCEL COM O CONECTOR DA VERCEL"
**Objetivo:** destravar os deploys do `aulasenai` na Vercel — todo push está falhando na etapa `ignoreStep` porque o `ignoreCommand` do `vercel.json` sai com código 128 (a Vercel só aceita 0 ou 1).

### Diagnóstico (feito pelo Devin via conector MCP da Vercel)

- `list_deployments` no projeto `aulasenai` (`prj_MmCD7hL9uzepAKQZZDmaQ35nnhMU`, team `c3tecnologia`): os últimos 10 deploys do `main` estão em `state: ERROR`, inclusive os commits `chore(quadro)` que só mexem em `tasks/` e deveriam ser ignorados.
- `get_deployment` (ex.: `dpl_8REG3dBNQfyws6GkJBrRWarfHoLf`, commit `abe8fd6e`): `errorStep: "ignoreStep"`, `errorMessage: "Command failed with exit code 128: git diff --quiet ${VERCEL_GIT_PREVIOUS_SHA:-HEAD^} HEAD -- . ':(exclude)tasks/' ':(exclude)rules-local/'` + `fatal: bad object 88f7281402dcfb2af8a5ea24e2f1c9c5b0c23345`.
- `88f7281...` é o `VERCEL_GIT_PREVIOUS_SHA` (SHA do último deploy publicado). O commit **existe** no histórico (ancestral de `HEAD`, verificado com `git merge-base --is-ancestor`), mas **não vem no clone raso** que a Vercel faz no build → `git diff` falha com 128.
- Regra da Vercel para `ignoreCommand`: saída `0` = pular deploy, `1` = publicar, **qualquer outro código = erro** → por isso todo push vira `ERROR`, até os que deviam ser cancelados.
- Correção (`regras/vercel-sem-deploy-de-controle.md`: "falha para o lado seguro: publicar"): quando o SHA anterior não resolver no clone, cair em `HEAD^`; e qualquer saída que não seja "sem diferença" deve sair `1` (publicar), nunca propagar o 128.
- Comando sugerido para o `ignoreCommand`:
  ```sh
  PREV=${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}; git rev-parse -q --verify "$PREV^{commit}" >/dev/null 2>&1 || PREV=HEAD^; git diff --quiet "$PREV" HEAD -- . ':(exclude)tasks/' ':(exclude)rules-local/'; test $? -eq 0
  ```
  (no JSON, escapar as aspas internas com `\"`). Alternativa mais simples (sempre publica em erro, sem fallback): manter o comando atual e acrescentar `; test $? -eq 0` no fim.
- Observação: `get_deployment` e `list_deployment_events` com `slug: c3tecnologia` retornam 403 — o conector MCP não tem acesso ao escopo do team (ferramenta `authorize_team_access` gera link de consentimento se for preciso). A leitura sem escopo foi suficiente para o diagnóstico.

### #355.1 — Corrigir o `ignoreCommand` do `vercel.json` para sair só 0 ou 1

**Próximo passo:** editar `vercel.json` trocando o `ignoreCommand` pelo comando com fallback (ver Diagnóstico); commit + push na `main`; conferir pelo conector que o próximo deploy sai de `ERROR` (push com site = `READY`; push só de `tasks/`/`rules-local/` = `CANCELED`).

- **Nível:** MEDIO — reclassificado pelo Jev em 2026-10-24 (confiança 0,18; revisão humana recomendada); 1 arquivo de configuração de deploy, sem banco/RLS (antes PESADO, confiança 0,76)
- **Modelo:** MEDIO · só Sonnet — executada pelo Devin por pedido direto do usuário nesta sessão ("faca a task 355"), depois de avisado de que o Devin não é o modelo do nível (precedente: #353.1, #354.1)
- **Descrição:** `vercel.json`, chave `ignoreCommand`: substituir `git diff --quiet ${VERCEL_GIT_PREVIOUS_SHA:-HEAD^} HEAD -- . ':(exclude)tasks/' ':(exclude)rules-local/'` pelo comando com fallback `HEAD^` que só retorna 0 ou 1 (ver Diagnóstico). Nada mais no arquivo muda.
- **Critérios de aceitação:** próximo deploy do `main` não fica `ERROR`; push com mudança de site → `READY`; push só de `tasks/` ou `rules-local/` → `CANCELED` (regra C46 preservada).
- **Entrega:** `vercel.json` — `ignoreCommand` trocado pelo comando com fallback `HEAD^` e `test $? -eq 0` (só sai 0 ou 1). Commit na `main` junto com o quadro.
- **Verificação:** JSON válido; comando extraído do `vercel.json` rodado em `sh` com 3 casos: SHA anterior inexistente (o erro de hoje) → exit 0, sem 128; commit só de `tasks/` → exit 0 (pula); commit com arquivo do site → exit 1 (publica). Falta conferir pelo conector (`list_deployments`) que o deploy deste push sai de `ERROR`: registrado abaixo.
