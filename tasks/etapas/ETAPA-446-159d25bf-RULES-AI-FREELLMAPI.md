## Etapa 446-159d25bf — #317: configurar no rules-ai a ferramenta de IA freellmapi

**Tarefa:** #317-159d25bf-90c3-4db9-829c-fe8df4a23b79 · **Pedido em:** 2026-10-20 21:58 · **Criada por:** Claude Code (Sonnet 5.5) (nuvem · session_012yMfNbwD5jiWx2irWHpBov)
**Pedido:** "Crie 1 tarefa que configure no rules-ai esta ferramenta de IA aqui
https://github.com/Gelvazio/freellmapi.git"
**Objetivo:** deixar a ferramenta de IA `freellmapi` configurada no repositório `rules-ai` (regras
globais de todas as IAs e projetos), com a chave de acesso fora do Git, para que as IAs e os
projetos a usem pelo mesmo caminho.

> **Tarefa grande** (mexe em regras globais de todos os projetos e em chave de acesso): o plano é
> esta etapa e a subtarefa #317.3 só começa depois do "sim" do usuário ao plano da #317.2
> (`.claude/rules/tasks/ciclo-da-task.md`, §2). Esta etapa só registra a tarefa: nenhuma
> subtarefa foi reservada nem executada.

### Escopo

- **Entra:** ler o repositório `Gelvazio/freellmapi` e descobrir o que a ferramenta faz e como ela
  se configura; decidir onde ela entra no `rules-ai` (regras, scripts ou spec) e como a chave fica
  fora do Git; configurar no `rules-ai`; sincronizar e registrar no `aulasenai`.
- **Não entra:** colocar chave, token ou senha em qualquer arquivo versionado; trocar de ferramenta
  as IAs que já funcionam; mexer em código dos outros projetos além da sincronização do
  `rules-local`.

### Riscos

| Risco | Plano B |
|---|---|
| Chave de acesso vazar no Git | Chave só em variável de ambiente ou arquivo ignorado (`.gitignore`); no repositório fica só o modelo sem valor (`*.example`) |
| `freellmapi` não estar na sessão de nuvem (escopo do GitHub) | Anexar só para leitura com `add_repo`; se negado, avisar o usuário e fazer a #317.1 pelo Claude Code local |
| Escrita no `rules-ai` na nuvem | A nuvem só lê o `rules-ai` (`AGENTS.md`, regra 12); a #317.3 é do Claude Code local |
| A ferramenta mudar o que se espera de "configurar" | A #317.2 descreve o resultado esperado e o usuário aprova antes da #317.3 |

### Decisões

- 2026-10-20 21:58 · tarefa criada a pedido do usuário. Prioridade 🟡 Média posta por padrão (a prioridade é
  do usuário e pode ser trocada).

### #317.1 — Levantar o que é o freellmapi e como ele se configura

**Próximo passo:** anexar o repositório `Gelvazio/freellmapi` só para leitura, ler o README e os
arquivos de configuração e escrever aqui o resumo (o que faz, o que precisa para rodar, onde entra
a chave).

- **Nível:** LEVE — só ler `.md` e escrever texto.
- **Modelo:** só Haiku — nunca outro.
- **Descrição:** resumo de 1 página nesta seção: finalidade, como instalar e configurar, que
  chaves ou variáveis exige, como as IAs a chamam.
- **Critérios de Aceitação:** o resumo cita os arquivos do `freellmapi` de onde saiu cada dado.
- **Entrega:** —
- **Verificação:** —

### #317.2 — Plano da configuração no rules-ai (para aprovação)

**Próximo passo:** esperar a #317.1.

- **Nível:** PESADO — regra global para todos os projetos e chave de acesso (segurança).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro.
- **Descrição:** escrever nesta etapa onde a ferramenta entra no `rules-ai` (arquivo de regra,
  script ou spec), como a chave fica fora do Git, quais IAs a usam e como cada projeto a recebe
  pelo `rules-local`; depois mostrar o resumo ao usuário e esperar o "sim".
- **Critérios de Aceitação:** arquivos a criar ou mudar listados; nenhum valor de chave no plano;
  "sim" do usuário registrado nas Decisões.
- **Entrega:** —
- **Verificação:** —

### #317.3 — Configurar o freellmapi no rules-ai

**Próximo passo:** esperar a #317.2 aprovada.

- **Nível:** PESADO — escreve no `rules-ai` (global) e trata chave; só o Claude Code local.
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro.
- **Descrição:** aplicar o plano aprovado no `rules-ai`: regra ou spec da ferramenta, modelo de
  configuração sem valores secretos e registro no `CONFLITOS.md` se divergir de regra de projeto.
- **Critérios de Aceitação:** só o escopo aprovado; nenhuma chave no Git (`git diff` conferido
  antes do commit); commit e push no `rules-ai`.
- **Entrega:** —
- **Verificação:** —

### #317.4 — Registrar no aulasenai e conferir a sincronização

**Próximo passo:** esperar a #317.3.

- **Nível:** MEDIO — conferir se o que foi pedido chegou aos projetos.
- **Modelo:** só Sonnet — nunca outro.
- **Descrição:** rodar a sincronização do `rules-local` no `aulasenai`, conferir que a regra
  chegou, registrar em `docs/HISTORICO-REGRAS.md` e regenerar o visualizador.
- **Critérios de Aceitação:** regra visível no `aulasenai`; histórico atualizado; commit e push na
  `main`.
- **Entrega:** —
- **Verificação:** —
