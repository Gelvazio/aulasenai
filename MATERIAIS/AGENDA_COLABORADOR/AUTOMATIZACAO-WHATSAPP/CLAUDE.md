# CLAUDE.md — AUTOMATIZACAO-WHATSAPP

> Instruções específicas deste projeto. **Precedência máxima** sobre o `CLAUDE.md` global
> (`C:\Users\gelva\.claude\CLAUDE.md`), que continua valendo em tudo que não for contrariado aqui.

---

## 🚨 LEIA PRIMEIRO — RETOMADA DE TAREFA (qualquer IA)

Este projeto é construído em **etapas rastreadas no arquivo [`STATUS.md`](STATUS.md)**. Ele é a
**fonte única da verdade** sobre o andamento. Qualquer IA (Claude, GPT, Gemini etc.) que assumir o
projeto deve:

1. ✅ Ler este `CLAUDE.md` inteiro.
2. ✅ Ler o `STATUS.md` inteiro — principalmente **"Ponteiro de Retomada"** e **"Diário de Bordo"**.
3. ✅ Continuar **exatamente** do passo marcado como `🔄 Em progresso` (ou o primeiro `⬜ Pendente`).
4. ✅ Ler `docs/ORIENTACAO_*.md` do módulo antes de editar qualquer arquivo dele.
5. ✅ **Atualizar o `STATUS.md` a cada mudança de status** (ver "Protocolo de Status" abaixo).

❌ Nunca refazer passos `✅ Concluído` sem motivo registrado no Diário de Bordo.
❌ Nunca pular etapas: a ordem do `STATUS.md` respeita dependências.

---

## 🎯 Objetivo do Projeto

Sistema **local** que se conecta ao WhatsApp do usuário como **aparelho conectado** (biblioteca
Baileys), **coleta somente leitura** as mensagens dos grupos escolhidos, armazena em SQLite e usa a
**Claude API** para gerar **resumos, análises e alertas**, exibidos num **dashboard web**.

### Funcionalidades

| Área | O que faz |
|------|-----------|
| **Conexão** | QR code no dashboard, status online/offline, reconexão automática |
| **Grupos** | Lista de grupos, ligar/desligar monitoramento, volume de mensagens, membros mais ativos |
| **Mensagens** | Linha do tempo por grupo, busca textual (FTS5), filtros por data/autor |
| **Resumos** | Resumo diário automático por grupo + resumo sob demanda (período escolhido) |
| **Análises** | Assuntos, decisões, tarefas/pendências, perguntas sem resposta, links, tom/conflitos |
| **Alertas** | Palavras-chave, menção ao usuário, pergunta direta sem resposta, pico de volume, alerta por IA (urgência/conflito) |
| **Visão geral** | KPIs (mensagens hoje, grupos ativos, alertas abertos, custo de IA), gráfico de atividade |
| **Configurações** | Horário do resumo, modelo de IA, retenção de dados, regras de alerta, entrega do resumo |
| **Tempo real** | Novas mensagens e alertas chegam ao dashboard via SSE (Server-Sent Events) |

---

## 🧰 Stack — SOMENTE VANILLA

| Camada | Tecnologia | Observação |
|--------|-----------|------------|
| Runtime | **Node.js 24 LTS** (ES Modules, `"type": "module"`) | Instalado: v24.16 |
| WhatsApp | **`@whiskeysockets/baileys`** | Única forma de ler grupos pessoais (API oficial não permite) |
| Banco | **`node:sqlite`** (nativo do Node) + FTS5 | Sem ORM, SQL puro com prepared statements |
| Servidor HTTP | **`node:http`** nativo | ❌ Sem Express/Fastify |
| Tempo real | **SSE** com `node:http` | ❌ Sem Socket.IO |
| Agendador | `setTimeout`/`setInterval` próprios | ❌ Sem node-cron |
| IA | **Claude API via `fetch`** nativo | ❌ Sem SDK; ver seção "IA" |
| Variáveis de ambiente | `node --env-file=.env` | ❌ Sem dotenv |
| Frontend | **HTML + CSS + JavaScript vanilla** (ES Modules no navegador) | ❌ Sem React/Vue/jQuery/Tailwind/Bootstrap/Chart.js |
| Gráficos | **SVG gerado em JS vanilla** | Componente próprio |
| QR code | pacote `qrcode` (backend gera data URL PNG) | Única exceção de dependência visual |

