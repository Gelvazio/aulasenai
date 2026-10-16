// Professor: faltas no Progresso da turma GLOBAL (progresso-turma-global.js), em toda atividade.
// - ON/OFF "Faltou?" ao lado do nome de cada aluno: grava/apaga a falta do aluno NO DIA da
//   atividade (tabela falta_aluno; vale para todas as atividades daquele dia).
// - ON/OFF "Mostrar quem faltou" em cima da lista: abre em OFF (esconde quem faltou).
// Só muda a lista na tela: resumo, Gráficos e Cálculo Nota seguem com a turma toda.
// Dia da atividade: atividade.data_atividade, senão aulas.data_planejada; sem nenhuma, os
// botões ficam desligados. RLS: o professor só marca alunos das turmas dele.
// Pedido do usuário em 2026-10-14 (tarefa #138). Depende de js/supabase.js e assets/js/popup.js.

const TABELA_FALTA_ALUNO = 'falta_aluno';
const CLASSE_FALTA_ALUNO = 'falta-aluno';
const CLASSE_INTERRUPTOR_FALTA = 'progresso-turma__interruptor';
const ARQUIVO_CSS_FALTA_ALUNO = '../css/falta-aluno-progresso.css';
const TEXTO_MOSTRAR_FALTOU = 'Mostrar quem faltou';
const TEXTO_BOTAO_FALTOU = 'Faltou?';
const MSG_SEM_DATA_FALTA = 'Atividade sem data: não dá para marcar faltas.';
const MSG_ERRO_FALTA = 'Não foi possível gravar a falta: ';
const CHAVE_PREFERENCIA_FALTOU = 'mostrar-quem-faltou';
const VALOR_LIGADO_PREFERENCIA_FALTOU = 'sim';
const VALOR_DESLIGADO_PREFERENCIA_FALTOU = 'nao';
const BASE_SCRIPTS_FALTA_ALUNO = document.currentScript?.src.replace(/[^/]*$/, '') || '';

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoFalta(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Cria um interruptor ON/OFF (caixa de marcar com aparência de chave).
 * @param {{texto: string, ligado: boolean, aoMudar: Function}} dados - Texto, estado e ação.
 * @returns {{etiqueta: HTMLLabelElement, caixa: HTMLInputElement}} Interruptor.
 */
function criarInterruptorFalta(dados) {
    const etiqueta = criarElementoFalta('label', CLASSE_INTERRUPTOR_FALTA);
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = dados.ligado;
    caixa.addEventListener('change', () => dados.aoMudar(caixa));
    etiqueta.append(caixa, criarElementoFalta('span', CLASSE_INTERRUPTOR_FALTA + '-chave'),
        criarElementoFalta('span', '', dados.texto));
    return { etiqueta, caixa };
}

/**
 * Lê o dia da atividade: a data da atividade, senão a data planejada da aula.
 * @param {number} atividadeId - Id da atividade.
 * @returns {Promise<string|null>} Data (AAAA-MM-DD) ou null se não houver.
 */
async function lerDiaDaAtividadeFalta(atividadeId) {
    const linhas = await sbGet('atividade',
        'select=data_atividade,aulas(data_planejada)&id=eq.' + atividadeId);
    const atividade = linhas[0];
    if (!atividade) return null;
    return atividade.data_atividade || atividade.aulas?.data_planejada || null;
}

/**
 * Lê os alunos com falta no dia (o RLS devolve só os alunos das turmas do professor).
 * @param {string} dia - Data AAAA-MM-DD.
 * @returns {Promise<Set<string>>} Ids dos alunos que faltaram.
 */
async function lerFaltasDoDia(dia) {
    const linhas = await sbGet(TABELA_FALTA_ALUNO, 'select=aluno_id&data=eq.' + dia);
    return new Set(linhas.map((linha) => linha.aluno_id));
}

/**
 * Grava (marcou) ou apaga (desmarcou) a falta do aluno no dia.
 * @param {{alunoId: string, dia: string, faltou: boolean}} dados - Aluno, dia e situação.
 * @throws {Error} Se o banco recusar.
 */
async function gravarFaltaDoAluno(dados) {
    const tabela = obterClienteSupabase().from(TABELA_FALTA_ALUNO);
    const { error } = dados.faltou
        ? await tabela.upsert({ aluno_id: dados.alunoId, data: dados.dia },
            { onConflict: 'aluno_id,data', ignoreDuplicates: true })
        : await tabela.delete().eq('aluno_id', dados.alunoId).eq('data', dados.dia);
    if (error) throw new Error(error.message);
}

/**
 * Monta o ON/OFF "Faltou?" de um aluno.
 * @param {Object} estado - Estado do controle (dia, faltas, aoMudar).
 * @param {{alunoId: string, nome: string}} aluno - Aluno do painel.
 * @returns {HTMLElement} Interruptor do aluno.
 */
function montarBotaoFaltouDoAluno(estado, aluno) {
    const { etiqueta, caixa } = criarInterruptorFalta({ texto: TEXTO_BOTAO_FALTOU,
        ligado: estado.faltas.has(aluno.alunoId),
        aoMudar: (elemento) => mudarFaltaDoAluno(estado, { aluno, caixa: elemento }) });
    etiqueta.classList.add(CLASSE_FALTA_ALUNO + '__interruptor--aluno');
    caixa.disabled = !estado.dia;
    etiqueta.title = estado.dia ? 'Falta de ' + aluno.nome + ' no dia ' + estado.dia
        : MSG_SEM_DATA_FALTA;
    return etiqueta;
}

/**
 * Grava a mudança do "Faltou?"; se o banco recusar, volta o interruptor e avisa.
 * @param {Object} estado - Estado do controle.
 * @param {{aluno: Object, caixa: HTMLInputElement}} dados - Aluno e interruptor.
 */
async function mudarFaltaDoAluno(estado, dados) {
    const faltou = dados.caixa.checked;
    dados.caixa.disabled = true;
    try {
        await gravarFaltaDoAluno({ alunoId: dados.aluno.alunoId, dia: estado.dia, faltou });
        if (faltou) estado.faltas.add(dados.aluno.alunoId);
        if (!faltou) estado.faltas.delete(dados.aluno.alunoId);
        estado.aoMudar();
    } catch (erro) {
        dados.caixa.checked = !faltou;
        await mostrarPopup(MSG_ERRO_FALTA + erro.message, { tipo: 'erro', titulo: 'Faltou' });
    } finally {
        dados.caixa.disabled = false;
    }
}

/**
 * Cria o controle de faltas do Progresso da turma ("Mostrar quem faltou" abre na escolha
 * guardada no navegador; sem ela, desligado).
 * @param {{atividadeId: number, aoMudar: Function, preferencias: Object}} dados - Atividade,
 *     redesenho da lista e escolhas guardadas no navegador ({ler, gravar}, opcional).
 * @returns {Promise<{elemento: HTMLElement, atualizar: Function, filtrar: Function,
 *     criarBotao: Function}>} Área de cima, leitura das faltas, filtro e botão do aluno.
 */
async function criarControleFaltas(dados) {
    const estado = { dia: await lerDiaDaAtividadeFalta(dados.atividadeId), faltas: new Set(),
        mostrar: dados.preferencias?.ler(CHAVE_PREFERENCIA_FALTOU) ===
            VALOR_LIGADO_PREFERENCIA_FALTOU, aoMudar: dados.aoMudar };
    const elemento = criarElementoFalta('div', CLASSE_FALTA_ALUNO);
    const contagem = criarElementoFalta('span', CLASSE_FALTA_ALUNO + '__contagem');
    const { etiqueta, caixa } = criarInterruptorFalta({ texto: TEXTO_MOSTRAR_FALTOU,
        ligado: estado.mostrar, aoMudar: (elementoCaixa) => {
            estado.mostrar = elementoCaixa.checked;
            dados.preferencias?.gravar(CHAVE_PREFERENCIA_FALTOU, estado.mostrar
                ? VALOR_LIGADO_PREFERENCIA_FALTOU : VALOR_DESLIGADO_PREFERENCIA_FALTOU);
            estado.aoMudar();
        } });
    caixa.disabled = !estado.dia;
    contagem.textContent = estado.dia ? '' : MSG_SEM_DATA_FALTA;
    elemento.append(etiqueta, contagem);

    return {
        elemento,
        async atualizar() {
            if (!estado.dia) return;
            estado.faltas = await lerFaltasDoDia(estado.dia);
            contagem.textContent = estado.faltas.size + ' falta(s) no dia ' + estado.dia;
        },
        filtrar: (alunos) => (estado.mostrar ? alunos
            : alunos.filter((aluno) => !estado.faltas.has(aluno.alunoId))),
        criarBotao: (aluno) => montarBotaoFaltouDoAluno(estado, aluno),
    };
}

(function incluirEstiloFaltaAluno() {
    if (!BASE_SCRIPTS_FALTA_ALUNO) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_FALTA_ALUNO + ARQUIVO_CSS_FALTA_ALUNO;
    document.head.appendChild(link);
})();

window.criarControleFaltas = criarControleFaltas;
