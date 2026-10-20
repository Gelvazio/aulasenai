## Etapa 443-cf21e3c9 — #314: Desempenho das páginas de atividade e cache do site

**Tarefa:** #314-cf21e3c9-71eb-4697 · **Pedido em:** 2026-10-20 16:40 · **Criada por:** Claude Code (Opus 5.5) (local · main · s32)
**Pedido:** "por que esta tao pesado este site?" → "crie 1 tarefa detalhada pra melhorar o uso disso, e economizar cache"
**Objetivo:** a página de atividade fica pronta mais rápido (menos esperas em fila) e o navegador
reaproveita os arquivos já baixados (cache), sem mudar o que o aluno e o professor veem.

### Diagnóstico (2026-10-20, s32 — medido com `curl` e leitura do código, sem navegador)

Página de referência: `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/ATIVIDADES-7-DASHBOARDS-INTERATIVOS-E-INTEGRACAO-DE-DADOS-50-QUESTOES.html`

| Causa | Onde | Medida |
|---|---|---|
| Scripts carregados **em fila** | `assets/js/respostas-atividade.js` (`await carregarScript` em sequência: `popup.js` → `termos-tentativa.js` → `progresso-do-aluno.js` → `correcao-objetiva-aluno.js` → `minhas-respostas-objetiva.js`); `assets/js/avaliacao-discursiva.js` tem 19 `await carregarModuloDiscursiva` | 5 a 8 idas e voltas a mais por página (objetiva); mais na discursiva |
| Consultas ao banco **em fila** | `abrirRecursosDoAluno` (meu progresso → correção → meu gabarito, um `await` por vez) | consultas independentes esperando umas às outras |
| **Sem cache** nos arquivos do site | Vercel responde `Cache-Control: public, max-age=0, must-revalidate` para todo `.js`/`.css`; não existe `vercel.json` | ~20 revalidações a cada página aberta |
| Bibliotecas de PDF sempre carregadas | `jspdf.umd.min.js` (95 KB) + `jspdf.plugin.autotable` no `<head>`, sem `defer`, em **102** páginas; usadas só ao exportar (`atividade.js`, `exportar-pdf-discursiva.js`, `pdf-minhas-respostas.js`, `tabela-notas-professor.js`) | atrasam a montagem da página |
| Supabase **sem versão fixa** | `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2` em **203** páginas e em `js/header-usuario.js`, `assets/js/exportar-pagina.js`, `assets/js/menu-acao-equipes.js` | cache do CDN de 12 h; versão pode mudar sozinha |

Total baixado é pequeno (~200 KB compactados): o problema é **latência somada**, não tamanho.

### Escopo

- **Entra:** cabeçalhos de cache do site (`vercel.json`); carregamento em paralelo dos scripts e
  consultas de `respostas-atividade.js` e `avaliacao-discursiva.js`; jsPDF carregado só quando
  for usado; versão fixa do `supabase-js`; medição antes/depois; documentação.
