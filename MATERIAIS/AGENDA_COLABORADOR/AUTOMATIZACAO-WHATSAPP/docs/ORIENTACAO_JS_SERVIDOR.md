# ORIENTAÇÃO — Servidor HTTP (`src/servidor`) e serviços (`src/servicos`)

Servidor **`node:http` puro**, escutando em `HOST_SERVIDOR` (padrão `127.0.0.1`).

## Fluxo de uma requisição (`servidorHttp.js`)
1. Aplica `CABECALHOS_SEGURANCA` (CSP `'self'`, nosniff, no-referrer, DENY).
2. Fora de `/api/` → `arquivosEstaticos.js` (só dentro de `public/`, só MIME conhecidos).
3. `/api/sessao`: `POST {token}` grava cookie `token_dashboard` (HttpOnly, SameSite=Strict);
   `DELETE` remove. Máx. 10 falhas/min por IP (429).
4. Demais `/api/*` exigem cookie **ou** `Authorization: Bearer <DASHBOARD_TOKEN>` (útil no curl).
   Comparação com `timingSafeEqual` sobre hash SHA-256.
5. `/api/eventos` → `CanalSse` (heartbeat a cada 25s). Demais → `Roteador`.
6. Handler recebe `{ parametros, consulta, corpo }` e **retorna** o JSON. Erros esperados:
   `throw new ErroAplicacao(msg, status)`; inesperados viram 500 genérico (detalhe só no log).
   Corpo JSON limitado a 100 KB e precisa ser objeto.

## Rotas (`rotas/`) — cada arquivo exporta `registrarRotasX(roteador, dependencias)`
| Arquivo | Rotas |
|---------|-------|
| `rotasConexao.js` | `GET /conexao` (estado + `qrImagem` data URL), `POST /conexao/desconectar` |
| `rotasGrupos.js` | `GET /grupos`, `GET/PATCH /grupos/:jid`, `GET /grupos/:jid/mensagens?antesDe&limite`, `GET /grupos/:jid/estatisticas?dias` |
| `rotasPainel.js` | `GET /sistema`, `GET /visao-geral`, `GET /busca?termo&grupo`, `GET/PUT /configuracoes`, `GET /uso-ia?dias` |
| `rotasResumos.js` (etapa 7) | `GET /resumos`, `GET /resumos/:id`, `POST /resumos` |
| `rotasAlertas.js` (etapa 8) | `GET /alertas`, `PATCH /alertas/:id`, `POST /alertas/marcar-lidos`, CRUD `/regras` |

Nova rota = novo `registrar(...)` num arquivo de rotas + chamada em `criarRoteador` (`src/index.js`).

## SSE
Eventos do barramento repassados ao navegador: `mensagem:nova`, `estado:whatsapp` (sem QR),
`alerta:novo`, `resumo:pronto`, `grupos:atualizados` (lista `EVENTOS_PUBLICOS` em `index.js`).

## Serviços
- `servicoEstatisticas.js`: visão geral (KPIs, 7 dias, por hora hoje, top grupos, últimos
  alertas) e estatísticas por grupo — agrupamento por dia/hora feito no **fuso** configurado.
- `servicoConfiguracoes.js`: mapa `VALIDADORES` (chave → função). Nova configuração = nova
  entrada em `CONFIGURACOES_PADRAO` + validador. Emite `configuracao:alterada`.

## Verificação sem navegador
```bash
curl -H "Authorization: Bearer $TOKEN" http://127.0.0.1:3210/api/grupos
curl -N -H "Authorization: Bearer $TOKEN" http://127.0.0.1:3210/api/eventos
```
