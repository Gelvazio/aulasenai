# Etapa 08 — Motor de alertas

**Criado em:** 2026-10-03 · **Concluído em:** 2026-10-03

| Passo | Descrição | Status |
|-------|-----------|--------|
| 8.1 | Contrato das regras + `regras/index.js` | ✅ Concluído |
| 8.2 | `palavraChave.js` | ✅ Concluído |
| 8.3 | `mencaoUsuario.js` | ✅ Concluído |
| 8.4 | `perguntaDireta.js` (periódica) | ✅ Concluído |
| 8.5 | `picoVolume.js` | ✅ Concluído |
| 8.6 | `autorVip.js` | ✅ Concluído |
| 8.7 | `motorAlertas.js` (anti-duplicação) | ✅ Concluído |
| 8.8 | `analisadorIa.js` + `prompts/promptAlertas.js` | ✅ Concluído |
| 8.9 | `servicoRegras.js` + `rotasAlertas.js` + `index.js` | ✅ Concluído |
| 8.10 | Commit | ✅ Concluído |

## Verificação executada (banco em memória, IA simulada)
Regra válida criada; 3 inválidas → 400. Quatro mensagens: palavra-chave (3 ocorrências agrupadas,
urgente), menção (atenção), VIP (3 agrupadas), mensagem própria ignorada; 7 eventos `alerta:novo`.
Pergunta de 62 min atrás → alerta periódico. IA simulada: 1 apontamento válido + 1 com número
inexistente (descartado); pendentes marcadas como analisadas.
