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
| 2026-10-20 20:25 | Usuário (Gelvazio), pelo Grok Bot | **"sim" ao plano**: mensagem "Faça 314". A pedido do usuário, as subtarefas rodam **em paralelo**, cada uma reservada pela própria frente: Grok Bot (principal) (nuvem · main) faz #314.1 e #314.8; #314.2, #314.3+#314.4, #314.5+#314.6 e #314.7 ficam com outras frentes (cada uma registra a sua reserva). Feito pelo Grok Bot a pedido explícito do usuário, mesmo com o Modelo da linha indicando outra IA |

### #314.1 — Medir o antes (base de comparação)

**Próximo passo:** — (concluída).

- **Nível:** LEVE — só comandos de leitura (`curl`) e texto na etapa
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** com `curl -s -o /dev/null --compressed -w` medir tamanho e tempo da página de
  referência e dos seus arquivos; `curl -sI` dos cabeçalhos de cache; contar por leitura os
  `await` em fila nos dois arquivos JS. Gravar a tabela "Antes" nesta seção.
- **Critérios de aceitação:** tabela com arquivo, tamanho, tempo e `Cache-Control`.
- **Executor:** Grok Bot (principal) (nuvem · main), a pedido do usuário ("Faça 314"), em 2026-10-20 20:29.
- **Entrega:** commit "#314.1" na `main` (este) · **Verificação:** tabela abaixo gerada por `curl` no site publicado (`https://aulasenai.vercel.app`, 2026-10-20 20:29); contagens por `grep` na `main`. Script da medição na pasta da sessão (`/workspace/s314/medir.sh`), reaproveitado na #314.8.

#### Antes (2026-10-20 20:29, `curl --compressed`, sem navegador)

| Arquivo | HTTP | Tamanho (compactado) | Tempo | Cache-Control |
|---|---|---|---|---|
| `página de referência (.html)` | 200 | 10516 B | 1.202541 s | `public, max-age=0, must-revalidate` |
| `../../../../js/header-usuario.js` | 200 | 7320 B | 0.693158 s | `public, max-age=0, must-revalidate` |
| `https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js` | 200 | 95394 B | 0.085306 s | `no-transform, public, s-maxage=30672000, max-age=30672000, immutable` |
| `https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js` | 200 | 10436 B | 0.100804 s | `no-transform, public, s-maxage=30672000, max-age=30672000, immutable` |
| `MENU-ATIVIDADES.js` | 200 | 468 B | 0.981550 s | `public, max-age=0, must-revalidate` |
| `../../../../js/menu.js` | 200 | 3366 B | 1.015557 s | `public, max-age=0, must-revalidate` |
| `../../../../assets/js/atividade.js` | 200 | 6898 B | 0.984824 s | `public, max-age=0, must-revalidate` |
| `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2` | 200 | 47442 B | 0.349577 s | `public, max-age=604800, s-maxage=43200` |
| `../../../../js/supabase.js` | 200 | 1631 B | 0.848083 s | `public, max-age=0, must-revalidate` |
| `../../../../js/login.js` | 200 | 3639 B | 1.034147 s | `public, max-age=0, must-revalidate` |
| `../../../../assets/js/indice-bloqueio-aula-config.js` | 200 | 748 B | 0.995217 s | `public, max-age=0, must-revalidate` |
| `../../../../assets/js/atividade-bloqueio-aula.js` | 200 | 2185 B | 0.681099 s | `public, max-age=0, must-revalidate` |
| `../../../../assets/js/respostas-atividade-banco.js` | 200 | 5647 B | 0.695211 s | `public, max-age=0, must-revalidate` |
| `../../../../assets/js/respostas-atividade.js` | 200 | 10150 B | 0.749188 s | `public, max-age=0, must-revalidate` |
| `../../../../assets/js/avaliacao-pdf-professor.js` | 200 | 2022 B | 0.835038 s | `public, max-age=0, must-revalidate` |
| `../../../../assets/css/atividade.css` | 200 | 1756 B | 0.709448 s | `public, max-age=0, must-revalidate` |
| `../../../../assets/css/capacidades.css` | 200 | 973 B | 0.961217 s | `public, max-age=0, must-revalidate` |
| `../../../../assets/css/respostas-atividade.css` | 200 | 4391 B | 0.767685 s | `public, max-age=0, must-revalidate` |
| `../../../../assets/css/menu.css` | 200 | 1158 B | 0.745467 s | `public, max-age=0, must-revalidate` |
| `assets/js/popup.js (carregado pelo respostas-atividade.js)` | 200 | 1961 B | 0.655776 s | `public, max-age=0, must-revalidate` |
| `assets/js/termos-tentativa.js (carregado pelo respostas-atividade.js)` | 200 | 1417 B | 0.759160 s | `public, max-age=0, must-revalidate` |
| `assets/js/progresso-do-aluno.js (carregado pelo respostas-atividade.js)` | 200 | 3023 B | 0.756684 s | `public, max-age=0, must-revalidate` |
| `assets/js/correcao-objetiva-aluno.js (carregado pelo respostas-atividade.js)` | 200 | 1942 B | 0.735639 s | `public, max-age=0, must-revalidate` |
| `assets/js/minhas-respostas-objetiva.js (carregado pelo respostas-atividade.js)` | 200 | 1666 B | 0.750494 s | `public, max-age=0, must-revalidate` |

