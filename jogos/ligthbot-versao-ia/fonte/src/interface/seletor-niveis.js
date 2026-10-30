import { CHAVE_PROGRESSO } from "../constantes.js";

const PRIMEIRO_NIVEL = 1;

/**
 * Indica se o nível está bloqueado (precisa do anterior concluído).
 * @param {number} numero - Número do nível.
 * @param {Set<number>} concluidos - Níveis concluídos.
 * @returns {boolean} true se o nível está bloqueado.
 */
function estaBloqueado(numero, concluidos) {
  if (numero === PRIMEIRO_NIVEL) return false;
  return !concluidos.has(numero - 1);
}

/**
 * Cria o botão de um nível.
 * @param {number} numero - Número do nível.
 * @param {{atual: number, concluidos: Set<number>, aoEscolher: Function}} contexto - Estado.
 * @returns {HTMLButtonElement} Botão do nível.
 */
function criarBotaoNivel(numero, contexto) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "nivel-botao";
  botao.textContent = String(numero);
  botao.setAttribute("aria-label", `Nível ${numero}`);

  if (numero === contexto.atual) {
    botao.classList.add("nivel-botao--atual");
    botao.setAttribute("aria-current", "true");
  }
  if (contexto.concluidos.has(numero)) botao.classList.add("nivel-botao--concluido");
  botao.disabled = estaBloqueado(numero, contexto.concluidos);
  botao.addEventListener("click", () => contexto.aoEscolher(numero));
  return botao;
}

/**
 * Recria o seletor de níveis dentro do elemento.
 * @param {HTMLElement} elemento - Contêiner do seletor.
 * @param {{total: number, atual: number, concluidos: Set<number>,
 *   aoEscolher: (numero: number) => void}} opcoes - Dados e callback.
 * @returns {void}
 */
export function montarSeletor(elemento, { total, atual, concluidos, aoEscolher }) {
  elemento.replaceChildren();
  const contexto = { atual, concluidos, aoEscolher };
  for (let numero = PRIMEIRO_NIVEL; numero <= total; numero += 1) {
    elemento.appendChild(criarBotaoNivel(numero, contexto));
  }
}

/**
 * Lê do localStorage os níveis concluídos.
 * @returns {Set<number>} Níveis concluídos; vazio em qualquer falha ou dado inválido.
 */
export function carregarProgresso() {
  try {
    const texto = localStorage.getItem(CHAVE_PROGRESSO);
    if (!texto) return new Set();
    const dados = JSON.parse(texto);
    if (!Array.isArray(dados)) return new Set();
    return new Set(dados.filter((valor) => Number.isInteger(valor) && valor > 0));
  } catch {
    return new Set();
  }
}

/**
 * Grava no localStorage os níveis concluídos.
 * @param {Set<number>} concluidos - Níveis concluídos.
 * @returns {boolean} true se gravou; false em falha.
 */
export function salvarProgresso(concluidos) {
  try {
    localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify([...concluidos]));
    return true;
  } catch {
    return false;
  }
}
