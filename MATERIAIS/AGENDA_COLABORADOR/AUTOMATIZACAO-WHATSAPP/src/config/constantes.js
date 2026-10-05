/**
 * Constantes globais do backend. Nenhum valor fixo deve ficar espalhado pelo código.
 */
import path from 'node:path';

const RAIZ_PROJETO = path.resolve(import.meta.dirname, '..', '..');

export const CAMINHOS = Object.freeze({
  RAIZ: RAIZ_PROJETO,
  DADOS: path.join(RAIZ_PROJETO, 'dados'),
  BANCO: path.join(RAIZ_PROJETO, 'dados', 'whatsapp.sqlite'),
  SESSAO: path.join(RAIZ_PROJETO, 'dados', 'sessao'),
  PUBLICO: path.join(RAIZ_PROJETO, 'public'),
});

export const SERVIDOR = Object.freeze({
  HOST_PADRAO: '127.0.0.1',
  PORTA_PADRAO: 3210,
  LIMITE_CORPO_BYTES: 1024 * 100,
  INTERVALO_HEARTBEAT_MS: 25_000,
  MAX_TENTATIVAS_TOKEN: 10,
  JANELA_TENTATIVAS_MS: 60_000,
  PREFIXO_API: '/api',
  ARQUIVO_INICIAL: 'index.html',
  COOKIE_TOKEN: 'token_dashboard',
});

export const TIPOS_MIME = Object.freeze({
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
});

export const CABECALHOS_SEGURANCA = Object.freeze({
  'Content-Security-Policy':
    "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; " +
    "connect-src 'self'; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
});

export const WHATSAPP = Object.freeze({
  SUFIXO_GRUPO: '@g.us',
  NOME_NAVEGADOR: 'Analisador de Grupos',
  RECONEXAO_INICIAL_MS: 1_000,
  RECONEXAO_MAXIMA_MS: 60_000,
  TIPO_UPSERT_NOTIFICACAO: 'notify',
  TIPO_UPSERT_HISTORICO: 'append',
});

export const ESTADOS_CONEXAO = Object.freeze({
  INICIANDO: 'iniciando',
  AGUARDANDO_QR: 'aguardando_qr',
  CONECTANDO: 'conectando',
  CONECTADO: 'conectado',
  DESCONECTADO: 'desconectado',
});

export const TIPOS_MENSAGEM = Object.freeze({
  TEXTO: 'texto',
  IMAGEM: 'imagem',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENTO: 'documento',
  FIGURINHA: 'figurinha',
  LOCALIZACAO: 'localizacao',
  CONTATO: 'contato',
  ENQUETE: 'enquete',
  REACAO: 'reacao',
  OUTRO: 'outro',
});

export const IA = Object.freeze({
  URL_API: 'https://api.anthropic.com/v1/messages',
  VERSAO_API: '2023-06-01',
  BETA_FALLBACK: 'server-side-fallback-2026-07-01',
  MODELO_PADRAO: 'claude-haiku-4-5',
  MODELO_ANALISE: 'claude-sonnet-5-5',
  MODELOS_COM_FALLBACK: ['claude-sonnet-5-5', 'claude-opus-5-5'],
  MODELOS_COM_ESFORCO: ['claude-sonnet-5-5', 'claude-opus-5-5'],
  STATUS_REPETIVEIS: [408, 409, 429, 500, 502, 503, 504, 529],
  MOTIVO_RECUSA: 'refusal',
  MOTIVO_LIMITE_TOKENS: 'max_tokens',
  MAX_TOKENS_RESPOSTA: 8_000,
  MAX_TENTATIVAS: 3,
  ESPERA_INICIAL_MS: 2_000,
  TIMEOUT_MS: 180_000,
  CARACTERES_POR_BLOCO: 60_000,
  MINIMO_MENSAGENS_RESUMO: 5,
  LOTE_ANALISE_ALERTAS: 200,
  ESFORCO_ANALISE: 'medium',
});

/** Preço em dólares por milhão de tokens (entrada/saída). */
export const PRECOS_MODELOS = Object.freeze({
  'claude-haiku-4-5': { entrada: 1, saida: 5 },
  'claude-sonnet-5-5': { entrada: 2, saida: 10 },
  'claude-opus-5-5': { entrada: 4, saida: 20 },
});

export const MODELOS_DISPONIVEIS = Object.freeze(Object.keys(PRECOS_MODELOS));

export const TIPOS_RESUMO = Object.freeze({
  DIARIO: 'diario',
  SOB_DEMANDA: 'sob_demanda',
});

export const TIPOS_REGRA_ALERTA = Object.freeze({
  PALAVRA_CHAVE: 'palavra_chave',
  MENCAO_USUARIO: 'mencao_usuario',
  PERGUNTA_DIRETA: 'pergunta_direta',
  PICO_VOLUME: 'pico_volume',
  AUTOR_VIP: 'autor_vip',
  IA: 'ia',
});

export const SEVERIDADES = Object.freeze({
  INFO: 'info',
  ATENCAO: 'atencao',
  URGENTE: 'urgente',
});

