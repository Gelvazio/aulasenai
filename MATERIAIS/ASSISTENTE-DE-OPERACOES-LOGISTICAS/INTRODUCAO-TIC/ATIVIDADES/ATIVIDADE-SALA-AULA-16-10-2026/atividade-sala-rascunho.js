/**
 * Rascunho da atividade de sala avulsa (16/10/2026).
 * Guarda no navegador só as respostas do aluno, para não perder o que foi digitado se a
 * página fechar. Não guarda gabarito (a página não tem gabarito).
 */

const CHAVE_RASCUNHO = 'atividade-sala-itic-2026-10-16';
const SELETOR_CAMPOS_RASCUNHO = 'input, textarea, select';
const TIPO_RADIO = 'radio';

/**
 * Monta a chave estável de um campo (nome do grupo, id ou rótulo).
 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} campo - Campo da página.
 * @returns {string|null} Chave do campo, ou null se não tiver identificação.
 */
function obterChaveCampo(campo) {
    if (campo.type === TIPO_RADIO) return 'radio:' + campo.name;
    if (campo.id) return 'id:' + campo.id;
    if (campo.dataset.rotulo) return 'rotulo:' + campo.dataset.rotulo;
    return null;
}

/**
 * Lê o valor atual de todos os campos da página.
 * @param {ParentNode} raiz - Elemento onde procurar os campos.
 * @returns {Object<string, string>} Mapa chave → valor.
 */
function lerValoresCampos(raiz) {
    const valores = {};
    raiz.querySelectorAll(SELETOR_CAMPOS_RASCUNHO).forEach((campo) => {
        const chave = obterChaveCampo(campo);
        if (!chave) return;

        if (campo.type === TIPO_RADIO) {
            if (campo.checked) valores[chave] = campo.value;
            return;
        }
        valores[chave] = campo.value;
    });
    return valores;
}

/**
 * Devolve aos campos da página os valores guardados.
 * @param {ParentNode} raiz - Elemento onde procurar os campos.
 * @param {Object<string, string>} valores - Mapa chave → valor.
 * @returns {void}
 */
function aplicarValoresCampos(raiz, valores) {
    raiz.querySelectorAll(SELETOR_CAMPOS_RASCUNHO).forEach((campo) => {
        const chave = obterChaveCampo(campo);
        const temValorGuardado = Boolean(chave) && Object.hasOwn(valores, chave);
        if (!temValorGuardado) return;

        if (campo.type === TIPO_RADIO) {
            campo.checked = campo.value === valores[chave];
            return;
        }
        campo.value = valores[chave];
    });
}

/**
 * Cria o rascunho sobre um armazenamento (injetado para poder trocar a implementação).
 * Falhas do armazenamento (janela anônima, bloqueio) são ignoradas: a página segue funcionando.
 * @param {Storage} armazenamento - Ex.: window.localStorage.
 * @returns {{salvar: Function, restaurar: Function, limpar: Function}} Operações do rascunho.
 */
function criarRascunho(armazenamento) {
    return {
        salvar(raiz) {
            try {
                armazenamento.setItem(CHAVE_RASCUNHO, JSON.stringify(lerValoresCampos(raiz)));
                return true;
            } catch (erro) {
                return false;
            }
        },
        restaurar(raiz) {
            try {
                const texto = armazenamento.getItem(CHAVE_RASCUNHO);
                if (texto) aplicarValoresCampos(raiz, JSON.parse(texto));
            } catch (erro) {
                console.warn('Rascunho não restaurado:', erro);
            }
        },
        limpar() {
            try {
                armazenamento.removeItem(CHAVE_RASCUNHO);
            } catch (erro) {
                console.warn('Rascunho não apagado:', erro);
            }
        },
    };
}

window.criarRascunho = criarRascunho;
