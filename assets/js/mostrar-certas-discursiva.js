// Professor: ON/OFF "Falta Corrigir?", "Mostrar Certas", "Mostrar Meia Certas" e "Mostrar Erradas"
// ao lado de "🧑‍🎓 Respostas dos alunos" da avaliação discursiva. Ao escolher um aluno:
// - "Falta Corrigir?" (ligado ao abrir): mostra só as questões que o professor ainda não marcou
//   (algum tópico RESPONDIDO sem nota do professor; tópico em branco não conta) — tarefa #150;
// - "Mostrar Certas / Meia Certas / Erradas" (categorias em categorias-pergunta-discursiva.js):
//   todos desmarcados mostra todas; marcados combinam — tarefa #159. Em cada tópico, a nota
//   que vale é a do professor se ele já confirmou; senão a sugestão da IA (#363).
//   Questão sem nota nunca é escondida.
// Os filtros valem juntos. Só muda a tela: nada é gravado. As escolhas ficam no localStorage
// (respostas-aluno:falta-corrigir e respostas-aluno:categoria-*) e voltam ao abrir (#157).
// Carregado por assets/js/avaliacao-discursiva.js. Depende de js/supabase.js (sbGet) e de
// assets/js/categorias-pergunta-discursiva.js. Regra: docs/regras/atividades.md

const CLASSE_MOSTRAR_CERTAS = 'mostrar-certas';
const EVENTO_NOTA_CONFIRMADA_ESCUTADO = 'nota-professor-confirmada';
const CLASSE_QUESTAO_CATEGORIA_OCULTA = 'questao-discursiva--categoria-oculta';
const CLASSE_TOPICO_CATEGORIA_OCULTO = 'topico-resposta--categoria-oculto';
const SELETOR_TOPICO_MOSTRAR_CERTAS = '.topico-resposta[data-item][data-topico]';
const CLASSE_QUESTAO_CORRIGIDA_OCULTA = 'questao-discursiva--corrigida-oculta';
const SELETOR_QUESTAO_MOSTRAR_CERTAS = '.questao-discursiva[data-item]';
const SELETOR_TITULO_RESPOSTAS_ALUNO = '.respostas-aluno-professor__titulo';
const PREFIXO_MEMORIA_CATEGORIAS_PROFESSOR = 'respostas-aluno:categoria-';
const MEMORIA_FALTA_CORRIGIR = 'falta-corrigir';
const TEXTO_FALTA_CORRIGIR = 'Falta Corrigir?';
const DICA_FALTA_CORRIGIR = 'Ligado: só as questões do aluno escolhido que o professor ainda ' +
    'não marcou. Desligado: também as já marcadas.';
const BASE_SCRIPTS_MOSTRAR_CERTAS = document.currentScript?.src.replace(/[^/]*$/, '') || '';

const estadoMostrarCertas = {
    aluno: null,
    atividadeId: 0,
    faltaCorrigir: true,
    escolhas: { certa: false, meia: false, errada: false },
    categorias: new Map(),
    categoriasTopico: new Map(),
    questoesCorrigidas: new Set(),
};

/**
 * Notas que valem na pergunta, tópico a tópico: a do professor quando ele já confirmou o
 * tópico; senão a sugestão da IA.
 * @param {{notaIa: number|null, notaProfessor: number|null, pontos: number}[]} topicos -
 *     Tópicos respondidos da pergunta.
 * @returns {{nota: number|null, pontos: number}[]} Notas e pontos de cada tópico.
 */
function notasQueValemNaPergunta(topicos) {
    return topicos.map((topico) => ({
        nota: topico.notaProfessor ?? topico.notaIa, pontos: topico.pontos }));
}

/**
 * Converte a nota lida do banco em número (null quando ainda não há).
 * @param {number|string|null|undefined} valor - Nota do banco.
 * @returns {number|null} Nota ou null.
 */
function lerNotaDoBanco(valor) {
    return valor === null || valor === undefined ? null : Number(valor);
}

/**
 * Lê do banco as correções, os tópicos e as respostas do aluno.
 * @param {{alunoId: string, tentativa: number}} aluno - Aluno escolhido.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{correcoes: Object[], topicos: Object[], respostas: Object[]}>} Linhas.
 * @throws {Error} Se o banco recusar.
 */
