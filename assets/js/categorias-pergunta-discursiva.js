// Professor e aluno: os três ON/OFF "Mostrar Certas", "Mostrar Meia Certas" e "Mostrar Erradas" da
// avaliação discursiva. Todos desmarcados: mostra todas as perguntas; marcados: combinam (mostra as
// perguntas de qualquer categoria marcada). Pergunta ainda sem nota (categoria desconhecida) nunca
// é escondida. Categoria da pergunta: certa = todos os tópicos com a nota cheia; errada = todos com
// nota zero; meia certa = o resto. As escolhas ficam no localStorage do navegador (o chamador diz
// o prefixo das chaves). Só muda a tela. Usado por mostrar-certas-discursiva.js (professor) e
// mostrar-certas-aluno-discursiva.js (aluno). Tarefa #159. Regra: docs/regras/atividades.md

const CLASSE_CATEGORIA_PERGUNTA = 'mostrar-certas';
const TOLERANCIA_CATEGORIA_PERGUNTA = 0.001;
const CATEGORIAS_PERGUNTA = [
    { chave: 'certa', texto: 'Mostrar Certas', dica: 'Mostra as perguntas certas.' },
    { chave: 'meia', texto: 'Mostrar Meia Certas', dica: 'Mostra as perguntas meia certas.' },
    { chave: 'errada', texto: 'Mostrar Erradas', dica: 'Mostra as perguntas erradas.' },
];
const BASE_SCRIPTS_CATEGORIA_PERGUNTA = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Classifica uma pergunta pelas notas dos tópicos.
 * @param {{nota: number|null|undefined, pontos: number}[]} topicos - Tópicos considerados.
 * @returns {string|null} 'certa', 'meia', 'errada', ou null se não houver tópico ou se algum
 *     ainda estiver sem nota (a pergunta então nunca é escondida).
 */
function classificarPerguntaPorNotas(topicos) {
    if (!topicos.length) return null;
    const semNota = topicos.some((topico) => topico.nota === null || topico.nota === undefined);
    if (semNota) return null;

    const todosCheios = topicos.every((topico) =>
        Number(topico.nota) >= Number(topico.pontos) - TOLERANCIA_CATEGORIA_PERGUNTA);
    if (todosCheios) return 'certa';
    const todosZero = topicos.every((topico) => Number(topico.nota) <= 0);
    return todosZero ? 'errada' : 'meia';
}

/**
 * Diz se a pergunta aparece com as escolhas atuais.
 * @param {string|null} categoria - Categoria da pergunta (null = sem nota).
 * @param {{certa: boolean, meia: boolean, errada: boolean}} escolhas - Filtros marcados.
 * @returns {boolean} true se a pergunta deve aparecer.
 */
function perguntaPassaNoFiltro(categoria, escolhas) {
    const algumMarcado = CATEGORIAS_PERGUNTA.some((item) => escolhas[item.chave]);
    if (!algumMarcado || !categoria) return true;
    return Boolean(escolhas[categoria]);
}

/**
 * Lê do navegador as escolhas guardadas (sem localStorage ou com erro, tudo desmarcado).
 * @param {string} prefixoMemoria - Prefixo das chaves (ex.: "respostas-aluno:categoria-").
 * @returns {{certa: boolean, meia: boolean, errada: boolean}} Filtros marcados.
 */
function lerEscolhasCategorias(prefixoMemoria) {
    const escolhas = { certa: false, meia: false, errada: false };
    CATEGORIAS_PERGUNTA.forEach((item) => {
        try {
            const guardado = window.localStorage.getItem(prefixoMemoria + item.chave);
            escolhas[item.chave] = guardado === 'sim';
        } catch (erro) {
            escolhas[item.chave] = false;
        }
    });
    return escolhas;
}

/**
 * Guarda no navegador a escolha de uma categoria. Falha em silêncio.
 * @param {string} prefixoMemoria - Prefixo das chaves.
 * @param {{chave: string, ligado: boolean}} escolha - Categoria e estado escolhido.
 */
function guardarEscolhaCategoria(prefixoMemoria, escolha) {
    try {
        window.localStorage.setItem(prefixoMemoria + escolha.chave, escolha.ligado ? 'sim' : 'nao');
    } catch (erro) {
        // Sem localStorage (janela privada, dados bloqueados): a tela segue sem lembrar.
    }
}

/**
 * Cria um ON/OFF (caixa invisível + chave) de uma categoria.
 * @param {{texto: string, dica: string}} categoria - Rótulo e dica.
 * @param {{ligado: boolean, aoMudar: function(boolean): void}} dados - Estado inicial e reação.
 * @returns {HTMLLabelElement} Etiqueta pronta.
 */
function criarChaveCategoria(categoria, dados) {
    const etiqueta = document.createElement('label');
    etiqueta.className = CLASSE_CATEGORIA_PERGUNTA;
    etiqueta.title = categoria.dica;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = dados.ligado;
    caixa.addEventListener('change', () => dados.aoMudar(caixa.checked));
    const chave = document.createElement('span');
    chave.className = CLASSE_CATEGORIA_PERGUNTA + '__chave';
    const texto = document.createElement('span');
    texto.textContent = categoria.texto;
    etiqueta.append(caixa, chave, texto);
    return etiqueta;
}

/**
 * Cria os três ON/OFF, com as escolhas guardadas, que guardam cada mudança.
 * @param {{prefixoMemoria: string, escolhas: Object, aoMudar: Function}} dados - Prefixo das
 *     chaves, objeto de escolhas (é atualizado no lugar) e função chamada a cada mudança.
 * @returns {HTMLLabelElement[]} Os três ON/OFF, na ordem Certas, Meia Certas e Erradas.
 */
function criarChavesCategorias(dados) {
    Object.assign(dados.escolhas, lerEscolhasCategorias(dados.prefixoMemoria));
    return CATEGORIAS_PERGUNTA.map((categoria) => criarChaveCategoria(categoria, {
        ligado: dados.escolhas[categoria.chave],
        aoMudar: (ligado) => {
            dados.escolhas[categoria.chave] = ligado;
            guardarEscolhaCategoria(dados.prefixoMemoria, { chave: categoria.chave, ligado });
            dados.aoMudar();
        },
    }));
}

(function incluirEstiloCategoriaPergunta() {
    if (!BASE_SCRIPTS_CATEGORIA_PERGUNTA) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_CATEGORIA_PERGUNTA + '../css/mostrar-certas-discursiva.css';
    document.head.appendChild(link);
})();

window.classificarPerguntaPorNotas = classificarPerguntaPorNotas;
window.perguntaPassaNoFiltro = perguntaPassaNoFiltro;
window.lerEscolhasCategorias = lerEscolhasCategorias;
window.criarChavesCategorias = criarChavesCategorias;
