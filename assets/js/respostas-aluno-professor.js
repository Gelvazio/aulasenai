// Professor: combo "Aluno" nas páginas de atividade (objetivas e discursivas) para carregar na
// tela as respostas gravadas de um aluno (somente leitura). Só aparece para o professor; o RLS
// limita aos alunos das turmas dele. Nada é gravado.
// ON/OFF "Pendente Correcao" ao lado do combo (desligado ao abrir): ligado, o combo lista só os
// alunos que o professor ainda não corrigiu. Corrigido: a página informa em opcoes.lerCorrigidos
// (discursiva); sem ela, na objetiva, corrigido = entregue. Tarefa #153.
// O aluno escolhido (por atividade) e os filtros (Pendente Correcao, Falta Corrigir?, Mostrar
// Certas) ficam no localStorage do navegador (chaves respostas-aluno:*, só preferência de tela)
// e voltam ao abrir; sem escolha guardada, fica "— Selecione o aluno —". Tarefa #157.
// Depois do "Confirmar Correção", a página chama window.atualizarPendenteCorrecao: com o
// "Pendente Correcao" ligado, o aluno corrigido sai do combo e a prova dele continua na tela
// (com "Prova Já Corrigida!"). Tarefa #169.
// Carregado por assets/js/avaliacao-discursiva.js e assets/js/respostas-atividade.js, que
// informam a tabela, as colunas e como mostrar as respostas. Depende de js/supabase.js (sbGet).

const CLASSE_RESPOSTAS_ALUNO = 'respostas-aluno-professor';
const TEXTO_OPCAO_VAZIA = '— Selecione o aluno —';
const PREFIXO_MEMORIA_RESPOSTAS = 'respostas-aluno:';
const VALOR_LIGADO_MEMORIA = 'sim';
const VALOR_DESLIGADO_MEMORIA = 'nao';
const TEXTO_PENDENTE_CORRECAO = 'Pendente Correcao';
const DICA_PENDENTE_CORRECAO = 'Ligado: o combo lista só os alunos que o professor ainda não ' +
    'corrigiu. Desligado: todos os alunos.';
const BASE_SCRIPTS_RESPOSTAS_ALUNO = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Lê uma preferência de tela guardada no navegador (sem localStorage ou com erro, devolve null).
 * @param {string} chave - Nome da preferência (sem o prefixo).
 * @returns {string|null} Valor guardado ou null.
 */
function lerMemoriaRespostasAluno(chave) {
    try {
        return window.localStorage.getItem(PREFIXO_MEMORIA_RESPOSTAS + chave);
    } catch (erro) {
        return null;
    }
}

/**
 * Guarda (ou apaga, com valor null) uma preferência de tela no navegador. Falha em silêncio.
 * @param {string} chave - Nome da preferência (sem o prefixo).
 * @param {string|null} valor - Valor a guardar; null apaga.
 */
