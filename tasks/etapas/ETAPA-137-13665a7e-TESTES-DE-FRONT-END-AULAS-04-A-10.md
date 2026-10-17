## Etapa 137-13665a7e — Testes de Front-End: objetivas e práticas das aulas 04 a 10 (tarefa #22-f79be83e-0418-43e8, pedida em 2026-10-09 23:04:01)

**Tarefa:** #22-f79be83e-0418-43e8
**Nível:** PESADO — gabarito das objetivas e padrão de resposta das práticas, mais de 3 arquivos ligados
**Próximo passo:** 22.5 — aula 08 (frente nuvem · ccr-04d42f6c-y5d6iz); aulas 04, 06 e 07 ✅; 22.2 (aula 05) só falta o banco (seeds APLICADO, conferir md5 e parte 2 da prática).

Pedido do usuário: "Continue testes de frontend". Plano: [docs/testes-frontend-aulas-04-a-10.md](../../docs/testes-frontend-aulas-04-a-10.md)
— segue as decisões já aprovadas na Etapa 108 (D1: prática 10 questões × 3 tópicos 0,2 + 0,4 + 0,4;
D2: roteiros de laboratório substituídos pelo formato discursivo; D3: seeds aplicados e conferidos).
⛔ Nesta sessão **não se mexe na matéria Banco de Dados** (pedido do usuário, 2026-10-09 23:00).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 22.1 | Aula 04 — objetiva 50 questões + prática discursiva + seeds aplicados e conferidos pelo md5 | ✅ Concluído | 2026-10-10 16:21 | Objetiva id 143 e prática id 144 (aula id 124); md5 do banco = arquivo; 50 itens e 30 tópicos (10 pontos) |
| 22.2 | Aula 05 — idem | ⬜ Pendente | — | idem |
| 22.3 | Aula 06 — objetiva 50 questões + prática discursiva + seeds gerados (aplicar = 22.8, frente local) | ✅ Concluído (sem banco) | 2026-10-16 21:19 | Pipeline sem erro: 50 itens (A13 B13 C12 D12), 10 questões × 30 tópicos = 10 pontos, 0 tópico sem padrão; HTML sem gabarito; seeds PENDENTE em `database/SEEDS-APLICADOS.md` |
| 22.4 | Aula 07 — objetiva 50 questões + prática discursiva + seeds gerados (aplicar = 22.8, frente local) | ✅ Concluído (sem banco) | 2026-10-16 21:22 | Pipeline sem erro: 50 itens (A13 B13 C12 D12), 10 questões × 30 tópicos = 10 pontos, 0 tópico sem padrão; HTML sem gabarito; seeds PENDENTE em `database/SEEDS-APLICADOS.md` |
| 22.5 | Aula 08 — idem | ⬜ Pendente | — | idem |
| 22.6 | Aula 09 — idem | ⬜ Pendente | — | idem |
| 22.7 | Aula 10 — idem | ⬜ Pendente | — | idem |
| 22.8 | Aplicar os seeds no Supabase (objetivas + práticas das aulas 04 a 10) e registrar em `database/SEEDS-APLICADOS.md` | ⬜ PENDENTE | — | Conferência pelo md5 (`scripts/seeds/`), uma aula por vez |
| 22.9 | Ementa ajustada para 14.800–14.950 caracteres (hoje 14.955) | ⬜ Pendente | — | `scripts/analise-materias.py` sem pendência de ementa |
| 22.10 | `scripts/analise-materias.py` e `tasks/ANALISE-MATERIAS-RELATORIO.json` | ⬜ Pendente | — | Testes de Front-End sem pendências |
| 22.11 | Aceite do usuário | ⬜ Pendente | — | — |

### Pedido e descrição (vindos do `TASKS.md` em 2026-10-13, sem alteração)

**Matéria:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/` · **Plano:** `docs/testes-frontend-aulas-04-a-10.md`.

- [ ] Aulas 04 a 10: objetiva de 50 questões + prática 10 × 3 (padrão id 82), uma por vez.
- [ ] Seeds aplicados e conferidos pelo md5 (`database/SEEDS-APLICADOS.md`).
- [ ] Ementa em 14.800–14.950 caracteres.
- [ ] Análise das matérias sem pendências em Testes de Front-End.
- [ ] Aceite do usuário.

### Decisões (continuação)

- **2026-10-16 21:14 — reserva passada para a frente nuvem · ccr-04d42f6c-y5d6iz** a pedido do usuário
  ("Fazer as atividades das aulas 06 a 10"), com a frente nuvem · claude/ola-zlzh8z parada desde
  2026-10-10 16:21. Esta frente faz os itens 22.3 a 22.7 **sem banco**: gera páginas, fontes e seeds
  (PENDENTE); aplicar os seeds (22.8) fica com o Claude Code local (`multiplas-ias.md`).
- **2026-10-16 — `scripts/testes-frontend/indice_tf.sh` corrigido:** o `rm` dos índices criados pelo gerador
  quebrava em pasta com espaço ("Testes de Sistemas-EXISTENTES") e a busca do card do curso não
  aceitava o botão da Apostila entre o título e a contagem.
