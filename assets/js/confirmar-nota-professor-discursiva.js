// Professor: em "Respostas dos alunos" da avaliação discursiva, ao carregar as respostas de um
// aluno, põe em cada alternativa (antes do botão "💾 Gravar") três botões para o professor
// confirmar a nota: ✅ Certa (pontos inteiros), 🟡 Meia certa (metade) e ❌ Errada (zero).
// Grava a nota_professor na correcao_discursiva — a nota que vale na média — sem mexer na
// nota_ia nem no comentário. O RLS só deixa o professor gravar alunos das turmas dele.
// Depois de confirmada, a nota NÃO pode mais ser mudada, nem pelo professor: os botões travam e o
// banco recusa (trigger correcao_discursiva_validar).
// Carregado por assets/js/avaliacao-discursiva.js. Depende de js/supabase.js e assets/js/popup.js.
// Regra: docs/regras/atividades.md

const CLASSE_CONFIRMAR_PROFESSOR = 'confirmar-professor';
const EVENTO_NOTA_PROFESSOR_CONFIRMADA = 'nota-professor-confirmada';
const TABELA_CONFIRMAR_PROFESSOR = 'correcao_discursiva';
const CHAVE_CONFIRMAR_PROFESSOR = 'aluno_id,atividade_id,tentativa,item,topico';
const SELETOR_BLOCO_CONFIRMAR = '.topico-resposta';
const SELETOR_RODAPE_CONFIRMAR = '.topico-resposta__rodape';
const SELETOR_GRAVAR_CONFIRMAR = '.topico-resposta__gravar';
const BASE_SCRIPTS_CONFIRMAR = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const TOLERANCIA_NOTA_CONFIRMAR = 0.001;
const MSG_NOTA_TRAVADA = 'Depois de confirmada, a nota não pode mais ser alterada, nem pelo ' +
    'professor.';
const OPCOES_CONFIRMAR_PROFESSOR = [
    { chave: 'certa', icone: '✅', texto: 'Certa', fracao: 1 },
    { chave: 'meia', icone: '🟡', texto: 'Meia certa', fracao: 0.5 },
    { chave: 'errada', icone: '❌', texto: 'Errada', fracao: 0 },
];

/**
 * Remove os botões de confirmação mostrados antes.
 */
function limparConfirmacaoProfessor() {
    document.querySelectorAll('.' + CLASSE_CONFIRMAR_PROFESSOR).forEach((grupo) => grupo.remove());
}

/**
 * Lê as notas já confirmadas pelo professor e os pontos de cada alternativa.
 * @param {{alunoId: string, tentativa: number}} aluno - Aluno escolhido.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<{notas: Map<string, number|null>, pontos: Map<string, number>}>} Por chave.
 */
async function lerConfirmacoesDoAluno(aluno, atividadeId) {
    const filtro = 'atividade_id=eq.' + atividadeId;
    const [correcoes, topicos] = await Promise.all([
        sbGet(TABELA_CONFIRMAR_PROFESSOR, 'select=item,topico,nota_professor&' + filtro +
            '&aluno_id=eq.' + aluno.alunoId + '&tentativa=eq.' + aluno.tentativa),
        sbGet('topico_discursivo', 'select=item,topico,pontos&' + filtro),
    ]);
    return {
        notas: new Map(correcoes.map((linha) =>
            [linha.item + '|' + linha.topico, linha.nota_professor])),
        pontos: new Map(topicos.map((linha) =>
            [linha.item + '|' + linha.topico, Number(linha.pontos)])),
    };
}

/**
 * Grava a nota do professor de uma alternativa (insere ou atualiza só a nota_professor).
 * @param {Object} linha - aluno_id, atividade_id, tentativa, item, topico e nota_professor.
 * @throws {Error} Se o banco recusar.
 */
async function gravarNotaDoProfessor(linha) {
    const cliente = obterClienteSupabase();
    if (!cliente) throw new Error('Banco de dados indisponível.');

    const { error } = await cliente.from(TABELA_CONFIRMAR_PROFESSOR)
        .upsert([linha], { onConflict: CHAVE_CONFIRMAR_PROFESSOR });
    if (error) throw new Error(error.message);
}

/**
 * Marca no grupo o botão da nota confirmada e trava os botões (nota confirmada não muda mais).
 * @param {HTMLElement} grupo - Grupo de botões da alternativa.
 * @param {string} chaveAtiva - Chave da opção confirmada ('' = nenhuma, botões liberados).
 */
function marcarOpcaoConfirmada(grupo, chaveAtiva) {
    const estaConfirmada = chaveAtiva !== '';
    grupo.classList.toggle(CLASSE_CONFIRMAR_PROFESSOR + '--confirmada', estaConfirmada);
    if (estaConfirmada) grupo.title = MSG_NOTA_TRAVADA;
    grupo.querySelectorAll('button').forEach((botao) => {
        const estaAtivo = botao.dataset.opcao === chaveAtiva;
        botao.classList.toggle(CLASSE_CONFIRMAR_PROFESSOR + '__botao--ativo', estaAtivo);
        botao.classList.toggle(CLASSE_CONFIRMAR_PROFESSOR + '__botao--inativo',
            estaConfirmada && !estaAtivo);
        botao.setAttribute('aria-pressed', String(estaAtivo));
        botao.disabled = estaConfirmada;
    });
}

