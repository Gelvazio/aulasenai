/**
 * Ponto de entrada: cria todas as dependências e as injeta (composição da aplicação).
 */
import { EventEmitter } from 'node:events';
import { CAMINHOS, EVENTOS } from './config/constantes.js';
import { carregarAmbiente } from './config/ambiente.js';
import { criarLogger } from './utilitarios/logger.js';
import { abrirBanco } from './banco/conexao.js';
import { aplicarMigracoes } from './banco/migracoes.js';
import { criarRepositorios } from './banco/repositorios/index.js';
import { ClienteWhatsapp } from './whatsapp/clienteWhatsapp.js';
import { SincronizadorGrupos } from './whatsapp/sincronizadorGrupos.js';
import { ColetorMensagens } from './whatsapp/coletorMensagens.js';
import { ServicoEstatisticas } from './servicos/servicoEstatisticas.js';
import { ServicoConfiguracoes } from './servicos/servicoConfiguracoes.js';
import { Roteador } from './servidor/roteador.js';
import { Autenticador } from './servidor/autenticacao.js';
import { CanalSse } from './servidor/eventosSse.js';
import { criarServidorHttp } from './servidor/servidorHttp.js';
import { registrarRotasConexao } from './servidor/rotas/rotasConexao.js';
import { registrarRotasGrupos } from './servidor/rotas/rotasGrupos.js';
import { registrarRotasPainel } from './servidor/rotas/rotasPainel.js';
import { registrarRotasResumos } from './servidor/rotas/rotasResumos.js';
import { ClienteClaude } from './ia/clienteClaude.js';
import { ServicoResumo } from './ia/servicoResumo.js';
import { REGRAS_ALERTA } from './alertas/regras/index.js';
import { MotorAlertas } from './alertas/motorAlertas.js';
import { ServicoRegras } from './alertas/servicoRegras.js';
import { AnalisadorIa } from './alertas/analisadorIa.js';
import { registrarRotasAlertas } from './servidor/rotas/rotasAlertas.js';
import { Agendador } from './agendador/agendador.js';
import { iniciarAgendamentos } from './agendador/iniciarAgendamentos.js';

/** Eventos internos repassados ao dashboard via SSE. */
const EVENTOS_PUBLICOS = [
  EVENTOS.MENSAGEM_NOVA,
  EVENTOS.ESTADO_WHATSAPP,
  EVENTOS.ALERTA_NOVO,
  EVENTOS.RESUMO_PRONTO,
  EVENTOS.GRUPOS_ATUALIZADOS,
];

/**
 * Cria a camada de dados (banco migrado + repositórios).
 * @param {import('pino').Logger} logger - Logger principal.
 * @returns {{banco: import('node:sqlite').DatabaseSync,
 *   repositorios: ReturnType<typeof criarRepositorios>}} Camada de dados.
 */
function criarDados(logger) {
  const banco = abrirBanco(CAMINHOS.BANCO);
  const versao = aplicarMigracoes(banco);
  logger.info({ versao }, 'Banco pronto');
  return { banco, repositorios: criarRepositorios(banco) };
}

/**
 * Cria a camada do WhatsApp (cliente, sincronizador de grupos e coletor).
 * @param {{logger: import('pino').Logger, repositorios: object, barramento: EventEmitter,
 *   ambiente: ReturnType<typeof carregarAmbiente>}} contexto
 * @returns {ClienteWhatsapp} Cliente já com os ouvintes registrados.
 */
function criarWhatsapp(contexto) {
  const { logger, repositorios, barramento, ambiente } = contexto;
  const cliente = new ClienteWhatsapp({ logger, caminhoSessao: CAMINHOS.SESSAO });
  cliente.on('estado', (situacao) => {
    logger.info({ estado: situacao.estado }, 'Estado do WhatsApp');
    barramento.emit(EVENTOS.ESTADO_WHATSAPP, { ...situacao, qr: undefined });
  });
  const repositorioGrupos = repositorios.grupos;
  new SincronizadorGrupos({ cliente, repositorioGrupos, barramento, logger }).iniciar();
  new ColetorMensagens({
    cliente,
    repositorios,
    barramento,
    logger,
    meuNumero: ambiente.meuNumero,
  }).iniciar();
  return cliente;
}

/**
 * Cria os serviços de domínio.
 * @param {{repositorios: object, barramento: EventEmitter, ambiente: object,
 *   logger: import('pino').Logger}} contexto
 * @returns {object} Serviços (estatísticas, configurações, IA, resumos).
 */
function criarServicos(contexto) {
  const { repositorios, barramento, ambiente, logger } = contexto;
  const fusoHorario = ambiente.fusoHorario;
  const servicoConfiguracoes = new ServicoConfiguracoes({
    repositorio: repositorios.configuracoes,
    barramento,
  });
  const clienteClaude = new ClienteClaude({
    chaveApi: ambiente.chaveApiClaude,
    repositorioUso: repositorios.usoIa,
    logger,
  });
  const servicoResumo = new ServicoResumo({
    clienteClaude,
    repositorios,
    servicoConfiguracoes,
    barramento,
    fusoHorario,
    logger,
  });
  return {
    servicoEstatisticas: new ServicoEstatisticas({ repositorios, fusoHorario }),
    servicoConfiguracoes,
    clienteClaude,
    servicoResumo,
    ...criarAlertas({ ...contexto, servicoConfiguracoes, clienteClaude }),
  };
}

