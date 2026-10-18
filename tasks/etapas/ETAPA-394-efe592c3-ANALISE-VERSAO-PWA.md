## Etapa 394-efe592c3 — Análise de viabilidade de uma versão PWA do site

**Tarefa:** #267-efe592c3-23bc-4360-afa7-33605f9e6dd3 · **Pedido em:** 2026-10-17 21:01 ·
**Criada por:** Qoder (local · main)
**Pedido:** "adicione 1 tarefa, para analisar a possibilidade de criar uma versão em PWA
(Progressive Web App), de forma detalhada e deixe no quadro de tarefas, esta nova versao, deve ficar
numa pasta de nome *pwa* em *C:\fontes\aulasenai\*"
**Objetivo:** estudar, antes de escrever qualquer código, se vale a pena e como fazer uma versão PWA
do site (instalável no celular e com algum funcionamento sem internet), que ficaria numa pasta nova
`pwa/` na raiz do projeto.

### Escopo (tarefa grande → o plano é esta etapa + aprovação do usuário)

**A análise tem de responder, com detalhe, a estes 7 pontos:**

1. **Situação atual do site:** quantas páginas existem e para quem são (aluno e professor), o que é
   arquivo estático, o que é gerado pelos geradores Python (`assets/gerador-indices/`) e o que só
   funciona falando com o Supabase na hora; onde o site está hospedado e se já serve HTTPS (sem
   HTTPS não existe PWA).
2. **O que um PWA exige e o que falta hoje:** `manifest.webmanifest` (nome, ícones 192 e 512, cor,
   `display`), service worker (registro, ciclo de vida, atualização), instalação no Android, no
   iOS e no computador, e o que cada um desses sistemas permite ou não permite.
3. **Cenários possíveis, com o custo e o risco de cada um:**
   - **A — Só instalável:** manifest + ícones + service worker mínimo; sem offline. Barato.
   - **B — Offline de leitura:** guardar no aparelho as páginas do aluno, apostilas e materiais já
     abertos; nada de banco offline. Médio.
   - **C — Offline com atividades:** o aluno responde sem internet, as respostas ficam no aparelho e
     são enviadas quando voltar a conexão (fila de sincronização). Caro e arriscado.
4. **Segurança (o ponto mais delicado):** o gabarito nunca pode parar no cache do aparelho do aluno;
   resposta autenticada não pode virar cache compartilhado entre usuários; a sessão/JWT do Supabase
   expira e o offline precisa se comportar bem quando expira; a RLS continua valendo igual; nenhuma
   chave `service_role` ou segredo vai para o client.
