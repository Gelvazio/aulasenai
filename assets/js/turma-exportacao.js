// Turma da exportação em PDF — REGRA GLOBAL de todas as atividades e avaliações.
// A turma do PDF é SEMPRE a escolhida no combo "Turma" do Quadro de Progresso
// (select#progresso-turma-combo-turma, assets/js/alunos-da-turma-progresso.js) — fonte única
// da turma na página (2026-10-26, #399): não existe mais a lista "Turma" própria na
// .export-bar. Página sem esse combo (aluno, sem login ou página sem Quadro de Progresso):
// o campo "Turma" do PDF fica em branco para preencher à mão.
// Carregado por assets/js/atividade.js (ou direto pela página).

const ID_COMBO_TURMA_QUADRO_EXPORTACAO = 'progresso-turma-combo-turma';
const TURMA_EM_BRANCO_PDF = '___________________';

/**
 * Turma que vai no campo "Turma" do PDF: a escolhida no combo "Turma" do Quadro de Progresso
 * (texto da opção, igual ao que o professor vê). Sem o combo na página — aluno, sem login ou
 * página sem o Quadro — o campo fica em branco para preencher à mão.
 * @returns {Promise<string>} Texto da turma ou a linha em branco.
 */
async function obterTurmaParaExportacao() {
    const lista = document.getElementById(ID_COMBO_TURMA_QUADRO_EXPORTACAO);
    if (!lista) return TURMA_EM_BRANCO_PDF;
    return lista.options[lista.selectedIndex]?.textContent || TURMA_EM_BRANCO_PDF;
}
