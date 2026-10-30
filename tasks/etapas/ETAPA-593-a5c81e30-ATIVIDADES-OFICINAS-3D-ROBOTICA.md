## Etapa 593-a5c81e30 — #436: Atividades das 9 aulas de Oficinas de Impressão 3D e Robótica

**Tarefa:** #436-a5c81e30 · **Pedido em:** 2026-10-30 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "DISPARE VARIOS AGENTES PRA FAZER TODAS AS TAREFAS DA MATERIA OFICINAS_IMPRESSAO_3D_ROBOTICA"; depois de eu perguntar se podia gerar as atividades das 9 aulas a partir dos Markdown atuais, o usuário respondeu "Sim, gerar".
**Objetivo:** ter, em `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/ATIVIDADES/`, uma objetiva de 50 questões e uma prática 10 × 3 para cada uma das 9 aulas, com índice e seeds, para destravar as tarefas #60 e #97.

### Escopo
- **Entra:** 9 objetivas (50 questões), 9 práticas (10 questões × 3 tópicos), índice/menu das atividades, seeds no banco e conferência final.
- **Não entra:** avaliações e média final, apostila, slides (a IA não gera), conteúdo das aulas (já existe em `CONTEUDO/`) e qualquer outra matéria.
- **Critério de pronto:** `STATUS-ATIVIDADES.md` com as 9 aulas ✅; seeds CONCLUÍDO em `database/SEEDS-APLICADOS.md`.

### Riscos
- Os 9 `CONTEUDO/AULA-NN-*.md` foram gerados por IA a partir da ementa (commit `3b01a2c0`), não dos slides do Chalkie. O usuário autorizou usá-los como base (2026-10-30). Quando vierem os slides, as atividades podem precisar de revisão.
- Seeds mexem no banco de produção: só o Claude Code local, pelo ciclo de `seeds.md`.

### Decisões
| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-30 | Plano aprovado: "Sim, gerar" (usar os Markdown atuais como base das atividades) | Usuário | resposta ao pedido de aprovação |
| 2026-10-30 | Avaliações, média final e apostila ficam fora desta tarefa | Claude Code (Sonnet 5.5) (local · main) | o usuário aprovou só "as atividades das 9 aulas" |
| 2026-10-30 | Opus não executa; as subtarefas vão para Haiku/Sonnet conforme o Jev | `niveis.md` | regra do projeto |

### #436.1 — Objetiva de 50 questões da aula 01 — Introdução a Impressão 3D e Tecnologias

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-01-INTRODUCAO-IMPRESSAO-3D.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md` (com gabarito, fora do site) e a página `ATIVIDADES-AULA-01-50-QUESTOES.html` pelo `assets/gerador-atividades/gerar_atividades.py --so=`. Modelo: as objetivas de `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`. Enunciados no papel "Você como aluno consultor", sem empresa fictícia.
- **Critérios de aceitação:** Exatamente 50 questões, 1 alternativa certa cada, só com base na aula; página gerada sem erro; nenhum gabarito no HTML.
- **Entrega:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md` + `ATIVIDADES-AULA-01-50-QUESTOES.html` (commit desta entrega). · **Verificação:** gerador devolveu 50 itens; `.md` com 50 ITEM e HTML com 50 cards; sem \"Ltda\"/empresa fictícia; HTML sem dados de gabarito; `.vercelignore` cobre `*QUESTOES.md`.

### #436.2 — Objetiva de 50 questões da aula 02 — Modelagem 3D com Tinkercad

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-02-MODELAGEM-3D-TINKERCAD.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-02-50-QUESTOES.md` (com gabarito, fora do site) e a página `ATIVIDADES-AULA-02-50-QUESTOES.html` pelo `assets/gerador-atividades/gerar_atividades.py --so=`. Modelo: as objetivas de `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`. Enunciados no papel "Você como aluno consultor", sem empresa fictícia.
- **Critérios de aceitação:** Exatamente 50 questões, 1 alternativa certa cada, só com base na aula; página gerada sem erro; nenhum gabarito no HTML.
- **Entrega:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-02-50-QUESTOES.md` + `ATIVIDADES-AULA-02-50-QUESTOES.html` (commit desta entrega). · **Verificação:** gerador devolveu 50 itens; `.md` com 50 ITEM e HTML com 50 cards; sem \"Ltda\"/empresa fictícia; HTML sem dados de gabarito; `.vercelignore` cobre `*QUESTOES.md`.

