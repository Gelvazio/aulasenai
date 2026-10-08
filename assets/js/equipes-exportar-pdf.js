// Botão "📄 Exportar Equipes" do modal de equipes (assets/js/equipes-modal.js): monta uma folha
// com as equipes da turma + matéria escolhidas (integrantes, líder e papel) e os alunos sem equipe
// e abre a impressão do navegador ("Salvar como PDF"). Usa os dados já carregados no
// estadoEquipes (nada é lido de novo do banco nem guardado no navegador).

const ID_FOLHA_EQUIPES = 'equipesExportacaoPdf';
const CLASSE_EXPORTANDO_EQUIPES = 'equipes-exportando';
const MSG_EXPORTAR_SEM_TURMA = 'Selecione a turma antes de exportar as equipes.';
const MSG_EXPORTAR_SEM_EQUIPES = 'Esta turma ainda não tem equipes cadastradas nesta matéria.';
const COLUNAS_FOLHA_EQUIPES = ['Integrante', 'Papel', 'Líder'];

/**
 * Cria a tabela de integrantes de uma equipe.
 * @param {Object[]} membros - Integrantes (líder primeiro).
 * @returns {HTMLTableElement} Tabela pronta.
 */
function criarTabelaIntegrantesPdf(membros) {
  const tabela = criarElementoEquipes('table', 'equipes-exportacao__tabela');
  const cabecalho = tabela.createTHead().insertRow();
  COLUNAS_FOLHA_EQUIPES.forEach((coluna) => cabecalho.append(criarElementoEquipes('th', '', coluna)));
  const corpo = tabela.createTBody();
  membros.forEach((membro) => {
    const linha = corpo.insertRow();
    linha.insertCell().textContent = nomeDoAlunoEquipes(membro.aluno_id);
    linha.insertCell().textContent = membro.papel || '—';
    linha.insertCell().textContent = membro.lider ? 'Sim' : '';
  });
  return tabela;
}

/**
 * Cria o bloco de uma equipe na folha (nome, descrição e integrantes).
 * @param {Object} equipe - Equipe.
 * @returns {HTMLElement} Bloco pronto.
 */
function criarBlocoEquipePdf(equipe) {
  const membros = membrosDaEquipe(equipe.id);
  const bloco = criarElementoEquipes('section', 'equipes-exportacao__equipe');
  bloco.append(criarElementoEquipes('h2', '', equipe.nome + ' (' + membros.length + ')'));
  if (equipe.descricao) bloco.append(criarElementoEquipes('p', '', equipe.descricao));
  if (!membros.length) {
    bloco.append(criarElementoEquipes('p', '', 'Sem integrantes.'));
    return bloco;
  }
  bloco.append(criarTabelaIntegrantesPdf(membros));
  return bloco;
}

/**
 * Cria o bloco dos alunos da turma que ainda não estão em equipe (vazio = null).
 * @returns {HTMLElement|null} Bloco ou null.
 */
function criarBlocoSemEquipePdf() {
  const alunos = alunosSemEquipe();
  if (!alunos.length) return null;

  const bloco = criarElementoEquipes('section', 'equipes-exportacao__equipe');
  bloco.append(criarElementoEquipes('h2', '', 'Alunos sem equipe (' + alunos.length + ')'));
  bloco.append(criarElementoEquipes('p', '', alunos.map((aluno) => aluno.nome).join(', ')));
  return bloco;
}

/**
 * Monta a folha de exportação no fim do body.
 * @returns {HTMLElement} Folha pronta.
 */
function montarFolhaEquipesPdf() {
  document.getElementById(ID_FOLHA_EQUIPES)?.remove();
  const folha = criarElementoEquipes('section', 'equipes-exportacao');
  folha.id = ID_FOLHA_EQUIPES;
  const turma = elementosEquipes.turma.selectedOptions[0]?.textContent || estadoEquipes.turmaCodigo;
  folha.append(
    criarElementoEquipes('h1', '', 'Equipes — ' + (estadoEquipes.materia?.descricao || '')),
    criarElementoEquipes('p', '', 'Turma: ' + turma + ' · Exportado em ' +
      new Date().toLocaleString('pt-BR') + ' · ' + estadoEquipes.equipes.length + ' equipe(s)'),
    ...estadoEquipes.equipes.map(criarBlocoEquipePdf));
  const semEquipe = criarBlocoSemEquipePdf();
  if (semEquipe) folha.append(semEquipe);
  document.body.append(folha);
  return folha;
}

/**
 * Exporta em PDF (impressão do navegador) as equipes da turma selecionada.
 * @returns {Promise<void>}
 */
async function exportarEquipesPdf() {
  if (!estadoEquipes.turmaCodigo) {
    await mostrarPopup(MSG_EXPORTAR_SEM_TURMA, { tipo: 'info' });
    return;
  }
  if (!estadoEquipes.equipes.length) {
    await mostrarPopup(MSG_EXPORTAR_SEM_EQUIPES, { tipo: 'info' });
    return;
  }
  const folha = montarFolhaEquipesPdf();
  document.body.classList.add(CLASSE_EXPORTANDO_EQUIPES);
  window.addEventListener('afterprint', () => {
    document.body.classList.remove(CLASSE_EXPORTANDO_EQUIPES);
    folha.remove();
  }, { once: true });
  window.print();
}