function gravarMemoriaRespostasAluno(chave, valor) {
    try {
        if (valor === null) window.localStorage.removeItem(PREFIXO_MEMORIA_RESPOSTAS + chave);
        else window.localStorage.setItem(PREFIXO_MEMORIA_RESPOSTAS + chave, valor);
    } catch (erro) {
        // Sem localStorage (janela privada, dados bloqueados): a tela segue sem lembrar.
    }
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoRespostasAluno(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Formata data ISO como "dd/mm/aaaa hh:mm".
 * @param {string} dataIso - Data ISO.
 * @returns {string} Data formatada.
 */
function formatarDataRespostasAluno(dataIso) {
    return new Date(dataIso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

/**
 * Agrupa as respostas por aluno e tentativa, contando as linhas gravadas.
 * @param {Object[]} linhas - Linhas {aluno_id, tentativa} da tabela de respostas.
 * @returns {Map<string, {alunoId: string, tentativa: number, gravadas: number}>} Grupos.
 */
function agruparPorAlunoETentativa(linhas) {
    const grupos = new Map();
    linhas.forEach((linha) => {
        const chave = linha.aluno_id + '|' + linha.tentativa;
        const grupo = grupos.get(chave) ||
            { alunoId: linha.aluno_id, tentativa: linha.tentativa, gravadas: 0 };
        grupo.gravadas += 1;
        grupos.set(chave, grupo);
    });
    return grupos;
}

/**
 * Lê do banco quem respondeu a atividade, com nome e situação da entrega.
 * @param {{atividadeId: number, tabela: string}} opcoes - Atividade e tabela de respostas.
 * @returns {Promise<Object[]>} Lista {alunoId, tentativa, gravadas, nome, entregueEm}, por nome.
 */
async function listarAlunosQueResponderam(opcoes) {
    const filtro = 'atividade_id=eq.' + opcoes.atividadeId;
    const [respostas, entregas] = await Promise.all([
        sbGet(opcoes.tabela, 'select=aluno_id,tentativa&' + filtro),
        sbGet('entrega_atividade', 'select=aluno_id,tentativa,entregue_em&' + filtro),
    ]);
    const grupos = [...agruparPorAlunoETentativa(respostas).values()];
    if (!grupos.length) return [];

    const ids = [...new Set(grupos.map((grupo) => grupo.alunoId))];
    const alunos = await sbGet('aluno', 'select=id,nome&id=in.(' + ids.join(',') + ')');
    const nomes = new Map(alunos.map((aluno) => [aluno.id, aluno.nome]));
    const entregues = new Map(entregas.map((entrega) =>
        [entrega.aluno_id + '|' + entrega.tentativa, entrega.entregue_em]));
    return grupos.map((grupo) => ({
        ...grupo,
        nome: nomes.get(grupo.alunoId) || 'Aluno sem nome',
        entregueEm: entregues.get(grupo.alunoId + '|' + grupo.tentativa) || '',
    })).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR') || a.tentativa - b.tentativa);
}

/**
 * Monta o texto da opção do combo (nome, tentativa e situação).
 * @param {Object} aluno - Registro de listarAlunosQueResponderam.
 * @returns {string} Texto da opção.
 */
function rotuloOpcaoAluno(aluno) {
    const situacao = aluno.entregueEm
        ? 'entregue em ' + formatarDataRespostasAluno(aluno.entregueEm)
        : 'não entregue (' + aluno.gravadas + ' resposta(s) gravada(s))';
    return aluno.nome + ' — tentativa ' + aluno.tentativa + ' — ' + situacao;
}

/**
 * Lê as respostas de um aluno numa tentativa e as converte para a tela.
 * @param {Object} aluno - Registro de listarAlunosQueResponderam.
 * @param {{atividadeId: number, tabela: string, colunas: string, converter: Function}} opcoes
 *     Atividade, tabela, colunas lidas e conversão das linhas.
 * @returns {Promise<Object>} Respostas no formato da tela.
 */
async function lerRespostasDoAlunoEscolhido(aluno, opcoes) {
    const filtro = 'atividade_id=eq.' + opcoes.atividadeId + '&aluno_id=eq.' + aluno.alunoId +
        '&tentativa=eq.' + aluno.tentativa;
    const linhas = await sbGet(opcoes.tabela, 'select=' + opcoes.colunas + '&' + filtro);
    return opcoes.converter(linhas);
}

/**
 * Cria o combo com os alunos que responderam.
 * @param {Object[]} alunos - Lista de listarAlunosQueResponderam.
 * @returns {HTMLSelectElement} Combo pronto.
 */
function criarComboAlunos(alunos) {
    const combo = document.createElement('select');
    preencherComboAlunos(combo, alunos);
    return combo;
}

/**
 * Preenche o combo com a opção vazia e os alunos da lista.
 * @param {HTMLSelectElement} combo - Combo a preencher (é esvaziado antes).
 * @param {Object[]} alunos - Alunos que aparecem no combo.
 */
function preencherComboAlunos(combo, alunos) {
    combo.replaceChildren(new Option(TEXTO_OPCAO_VAZIA, ''));
    alunos.forEach((aluno, indice) => combo.appendChild(new Option(rotuloOpcaoAluno(aluno),
        String(indice))));
}

/**
 * Cria o ON/OFF "Pendente Correcao" com o visual de chave.
 * @param {boolean} ligadoInicial - Estado ao abrir (o que ficou guardado no navegador).
 * @param {function(boolean): void} aoMudar - Chamada com o novo estado ao clicar.
 * @returns {HTMLLabelElement} Etiqueta pronta para entrar na tela.
 */
function criarChavePendenteCorrecao(ligadoInicial, aoMudar) {
    const etiqueta = criarElementoRespostasAluno('label', CLASSE_RESPOSTAS_ALUNO + '__pendente');
    etiqueta.title = DICA_PENDENTE_CORRECAO;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = ligadoInicial;
    caixa.addEventListener('change', () => aoMudar(caixa.checked));
    const chave = criarElementoRespostasAluno('span', CLASSE_RESPOSTAS_ALUNO + '__chave');
    const texto = criarElementoRespostasAluno('span', '', TEXTO_PENDENTE_CORRECAO);
    etiqueta.append(caixa, chave, texto);
    return etiqueta;
}

/**
 * Descobre quem o professor já corrigiu (discursiva: pela página; objetiva: entregue).
 * @param {Object[]} alunos - Lista de listarAlunosQueResponderam.
 * @param {Object} opcoes - Opções de montarRespostasDoAluno (lerCorrigidos opcional).
 * @returns {Promise<Set<string>>} Chaves "alunoId|tentativa" dos alunos corrigidos.
 */
async function lerAlunosCorrigidos(alunos, opcoes) {
    if (opcoes.lerCorrigidos) return opcoes.lerCorrigidos(opcoes.atividadeId);
    return new Set(alunos.filter((aluno) => aluno.entregueEm)
        .map((aluno) => aluno.alunoId + '|' + aluno.tentativa));
}

/**
 * Refaz a lista do combo conforme o "Pendente Correcao"; se o aluno escolhido sair da lista,
 * limpa a tela.
 * @param {{combo: HTMLSelectElement, alunos: Object[], aviso: HTMLElement, todos: Object[]}} tela
 *     Elementos da tela (alunos = os visíveis, todos = a lista completa).
 * @param {{somentePendentes: boolean, corrigidos: Set<string>}} filtro - Estado do filtro.
 * @param {Object} opcoes - Opções de montarRespostasDoAluno.
 */
async function aplicarPendenteCorrecao(tela, filtro, opcoes) {
    const escolhido = tela.alunos[Number(tela.combo.value)];
    filtrarComboPendentes(tela, filtro, escolhido);
    if (escolhido && !tela.combo.value) await carregarAlunoEscolhido(tela, opcoes);
}

/**
 * Refaz a lista do combo conforme o "Pendente Correcao" e volta a escolher o aluno, se ele ainda
 * estiver na lista (senão o combo fica em "— Selecione o aluno —").
 * @param {{combo: HTMLSelectElement, alunos: Object[], todos: Object[]}} tela - Elementos.
 * @param {{somentePendentes: boolean, corrigidos: Set<string>}} filtro - Estado do filtro.
 * @param {Object|undefined} escolhido - Aluno escolhido antes de refazer a lista.
 */
function filtrarComboPendentes(tela, filtro, escolhido) {
    tela.alunos = filtro.somentePendentes
        ? tela.todos.filter((aluno) =>
            !filtro.corrigidos.has(aluno.alunoId + '|' + aluno.tentativa))
        : tela.todos;
    preencherComboAlunos(tela.combo, tela.alunos);
    const indice = tela.alunos.indexOf(escolhido);
    tela.combo.value = indice >= 0 ? String(indice) : '';
}

/**
 * Cria a função que a página chama depois de confirmar a correção de um aluno: relê quem já foi
 * corrigido e, com o "Pendente Correcao" ligado, tira o aluno do combo sem limpar a prova dele
 * da tela.
 * @param {{tela: Object, filtro: Object}} estado - Tela e filtro do combo.
 * @param {Object} opcoes - Opções de montarRespostasDoAluno.
 * @returns {function(): Promise<void>} Atualização do combo.
 */
function criarAtualizacaoPendentes(estado, opcoes) {
    return async () => {
        const { tela, filtro } = estado;
        try {
            filtro.corrigidos = await lerAlunosCorrigidos(tela.todos, opcoes);
            if (!filtro.somentePendentes) return;
            filtrarComboPendentes(tela, filtro, tela.alunos[Number(tela.combo.value)]);
            if (!tela.combo.value) gravarMemoriaRespostasAluno('aluno:' + opcoes.atividadeId, null);
        } catch (erro) {
            tela.aviso.textContent = '❌ Não foi possível atualizar os pendentes: ' + erro.message;
        }
    };
}

/**
 * Mostra na tela as respostas do aluno escolhido (ou limpa, se nenhum).
 * @param {{combo: HTMLSelectElement, alunos: Object[], aviso: HTMLElement}} tela - Elementos.
 * @param {Object} opcoes - Opções de montarRespostasDoAluno.
 */
async function carregarAlunoEscolhido(tela, opcoes) {
    const aluno = tela.alunos[Number(tela.combo.value)];
    gravarMemoriaRespostasAluno('aluno:' + opcoes.atividadeId,
        tela.combo.value && aluno ? aluno.alunoId + '|' + aluno.tentativa : null);
    if (!tela.combo.value || !aluno) {
        opcoes.preencher({});
        opcoes.aoMostrarAluno?.(null);
        tela.aviso.textContent = '';
        return;
    }
    tela.combo.disabled = true;
    try {
        opcoes.preencher(await lerRespostasDoAlunoEscolhido(aluno, opcoes));
        await opcoes.aoMostrarAluno?.(aluno);
        tela.aviso.textContent = '👀 Mostrando as respostas de ' + aluno.nome +
            ' (somente leitura).';
    } catch (erro) {
        tela.aviso.textContent = '❌ Não foi possível carregar as respostas: ' + erro.message;
    } finally {
        tela.combo.disabled = false;
    }
}

/**
 * Volta ao que ficou guardado no navegador: filtro "Pendente Correcao" ligado e aluno escolhido
 * (se ele ainda estiver na lista; senão fica "— Selecione o aluno —").
 * @param {{tela: Object, filtro: Object, pendenteLigado: boolean}} estado - Tela, filtro e o
 *     estado guardado do "Pendente Correcao".
 * @param {Object} opcoes - Opções de montarRespostasDoAluno.
 */
async function restaurarEscolhasSalvas(estado, opcoes) {
    const { tela, filtro } = estado;
    try {
        if (estado.pendenteLigado) {
            filtro.corrigidos = await lerAlunosCorrigidos(tela.todos, opcoes);
            filtro.somentePendentes = true;
            await aplicarPendenteCorrecao(tela, filtro, opcoes);
        }
        const guardado = lerMemoriaRespostasAluno('aluno:' + opcoes.atividadeId);
        const indice = tela.alunos.findIndex((aluno) =>
            aluno.alunoId + '|' + aluno.tentativa === guardado);
        if (indice < 0) return;
        tela.combo.value = String(indice);
        await carregarAlunoEscolhido(tela, opcoes);
    } catch (erro) {
        tela.aviso.textContent = '❌ Não foi possível voltar à escolha anterior: ' + erro.message;
    }
}

/**
 * Monta o combo "Aluno" que carrega na tela as respostas de cada aluno.
 * @param {HTMLElement} destino - Elemento onde a área do combo é acrescentada.
 * @param {{atividadeId: number, tabela: string, colunas: string, converter: Function,
 *     preencher: Function, aoMostrarAluno?: Function}} opcoes - Atividade, tabela de respostas,
 *     colunas lidas, conversão das linhas para o formato da tela, função que mostra as respostas
 *     e (opcional) função chamada com o aluno mostrado (ou null ao limpar).
 */
async function montarRespostasDoAluno(destino, opcoes) {
    const area = criarElementoRespostasAluno('div', CLASSE_RESPOSTAS_ALUNO);
    area.appendChild(criarElementoRespostasAluno('strong', CLASSE_RESPOSTAS_ALUNO + '__titulo',
        '🧑‍🎓 Respostas dos alunos'));
    destino.appendChild(area);

    const alunos = await listarAlunosQueResponderam(opcoes);
    if (!alunos.length) {
        area.appendChild(criarElementoRespostasAluno('span', CLASSE_RESPOSTAS_ALUNO + '__aviso',
            'Nenhum aluno das suas turmas respondeu ainda.'));
        return;
    }
    const etiqueta = criarElementoRespostasAluno('label', CLASSE_RESPOSTAS_ALUNO + '__aluno',
        'Aluno: ');
    const combo = criarComboAlunos(alunos);
    const aviso = criarElementoRespostasAluno('span', CLASSE_RESPOSTAS_ALUNO + '__aviso');
    etiqueta.appendChild(combo);
    const tela = { combo, alunos, aviso, todos: alunos };
    const filtro = { somentePendentes: false, corrigidos: new Set() };
    const pendenteLigado = lerMemoriaRespostasAluno('pendente-correcao') === VALOR_LIGADO_MEMORIA;
    const pendente = criarChavePendenteCorrecao(pendenteLigado, async (ligado) => {
        gravarMemoriaRespostasAluno('pendente-correcao',
            ligado ? VALOR_LIGADO_MEMORIA : VALOR_DESLIGADO_MEMORIA);
        try {
            if (ligado) filtro.corrigidos = await lerAlunosCorrigidos(alunos, opcoes);
            filtro.somentePendentes = ligado;
            await aplicarPendenteCorrecao(tela, filtro, opcoes);
        } catch (erro) {
            aviso.textContent = '❌ Não foi possível filtrar os pendentes: ' + erro.message;
        }
    });
    area.append(etiqueta, pendente, aviso);
    combo.addEventListener('change', () => carregarAlunoEscolhido(tela, opcoes));
    window.atualizarPendenteCorrecao = criarAtualizacaoPendentes({ tela, filtro }, opcoes);
    await restaurarEscolhasSalvas({ tela, filtro, pendenteLigado }, opcoes);
}

(function incluirEstiloRespostasAluno() {
    if (!BASE_SCRIPTS_RESPOSTAS_ALUNO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_RESPOSTAS_ALUNO + '../css/respostas-aluno-professor.css';
    document.head.appendChild(link);
})();

window.montarRespostasDoAluno = montarRespostasDoAluno;
window.lerMemoriaRespostasAluno = lerMemoriaRespostasAluno;
window.gravarMemoriaRespostasAluno = gravarMemoriaRespostasAluno;