- **Não entra:** mudar banco, RLS, telas ou textos; bundler/minificação (o site é estático, sem
  `package.json`); Service Worker/PWA (é a #267); mudar o conteúdo das questões.

### Critério de pronto

- `curl -sI` de um `.js`/`.css` do site mostra cache maior que zero (com revalidação em segundo
  plano), e o HTML continua sempre atualizado depois do deploy.
- Nenhum `await` em fila entre scripts/consultas independentes nos dois arquivos.
- Nenhuma página carrega jsPDF no `<head>`; exportar PDF continua funcionando.
- Nenhuma ocorrência de `supabase-js@2"`/`supabase-js@2'` sem versão completa.
- `node --check` em todo `.js` alterado; medição antes/depois registrada na Verificação.

### Riscos (com plano B)

| Risco | Plano B |
|---|---|
| Cache longo mostra JS antigo depois do deploy (o site não tem nome de arquivo com hash) | Cache **curto** (`max-age=300, stale-while-revalidate=86400`) para `.js`/`.css`; HTML com `max-age=0, must-revalidate`; nada de `immutable` |
| Carregar em paralelo quebra uma dependência entre scripts (um usa função do outro) | Baixar em paralelo, mas **executar** na ordem (pré-carregar com `Promise.all` e só chamar as funções depois); conferir cada dependência por leitura |
| Consultas em paralelo: falha de uma derruba as outras | `Promise.allSettled`, cada recurso com o próprio `try/catch` (como já é hoje) |
| jsPDF sob demanda falha sem internet no clique | Mensagem pelo `popup.js` ("Não foi possível carregar o gerador de PDF") |
| Versão fixa do Supabase com mudança de comportamento | Fixar na versão 2.x **que o CDN serve hoje** (conferir com `curl`), sem subir de versão |
| Mudança em massa (100+ páginas) com script | Script de substituição na pasta da sessão; conferir `git diff --numstat` (1 linha por página) antes do commit |
| Limite de deploys do Vercel (aconteceu em 2026-10-20) | Um commit por subtarefa, sem pushes extras; se travar, esperar o limite zerar |

### Decisões

| Quando | Quem | O quê |
|---|---|---|
| 2026-10-20 16:40 | Claude Code (Opus 5.5) (s32) | Tarefa grande (várias partes, mudança em massa): fica 👀 até o "sim" do usuário ao plano |

### #314.1 — Medir o antes (base de comparação)

**Próximo passo:** aguardar o "sim" ao plano.

- **Nível:** LEVE — só comandos de leitura (`curl`) e texto na etapa
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** com `curl -s -o /dev/null --compressed -w` medir tamanho e tempo da página de
  referência e dos seus arquivos; `curl -sI` dos cabeçalhos de cache; contar por leitura os
  `await` em fila nos dois arquivos JS. Gravar a tabela "Antes" nesta seção.
- **Critérios de aceitação:** tabela com arquivo, tamanho, tempo e `Cache-Control`.
- **Entrega:** — · **Verificação:** —

### #314.2 — Cabeçalhos de cache no `vercel.json`

**Próximo passo:** aguardar o "sim" ao plano.

- **Nível:** MEDIO — configuração nova do site inteiro, com regra por tipo de arquivo
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** criar `vercel.json` só com `headers`: `.js`/`.css`/fontes/imagens com
  `public, max-age=300, stale-while-revalidate=86400`; `.pdf` com `max-age=3600`; `.html` com
  `public, max-age=0, must-revalidate`. Não mexer em rotas nem no build. Conferir que o
  `.vercelignore` continua valendo.
- **Critérios de aceitação:** JSON válido (`node -e "JSON.parse(...)"`); depois do deploy,
  `curl -sI` mostra os cabeçalhos novos.
- **Entrega:** — · **Verificação:** —

### #314.3 — Objetiva: scripts e consultas em paralelo (`respostas-atividade.js`)

**Próximo passo:** aguardar o "sim" ao plano.

- **Nível:** MEDIO — lógica de carregamento em 1 arquivo JS
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** pré-carregar em paralelo (`Promise.all`) os scripts que a página sempre usa
  (`popup.js`, `termos-tentativa.js`) e, para o aluno logado, os três módulos do aluno; em
  `abrirRecursosDoAluno`, rodar meu progresso, correção e meu gabarito com `Promise.allSettled`.
  Guardar a promessa de cada `carregarScript` para não baixar o mesmo arquivo duas vezes.
  Manter limites (função ≤ 45 linhas, JSDoc, nomes em português).
- **Critérios de aceitação:** `node --check`; leitura confirma que nenhuma função usa outra
  antes de o script dela terminar; comportamento igual para aluno, professor e visitante.
- **Entrega:** — · **Verificação:** — (tela: avisar o usuário para testar como aluno e professor)

### #314.4 — Discursiva: módulos em paralelo (`avaliacao-discursiva.js`)

**Próximo passo:** aguardar o "sim" ao plano.

- **Nível:** MEDIO — lógica de carregamento em 1 arquivo JS
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** mapear as 19 chamadas `await carregarModuloDiscursiva` e as dependências entre
  módulos; baixar em paralelo os independentes, mantendo a ordem de execução onde um depende do
  outro (ex.: meu gabarito espera `liberacao`). Mesmo cuidado de não baixar duas vezes.
- **Critérios de aceitação:** `node --check`; tabela "módulo → depende de" nesta seção.
- **Entrega:** — · **Verificação:** —

### #314.5 — jsPDF só quando for exportar (código)

**Próximo passo:** aguardar o "sim" ao plano.

- **Nível:** PESADO — 4 arquivos JS ligados (`atividade.js`, `exportar-pdf-discursiva.js`,
  `pdf-minhas-respostas.js`, `tabela-notas-professor.js`)
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** criar `assets/js/carregar-jspdf.js` (uma função `garantirJsPdf()` que carrega
  `jspdf` + `autotable` uma única vez, com as mesmas URLs/versões de hoje) e chamar antes de cada
  geração de PDF nos 4 arquivos. Funciona com ou sem a tag no `<head>` (para não quebrar as
  páginas antes da #314.6).
- **Critérios de aceitação:** `node --check`; nenhum `window.jspdf` usado antes de
  `await garantirJsPdf()`.
- **Entrega:** — · **Verificação:** —

### #314.6 — Tirar o jsPDF do `<head>` das 102 páginas

**Próximo passo:** aguardar o "sim" ao plano.

- **Nível:** PESADO — mudança em massa (102 páginas)
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Depende de:** #314.5
- **Descrição:** script na pasta da sessão remove as 2 tags `<script>` do jsPDF de cada página
  que carrega um dos 4 arquivos da #314.5; páginas que usam jsPDF de outro jeito ficam como estão
  (listar na seção). Também ajustar os geradores que criam essas páginas, para não voltarem.
- **Critérios de aceitação:** `grep` não acha `jspdf.umd.min.js` em página que não precisa;
  `git diff --numstat` com só as linhas removidas.
- **Entrega:** — · **Verificação:** —

### #314.7 — Versão fixa do `supabase-js`

**Próximo passo:** aguardar o "sim" ao plano.

- **Nível:** PESADO — mudança em massa (203 páginas + 3 JS)
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** descobrir a versão 2.x exata que a jsDelivr serve hoje (`curl` no
  `@supabase/supabase-js@2/package.json`); trocar `supabase-js@2` por `supabase-js@2.<x>.<y>` nas
  páginas, em `js/header-usuario.js`, `assets/js/exportar-pagina.js`,
  `assets/js/menu-acao-equipes.js` e nos geradores. Uma constante só por arquivo JS.
- **Critérios de aceitação:** `grep` sem `supabase-js@2"` nem `supabase-js@2'`; `node --check`
  nos 3 JS.
- **Entrega:** — · **Verificação:** —

### #314.8 — Medir o depois e documentar

**Próximo passo:** aguardar o "sim" ao plano.

- **Nível:** LEVE — medição com `curl` e texto em `.md`
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Depende de:** #314.2 a #314.7
- **Descrição:** repetir a medição da #314.1 depois do deploy e gravar a tabela "Depois";
  registrar as regras novas (cache, jsPDF sob demanda, versão fixa) em
  `docs/regras/assets-e-geradores.md` e em `docs/HISTORICO-REGRAS.md`.
- **Critérios de aceitação:** tabelas antes × depois lado a lado; documentação atualizada.
- **Entrega:** — · **Verificação:** —
