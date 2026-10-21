// Professor: combo "Equipe" acima do quadro do Progresso da turma GLOBAL
// (progresso-turma-global.js). Lista as equipes ligadas à atividade (equipe_atividade) da turma
// escolhida no combo "Turma"; escolhendo uma, a lista mostra só o aluno líder da equipe.
// "Todas" mostra a lista inteira. O líder é o membro com lider = 1; sem líder marcado vale o
// respondente da equipe na atividade; sem nenhum dos dois, o filtro deixa a lista vazia.
// Só leitura (JWT do professor; o RLS limita ao que ele pode ver). Nada é gravado. Sem painel
// (aluno ou visitante) ou sem equipe ligada à atividade, não faz nada.
// Depende de js/supabase.js (sbGet) e de progresso-turma-global.js (estadoProgressoGlobal).
// Pedido do usuário em 2026-10-21 (tarefa #330); por enquanto só na atividade de Pesquisa na
// Internet (a #331 leva para as demais atividades).

const SELETOR_PAINEL_FILTRO_EQUIPE = 'section.progresso-turma';
const SELETOR_TITULO_FILTRO_EQUIPE = '.progresso-turma__titulo';
const SELETOR_COMBO_TURMA_FILTRO_EQUIPE = '#progresso-turma-combo-turma';
const CLASSE_FILTRO_EQUIPE = 'progresso-turma__turma';
const ID_FILTRO_EQUIPE = 'progresso-turma-combo-equipe';
const ROTULO_FILTRO_EQUIPE = 'Equipe:';
const VALOR_TODAS_FILTRO_EQUIPE = '';
const TEXTO_TODAS_FILTRO_EQUIPE = 'Todas';
const SEPARADOR_LIDER_FILTRO_EQUIPE = ' — líder: ';
const INTERVALO_ESPERA_FILTRO_EQUIPE_MS = 500;
const LIMITE_TENTATIVAS_FILTRO_EQUIPE = 120;
const VALOR_LIDER_FILTRO_EQUIPE = 1;
const TABELA_EQUIPE_ATIVIDADE_FILTRO = 'equipe_atividade';
const TABELA_EQUIPE_FILTRO = 'equipe';
const TABELA_MEMBRO_FILTRO = 'equipe_membro';

/**
 * Diz se o painel do progresso já está pronto (painel na tela e atividade definida).
 * @returns {boolean} Verdadeiro quando já dá para montar o combo.
 */
function painelEstaProntoFiltroEquipe() {
    const temEstado = typeof estadoProgressoGlobal !== 'undefined';
    const temPainel = Boolean(document.querySelector(SELETOR_PAINEL_FILTRO_EQUIPE));
    return temEstado && temPainel && Boolean(estadoProgressoGlobal.atividadeId);
}

/**
 * Lê as equipes ligadas à atividade, com o id do líder de cada uma.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{id: number, nome: string, turma: string, liderId: string|null}[]>}
 *   Equipes (vazio se nenhuma estiver ligada à atividade).
 * @throws {Error} Se o banco recusar.
 */
async function lerEquipesDaAtividadeFiltroEquipe(atividadeId) {
    const ligacoes = await sbGet(TABELA_EQUIPE_ATIVIDADE_FILTRO,
        'select=equipe_id,respondente_id&atividade_id=eq.' + atividadeId);
    if (!ligacoes.length) return [];

    const lista = [...new Set(ligacoes.map((ligacao) => ligacao.equipe_id))].join(',');
    const [equipes, membros] = await Promise.all([
        sbGet(TABELA_EQUIPE_FILTRO, 'select=id,nome,turma_codigo&id=in.(' + lista + ')'),
        sbGet(TABELA_MEMBRO_FILTRO,
            'select=equipe_id,aluno_id,lider&equipe_id=in.(' + lista + ')'),
    ]);
    return equipes.map((equipe) => {
        const lider = membros.find((membro) => membro.equipe_id === equipe.id &&
            Number(membro.lider) === VALOR_LIDER_FILTRO_EQUIPE);
        const ligacao = ligacoes.find((item) => item.equipe_id === equipe.id);
        return { id: equipe.id, nome: equipe.nome, turma: equipe.turma_codigo,
            liderId: lider?.aluno_id || ligacao?.respondente_id || null };
    });
}

/**
 * Monta o texto de uma opção: nome da equipe e, se achar, o nome do líder.
 * @param {{nome: string, liderId: string|null}} equipe - Equipe.
 * @returns {string} Texto da opção.
 */
