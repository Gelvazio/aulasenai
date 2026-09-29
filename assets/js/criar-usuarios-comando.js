// Página guia scripts/criarUsuariosBancoDados.html: lista os alunos de window.LISTA_PRESENCA
// (sem senhas) e monta o comando de scripts/criar-usuarios-supabase-auth.js.
// A chave service_role e as senhas nunca passam por esta página.

const SCRIPT_CRIAR_USUARIOS = 'scripts/criar-usuarios-supabase-auth.js';
const LISTA_PADRAO = 'scripts/LISTA-PRESENCA-CEPLAS-MANHA.js';
const OPCAO_EXECUTAR_GUIA = '--executar';
const OPCAO_REDEFINIR_GUIA = '--redefinir-senhas';
const MSG_SEM_LISTA = 'Lista não encontrada. Coloque LISTA-PRESENCA-CEPLAS-MANHA.js nesta pasta.';
const MSG_COPIADO = 'Comando copiado.';
const MSG_COPIA_MANUAL = 'Selecione o comando e copie manualmente.';
const IDS_GUIA = {
    turma: 'guiaTurma',
    alunos: 'guiaAlunos',
    executar: 'guiaExecutar',
    redefinir: 'guiaRedefinir',
    comando: 'guiaComando',
    copiar: 'guiaCopiar',
    mensagem: 'guiaMensagem',
};

/**
 * Obtém um elemento da página pelo nome lógico.
 * @param {string} chave - Chave de IDS_GUIA.
 * @returns {HTMLElement} Elemento encontrado.
 */
function obterElementoGuia(chave) {
    return document.getElementById(IDS_GUIA[chave]);
}

/**
 * Monta o texto do comando conforme as opções marcadas.
 * @param {{executar: boolean, redefinir: boolean}} opcoes - Opções escolhidas.
 * @returns {string} Comando do script (a chave vem de scripts/variaveis.js).
 */
function montarComandoGuia(opcoes) {
    const partes = ['node', SCRIPT_CRIAR_USUARIOS, LISTA_PADRAO];
    if (opcoes.executar) partes.push(OPCAO_EXECUTAR_GUIA);
    if (opcoes.redefinir) partes.push(OPCAO_REDEFINIR_GUIA);
    return partes.join(' ');
}

/**
 * Atualiza o comando exibido com as opções atuais.
 */
function atualizarComandoGuia() {
    obterElementoGuia('comando').textContent = montarComandoGuia({
        executar: obterElementoGuia('executar').checked,
        redefinir: obterElementoGuia('redefinir').checked,
    });
}

/**
 * Cria uma linha da tabela de alunos (número, nome e e-mail; sem senha).
 * @param {Object} aluno - Aluno da lista de presença.
 * @returns {HTMLTableRowElement} Linha da tabela.
 */
function criarLinhaAlunoGuia(aluno) {
    const linha = document.createElement('tr');
    [aluno.numero, aluno.nome, aluno.email].forEach((valor) => {
        const celula = document.createElement('td');
        celula.textContent = String(valor);
        linha.append(celula);
    });
    return linha;
}

/**
 * Mostra a turma e os alunos da lista.
 * @param {Object} lista - Conteúdo de window.LISTA_PRESENCA.
 */
function mostrarAlunosGuia(lista) {
    const turmas = lista.turmas || [];
    const nomes = turmas.map((turma) => turma.nome + ' (código: ' + turma.codigo + ')');
    obterElementoGuia('turma').textContent = nomes.join(' · ');
    const alunos = turmas.flatMap((turma) => turma.alunos || []);
    obterElementoGuia('alunos').replaceChildren(...alunos.map(criarLinhaAlunoGuia));
}

/**
 * Copia o comando para a área de transferência.
 */
async function copiarComandoGuia() {
    const mensagem = obterElementoGuia('mensagem');
    try {
        await navigator.clipboard.writeText(obterElementoGuia('comando').textContent);
        mensagem.textContent = MSG_COPIADO;
    } catch (erro) {
        mensagem.textContent = MSG_COPIA_MANUAL;
    }
}

/**
 * Inicia a página: lista os alunos e liga as opções e o botão de copiar.
 */
function iniciarGuiaUsuarios() {
    if (!window.LISTA_PRESENCA) {
        obterElementoGuia('turma').textContent = MSG_SEM_LISTA;
        obterElementoGuia('turma').classList.add('guia-erro');
        return;
    }
    mostrarAlunosGuia(window.LISTA_PRESENCA);
    ['executar', 'redefinir'].forEach((chave) => {
        obterElementoGuia(chave).addEventListener('change', atualizarComandoGuia);
    });
    obterElementoGuia('copiar').addEventListener('click', copiarComandoGuia);
    atualizarComandoGuia();
}

iniciarGuiaUsuarios();