**Dependências permitidas (`dependencies`):** `@whiskeysockets/baileys`, `qrcode`, `pino`
(logger exigido pelo Baileys). **Dev:** `eslint`, `prettier`.
❗ Qualquer dependência nova precisa de aprovação do usuário e registro no Diário de Bordo.

---

## 📁 Estrutura de Pastas (alvo)

```
AUTOMATIZACAO-WHATSAPP/
├─ CLAUDE.md                     ← este arquivo
├─ STATUS.md                     ← plano + status de todas as etapas (fonte da verdade)
├─ README.md                     ← como instalar e rodar
├─ package.json
├─ .env.example                  ← modelo (versionado); .env real NÃO é versionado
├─ .gitignore
├─ eslint.config.js / .prettierrc
├─ dados/                        ← ❌ NÃO versionar (sessão WhatsApp + banco)
│  ├─ sessao/                    ← credenciais do Baileys (useMultiFileAuthState)
│  └─ whatsapp.sqlite
├─ src/                          ← BACKEND (Node)
│  ├─ index.js                   ← composição: cria dependências e injeta (Dependency Inversion)
│  ├─ config/
│  │  ├─ constantes.js           ← TODOS os valores fixos do backend
│  │  └─ ambiente.js             ← leitura/validação de process.env
│  ├─ utilitarios/               ← logger, datas, texto, erros
│  ├─ banco/
│  │  ├─ conexao.js
│  │  ├─ migracoes.js            ← migrações versionadas (tabela schema_versao)
│  │  └─ repositorios/           ← um arquivo por tabela (grupoRepositorio.js, ...)
│  ├─ whatsapp/
│  │  ├─ clienteWhatsapp.js      ← conexão, QR, reconexão
│  │  ├─ normalizadorMensagem.js ← converte mensagem Baileys → objeto do domínio
│  │  └─ coletorMensagens.js     ← escuta eventos e grava
│  ├─ ia/
│  │  ├─ clienteClaude.js        ← fetch na Messages API, retry, registro de uso
│  │  ├─ prompts/                ← um arquivo por prompt
│  │  ├─ divisorBlocos.js        ← quebra conversas grandes (chunking)
│  │  └─ servicoResumo.js
│  ├─ alertas/
│  │  ├─ motorAlertas.js         ← executa as regras (Strategy)
│  │  └─ regras/                 ← uma regra por arquivo (palavraChave.js, mencao.js, ...)
│  ├─ agendador/
│  │  ├─ agendador.js
│  │  └─ tarefas/                ← resumoDiario.js, limpezaRetencao.js, analiseIa.js
│  └─ servidor/
│     ├─ servidorHttp.js
│     ├─ roteador.js             ← mapa rota → handler (Open/Closed)
│     ├─ eventosSse.js
│     ├─ arquivosEstaticos.js
│     ├─ autenticacao.js         ← token de acesso do dashboard
│     └─ rotas/                  ← um arquivo por recurso (grupos.js, alertas.js, ...)
├─ public/                       ← FRONTEND (servido pelo node:http)
│  ├─ index.html                 ← shell único (SPA com roteamento por hash)
│  ├─ css/
│  │  ├─ tokens.css              ← :root com variáveis (cores, espaçamentos, tema claro/escuro)
│  │  ├─ base.css
│  │  ├─ layout.css
│  │  └─ componentes.css
│  └─ js/
│     ├─ app.js                  ← inicialização
│     ├─ constantes.js           ← TODOS os valores fixos do frontend
│     ├─ api.js                  ← cliente HTTP (fetch) — única porta de acesso ao backend
│     ├─ eventos.js              ← cliente SSE (EventSource)
│     ├─ estado.js               ← estado global simples (pub/sub)
│     ├─ roteador.js             ← roteamento por hash (#/grupos, #/alertas ...)
│     ├─ componentes/            ← cartaoKpi.js, tabela.js, graficoBarras.js, modal.js, toast.js
│     └─ paginas/                ← visaoGeral.js, conexao.js, grupos.js, grupoDetalhe.js,
│                                   resumos.js, alertas.js, busca.js, configuracoes.js
└─ docs/
   ├─ ORIENTACAO_JS_<MODULO>.md  ← uma por módulo (criada na etapa que cria o módulo)
   ├─ database.md                ← schema completo
   └─ etapa-XX-<nome>.md         ← plano detalhado (com código) de cada etapa, criado ao iniciá-la
```

