## Etapa 318-05ad7d1d — Atividade de sala 16-10 (ITIC) como discursiva no banco, ligada à Aula 04

**Tarefa:** #191-05ad7d1d-5b45-424f-b5d4-1a6d5d8406f0 · **Pedido em:** 2026-10-16 09:38 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "TEM COMO COLOCAR ESTA ATIVIDADE NO BANCO DE DADOS E LIGAR ELA NA AULA 04?" →
"PAGINA AVULSA SAI;DEVE SER 1 ATIVIDADE DISCURSIVA,COM OPCAO DE CORRECAO POR IA, USE AS PERGUNTAS
OBJETIVAS PRA TRANSFORMAR EM DISCURSIVA"
**Objetivo:** a atividade de sala de 16-10 (#189) vira **uma atividade discursiva** no banco, com
correção por IA, ligada à Aula 04 da ITIC; as 12 objetivas viram perguntas de resposta escrita e a
página avulsa sai.

### Escopo

- **Entra:**
  - Fonte `INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-SALA-AULA-16-10-2026-DISCURSIVA.md` no
    formato das discursivas (`## ITEM NN`, Contexto, Comando, Tópicos), "você como aluno
    consultor", **20 questões × 0,5 = 10 pontos** (1 tópico cada), no modelo da discursiva de
    sexta (id 81): as **12 objetivas** da #189 reescritas como perguntas de resposta escrita
    (itens 01-12) e as **5 situações práticas** em 8 itens (13-20: e-mail em 2, pasta, permissões
    em 2, ordem dos passos, riscos, solução).
  - `CONTEUDO/ATIVIDADE-SALA-AULA-16-10-2026-DISCURSIVA-GABARITO.md`: padrão de resposta e
    critérios (nota cheia / metade / zero) de cada tópico, usados pela **correção por IA**
    (`correcao-discursiva.html`). Fica no Git e fora do site (`.vercelignore`).
  - Gerar com `assets/gerador-avaliacao-discursiva` a página
    `ATIVIDADES/ATIVIDADE-SALA-AULA-16-10-2026-DISCURSIVA.html` e o seed
    `database/2026-10-16-atividade-sala-aula-16-10-2026-discursiva-seed-atividades.sql`
    (`Aula no banco: 4` → aula id 24 da INTRODUCAO TIC, junto da objetiva id 6 e da prática id 41).
  - Aplicar o seed (ciclo autorizado em `seeds.md`), conferir md5 dos tópicos e registrar em
    `database/SEEDS-APLICADOS.md`. A atividade **nasce bloqueada** (`ativo = false`): o professor
    libera no card da Aula 04.
  - Tirar a página avulsa da #189: apagar `ATIVIDADE-SALA-AULA-16-10-2026/` (HTML, CSS e 3 JS);
    o Markdown da aula 4 que estava na pasta fica.
  - Linha nova em `ATIVIDADES/STATUS-ATIVIDADES.md`.
- **Não entra:** mudar o código global das discursivas (correção por IA, PDF, progresso — já
  valem para toda discursiva); mexer na objetiva (id 6) e na prática (id 41) da Aula 04.
- **Critério de pronto:** atividade no banco ligada à aula 24, 20 tópicos com padrão e critérios,
  md5 igual ao do arquivo, página aberta pelo card da Aula 04, página avulsa removida, aceite.

### Riscos

- **Regra da #25** (`atividades-banco.md`): "não criar página nova por aula fora do plano da
  #25", que ainda está pendente. A página gerada segue o jeito atual (página + fonte por
  atividade); quando a #25 for feita, esta entra na migração junto com as outras. Exige o "sim"
  do usuário a esta exceção.
- **Seeds antigos APLICADO** (`SEEDS-APLICADOS.md`, linhas 81, 84, 85 — Banco de Dados e Testes
  de Front-End) são das tarefas #20/#22, reservadas por frentes de nuvem: ficam com elas
  (exceção de `seeds.md`).
- Seed aplicado errado → plano B: o seed é idempotente (`on conflict (pagina)` + recria os
  tópicos), basta corrigir a fonte, regerar e aplicar de novo.

### Decisões

- 2026-10-16 09:38 — usuário: página avulsa sai; **1 atividade discursiva** com correção por IA;
  as objetivas viram discursivas.
- 2026-10-16 09:43 — usuário aprovou o plano, **incluindo a exceção à regra da #25** ("Sim, aprovo o
  plano da #191, incluindo a exceção à regra da #25. Pode executar.").

### #191.1 — Plano na etapa e aprovação do usuário

**Próximo passo:** — (plano aprovado em 2026-10-16 09:43).

- **Nível:** PESADO — banco (atividade, tópicos, seed) e gabarito/padrão de resposta.

### #191.2 — Fonte e gabarito em Markdown (20 questões)

**Próximo passo:** — (entregue).

- **Nível:** PESADO — padrão de resposta (gabarito) da correção por IA.
- **Entrega:** `CONTEUDO/ATIVIDADE-SALA-AULA-16-10-2026-DISCURSIVA.md` (20 itens × 0,5, 1 tópico
  cada, "Aula no banco: 4", bloquear colar e campo do tamanho da resposta) e
  `CONTEUDO/ATIVIDADE-SALA-AULA-16-10-2026-DISCURSIVA-GABARITO.md` (resposta esperada e critérios
  cheia/metade/zero de cada tópico).
- **Verificação:** formato conferido com o gerador (`## ITEM NN`, tópicos `- a) ... (0,5)`,
  `### ITEM NN-a`); o gerador valida total e pontos na #191.3.

### #191.3 — Gerar a página e o seed

**Próximo passo:** rodar o gerador na pasta ATIVIDADES da ITIC.

- **Nível:** MEDIO — gerador Python, 2 arquivos gerados.

### #191.4 — Aplicar o seed, conferir md5 e registrar

**Próximo passo:** depois da #191.3.

- **Nível:** PESADO — banco (só Claude Code local).

### #191.5 — Remover a página avulsa e atualizar o STATUS-ATIVIDADES

**Próximo passo:** depois da #191.4.

- **Nível:** LEVE — apagar arquivos da #189 e uma linha de Markdown.

### #191.6 — Aceite do usuário

**Próximo passo:** 👀 o usuário libera a atividade no card da Aula 04 e confere a página.

- **Nível:** LEVE — conferência do usuário.
