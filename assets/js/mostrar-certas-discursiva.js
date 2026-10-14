// Professor: ON/OFF "Mostrar Certas" ao lado de "🧑‍🎓 Respostas dos alunos" da avaliação
// discursiva. Desligado (padrão): ao escolher um aluno, a prova mostra só as questões MEIA CERTA ou
// ERRADA; ligado: mostra também as certas. Certa = todos os tópicos da questão com a nota cheia
// do professor OU da IA (qualquer das duas). Questão ainda sem nota nunca é escondida. Sem
// aluno escolhido, nenhuma questão é escondida. Só muda a tela: nada é gravado.
// Também traz o ON/OFF "Falta Corrigir?" (ligado ao abrir): ligado, ao escolher um aluno, a prova
// mostra só as questões que o professor ainda não corrigiu (algum tópico sem nota do professor);
// os dois filtros valem juntos. Tarefa #150.
// Os dois ON/OFF ficam guardados no navegador (respostas-aluno:falta-corrigir e
// respostas-aluno:mostrar-certas, via respostas-aluno-professor.js) e voltam ao abrir (#157).
// Pedido do usuário em 2026-10-14 (tarefa #148). Carregado por assets/js/avaliacao-discursiva.js.
// Depende de js/supabase.js (sbGet). Regra: docs/regras/atividades.md

const CLASSE_MOSTRAR_CERTAS = 'mostrar-certas';
const EVENTO_NOTA_CONFIRMADA_ESCUTADO = 'nota-professor-confirmada';
const CLASSE_QUESTAO_CERTA_OCULTA = 'questao-discursiva--certa-oculta';
const CLASSE_QUESTAO_CORRIGIDA_OCULTA = 'questao-discursiva--corrigida-oculta';
const SELETOR_QUESTAO_MOSTRAR_CERTAS = '.questao-discursiva[data-item]';
const SELETOR_TITULO_RESPOSTAS_ALUNO = '.respostas-aluno-professor__titulo';
const TEXTO_MOSTRAR_CERTAS = 'Mostrar Certas';
const MEMORIA_FALTA_CORRIGIR = 'falta-corrigir';
const MEMORIA_MOSTRAR_CERTAS = 'mostrar-certas';
const TEXTO_FALTA_CORRIGIR = 'Falta Corrigir?';
const DICA_FALTA_CORRIGIR = 'Ligado: só as questões do aluno escolhido que o professor ainda ' +
    'não corrigiu. Desligado: também as já corrigidas.';
const DICA_MOSTRAR_CERTAS = 'Desligado: só as questões meia certa ou errada do aluno ' +
    'escolhido. Ligado: também as certas.';
const BASE_SCRIPTS_MOSTRAR_CERTAS = document.currentScript?.src.replace(/[^/]*$/, '') || '';

const estadoMostrarCertas = {
    aluno: null,
    atividadeId: 0,
    ligado: false,
    faltaCorrigir: true,
    questoesCertas: new Set(),
    questoesCorrigidas: new Set(),
};

/**
 * Diz se a nota atinge a pontuação cheia do tópico.
 * @param {number|null|undefined} nota - Nota dada (professor ou IA).
 * @param {number} pontos - Pontuação cheia do tópico.
 * @returns {boolean} true se a nota existe e é cheia.
 */
function notaEhCheia(nota, pontos) {
    if (nota === null || nota === undefined) return false;
    return Number(nota) >= Number(pontos);
}

/**
 * Lê as questões certas (todos os tópicos com nota cheia) e as já corrigidas pelo professor
 * (todos os tópicos RESPONDIDOS com nota do professor; tópico em branco não conta) do aluno.
 * @param {{alunoId: string, tentativa: number}} aluno - Aluno escolhido.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{certas: Set<number>, corrigidas: Set<number>}>} Números das questões.
 * @throws {Error} Se o banco recusar.
 */
