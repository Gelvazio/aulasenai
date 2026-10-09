> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 105 — Botões SOMENTE ENSALADO e VER TODAS MATÉRIAS na faixa de matérias (pedido em 2026-10-08 23:42:02)

Plano: [docs/somente-ensalado-materias.md](docs/somente-ensalado-materias.md) · Regra: `CLAUDE.md` global (seção "Faixa de matérias").

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 105.1 | Decisão do usuário: cadastrar as 20 matérias do curso 4 (Técnico em Informática para Internet) em `materia` | ✅ Concluído | 2026-10-08 23:44:57 | Usuário pediu a inserção via Supabase MCP |
| 105.2 | Ler `docs/ORIENTACAO_JS_SUPABASE.md` (feito; `ORIENTACAO_USUARIO.md` não lido) | ✅ Concluído | 2026-10-08 23:47:19 | sbGet/sbPatch conforme a orientação |
| 105.3 | `assets/js/faixa-materias-ensalado.js` (filtro + ON/OFF) | ✅ Concluído | 2026-10-08 23:47:19 | `node --check` OK |
| 105.4 | 25 `index.html` (ITIC 21, Operador 2, Logística 1, Gestão 1) com `data-curso-id` e scripts; Rio do Sul e Qualificação pendentes (ver 105.10) | ✅ Concluído | 2026-10-08 23:47:19 | grep: 25 páginas ligadas |
| 105.5 | Estilo dos botões em `assets/css/indice-atividades.css` | ✅ Concluído | 2026-10-08 23:47:19 | Leitura do CSS |
| 105.6 | Banco: 20 matérias inseridas em `materia` (curso_id 4, ensalado false) e ligadas em `cursomateria` (cursoid 4) | ✅ Concluído | 2026-10-08 23:44:57 | select: curso 4 = 20 matérias, 0 ensaladas |
| 105.7 | Regra salva no `CLAUDE.md` global | ✅ Concluído | 2026-10-08 23:42 | Leitura da seção "Faixa de matérias" |
| 105.8 | Commit local (sem push) | ⬜ Pendente | — | — |
| 105.9 | Aceite do usuário (testar na tela) | ⬜ Pendente | — | — |
| 105.10 | Pendente: ligar Rio do Sul Mais Tech (curso 1 ou 6? ambíguo) e Qualificação Profissional (sem curso no banco) — decisão do usuário | ⬜ Pendente | — | — |
| 105.11 | Descrições das matérias 25 (Logística), 27 (Gestão) e 28 (Operador) no banco ajustadas para os nomes dos cartões (já existiam; sem duplicatas). Valores antigos: 25 "Introdução à Tecnologia da Informação e Comunicação", 27 "Análise de Dados Aplicada à Gestão", 28 "Fundamentos de Automação/Instrumentação" | ✅ Concluído | 2026-10-08 23:51:12 | select: 3 linhas atualizadas |
