# ETAPA 536 — Perguntas em arquivo JSON + ativação pelo banco (Aula 01 de Fundamentos de UI / UX)

- **TASK:** #389 (pedida em 2026-10-26) · **Tarefa grande: aguarda aprovação do plano**
- **Nível:** a classificar pelo Jev · **Publicada sem reserva** (pedido do usuário)

## Pedido

As perguntas devem ser lidas de **1 arquivo JSON** (no repositório/GitHub). O **banco** define se cada
pergunta está **ativa ou não**: sempre existirão as 50 objetivas (e todas as práticas) no JSON, mas só a
quantidade liberada pelo professor vai para os alunos. Mesma coisa para as perguntas práticas (também
em JSON). Fazer primeiro na Aula 01 de FUNDAMENTOS-DE-UI-UX.

## Pontos a definir no plano

- Estrutura do JSON (objetiva: item, título, capacidade, comando, alternativas; prática: item, contexto,
  comando, tópicos com enunciado e pontos). ⛔ Letra certa e resposta esperada **nunca** no JSON
  (só no banco, RLS).
- Banco: voltar às 50 objetivas e 20×3 práticas (backups `*_20261026_*` da #387) e marcar a ativação
  (ex.: coluna `ativo` por item/tópico ou quantidade liberada na atividade); função que devolve ao aluno
  só os itens ativos, sem o gabarito.
- Página carrega o JSON, mostra só os itens ativos e mantém `data-total`/pontos coerentes.
- Tela para o professor definir quantas/quais ficam ativas.

## Itens

| Item | Descrição | Status |
|---|---|---|
| 389.1 | Plano na etapa (schema, JSON, riscos) e aprovação do usuário | ✅ 2026-10-26 |
| 389.2 | Gerar os JSON da Aula 01 (50 objetivas e 20 práticas) a partir do HTML/banco | ✅ 2026-10-26 |
| 389.3 | Banco: restaurar itens, coluna/função de ativação, RLS | ✅ 2026-10-26 |
| 389.4 | Páginas da Aula 01 lendo o JSON + ativação do banco | ✅ 2026-10-26 |
| 389.5 | Controle do professor (quantas/quais ativas), docs e verificação | ✅ 2026-10-26 |

## Decisões e andamento (2026-10-26)

- Aprovada pelo usuário ("faça a 389 agora"). Reservada pela sessão atual.
- **Projeto:** o catálogo guarda TODAS as perguntas e a coluna `ativo`. `gabarito` e `topico_discursivo`
  viram **views** só com os itens ativos (`security_invoker`), então todo código e função que já lê essas
  tabelas continua igual e só enxerga o liberado. RPC `itens_ativos` (aluno, sem a resposta certa) e
  `liberar_itens` (só professor; recalcula os pontos dos tópicos ativos para somar 1 por item).
- **389.2 ✅** JSON gerados em `MATERIAIS/.../FUNDAMENTOS-DE-UI-UX/ATIVIDADES/DADOS/` (50 objetivas com 4
  alternativas; 20 práticas × 3 tópicos), sem resposta certa.
- **389.3 ✅ (aplicado após o usuário liberar `apply_migration`):** o SQL está em `database/2026-10-26-itens-ativos-aula01.sql`, mas o
  classificador do Claude Code bloqueou a aplicação (renomeia tabelas e cria views). Destrava: o usuário
  libera a ação ou roda o SQL no SQL Editor do Supabase.

**Próximo passo:** com o SQL aplicado, escrever `assets/js/perguntas-json.js` (lê o JSON + `itens_ativos`,
monta os cards antes dos demais scripts), trocar o HTML fixo das duas páginas da Aula 01 por um contêiner,
criar o controle do professor (chama `liberar_itens`) e conferir `node --check` + contagens no banco.

**Entrega 2026-10-26:** migração aplicada (`itens_ativos_aula01_catalogo_views`); `perguntas-json.js` e
`liberar-itens-professor.js`; páginas da Aula 01 (objetiva 190 e prática 168) trocadas por âncora + loader.
**Verificação:** `node --check` nos dois JS; banco: view `gabarito` da 190 = 20 de 50 no catálogo, view
`topico_discursivo` da 168 = 10 de 60 (soma de pontos 10,00); demais atividades intactas (5563/5593 e
2496/2546 = só as da 190 e 168 ficam inativas). **Não conferido no navegador** (regra do projeto): testar
as duas páginas logado como aluno e como professor, e a caixa "Liberar perguntas".