### #436.3 — Objetiva de 50 questões da aula 03 — Geração de Arquivos STL e Fatiamento

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-03-ARQUIVOS-STL-FATIAMENTO.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-03-50-QUESTOES.md` (com gabarito, fora do site) e a página `ATIVIDADES-AULA-03-50-QUESTOES.html` pelo `assets/gerador-atividades/gerar_atividades.py --so=`. Modelo: as objetivas de `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`. Enunciados no papel "Você como aluno consultor", sem empresa fictícia.
- **Critérios de aceitação:** Exatamente 50 questões, 1 alternativa certa cada, só com base na aula; página gerada sem erro; nenhum gabarito no HTML.
- **Entrega:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-03-50-QUESTOES.md` + `ATIVIDADES-AULA-03-50-QUESTOES.html` (commit desta entrega). · **Verificação:** gerador devolveu 50 itens; `.md` com 50 ITEM e HTML com 50 cards; sem \"Ltda\"/empresa fictícia; HTML sem dados de gabarito; `.vercelignore` cobre `*QUESTOES.md`.

### #436.4 — Objetiva de 50 questões da aula 04 — Operação de Impressoras 3D

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-04-OPERACAO-IMPRESSORAS-3D.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-04-50-QUESTOES.md` (com gabarito, fora do site) e a página `ATIVIDADES-AULA-04-50-QUESTOES.html` pelo `assets/gerador-atividades/gerar_atividades.py --so=`. Modelo: as objetivas de `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`. Enunciados no papel "Você como aluno consultor", sem empresa fictícia.
- **Critérios de aceitação:** Exatamente 50 questões, 1 alternativa certa cada, só com base na aula; página gerada sem erro; nenhum gabarito no HTML.
- **Entrega:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-04-50-QUESTOES.md` + `ATIVIDADES-AULA-04-50-QUESTOES.html` (commit desta entrega). · **Verificação:** gerador devolveu 50 itens; `.md` com 50 ITEM e HTML com 50 cards; sem \"Ltda\"/empresa fictícia; HTML sem dados de gabarito; `.vercelignore` cobre `*QUESTOES.md`.

### #436.5 — Objetiva de 50 questões da aula 05 — Introdução a Robótica

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-05-INTRODUCAO-ROBOTICA.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-05-50-QUESTOES.md` (com gabarito, fora do site) e a página `ATIVIDADES-AULA-05-50-QUESTOES.html` pelo `assets/gerador-atividades/gerar_atividades.py --so=`. Modelo: as objetivas de `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`. Enunciados no papel "Você como aluno consultor", sem empresa fictícia.
- **Critérios de aceitação:** Exatamente 50 questões, 1 alternativa certa cada, só com base na aula; página gerada sem erro; nenhum gabarito no HTML.
- **Entrega:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-05-50-QUESTOES.md` + `ATIVIDADES-AULA-05-50-QUESTOES.html` (commit desta entrega). · **Verificação:** gerador devolveu 50 itens; `.md` com 50 ITEM e HTML com 50 cards; sem \"Ltda\"/empresa fictícia; HTML sem dados de gabarito; `.vercelignore` cobre `*QUESTOES.md`.