5. **Onde fica a versão e como ela convive com o site atual:** a pasta `pwa/` na raiz
   (`C:\fontes\aulasenai\pwa\`) é cópia, é gerada pelos mesmos geradores ou é outro deploy? Impacto
   no `.gitignore`, no `.vercelignore` e na publicação; risco de existirem duas fontes da mesma
   página e de uma ficar velha.
6. **Esforço e ordem de implantação:** o que dá para reaproveitar do que já existe (o
   `js/header-usuario.js` já entra em toda página e injeta CSS — é o ponto natural para registrar o
   service worker; a camada `celular.css` da #265 já cuida do layout no celular) e a lista das
   subtarefas futuras, cada uma com nível sugerido (`LEVE`/`MEDIO`/`PESADO`).
7. **Comparação e recomendação:** site como está hoje (responsivo), PWA nos cenários A, B e C, e app
   nativo/WebView — prós, contras e a recomendação final, dizendo com clareza se vale ou não vale e
   por quê.

**Não entra nesta tarefa:** escrever código do PWA, criar manifest ou service worker, mexer no
banco, mudar as páginas que já estão no ar e criar a pasta `pwa/` com outra coisa que não seja o
documento da análise. ⛔ Sem navegador (regra do projeto): nada de testar instalação — a análise é
por leitura de código, das regras do projeto e da documentação oficial de PWA.

**Pronto quando:** o documento `pwa/ANALISE-PWA.md` responder aos 7 pontos, com recomendação clara,
os riscos de segurança do item 4 tratados um a um, a lista de subtarefas futuras com nível, e o
resumo da recomendação registrado aqui na etapa.

**Premissas (o usuário confirma ou corrige):**

- O documento da análise fica em `pwa/ANALISE-PWA.md`; a pasta `pwa/` nasce com ele, e o código da
  versão PWA só vem depois, se a análise for aprovada.
- A análise olha o site inteiro (aluno e professor); se o PWA sair, a implantação começa pelo aluno,
  como foi na #265.
- Prioridade 🟡 Média (a prioridade é do usuário; é só pedir para mudar).

### Riscos

| Risco | Plano B |
|---|---|
| O service worker cachear resposta com gabarito e expor ao aluno | Regra dura na análise: nenhuma resposta autenticada entra em cache; gabarito só pelo caminho de hoje (RLS + RPC), nunca no aparelho |
| A pasta `pwa/` virar uma segunda cópia das páginas e ficar velha | A análise compara "gerar para `pwa/` com os mesmos geradores" contra "copiar arquivos" e recomenda um só caminho |
| Service worker antigo prender o aluno numa versão velha do site | O documento prevê versionamento de cache, como atualizar e como o aluno sai de uma versão quebrada |
| O iOS permitir menos que o Android (offline, instalação, armazenamento) | A análise diz o que o iOS permite hoje e o que não permite, e o cenário que ainda funciona nele |
| Análise virar implementação sem aprovação | Escopo fechado: só o documento; código do PWA vira tarefa nova, com plano novo |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 21:01 | Tarefa criada como análise (sem código) e com plano nesta etapa | Qoder (local · main) | Pedido do usuário; tarefa grande cria estrutura nova e toca em login e segurança |
| 2026-10-17 21:01 | Nível das 3 subtarefas: `PESADO` | Qoder (local · main) | Laya Server fora do ar; decidido pelos sinais (arquitetura, login/JWT, mais de 3 arquivos ligados) |

### #267.1 — Inventário do site e dos requisitos de PWA

**Próximo passo:** depois do "sim" do usuário ao plano — levantar quantas páginas existem, o que é
gerado, o que fala com o Supabase na hora e onde o site está hospedado (com HTTPS?).

- **Nível:** PESADO — arquitetura, login/JWT e mais de 3 arquivos ligados (Laya fora do ar; sinais da
  tabela de níveis).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** mapear o site como ele é hoje (páginas do aluno e do professor, geradores Python,
  `js/header-usuario.js`, `login.html`, CSS, hospedagem e `.vercelignore`) e listar o que um PWA
  exige que ainda não existe. Responde aos pontos 1 e 2 do escopo.
- **Critérios de aceitação:** inventário escrito na seção desta subtarefa, com números (quantas
  páginas, quantas geradas, quantas dependem do banco), o que já serve de base para PWA e o que
  falta; hospedagem e HTTPS confirmados por arquivo de configuração, não por suposição.
- **Verificação:** leitura dos arquivos citados (sem navegador) e conferência de que cada afirmação
  do inventário tem o arquivo de origem indicado.
- **Entrega:** — · **Anotação:** —

### #267.2 — Cenários de PWA, riscos de segurança e esforço

**Próximo passo:** esperar a #267.1.

- **Nível:** PESADO — segurança (gabarito, JWT, RLS) e arquitetura.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** detalhar os cenários A (só instalável), B (offline de leitura) e C (offline com
  atividades e fila de sincronização), e para cada um: o que muda no site, o que pode dar errado com
  o gabarito, com a sessão/JWT e com a RLS, quanto trabalho dá e o que o iOS permite. Responde aos
  pontos 3 e 4 do escopo.
- **Critérios de aceitação:** os 3 cenários comparados em tabela (mudança, risco de segurança,
  esforço, limitação no iOS), cada risco de segurança do item 4 do escopo com a sua resposta, e o
  cenário recomendado justificado.
- **Verificação:** conferência de que nenhuma estratégia de cache proposta guarda gabarito ou resposta
  autenticada, e de que a recomendação segue a regra de segurança do projeto
  (`.claude/rules/security-banco.md`).
- **Entrega:** — · **Anotação:** —

### #267.3 — Documento `pwa/ANALISE-PWA.md` com recomendação e plano de implantação

**Próximo passo:** esperar a #267.2.

- **Nível:** PESADO — consolida arquitetura e segurança; "na dúvida, sobe o nível".
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** escrever em `pwa/ANALISE-PWA.md` a análise completa (os 7 pontos do escopo), em
  linguagem que quem não é técnico entende, com a recomendação final (vale ou não vale, e qual
  cenário), o papel da pasta `pwa/` e a lista das subtarefas futuras de implantação, cada uma com
  nível sugerido. Responde aos pontos 5, 6 e 7 do escopo.
- **Critérios de aceitação:** `pwa/ANALISE-PWA.md` criado, com os 7 pontos respondidos, recomendação
  clara e lista de subtarefas futuras; resumo da recomendação registrado nesta etapa; nenhuma linha
  de código de PWA escrita; nada fora da pasta `pwa/` alterado.
- **Verificação:** leitura do documento contra o escopo desta etapa, item por item; `git diff` do
  commit mostrando só o documento novo e o quadro.
- **Entrega:** — · **Anotação:** —
