// Constantes do Light Bot. Regras de origem: ../../REGRAS-JOGO.md

export const NOME_JOGO = "LIGHT BOT";

// Orientação f: 0 norte, 1 leste, 2 sul, 3 oeste (y cresce para baixo).
export const ORIENTACOES = Object.freeze([
  Object.freeze({ nome: "Norte", dx: 0, dy: -1 }),
  Object.freeze({ nome: "Leste", dx: 1, dy: 0 }),
  Object.freeze({ nome: "Sul", dx: 0, dy: 1 }),
  Object.freeze({ nome: "Oeste", dx: -1, dy: 0 }),
]);
export const TOTAL_ORIENTACOES = ORIENTACOES.length;
export const GIRO_ANTI_HORARIO = TOTAL_ORIENTACOES - 1;
export const GIRO_HORARIO = 1;

// Tokens dos comandos (iguais aos da especificação).
export const COMANDO_ANDAR = "WALK";
export const COMANDO_PULAR = "JUMP";
export const COMANDO_ESQUERDA = "LEFT";
export const COMANDO_DIREITA = "RIGHT";
export const COMANDO_ACENDER = "LIGHT";
export const COMANDO_PROC1 = "P1";
export const COMANDO_PROC2 = "P2";

export const COMANDOS_PRIMITIVOS = Object.freeze([
  COMANDO_ANDAR,
  COMANDO_PULAR,
  COMANDO_ESQUERDA,
  COMANDO_DIREITA,
  COMANDO_ACENDER,
]);
export const COMANDOS_CHAMADA = Object.freeze([COMANDO_PROC1, COMANDO_PROC2]);
export const TODOS_COMANDOS = Object.freeze([...COMANDOS_PRIMITIVOS, ...COMANDOS_CHAMADA]);

export const ROTULOS_COMANDOS = Object.freeze({
  [COMANDO_ANDAR]: "ANDAR",
  [COMANDO_PULAR]: "PULAR",
  [COMANDO_ESQUERDA]: "ESQUERDA",
  [COMANDO_DIREITA]: "DIREITA",
  [COMANDO_ACENDER]: "ACENDER",
  [COMANDO_PROC1]: "PROC1",
  [COMANDO_PROC2]: "PROC2",
});

export const SIMBOLOS_COMANDOS = Object.freeze({
  [COMANDO_ANDAR]: "↑",
  [COMANDO_PULAR]: "⤴",
  [COMANDO_ESQUERDA]: "↺",
  [COMANDO_DIREITA]: "↻",
  [COMANDO_ACENDER]: "💡",
  [COMANDO_PROC1]: "P1",
  [COMANDO_PROC2]: "P2",
});

// Áreas de memória do programa.
export const AREA_MAIN = "main";
export const AREA_PROC1 = "proc1";
export const AREA_PROC2 = "proc2";
export const AREAS = Object.freeze([AREA_MAIN, AREA_PROC1, AREA_PROC2]);
export const ROTULOS_AREAS = Object.freeze({
  [AREA_MAIN]: "MAIN",
  [AREA_PROC1]: "PROC1",
  [AREA_PROC2]: "PROC2",
});
export const AREA_DO_COMANDO = Object.freeze({
  [COMANDO_PROC1]: AREA_PROC1,
  [COMANDO_PROC2]: AREA_PROC2,
});

// Execução.
export const PASSOS_MAXIMOS_PADRAO = 1000;
export const MOTIVO_VITORIA = "vitoria";
export const MOTIVO_FIM_PROGRAMA = "fim";
export const MOTIVO_PARADA_MANUAL = "manual";
export const MOTIVO_LIMITE_PASSOS = "limite";
export const MOTIVO_SEM_ACAO = "sem-acao";

export const VELOCIDADES = Object.freeze([
  Object.freeze({ id: "lenta", rotulo: "LENTA", intervaloMs: 700 }),
  Object.freeze({ id: "normal", rotulo: "NORMAL", intervaloMs: 350 }),
  Object.freeze({ id: "rapida", rotulo: "RÁPIDA", intervaloMs: 120 }),
]);
export const VELOCIDADE_PADRAO = "normal";

// Mapa isométrico (SVG).
export const LARGURA_BLOCO = 72;
export const ALTURA_LOSANGO = 36;
export const ALTURA_DEGRAU = 22;
export const MARGEM_MAPA = 40;

// Progresso salvo no navegador.
export const CHAVE_PROGRESSO = "lightbot-versao-ia:progresso";
export const NIVEL_INICIAL = 1;

// Textos da interface.
export const MENSAGENS = Object.freeze({
  inicio: "Monte o programa e toque em EXECUTAR.",
  executando: "Executando o programa...",
  parado: "Execução interrompida.",
  fimSemVitoria: "O programa terminou, mas ainda há luzes apagadas.",
  limitePassos: "Limite de passos atingido: o programa foi interrompido.",
  semAcao: "O programa ficou em chamadas sem ação e foi interrompido.",
  vitoria: "Todas as luzes acesas!",
  slotsCheios: "Não há mais espaço nesta área.",
  comandoBloqueado: "Este comando ainda não está liberado neste nível.",
  progressoIndisponivel: "Não foi possível salvar o progresso neste navegador.",
});

export const TEXTOS_VITORIA = Object.freeze({
  titulo: "NÍVEL CONCLUÍDO",
  proximo: "PRÓXIMO NÍVEL",
  repetir: "JOGAR DE NOVO",
  ultimoNivel: "Você concluiu todos os níveis!",
});
