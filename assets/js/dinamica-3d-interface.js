// Atividade Dinâmica no PC (tarefa #410): liga etapas, painel, ficha e ferramentas da dinâmica 3D.
// Chamado por iniciarDinamica3d (dinamica-3d-controle.js). Regra: docs/regras/atividade-dinamica.md

/**
 * Desativa os controles de edição e de gravação (depois de entregar ou em modo leitura).
 * @param {Object} refs - Referências da tela.
 */
function desativarControles3d(refs) {
    [refs.painel, refs.ficha, refs.acoes].forEach((area) => {
        area.querySelectorAll('button, input, textarea').forEach((controle) => {
            controle.disabled = true;
        });
    });
}

/**
 * Cria os botões das três etapas.
 * @param {Object} refs - Referências da tela.
 * @param {Function} mudarEtapa - Chamada ao escolher uma etapa.
 * @returns {Map<string, HTMLButtonElement>} Botão de cada etapa.
 */
function criarBotoesEtapa3d(refs, mudarEtapa) {
    const botoes = new Map();
    ETAPAS_3D.forEach((etapa) => {
        const botao = criarBotao3d(ROTULOS_ETAPA_3D[etapa], () => mudarEtapa(etapa));
        botoes.set(etapa, botao);
        refs.etapas.append(botao);
    });
    return botoes;
}

/**
 * Monta todos os pedaços da interface e devolve o controle de etapas.
 * @param {Object} partes - { contexto, cena, original }.
 * @returns {{mudarEtapa: Function, destruir: Function}} Controle da interface.
 */
function montarInterface3d(partes) {
    const { contexto, cena, original } = partes;
    const { refs, estado, config } = contexto;
    let atualizarPainel = () => {};
    const aoMudar = () => {
        atualizarPainel();
        if (!config.semGravacao) mostrarStatus3d(refs, MSG_ALTERADO_3D);
    };
    const ferramentas = criarFerramentas3d(cena, estado, { original, aoMudar });
    const raioX = criarPainelRaioX3d(ferramentas);
    const redesenho = criarPainelRedesenho3d(ferramentas);
    atualizarPainel = redesenho.atualizar;
    refs.ficha.append(montarFicha3d(config.ficha || [], estado, aoMudar),
        montarChecklist3d(config.checklist || []));
    refs.acoes.append(...criarAcoes3d(contexto));
    const paineis = {
        raiox: raioX, redesenho: redesenho.raiz, ficha: document.createElement('div')
    };
    const botoes = criarBotoesEtapa3d(refs, (etapa) => mudarEtapa(etapa));

    const mudarEtapa = (etapa) => {
        ferramentas.definirEtapa(etapa);
        refs.instrucao.textContent = (config.instrucoes || {})[etapa] || '';
        refs.painel.textContent = '';
        refs.painel.append(paineis[etapa]);
        refs.ficha.hidden = etapa !== 'ficha';
        botoes.forEach((botao, nome) => botao.classList.toggle('is-ativo', nome === etapa));
    };
    contexto.bloquear = () => {
        ferramentas.bloquear();
        desativarControles3d(refs);
    };
    ferramentas.iniciar();
    return { mudarEtapa, destruir: () => ferramentas.destruir() };
}
