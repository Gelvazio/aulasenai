# Testes de Front-End — atividades objetivas e práticas das aulas 01 a 03 + regra da atividade prática

**Criado em:** 2026-10-09 00:13:29 · **Concluído em:** 2026-10-09 00:39 (aguardando o aceite do usuário) · **Tempo decorrido:** 26 min
**Pedido do usuário (2026-10-09 00:13:29):** gerar as atividades objetivas das aulas 1 a 3 e as
práticas das aulas 1 a 3 de `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND`; as
práticas seguem a lógica da prova prática de Salete (`PROVA-PRATICA-01.html`, atividade id 82),
com tudo o que ela tem (Progresso, Gráficos, Cálculo Nota, correção etc.); salvar a regra em
`docs/REGRAS-ATIVIDADE-PRATICA.md` e criar no `CLAUDE.md` uma seção que aponte para ela.
**STATUS.md:** Etapa 108.

## Objetivo

Deixar as aulas 01 a 03 de Testes de Front-End com a atividade objetiva de 50 questões e a
atividade prática discursiva (no padrão da prova id 82), prontas no site e no banco, e registrar
esse padrão como regra do projeto.

## Escopo

- **Entra:** 3 atividades objetivas (50 questões cada); 3 atividades práticas discursivas;
  seeds do banco; índice da matéria; `STATUS-ATIVIDADES.md` e `AULAS/STATUS-AULAS.md`;
  `docs/REGRAS-ATIVIDADE-PRATICA.md`; seção no `CLAUDE.md` + versão/histórico; visualizador de
  regras passando a ler o arquivo novo.
- **Não entra:** aulas 04 a 10; avaliações objetivas/práticas finais e média final; slides;
  apostila; mudança de tabelas ou funções do banco; código JS novo (o Progresso, os Gráficos, o
  Cálculo Nota, a correção da IA, os botões Certa/Meia certa/Errada, o "Finalizar Atividade" e a
  prova corrigida para o aluno **já são globais** nas discursivas — basta a página ser gerada pelo
  gerador de discursivas com os campos da fonte).
- **Critério de pronto:** 3 páginas objetivas com exatamente 50 questões e sem gabarito no HTML;
  3 páginas práticas com os mesmos atributos da prova id 82 (`data-bloquear-colar`,
  `data-campo-tamanho-resposta`, `data-progresso-professor`, `data-ocultar-respostas-entregue`,
  botão gravar, `data-login`); seeds gerados e (se aprovado) aplicados e conferidos; índice
  listando as 6 páginas; regra gravada e visível no menu Regras; commit feito.
- **Premissas e restrições:** conteúdo só pelos Markdowns (`EMENTA-CHALKIE-AI.md`, `materia.json`,
  `CONTEUDO/AULA-0N-*.md`), nunca PDF; sem empresa fictícia ("Você, como aluno consultor...");
  uma aula por vez, completa; fontes com gabarito (`*QUESTOES.md`, `*GABARITO.md`) e seeds ficam
  fora do Git; sem testes automatizados; sem navegador.

## Dados conferidos (banco real, leitura em 2026-10-09)

- Matéria **id 48 "TESTES DE FRONTEND"**, curso "Técnico em Informática para Internet" (id 4),
  **0 aulas** no banco.
- Nenhuma turma cadastrada para o curso 4 → campo "Turma" das fontes fica vazio.

## Como cada peça será feita

### Atividade objetiva (por aula)

- Fonte `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-0N-50-QUESTOES.md` no formato da ITIC (cabeçalho com
  Aula, Tema, Conteúdo-base, Folha de respostas: sim; 50 `## ITEM` com Capacidade, Comando,
  Alternativas A–D e Gabarito; letras equilibradas 12–13 cada, posição sorteada).
- Página `ATIVIDADES/ATIVIDADES-AULA-0N-50-QUESTOES.html` por
  `assets/gerador-atividades/gerar_atividades.py --so=`.
- Seed: novo grupo `("Técnico em Informática para Internet", "TESTES DE FRONTEND", ...)` em
  `scripts/gerar-seed-atividades.py` — **cria as aulas 1 a 3** da matéria 48 no banco.

### Atividade prática (por aula) — padrão da prova id 82

- Fonte `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-0N.md` no formato discursivo (como a
  `PROVA-PRATICA-ADAG-SALETE.md`): cabeçalho com `Folha de respostas: sim`, `Aula no banco: N`,
  `Bloquear colar: sim`, `Campo do tamanho da resposta: sim`, `Botão gravar: sim`,
  `Progresso para o professor: sim`, `Ocultar respostas após entrega: sim`; "Como responder" e
  "Como a correção funciona"; tabela de cobertura da aula; cada `## ITEM` com Aula, Capacidade,
  Contexto ("Você, como aluno consultor..."), Comando e **3 tópicos (a, b, c)**.
- Padrão de resposta `ATIVIDADE-PRATICA-AULA-0N-GABARITO.md` (fora do Git) com as instruções
  para a IA corretora (nota cheia / metade / zero) e Resposta esperada + Critérios por tópico.
- Página `ATIVIDADES/ATIVIDADE-PRATICA-AULA-0N.html` e seed
  `database/<data>-atividade-pratica-aula-0N-seed-atividades.sql` por
  `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` (nasce bloqueada).
- ⚠️ Hoje esses arquivos `ATIVIDADE-PRATICA-AULA-0N.md` são **roteiros de laboratório** (mapa de
  conceitos, classificação de cenários...). Eles viram a base das questões e são **substituídos**
  pelo formato discursivo (o Git guarda a versão antiga) — ver a decisão D2.

