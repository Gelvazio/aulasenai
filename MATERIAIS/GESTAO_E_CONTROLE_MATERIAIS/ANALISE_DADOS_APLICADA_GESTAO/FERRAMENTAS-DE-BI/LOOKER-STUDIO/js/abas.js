/**
 * abas.js
 *
 * Alterna entre as abas da página (Dashboard de exemplo e Ferramentas
 * de análise). Cada botão .aba-btn aponta, via data-aba, para o id do
 * painel .aba-painel que deve ficar visível.
 */

/**
 * Mostra o painel indicado e esconde os demais.
 *
 * @param {string} idPainel
 */
function ativarAba(idPainel) {
  document.querySelectorAll(".aba-btn").forEach((botao) => {
    const ativa = botao.dataset.aba === idPainel;
    botao.classList.toggle("ativa", ativa);
    botao.setAttribute("aria-selected", String(ativa));
  });

  document.querySelectorAll(".aba-painel").forEach((painel) => {
    painel.hidden = painel.id !== idPainel;
  });
}

/**
 * Liga o clique de cada botão de aba.
 */
function inicializarAbas() {
  document.querySelectorAll(".aba-btn").forEach((botao) => {
    botao.addEventListener("click", () => ativarAba(botao.dataset.aba));
  });
}

document.addEventListener("DOMContentLoaded", inicializarAbas);
