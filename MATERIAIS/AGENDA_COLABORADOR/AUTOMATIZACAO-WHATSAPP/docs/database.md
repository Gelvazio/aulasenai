# Banco de dados — `dados/whatsapp.sqlite`

Motor: `node:sqlite` (SQLite embutido no Node 24), modo WAL, chaves estrangeiras ligadas.
Datas em **ISO 8601 UTC** (texto). Migrações em `src/banco/migracoes.js` (tabela `schema_versao`).

## Versão 1

### `grupos`
| Coluna | Tipo | Observação |
|--------|------|------------|
| jid | TEXT PK | `...@g.us` |
| nome, descricao | TEXT | metadados do WhatsApp |
| total_participantes | INTEGER | |
| monitorado | INTEGER 0/1 | só grupos monitorados têm mensagens gravadas e vão para a IA |
| criado_em, atualizado_em | TEXT | |

### `mensagens` — PK (`grupo_jid`, `id`)
| Coluna | Tipo | Observação |
|--------|------|------------|
| id | TEXT | id da mensagem no WhatsApp |
| grupo_jid | TEXT FK → grupos (CASCADE) | |
| autor_jid, autor_nome | TEXT | nome = `pushName` |
| tipo | TEXT | texto, imagem, video, audio, documento, figurinha, localizacao, contato, enquete, reacao, outro |
| texto | TEXT | mídia vira `[imagem] legenda` (mídia nunca é baixada) |
| citada_id | TEXT | id da mensagem respondida |
| menciona_usuario | INTEGER 0/1 | menção (@) ao usuário ou número no texto |
| eh_pergunta | INTEGER 0/1 | termina/contém `?` |
| de_mim | INTEGER 0/1 | enviada pelo próprio usuário |
| enviada_em, recebida_em | TEXT | |
| analisada_ia | INTEGER 0/1 | já passou pela análise de alertas por IA |

Índices: (grupo_jid, enviada_em), (enviada_em), (autor_jid), (analisada_ia, enviada_em).

### `mensagens_fts` (FTS5, external content = `mensagens`)
Tokenizer `unicode61 remove_diacritics 2` (busca sem acento). Mantida por triggers de INSERT/DELETE.

### `resumos`
id, grupo_jid (FK), periodo_inicio, periodo_fim, tipo (`diario`|`sob_demanda`), total_mensagens,
conteudo_json (formato no CLAUDE.md, seção IA), modelo, criado_em.

### `regras_alerta`
id, nome, tipo (`palavra_chave`|`mencao_usuario`|`pergunta_direta`|`pico_volume`|`autor_vip`),
parametros_json, grupo_jid (NULL = todos), severidade (`info`|`atencao`|`urgente`), ativa, criado_em.
Semeadas na V1: menção, pergunta sem resposta, pico, contato VIP.

### `alertas`
id, regra_id (FK, SET NULL), tipo, grupo_jid (FK), mensagem_id, titulo, detalhe, severidade,
situacao (`aberto`|`lido`|`resolvido`), ocorrencias (agrupamento anti-duplicação),
criado_em, atualizado_em.

### `uso_ia`
id, modelo, finalidade (`resumo`|`consolidacao`|`alertas`|`teste`), tokens_entrada, tokens_saida,
custo_estimado (US$), criado_em.

### `configuracoes`
chave (PK), valor_json. Padrões em `CONFIGURACOES_PADRAO` (constantes.js).
