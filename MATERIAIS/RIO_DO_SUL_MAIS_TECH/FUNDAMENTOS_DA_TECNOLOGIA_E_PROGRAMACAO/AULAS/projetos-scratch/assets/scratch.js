/**
 * Navegação passo a passo dos projetos Scratch.
 * Cada passo é um elemento `.passo`; as setas (e as teclas ← →) trocam o passo ativo.
 */
(function () {
  "use strict";

  const CLASSE_ATIVO = "ativo";
  const CHAVE_PREFIXO = "scratch-passo:";
  const ESCALA_MINIMA = 0.5;
  const PASSO_ESCALA = 0.04;

  /**
   * Reduz a escala do passo ativo até ele caber na tela, sem barra de rolagem.
   * @param {HTMLElement} passo - Passo visível.
   */
  function ajustarEscala(passo) {
    let escala = 1;
    passo.style.setProperty("--escala-passo", escala);
    while (passo.scrollHeight > passo.clientHeight && escala > ESCALA_MINIMA) {
      escala = Math.round((escala - PASSO_ESCALA) * 100) / 100;
      passo.style.setProperty("--escala-passo", escala);
    }
  }

  /**
   * Lê o último passo visto neste projeto (se o navegador permitir).
   * @param {string} chave - Chave do projeto.
   * @returns {number} Índice salvo ou 0.
   */
  function lerPassoSalvo(chave) {
    try {
      const valor = Number(window.localStorage.getItem(chave));
      return Number.isInteger(valor) && valor >= 0 ? valor : 0;
    } catch (erro) {
      return 0;
    }
  }

  /**
   * Grava o passo atual para o aluno continuar de onde parou.
   * @param {string} chave - Chave do projeto.
   * @param {number} indice - Passo atual.
   */
  function salvarPasso(chave, indice) {
    try {
      window.localStorage.setItem(chave, String(indice));
    } catch (erro) {
      /* sem armazenamento: segue sem salvar */
    }
  }

  /**
   * Inicia o navegador de passos da página.
   */
  function iniciar() {
    const passos = Array.from(document.querySelectorAll(".passo"));
    if (passos.length === 0) return;

    const botaoVoltar = document.getElementById("passo-anterior");
    const botaoAvancar = document.getElementById("passo-proximo");
    const botaoFinal = document.getElementById("passo-final");
    const botaoInicio = document.getElementById("passo-inicio");
    const barra = document.getElementById("progresso-passos");
    const contador = document.getElementById("contador-passos");
    const chave = CHAVE_PREFIXO + window.location.pathname;
    let atual = Math.min(lerPassoSalvo(chave), passos.length - 1);

    /**
     * Mostra o passo pedido e atualiza setas, barra e contador.
     * @param {number} indice - Passo a mostrar.
     */
    function mostrar(indice) {
      atual = Math.max(0, Math.min(indice, passos.length - 1));
      passos.forEach((passo, posicao) => passo.classList.toggle(CLASSE_ATIVO, posicao === atual));
      botaoVoltar.disabled = atual === 0;
      botaoAvancar.disabled = atual === passos.length - 1;
      if (botaoFinal) botaoFinal.disabled = atual === passos.length - 1;
      if (botaoInicio) botaoInicio.disabled = atual === 0;
      barra.max = passos.length;
      barra.value = atual + 1;
      contador.textContent = "Passo " + (atual + 1) + " de " + passos.length;
      salvarPasso(chave, atual);
      ajustarEscala(passos[atual]);
    }

    botaoVoltar.addEventListener("click", () => mostrar(atual - 1));
    botaoAvancar.addEventListener("click", () => mostrar(atual + 1));
    if (botaoInicio) botaoInicio.addEventListener("click", () => mostrar(0));
    if (botaoFinal) botaoFinal.addEventListener("click", () => mostrar(passos.length - 1));
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "ArrowRight") mostrar(atual + 1);
      if (evento.key === "ArrowLeft") mostrar(atual - 1);
    });
    window.addEventListener("resize", () => ajustarEscala(passos[atual]));
    mostrar(atual);
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
