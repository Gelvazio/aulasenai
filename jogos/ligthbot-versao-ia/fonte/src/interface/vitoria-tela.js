import { TEXTOS_VITORIA } from "../constantes.js";

const ID_TITULO = "titulo-vitoria";
const CLASSE_RESUMO = "tela-vitoria__resumo";
const CLASSE_ACOES = "tela-vitoria__acoes";
const CLASSE_BOTAO = "botao";
const CLASSE_BOTAO_PRIMARIO = "botao--primario";

/**
 * Cria um botão de ação que executa o callback e fecha o diálogo.
 * @param {{dialogo: HTMLDialogElement, texto: string, aoClicar: Function}} dados - Dados do botão.
 * @param {boolean} primario - Se deve usar o estilo primário.
 * @returns {HTMLButtonElement} Botão criado.
 */
function criarBotaoAcao({ dialogo, texto, aoClicar }, primario) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = CLASSE_BOTAO;
  if (primario) botao.classList.add(CLASSE_BOTAO_PRIMARIO);
  botao.textContent = texto;
  botao.addEventListener("click", () => {
    dialogo.close();
    if (typeof aoClicar === "function") aoClicar();
  });
  return botao;
}

/**
 * Monta o texto do resumo da vitória.
 * @param {number} comandosUsados - Comandos usados pelo jogador.
 * @param {number} limiteTotal - Limite total de comandos do nível.
 * @param {boolean} temProximo - Se existe um próximo nível.
 * @returns {string} Texto do resumo.
 */
function montarTextoResumo(comandosUsados, limiteTotal, temProximo) {
  const base = `Comandos usados: ${comandosUsados} de ${limiteTotal}`;
  if (temProximo) return base;
  return `${base}. ${TEXTOS_VITORIA.ultimoNivel}`;
}

/**
 * Preenche o diálogo com título, resumo e botões de ação.
 * @param {HTMLDialogElement} dialogo - Elemento dialog da vitória.
 * @param {object} opcoes - Mesmas opções de mostrarVitoria.
 * @returns {HTMLButtonElement} Primeiro botão criado (para foco).
 */
function preencherDialogo(dialogo, opcoes) {
  const { comandosUsados, limiteTotal, temProximo, aoProximo, aoRepetir } = opcoes;

  const titulo = document.createElement("h2");
  titulo.id = ID_TITULO;
  titulo.textContent = TEXTOS_VITORIA.titulo;

  const resumo = document.createElement("p");
  resumo.className = CLASSE_RESUMO;
  resumo.textContent = montarTextoResumo(comandosUsados, limiteTotal, temProximo);

  const acoes = document.createElement("div");
  acoes.className = CLASSE_ACOES;
  if (temProximo) {
    const textoProximo = TEXTOS_VITORIA.proximo;
    acoes.append(criarBotaoAcao({ dialogo, texto: textoProximo, aoClicar: aoProximo }, true));
  }
  acoes.append(
    criarBotaoAcao({ dialogo, texto: TEXTOS_VITORIA.repetir, aoClicar: aoRepetir }, false),
  );

  dialogo.replaceChildren(titulo, resumo, acoes);
  return acoes.querySelector("button");
}

/**
 * Mostra a tela de vitória em um diálogo modal.
 * @param {HTMLDialogElement} dialogo - Elemento dialog da vitória.
 * @param {{comandosUsados: number, limiteTotal: number, temProximo: boolean,
 *   aoProximo: Function, aoRepetir: Function}} opcoes - Dados e callbacks.
 * @returns {void}
 */
export function mostrarVitoria(dialogo, opcoes) {
  if (!dialogo) return;

  const primeiroBotao = preencherDialogo(dialogo, opcoes);
  if (!dialogo.open) dialogo.showModal();
  primeiroBotao.focus();
}