---

## 🗄️ Banco de Dados (resumo — detalhe em `docs/database.md`)

| Tabela | Conteúdo principal |
|--------|--------------------|
| `schema_versao` | versão das migrações aplicadas |
| `grupos` | `jid` (PK), `nome`, `descricao`, `total_participantes`, `monitorado` (0/1), `criado_em`, `atualizado_em` |
| `mensagens` | `id` (PK = id WhatsApp), `grupo_jid`, `autor_jid`, `autor_nome`, `tipo`, `texto`, `citada_id`, `menciona_usuario` (0/1), `enviada_em`, `recebida_em` |
| `mensagens_fts` | tabela virtual FTS5 sobre `texto` (busca) |
| `resumos` | `id`, `grupo_jid`, `periodo_inicio`, `periodo_fim`, `tipo` (diario/sob_demanda), `conteudo_json`, `modelo`, `criado_em` |
| `regras_alerta` | `id`, `tipo`, `parametros_json`, `grupo_jid` (null = todos), `ativa`, `severidade` |
| `alertas` | `id`, `regra_id`, `grupo_jid`, `mensagem_id`, `titulo`, `detalhe`, `severidade`, `situacao` (aberto/lido/resolvido), `criado_em` |
| `uso_ia` | `id`, `modelo`, `tokens_entrada`, `tokens_saida`, `custo_estimado`, `finalidade`, `criado_em` |
| `configuracoes` | `chave` (PK), `valor_json` |

- Datas em **ISO 8601 UTC** no banco; conversão para `America/Sao_Paulo` só na exibição.
- Mídia **não é baixada**: guardar só tipo + legenda (`[imagem] legenda`).
- Toda migração nova = nova versão em `migracoes.js` + atualizar `docs/database.md`.

---

## 🤖 IA — Claude API (via `fetch`)

- Endpoint: `POST https://api.anthropic.com/v1/messages`
- Cabeçalhos: `x-api-key: process.env.ANTHROPIC_API_KEY`, `anthropic-version: 2023-06-01`,
  `content-type: application/json`.
- Modelos (em `src/config/constantes.js`, configuráveis no dashboard):
  - **Padrão (resumos diários, triagem de alertas):** `claude-haiku-4-5` — barato.
  - **Análise profunda (sob demanda):** `claude-sonnet-5-5`.
- Respostas da IA sempre em **JSON estruturado** (pedir no prompt e validar com `JSON.parse` +
  checagem de campos). Se falhar, 1 nova tentativa pedindo correção; depois registrar erro.
- Conversas grandes: dividir em blocos (`divisorBlocos.js`), resumir cada bloco e consolidar.
- **Registrar todo uso** em `uso_ia` (tokens do campo `usage` da resposta) e mostrar custo no dashboard.
- Retry com backoff exponencial para HTTP 429/5xx (máx. 3 tentativas).
- Formato do resumo (JSON): `assuntos[]`, `decisoes[]`, `tarefas[] {descricao, responsavel}`,
  `perguntas_sem_resposta[]`, `links[]`, `mencoes_ao_usuario[]`, `tom` , `resumo_curto`.

---

## 🔒 Segurança, Privacidade e Risco de Banimento

1. **Somente leitura no WhatsApp.** O coletor NUNCA envia mensagens, exceto a funcionalidade
   opcional "enviar resumo para mim mesmo" (desligada por padrão, só para o próprio número).
