# STATUS — AUTOMATIZACAO-WHATSAPP

> **Fonte única da verdade do andamento do projeto.** Qualquer IA que assumir o trabalho deve ler
> o `CLAUDE.md` e este arquivo, ir ao **Ponteiro de Retomada** e continuar dali.
> Atualizar este arquivo **a cada mudança de status** (protocolo no `CLAUDE.md`).

**Objetivo:** Ler (somente leitura) os grupos do WhatsApp via Baileys, armazenar em SQLite,
gerar resumos/análises/alertas com a Claude API e exibir tudo num dashboard HTML/CSS/JS vanilla.

**Tech Stack:** Node.js 24 (ESM) · `@whiskeysockets/baileys` · `node:sqlite` + FTS5 · `node:http`
· SSE · Claude API via `fetch` · HTML/CSS/JS vanilla · SVG para gráficos.

**Criado em:** 2026-10-03
**Concluído em:** —
**Tempo decorrido:** —

**Legenda:** ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado/não aplicável

---

## 📍 Ponteiro de Retomada

| Campo | Valor |
|-------|-------|
| **Etapa atual** | Etapa 10 — Dashboard base |
| **Passo atual** | 10.1 — index.html |
| **Situação** | 🔄 Em progresso |
| **Última IA/modelo** | Claude Opus 5.5 (`claude-opus-5-5`) |
| **Última atualização** | 2026-10-03 |
| **Próxima ação concreta** | Escrever public/index.html, css/*, js/{constantes,api,estado,eventos,roteador,app}.js e componentes |
| **Bloqueios** | Nenhum |

---

## 📊 Status Geral das Etapas

| Etapa | Descrição | Status | Depende de | Iniciado em | Concluído em |
|-------|-----------|--------|------------|-------------|--------------|
| 0 | Planejamento (CLAUDE.md + STATUS.md) | ✅ Concluído | — | 2026-10-03 | 2026-10-03 |
| 1 | Fundação do projeto | ✅ Concluído | 0 | 2026-10-03 | 2026-10-03 |
| 2 | Banco de dados (SQLite + migrações + repositórios) | ✅ Concluído | 1 | 2026-10-03 | 2026-10-03 |
| 3 | Conexão WhatsApp (Baileys, QR, reconexão) | ✅ Concluído | 2 | 2026-10-03 | 2026-10-03 |
| 4 | Coleta e normalização de mensagens | ✅ Concluído | 3 | 2026-10-03 | 2026-10-03 |
| 5 | Servidor HTTP, API REST e SSE | ✅ Concluído | 4 | 2026-10-03 | 2026-10-03 |
| 6 | Cliente da Claude API | ✅ Concluído | 2 | 2026-10-03 | 2026-10-03 |
| 7 | Resumos e análises | ✅ Concluído | 5, 6 | 2026-10-03 | 2026-10-03 |
| 8 | Motor de alertas | ✅ Concluído | 5, 6 | 2026-10-03 | 2026-10-03 |
| 9 | Agendador de tarefas | ✅ Concluído | 7, 8 | 2026-10-03 | 2026-10-03 |
| 10 | Dashboard — base (shell, tema, roteador, API, SSE) | 🔄 Em progresso | 5 | 2026-10-03 | — |
| 11 | Dashboard — Visão geral, Conexão, Grupos, Detalhe do grupo | ⬜ Pendente | 10 | — | — |
| 12 | Dashboard — Resumos, Alertas, Busca, Configurações | ⬜ Pendente | 11, 7, 8 | — | — |
| 13 | Entrega do resumo para mim mesmo (opcional) | ⬜ Pendente | 9 | — | — |
| 14 | Segurança e robustez | ⬜ Pendente | 12 | — | — |
| 15 | Documentação final e entrega | ⬜ Pendente | 14 | — | — |

---

## Etapa 0 — Planejamento

**Status:** ✅ Concluído · **Concluído em:** 2026-10-03

| Passo | Descrição | Status |
|-------|-----------|--------|
| 0.1 | Criar `CLAUDE.md` com stack, arquitetura, regras e protocolo de status | ✅ Concluído |
| 0.2 | Criar `STATUS.md` com todas as etapas detalhadas | ✅ Concluído |
| 0.3 | `git init` + commit inicial | ✅ Concluído |

---

## Etapa 1 — Fundação do projeto

**Status:** ✅ Concluído
**Objetivo:** Estrutura de pastas, `package.json`, configs, constantes e leitura do ambiente.
**Plano detalhado (com código):** `docs/etapa-01-fundacao.md` (criar ao iniciar)

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 1.1 | Inicializar `package.json` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 1.2 | Criar `.gitignore` e `.env.example` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 1.3 | Criar a árvore de pastas | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 1.4 | Criar `src/config/constantes.js` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 1.5 | Criar `src/config/ambiente.js` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 1.6 | Criar `src/utilitarios/logger.js` e `datas.js` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 1.7 | Configurar ESLint + Prettier e scripts npm | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 1.8 | Commit da etapa | ✅ Concluído | 2026-10-03 | 2026-10-03 |

**Detalhamento:**

- **1.1** — `package.json` com `"type": "module"`, `"engines": { "node": ">=24" }`, scripts
  `iniciar` (`node --env-file=.env src/index.js`), `verificar`, `formatar`. Instalar
  `@whiskeysockets/baileys`, `qrcode`, `pino`; dev: `eslint`, `prettier`.
  *Verificação:* `npm ls --depth=0` lista as 5 dependências sem erro.
- **1.2** — `.gitignore`: `node_modules/`, `.env`, `dados/`, `*.sqlite*`, `graphify-out/cache`.
  `.env.example`: `ANTHROPIC_API_KEY=`, `DASHBOARD_TOKEN=`, `PORTA_SERVIDOR=3210`,
  `HOST_SERVIDOR=127.0.0.1`, `MEU_NUMERO=55DDDNUMERO`, `FUSO_HORARIO=America/Sao_Paulo`.
  *Verificação:* `git check-ignore .env dados/x` retorna os dois caminhos.
- **1.3** — Criar `src/{config,utilitarios,banco/repositorios,whatsapp,ia/prompts,alertas/regras,
  agendador/tarefas,servidor/rotas}`, `public/{css,js/componentes,js/paginas}`, `docs/`, `dados/`.
  *Verificação:* `Get-ChildItem -Recurse -Directory src,public` mostra todas.
- **1.4** — `constantes.js`: caminhos (`CAMINHO_BANCO`, `CAMINHO_SESSAO`), modelos de IA
  (`MODELO_PADRAO = 'claude-haiku-4-5'`, `MODELO_ANALISE = 'claude-sonnet-5-5'`),
  `URL_API_CLAUDE`, `VERSAO_API_CLAUDE`, limites (tokens por bloco, tentativas, retenção 90 dias),
  tipos de mensagem, tipos/severidades de alerta, situações de alerta, nomes de eventos SSE,
  mensagens de erro. Tudo com `Object.freeze`.
  *Verificação:* `node --check src/config/constantes.js`.
- **1.5** — `ambiente.js`: função `carregarAmbiente()` que lê `process.env`, valida obrigatórias
  (`DASHBOARD_TOKEN`; `ANTHROPIC_API_KEY` opcional com aviso) e retorna objeto congelado.
  *Verificação:* `node -e "import('./src/config/ambiente.js')"` sem erro de sintaxe.
- **1.6** — `logger.js` (instância `pino` com nível configurável — também usada pelo Baileys);
  `datas.js` (`agoraIso()`, `inicioDoDiaIso(fuso)`, `formatarDataBr()`).
  *Verificação:* `node --check` nos dois arquivos.
- **1.7** — `eslint.config.js` (flat config, `no-var`, `prefer-const`, `max-lines: 1000`,
  `max-lines-per-function: 45`, `max-params: 3`, `max-depth: 2`, `max-len: 100`,
  `no-nested-ternary`), `.prettierrc` (`printWidth: 100`, `singleQuote: true`).
  *Verificação:* `npm run verificar` sem erros.
- **1.8** — Criar `docs/ORIENTACAO_JS_CONFIG.md`; atualizar este STATUS; `git add .` +
  `git commit -m "etapa 01: fundacao do projeto"`; `graphify update .`.

---

## Etapa 2 — Banco de dados

**Status:** ✅ Concluído
**Objetivo:** Conexão `node:sqlite`, migrações versionadas e repositórios por tabela.
**Plano detalhado:** `docs/etapa-02-banco.md` · ⚠️ **Mexe em banco → pedir aprovação do plano.**

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 2.1 | `src/banco/conexao.js` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 2.2 | `src/banco/migracoes.js` — versão 1 (todas as tabelas + FTS5 + índices) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 2.3 | `grupoRepositorio.js` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 2.4 | `mensagemRepositorio.js` (inclui busca FTS e estatísticas) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 2.5 | `resumoRepositorio.js` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 2.6 | `alertaRepositorio.js` e `regraAlertaRepositorio.js` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 2.7 | `usoIaRepositorio.js` e `configuracaoRepositorio.js` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 2.8 | Criar `docs/database.md` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 2.9 | Commit da etapa | ✅ Concluído | 2026-10-03 | 2026-10-03 |

**Detalhamento:**

- **2.1** — `abrirBanco(caminho)` com `new DatabaseSync(caminho)`, `PRAGMA journal_mode=WAL`,
  `PRAGMA foreign_keys=ON`; cria a pasta `dados/` se faltar. Retorna a instância (injetada nos
  repositórios).
- **2.2** — Tabela `schema_versao`; lista de migrações `[{ versao, sql }]` aplicada em transação.
  V1 cria: `grupos`, `mensagens` (índices em `grupo_jid, enviada_em` e `autor_jid`),
  `mensagens_fts` (FTS5 `content='mensagens'` + triggers de insert/delete), `resumos`,
  `regras_alerta`, `alertas` (índice em `situacao, criado_em`), `uso_ia`, `configuracoes`.
  Insere configurações padrão (horário resumo `20:00`, retenção 90, modelo padrão) e regras
  padrão (menção ao usuário, pergunta direta).
  *Verificação:* script rápido `node --env-file=.env -e` que roda migrações e lista
  `SELECT name FROM sqlite_master` → todas as tabelas presentes; rodar 2× não duplica.
- **2.3 a 2.7** — Cada repositório recebe o `banco` no construtor e expõe métodos pequenos com
  prepared statements. Principais:
  - grupos: `salvarOuAtualizar`, `listar({ somenteMonitorados })`, `alterarMonitoramento`,
    `buscarPorJid`.
  - mensagens: `inserirSeNaoExistir` (`INSERT OR IGNORE`), `listarPorGrupo({ jid, desde, ate,
    limite, cursor })`, `buscarTexto(termo)` (FTS5 + `snippet()`), `contarPorDia`,
    `contarPorHora`, `rankingAutores`, `apagarAnterioresA(data)`.
  - resumos: `salvar`, `listar({ grupoJid, limite })`, `buscarUltimoDoGrupo`.
  - alertas: `criar`, `listar({ situacao, grupoJid })`, `alterarSituacao`, `contarAbertos`.
  - regras: `listarAtivas`, `salvar`, `alternar`, `remover`.
  - uso_ia: `registrar`, `somarCustoPorPeriodo`.
  - configuracoes: `obter(chave)`, `definir(chave, valor)`, `listarTodas`.
  *Verificação:* `node --check` em cada arquivo + script SQL de inserção/consulta de exemplo
  executado e descartado (sem criar arquivo de teste).
- **2.8** — `docs/database.md` com todas as tabelas, colunas, tipos, índices e relações.
- **2.9** — `docs/ORIENTACAO_JS_BANCO.md`; STATUS; commit `etapa 02: banco de dados`.

---

## Etapa 3 — Conexão WhatsApp (Baileys)

**Status:** ✅ Concluído
**Objetivo:** Conectar como aparelho conectado, expor QR e status, reconectar sozinho, sincronizar
metadados dos grupos. **Nunca enviar mensagens.**
**Plano detalhado:** `docs/etapa-03-whatsapp.md`

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 3.1 | Consultar documentação atual do Baileys (Context7) e registrar versão | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 3.2 | `clienteWhatsapp.js` — conexão com `useMultiFileAuthState` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 3.3 | Emissão de estado (conectando/qr/conectado/desconectado) via `EventEmitter` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 3.4 | Reconexão com backoff e tratamento de logout (`DisconnectReason.loggedOut`) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 3.5 | Sincronização de grupos (`groupFetchAllParticipating` + `groups.update`) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 3.6 | Função `desconectarEApagarSessao()` (para o botão "Desconectar") | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 3.7 | Teste manual de conexão pelo usuário (QR no terminal provisório) | ⛔ Aguardando usuário ler o QR no dashboard | — | — |
| 3.8 | Commit da etapa | ✅ Concluído | 2026-10-03 | 2026-10-03 |

**Detalhamento:**

- **3.1** — A API do Baileys muda entre versões: buscar doc atual antes de codar e anotar a
  versão instalada em **Decisões**.
- **3.2** — `makeWASocket({ auth, logger, markOnlineOnConnect: false, syncFullHistory: false,
  browser })`; salvar credenciais em `dados/sessao/` (evento `creds.update`).
- **3.3** — Classe `ClienteWhatsapp extends EventEmitter` emitindo `estado` e `qr`; guarda o
  último QR e estado para o dashboard consultar.
- **3.4** — `connection.update`: se fechou e não foi logout → reconectar (1s, 2s, 4s… máx. 60s);
  se logout → apagar sessão e voltar ao estado `aguardando_qr`.
- **3.5** — Ao conectar: buscar todos os grupos e gravar via `grupoRepositorio` (novos entram
  com `monitorado = 0`); escutar `groups.update`/`group-participants.update`.
- **3.6** — `logout()` + remoção de `dados/sessao/`.
- **3.7** — Script provisório imprime o QR no terminal (`qrcode` modo terminal); usuário escaneia
  e confirma no chat. *Verificação:* `SELECT COUNT(*) FROM grupos` > 0. Remover o script depois.
- **3.8** — `docs/ORIENTACAO_JS_WHATSAPP.md`; STATUS; commit `etapa 03: conexao whatsapp`.

---

## Etapa 4 — Coleta e normalização de mensagens

**Status:** ✅ Concluído
**Objetivo:** Gravar no banco toda mensagem nova dos grupos monitorados, em formato padronizado.
**Plano detalhado:** `docs/etapa-04-coleta.md`

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 4.1 | `normalizadorMensagem.js` — mapa tipo Baileys → extrator (Strategy) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 4.2 | Detecção de menção ao usuário e de mensagem citada | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 4.3 | `coletorMensagens.js` — escuta `messages.upsert` e filtra | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 4.4 | Emissão de evento interno `mensagem:nova` (para alertas e SSE) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 4.5 | `src/index.js` — composição inicial (banco + whatsapp + coletor) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 4.6 | Verificação com mensagens reais (usuário envia em grupo de teste) | ⛔ Aguardando usuário (mensagens reais) | — | — |
| 4.7 | Commit da etapa | ✅ Concluído | 2026-10-03 | 2026-10-03 |

**Detalhamento:**

- **4.1** — Mapa `{ conversation, extendedTextMessage, imageMessage, videoMessage, audioMessage,
  documentMessage, stickerMessage, reactionMessage, pollCreationMessage, ... }` → função que
  devolve `{ tipo, texto }`. Mídia vira `[imagem] legenda`. Tipo desconhecido → `[outro]`.
  Novo tipo = nova entrada no mapa (Open/Closed).
- **4.2** — `menciona_usuario = 1` se `contextInfo.mentionedJid` contém o JID do usuário ou o
  texto contém o número/nome dele; `citada_id` de `contextInfo.stanzaId`.
- **4.3** — Ignorar: mensagens fora de grupo (`!jid.endsWith('@g.us')`), grupos com
  `monitorado = 0`, mensagens de protocolo, `type !== 'notify'` exceto histórico recente.
- **4.4** — `EventEmitter` de domínio (`barramentoEventos`) injetado; emitir após gravar.
- **4.5** — `index.js` cria logger → banco → migrações → repositórios → cliente → coletor.
- **4.6** — *Verificação:* `SELECT autor_nome, tipo, texto FROM mensagens ORDER BY enviada_em
  DESC LIMIT 10` mostra as mensagens enviadas pelo usuário; busca FTS encontra uma palavra.
- **4.7** — `docs/ORIENTACAO_JS_COLETA.md`; STATUS; commit `etapa 04: coleta de mensagens`.

---

## Etapa 5 — Servidor HTTP, API REST e SSE

**Status:** ✅ Concluído
**Objetivo:** Servir o dashboard e expor os dados via JSON + eventos em tempo real.
**Plano detalhado:** `docs/etapa-05-servidor.md` · ⚠️ **Segurança → pedir aprovação do plano.**

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 5.1 | `servidorHttp.js` (bind `127.0.0.1`) + tratamento global de erros | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 5.2 | `roteador.js` — tabela `{ metodo, padrao, handler }` com parâmetros `:id` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 5.3 | `arquivosEstaticos.js` — serve `public/` com MIME e proteção a `..` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 5.4 | `autenticacao.js` — token via cabeçalho `Authorization: Bearer` / cookie | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 5.5 | `eventosSse.js` — `GET /api/eventos`, heartbeat, broadcast | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 5.6 | Rotas: conexão, grupos, mensagens, busca, estatísticas | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 5.7 | Rotas: resumos, alertas, regras, configurações, uso de IA (esqueleto) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 5.8 | Ligar barramento → SSE (`mensagem:nova`, `estado:whatsapp`, `alerta:novo`) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 5.9 | Commit da etapa | ✅ Concluído | 2026-10-03 | 2026-10-03 |

**Contrato da API (base `/api`, todas exigem token):**

| Método | Rota | Função |
|--------|------|--------|
| GET | `/conexao` | estado atual + QR (data URL) |
| POST | `/conexao/desconectar` | logout e apaga sessão |
| GET | `/grupos` | lista com totais (mensagens hoje/7 dias, último resumo) |
| PATCH | `/grupos/:jid` | `{ monitorado }` |
| GET | `/grupos/:jid/mensagens?desde&ate&cursor` | linha do tempo paginada |
| GET | `/grupos/:jid/estatisticas` | por hora, por dia, ranking autores |
| GET | `/busca?termo&grupo` | FTS5 com trecho destacado |
| GET | `/visao-geral` | KPIs + atividade 7 dias |
| GET | `/resumos?grupo&limite` · POST `/resumos` | listar / gerar sob demanda `{ grupo, desde, ate, modelo }` |
| GET | `/alertas?situacao&grupo` · PATCH `/alertas/:id` | listar / mudar situação |
| GET/POST/PATCH/DELETE | `/regras` e `/regras/:id` | CRUD de regras de alerta |
| GET/PUT | `/configuracoes` | ler / salvar |
| GET | `/uso-ia?periodo` | tokens e custo |
| GET | `/eventos` | stream SSE |

*Verificação (sem navegador):* `curl -H "Authorization: Bearer <token>"
http://127.0.0.1:3210/api/grupos` retorna JSON; sem token → 401; `curl -N .../api/eventos`
recebe heartbeat; `curl .../../.env` → 404.
- **5.9** — `docs/ORIENTACAO_JS_SERVIDOR.md`; STATUS; commit `etapa 05: servidor e api`.

---

## Etapa 6 — Cliente da Claude API

**Status:** ✅ Concluído
**Objetivo:** Módulo único e reutilizável para chamar a Claude API com retry e registro de custo.
**Plano detalhado:** `docs/etapa-06-claude.md`

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 6.1 | Consultar doc atual da Messages API (skill `claude-api`) e preços dos modelos | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 6.2 | `clienteClaude.js` — `enviarMensagem({ modelo, sistema, conteudo, maxTokens })` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 6.3 | Retry com backoff para 429/5xx e timeout com `AbortController` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 6.4 | `extrairJson(resposta)` — parse + validação de campos obrigatórios | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 6.5 | Registro de uso em `uso_ia` (tokens e custo estimado por tabela de preços) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 6.6 | Verificação com chamada real curta | ⛔ Aguardando ANTHROPIC_API_KEY no .env | — | — |
| 6.7 | Commit da etapa | ✅ Concluído | 2026-10-03 | 2026-10-03 |

**Detalhamento:** tabela de preços por modelo fica em `constantes.js`. Sem `ANTHROPIC_API_KEY` o
cliente lança erro claro e o dashboard mostra "IA não configurada" (o resto do sistema funciona).
*Verificação 6.6:* `node --env-file=.env -e` chamando com prompt "responda {\"ok\":true}" →
JSON válido e linha nova em `uso_ia`.
- **6.7** — `docs/ORIENTACAO_JS_IA.md`; STATUS; commit `etapa 06: cliente claude`.

---

## Etapa 7 — Resumos e análises

**Status:** ✅ Concluído
**Objetivo:** Gerar resumos estruturados por grupo e período.
**Plano detalhado:** `docs/etapa-07-resumos.md`

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 7.1 | `prompts/promptResumo.js` (sistema + formato JSON do resumo) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 7.2 | `prompts/promptConsolidacao.js` (junta resumos de blocos) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 7.3 | `divisorBlocos.js` — formata mensagens `[HH:MM] Autor: texto` e divide por tamanho | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 7.4 | `servicoResumo.js` — `gerarResumo({ grupoJid, desde, ate, modelo, tipo })` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 7.5 | Regras: grupo sem mensagens no período → não chama IA; mínimo configurável | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 7.6 | Ligar `POST /api/resumos` e evento SSE `resumo:pronto` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 7.7 | Verificação com grupo real | ⛔ Aguardando chave da IA + mensagens reais | — | — |
| 7.8 | Commit da etapa | ✅ Concluído | 2026-10-03 | 2026-10-03 |

**Formato do resumo (JSON):** `resumo_curto`, `assuntos[] {titulo, descricao}`, `decisoes[]`,
`tarefas[] {descricao, responsavel, prazo}`, `perguntas_sem_resposta[] {autor, pergunta}`,
`mencoes_ao_usuario[]`, `links[] {url, contexto}`, `tom` (tranquilo/tenso/conflito/festivo),
`destaques[]`.
*Verificação 7.7:* `curl -X POST .../api/resumos` para um grupo com mensagens → linha em `resumos`
com JSON válido contendo todos os campos.
- **7.8** — `docs/ORIENTACAO_JS_RESUMOS.md`; STATUS; commit `etapa 07: resumos`.

---

## Etapa 8 — Motor de alertas

**Status:** ✅ Concluído
**Objetivo:** Gerar alertas em tempo real (regras locais) e periódicos (IA).
**Plano detalhado:** `docs/etapa-08-alertas.md`

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 8.1 | Contrato da regra: `{ tipo, avaliar(mensagem, contexto) → alerta \| null }` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 8.2 | Regra `palavraChave` (lista de termos, sem acento/caixa) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 8.3 | Regra `mencaoUsuario` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 8.4 | Regra `perguntaDireta` (pergunta citando o usuário sem resposta em X min) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 8.5 | Regra `picoVolume` (mensagens/hora acima de N× a média) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 8.6 | Regra `autorVip` (mensagem de contato marcado como importante) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 8.7 | `motorAlertas.js` — registro de regras (mapa), escuta `mensagem:nova`, anti-duplicação | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 8.8 | Análise por IA (lote): urgência, conflito, prazo — gera alertas `ia` | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 8.9 | Emitir `alerta:novo` (SSE) e ligar rotas de alertas/regras | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 8.10 | Commit da etapa | ✅ Concluído | 2026-10-03 | 2026-10-03 |

**Detalhamento:** severidades `info`, `atencao`, `urgente`. Anti-duplicação: mesma regra +
mesmo grupo em janela de N minutos agrupa em um alerta. Nova regra = novo arquivo em
`alertas/regras/` + registro no mapa (Open/Closed).
*Verificação:* inserir mensagem via script com palavra-chave cadastrada → `SELECT * FROM alertas`
mostra o alerta; `curl -N /api/eventos` recebe `alerta:novo`.
- **8.10** — `docs/ORIENTACAO_JS_ALERTAS.md`; STATUS; commit `etapa 08: alertas`.

---

## Etapa 9 — Agendador de tarefas

**Status:** ✅ Concluído
**Objetivo:** Rodar tarefas periódicas sem dependências externas.
**Plano detalhado:** `docs/etapa-09-agendador.md`

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 9.1 | `agendador.js` — `agendarDiario(horario, tarefa)` e `agendarIntervalo(ms, tarefa)` com fuso | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 9.2 | Tarefa `resumoDiario` — todos os grupos monitorados com mensagens no dia | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 9.3 | Tarefa `analiseIa` — a cada N minutos, lote de mensagens novas → alertas IA | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 9.4 | Tarefa `limpezaRetencao` — apaga mensagens além da retenção (diária, madrugada) | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 9.5 | Execução atrasada: ao iniciar, roda o resumo do dia anterior se ficou pendente | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 9.6 | Reagendar quando o horário mudar nas configurações | ✅ Concluído | 2026-10-03 | 2026-10-03 |
| 9.7 | Commit da etapa | ✅ Concluído | 2026-10-03 | 2026-10-03 |

*Verificação:* configurar horário para 2 min à frente, reiniciar, conferir no log e em `resumos`.
- **9.7** — `docs/ORIENTACAO_JS_AGENDADOR.md`; STATUS; commit `etapa 09: agendador`.

---

## Etapa 10 — Dashboard: base

**Status:** ✅ Concluído
**Objetivo:** Shell da SPA vanilla, tema claro/escuro, roteamento por hash, cliente API e SSE.
**Plano detalhado:** `docs/etapa-10-dashboard-base.md`

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 10.1 | `public/index.html` — `header`, `nav` lateral, `main#conteudo`, `<script type="module">` | ⬜ Pendente | — | — |
| 10.2 | `css/tokens.css` — cores, espaçamentos, raios, sombras, tema escuro (`prefers-color-scheme` + `[data-tema]`) | ⬜ Pendente | — | — |
| 10.3 | `css/base.css` e `css/layout.css` — reset, tipografia, grid responsivo (≥ 360px) | ⬜ Pendente | — | — |
| 10.4 | `css/componentes.css` — cartão, tabela, botão, selo de severidade, modal, toast, skeleton | ⬜ Pendente | — | — |
| 10.5 | `js/constantes.js`, `js/estado.js` (pub/sub), `js/api.js` (fetch + token + erros) | ⬜ Pendente | — | — |
| 10.6 | `js/eventos.js` — `EventSource` com reconexão e despacho para o estado | ⬜ Pendente | — | — |
| 10.7 | `js/roteador.js` — mapa `#/rota` → módulo de página (`montar`, `desmontar`) | ⬜ Pendente | — | — |
| 10.8 | Tela de token (primeiro acesso) guardado em `localStorage` | ⬜ Pendente | — | — |
| 10.9 | Componentes: `cartaoKpi`, `tabela`, `graficoBarras` (SVG), `graficoLinha` (SVG), `modal`, `toast`, `seletorPeriodo` | ⬜ Pendente | — | — |
| 10.10 | Badge de alertas abertos no menu (atualiza via SSE) | ⬜ Pendente | — | — |
| 10.11 | Commit da etapa | ⬜ Pendente | — | — |

**Regras do frontend:** todo DOM com dados via `createElement` + `textContent` (XSS); páginas
são módulos com `montar(container)` / `desmontar()` (removem listeners); nenhum `style=""`
inline, nenhum `onclick` no HTML.
*Verificação:* `node --check` em todos os `.js` de `public/`; `curl` em `/`, `/css/tokens.css` e
`/js/app.js` retorna 200 com MIME correto. Visual → **usuário confere** (registrar no Diário).
- **10.11** — `docs/ORIENTACAO_JS_DASHBOARD.md`; STATUS; commit `etapa 10: dashboard base`.

---

## Etapa 11 — Dashboard: Visão geral, Conexão, Grupos, Detalhe

**Status:** ✅ Concluído
**Plano detalhado:** `docs/etapa-11-paginas-principais.md`

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 11.1 | `paginas/visaoGeral.js` — KPIs, gráfico 7 dias, top grupos, últimos alertas | ⬜ Pendente | — | — |
| 11.2 | `paginas/conexao.js` — estado, QR (atualiza via SSE), botão desconectar com confirmação | ⬜ Pendente | — | — |
| 11.3 | `paginas/grupos.js` — tabela com busca/ordenação, interruptor "monitorar", volumes | ⬜ Pendente | — | — |
| 11.4 | `paginas/grupoDetalhe.js` — abas: Mensagens (rolagem infinita), Estatísticas, Resumos, Alertas | ⬜ Pendente | — | — |
| 11.5 | Mensagens novas aparecem ao vivo no detalhe do grupo aberto | ⬜ Pendente | — | — |
| 11.6 | Commit da etapa | ⬜ Pendente | — | — |

**KPIs da Visão geral:** mensagens hoje · grupos monitorados/total · alertas abertos (por
severidade) · resumos gerados hoje · custo de IA no mês · estado da conexão.
*Verificação:* `node --check`; endpoints usados respondem via `curl`; visual → usuário confere.

---

## Etapa 12 — Dashboard: Resumos, Alertas, Busca, Configurações

**Status:** ✅ Concluído
**Plano detalhado:** `docs/etapa-12-paginas-gestao.md`

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 12.1 | `paginas/resumos.js` — lista por data/grupo, cartão do resumo (assuntos, tarefas, decisões…), botão "Gerar agora" com período e modelo | ⬜ Pendente | — | — |
| 12.2 | Exportar resumo (copiar texto / baixar `.md` gerado no navegador) | ⬜ Pendente | — | — |
| 12.3 | `paginas/alertas.js` — filtros (situação/severidade/grupo), marcar lido/resolvido, ir para a mensagem | ⬜ Pendente | — | — |
| 12.4 | Gestão de regras de alerta (criar/editar/ativar/remover) | ⬜ Pendente | — | — |
| 12.5 | `paginas/busca.js` — campo com debounce, resultados com trecho destacado e link | ⬜ Pendente | — | — |
| 12.6 | `paginas/configuracoes.js` — horário do resumo, modelos, retenção, contatos VIP, tema, uso de IA | ⬜ Pendente | — | — |
| 12.7 | Notificação do navegador (`Notification API`) para alertas `urgente` (opt-in) | ⬜ Pendente | — | — |
| 12.8 | Commit da etapa | ⬜ Pendente | — | — |

*Verificação:* `node --check`; fluxo de API via `curl`; visual → usuário confere.

---

## Etapa 13 — Entrega do resumo para mim mesmo (opcional)

**Status:** ✅ Concluído
**Objetivo:** Enviar o resumo diário consolidado ao próprio número do usuário.
⚠️ **Envia mensagem → pedir aprovação explícita do usuário antes de implementar.**

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 13.1 | Formatador texto WhatsApp (`*negrito*`, listas) do resumo consolidado | ⬜ Pendente | — | — |
| 13.2 | `entregadorResumo.js` — envia **somente** para `MEU_NUMERO` (trava no código) | ⬜ Pendente | — | — |
| 13.3 | Configuração liga/desliga (padrão: desligado) | ⬜ Pendente | — | — |
| 13.4 | Commit da etapa | ⬜ Pendente | — | — |

---

## Etapa 14 — Segurança e robustez

**Status:** 🔄 Em progresso
**Plano detalhado:** `docs/etapa-14-seguranca.md`

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 14.1 | Revisão XSS: buscar `innerHTML` em `public/` e eliminar uso com dados | ⬜ Pendente | — | — |
| 14.2 | Revisão SQL: confirmar 100% prepared statements | ⬜ Pendente | — | — |
| 14.3 | Cabeçalhos de segurança (CSP restrita a `'self'`, `X-Content-Type-Options`, `Referrer-Policy`) | ⬜ Pendente | — | — |
| 14.4 | Comparação de token em tempo constante (`crypto.timingSafeEqual`) + limite de tentativas | ⬜ Pendente | — | — |
| 14.5 | Limite de tamanho do corpo das requisições e validação de entrada nas rotas | ⬜ Pendente | — | — |
| 14.6 | Encerramento gracioso (SIGINT): fecha socket, SSE e banco | ⬜ Pendente | — | — |
| 14.7 | Tratamento de `unhandledRejection` / `uncaughtException` com log | ⬜ Pendente | — | — |
| 14.8 | Commit da etapa | ⬜ Pendente | — | — |

*Verificação:* `Select-String -Path public\js -Pattern innerHTML -Recurse`; `curl -I` mostra os
cabeçalhos; `npm run verificar` sem erros.

---

## Etapa 15 — Documentação final e entrega

**Status:** ⬜ Pendente

| Passo | Descrição | Status | Iniciado em | Concluído em |
|-------|-----------|--------|-------------|--------------|
| 15.1 | `README.md` — requisitos, instalação, `.env`, primeiro acesso (QR), uso, riscos | ⬜ Pendente | — | — |
| 15.2 | Conferir que todos os `docs/ORIENTACAO_JS_*.md` existem e estão atualizados | ⬜ Pendente | — | — |
| 15.3 | Revisão final das regras de código (`npm run verificar`, tamanhos de arquivo/função) | ⬜ Pendente | — | — |
| 15.4 | Validação completa pelo usuário (checklist abaixo) | ⬜ Pendente | — | — |
| 15.5 | Commit final + `graphify update .` | ⬜ Pendente | — | — |

**Checklist de validação do usuário:**
☐ QR aparece e conecta · ☐ grupos listados · ☐ monitorar liga/desliga · ☐ mensagens chegam ao
vivo · ☐ busca encontra · ☐ resumo sob demanda gerado · ☐ resumo diário automático gerado ·
☐ alerta de palavra-chave dispara · ☐ menção gera alerta · ☐ configurações salvam ·
☐ custo de IA aparece · ☐ tema escuro ok · ☐ celular (tela estreita) ok.

---

## 🧭 Decisões

| Data | Decisão | Motivo |
|------|---------|--------|
| 2026-10-03 | Opção A: Baileys (aparelho conectado), somente leitura | API oficial da Meta não lê grupos pessoais |
| 2026-10-03 | Frontend 100% vanilla (HTML/CSS/JS), gráficos em SVG próprio | Pedido do usuário |
| 2026-10-03 | Backend Node sem frameworks: `node:http`, `node:sqlite`, `fetch`, SSE | Coerência com "vanilla" e poucas dependências |
| 2026-10-03 | Claude API via `fetch` (sem SDK); Haiku 4.5 padrão, Sonnet 5.5 para análise | Custo baixo no volume diário, qualidade sob demanda |
| 2026-10-03 | Mídia não é baixada (só tipo + legenda) | Privacidade, espaço e risco |
| 2026-10-03 | Servidor só em `127.0.0.1` com token | Uso local e pessoal |

---

## 📓 Diário de Bordo

> Uma linha por mudança de status relevante. Mais recente no topo.
> Formato: `data hora | IA/modelo | etapa.passo | o que foi feito | arquivos | verificação`

| Data/hora | IA/modelo | Passo | O que foi feito | Arquivos | Verificação |
|-----------|-----------|-------|-----------------|----------|-------------|
| 2026-10-03 | Claude Opus 5.5 | 9.1–9.7 | Agendador próprio, resumo diário idempotente com recuperação, limpeza, análise IA, perguntas pendentes, reagendamento | src/agendador/*, src/index.js | script de agendador + app completo com curl |
| 2026-10-03 | Claude Opus 5.5 | 8.1–8.10 | 5 regras (Strategy), motor com anti-duplicação, analisador por IA, cadastro de regras, rotas de alertas | src/alertas/*, src/ia/prompts/promptAlertas.js, rotasAlertas.js | script em memória: regras, agrupamento, periódica, IA simulada |
| 2026-10-03 | Claude Opus 5.5 | 7.1–7.8 | Prompts (anti-injeção), divisão em blocos, ServicoResumo com consolidação, rotas de resumos | src/ia/*, src/servidor/rotas/rotasResumos.js | IA simulada: resumo salvo + erros 404/400/422 |
| 2026-10-03 | Claude Opus 5.5 | 6.1–6.7 | ClienteClaude via fetch (retry, timeout, recusa, fallbacks, effort por modelo, JSON com correção, custo) | src/ia/clienteClaude.js, src/ia/extratorJson.js | fetch simulado: retry, correção JSON, recusa, 400, sem chave |
| 2026-10-03 | Claude Opus 5.5 | 5.1–5.9 | Servidor node:http, roteador, auth por cookie/Bearer, estáticos, SSE, rotas de conexão/grupos/painel, serviços de estatísticas e configurações | src/servidor/*, src/servicos/*, src/index.js | bateria de curl (401, QR, 400, 404, traversal, cookie, CSP, SSE) |
| 2026-10-03 | Claude Opus 5.5 | 3.1–4.7 | Cliente Baileys (somente leitura), sincronizador de grupos, normalizador e coletor. 3.7/4.6 dependem do celular do usuário | src/whatsapp/*, src/index.js | normalizador com 7 casos; app chegou a aguardando_qr |
| 2026-10-03 | Claude Opus 5.5 | 1.1–2.9 | Fundação + banco (node:sqlite, migração V1, 7 repositórios) — commits 0765c17 e c8c3a1f | src/config, src/utilitarios, src/banco, docs/database.md | npm run verificar ok; script em :memory: validou FTS, totais, alertas, retenção |
| 2026-10-03 | Claude Opus 5.5 | 0.1–0.3 | Planejamento: CLAUDE.md, STATUS.md, repositório git | `CLAUDE.md`, `STATUS.md` | Leitura dos arquivos |

---

## ⚠️ Riscos

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Banimento do número pelo WhatsApp | Baixa/Média | Somente leitura, sem marcar online/lido, envio só para si mesmo e opcional; sugerir número secundário |
| Mudança na API do Baileys | Média | Consultar doc atual na Etapa 3; versão fixa no `package.json`; isolar em `whatsapp/` |
| `node:sqlite` ainda experimental (aviso no console) | Baixa | Isolado em `banco/conexao.js`; trocável por `better-sqlite3` se necessário |
| Custo da Claude API em grupos muito ativos | Média | Haiku por padrão, mínimo de mensagens, chunking, painel de custo |
| Vazamento de dados de terceiros | Baixa | Local only, token, `.gitignore` de `dados/`, retenção automática |
| Sessão expirar (logout remoto) | Média | Detectar `loggedOut`, voltar ao QR e alertar no dashboard |
