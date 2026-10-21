## Etapa 462-6432ca9c — Votação das equipes (nota de 1 a 10 da turma)

**Tarefa:** #333-6432ca9c-7a14-4b48-825c-517526fde7fd · **Pedido em:** 2026-10-21 15:27 · **Criada por:** Claude Code (Opus 5.5) (nuvem · elegant-planck-ul8ac1)
**Pedido:** "CRIE A TAREFA DA VOTAÇÃO NO SISTEMA,BASEADA NAS EQUIPES, MAS BEM SIMPLES E RAPIDO"
(contexto: a equipe elege um apresentador, a pergunta é sorteada, a equipe apresenta na sala e
todos os alunos dão uma nota de 1 a 10 para cada equipe que apresenta)
**Objetivo:** o professor abre a votação de uma equipe na hora da apresentação, os alunos da
turma votam de 1 a 10 pelo celular e o professor vê a média de cada equipe.

### Escopo (versão simples)

- **Entra:**
  - Banco: `votacao_equipe` (`atividade_id`, `equipe_id`, `aberta`, `aberta_em`, `fechada_em`;
    única em atividade + equipe) e `voto_equipe` (`votacao_id`, `aluno_id` = `auth.uid()`,
    `nota` 1–10; único em votação + aluno). SQL idempotente.
  - RLS: professor da turma da equipe abre/fecha e lê tudo; aluno da turma lê só a votação
    **aberta**; aluno grava **1 voto** por equipe, só com a votação aberta, só na própria turma e
    **nunca na própria equipe**; o aluno não vê o voto nem a média dos colegas; sem
    alterar/apagar voto (votou, está votado).
  - Professor (na página da atividade): bloco "🗳️ Votação das equipes" com uma linha por
    equipe ligada à atividade (`equipe_atividade`) da turma do combo: botão Abrir/Fechar,
    quantidade de votos e média, atualizados a cada 5 s.
  - Aluno (na página da atividade): card "Votar na Equipe X" com os botões 1 a 10, só enquanto a
    votação está aberta; depois de votar, "✅ Voto registrado".
  - Começa só na `ATIVIDADE-PESQUISA-INTERNET.html` da ITIC (módulo incluído pela página, como a
    #330); outras atividades com equipes depois, a pedido.
- **Não entra:** a média entrar na nota da atividade (só aparece para o professor); critérios
  separados (clareza, utilidade, fonte); sorteio da pergunta no sistema; exportar.

### Riscos

- Aluno votar na própria equipe ou mais de uma vez → barrado no banco (RLS + `unique`), não só
  na tela.
- Aluno ver as notas dos colegas → `select` do aluno em `voto_equipe` só do próprio voto; média
  só para o professor.
- Banco de produção → SQL idempotente, aplicado pelo Claude Code local, com autorização.

### Decisões

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 15:38 | Plano aprovado: escopo acima, versão simples | Usuário ("EXECUTE A 333 AGORA") |
| 2026-10-21 15:39 | Exceção à regra "banco só pelo Claude Code local" (`multiplas-ias.md`) **só para a #333.2**: esta sessão de nuvem aplica e confere o SQL pelo conector do Supabase | Usuário (resposta à pergunta "Aplicar daqui (exceção)") |

### #333.1 — Plano e aprovação do usuário

**Próximo passo:** — (concluída)

- **Nível:** PESADO — banco, RLS e regra de quem vota
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** escopo desta etapa aprovado pelo usuário (registrado em Decisões).
- **Entrega:** plano nesta etapa, aprovado em 2026-10-21 15:38 · **Verificação:** aprovação registrada em Decisões

### #333.2 — Banco: tabelas da votação, RLS e regra de voto

**Próximo passo:** — (concluída)

- **Nível:** PESADO — SQL, RLS e aplicação em produção
- **Modelo:** só Claude Code local (Opus 5.5+ ou Fable) — nunca outro (banco só local; exceção do usuário em 2026-10-21 15:39 para esta sessão de nuvem)
- **Critérios de aceitação:** SQL idempotente em `database/`, aplicado e registrado; testes por
  consulta: aluno não vota na própria equipe, não vota 2 vezes, não vota com a votação fechada,
  não lê voto de colega; professor lê a média; `docs/database.md` atualizado.
- **Entrega:** `database/2026-10-21-votacao-equipes.sql` (md5 `073966bd6082032c899fc660389f337b`),
  aplicado pelo conector (migração `votacao_equipes_333`) em 2026-10-21 15:56; `docs/database.md` e
  `docs/relatorio_verificacao_database.html` atualizados.
- **Desenho:** tabelas `votacao_equipe` e `voto_equipe` com RLS ligado **sem políticas** e sem
  privilégio para `anon`/`authenticated`; tudo pelas funções `security definer`
  `abrir_votacao_equipe(p_atividade, p_equipe, p_aberta)`, `votacoes_equipes_professor(p_atividade)`,
  `votacoes_abertas_aluno(p_atividade)` (`votacao_id`, `equipe_id`, `equipe_nome`, `ja_votei`) e
  `votar_equipe(p_votacao, p_nota)`.
- **Verificação:** consultas ao banco: RLS ligado, 0 políticas, `authenticated`/`anon` sem
  `select` nas tabelas, funções `security definer` só para `authenticated`. Teste simulado numa
  transação desfeita (atividade 166, EQUIPE 02, turma 135081): aluno não abre (42501); aluno
  não lê a tabela; professor abre; aluno de fora vê e vota 8; 2º voto recusado; `ja_votei` = 1;
  membro não vê nem vota na própria equipe; aluno não vê o resultado; professor vê 1 voto,
  média 8,0; votação fechada recusa voto. Depois: 0 votações e 0 votos gravados.

### #333.3 — Tela do professor: abrir/fechar a votação e ver as médias

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — JS de tela, até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** módulo `assets/js/votacao-equipes-professor.js` (+ CSS), incluído na
  `ATIVIDADE-PESQUISA-INTERNET.html`.
- **Critérios de aceitação:** linha por equipe da turma do combo com Abrir/Fechar, votos e
  média (5 s); `node --check` ok; conferir na tela (usuário).
- **Executor:** Claude Code (Sonnet · executor-medio) (nuvem · elegant-planck-ul8ac1), líder Opus 5.5
- **Entrega:** `assets/js/votacao-equipes-professor.js` e `assets/css/votacao-equipes.css` (novos)
  e link + script na `ATIVIDADE-PESQUISA-INTERNET.html` — 2026-10-21 15:58
- **Verificação:** `node --check` ok; linhas ≤ 100; diff conferido pelo líder (só os 3 arquivos;
  usa só `votacoes_equipes_professor` e `abrir_votacao_equipe`). Conferir na tela (usuário, como
  professor): bloco depois do progresso, Abrir/Fechar, votos e média a cada 5 s.

### #333.4 — Tela do aluno: card "Votar na Equipe X" (1 a 10)

**Próximo passo:** livre para Sonnet: ler a entrega da #333.2 (funções) e fazer o módulo.

- **Nível:** MEDIO — JS de tela, até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** módulo `assets/js/votacao-equipes-aluno.js` (+ CSS), incluído na mesma página.
- **Critérios de aceitação:** card só com votação aberta e para quem pode votar; 1 clique =
  voto; "✅ Voto registrado"; erro do banco vira mensagem simples; `node --check` ok; conferir
  na tela (usuário).
- **Entrega:** — · **Verificação:** —

### #333.5 — Documentação da votação das equipes

**Próximo passo:** esperar a #333.3 e a #333.4.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Descrição:** `docs/regras/atividades.md` e `docs/equipes-sala-de-aula.md`.
- **Entrega:** — · **Verificação:** —