### #436.6 — Objetiva de 50 questões da aula 06 — Componentes de Robôs

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-06-COMPONENTES-DE-ROBOS.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-06-50-QUESTOES.md` (com gabarito, fora do site) e a página `ATIVIDADES-AULA-06-50-QUESTOES.html` pelo `assets/gerador-atividades/gerar_atividades.py --so=`. Modelo: as objetivas de `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`. Enunciados no papel "Você como aluno consultor", sem empresa fictícia.
- **Critérios de aceitação:** Exatamente 50 questões, 1 alternativa certa cada, só com base na aula; página gerada sem erro; nenhum gabarito no HTML.
- **Entrega:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-06-50-QUESTOES.md` + `ATIVIDADES-AULA-06-50-QUESTOES.html` (commit desta entrega). · **Verificação:** gerador devolveu 50 itens; `.md` com 50 ITEM e HTML com 50 cards; sem \"Ltda\"/empresa fictícia; HTML sem dados de gabarito; `.vercelignore` cobre `*QUESTOES.md`.

### #436.7 — Objetiva de 50 questões da aula 07 — Programação de Robôs Simples

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-07-PROGRAMACAO-ROBOS-SIMPLES.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-07-50-QUESTOES.md` (com gabarito, fora do site) e a página `ATIVIDADES-AULA-07-50-QUESTOES.html` pelo `assets/gerador-atividades/gerar_atividades.py --so=`. Modelo: as objetivas de `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`. Enunciados no papel "Você como aluno consultor", sem empresa fictícia.
- **Critérios de aceitação:** Exatamente 50 questões, 1 alternativa certa cada, só com base na aula; página gerada sem erro; nenhum gabarito no HTML.
- **Entrega:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-07-50-QUESTOES.md` + `ATIVIDADES-AULA-07-50-QUESTOES.html` (commit desta entrega). · **Verificação:** gerador devolveu 50 itens; `.md` com 50 ITEM e HTML com 50 cards; sem \"Ltda\"/empresa fictícia; HTML sem dados de gabarito; `.vercelignore` cobre `*QUESTOES.md`.

### #436.8 — Objetiva de 50 questões da aula 08 — Projeto Integrado: Impressão 3D + Robótica

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-08-PROJETO-INTEGRADO-3D-ROBOTICA.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-08-50-QUESTOES.md` (com gabarito, fora do site) e a página `ATIVIDADES-AULA-08-50-QUESTOES.html` pelo `assets/gerador-atividades/gerar_atividades.py --so=`. Modelo: as objetivas de `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`. Enunciados no papel "Você como aluno consultor", sem empresa fictícia.
- **Critérios de aceitação:** Exatamente 50 questões, 1 alternativa certa cada, só com base na aula; página gerada sem erro; nenhum gabarito no HTML.
- **Entrega:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-08-50-QUESTOES.md` + `ATIVIDADES-AULA-08-50-QUESTOES.html` (commit desta entrega). · **Verificação:** gerador devolveu 50 itens; `.md` com 50 ITEM e HTML com 50 cards; sem \"Ltda\"/empresa fictícia; HTML sem dados de gabarito; `.vercelignore` cobre `*QUESTOES.md`.

### #436.9 — Objetiva de 50 questões da aula 09 — Apresentação de Projetos

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-09-APRESENTACAO-DE-PROJETOS.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-09-50-QUESTOES.md` (com gabarito, fora do site) e a página `ATIVIDADES-AULA-09-50-QUESTOES.html` pelo `assets/gerador-atividades/gerar_atividades.py --so=`. Modelo: as objetivas de `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`. Enunciados no papel "Você como aluno consultor", sem empresa fictícia.
- **Critérios de aceitação:** Exatamente 50 questões, 1 alternativa certa cada, só com base na aula; página gerada sem erro; nenhum gabarito no HTML.
- **Entrega:** `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-09-50-QUESTOES.md` + `ATIVIDADES-AULA-09-50-QUESTOES.html` (commit desta entrega). · **Verificação:** gerador devolveu 50 itens; `.md` com 50 ITEM e HTML com 50 cards; sem \"Ltda\"/empresa fictícia; HTML sem dados de gabarito; `.vercelignore` cobre `*QUESTOES.md`.

### #436.10 — Prática 10 × 3 da aula 01 — Introdução a Impressão 3D e Tecnologias

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-01-INTRODUCAO-IMPRESSAO-3D.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-01.md` + `-GABARITO.md` (fora do Git) e a página pelo gerador discursivo (`assets/gerador-avaliacao-discursiva/`), seguindo `docs/regras/atividades.md`. Papel "Você como aluno consultor".
- **Critérios de aceitação:** 10 questões, 3 tópicos cada (30 tópicos), 10 pontos no total, todo tópico com padrão de resposta no gabarito.
- **Entrega:** `ATIVIDADE-PRATICA-AULA-01.md`, `-GABARITO.md`, `.html` e seed `database/2026-10-30-atividade-pratica-aula-01-seed-atividades.sql`. · **Verificação:** gerador: 10 questões, 30 tópicos, 10 pontos, 0 tópicos sem padrão; `.md` com 10 ITEM, gabarito com 30 blocos, HTML com 30 tópicos; sem empresa fictícia; HTML sem padrão de resposta.

