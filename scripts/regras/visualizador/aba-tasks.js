// Aba TASKS: tarefas do tasks/STATUS.md (com a etapa de cada uma), frentes e itens 👀 das etapas.

const DIAS_FILTRO_INICIAL = 3;
const MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;
const periodoTasks = { de: "", ate: "" };

/**
 * Formata uma data local como AAAA-MM-DD.
 * @param {Date} data - Data a formatar.
 * @returns {string} Data no formato do input type=date.
 */
function formatarDataLocal(data) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

/**
 * Diz se a tarefa cai no período De/Até (vazio nos dois = tudo, inclusive sem data).
 * @param {Object} tarefa - Tarefa com o campo `data` (AAAA-MM-DD ou "").
 * @returns {boolean} true se a tarefa deve aparecer.
 */
function estaNoPeriodo(tarefa) {
  if (!periodoTasks.de && !periodoTasks.ate) return true;
  if (!tarefa.data) return false;
  const depoisDoInicio = !periodoTasks.de || tarefa.data >= periodoTasks.de;
  const antesDoFim = !periodoTasks.ate || tarefa.data <= periodoTasks.ate;
  return depoisDoInicio && antesDoFim;
}

/**
 * Cria um campo de data rotulado do filtro.
 * @param {string} rotulo - Texto do rótulo (ex.: "De").
 * @param {string} chave - Chave em `periodoTasks` ("de" ou "ate").
 * @returns {{campo: HTMLLabelElement, entrada: HTMLInputElement}} Rótulo e input.
 */
function criarCampoData(rotulo, chave) {
  const campo = criarElemento("label", "filtro-datas__campo", rotulo + " ");
  const entrada = criarElemento("input", "filtro-datas__entrada");
  entrada.type = "date";
  entrada.value = periodoTasks[chave];
  entrada.addEventListener("input", () => {
    periodoTasks[chave] = entrada.value;
    desenharResumoTarefas();
    desenharTarefas();
  });
  campo.append(entrada);
  return { campo, entrada };
}

/**
 * Cria o filtro de datas (De, Até e "Ver tudo") ao lado dos chips de situação.
 * @returns {HTMLDivElement} Container `filtro-datas`.
 */
function criarFiltroDatas() {
  const hoje = new Date();
  periodoTasks.ate = formatarDataLocal(hoje);
  periodoTasks.de = formatarDataLocal(
    new Date(hoje.getTime() - DIAS_FILTRO_INICIAL * MILISSEGUNDOS_POR_DIA));
  const de = criarCampoData("De", "de");
  const ate = criarCampoData("Até", "ate");
  const botao = criarElemento("button", "filtro-datas__botao", "Ver tudo");
  botao.type = "button";
  botao.addEventListener("click", () => {
    periodoTasks.de = "";
    periodoTasks.ate = "";
    de.entrada.value = "";
    ate.entrada.value = "";
    desenharResumoTarefas();
    desenharTarefas();
  });
  const container = criarElemento("div", "filtro-datas");
  container.append(de.campo, ate.campo, botao);
  return container;
}

/**
 * Monta o Markdown completo de uma tarefa para o modal.
 * @param {Object} tarefa - Linha da tabela de tarefas com as etapas e o próximo passo.
 * @returns {string} Markdown do detalhamento.
 */
function montarMarkdownTarefa(tarefa) {
  const resumo = [
    "| Campo | Valor |", "|---|---|",
    `| Status | ${tarefa["Status"] || "—"} |`,
    `| Prioridade | ${tarefa["Prioridade"] || "—"} |`,
    `| Modelo | ${tarefa["Modelo"] || "—"} |`,
    `| Depende de | ${tarefa["Depende de"] || "—"} |`,
    `| Próximo passo (da etapa) | ${tarefa.proximo || "—"} |`,
    `| Em uso por | ${tarefa["Em uso por"] || "—"} |`,
  ].join("\n");
  const partes = ["## Situação no quadro", resumo];
  tarefa.etapas.forEach((nome) => partes.push("---", DADOS.tasks.etapas[nome].texto));
  if (!tarefa.etapas.length) partes.push("*Sem etapa ligada a esta tarefa.*");
  return partes.join("\n\n");
}

/**
 * Abre o modal da tarefa.
 * @param {Object} tarefa - Tarefa do quadro.
 */
function abrirTarefa(tarefa) {
  const classe = "situacao--" + paraClasse(tarefa.situacao);
  abrirModal({
    titulo: `${tarefa["Tarefa"]} — ${tarefa["Título"]}`,
    etiquetas: [criarEtiqueta(tarefa.situacao, classe),
      ...tarefa.etapas.map((nome) => criarEtiqueta(nome.replace(/\.md$/, "")))],
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
    titulo: tarefa["Título"],
    texto: resumirTexto(tarefa["Status"] + " · Próximo: " + (tarefa.proximo || "—")),
    classe,
    etiquetas,
  }, () => abrirTarefa(tarefa));
}

/**
 * Desenha os contadores por situação.
 */
function desenharResumoTarefas() {
  const itens = ORDEM_SITUACOES.map((situacao) => {
    const total = DADOS.tasks.tarefas
      .filter((tarefa) => tarefa.situacao === situacao && estaNoPeriodo(tarefa)).length;
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
    return situacaoCombina && estaNoPeriodo(tarefa)
      && combinaBusca(tarefa, estadoFiltros.buscaTasks);
  });
  const totalNoPeriodo = DADOS.tasks.tarefas.filter(estaNoPeriodo).length;
  const ordenadas = [...visiveis].sort((a, b) =>
    ORDEM_SITUACOES.indexOf(a.situacao) - ORDEM_SITUACOES.indexOf(b.situacao));
  document.getElementById("contagem-tasks").textContent =
    `${visiveis.length} de ${totalNoPeriodo} tarefas`;
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
    const { proximo, ...colunas } = frente;
    const campos = [...Object.entries(colunas), ["Próximo passo (da etapa)", proximo]];
    const markdown = campos.map(([campo, valor]) => `### ${campo}\n\n${valor || "—"}`).join("\n\n");
    return criarCartao({
      titulo: frente[COLUNAS_FRENTE.titulo] || "Frente",
      texto: resumirTexto(proximo || ""),
      classe: "situacao--" + paraClasse(situacao.includes("✅") ? "Concluída" : "Em andamento"),
      etiquetas: [criarEtiqueta(situacao), criarEtiqueta(frente["Atualizado em"] || "")],
    }, () => abrirModal({ titulo: frente[COLUNAS_FRENTE.titulo], etiquetas: [criarEtiqueta(situacao)], markdown }));
  });
  const destino = document.getElementById("lista-frentes");
  destino.replaceChildren(...(cartoes.length ? cartoes : [criarElemento("p", "vazio", "Nenhuma frente.")]));
}

/**
 * Desenha a tabela "Aguardando o usuário" (itens 👀 das etapas, calculados pelo gerador).
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
  document.getElementById("filtro-situacoes").after(criarFiltroDatas());
  document.getElementById("busca-tasks").addEventListener("input", (evento) => {
    estadoFiltros.buscaTasks = evento.target.value.trim();
    desenharTarefas();
  });
  desenharResumoTarefas();
  desenharTarefas();
  desenharFrentes();
  desenharAguardando();
}
