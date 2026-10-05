# ORIENTAÇÃO — Alertas (`src/alertas`)

## Regras (Strategy) — `regras/`
Cada arquivo exporta um objeto congelado com o contrato:
| Membro | Função |
|--------|--------|
| `tipo`, `nome`, `descricao` | identificação (tipo = `TIPOS_REGRA_ALERTA`) |
| `campos` | metadados do formulário no dashboard: `{ nome, rotulo, tipo: 'lista'|'numero', padrao }` |
| `validarParametros(p)` | valida `parametros` ao criar/editar |
| `avaliar(mensagem, contexto)` | mensagem nova → `{ titulo, detalhe }` ou `null` |
| `avaliarPeriodico(contexto)` (opcional) | → lista `{ grupoJid, mensagemId, titulo, detalhe }` |

`contexto` = `{ regra, configuracoes, repositorios }`. Registro em `regras/index.js`
(`REGRAS_ALERTA`) — **nova regra = novo arquivo + entrada no array**, nada mais muda.

| Tipo | Parâmetros | Observação |
|------|-----------|------------|
| `palavra_chave` | `palavras: string[]` (1–100) | compara sem acento/caixa |
| `mencao_usuario` | — | usa `mencionaUsuario` do normalizador |
| `pergunta_direta` | `minutos` (padrão 60) | periódica: pergunta com menção ao usuário, sem mensagem dele depois; janela de 5 min (= intervalo do agendador) para avaliar cada pergunta uma única vez |
| `pico_volume` | `fator` (3), `minimo` (20) | última hora vs média por hora dos últimos 7 dias |
| `autor_vip` | — | lista `contatos_vip` das Configurações (só dígitos) |

## `motorAlertas.js`
- Ouve `mensagem:nova`; ignora mensagens do próprio usuário (`deMim`).
- Regras com `grupo_jid` só valem para aquele grupo.
- **Anti-duplicação:** mesmo tipo + regra + grupo com alerta aberto atualizado nos últimos
  30 min → soma `ocorrencias` em vez de criar outro. Sempre emite `alerta:novo` (SSE).
- `verificarPeriodicas()` é chamado pelo agendador.

## `analisadorIa.js` (alertas do tipo `ia`)
- Só roda com configuração `analise_ia_ativa = true` **e** chave da IA. Pega até 200 mensagens
  `analisada_ia = 0` de grupos monitorados (exceto as do usuário), uma chamada por grupo,
  modelo = `modelo_resumo`. Marca como analisadas só após resposta válida.
- A IA devolve `{ alertas: [{ numero, severidade: atencao|urgente, titulo, motivo }] }`;
  números fora da lista são descartados. Prompt com proteção contra instruções dos participantes.

## `servicoRegras.js`
Validação do cadastro (nome 1–80, tipo registrado, severidade `info|atencao|urgente`, parâmetros
pela própria regra, grupo existente) e troca de situação de alerta (`aberto|lido|resolvido`).
