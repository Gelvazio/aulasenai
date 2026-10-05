/**
 * Constantes globais do frontend.
 */

export const API = Object.freeze({
  BASE: '/api',
  EVENTOS: '/api/eventos',
});

export const EVENTOS_SSE = Object.freeze({
  MENSAGEM_NOVA: 'mensagem:nova',
  ESTADO_WHATSAPP: 'estado:whatsapp',
  ALERTA_NOVO: 'alerta:novo',
  RESUMO_PRONTO: 'resumo:pronto',
  GRUPOS_ATUALIZADOS: 'grupos:atualizados',
});

export const EVENTOS_APP = Object.freeze({
  NAO_AUTORIZADO: 'app:nao-autorizado',
  SSE_CONECTADO: 'app:sse-conectado',
  SSE_DESCONECTADO: 'app:sse-desconectado',
  ALERTAS_ALTERADOS: 'app:alertas-alterados',
});

export const CHAVES_ESTADO = Object.freeze({
  SISTEMA: 'sistema',
  CONEXAO: 'conexao',
  ALERTAS_ABERTOS: 'alertasAbertos',
});

export const ARMAZENAMENTO = Object.freeze({
  TEMA: 'painel-grupos:tema',
});

export const TEMAS = Object.freeze({
  SISTEMA: 'sistema',
  CLARO: 'claro',
  ESCURO: 'escuro',
});

export const TEMPOS = Object.freeze({
  AVISO_MS: 4500,
  ESPERA_BUSCA_MS: 350,
  ATUALIZACAO_PAINEL_MS: 2000,
  ATUALIZACAO_QR_MS: 5000,
  MS_POR_DIA: 24 * 60 * 60 * 1000,
});

export const LIMITES = Object.freeze({
  MENSAGENS_PAGINA: 50,
  ALERTAS_CONTADOR: 200,
  RESUMOS_LISTA: 30,
  TAMANHO_MINIMO_BUSCA: 2,
  DIAS_ESTATISTICAS: [7, 30, 90],
});

export const ESTADOS_CONEXAO = Object.freeze({
  iniciando: { rotulo: 'Iniciando', variante: 'neutro' },
  aguardando_qr: { rotulo: 'Aguardando QR', variante: 'atencao' },
  conectando: { rotulo: 'Conectando', variante: 'info' },
  conectado: { rotulo: 'Conectado', variante: 'sucesso' },
  desconectado: { rotulo: 'Desconectado', variante: 'urgente' },
});

export const SEVERIDADES = Object.freeze({
  info: { rotulo: 'Info', variante: 'info' },
  atencao: { rotulo: 'Atenção', variante: 'atencao' },
  urgente: { rotulo: 'Urgente', variante: 'urgente' },
});

export const SITUACOES_ALERTA = Object.freeze({
  aberto: 'Abertos',
  lido: 'Lidos',
  resolvido: 'Resolvidos',
});

export const TIPOS_RESUMO = Object.freeze({
  diario: 'Diário',
  sob_demanda: 'Sob demanda',
});

export const TONS_RESUMO = Object.freeze({
  tranquilo: { rotulo: 'Tranquilo', variante: 'sucesso' },
  informativo: { rotulo: 'Informativo', variante: 'info' },
  festivo: { rotulo: 'Festivo', variante: 'primario' },
  tenso: { rotulo: 'Tenso', variante: 'atencao' },
  conflito: { rotulo: 'Conflito', variante: 'urgente' },
});

export const TEXTOS = Object.freeze({
  ERRO_GENERICO: 'Algo deu errado. Tente novamente.',
  ERRO_REDE: 'Sem comunicação com o servidor.',
  CARREGANDO: 'Carregando…',
  SALVO: 'Alterações salvas.',
  SEM_DADOS: 'Nada por aqui ainda.',
  CONFIRMAR: 'Confirmar',
  CANCELAR: 'Cancelar',
  IA_NAO_CONFIGURADA:
    'A IA não está configurada: defina ANTHROPIC_API_KEY no arquivo .env e reinicie o sistema.',
});

export const ROTAS = Object.freeze({
  INICIO: '/',
  GRUPOS: '/grupos',
  GRUPO: '/grupos/:jid',
  RESUMOS: '/resumos',
  ALERTAS: '/alertas',
  BUSCA: '/busca',
  CONEXAO: '/conexao',
  CONFIGURACOES: '/configuracoes',
});

export const NOME_APLICACAO = 'Painel de Grupos';