function textoDaEquipeFiltroEquipe(equipe) {
    const { ultimosAlunos } = estadoProgressoGlobal;
    const aluno = ultimosAlunos.find((item) => item.alunoId === equipe.liderId);
    return aluno ? equipe.nome + SEPARADOR_LIDER_FILTRO_EQUIPE + aluno.nome : equipe.nome;
}

/**
 * Refaz as opções do combo para a turma escolhida (mantém a escolha se ainda existir).
 * @param {HTMLSelectElement} combo - Combo de equipes.
 * @param {Object[]} equipes - Todas as equipes da atividade.
 */
function atualizarOpcoesFiltroEquipe(combo, equipes) {
    const turma = document.querySelector(SELETOR_COMBO_TURMA_FILTRO_EQUIPE)?.value || '';
    const visiveis = equipes.filter((equipe) => !turma || equipe.turma === turma);
    const opcoes = visiveis.map((equipe) => ({ valor: String(equipe.id),
        texto: textoDaEquipeFiltroEquipe(equipe) }));
    const assinatura = opcoes.map((opcao) => opcao.valor + opcao.texto).join('|');
    if (combo.dataset.assinatura === assinatura) return;

    const escolhida = combo.value;
    combo.replaceChildren(new Option(TEXTO_TODAS_FILTRO_EQUIPE, VALOR_TODAS_FILTRO_EQUIPE),
        ...opcoes.map((opcao) => new Option(opcao.texto, opcao.valor)));
    combo.dataset.assinatura = assinatura;
    const aindaExiste = opcoes.some((opcao) => opcao.valor === escolhida);
    combo.value = aindaExiste ? escolhida : VALOR_TODAS_FILTRO_EQUIPE;
}

/**
 * Cria o combo "Equipe" e o filtro da lista.
 * @param {Object[]} equipes - Equipes da atividade.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Rótulo com o combo e o filtro.
 */
function criarFiltroEquipeProgresso(equipes) {
    const elemento = document.createElement('label');
    elemento.className = CLASSE_FILTRO_EQUIPE;
    elemento.htmlFor = ID_FILTRO_EQUIPE;
    elemento.textContent = ROTULO_FILTRO_EQUIPE + ' ';
    const combo = document.createElement('select');
    combo.id = ID_FILTRO_EQUIPE;
    combo.className = CLASSE_FILTRO_EQUIPE + '-opcoes';
    combo.add(new Option(TEXTO_TODAS_FILTRO_EQUIPE, VALOR_TODAS_FILTRO_EQUIPE));
    combo.addEventListener('change', () => estadoProgressoGlobal.atualizarAgora?.());
    elemento.append(combo);

    return {
        elemento,
        filtrar(alunos) {
            atualizarOpcoesFiltroEquipe(combo, equipes);
            if (!combo.value) return alunos;
            const equipe = equipes.find((item) => String(item.id) === combo.value);
            if (!equipe?.liderId) return [];
            return alunos.filter((aluno) => aluno.alunoId === equipe.liderId);
        },
    };
}

/**
 * Lê as equipes e, havendo alguma, põe o combo logo depois do título do painel.
 * @returns {Promise<void>}
 */
async function montarFiltroEquipeProgresso() {
    try {
        const equipes = await lerEquipesDaAtividadeFiltroEquipe(estadoProgressoGlobal.atividadeId);
        if (!equipes.length) return;
        const filtro = criarFiltroEquipeProgresso(equipes);
        document.querySelector(SELETOR_TITULO_FILTRO_EQUIPE)?.after(filtro.elemento);
        estadoProgressoGlobal.filtrosDaLista.push(filtro);
        estadoProgressoGlobal.atualizarAgora?.();
    } catch (erro) {
        console.warn('Filtro "Equipe" do progresso:', erro.message);
    }
}

/**
 * Espera o painel ficar pronto (tentativas limitadas) e então monta o combo. Sem painel
 * (aluno ou visitante), desiste sem fazer nada.
 */
function aguardarPainelFiltroEquipe() {
    let tentativas = 0;
    const espera = setInterval(() => {
        tentativas += 1;
        if (painelEstaProntoFiltroEquipe()) {
            clearInterval(espera);
            montarFiltroEquipeProgresso();
        } else if (tentativas >= LIMITE_TENTATIVAS_FILTRO_EQUIPE) {
            clearInterval(espera);
        }
    }, INTERVALO_ESPERA_FILTRO_EQUIPE_MS);
}

aguardarPainelFiltroEquipe();