export const SITUACOES_ALERTA = Object.freeze({
  ABERTO: 'aberto',
  LIDO: 'lido',
  RESOLVIDO: 'resolvido',
});

export const ALERTAS = Object.freeze({
  JANELA_DUPLICACAO_MS: 30 * 60_000,
  PERGUNTA_SEM_RESPOSTA_MS: 60 * 60_000,
  INTERVALO_VERIFICACAO_PERGUNTAS_MS: 5 * 60_000,
  FATOR_PICO_PADRAO: 3,
  MINIMO_PICO_MENSAGENS: 20,
  DIAS_MEDIA_PICO: 7,
});

export const CHAVES_CONFIGURACAO = Object.freeze({
  HORARIO_RESUMO: 'horario_resumo',
  MODELO_RESUMO: 'modelo_resumo',
  MODELO_ANALISE: 'modelo_analise',
  RETENCAO_DIAS: 'retencao_dias',
  ANALISE_IA_ATIVA: 'analise_ia_ativa',
  INTERVALO_ANALISE_MIN: 'intervalo_analise_min',
  CONTATOS_VIP: 'contatos_vip',
  MINIMO_MENSAGENS_RESUMO: 'minimo_mensagens_resumo',
});

export const CONFIGURACOES_PADRAO = Object.freeze({
  [CHAVES_CONFIGURACAO.HORARIO_RESUMO]: '20:00',
  [CHAVES_CONFIGURACAO.MODELO_RESUMO]: IA.MODELO_PADRAO,
  [CHAVES_CONFIGURACAO.MODELO_ANALISE]: IA.MODELO_ANALISE,
  [CHAVES_CONFIGURACAO.RETENCAO_DIAS]: 90,
  [CHAVES_CONFIGURACAO.ANALISE_IA_ATIVA]: false,
  [CHAVES_CONFIGURACAO.INTERVALO_ANALISE_MIN]: 60,
  [CHAVES_CONFIGURACAO.CONTATOS_VIP]: [],
  [CHAVES_CONFIGURACAO.MINIMO_MENSAGENS_RESUMO]: IA.MINIMO_MENSAGENS_RESUMO,
});

export const LIMITES_CONFIGURACAO = Object.freeze({
  RETENCAO_MINIMA_DIAS: 1,
  RETENCAO_MAXIMA_DIAS: 3650,
  INTERVALO_MINIMO_MIN: 5,
  INTERVALO_MAXIMO_MIN: 1440,
  MINIMO_MENSAGENS_MAXIMO: 1000,
  MAXIMO_CONTATOS_VIP: 200,
  MAXIMO_PALAVRAS_CHAVE: 100,
  TAMANHO_MAXIMO_NOME: 80,
});

export const ESTATISTICAS = Object.freeze({
  DIAS_ATIVIDADE: 7,
  DIAS_MAXIMOS: 90,
  HORAS_DIA: 24,
  LIMITE_TOP_GRUPOS: 5,
  LIMITE_ULTIMOS_ALERTAS: 5,
  LIMITE_RANKING: 10,
});

export const AGENDADOR = Object.freeze({
  HORARIO_LIMPEZA: '03:30',
  MS_POR_DIA: 24 * 60 * 60_000,
  MS_POR_MINUTO: 60_000,
});

export const EVENTOS = Object.freeze({
  MENSAGEM_NOVA: 'mensagem:nova',
  ESTADO_WHATSAPP: 'estado:whatsapp',
  ALERTA_NOVO: 'alerta:novo',
  RESUMO_PRONTO: 'resumo:pronto',
  GRUPOS_ATUALIZADOS: 'grupos:atualizados',
  CONFIGURACAO_ALTERADA: 'configuracao:alterada',
});

export const PAGINACAO = Object.freeze({
  LIMITE_PADRAO: 50,
  LIMITE_MAXIMO: 200,
  LIMITE_BUSCA: 100,
});

export const FUSO_PADRAO = 'America/Sao_Paulo';

export const MENSAGENS_ERRO = Object.freeze({
  TOKEN_AUSENTE: 'DASHBOARD_TOKEN não definido no .env',
  NAO_AUTORIZADO: 'Não autorizado',
  MUITAS_TENTATIVAS: 'Muitas tentativas. Aguarde um minuto.',
  NAO_ENCONTRADO: 'Recurso não encontrado',
  CORPO_INVALIDO: 'Corpo da requisição inválido',
  CORPO_GRANDE: 'Corpo da requisição muito grande',
  ERRO_INTERNO: 'Erro interno do servidor',
  IA_NAO_CONFIGURADA: 'IA não configurada: defina ANTHROPIC_API_KEY no .env',
  IA_RESPOSTA_INVALIDA: 'A IA retornou uma resposta em formato inválido',
  IA_RECUSOU: 'A IA recusou o pedido',
  GRUPO_INEXISTENTE: 'Grupo não encontrado',
  PERIODO_INVALIDO: 'Período inválido',
  SEM_MENSAGENS: 'Não há mensagens suficientes no período',
  WHATSAPP_DESCONECTADO: 'WhatsApp não está conectado',
  REGRA_INVALIDA: 'Regra de alerta inválida',
  CONFIGURACAO_INVALIDA: 'Configuração inválida',
});
