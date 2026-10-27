// Atividade Dinâmica no PC (tarefa #410): estado que o aluno monta (marcas, redesenho e ficha).
// É o que vai para o banco (entrega_dinamica.estado); tudo que volta de lá passa por saneamento.
// Depende de dinamica-3d-formas.js (FORMAS_3D). Regra: docs/regras/atividade-dinamica.md

const VERSAO_ESTADO_3D = 1;
const ETAPAS_3D = ['raiox', 'redesenho', 'ficha'];
const LIMITE_ELEMENTOS_3D = 60;
const LIMITE_ROTULO_3D = 60;
const LIMITE_TEXTO_FICHA_3D = 1000;
const LIMITE_CAMPOS_FICHA_3D = 20;
const LIMITE_COORDENADA_3D = 400;
const LIMITE_RAIO_3D = 200;
const TAMANHO_MINIMO_3D = 8;
const COR_PADRAO_3D = '#4a5568';
const PADRAO_COR_3D = /^#[0-9a-fA-F]{6}$/;

/**
 * Cria um estado novo, sem marcas, sem redesenho e sem ficha.
 * @returns {Object} Estado vazio na etapa do raio-x.
 */
function criarEstadoVazio3d() {
    return { versao: VERSAO_ESTADO_3D, etapa: ETAPAS_3D[0], marcas: [], redesenho: [], ficha: {} };
}

/**
 * Limita um número a uma faixa; se não for número, devolve o padrão.
 * @param {*} valor - Valor recebido.
 * @param {Object} faixa - { minimo, maximo, padrao }.
 * @returns {number} Número dentro da faixa.
 */
function limitarNumero3d(valor, faixa) {
    const numero = Number(valor);
    if (!Number.isFinite(numero)) return faixa.padrao;
    return Math.min(Math.max(numero, faixa.minimo), faixa.maximo);
}

/**
 * Valida e normaliza um elemento vindo do banco ou da tela.
 * @param {*} bruto - Objeto recebido.
 * @param {number} indice - Posição na lista (usada para criar o id).
 * @returns {Object|null} Elemento seguro, ou null se for inválido.
 */
function sanearElemento3d(bruto, indice) {
    if (!bruto || typeof bruto !== 'object') return null;
    if (!FORMAS_3D.includes(bruto.forma)) return null;

    const posicao = { minimo: -LIMITE_COORDENADA_3D, maximo: LIMITE_COORDENADA_3D, padrao: 0 };
    const tamanho = { minimo: TAMANHO_MINIMO_3D, maximo: 2 * LIMITE_COORDENADA_3D, padrao: 40 };
    return {
        id: limitarNumero3d(bruto.id, { minimo: 1, maximo: 1e9, padrao: indice + 1 }),
        forma: bruto.forma,
        x: limitarNumero3d(bruto.x, posicao),
        y: limitarNumero3d(bruto.y, posicao),
        largura: limitarNumero3d(bruto.largura, tamanho),
        altura: limitarNumero3d(bruto.altura, tamanho),
        cor: PADRAO_COR_3D.test(bruto.cor) ? bruto.cor : COR_PADRAO_3D,
        preenchido: bruto.preenchido !== false,
        raio: limitarNumero3d(bruto.raio, { minimo: 0, maximo: LIMITE_RAIO_3D, padrao: 0 }),
        rotulo: String(bruto.rotulo || '').slice(0, LIMITE_ROTULO_3D)
    };
}

/**
 * Normaliza uma lista de elementos, descartando os inválidos.
 * @param {*} lista - Lista recebida.
 * @returns {Object[]} Elementos seguros (no máximo LIMITE_ELEMENTOS_3D).
 */
function sanearLista3d(lista) {
    if (!Array.isArray(lista)) return [];
    return lista.slice(0, LIMITE_ELEMENTOS_3D)
        .map(sanearElemento3d)
        .filter((elemento) => elemento !== null);
}

/**
 * Normaliza a ficha: só textos, com limite de campos e de tamanho.
 * @param {*} ficha - Objeto { campo: texto }.
 * @returns {Object} Ficha segura.
 */
function sanearFicha3d(ficha) {
    const segura = {};
    if (!ficha || typeof ficha !== 'object') return segura;
    Object.entries(ficha).slice(0, LIMITE_CAMPOS_FICHA_3D).forEach(([campo, texto]) => {
        segura[String(campo).slice(0, 40)] = String(texto || '').slice(0, LIMITE_TEXTO_FICHA_3D);
    });
    return segura;
}

/**
 * Reconstrói o estado a partir do que veio do banco, sem confiar no formato.
 * @param {*} bruto - JSON lido de entrega_dinamica.estado.
 * @returns {Object} Estado seguro (vazio se o bruto for inválido).
 */
function restaurarEstado3d(bruto) {
    const estado = criarEstadoVazio3d();
    if (!bruto || typeof bruto !== 'object') return estado;
    if (ETAPAS_3D.includes(bruto.etapa)) estado.etapa = bruto.etapa;
    estado.marcas = sanearLista3d(bruto.marcas);
    estado.redesenho = sanearLista3d(bruto.redesenho);
    estado.ficha = sanearFicha3d(bruto.ficha);
    return estado;
}

/**
 * Copia uma lista de elementos sem compartilhar referências.
 * @param {Object[]} lista - Elementos a copiar.
 * @returns {Object[]} Cópia profunda.
 */
function clonarElementos3d(lista) {
    return JSON.parse(JSON.stringify(lista));
}

/**
 * Calcula o próximo id livre de uma lista de elementos.
 * @param {Object[]} lista - Elementos existentes.
 * @returns {number} Maior id + 1 (1 se a lista estiver vazia).
 */
function proximoId3d(lista) {
    return lista.reduce((maior, elemento) => Math.max(maior, elemento.id), 0) + 1;
}
