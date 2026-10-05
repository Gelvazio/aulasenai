# ORIENTAÇÃO — Configuração e utilitários (`src/config`, `src/utilitarios`)

## `src/config/constantes.js`
- **Único lugar** para valores fixos do backend: caminhos, porta, MIME, cabeçalhos de segurança,
  estados de conexão, tipos de mensagem, modelos e preços de IA, tipos de regra, severidades,
  situações, chaves/valores padrão de configuração, nomes de eventos, mensagens de erro.
- Tudo com `Object.freeze`. Novo valor fixo → adicionar aqui, nunca "mágico" no código.
- Preços em `PRECOS_MODELOS` (US$/milhão de tokens). Ao adicionar modelo, incluir o preço:
  `MODELOS_DISPONIVEIS` é derivado dessa tabela.

## `src/config/ambiente.js`
- `carregarAmbiente()` lê `process.env` (carregado por `node --env-file=.env`).
- `DASHBOARD_TOKEN` é obrigatório (lança erro). `ANTHROPIC_API_KEY` é opcional → `iaConfigurada`.

## `src/utilitarios/`
| Arquivo | Funções |
|---------|---------|
| `logger.js` | `criarLogger(nivel)` — pino; a mesma instância vai para o Baileys |
| `datas.js` | `agoraIso`, `segundosParaIso`, `inicioDoDia(fuso, dias)`, `proximaOcorrencia(HH:MM, fuso)`, `dataLocal`, `horaLocal`, `ehDataValida` |
| `texto.js` | `normalizarTexto` (sem acento/minúsculo), `extrairDigitos` (JID → número), `resumirTexto` |
| `erros.js` | `ErroAplicacao(mensagem, status)` — vira resposta HTTP; `esperar(ms)` |

## Regras
- Banco guarda datas em ISO UTC; fuso só em cálculos de "dia" e na exibição.
- `npm run verificar` = `node --check` em todos os `.js` + ESLint com as regras do CLAUDE.md
  (max 45 linhas/função, 3 parâmetros, profundidade 2, 100 colunas, 1000 linhas/arquivo).
