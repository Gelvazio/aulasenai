// Aluno: ON/OFF "Mostrar Certas", "Mostrar Meia Certas" e "Mostrar Erradas" no quadro da nota da
// prova corrigida (resultado-aluno-discursiva.js). Todos desmarcados: mostra todas as perguntas;
// marcados combinam (mostra as perguntas de qualquer categoria marcada). A categoria vem da nota
// confirmada do professor (a única que o aluno vê) — categorias-pergunta-discursiva.js. Pergunta
// ainda sem nota nunca é escondida. Só muda a tela; as escolhas ficam no localStorage do
// navegador (resultado-aluno:categoria-*). Tarefas #158 e #159. Regra: docs/regras/atividades.md

const CLASSE_FILTROS_ALUNO = 'mostrar-certas';
const CLASSE_PERGUNTA_CATEGORIA_OCULTA = 'questao-discursiva--categoria-oculta';
const SELETOR_PERGUNTA_FILTRO_ALUNO = '.questao-discursiva[data-item]';
const PREFIXO_MEMORIA_CATEGORIAS_ALUNO = 'resultado-aluno:categoria-';

/**
 * Classifica cada pergunta pelas notas confirmadas do professor (só elas chegam ao aluno).
 * @param {Object[]} correcoes - Linhas {item, topico, nota_professor} confirmadas.
 * @param {Object[]} gabarito - Linhas {item, topico, pontos}.
 * @returns {Map<number, string|null>} Categoria de cada pergunta (null = sem nota confirmada).
 */
function classificarPerguntasDoAluno(correcoes, gabarito) {
    const notas = new Map(correcoes.map((linha) => [linha.item + '|' + linha.topico, linha]));
    const topicosPorItem = new Map();
    gabarito.forEach((linha) => {
        const correcao = notas.get(linha.item + '|' + linha.topico);
        const lista = topicosPorItem.get(linha.item) || [];
        if (correcao?.nota_professor !== null && correcao?.nota_professor !== undefined) {
            lista.push({ nota: Number(correcao.nota_professor), pontos: linha.pontos });
        }
        topicosPorItem.set(linha.item, lista);
    });
    return new Map([...topicosPorItem].map(([item, lista]) =>
        [item, window.classificarPerguntaPorNotas(lista)]));
}

/**
 * Esconde ou mostra as perguntas conforme os filtros marcados.
 * @param {Map<number, string|null>} categorias - Categoria de cada pergunta.
 * @param {{certa: boolean, meia: boolean, errada: boolean}} escolhas - Filtros marcados.
 */
function aplicarFiltrosDoAluno(categorias, escolhas) {
    document.querySelectorAll(SELETOR_PERGUNTA_FILTRO_ALUNO).forEach((pergunta) => {
        const categoria = categorias.get(Number(pergunta.dataset.item)) || null;
        const esconder = !window.perguntaPassaNoFiltro(categoria, escolhas);
        pergunta.classList.toggle(CLASSE_PERGUNTA_CATEGORIA_OCULTA, esconder);
    });
}

/**
 * Põe os três ON/OFF no quadro da nota do aluno e aplica as escolhas guardadas.
 * @param {HTMLElement} quadro - Quadro da nota (topo da prova corrigida).
 * @param {{correcoes: Object[], gabarito: Object[]}} dados - Correções confirmadas e gabarito.
 */
function ligarMostrarCertasAluno(quadro, dados) {
    const categorias = classificarPerguntasDoAluno(dados.correcoes, dados.gabarito);
    const escolhas = { certa: false, meia: false, errada: false };
    const chaves = window.criarChavesCategorias({ prefixoMemoria: PREFIXO_MEMORIA_CATEGORIAS_ALUNO,
        escolhas, aoMudar: () => aplicarFiltrosDoAluno(categorias, escolhas) });
    const area = document.createElement('div');
    area.className = CLASSE_FILTROS_ALUNO + '__cabecalho';
    area.append(...chaves);
    quadro.appendChild(area);
    aplicarFiltrosDoAluno(categorias, escolhas);
}

window.ligarMostrarCertasAluno = ligarMostrarCertasAluno;
