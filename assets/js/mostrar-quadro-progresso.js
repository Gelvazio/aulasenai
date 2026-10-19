// Professor: ON/OFF "Mostrar quadro" ao lado do título do Progresso da turma GLOBAL
// (progresso-turma-global.js), em toda atividade. OFF (padrão, em toda turma e atividade): o
// quadro abaixo do título fica escondido (só a linha do título aparece); ON: o quadro aparece.
// A escolha fica no localStorage do navegador, por atividade (progresso-turma:mostrar-quadro:<id>).
// Só mexe na tela: nada é lido nem gravado no banco.
// Pedido do usuário em 2026-10-18 (tarefa #289). Regra: docs/regras/atividades.md

const TEXTO_MOSTRAR_QUADRO = 'Mostrar quadro';
const DICA_MOSTRAR_QUADRO = 'Desligado: esconde o quadro do progresso. Ligado: mostra.';
const CLASSE_INTERRUPTOR_QUADRO = 'progresso-turma__interruptor';
const CLASSE_QUADRO_RECOLHIDO = 'progresso-turma--recolhido';
const CHAVE_BASE_MOSTRAR_QUADRO = 'mostrar-quadro';
const VALOR_LIGADO_MOSTRAR_QUADRO = 'sim';
const VALOR_DESLIGADO_MOSTRAR_QUADRO = 'nao';

/**
 * Monta a chave da escolha guardada, própria de cada atividade.
 * @param {number|string} atividadeId - Id da atividade.
 * @returns {string} Chave no formato "mostrar-quadro:<id>".
 */
function montarChaveMostrarQuadro(atividadeId) {
    return CHAVE_BASE_MOSTRAR_QUADRO + ':' + atividadeId;
}

/**
 * Mostra ou esconde o quadro do painel pelo modificador de CSS.
 * @param {HTMLElement} area - Seção do Progresso da turma.
 * @param {boolean} estaLigado - true mostra o quadro; false esconde.
 */
function aplicarQuadroProgresso(area, estaLigado) {
    area.classList.toggle(CLASSE_QUADRO_RECOLHIDO, !estaLigado);
}

/**
 * Cria o ON/OFF "Mostrar quadro" e já aplica a escolha guardada (sem ela, desligado e o
 * quadro escondido).
 * @param {{area: HTMLElement, atividadeId: number, preferencias: {ler: Function,
 *   gravar: Function}}} opcoes - Seção do painel, atividade e escolhas guardadas.
 * @returns {{elemento: HTMLElement}} O interruptor, para ser posto ao lado do título.
 */
function criarInterruptorQuadroProgresso({ area, atividadeId, preferencias }) {
    const chave = montarChaveMostrarQuadro(atividadeId);
    const elemento = document.createElement('label');
    elemento.className = CLASSE_INTERRUPTOR_QUADRO;
    elemento.title = DICA_MOSTRAR_QUADRO;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = preferencias?.ler(chave) === VALOR_LIGADO_MOSTRAR_QUADRO;
    caixa.addEventListener('change', () => {
        preferencias?.gravar(chave, caixa.checked
            ? VALOR_LIGADO_MOSTRAR_QUADRO : VALOR_DESLIGADO_MOSTRAR_QUADRO);
        aplicarQuadroProgresso(area, caixa.checked);
    });
    const marca = document.createElement('span');
    marca.className = CLASSE_INTERRUPTOR_QUADRO + '-chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_MOSTRAR_QUADRO;
    elemento.append(caixa, marca, texto);
    aplicarQuadroProgresso(area, caixa.checked);

    return { elemento };
}

window.criarInterruptorQuadroProgresso = criarInterruptorQuadroProgresso;
