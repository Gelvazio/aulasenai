import { VELOCIDADES, VELOCIDADE_PADRAO } from "../constantes.js";

const ROTULO_EXECUTAR = "EXECUTAR";
const ROTULO_PASSO = "PASSO";
const ROTULO_PARAR = "PARAR";
const ROTULO_REINICIAR = "REINICIAR";
const ROTULO_LIMPAR = "LIMPAR";
const ROTULO_PASSOS = "PASSOS";
const ROTULO_COMANDOS = "COMANDOS";
const ROTULO_GRUPO_VELOCIDADE = "Velocidade da execução";
const PREFIXO_ARIA_VELOCIDADE = "Velocidade ";

const CHAVE_EXECUTAR = "executar";
const CHAVE_PASSO = "passo";
const CHAVE_PARAR = "parar";
const CHAVE_REINICIAR = "reiniciar";
const CHAVE_LIMPAR = "limpar";

const CLASSE_BOTAO = "botao";
const CLASSE_PRIMARIO = "botao--primario";
const CLASSE_PERIGO = "botao--perigo";
const CLASSE_VELOCIDADE = "botao--velocidade";

/**
 * Cria um botão real de controle.
 * @param {{rotulo: string, chave: string, classe?: string, aoClicar: Function}} dados
 * @returns {HTMLButtonElement} Botão criado.
 */
function criarBotao({ rotulo, chave, classe, aoClicar }) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = classe ? `${CLASSE_BOTAO} ${classe}` : CLASSE_BOTAO;
  botao.dataset.controle = chave;
  botao.textContent = rotulo;
  botao.addEventListener("click", () => aoClicar());
  return botao;
}

/**
 * Atualiza o aria-pressed de todos os botões de velocidade do grupo.
 * @param {HTMLElement} grupo - Grupo de velocidades.
 * @param {string} idAtivo - Id da velocidade pressionada.
 * @returns {void}
 */
function marcarVelocidade(grupo, idAtivo) {
  grupo.querySelectorAll("button").forEach((botao) => {
    botao.setAttribute("aria-pressed", String(botao.dataset.velocidade === idAtivo));
  });
}

/**
 * Cria o grupo de botões de velocidade.
 * @param {function(string): void} aoMudarVelocidade - Chamado com o id escolhido.
 * @returns {HTMLDivElement} Grupo criado.
 */
function criarGrupoVelocidade(aoMudarVelocidade) {
  const grupo = document.createElement("div");
  grupo.className = "velocidade";
  grupo.setAttribute("role", "group");
  grupo.setAttribute("aria-label", ROTULO_GRUPO_VELOCIDADE);

  VELOCIDADES.forEach((velocidade) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = `${CLASSE_BOTAO} ${CLASSE_VELOCIDADE}`;
    botao.dataset.velocidade = velocidade.id;
    botao.textContent = velocidade.rotulo;
    botao.setAttribute("aria-label", PREFIXO_ARIA_VELOCIDADE + velocidade.rotulo);
    botao.addEventListener("click", () => {
      marcarVelocidade(grupo, velocidade.id);
      aoMudarVelocidade(velocidade.id);
    });
    grupo.append(botao);
  });

  marcarVelocidade(grupo, VELOCIDADE_PADRAO);
  return grupo;
}

/**
 * Monta os botões de controle e o grupo de velocidade.
 * @param {HTMLElement} elemento - Contêiner `#controles`.
 * @param {{aoExecutar: Function, aoPasso: Function, aoParar: Function,
 *   aoReiniciar: Function, aoLimpar: Function,
 *   aoMudarVelocidade: function(string): void}} chamadas - Callbacks.
 * @returns {void}
 */
