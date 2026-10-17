## Etapa 339-12542c62 — #212: Excluir a atividade "Trabalho em equipe — Manual de Comunicação Técnica v2" (ITIC)

**Tarefa:** #212-12542c62-52d5-4af4-a177-a1bd2eed96d7 · **Pedido em:** 2026-10-16 19:40 ·
**Criada por:** Claude Code (Opus 5.5) (local · main · s15)
**Pedido:** "EXCLUA ESTA ATIVIDADE, DOS CARDS, DO BANCO E DA PASTA,
http://127.0.0.1:5501/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-v2.html"
**Pedido (2026-10-16 19:45, junto):** "FACA A MESMA COISA COM ESSA
http://127.0.0.1:5501/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA.html,
EXCLUA DO CARD, DO BANCO E DA PASTA"
**Objetivo:** tirar as 2 atividades (`TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA.html` e
`...-v2.html`) do índice ITIC, do banco e da pasta.

### Levantamento (2026-10-16 19:50)

| Página | `atividade` | Aula do card | Dados de aluno |
|---|---|---|---|
| `TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA.html` | id 58 | `aulas` 70 (nº 13, "Manual … (v1)"), só com esta atividade | nenhum (0 respostas, entregas, gabarito, tópicos, liberações, aberturas) |
| `TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-v2.html` | id 59 | `aulas` 71 (nº 14, "Manual … (versão simplificada)"), só com esta atividade | nenhum |

Cards: 2 `<article>` no `INTRODUCAO-TIC/ATIVIDADES/index.html` ("TRABALHO EM EQUIPE v1" e "v2").
Outras páginas que apontam para a v1: `TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-SIMPLES.html` e
`brainstorming.html` (link "← Trabalho em equipe"); `STATUS_MATERIA.md` lista as 2 páginas.

### Escopo

- **Entra:**
  1. Banco: apagar as linhas 58 e 59 da `atividade` (a cascata não leva nada: sem dados de aluno).
     Por regra (`security-banco.md`), o `DELETE` vai num SQL em `database/` para você rodar no
     SQL Editor; as aulas 70 e 71 ficam `excluido = 1` (o mesmo que o botão excluir aula faz),
     pelo conector.
  2. Cards: tirar os 2 `<article>` do índice ITIC (sem levar a sua mudança local na linha 148
     "AVALIAÇÃO 01-AULA-06-DISCURSIVA", que continua fora do commit).
  3. Pasta: apagar os 2 HTML; o link "← Trabalho em equipe" do `…-SIMPLES.html` e do
     `brainstorming.html` passa a voltar para o índice (`../index.html`); tirar as 2 linhas do
     `STATUS_MATERIA.md`.
- **Não entra:** `Brainstorming-Em-Equipe.pdf`, `…-SIMPLES.html`, `brainstorming.html` e os `.md`
  de planejamento ficam (só os links mudam); o seed antigo `database/2026-10-05-…sql` fica como
  histórico.

### Decisões

- **Aprovação:** plano aprovado pelo usuário em 2026-10-16 19:55 ("Sim, aprovo o plano da #212").

### Riscos

- Alguém com a página aberta perde a atividade → sem dados gravados, nada se perde.
- Plano B: o Git guarda os 2 HTML e o seed recria as atividades.

### Subtarefas planejadas (depois da aprovação)

- #212.2 — Banco: SQL do `DELETE` (você roda) + aulas 70/71 `excluido = 1` (PESADO)
- #212.3 — Cards, arquivos e links (MEDIO)
- #212.4 — Aceite do usuário

### #212.1 — Levantamento e plano (tarefa grande: apaga dados)

**Próximo passo:** — (concluída)

- **Nível:** PESADO — apagar dados do banco
- **Entrega:** levantamento e plano nesta etapa · **Verificação:** aprovação em Decisões.

### #212.2 — Banco: SQL do DELETE + aulas 70/71 excluídas

**Próximo passo:** — (concluída)

- **Nível:** PESADO — apagar dados do banco
- **Entrega:** `database/2026-10-16-excluir-trabalho-equipe-manual-itic.sql`; PARTE 1 aplicada
  pelo conector em 2026-10-16 19:47 (aulas 70 e 71 com `excluido = 1`).
- **Verificação:** o `update ... returning` devolveu as aulas 70 (nº 13) e 71 (nº 14) com
  `excluido = 1`. DELETE (PARTE 2) aplicado pelo conector em 2026-10-16 19:50, a pedido do
  usuário ("FINALIZE A TAREFA 212"): o `returning` devolveu as atividades 58 e 59. Revisão
  independente (workflow de 3 agentes, só leitura): 0 linhas de 58/59 em todas as tabelas
  (inclusive as sem chave estrangeira) e nenhuma coluna de texto do banco cita as 2 páginas.

### #212.3 — Cards, arquivos e links

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — HTML de até 3 arquivos + remoção de 2 arquivos
- **Entrega:** os 2 HTML apagados — foram juntos no commit `e5e66f29` da frente s14 (#213), que
  levou o `git rm` que estava no índice compartilhado; os 2 cards saíram do
  `INTRODUCAO-TIC/ATIVIDADES/index.html`; o "voltar" do `…-SIMPLES.html` e do `brainstorming.html`
  vai para `../index.html` (e saiu a frase "Veja a ficha em…" do brainstorming); 2 linhas a menos
  no `STATUS_MATERIA.md` (contagem 145 → 143); `docs/regras/usuarios-turmas-paginas-professor.md`
  não cita mais a v2 como página da restrição por turma. A mudança local do usuário no índice
  ("AVALIAÇÃO 01-AULA-06-DISCURSIVA") ficou fora do commit.
- **Verificação:** revisão independente (3 agentes, só leitura): nenhum `.html/.js/.json/.css`
  aponta para as 2 páginas; índice bem formado (15 `<article>` abertos e fechados, parser sem
  erro); diferença do arquivo de trabalho para o commit = só a linha do usuário.
- **Anotação (achados da revisão, fora do escopo):** sem link no site para `brainstorming.html`,
  `…-SIMPLES.html` e `Brainstorming-Em-Equipe.pdf` (ficaram de propósito); `restricao-turma.js` sem
  página que o use; atividade 84 (aula 81) aponta para
  `ATIVIDADE-GRANDE-02/TRABALHO-COMUNICACAO-TECNICA-v1.html`, que não existe (já era assim); a
  troca local dos nomes `CONTEUDO/6-…` e `7-…` (sem commit) quebra 2 botões "📚 Conteúdo" do índice
  se for commitada sem ajustar os links.

### #212.4 — Aceite do usuário

**Próximo passo:** — (aceite do usuário em 2026-10-16 21:08: "Aceito tudo").

- **Nível:** LEVE — conferência do usuário