### #436.11 — Prática 10 × 3 da aula 02 — Modelagem 3D com Tinkercad

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-02-MODELAGEM-3D-TINKERCAD.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-02.md` + `-GABARITO.md` (fora do Git) e a página pelo gerador discursivo (`assets/gerador-avaliacao-discursiva/`), seguindo `docs/regras/atividades.md`. Papel "Você como aluno consultor".
- **Critérios de aceitação:** 10 questões, 3 tópicos cada (30 tópicos), 10 pontos no total, todo tópico com padrão de resposta no gabarito.
- **Entrega:** `ATIVIDADE-PRATICA-AULA-02.md`, `-GABARITO.md`, `.html` e seed `database/2026-10-30-atividade-pratica-aula-02-seed-atividades.sql`. · **Verificação:** gerador: 10 questões, 30 tópicos, 10 pontos, 0 tópicos sem padrão; `.md` com 10 ITEM, gabarito com 30 blocos, HTML com 30 tópicos; sem empresa fictícia; HTML sem padrão de resposta.

### #436.12 — Prática 10 × 3 da aula 03 — Geração de Arquivos STL e Fatiamento

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-03-ARQUIVOS-STL-FATIAMENTO.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03.md` + `-GABARITO.md` (fora do Git) e a página pelo gerador discursivo (`assets/gerador-avaliacao-discursiva/`), seguindo `docs/regras/atividades.md`. Papel "Você como aluno consultor".
- **Critérios de aceitação:** 10 questões, 3 tópicos cada (30 tópicos), 10 pontos no total, todo tópico com padrão de resposta no gabarito.
- **Entrega:** `ATIVIDADE-PRATICA-AULA-03.md`, `-GABARITO.md`, `.html` e seed `database/2026-10-30-atividade-pratica-aula-03-seed-atividades.sql`. · **Verificação:** gerador: 10 questões, 30 tópicos, 10 pontos, 0 tópicos sem padrão; `.md` com 10 ITEM, gabarito com 30 blocos, HTML com 30 tópicos; sem empresa fictícia; HTML sem padrão de resposta.

### #436.13 — Prática 10 × 3 da aula 04 — Operação de Impressoras 3D

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-04-OPERACAO-IMPRESSORAS-3D.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04.md` + `-GABARITO.md` (fora do Git) e a página pelo gerador discursivo (`assets/gerador-avaliacao-discursiva/`), seguindo `docs/regras/atividades.md`. Papel "Você como aluno consultor".
- **Critérios de aceitação:** 10 questões, 3 tópicos cada (30 tópicos), 10 pontos no total, todo tópico com padrão de resposta no gabarito.
- **Entrega:** `ATIVIDADE-PRATICA-AULA-04.md`, `-GABARITO.md`, `.html` e seed `database/2026-10-30-atividade-pratica-aula-04-seed-atividades.sql`. · **Verificação:** gerador: 10 questões, 30 tópicos, 10 pontos, 0 tópicos sem padrão; `.md` com 10 ITEM, gabarito com 30 blocos, HTML com 30 tópicos; sem empresa fictícia; HTML sem padrão de resposta.

### #436.14 — Prática 10 × 3 da aula 05 — Introdução a Robótica

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-05-INTRODUCAO-ROBOTICA.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-05.md` + `-GABARITO.md` (fora do Git) e a página pelo gerador discursivo (`assets/gerador-avaliacao-discursiva/`), seguindo `docs/regras/atividades.md`. Papel "Você como aluno consultor".
- **Critérios de aceitação:** 10 questões, 3 tópicos cada (30 tópicos), 10 pontos no total, todo tópico com padrão de resposta no gabarito.
- **Entrega:** `ATIVIDADE-PRATICA-AULA-05.md`, `-GABARITO.md`, `.html` e seed `database/2026-10-30-atividade-pratica-aula-05-seed-atividades.sql`. · **Verificação:** gerador: 10 questões, 30 tópicos, 10 pontos, 0 tópicos sem padrão; `.md` com 10 ITEM, gabarito com 30 blocos, HTML com 30 tópicos; sem empresa fictícia; HTML sem padrão de resposta.

