// Modal 🏢 Unidades da página cursos.html: CRUD da tabela unidade (nome e endereço), a única
// fonte da unidade de cursos e turmas (curso.unidade_id e turma.unidade_id).
// Unidade em uso não é apagada: o banco recusa (FK on delete restrict) e a tela avisa antes.
// Depende de estadoCu e das funções da página (elementoCu, criarElementoCu, criarBotaoCu,
// recarregarDadosCu, mensagemErroCu) e de popup.js.

const estadoUnidadesCu = { editando: null };

/**
 * Quantos cursos e turmas usam a unidade.
 * @param {number} unidadeId - Id da unidade.
 * @returns {number} Quantidade de cursos + turmas ligados.
 */
function usosDaUnidadeCu(unidadeId) {
  const cursos = estadoCu.cursos.filter((curso) => curso.unidade_id === unidadeId).length;
  const turmas = estadoCu.turmas.filter((turma) => turma.unidade_id === unidadeId).length;
  return cursos + turmas;
}

/** Volta o formulário para "Nova unidade" e limpa os campos. */
function limparFormularioUnidadeCu() {
  estadoUnidadesCu.editando = null;
  elementoCu("unTituloFormulario").textContent = "Nova unidade";
  elementoCu("unNome").value = "";
  elementoCu("unEndereco").value = "";
  elementoCu("unCancelarEdicao").hidden = true;
}

/**
 * Põe a unidade no formulário para editar.
 * @param {Object} unidade - Linha da tabela unidade.
 */
function editarUnidadeCu(unidade) {
  estadoUnidadesCu.editando = unidade;
  elementoCu("unTituloFormulario").textContent = "Editar unidade";
  elementoCu("unNome").value = unidade.nome || "";
  elementoCu("unEndereco").value = unidade.endereco || "";
  elementoCu("unCancelarEdicao").hidden = false;
  elementoCu("unNome").focus();
}

/**
 * Cria a linha de uma unidade no modal, com ✏️ e 🗑️.
 * @param {Object} unidade - Linha da tabela unidade.
 * @returns {HTMLLIElement} Linha.
 */
function criarItemUnidadeCu(unidade) {
  const item = criarElementoCu("li", "cu-turma");
  const descricao = criarElementoCu("span", "", unidade.nome);
  const usos = usosDaUnidadeCu(unidade.id);
  const detalhe = (unidade.endereco || "Sem endereço") + " · " + usos + " curso(s)/turma(s)";
  descricao.append(criarElementoCu("span", "tp-detalhe", detalhe));
  const acoes = criarElementoCu("div", "cu-grupo-acoes");
  acoes.append(
    criarBotaoCu({ texto: "✏️", classe: "tp-botao-icone", titulo: "Editar unidade",
      aoClicar: () => editarUnidadeCu(unidade) }),
    criarBotaoCu({ texto: "🗑️", classe: "tp-botao-icone", titulo: "Excluir unidade",
      aoClicar: () => excluirUnidadeCu(unidade) }));
  item.append(descricao, acoes);
  return item;
}

/** Redesenha a lista do modal de unidades (se estiver aberto). */
function atualizarModalUnidadesCu() {
  if (elementoCu("cuModalUnidades").hidden) return;

  const lista = elementoCu("unLista");
  lista.replaceChildren(...estadoCu.unidades.map(criarItemUnidadeCu));
  if (!estadoCu.unidades.length) {
    lista.append(criarElementoCu("li", "tp-detalhe", "Nenhuma unidade cadastrada."));
  }
}

/** Abre o modal de unidades com o formulário limpo. */
function abrirModalUnidadesCu() {
  limparFormularioUnidadeCu();
  elementoCu("cuModalUnidades").hidden = false;
  atualizarModalUnidadesCu();
  elementoCu("unNome").focus();
}

/**
 * Grava a unidade do formulário (inclui ou altera).
 * @param {SubmitEvent} evento - Envio do formulário.
 */
async function salvarUnidadeCu(evento) {
  evento.preventDefault();
  const dados = {
    nome: elementoCu("unNome").value.trim(),
    endereco: elementoCu("unEndereco").value.trim() || null,
  };
  if (!dados.nome) {
    await mostrarPopup("Informe o nome da unidade.", { tipo: "aviso" });
    return;
  }
  const editando = estadoUnidadesCu.editando;
  try {
    if (editando) await estadoCu.repositorio.alterarUnidade(editando.id, dados);
    if (!editando) await estadoCu.repositorio.incluirUnidade(dados);
  } catch (erro) {
    await mostrarPopup(mensagemErroCu(erro), { tipo: "erro", titulo: "Unidade não gravada" });
    return;
  }
  limparFormularioUnidadeCu();
  await recarregarDadosCu();
}

/**
 * Exclui a unidade depois da confirmação; unidade em uso não pode ser excluída.
 * @param {Object} unidade - Linha da tabela unidade.
 */
async function excluirUnidadeCu(unidade) {
  const usos = usosDaUnidadeCu(unidade.id);
  if (usos > 0) {
    await mostrarPopup("A unidade \"" + unidade.nome + "\" está em uso por " + usos +
      " curso(s)/turma(s) e não pode ser excluída.", { tipo: "aviso", titulo: "Unidade em uso" });
    return;
  }
  const confirmou = await confirmarPopup("Excluir a unidade \"" + unidade.nome + "\"?",
    { tipo: "pergunta", titulo: "Excluir unidade" });
  if (!confirmou) return;
  try {
    await estadoCu.repositorio.excluirUnidade(unidade.id);
  } catch (erro) {
    await mostrarPopup(mensagemErroCu(erro), { tipo: "erro", titulo: "Unidade não excluída" });
    return;
  }
  await recarregarDadosCu();
}

/** Liga os eventos do modal de unidades. */
function ligarEventosUnidadesCu() {
  elementoCu("cuAbrirUnidades").addEventListener("click", abrirModalUnidadesCu);
  elementoCu("unFormulario").addEventListener("submit", salvarUnidadeCu);
  elementoCu("unCancelarEdicao").addEventListener("click", limparFormularioUnidadeCu);
}