### Regra

- `docs/REGRAS-ATIVIDADE-PRATICA.md`: o padrão acima (campos obrigatórios da fonte, estrutura das
  questões e tópicos, gabarito para a IA, recursos do professor e do aluno que vêm junto, passos
  de geração e banco, proibições).
- `CLAUDE.md`: seção "📝 REGRA — ATIVIDADE PRÁTICA (PADRÃO DA PROVA ID 82)" apontando para o
  arquivo; linha no índice; nova versão e linha no histórico (`CLAUDE.md` +
  `docs/HISTORICO-REGRAS.md`).
- `assets/js/regras-modal.js`: o padrão `PADRAO_ARQUIVOS_REGRAS` hoje só aceita `docs/regras/*.md`
  e o histórico; acrescentar `docs/REGRAS-ATIVIDADE-PRATICA.md` para o menu Regras mostrá-lo.

## Decisões pedidas ao usuário

| # | Pergunta | Proposta |
|---|---|---|
| D1 | Tamanho de cada prática | **10 questões × 3 tópicos (0,2 + 0,4 + 0,4 = 1,0)**, total 10 pontos, 90–120 min (cabe na aula de 4 h). A prova id 82 tinha 20 questões porque era prova de 7 aulas |
| D2 | Roteiros de laboratório atuais | Substituir pelo formato discursivo (o conteúdo do roteiro vira as situações das questões) |
| D3 | Banco | Aplicar os seeds no Supabase ao terminar as 3 aulas e conferir (objetivas primeiro, pois criam as aulas) |

## Passos

| Passo | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Regra: `docs/REGRAS-ATIVIDADE-PRATICA.md`, seção no `CLAUDE.md`, versão e histórico, visualizador | `docs/REGRAS-ATIVIDADE-PRATICA.md`, `CLAUDE.md`, `docs/HISTORICO-REGRAS.md`, `assets/js/regras-modal.js` | `node --check`; regex casa o link do `CLAUDE.md` (node) | ✅ Concluído |
| 2 | Aula 01 — objetiva: fonte, página, grupo no seed | `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-01-50-QUESTOES.md`, `.html`, `scripts/gerar-seed-atividades.py` | 50 itens; letras 12–13; "Gabarito" ausente do HTML | ✅ Concluído |
| 3 | Aula 01 — prática: fonte, gabarito, página, seed | `ATIVIDADE-PRATICA-AULA-01.md`, `-GABARITO.md`, `.html`, `database/*-seed-*.sql` | 10 itens × 3 tópicos; soma 10; atributos `data-*` iguais aos da id 82; padrão de resposta ausente do HTML | ✅ Concluído |
| 4 | Aula 01 — índice e status | `ATIVIDADES/index.html` (gerador de índices), `STATUS-ATIVIDADES.md`, `AULAS/STATUS-AULAS.md` | índice lista as páginas | ✅ Concluído |
| 5 | Aula 02 — passos 2 a 4 | idem, aula 02 | idem | ✅ Concluído |
| 6 | Aula 03 — passos 2 a 4 | idem, aula 03 | idem | ✅ Concluído |
| 7 | Seeds no Supabase (se D3 aprovada) | seeds das objetivas e das 3 práticas | consulta: 3 aulas na matéria 48, 6 atividades, 150 gabaritos, 90 tópicos | ✅ Concluído |
| 8 | Fechamento: `STATUS.md`, commit (sem fontes com gabarito e sem seeds), graphify | — | `git diff --cached --name-only` | ✅ Concluído |

## Riscos

| Risco | Plano B |
|---|---|
| Gerador de discursivas recusar a soma dos pontos (0,2+0,4+0,4) | Ajustar `Pontos por questão: 1,0` na fonte e conferir pela validação do gerador |
| Seed das práticas rodar antes das aulas existirem | Rodar sempre as objetivas primeiro |
| Seção nova no `CLAUDE.md` quebrar o visualizador | Conferir a regex com `node` na mesma tarefa |

## Resultado

- Decisões aprovadas (2026-10-09 00:20): D1 = 10 questões × 3 tópicos (0,2 + 0,4 + 0,4); D2 = roteiros
  substituídos pelo formato discursivo; D3 = seeds aplicados.
- Objetivas: `ATIVIDADES-AULA-01/02/03-50-QUESTOES.html` (50 itens cada, letras 13/13/12/12, sem
  gabarito no HTML) → banco ids **96, 97, 98** (letras conferidas com as fontes).
- Práticas: `ATIVIDADE-PRATICA-AULA-01/02/03.html` (10 questões, 30 tópicos, 10 pontos, mesmos
  atributos da prova id 82) → banco ids **99, 100, 101** (bloqueadas; 30 padrões de resposta cada).
- Regra: `docs/REGRAS-ATIVIDADE-PRATICA.md` + seção no `CLAUDE.md` + visualizador
  (`assets/js/regras-modal.js`).
- Desvios registrados na regra (seção "Cuidados aprendidos"): capacidades só C; campo vazio no
  cabeçalho; nome repetido do SQL das práticas; nome da matéria no SQL (`TESTES DE FRONTEND`);
  crases; gerador de índices apaga a faixa ensalado (índices atualizados só no trecho da matéria).
- Fora do Git (sem regra no `.gitignore` hoje): fontes `*QUESTOES.md`, `*-GABARITO.md` e seeds.
- Pendência: aceite do usuário (108.7).