- Scripts na página: 14 · bloqueantes no `<head>` (sem defer/async): 12
- `await carregarScript` em respostas-atividade.js: 12 · `await carregarModuloDiscursiva` em avaliacao-discursiva.js: 19 · `Promise.all`: 4
- Páginas .html com `jspdf.umd.min.js`: 102 · com `supabase-js@2"` sem versão completa: 208 arquivos · `vercel.json`: não existe
- Soma: 24 arquivos, ~226 KB compactados; 17 arquivos do próprio site com `max-age=0` (revalidam a cada abertura, ~0,7–1,0 s cada daqui).

### #314.2 — Cabeçalhos de cache no `vercel.json`

**Próximo passo:** plano aprovado (2026-10-20 20:25); pegar quando as dependências estiverem ✅.

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

**Próximo passo:** plano aprovado (2026-10-20 20:25); pegar quando as dependências estiverem ✅.

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

**Próximo passo:** plano aprovado (2026-10-20 20:25); pegar quando as dependências estiverem ✅.

- **Nível:** MEDIO — lógica de carregamento em 1 arquivo JS
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** mapear as 19 chamadas `await carregarModuloDiscursiva` e as dependências entre
  módulos; baixar em paralelo os independentes, mantendo a ordem de execução onde um depende do
  outro (ex.: meu gabarito espera `liberacao`). Mesmo cuidado de não baixar duas vezes.
- **Critérios de aceitação:** `node --check`; tabela "módulo → depende de" nesta seção.
- **Entrega:** — · **Verificação:** —

### #314.5 — jsPDF só quando for exportar (código)

**Próximo passo:** plano aprovado (2026-10-20 20:25); pegar quando as dependências estiverem ✅.

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

**Próximo passo:** plano aprovado (2026-10-20 20:25); pegar quando as dependências estiverem ✅.

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

**Próximo passo:** plano aprovado (2026-10-20 20:25); pegar quando as dependências estiverem ✅.

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

**Próximo passo:** plano aprovado (2026-10-20 20:25); pegar quando as dependências estiverem ✅.

- **Nível:** LEVE — medição com `curl` e texto em `.md`
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Depende de:** #314.2 a #314.7
- **Descrição:** repetir a medição da #314.1 depois do deploy e gravar a tabela "Depois";
  registrar as regras novas (cache, jsPDF sob demanda, versão fixa) em
  `docs/regras/assets-e-geradores.md` e em `docs/HISTORICO-REGRAS.md`.
- **Critérios de aceitação:** tabelas antes × depois lado a lado; documentação atualizada.
- **Entrega:** — · **Verificação:** —
