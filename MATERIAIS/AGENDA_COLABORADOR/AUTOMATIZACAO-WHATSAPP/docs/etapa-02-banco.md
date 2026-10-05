# Etapa 02 — Banco de dados

**Objetivo:** Conexão `node:sqlite`, migração V1 (todas as tabelas + FTS5) e repositórios.
**Criado em:** 2026-10-03 · **Concluído em:** 2026-10-03

| Passo | Descrição | Status |
|-------|-----------|--------|
| 2.1 | `src/banco/conexao.js` | ✅ Concluído |
| 2.2 | `src/banco/migracoes.js` V1 + dados padrão | ✅ Concluído |
| 2.3 | `grupoRepositorio.js` | ✅ Concluído |
| 2.4 | `mensagemRepositorio.js` (FTS, perguntas sem resposta, retenção) | ✅ Concluído |
| 2.5 | `resumoRepositorio.js` | ✅ Concluído |
| 2.6 | `alertaRepositorio.js` + `regraAlertaRepositorio.js` | ✅ Concluído |
| 2.7 | `usoIaRepositorio.js` + `configuracaoRepositorio.js` + `index.js` | ✅ Concluído |
| 2.8 | `docs/database.md` | ✅ Concluído |
| 2.9 | Commit | ✅ Concluído |

## Verificação executada
Script temporário (scratchpad, descartado) em banco `:memory:`: migração 2× → versão 1 sem
duplicar; inserção duplicada ignorada; busca "reuniao" encontra "Reunião"; totais por grupo;
pergunta pendente; anti-duplicação de alerta; 4 regras padrão; configurações padrão; uso de IA;
resumo salvo com JSON; retenção apaga e o FTS acompanha.