/**
 * Descobre qual opção corresponde à nota já confirmada.
 * @param {number|null} nota - nota_professor gravada.
 * @param {number} pontos - Pontos da alternativa.
 * @returns {string} Chave da opção ('' se não houver nota confirmada).
 */
function opcaoDaNota(nota, pontos) {
    if (nota === null || nota === undefined) return '';
    const opcao = OPCOES_CONFIRMAR_PROFESSOR.find((item) =>
        Math.abs(item.fracao * pontos - Number(nota)) < TOLERANCIA_NOTA_CONFIRMAR);
    return opcao ? opcao.chave : '';
}

/**
 * Trata o clique numa opção: grava a nota do professor e marca o botão.
 * @param {{grupo: HTMLElement, opcao: Object, linhaBase: Object, pontos: number}} contexto
 *     Grupo de botões, opção escolhida, chave da alternativa e pontos dela.
 */
async function confirmarOpcao(contexto) {
    const { grupo, opcao, linhaBase, pontos } = contexto;
    const nota = Math.round(opcao.fracao * pontos * 100) / 100;
    const confirmou = await confirmarPopup('Confirmar esta alternativa como "' + opcao.texto +
        '" (' + nota.toLocaleString('pt-BR') + ' ponto)? ' + MSG_NOTA_TRAVADA,
    { titulo: 'Confirmar nota', textoConfirmar: 'Confirmar' });
    if (!confirmou) return;

    grupo.classList.add(CLASSE_CONFIRMAR_PROFESSOR + '--gravando');
    try {
        await gravarNotaDoProfessor({ ...linhaBase, nota_professor: nota });
        marcarOpcaoConfirmada(grupo, opcao.chave);
        document.dispatchEvent(new CustomEvent(EVENTO_NOTA_PROFESSOR_CONFIRMADA));
    } catch (erro) {
        await mostrarPopup('Nota não gravada: ' + erro.message, { tipo: 'erro', titulo: 'Erro' });
    } finally {
        grupo.classList.remove(CLASSE_CONFIRMAR_PROFESSOR + '--gravando');
    }
}

/**
 * Cria o grupo com os três botões de uma alternativa.
 * @param {{linhaBase: Object, pontos: number, notaAtual: number|null}} dados - Chave da
 *     alternativa, pontos e nota já confirmada.
 * @returns {HTMLElement} Grupo pronto.
 */
function criarGrupoConfirmacao(dados) {
    const grupo = document.createElement('span');
    grupo.className = CLASSE_CONFIRMAR_PROFESSOR;
    grupo.title = 'Confirmar a nota do professor (vale na média)';
    OPCOES_CONFIRMAR_PROFESSOR.forEach((opcao) => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = CLASSE_CONFIRMAR_PROFESSOR + '__botao ' + CLASSE_CONFIRMAR_PROFESSOR +
            '__botao--' + opcao.chave;
        botao.dataset.opcao = opcao.chave;
        botao.textContent = opcao.icone + ' ' + opcao.texto;
        botao.addEventListener('click', () => confirmarOpcao({ grupo, opcao,
            linhaBase: dados.linhaBase, pontos: dados.pontos }));
        grupo.appendChild(botao);
    });
    marcarOpcaoConfirmada(grupo, opcaoDaNota(dados.notaAtual, dados.pontos));
    return grupo;
}

/**
 * Põe os botões de confirmação em cada alternativa do aluno escolhido (ou limpa).
 * @param {{alunoId: string, tentativa: number}|null} aluno - Aluno escolhido; null limpa.
 * @param {number} atividadeId - Id da atividade.
 */
async function mostrarConfirmacaoProfessor(aluno, atividadeId) {
    limparConfirmacaoProfessor();
    if (!aluno || !atividadeId) return;

    const { notas, pontos } = await lerConfirmacoesDoAluno(aluno, atividadeId);
    document.querySelectorAll(SELETOR_BLOCO_CONFIRMAR).forEach((bloco) => {
        const rodape = bloco.querySelector(SELETOR_RODAPE_CONFIRMAR);
        if (!rodape) return;
        const chave = bloco.dataset.item + '|' + bloco.dataset.topico;
        const grupo = criarGrupoConfirmacao({
            linhaBase: { aluno_id: aluno.alunoId, atividade_id: atividadeId,
                tentativa: aluno.tentativa, item: Number(bloco.dataset.item),
                topico: Number(bloco.dataset.topico) },
            pontos: pontos.get(chave) || 0, notaAtual: notas.get(chave),
        });
        const botaoGravar = rodape.querySelector(SELETOR_GRAVAR_CONFIRMAR);
        rodape.insertBefore(grupo, botaoGravar);
    });
}

(function incluirEstiloConfirmarProfessor() {
    if (!BASE_SCRIPTS_CONFIRMAR) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_CONFIRMAR + '../css/confirmar-nota-professor-discursiva.css';
    document.head.appendChild(link);
})();

window.mostrarConfirmacaoProfessor = mostrarConfirmacaoProfessor;
