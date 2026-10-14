// Aluno: ON/OFF "Mostrar Certas" no quadro da nota da prova corrigida (resultado-aluno-discursiva.js).
// Desligado (padrão): a prova esconde as perguntas em que o aluno acertou tudo (todos os tópicos
// com a nota cheia do professor), sobrando só o que errou ou acertou pela metade; ligado: mostra
// todas. Pergunta ainda sem nota nunca é escondida. Só muda a tela; a escolha fica no localStorage
// do navegador (resultado-aluno:mostrar-certas). Mesmo visual do filtro do professor (CSS de
// assets/css/mostrar-certas-discursiva.css). Tarefa #158. Regra: docs/regras/atividades.md

const CLASSE_MOSTRAR_CERTAS_ALUNO = 'mostrar-certas';
const CLASSE_PERGUNTA_CERTA_OCULTA = 'questao-discursiva--certa-oculta';
const SELETOR_PERGUNTA_MOSTRAR_CERTAS_ALUNO = '.questao-discursiva[data-item]';
const CHAVE_MEMORIA_CERTAS_ALUNO = 'resultado-aluno:mostrar-certas';
const TEXTO_MOSTRAR_CERTAS_ALUNO = 'Mostrar Certas';
const DICA_MOSTRAR_CERTAS_ALUNO = 'Desligado: só as perguntas que você errou ou acertou pela ' +
    'metade. Ligado: também as que você acertou.';
const TOLERANCIA_CERTAS_ALUNO = 0.001;
const BASE_SCRIPTS_CERTAS_ALUNO = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Lê a escolha guardada no navegador (sem localStorage ou com erro, desligado).
 * @returns {boolean} true se o aluno deixou "Mostrar Certas" ligado.
 */
function lerEscolhaCertasAluno() {
    try {
        return window.localStorage.getItem(CHAVE_MEMORIA_CERTAS_ALUNO) === 'sim';
    } catch (erro) {
        return false;
    }
}

/**
 * Guarda a escolha no navegador. Falha em silêncio.
 * @param {boolean} ligado - Estado escolhido.
 */
function guardarEscolhaCertasAluno(ligado) {
    try {
        window.localStorage.setItem(CHAVE_MEMORIA_CERTAS_ALUNO, ligado ? 'sim' : 'nao');
    } catch (erro) {
        // Sem localStorage (janela privada, dados bloqueados): a tela segue sem lembrar.
    }
}

/**
 * Descobre as perguntas em que o aluno acertou todos os tópicos (nota do professor cheia).
 * @param {Object[]} correcoes - Linhas {item, topico, nota_professor} confirmadas.
 * @param {Object[]} gabarito - Linhas {item, topico, pontos}.
 * @returns {Set<number>} Números das perguntas certas.
 */
function listarPerguntasCertasDoAluno(correcoes, gabarito) {
    const notas = new Map(correcoes.map((linha) => [linha.item + '|' + linha.topico, linha]));
    const naoCertas = new Set();
    gabarito.forEach((linha) => {
        const correcao = notas.get(linha.item + '|' + linha.topico);
        const nota = correcao?.nota_professor;
        const estaCerta = nota !== null && nota !== undefined &&
            Number(nota) >= Number(linha.pontos) - TOLERANCIA_CERTAS_ALUNO;
        if (!estaCerta) naoCertas.add(linha.item);
    });
    return new Set(gabarito.map((linha) => linha.item).filter((item) => !naoCertas.has(item)));
}

/**
 * Esconde (desligado) ou mostra (ligado) as perguntas certas.
 * @param {Set<number>} certas - Números das perguntas certas.
 * @param {boolean} mostrar - true mostra as certas; false esconde.
 */
function aplicarMostrarCertasAluno(certas, mostrar) {
    document.querySelectorAll(SELETOR_PERGUNTA_MOSTRAR_CERTAS_ALUNO).forEach((pergunta) => {
        const esconder = !mostrar && certas.has(Number(pergunta.dataset.item));
        pergunta.classList.toggle(CLASSE_PERGUNTA_CERTA_OCULTA, esconder);
    });
}

/**
 * Cria o ON/OFF "Mostrar Certas" (caixa invisível + chave) com a escolha guardada.
 * @param {function(boolean): void} aoMudar - Chamada com o novo estado ao clicar.
 * @returns {HTMLLabelElement} Etiqueta pronta.
 */
function criarChaveMostrarCertasAluno(aoMudar) {
    const etiqueta = document.createElement('label');
    etiqueta.className = CLASSE_MOSTRAR_CERTAS_ALUNO;
    etiqueta.title = DICA_MOSTRAR_CERTAS_ALUNO;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = lerEscolhaCertasAluno();
    caixa.addEventListener('change', () => aoMudar(caixa.checked));
    const chave = document.createElement('span');
    chave.className = CLASSE_MOSTRAR_CERTAS_ALUNO + '__chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_MOSTRAR_CERTAS_ALUNO;
    etiqueta.append(caixa, chave, texto);
    return etiqueta;
}

/**
 * Põe o ON/OFF "Mostrar Certas" no quadro da nota do aluno e aplica a escolha guardada.
 * @param {HTMLElement} quadro - Quadro da nota (topo da prova corrigida).
 * @param {{correcoes: Object[], gabarito: Object[]}} dados - Correções confirmadas e gabarito.
 */
function ligarMostrarCertasAluno(quadro, dados) {
    const certas = listarPerguntasCertasDoAluno(dados.correcoes, dados.gabarito);
    const chave = criarChaveMostrarCertasAluno((ligado) => {
        guardarEscolhaCertasAluno(ligado);
        aplicarMostrarCertasAluno(certas, ligado);
    });
    const area = document.createElement('div');
    area.className = CLASSE_MOSTRAR_CERTAS_ALUNO + '__cabecalho';
    area.appendChild(chave);
    quadro.appendChild(area);
    aplicarMostrarCertasAluno(certas, lerEscolhaCertasAluno());
}

(function incluirEstiloMostrarCertasAluno() {
    if (!BASE_SCRIPTS_CERTAS_ALUNO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_CERTAS_ALUNO + '../css/mostrar-certas-discursiva.css';
    document.head.appendChild(link);
})();

window.ligarMostrarCertasAluno = ligarMostrarCertasAluno;
