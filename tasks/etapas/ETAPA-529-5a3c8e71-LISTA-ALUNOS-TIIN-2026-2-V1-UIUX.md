# ETAPA 529 — Lista de alunos da turma T TIIN 2026/2 V1 (Fundamentos de UI / UX)

- **TASK:** #380 (pedida em 2026-10-26)
- **Nível:** `MEDIO` (só Sonnet; pedido direto do usuário nesta sessão)

## Pedido

Gerar a lista de alunos a inserir da turma T TIIN 2026/2 V1 (134407), UC Fundamentos de UI / UX, a
partir de `assets/Lista de Presença-SENAI-TARDE.pdf`, para `scripts/criarUsuariosBancoDados.html`
(que lê `scripts/LISTAPRESENCA.js`).

## Itens

| Item | Descrição | Status |
|---|---|---|
| 380.1 | Nova entrada em `scripts/LISTAPRESENCA.js`: UC, turma 134407, 22 alunos (nome, e-mail `primeiro.ultimo@senai.local`, senha inicial aleatória). CPF do PDF não entra | ✅ 2026-10-26 |

**Premissas (não constam no PDF):** turno Tarde (arquivo TARDE, sigla V1), unidade 1 e local iguais
aos da turma T TIIN 2026/1 M1. Ajustar `unidadeId`/`local` se for outra unidade.
**Não feito:** criar os usuários no Supabase Auth (o usuário faz pela página, com Live Server local).
**Verificação:** `node` carrega o arquivo; 22 alunos; e-mails sem repetição com a lista existente.
