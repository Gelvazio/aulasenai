// Inicialização: data de geração, troca de abas (lembrada na URL com #regras / #tasks) e modal.

const ABA_PADRAO = "regras";

/**
 * Mostra a aba pedida e marca o botão correspondente.
 * @param {string} aba - "regras" ou "tasks".
 */
function mostrarAba(aba) {
  document.querySelectorAll("[data-aba]").forEach((botao) => {
    const ativa = botao.dataset.aba === aba;
    botao.classList.toggle("abas__botao--ativa", ativa);
    botao.setAttribute("aria-selected", String(ativa));
  });
  document.getElementById("painel-regras").hidden = aba !== "regras";
  document.getElementById("painel-tasks").hidden = aba !== "tasks";
}

/**
 * Liga os botões das abas e abre a aba indicada no endereço (#tasks), se houver.
 */
function iniciarAbas() {
  document.querySelectorAll("[data-aba]").forEach((botao) => {
    botao.addEventListener("click", () => {
      history.replaceState(null, "", "#" + botao.dataset.aba);
      mostrarAba(botao.dataset.aba);
    });
  });
  const abaDoEndereco = location.hash.replace("#", "");
  mostrarAba(["regras", "tasks"].includes(abaDoEndereco) ? abaDoEndereco : ABA_PADRAO);
}

/**
 * Liga o fechamento do modal: botão ✕, clique fora da caixa e tecla Esc (nativa do dialog).
 */
function iniciarModal() {
  const modal = document.getElementById("modal");
  document.getElementById("modal-fechar").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) modal.close();
  });
}

document.getElementById("data-geracao").textContent = DADOS.geradoEm;
iniciarAbas();
iniciarModal();
iniciarAbaRegras();
iniciarAbaTasks();