async function lerQuestoesDoAluno(aluno, atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const doAluno = '&aluno_id=eq.' + aluno.alunoId + '&tentativa=eq.' + aluno.tentativa;
    const [correcoes, topicos, respostas] = await Promise.all([
        sbGet('correcao_discursiva',
            'select=item,topico,nota_ia,nota_professor&' + filtro + doAluno),
        sbGet('topico_discursivo', 'select=item,topico,pontos&' + filtro),
        sbGet('resposta_discursiva', 'select=item,topico,texto&' + filtro + doAluno),
    ]);
    const respondidos = new Set(respostas.filter((linha) => (linha.texto || '').trim() !== '')
        .map((linha) => linha.item + '|' + linha.topico));
    const porTopico = new Map(correcoes.map((linha) => [linha.item + '|' + linha.topico, linha]));
    const naoCertas = new Set();
    const naoCorrigidas = new Set();
    topicos.forEach((topico) => {
        const linha = porTopico.get(topico.item + '|' + topico.topico);
        const estaCerta = notaEhCheia(linha?.nota_professor, topico.pontos) ||
            notaEhCheia(linha?.nota_ia, topico.pontos);
        const temNotaDoProfessor = linha?.nota_professor !== null &&
            linha?.nota_professor !== undefined;
        if (!estaCerta) naoCertas.add(topico.item);
        const estaRespondido = respondidos.has(topico.item + '|' + topico.topico);
        if (estaRespondido && !temNotaDoProfessor) naoCorrigidas.add(topico.item);
    });
    const itens = topicos.map((topico) => topico.item);
    return {
        certas: new Set(itens.filter((item) => !naoCertas.has(item))),
        corrigidas: new Set(itens.filter((item) => !naoCorrigidas.has(item))),
    };
}

/**
 * Diz quais regras escondem a questão: "Falta Corrigir?" ligado esconde as já corrigidas pelo
 * professor; "Mostrar Certas" desligado esconde as certas (nota cheia do professor ou da IA).
 * @param {number} item - Número da questão.
 * @returns {{certa: boolean, corrigida: boolean}} Qual regra esconde a questão.
 */
function regrasQueEscondem(item) {
    const corrigida = estadoMostrarCertas.faltaCorrigir &&
        estadoMostrarCertas.questoesCorrigidas.has(item);
    const certa = !estadoMostrarCertas.ligado && estadoMostrarCertas.questoesCertas.has(item);
    return { certa, corrigida };
}

/**
 * Esconde ou mostra as questões do aluno escolhido conforme os dois ON/OFF.
 */
function aplicarMostrarCertas() {
    document.querySelectorAll(SELETOR_QUESTAO_MOSTRAR_CERTAS).forEach((questao) => {
        const { certa, corrigida } = regrasQueEscondem(Number(questao.dataset.item));
        questao.classList.toggle(CLASSE_QUESTAO_CERTA_OCULTA, certa);
        questao.classList.toggle(CLASSE_QUESTAO_CORRIGIDA_OCULTA, corrigida);
    });
}

/**
 * Atualiza as questões certas e corrigidas do aluno escolhido (null = nenhum: mostra todas).
 * @param {Object|null} aluno - Aluno escolhido no combo.
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarCertasDoAluno(aluno, atividadeId) {
    estadoMostrarCertas.aluno = aluno;
    estadoMostrarCertas.atividadeId = atividadeId;
    estadoMostrarCertas.questoesCertas = new Set();
    estadoMostrarCertas.questoesCorrigidas = new Set();
    try {
        if (aluno && atividadeId) {
            const questoes = await lerQuestoesDoAluno(aluno, atividadeId);
            estadoMostrarCertas.questoesCertas = questoes.certas;
            estadoMostrarCertas.questoesCorrigidas = questoes.corrigidas;
        }
    } finally {
        aplicarMostrarCertas();
    }
}

/**
 * Monta um ON/OFF (caixa invisível + chave) com o visual do "Mostrar Certas".
 * @param {{texto: string, dica: string, ligado: boolean}} dados - Rótulo, dica e estado inicial.
 * @param {function(boolean): void} aoMudar - Chamada com o novo estado ao clicar.
 * @returns {HTMLLabelElement} Etiqueta pronta para entrar na tela.
 */