async function lerDadosDoAlunoParaFiltrar(aluno, atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const doAluno = '&aluno_id=eq.' + aluno.alunoId + '&tentativa=eq.' + aluno.tentativa;
    const [correcoes, topicos, respostas] = await Promise.all([
        sbGet('correcao_discursiva',
            'select=item,topico,nota_ia,nota_professor&' + filtro + doAluno),
        sbGet('topico_discursivo', 'select=item,topico,pontos&' + filtro),
        sbGet('resposta_discursiva', 'select=item,topico,texto&' + filtro + doAluno),
    ]);
    return { correcoes, topicos, respostas };
}

/**
 * Agrupa por pergunta os tópicos respondidos do aluno, com a nota da IA e a do professor.
 * @param {{correcoes: Object[], topicos: Object[], respostas: Object[]}} dados - Linhas lidas.
 * @returns {Map<number, Object[]>} Tópicos respondidos de cada pergunta.
 */
function agruparTopicosRespondidos(dados) {
    const respondidos = new Set(dados.respostas
        .filter((linha) => (linha.texto || '').trim() !== '')
        .map((linha) => linha.item + '|' + linha.topico));
    const porTopico = new Map(dados.correcoes.map((linha) =>
        [linha.item + '|' + linha.topico, linha]));
    const topicosPorItem = new Map();
    dados.topicos.filter((topico) => respondidos.has(topico.item + '|' + topico.topico))
        .forEach((topico) => {
            const linha = porTopico.get(topico.item + '|' + topico.topico);
            const lista = topicosPorItem.get(topico.item) || [];
            lista.push({ topico: topico.topico, notaIa: lerNotaDoBanco(linha?.nota_ia),
                notaProfessor: lerNotaDoBanco(linha?.nota_professor), pontos: topico.pontos });
            topicosPorItem.set(topico.item, lista);
        });
    return topicosPorItem;
}

/**
 * Classifica cada pergunta e cada alternativa do aluno (certa, meia, errada ou sem nota) e acha
 * as perguntas já marcadas pelo professor (todos os tópicos respondidos com nota dele). Em cada
 * tópico vale a nota do professor se ele já confirmou; senão a sugestão da IA. Pergunta sem
 * nenhum tópico respondido não tem categoria e conta como já marcada.
 * @param {{alunoId: string, tentativa: number}} aluno - Aluno escolhido.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{categorias: Map<number, string|null>, categoriasTopico:
 *     Map<string, string|null>, corrigidas: Set<number>}>} Resultado.
 * @throws {Error} Se o banco recusar.
 */
async function lerQuestoesDoAluno(aluno, atividadeId) {
    const dados = await lerDadosDoAlunoParaFiltrar(aluno, atividadeId);
    const topicosPorItem = agruparTopicosRespondidos(dados);
    const categorias = new Map();
    const categoriasTopico = new Map();
    const corrigidas = new Set();
    new Set(dados.topicos.map((topico) => topico.item)).forEach((item) => {
        const lista = topicosPorItem.get(item) || [];
        categorias.set(item, window.classificarPerguntaPorNotas(
            notasQueValemNaPergunta(lista)));
        lista.forEach((topico) => categoriasTopico.set(item + '|' + topico.topico,
            window.classificarPerguntaPorNotas(notasQueValemNaPergunta([topico]))));
        if (lista.every((topico) => topico.notaProfessor !== null)) corrigidas.add(item);
    });
    return { categorias, categoriasTopico, corrigidas };
}

/**
 * Diz quais regras escondem a questão: "Falta Corrigir?" ligado esconde as já marcadas pelo
 * professor; os filtros de categoria escondem as categorias não marcadas (se algum estiver
 * marcado).
 * @param {number} item - Número da questão.
 * @returns {{categoria: boolean, corrigida: boolean}} Qual regra esconde a questão.
 */
function regrasQueEscondem(item) {
    const corrigida = estadoMostrarCertas.faltaCorrigir &&
        estadoMostrarCertas.questoesCorrigidas.has(item);
    const categoria = !window.perguntaPassaNoFiltro(
        estadoMostrarCertas.categorias.get(item) || null, estadoMostrarCertas.escolhas);
    return { categoria, corrigida };
}

/**
 * Esconde ou mostra as alternativas de uma pergunta pela categoria de cada uma.
 * @param {HTMLElement} questao - Pergunta na tela.
 * @returns {boolean} true se a pergunta tem alternativas e todas ficaram escondidas.
 */
