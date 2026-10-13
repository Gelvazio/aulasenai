// Aba TASKS: tarefas do tasks/STATUS.md (com bloco do TASKS.md e etapas), frentes e pendências.

/**
 * Monta o Markdown completo de uma tarefa para o modal.
 * @param {Object} tarefa - Linha da tabela de tarefas com bloco e etapas.
 * @returns {string} Markdown do detalhamento.
 */
function montarMarkdownTarefa(tarefa) {
  const resumo = [
    "| Campo | Valor |", "|---|---|",
    `| Status | ${tarefa["Status"] || "—"} |`,
    `| Próximo passo | ${tarefa["Próximo passo"] || "—"} |`,
    `| Em uso por | ${tarefa["Em uso por"] || "—"} |`,
  ].join("\n");
  const partes = ["## Situação no quadro", resumo];
  if (tarefa.bloco) partes.push("## Descrição (TASKS.md)", tarefa.bloco);
  tarefa.etapas.forEach((etapa) => partes.push("---", etapa.texto));
  if (!tarefa.bloco && !tarefa.etapas.length) partes.push("*Sem bloco no TASKS.md nem etapa citada.*");
  return partes.join("\n\n");
}

/**
 * Abre o modal da tarefa.
 * @param {Object} tarefa - Tarefa do quadro.
 */
function abrirTarefa(tarefa) {
  const classe = "situacao--" + paraClasse(tarefa.situacao);
  abrirModal({
    titulo: `${tarefa["Tarefa"]} — ${tarefa["Descrição curta"]}`,
    etiquetas: [criarEtiqueta(tarefa.situacao, classe),
      ...tarefa.etapas.map((etapa) => criarEtiqueta(etapa.arquivo.replace(/\.md$/, "")))],
    markdown: montarMarkdownTarefa(tarefa),
  });
}

/**
 * Cria o cartão de uma tarefa.
 * @param {Object} tarefa - Tarefa do quadro.
 * @returns {HTMLButtonElement} Cartão.
 */
function criarCartaoTarefa(tarefa) {
  const classe = "situacao--" + paraClasse(tarefa.situacao);
  const codigoCurto = tarefa["Tarefa"].split("-")[0];
  const etiquetas = [criarEtiqueta(codigoCurto), criarEtiqueta(tarefa.situacao, classe)];
  const emUso = tarefa["Em uso por"];
  if (emUso && emUso !== "—") etiquetas.push(criarEtiqueta("🔒 " + emUso.split(" (")[0]));
  return criarCartao({
    titulo: tarefa["Descrição curta"],
    texto: resumirTexto(tarefa["Status"] + " · Próximo: " + (tarefa["Próximo passo"] || "—")),
    classe,
    etiquetas,
  }, () => abrirTarefa(tarefa));
}

/**
 * Desenha os contadores por situação.
 */
function desenharResumoTarefas() {
  const itens = ORDEM_SITUACOES.map((situacao) => {
    const total = DADOS.tasks.tarefas.filter((tarefa) => tarefa.situacao === situacao).length;
    const item = criarElemento("div", "resumo__item situacao--" + paraClasse(situacao));
    item.append(criarElemento("span", "resumo__numero", String(total)),
      criarElemento("span", "resumo__rotulo", situacao));
    return item;
  });
  document.getElementById("resumo-tasks").replaceChildren(...itens);
}

/**
 * Redesenha a lista de tarefas conforme a situação e a busca.
 */
function desenharTarefas() {
  const visiveis = DADOS.tasks.tarefas.filter((tarefa) => {
    const situacaoCombina = estadoFiltros.situacao === TODOS || tarefa.situacao === estadoFiltros.situacao;
    return situacaoCombina && combinaBusca(tarefa, estadoFiltros.buscaTasks);
  });
  const ordenadas = [...visiveis].sort((a, b) =>
    ORDEM_SITUACOES.indexOf(a.situacao) - ORDEM_SITUACOES.indexOf(b.situacao));
  document.getElementById("contagem-tasks").textContent =
    `${visiveis.length} de ${DADOS.tasks.tarefas.length} tarefas`;
  const destino = document.getElementById("lista-tasks");
  if (!ordenadas.length) {
    destino.replaceChildren(criarElemento("p", "vazio", "Nenhuma tarefa encontrada."));
    return;
  }
  destino.replaceChildren(...ordenadas.map(criarCartaoTarefa));
}

/**
 * Desenha as frentes de trabalho como cartões que abrem o detalhe da frente.
 */
function desenharFrentes() {
  const cartoes = DADOS.tasks.frentes.map((frente) => {
    const situacao = frente[COLUNAS_FRENTE.situacao] || "";
    const markdown = Object.entries(frente).map(([campo, valor]) => `### ${campo}\n\n${valor || "—"}`).join("\n\n");
    return criarCartao({
      titulo: frente[COLUNAS_FRENTE.titulo] || "Frente",
      texto: resumirTexto(frente["Próximo passo"] || ""),
      classe: "situacao--" + paraClasse(situacao.includes("✅") ? "Concluída" : "Em andamento"),
      etiquetas: [criarEtiqueta(situacao), criarEtiqueta(frente["Atualizado em"] || "")],
    }, () => abrirModal({ titulo: frente[COLUNAS_FRENTE.titulo], etiquetas: [criarEtiqueta(situacao)], markdown }));
  });
  const destino = document.getElementById("lista-frentes");
  destino.replaceChildren(...(cartoes.length ? cartoes : [criarElemento("p", "vazio", "Nenhuma frente.")]));
}

/**
 * Desenha a tabela "Aguardando o usuário".
 */
function desenharAguardando() {
  const linhas = DADOS.tasks.aguardando;
  const destino = document.getElementById("lista-aguardando");
  if (!linhas.length) {
    destino.replaceChildren(criarElemento("p", "vazio", "Nada aguardando o usuário."));
    return;
  }
  const colunas = Object.keys(linhas[0]);
  const markdown = ["| " + colunas.join(" | ") + " |", "|" + colunas.map(() => "---").join("|") + "|",
    ...linhas.map((linha) => "| " + colunas.map((coluna) => linha[coluna] || "").join(" | ") + " |")].join("\n");
  destino.innerHTML = markdownParaHtml(markdown);
}

/**
 * Prepara a aba TASKS.
 */
function iniciarAbaTasks() {
  criarChips({ idDestino: "filtro-situacoes", opcoes: ORDEM_SITUACOES, chave: "situacao" }, desenharTarefas);
  document.getElementById("busca-tasks").addEventListener("input", (evento) => {
    estadoFiltros.buscaTasks = evento.target.value.trim();
    desenharTarefas();
  });
  desenharResumoTarefas();
  desenharTarefas();
  desenharFrentes();
  desenharAguardando();
}
