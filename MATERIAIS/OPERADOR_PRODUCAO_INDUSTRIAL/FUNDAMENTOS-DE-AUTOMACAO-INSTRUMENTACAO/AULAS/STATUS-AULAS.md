# 📊 STATUS DAS AULAS — Fundamentos de Automação/Instrumentação

> Controle da regra "GERAR E GRAVAR UMA AULA POR VEZ" do `CLAUDE.md` da raiz: uma aula só passa
> para a próxima quando todas as peças dela estão ✅ (ou ⛔ não se aplica).
> Legenda: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` · `⛔ Não se aplica / suspenso`.

**Atualizado em:** 2026-10-03

| Aula | Tema | Cap. | Aula `.md` | Fonte 50 questões | Página HTML | Índice | Seed | Banco (Supabase) | Prática |
|---|---|---|---|---|---|---|---|---|---|
| 01 | Sistemas de numeração | C1 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⛔ suspensa (fonte pronta) |
| 02 | Funções lógicas | C1 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⛔ suspensa (fonte pronta) |
| 03 | CLP: características e funcionamento | C1 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⛔ suspensa (fonte pronta) |
| 04 | CLP: arquitetura e hardware | C1 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⛔ suspensa |
| 05 | Linguagens de programação | C1 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⛔ suspensa |
| 06 | Estruturas de programação | C1 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⛔ suspensa |
| 07 | Supervisão local e remota; componentes | C2 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (liberada) | ⛔ suspensa |
| 08 | SCADA, IHM e funções básicas | C2 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (liberada) | ⛔ suspensa |
| 09 | Simbologia, malhas e sinais | C3 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (liberada) | ⛔ suspensa |
| 10 | Pressão | C4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (liberada) | ⛔ suspensa |
| 11 | Nível | C4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (liberada) | ⛔ suspensa |
| 12 | Vazão | C4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (liberada) | ⛔ suspensa |
| 13 | Temperatura: dilatação e termopar | C4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (liberada) | ⛔ suspensa |
| 14 | Temperatura: termorresistência (PT100) | C4 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (liberada) | ⛔ suspensa |
| 15 | Avaliação integradora | C1–C4 | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ | ⛔ |

## Onde fica cada peça

- Aula: `AULAS/AULA-NN.md`
- Fonte (fora do Git, tem gabarito): `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md`
- Página: `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html` (`assets/gerador-atividades/gerar_atividades.py --so=`)
- Índice: `ATIVIDADES/index.html` (`assets/gerador-indices/gerar_indices.py`)
- Seed: entrada em `ATIVIDADES_AUTOMACAO` de `scripts/gerar-seed-atividades.py` →
  `database/2026-10-03-automacao-instrumentacao-aulas-07-14-seed-atividades.sql` (fora do Git)
- Práticas discursivas: suspensas pelo professor em 2026-10-02.
- Banco: aulas 01–06 = atividades 43–48 (bloqueadas pelo professor); aulas 07–14 = atividades
  50–57, aplicadas em 2026-10-03 e conferidas por hash (entraram **liberadas**, padrão da coluna
  `atividade.ativo`; bloquear pelo interruptor do índice se necessário).
