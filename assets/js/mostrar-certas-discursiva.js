// Professor: ON/OFF "Mostrar Certas" ao lado de "🧑‍🎓 Respostas dos alunos" da avaliação
// discursiva. Desligado (padrão): ao escolher um aluno, a prova mostra só as questões MEIA CERTA ou
// ERRADA; ligado: mostra também as certas. Certa = todos os tópicos da questão com a nota cheia
// (vale a nota do professor; sem ela, a da IA). Questão ainda sem nota nunca é escondida. Sem
// aluno escolhido, nenhuma questão é escondida. Só muda a tela: nada é gravado.
// Pedido do usuário em 2026-10-14 (tarefa #148). Carregado por assets/js/avaliacao-discursiva.js.
// Depende de js/supabase.js (sbGet). Regra: docs/regras/atividades.md

const CLASSE_MOSTRAR_CERTAS = 'mostrar-certas';
const CLASSE_QUESTAO_CERTA_OCULTA = 'questao-discursiva--certa-oculta';
const SELETOR_QUESTAO_MOSTRAR_CERTAS = '.questao-discursiva[data-item]';
const SELETOR_TITULO_RESPOSTAS_ALUNO = '.respostas-aluno-professor__titulo';
const TEXTO_MOSTRAR_CERTAS = 'Mostrar Certas';
const DICA_MOSTRAR_CERTAS = 'Desligado: só as questões meia certa ou errada do aluno ' +
    'escolhido. Ligado: também as certas.';
const BASE_SCRIPTS_MOSTRAR_CERTAS = document.currentScript?.src.replace(/[^/]*$/, '') || '';

const estadoMostrarCertas = { ligado: false, questoesCertas: new Set() };

/**
 * Nota que vale no tópico: a do professor; sem ela, a da IA.
 * @param {{nota_professor: number|null, nota_ia: number|null}} linha - Correção do tópico.
 * @returns {number|null} Nota ou null se ainda não houver.
 */
function notaQueValeMostrarCertas(linha) {
    if (linha.nota_professor !== null && linha.nota_professor !== undefined) {
        return Number(linha.nota_professor);
    }
    if (linha.nota_ia !== null && linha.nota_ia !== undefined) return Number(linha.nota_ia);
    return null;
}

/**
 * Lê as questões em que o aluno acertou todos os tópicos (nota cheia).
 * @param {{alunoId: string, tentativa: number}} aluno - Aluno escolhido.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<Set<number>>} Números das questões certas.
 * @throws {Error} Se o banco recusar.
 */
async function lerQuestoesCertas(aluno, atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const [correcoes, topicos] = await Promise.all([
        sbGet('correcao_discursiva', 'select=item,topico,nota_ia,nota_professor&' + filtro +
            '&aluno_id=eq.' + aluno.alunoId + '&tentativa=eq.' + aluno.tentativa),
        sbGet('topico_discursivo', 'select=item,topico,pontos&' + filtro),
    ]);
    const notas = new Map(correcoes.map((linha) =>
        [linha.item + '|' + linha.topico, notaQueValeMostrarCertas(linha)]));
    const erradasOuSemNota = new Set();
    topicos.forEach((topico) => {
        const nota = notas.get(topico.item + '|' + topico.topico);
        const estaCerta = nota !== null && nota !== undefined && nota >= Number(topico.pontos);
        if (!estaCerta) erradasOuSemNota.add(topico.item);
    });
    return new Set(topicos.map((topico) => topico.item)
        .filter((item) => !erradasOuSemNota.has(item)));
}

/**
 * Esconde (desligado) ou mostra (ligado) as questões certas do aluno escolhido.
 */
function aplicarMostrarCertas() {
    document.querySelectorAll(SELETOR_QUESTAO_MOSTRAR_CERTAS).forEach((questao) => {
        const esconder = !estadoMostrarCertas.ligado &&
            estadoMostrarCertas.questoesCertas.has(Number(questao.dataset.item));
        questao.classList.toggle(CLASSE_QUESTAO_CERTA_OCULTA, esconder);
    });
}

/**
 * Atualiza as questões certas do aluno escolhido (null = nenhum: mostra todas).
 * @param {Object|null} aluno - Aluno escolhido no combo.
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarCertasDoAluno(aluno, atividadeId) {
    estadoMostrarCertas.questoesCertas = new Set();
    try {
        if (aluno && atividadeId) {
            estadoMostrarCertas.questoesCertas = await lerQuestoesCertas(aluno, atividadeId);
        }
    } finally {
        aplicarMostrarCertas();
    }
}

/**
 * Põe o ON/OFF "Mostrar Certas" ao lado do título "Respostas dos alunos" (desligado ao abrir).
 * @param {HTMLElement} painel - Painel do professor (com a área "Respostas dos alunos").
 */
function ligarMostrarCertas(painel) {
    const titulo = painel.querySelector(SELETOR_TITULO_RESPOSTAS_ALUNO);
    const jaExiste = painel.querySelector('.' + CLASSE_MOSTRAR_CERTAS);
    if (!titulo || jaExiste) return;

    const cabecalho = document.createElement('div');
    cabecalho.className = CLASSE_MOSTRAR_CERTAS + '__cabecalho';
    const etiqueta = document.createElement('label');
    etiqueta.className = CLASSE_MOSTRAR_CERTAS;
    etiqueta.title = DICA_MOSTRAR_CERTAS;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.addEventListener('change', () => {
        estadoMostrarCertas.ligado = caixa.checked;
        aplicarMostrarCertas();
    });
    const chave = document.createElement('span');
    chave.className = CLASSE_MOSTRAR_CERTAS + '__chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_MOSTRAR_CERTAS;
    etiqueta.append(caixa, chave, texto);
    titulo.replaceWith(cabecalho);
    cabecalho.append(titulo, etiqueta);
}

(function incluirEstiloMostrarCertas() {
    if (!BASE_SCRIPTS_MOSTRAR_CERTAS) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_MOSTRAR_CERTAS + '../css/mostrar-certas-discursiva.css';
    document.head.appendChild(link);
})();

window.ligarMostrarCertas = ligarMostrarCertas;
window.mostrarCertasDoAluno = mostrarCertasDoAluno;