function aplicarCategoriaNasAlternativas(questao) {
    const blocos = [...questao.querySelectorAll(SELETOR_TOPICO_MOSTRAR_CERTAS)];
    const escondidos = blocos.map((bloco) => {
        const chave = bloco.dataset.item + '|' + bloco.dataset.topico;
        const categoria = estadoMostrarCertas.categoriasTopico.get(chave) || null;
        const esconder = !window.perguntaPassaNoFiltro(categoria, estadoMostrarCertas.escolhas);
        bloco.classList.toggle(CLASSE_TOPICO_CATEGORIA_OCULTO, esconder);
        return esconder;
    });
    return escondidos.length > 0 && escondidos.every(Boolean);
}

/**
 * Esconde ou mostra as perguntas e as alternativas do aluno escolhido conforme os filtros: a
 * categoria vale por alternativa; a pergunta some quando todas as alternativas somem.
 */
function aplicarMostrarCertas() {
    document.querySelectorAll(SELETOR_QUESTAO_MOSTRAR_CERTAS).forEach((questao) => {
        const { corrigida } = regrasQueEscondem(Number(questao.dataset.item));
        const semAlternativaVisivel = aplicarCategoriaNasAlternativas(questao);
        questao.classList.toggle(CLASSE_QUESTAO_CATEGORIA_OCULTA, semAlternativaVisivel);
        questao.classList.toggle(CLASSE_QUESTAO_CORRIGIDA_OCULTA, corrigida);
    });
}

/**
 * Atualiza as categorias e as questões já marcadas do aluno escolhido (null = mostra todas).
 * @param {Object|null} aluno - Aluno escolhido no combo.
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarCertasDoAluno(aluno, atividadeId) {
    estadoMostrarCertas.aluno = aluno;
    estadoMostrarCertas.atividadeId = atividadeId;
    estadoMostrarCertas.categorias = new Map();
    estadoMostrarCertas.categoriasTopico = new Map();
    estadoMostrarCertas.questoesCorrigidas = new Set();
    try {
        if (aluno && atividadeId) {
            const questoes = await lerQuestoesDoAluno(aluno, atividadeId);
            estadoMostrarCertas.categorias = questoes.categorias;
            estadoMostrarCertas.categoriasTopico = questoes.categoriasTopico;
            estadoMostrarCertas.questoesCorrigidas = questoes.corrigidas;
        }
    } finally {
        aplicarMostrarCertas();
    }
}

/**
 * Monta o ON/OFF "Falta Corrigir?" (caixa invisível + chave), com a escolha guardada.
 * @returns {HTMLLabelElement} Etiqueta pronta para entrar na tela.
 */
function criarChaveFaltaCorrigir() {
    const guardado = window.lerMemoriaRespostasAluno?.(MEMORIA_FALTA_CORRIGIR);
    estadoMostrarCertas.faltaCorrigir = guardado !== 'nao';
    const etiqueta = document.createElement('label');
    etiqueta.className = CLASSE_MOSTRAR_CERTAS;
    etiqueta.title = DICA_FALTA_CORRIGIR;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = estadoMostrarCertas.faltaCorrigir;
    caixa.addEventListener('change', () => {
        estadoMostrarCertas.faltaCorrigir = caixa.checked;
        window.gravarMemoriaRespostasAluno?.(MEMORIA_FALTA_CORRIGIR, caixa.checked ? 'sim' : 'nao');
        aplicarMostrarCertas();
    });
    const chave = document.createElement('span');
    chave.className = CLASSE_MOSTRAR_CERTAS + '__chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_FALTA_CORRIGIR;
    etiqueta.append(caixa, chave, texto);
    return etiqueta;
}

/**
 * Põe os ON/OFF ao lado do título "Respostas dos alunos" (com as escolhas guardadas no
 * navegador): Falta Corrigir? (padrão ligado) e Mostrar Certas / Meia Certas / Erradas (padrão
 * todos desmarcados = mostra todas).
 * @param {HTMLElement} painel - Painel do professor (com a área "Respostas dos alunos").
 */
function ligarMostrarCertas(painel) {
    const titulo = painel.querySelector(SELETOR_TITULO_RESPOSTAS_ALUNO);
    const jaExiste = painel.querySelector('.' + CLASSE_MOSTRAR_CERTAS);
    if (!titulo || jaExiste) return;

    const cabecalho = document.createElement('div');
    cabecalho.className = CLASSE_MOSTRAR_CERTAS + '__cabecalho';
    const categorias = window.criarChavesCategorias({
        prefixoMemoria: PREFIXO_MEMORIA_CATEGORIAS_PROFESSOR,
        escolhas: estadoMostrarCertas.escolhas, aoMudar: aplicarMostrarCertas });
    titulo.replaceWith(cabecalho);
    cabecalho.append(titulo, criarChaveFaltaCorrigir(), ...categorias);
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
