## Etapa 473-9c2f6a17 — Oficinas de Impressão 3D e Robótica: matéria completa (sem apostila)

**Tarefa:** #344-9c2f6a17-3d5b-4e80-a1c4-7b2e9f6d3a58 · **Pedido em:** 2026-10-22 09:18 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s37)
**Pedido:** "execute, mas nao faca a apostila agora, deixe a tarefa de apostila como pendente, pra outra IA fazer" (depois de "o que falta fazer na materia?")
**Objetivo:** deixar `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/` pronta (aulas, atividades, avaliações, seeds, índice, status) seguindo `docs/regras/materias.md`, exceto a apostila.

### Escopo

- **Entra:** `materia.json`, plano de aulas, 9 aulas em `CONTEUDO/`, 9 objetivas de 50 questões, 9 práticas 10 × 3, avaliações, média final, seeds, índice/menu/card e status.
- **Não entra:** a apostila (#344.34 fica ⬜ livre para outra IA); slides (a IA não gera); qualquer outra matéria.
- **Critério de pronto:** `STATUS_MATERIA.md` só com a apostila pendente e seeds CONCLUÍDO.

### Riscos

- Banco e geração em massa: tarefa **grande**. Seeds (#344.31) são PESADO e só o Claude Code local com Opus 5.5+/Fable os executa; as demais são MEDIO/LEVE.
- `STATUS-AULAS.md` marca a prática como ⛔ (não se aplica), mas a regra global pede prática por aula; seguimos a regra global (ver Decisões).
- A migração #25 (atividades só no banco) ainda não foi feita: vale o jeito atual (fontes `.md` + geradores).

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-22 09:18 | Plano aprovado: o usuário respondeu "execute" ao levantamento do que falta, com a ressalva de deixar a apostila pendente para outra IA | Usuário | escopo acima |
| 2026-10-22 09:18 | Prática por aula incluída (regra global de matérias §5), apesar do ⛔ no `STATUS-AULAS.md` | Claude Code (Sonnet 5.5) (local · main · s37) | `docs/regras/materias.md` |
| 2026-10-22 09:18 | #344.34 (apostila) fica livre e não é reservada por esta frente | Claude Code (Sonnet 5.5) (local · main · s37) | pedido do usuário |

### #344.1 — `materia.json` e `DOCUMENTACAO/PLANO-AULAS.md`

**Próximo passo:** ler a ementa e criar o `materia.json`.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** —
- **Descrição:** Copiar da `EMENTA-CHALKIE-AI.md` (36 h, 9 aulas) os dados da matéria para `materia.json` e criar o plano de aulas em `DOCUMENTACAO/`.
- **Critérios de aceitação:** JSON válido; capacidades C1… e S1…; 9 aulas com tema, horas, capacidades, conteúdos e indicadores.
- **Entrega:** — · **Verificação:** —

### #344.2 — Aula 01 em `CONTEUDO/` — Introdução a Impressão 3D e Tecnologias

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.1
- **Descrição:** Gerar `CONTEUDO/AULA-01-<DESCRICAO>.md` com as 10 partes de `docs/regras/materias.md` §3, só pela ementa e pelo `materia.json` (nunca PDF, sem slides).
- **Critérios de aceitação:** Roteiro soma 240 min; conhecimentos e capacidades com os códigos do `materia.json`.
- **Entrega:** — · **Verificação:** —

### #344.3 — Aula 02 em `CONTEUDO/` — Modelagem 3D com Tinkercad

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.1
- **Descrição:** Gerar `CONTEUDO/AULA-02-<DESCRICAO>.md` com as 10 partes de `docs/regras/materias.md` §3, só pela ementa e pelo `materia.json` (nunca PDF, sem slides).
- **Critérios de aceitação:** Roteiro soma 240 min; conhecimentos e capacidades com os códigos do `materia.json`.
- **Entrega:** — · **Verificação:** —

### #344.4 — Aula 03 em `CONTEUDO/` — Geração de Arquivos STL e Fatiamento

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.1
- **Descrição:** Gerar `CONTEUDO/AULA-03-<DESCRICAO>.md` com as 10 partes de `docs/regras/materias.md` §3, só pela ementa e pelo `materia.json` (nunca PDF, sem slides).
- **Critérios de aceitação:** Roteiro soma 240 min; conhecimentos e capacidades com os códigos do `materia.json`.
- **Entrega:** — · **Verificação:** —

### #344.5 — Aula 04 em `CONTEUDO/` — Operação de Impressoras 3D

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.1
- **Descrição:** Gerar `CONTEUDO/AULA-04-<DESCRICAO>.md` com as 10 partes de `docs/regras/materias.md` §3, só pela ementa e pelo `materia.json` (nunca PDF, sem slides).
- **Critérios de aceitação:** Roteiro soma 240 min; conhecimentos e capacidades com os códigos do `materia.json`.
- **Entrega:** — · **Verificação:** —

### #344.6 — Aula 05 em `CONTEUDO/` — Introdução a Robótica

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.1
- **Descrição:** Gerar `CONTEUDO/AULA-05-<DESCRICAO>.md` com as 10 partes de `docs/regras/materias.md` §3, só pela ementa e pelo `materia.json` (nunca PDF, sem slides).
- **Critérios de aceitação:** Roteiro soma 240 min; conhecimentos e capacidades com os códigos do `materia.json`.
- **Entrega:** — · **Verificação:** —

### #344.7 — Aula 06 em `CONTEUDO/` — Componentes de Robôs

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.1
- **Descrição:** Gerar `CONTEUDO/AULA-06-<DESCRICAO>.md` com as 10 partes de `docs/regras/materias.md` §3, só pela ementa e pelo `materia.json` (nunca PDF, sem slides).
- **Critérios de aceitação:** Roteiro soma 240 min; conhecimentos e capacidades com os códigos do `materia.json`.
- **Entrega:** — · **Verificação:** —

### #344.8 — Aula 07 em `CONTEUDO/` — Programação de Robôs Simples

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.1
- **Descrição:** Gerar `CONTEUDO/AULA-07-<DESCRICAO>.md` com as 10 partes de `docs/regras/materias.md` §3, só pela ementa e pelo `materia.json` (nunca PDF, sem slides).
- **Critérios de aceitação:** Roteiro soma 240 min; conhecimentos e capacidades com os códigos do `materia.json`.
- **Entrega:** — · **Verificação:** —

### #344.9 — Aula 08 em `CONTEUDO/` — Projeto Integrado: Impressão 3D + Robótica

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.1
- **Descrição:** Gerar `CONTEUDO/AULA-08-<DESCRICAO>.md` com as 10 partes de `docs/regras/materias.md` §3, só pela ementa e pelo `materia.json` (nunca PDF, sem slides).
- **Critérios de aceitação:** Roteiro soma 240 min; conhecimentos e capacidades com os códigos do `materia.json`.
- **Entrega:** — · **Verificação:** —

### #344.10 — Aula 09 em `CONTEUDO/` — Apresentação de Projetos

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.1
- **Descrição:** Gerar `CONTEUDO/AULA-09-<DESCRICAO>.md` com as 10 partes de `docs/regras/materias.md` §3, só pela ementa e pelo `materia.json` (nunca PDF, sem slides).
- **Critérios de aceitação:** Roteiro soma 240 min; conhecimentos e capacidades com os códigos do `materia.json`.
- **Entrega:** — · **Verificação:** —

### #344.11 — Objetiva de 50 questões da aula 01

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.2
- **Descrição:** Fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md` + página pelo `gerar_atividades.py`, lendo a aula 01.
- **Critérios de aceitação:** Exatamente 50 questões; gabarito 13/13/12/12; HTML sem gabarito; contexto "aluno consultor", sem empresa fictícia.
- **Entrega:** — · **Verificação:** —

### #344.12 — Objetiva de 50 questões da aula 02

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.3
- **Descrição:** Fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-02-50-QUESTOES.md` + página pelo `gerar_atividades.py`, lendo a aula 02.
- **Critérios de aceitação:** Exatamente 50 questões; gabarito 13/13/12/12; HTML sem gabarito; contexto "aluno consultor", sem empresa fictícia.
- **Entrega:** — · **Verificação:** —

### #344.13 — Objetiva de 50 questões da aula 03

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.4
- **Descrição:** Fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-03-50-QUESTOES.md` + página pelo `gerar_atividades.py`, lendo a aula 03.
- **Critérios de aceitação:** Exatamente 50 questões; gabarito 13/13/12/12; HTML sem gabarito; contexto "aluno consultor", sem empresa fictícia.
- **Entrega:** — · **Verificação:** —

### #344.14 — Objetiva de 50 questões da aula 04

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.5
- **Descrição:** Fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-04-50-QUESTOES.md` + página pelo `gerar_atividades.py`, lendo a aula 04.
- **Critérios de aceitação:** Exatamente 50 questões; gabarito 13/13/12/12; HTML sem gabarito; contexto "aluno consultor", sem empresa fictícia.
- **Entrega:** — · **Verificação:** —

### #344.15 — Objetiva de 50 questões da aula 05

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.6
- **Descrição:** Fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-05-50-QUESTOES.md` + página pelo `gerar_atividades.py`, lendo a aula 05.
- **Critérios de aceitação:** Exatamente 50 questões; gabarito 13/13/12/12; HTML sem gabarito; contexto "aluno consultor", sem empresa fictícia.
- **Entrega:** — · **Verificação:** —

### #344.16 — Objetiva de 50 questões da aula 06

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.7
- **Descrição:** Fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-06-50-QUESTOES.md` + página pelo `gerar_atividades.py`, lendo a aula 06.
- **Critérios de aceitação:** Exatamente 50 questões; gabarito 13/13/12/12; HTML sem gabarito; contexto "aluno consultor", sem empresa fictícia.
- **Entrega:** — · **Verificação:** —

### #344.17 — Objetiva de 50 questões da aula 07

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.8
- **Descrição:** Fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-07-50-QUESTOES.md` + página pelo `gerar_atividades.py`, lendo a aula 07.
- **Critérios de aceitação:** Exatamente 50 questões; gabarito 13/13/12/12; HTML sem gabarito; contexto "aluno consultor", sem empresa fictícia.
- **Entrega:** — · **Verificação:** —

### #344.18 — Objetiva de 50 questões da aula 08

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.9
- **Descrição:** Fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-08-50-QUESTOES.md` + página pelo `gerar_atividades.py`, lendo a aula 08.
- **Critérios de aceitação:** Exatamente 50 questões; gabarito 13/13/12/12; HTML sem gabarito; contexto "aluno consultor", sem empresa fictícia.
- **Entrega:** — · **Verificação:** —

### #344.19 — Objetiva de 50 questões da aula 09

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.10
- **Descrição:** Fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-09-50-QUESTOES.md` + página pelo `gerar_atividades.py`, lendo a aula 09.
- **Critérios de aceitação:** Exatamente 50 questões; gabarito 13/13/12/12; HTML sem gabarito; contexto "aluno consultor", sem empresa fictícia.
- **Entrega:** — · **Verificação:** —

### #344.20 — Prática 10 × 3 da aula 01

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.2
- **Descrição:** `ATIVIDADE-PRATICA-AULA-01.md` + `-GABARITO.md` e página pelo gerador discursivo.
- **Critérios de aceitação:** 10 questões, 30 tópicos, 10 pontos, 0 sem padrão de resposta.
- **Entrega:** — · **Verificação:** —

### #344.21 — Prática 10 × 3 da aula 02

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.3
- **Descrição:** `ATIVIDADE-PRATICA-AULA-02.md` + `-GABARITO.md` e página pelo gerador discursivo.
- **Critérios de aceitação:** 10 questões, 30 tópicos, 10 pontos, 0 sem padrão de resposta.
- **Entrega:** — · **Verificação:** —

### #344.22 — Prática 10 × 3 da aula 03

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.4
- **Descrição:** `ATIVIDADE-PRATICA-AULA-03.md` + `-GABARITO.md` e página pelo gerador discursivo.
- **Critérios de aceitação:** 10 questões, 30 tópicos, 10 pontos, 0 sem padrão de resposta.
- **Entrega:** — · **Verificação:** —

### #344.23 — Prática 10 × 3 da aula 04

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.5
- **Descrição:** `ATIVIDADE-PRATICA-AULA-04.md` + `-GABARITO.md` e página pelo gerador discursivo.
- **Critérios de aceitação:** 10 questões, 30 tópicos, 10 pontos, 0 sem padrão de resposta.
- **Entrega:** — · **Verificação:** —

### #344.24 — Prática 10 × 3 da aula 05

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.6
- **Descrição:** `ATIVIDADE-PRATICA-AULA-05.md` + `-GABARITO.md` e página pelo gerador discursivo.
- **Critérios de aceitação:** 10 questões, 30 tópicos, 10 pontos, 0 sem padrão de resposta.
- **Entrega:** — · **Verificação:** —

### #344.25 — Prática 10 × 3 da aula 06

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.7
- **Descrição:** `ATIVIDADE-PRATICA-AULA-06.md` + `-GABARITO.md` e página pelo gerador discursivo.
- **Critérios de aceitação:** 10 questões, 30 tópicos, 10 pontos, 0 sem padrão de resposta.
- **Entrega:** — · **Verificação:** —

### #344.26 — Prática 10 × 3 da aula 07

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.8
- **Descrição:** `ATIVIDADE-PRATICA-AULA-07.md` + `-GABARITO.md` e página pelo gerador discursivo.
- **Critérios de aceitação:** 10 questões, 30 tópicos, 10 pontos, 0 sem padrão de resposta.
- **Entrega:** — · **Verificação:** —

### #344.27 — Prática 10 × 3 da aula 08

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.9
- **Descrição:** `ATIVIDADE-PRATICA-AULA-08.md` + `-GABARITO.md` e página pelo gerador discursivo.
- **Critérios de aceitação:** 10 questões, 30 tópicos, 10 pontos, 0 sem padrão de resposta.
- **Entrega:** — · **Verificação:** —

### #344.28 — Prática 10 × 3 da aula 09

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.10
- **Descrição:** `ATIVIDADE-PRATICA-AULA-09.md` + `-GABARITO.md` e página pelo gerador discursivo.
- **Critérios de aceitação:** 10 questões, 30 tópicos, 10 pontos, 0 sem padrão de resposta.
- **Entrega:** — · **Verificação:** —

### #344.29 — Avaliações objetivas 01 e 02 e avaliação prática

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.11 a #344.28
- **Descrição:** Pesos e instrumentos pela ementa (`avaliacao` do `materia.json`); fontes e páginas (`docs/regras/materias.md` §6).
- **Critérios de aceitação:** Questões novas cobrindo as aulas do período por igual; avaliação prática 20 × 3.
- **Entrega:** — · **Verificação:** —

### #344.30 — Média final (`media-final.json` e `AVALIACAO-MEDIA-FINAL.html`)

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.29
- **Descrição:** `gerar_avaliacao_media_final.py` (com `--propor`), pesos da ementa.
- **Critérios de aceitação:** Página gerada e pesos somando 100.
- **Entrega:** — · **Verificação:** —

### #344.31 — Seeds no banco (objetivas, práticas e avaliações)

**Próximo passo:** aguardar a dependência.

- **Nível:** PESADO — banco (seeds)
- **Modelo:** só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Effort:** high
- **Depende de:** #344.29, #344.30
- **Descrição:** Gerar seeds, registrar PENDENTE em `database/SEEDS-APLICADOS.md`, aplicar em partes, conferir md5 e marcar CONCLUÍDO (autorização permanente de `seeds.md`). Só o Claude Code local.
- **Critérios de aceitação:** Todos os seeds da matéria CONCLUÍDO; coluna Banco dos status em ✅.
- **Entrega:** — · **Verificação:** —

### #344.32 — Índice, menu das atividades e card do curso

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.31
- **Descrição:** `gerar_indices.py --forcar`, `MENU-ATIVIDADES.js` e card da matéria no `index.html` do curso.
- **Critérios de aceitação:** Índice com um card por aula do banco; guarda de sessão nas páginas.
- **Entrega:** — · **Verificação:** —

### #344.33 — Status e conferência final

**Próximo passo:** aguardar a dependência.

- **Nível:** LEVE — conferência e status
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Depende de:** #344.32
- **Descrição:** `gerar_status_materia.py`, atualizar `STATUS-AULAS`/`STATUS-ATIVIDADES` e rodar `scripts/analise-materias.py`.
- **Critérios de aceitação:** `STATUS_MATERIA.md` sem pendência além da apostila.
- **Entrega:** — · **Verificação:** —

### #344.34 — Apostila (PENDENTE de propósito, para outra IA)

**Próximo passo:** aguardar a dependência.

- **Nível:** MEDIO — conteúdo em Markdown/JSON e geradores, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Depende de:** #344.2 a #344.10
- **Descrição:** `APOSTILA/CONTEUDO/INTRODUCAO.md` + `CAPITULO-NN.md`, Markdown completo e HTML (`docs/regras/apostilas.md`). Deixada livre a pedido do usuário em 2026-10-22 09:18: nenhuma frente desta sessão pega esta subtarefa.
- **Critérios de aceitação:** Conferência 100% com a ementa; sem gabarito; identificação de autor, versão, data e hora.
- **Entrega:** — · **Verificação:** —