2. Baileys: `markOnlineOnConnect: false`, não marcar mensagens como lidas, `syncFullHistory: false`.
3. Servidor escuta **apenas em `127.0.0.1`**; dashboard exige **token** (`DASHBOARD_TOKEN` no `.env`).
4. `.env`, `dados/` (sessão + banco) **nunca** são versionados.
5. Frontend: **nunca usar `innerHTML` com dados de mensagens** — usar `textContent`/`createElement`
   (proteção XSS, mensagens são conteúdo de terceiros).
6. Todo SQL com **prepared statements** (`?`), nunca concatenação.
7. LGPD: as mensagens são de terceiros. Retenção configurável (padrão 90 dias) com limpeza automática.
8. Conteúdo enviado à Claude API só dos grupos marcados como `monitorado = 1`.

---

## 📐 Regras de Código (resumo do CLAUDE.md global — obrigatórias)

- **SOLID** pragmático; dependências **injetadas** a partir de `src/index.js`.
- Arquivo ≤ **1000 linhas**; função ≤ **45 linhas**; linha ≤ **100 caracteres**.
- **JSDoc em todas as funções** (objetivo, parâmetros, retorno, exceções).
- **Return early**; aninhamento máx. **2 níveis**; condições compostas em booleanos nomeados.
- Máx. **3 parâmetros** por função (acima disso, objeto).
- **Nomes em português, sem acento**: `buscarGrupos`, `totalMensagens`, `.cartao-grupo`,
  `--cor-primaria`. Exceções: APIs/bibliotecas (`fetch`, `sock.ev.on`), palavras reservadas.
- **Constantes**: backend em `src/config/constantes.js`; frontend em `public/js/constantes.js`;
  CSS em `public/css/tokens.css` (`:root`). Proibido número/string mágica.
- `const` por padrão, nunca `var`; `async/await` com `try/catch`; sem ternário aninhado;
  sem código comentado/morto.
- HTML semântico, **sem `style=""` e sem `onclick`** inline. CSS com BEM (`.cartao--alerta`).
- Formatação: Prettier + ESLint (configs na raiz).

### 🚫 Proibições permanentes
- ❌ **Nunca escrever testes automatizados** (única exceção: reproduzir bug sendo corrigido).
- ❌ **Nunca abrir navegador** (preview, Playwright, screenshot) para validar. Validar com
  `node --check`, `curl`, consultas SQL e leitura do código. O que só der para ver no navegador →
  pedir ao usuário para conferir e registrar no Diário de Bordo.
- ❌ Nunca usar git worktree. ❌ Nunca `push` sem o usuário pedir. ❌ Nunca `--force`.

---

## 🔁 Protocolo de Status (OBRIGATÓRIO a cada mudança)

Ícones: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` · `⛔ Bloqueado/não aplicável`

1. **Ao iniciar um passo:** marcar `🔄`, preencher "Iniciado em" e atualizar o **Ponteiro de Retomada**.
2. **Ao concluir:** marcar `✅`, preencher "Concluído em", anotar a verificação feita e o que
   mudou no **Diário de Bordo** (data/hora, IA/modelo usado, resumo, arquivos).
3. **Ao travar:** marcar `⛔`, descrever o motivo e o que falta para destravar.
4. **Ao iniciar uma etapa:** criar `docs/etapa-XX-<nome>.md` com o código completo dos passos
   (padrão da skill `documentacao-padrao`) e pedir aprovação do usuário se a etapa mexer em
   banco, segurança ou envio de mensagens.
5. **Ao concluir uma etapa:** criar/atualizar `docs/ORIENTACAO_JS_<MODULO>.md` dos módulos criados,
   fazer **1 commit da etapa** e atualizar o grafo:
   ```powershell
   git add .
   git commit -m "etapa XX: <descrição>"
   C:\Python314\python.exe -m graphify update .
   ```
6. Mudança de escopo/decisão técnica → registrar em **"Decisões"** no `STATUS.md`.

---

## ▶️ Comandos do Projeto (após Etapa 1)

```powershell
npm install                 # instala dependências
npm run iniciar             # node --env-file=.env src/index.js
npm run verificar           # node --check em todos os .js + eslint
npm run formatar            # prettier --write .
```

Dashboard: `http://127.0.0.1:3210` (porta em `PORTA_SERVIDOR` no `.env`).