### #436.15 — Prática 10 × 3 da aula 06 — Componentes de Robôs

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-06-COMPONENTES-DE-ROBOS.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-06.md` + `-GABARITO.md` (fora do Git) e a página pelo gerador discursivo (`assets/gerador-avaliacao-discursiva/`), seguindo `docs/regras/atividades.md`. Papel "Você como aluno consultor".
- **Critérios de aceitação:** 10 questões, 3 tópicos cada (30 tópicos), 10 pontos no total, todo tópico com padrão de resposta no gabarito.
- **Entrega:** `ATIVIDADE-PRATICA-AULA-06.md`, `-GABARITO.md`, `.html` e seed `database/2026-10-30-atividade-pratica-aula-06-seed-atividades.sql`. · **Verificação:** gerador: 10 questões, 30 tópicos, 10 pontos, 0 tópicos sem padrão; `.md` com 10 ITEM, gabarito com 30 blocos, HTML com 30 tópicos; sem empresa fictícia; HTML sem padrão de resposta.

### #436.16 — Prática 10 × 3 da aula 07 — Programação de Robôs Simples

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-07-PROGRAMACAO-ROBOS-SIMPLES.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-07.md` + `-GABARITO.md` (fora do Git) e a página pelo gerador discursivo (`assets/gerador-avaliacao-discursiva/`), seguindo `docs/regras/atividades.md`. Papel "Você como aluno consultor".
- **Critérios de aceitação:** 10 questões, 3 tópicos cada (30 tópicos), 10 pontos no total, todo tópico com padrão de resposta no gabarito.
- **Entrega:** `ATIVIDADE-PRATICA-AULA-07.md`, `-GABARITO.md`, `.html` e seed `database/2026-10-30-atividade-pratica-aula-07-seed-atividades.sql`. · **Verificação:** gerador: 10 questões, 30 tópicos, 10 pontos, 0 tópicos sem padrão; `.md` com 10 ITEM, gabarito com 30 blocos, HTML com 30 tópicos; sem empresa fictícia; HTML sem padrão de resposta.