/**
 * Cria o motor de alertas (já ouvindo mensagens), o cadastro de regras e o analisador por IA.
 * @param {{repositorios: object, barramento: EventEmitter, ambiente: object, logger: object,
 *   servicoConfiguracoes: ServicoConfiguracoes, clienteClaude: ClienteClaude}} contexto
 * @returns {{motorAlertas: MotorAlertas, servicoRegras: ServicoRegras,
 *   analisadorIa: AnalisadorIa}} Componentes de alertas.
 */
function criarAlertas(contexto) {
  const { repositorios, barramento, logger, servicoConfiguracoes, clienteClaude } = contexto;
  const regras = REGRAS_ALERTA;
  const motorAlertas = new MotorAlertas({
    repositorios,
    servicoConfiguracoes,
    barramento,
    logger,
    regras,
  });
  motorAlertas.iniciar();
  const analisadorIa = new AnalisadorIa({
    clienteClaude,
    repositorios,
    servicoConfiguracoes,
    motorAlertas,
    fusoHorario: contexto.ambiente.fusoHorario,
    logger,
  });
  return { motorAlertas, servicoRegras: new ServicoRegras({ repositorios, regras }), analisadorIa };
}

/**
 * Cria o roteador com todas as rotas da API.
 * @param {object} dependencias - Repositórios, serviços, cliente e ambiente.
 * @returns {Roteador} Roteador configurado.
 */
function criarRoteador(dependencias) {
  const roteador = new Roteador();
  registrarRotasConexao(roteador, dependencias);
  registrarRotasGrupos(roteador, {
    ...dependencias,
    fusoHorario: dependencias.ambiente.fusoHorario,
  });
  registrarRotasPainel(roteador, dependencias);
  registrarRotasResumos(roteador, dependencias);
  registrarRotasAlertas(roteador, dependencias);
  return roteador;
}

/**
 * Sobe o servidor HTTP e liga o barramento interno ao canal SSE.
 * @param {{logger: object, barramento: EventEmitter, ambiente: object,
 *   roteador: Roteador}} contexto
 * @returns {{servidor: import('node:http').Server, canalSse: CanalSse}} Servidor e canal.
 */
function iniciarServidor(contexto) {
  const { logger, barramento, ambiente, roteador } = contexto;
  const canalSse = new CanalSse();
  EVENTOS_PUBLICOS.forEach((evento) => {
    barramento.on(evento, (dados) => canalSse.transmitir(evento, dados));
  });
  const autenticador = new Autenticador({ token: ambiente.tokenDashboard });
  const servidor = criarServidorHttp({ roteador, autenticador, canalSse, logger });
  servidor.listen(ambiente.porta, ambiente.host, () => {
    logger.info(`Dashboard em http://${ambiente.host}:${ambiente.porta}`);
  });
  return { servidor, canalSse };
}

/**
 * Registra o encerramento gracioso (Ctrl+C / SIGTERM).
 * @param {{logger: object, cliente: ClienteWhatsapp, servidor: object, canalSse: CanalSse,
 *   banco: import('node:sqlite').DatabaseSync, paradas?: Function[]}} recursos
 * @returns {void}
 */
function registrarEncerramento(recursos) {
  const encerrar = (sinal) => {
    recursos.logger.info({ sinal }, 'Encerrando');
    (recursos.paradas || []).forEach((parar) => parar());
    recursos.cliente.encerrarSocket();
    recursos.canalSse.fechar();
    recursos.servidor.close();
    recursos.banco.close();
    process.exit(0);
  };
  process.once('SIGINT', encerrar);
  process.once('SIGTERM', encerrar);
}

/**
 * Inicializa a aplicação.
 * @returns {Promise<void>}
 */
async function iniciar() {
  const ambiente = carregarAmbiente();
  const logger = criarLogger(ambiente.nivelLog);
  const barramento = new EventEmitter();
  const { banco, repositorios } = criarDados(logger);
  const cliente = criarWhatsapp({ logger, repositorios, barramento, ambiente });
  const servicos = criarServicos({ repositorios, barramento, ambiente, logger });
  const roteador = criarRoteador({ repositorios, cliente, ambiente, ...servicos });
  const { servidor, canalSse } = iniciarServidor({ logger, barramento, ambiente, roteador });
  const agendador = new Agendador({ fusoHorario: ambiente.fusoHorario, logger });
  iniciarAgendamentos({
    agendador,
    repositorios,
    barramento,
    logger,
    fusoHorario: ambiente.fusoHorario,
    ...servicos,
  });
  const paradas = [() => agendador.parar()];
  registrarEncerramento({ logger, cliente, servidor, canalSse, banco, paradas });
  await cliente.conectar();
}

iniciar().catch((erro) => {
  console.error('Falha ao iniciar:', erro.message);
  process.exit(1);
});
