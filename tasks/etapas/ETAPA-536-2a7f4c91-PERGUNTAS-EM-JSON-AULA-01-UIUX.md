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
| 389.1 | Plano na etapa (schema, JSON, riscos) e aprovação do usuário | ⬜ |
| 389.2 | Gerar os JSON da Aula 01 (50 objetivas e 20 práticas) a partir do HTML/banco | ⬜ |
| 389.3 | Banco: restaurar itens, coluna/função de ativação, RLS | ⬜ |
| 389.4 | Páginas da Aula 01 lendo o JSON + ativação do banco | ⬜ |
| 389.5 | Controle do professor (quantas/quais ativas), docs e verificação | ⬜ |