function criarChaveOnOff(dados, aoMudar) {
    const etiqueta = document.createElement('label');
    etiqueta.className = CLASSE_MOSTRAR_CERTAS;
    etiqueta.title = dados.dica;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = dados.ligado;
    caixa.addEventListener('change', () => aoMudar(caixa.checked));
    const chave = document.createElement('span');
    chave.className = CLASSE_MOSTRAR_CERTAS + '__chave';
    const texto = document.createElement('span');
    texto.textContent = dados.texto;
    etiqueta.append(caixa, chave, texto);
    return etiqueta;
}

/**
 * Volta os dois ON/OFF ao que ficou guardado no navegador (padrão: Falta Corrigir? ligado e
 * Mostrar Certas desligado).
 */
function restaurarEscolhasMostrarCertas() {
    const ler = window.lerMemoriaRespostasAluno;
    if (!ler) return;
    estadoMostrarCertas.faltaCorrigir = ler(MEMORIA_FALTA_CORRIGIR) !== 'nao';
    estadoMostrarCertas.ligado = ler(MEMORIA_MOSTRAR_CERTAS) === 'sim';
}

/**
 * Guarda no navegador a escolha de um dos ON/OFF.
 * @param {string} chave - Nome da preferência.
 * @param {boolean} ligado - Estado escolhido.
 */
function guardarEscolhaMostrarCertas(chave, ligado) {
    window.gravarMemoriaRespostasAluno?.(chave, ligado ? 'sim' : 'nao');
}

/**
 * Põe os ON/OFF "Falta Corrigir?" (ligado) e "Mostrar Certas" (desligado) ao lado do título
 * "Respostas dos alunos" (com a escolha que ficou guardada no navegador).
 * @param {HTMLElement} painel - Painel do professor (com a área "Respostas dos alunos").
 */
function ligarMostrarCertas(painel) {
    const titulo = painel.querySelector(SELETOR_TITULO_RESPOSTAS_ALUNO);
    const jaExiste = painel.querySelector('.' + CLASSE_MOSTRAR_CERTAS);
    if (!titulo || jaExiste) return;

    restaurarEscolhasMostrarCertas();
    const cabecalho = document.createElement('div');
    cabecalho.className = CLASSE_MOSTRAR_CERTAS + '__cabecalho';
    const faltaCorrigir = criarChaveOnOff({
        texto: TEXTO_FALTA_CORRIGIR, dica: DICA_FALTA_CORRIGIR,
        ligado: estadoMostrarCertas.faltaCorrigir,
    }, (ligado) => {
        estadoMostrarCertas.faltaCorrigir = ligado;
        guardarEscolhaMostrarCertas(MEMORIA_FALTA_CORRIGIR, ligado);
        aplicarMostrarCertas();
    });
    const mostrarCertas = criarChaveOnOff({
        texto: TEXTO_MOSTRAR_CERTAS, dica: DICA_MOSTRAR_CERTAS,
        ligado: estadoMostrarCertas.ligado,
    }, (ligado) => {
        estadoMostrarCertas.ligado = ligado;
        guardarEscolhaMostrarCertas(MEMORIA_MOSTRAR_CERTAS, ligado);
        aplicarMostrarCertas();
    });
    titulo.replaceWith(cabecalho);
    cabecalho.append(titulo, faltaCorrigir, mostrarCertas);
    aplicarMostrarCertas();
}

(function incluirEstiloMostrarCertas() {
    if (!BASE_SCRIPTS_MOSTRAR_CERTAS) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_MOSTRAR_CERTAS + '../css/mostrar-certas-discursiva.css';
    document.head.appendChild(link);
})();

// Quando o professor marca Certa / Meia certa / Errada, a lista do aluno escolhido é refeita.
document.addEventListener(EVENTO_NOTA_CONFIRMADA_ESCUTADO, () => {
    const { aluno, atividadeId } = estadoMostrarCertas;
    if (aluno) mostrarCertasDoAluno(aluno, atividadeId);
});

window.ligarMostrarCertas = ligarMostrarCertas;
window.mostrarCertasDoAluno = mostrarCertasDoAluno;