export function montarControles(elemento, chamadas) {
  const botoes = [
    { rotulo: ROTULO_EXECUTAR, chave: CHAVE_EXECUTAR, classe: CLASSE_PRIMARIO,
      aoClicar: chamadas.aoExecutar },
    { rotulo: ROTULO_PASSO, chave: CHAVE_PASSO, aoClicar: chamadas.aoPasso },
    { rotulo: ROTULO_PARAR, chave: CHAVE_PARAR, classe: CLASSE_PERIGO,
      aoClicar: chamadas.aoParar },
    { rotulo: ROTULO_REINICIAR, chave: CHAVE_REINICIAR, aoClicar: chamadas.aoReiniciar },
    { rotulo: ROTULO_LIMPAR, chave: CHAVE_LIMPAR, aoClicar: chamadas.aoLimpar },
  ].map(criarBotao);

  elemento.replaceChildren(
    ...botoes,
    criarGrupoVelocidade(chamadas.aoMudarVelocidade),
  );
  definirEstadoControles(elemento, { executando: false });
}

/**
 * Habilita ou desabilita os botões conforme a execução em andamento.
 * @param {HTMLElement} elemento - Contêiner `#controles`.
 * @param {{executando: boolean}} estado - Estado atual.
 * @returns {void}
 */
export function definirEstadoControles(elemento, { executando }) {
  const desabilitarEmExecucao = [CHAVE_EXECUTAR, CHAVE_PASSO, CHAVE_LIMPAR];
  desabilitarEmExecucao.forEach((chave) => {
    const botao = elemento.querySelector(`[data-controle="${chave}"]`);
    if (botao) botao.disabled = executando;
  });

  const botaoParar = elemento.querySelector(`[data-controle="${CHAVE_PARAR}"]`);
  if (botaoParar) botaoParar.disabled = !executando;

  const botaoReiniciar = elemento.querySelector(`[data-controle="${CHAVE_REINICIAR}"]`);
  if (botaoReiniciar) botaoReiniciar.disabled = false;
}

/**
 * Cria uma linha de telemetria com rótulo, medidor e valor.
 * @param {string} rotulo - Texto do rótulo.
 * @param {string} chave - Identificador da linha.
 * @returns {HTMLDivElement} Linha criada.
 */
function criarLinhaTelemetria(rotulo, chave) {
  const linha = document.createElement("div");
  linha.className = "telemetria__linha";
  linha.dataset.telemetria = chave;

  const texto = document.createElement("span");
  texto.className = "telemetria__rotulo";
  texto.textContent = rotulo;

  const medidor = document.createElement("progress");
  medidor.className = "medidor";

  const valor = document.createElement("span");
  valor.className = "telemetria__valor";

  linha.append(texto, medidor, valor);
  return linha;
}

/**
 * Atualiza uma linha de telemetria, criando-a se ainda não existir.
 * @param {HTMLElement} elemento - Contêiner `#telemetria`.
 * @param {{rotulo: string, chave: string, atual: number, maximo: number}} dados
 * @returns {void}
 */
function atualizarLinha(elemento, { rotulo, chave, atual, maximo }) {
  let linha = elemento.querySelector(`[data-telemetria="${chave}"]`);
  if (!linha) {
    linha = criarLinhaTelemetria(rotulo, chave);
    elemento.append(linha);
  }
  const medidor = linha.querySelector("progress");
  medidor.max = maximo;
  medidor.value = Math.min(atual, maximo);
  linha.querySelector(".telemetria__valor").textContent = `${atual}/${maximo}`;
}

/**
 * Atualiza a telemetria de passos e comandos.
 * @param {HTMLElement} elemento - Contêiner `#telemetria`.
 * @param {{passos: number, passosMaximos: number, usados: number,
 *   limiteTotal: number}} dados - Valores atuais e limites.
 * @returns {void}
 */
export function atualizarTelemetria(elemento, dados) {
  atualizarLinha(elemento, {
    rotulo: ROTULO_PASSOS,
    chave: "passos",
    atual: dados.passos,
    maximo: dados.passosMaximos,
  });
  atualizarLinha(elemento, {
    rotulo: ROTULO_COMANDOS,
    chave: "comandos",
    atual: dados.usados,
    maximo: dados.limiteTotal,
  });
}