### #436.17 — Prática 10 × 3 da aula 08 — Projeto Integrado: Impressão 3D + Robótica

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-08-PROJETO-INTEGRADO-3D-ROBOTICA.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-08.md` + `-GABARITO.md` (fora do Git) e a página pelo gerador discursivo (`assets/gerador-avaliacao-discursiva/`), seguindo `docs/regras/atividades.md`. Papel "Você como aluno consultor".
- **Critérios de aceitação:** 10 questões, 3 tópicos cada (30 tópicos), 10 pontos no total, todo tópico com padrão de resposta no gabarito.
- **Entrega:** `ATIVIDADE-PRATICA-AULA-08.md`, `-GABARITO.md`, `.html` e seed `database/2026-10-30-atividade-pratica-aula-08-seed-atividades.sql`. · **Verificação:** gerador: 10 questões, 30 tópicos, 10 pontos, 0 tópicos sem padrão; `.md` com 10 ITEM, gabarito com 30 blocos, HTML com 30 tópicos; sem empresa fictícia; HTML sem padrão de resposta.

### #436.18 — Prática 10 × 3 da aula 09 — Apresentação de Projetos

**Próximo passo:** reservar e gerar.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** —
- **Descrição:** Ler `MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/CONTEUDO/AULA-09-APRESENTACAO-DE-PROJETOS.md` e gerar `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-09.md` + `-GABARITO.md` (fora do Git) e a página pelo gerador discursivo (`assets/gerador-avaliacao-discursiva/`), seguindo `docs/regras/atividades.md`. Papel "Você como aluno consultor".
- **Critérios de aceitação:** 10 questões, 3 tópicos cada (30 tópicos), 10 pontos no total, todo tópico com padrão de resposta no gabarito.
- **Entrega:** `ATIVIDADE-PRATICA-AULA-09.md`, `-GABARITO.md`, `.html` e seed `database/2026-10-30-atividade-pratica-aula-09-seed-atividades.sql`. · **Verificação:** gerador: 10 questões, 30 tópicos, 10 pontos, 0 tópicos sem padrão; `.md` com 10 ITEM, gabarito com 30 blocos, HTML com 30 tópicos; sem empresa fictícia; HTML sem padrão de resposta.

### #436.19 — Índice, menu das atividades e status

**Próximo passo:** nenhum (entregue).

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** #436.1 a #436.18
- **Descrição:** Regerar `ATIVIDADES/index.html` e o menu pelo `assets/gerador-indices/gerar_indices.py` e atualizar `ATIVIDADES/STATUS-ATIVIDADES.md` e `STATUS_MATERIA.md`.
- **Critérios de aceitação:** Índice lista as 18 atividades; status das 9 aulas ✅ na coluna Página e Questões.
- **Entrega:** `ATIVIDADES/index.html` regerado com `gerar_indices.py --forcar`, `RIO_DO_SUL_MAIS_TECH/index.html` (card com 18 atividades) e `STATUS-ATIVIDADES.md`. · **Verificação:** o índice tem 18 páginas de atividade; só os dois `index.html` da matéria e do curso mudaram.

### #436.20 — Seeds no banco (objetivas e práticas)

**Próximo passo:** ⛔ Bloqueado em 2026-10-30: o conector Supabase (`execute_sql`) respondeu "You do not have permission to perform this action" até para `select 1`. Quando o acesso voltar: (1) conferir se a matéria "Oficinas de Impressão 3D e Robótica" e as 9 aulas existem no banco (uma consulta anterior indicou que a matéria não tem linha; criar matéria/aulas exige pedido do usuário, `scripts/seeds/README.md`); (2) as 9 práticas já têm seed em `database/2026-10-30-atividade-pratica-aula-NN-seed-atividades.sql`; (3) as 9 objetivas ainda NÃO têm seed: gerar o gabarito para o banco (`scripts/gerar-seed-atividades.py --so=...`, hoje fixo na matéria INTRODUCAO-TIC, precisa de adaptação); (4) registrar PENDENTE em `database/SEEDS-APLICADOS.md`, aplicar com `dividir_seed.py`, conferir md5 e marcar CONCLUÍDO.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** #436.19
- **Descrição:** Gerar os seeds, registrar PENDENTE em `database/SEEDS-APLICADOS.md`, aplicar em partes, conferir md5 e marcar CONCLUÍDO (autorização permanente de `seeds.md`). Só o Claude Code local.
- **Critérios de aceitação:** Todos os seeds da matéria CONCLUÍDO; coluna Banco do `STATUS-ATIVIDADES.md` em ✅.
- **Entrega:** — · **Verificação:** —

### #436.21 — Conferência final e entrega

**Próximo passo:** aguardar a dependência.

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Depende de:** #436.20
- **Descrição:** Contar questões e tópicos por página × banco, `node --check`/`py_compile` nos arquivos alterados e fechar a tarefa no quadro (commit + push).
- **Critérios de aceitação:** Contagem página × banco igual; quadro atualizado.
- **Entrega:** — · **Verificação:** —

### Observação (aula 04)
Em 26 das 50 questões da aula 04 a alternativa certa é a mais longa (pista para o aluno). Registrar como revisão futura; não bloqueia a entrega.
