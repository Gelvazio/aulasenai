// Notas fixas por turma: atividades que valem uma nota direto para TODOS os alunos de uma turma,
// sem depender da entrega. Usado pelo relatorioAtividades.html e pelo painel-professor.html
// (mesma regra do media-final.json da matéria, campo nota_fixa_turmas).

const NOTAS_FIXAS_TURMA = [
    {
        // Análise de Dados Aplicada à Gestão, turma da Salete: Aulas 01, 02, 03, 06 e 07 = nota 10.
        turmas: ['133933'], nota: 10,
        paginas: [
            'ATIVIDADES-1-MATEMATICA-APLICADA-A-GESTAO-PARTE-1-50-QUESTOES.html',
            'ATIVIDADES-2-FUNDAMENTOS-MATEMATICOS-PARA-GESTAO-50-QUESTOES.html',
            'ATIVIDADES-3-EXCEL-BASICO-INTERFACE-E-FORMULAS-50-QUESTOES.html',
            'ATIVIDADES-6-EXCEL-AVANCADO-TABELAS-DINAMICAS-E-GRAFICOS-50-QUESTOES.html',
            'ATIVIDADES-7-DASHBOARDS-INTERATIVOS-E-INTEGRACAO-DE-DADOS-50-QUESTOES.html',
        ],
    },
];

/**
 * Nota fixa de uma atividade para a turma, comparando o nome do arquivo da página.
 * @param {string} pagina - Caminho da página gravado em atividade.pagina.
 * @param {string} turmaCodigo - Código da turma.
 * @returns {number|null} Nota fixa ou null se a atividade usa a nota do banco.
 */
function obterNotaFixaTurma(pagina, turmaCodigo) {
    const arquivo = decodeURIComponent(String(pagina || '')).split('/').pop();
    const regra = NOTAS_FIXAS_TURMA.find((item) =>
        item.turmas.includes(String(turmaCodigo)) && item.paginas.includes(arquivo));
    return regra ? regra.nota : null;
}
