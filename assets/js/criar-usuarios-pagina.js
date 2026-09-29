// Página scripts/criarUsuariosBancoDados.html: lista os alunos (sem senhas) e grava no Supabase
// pelo botão. Depende de assets/js/criar-usuarios-api.js e de window.LISTA_PRESENCA.

const MSG_SEM_LISTA = 'Lista não encontrada. Coloque LISTA-PRESENCA-CEPLAS-MANHA.js nesta pasta.';
const MSG_GRAVANDO = 'Gravando...';
const IDS_GUIA = {
    turma: 'guiaTurma',
    alunos: 'guiaAlunos',
    redefinir: 'guiaRedefinir',
    gravar: 'guiaGravar',
    resultado: 'guiaResultado',
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
 * Acrescenta uma linha ao resultado exibido (nunca mostra senha nem chave).
 * @param {string} situacao - Situação (criado, atualizado, erro...).
 * @param {string} email - E-mail do aluno.
 */
function registrarResultadoGuia(situacao, email) {
    obterElementoGuia('resultado').textContent += situacao.padEnd(12) + email + '\n';
}

/**
 * Pede confirmação e grava a lista no Supabase, mostrando o resultado.
 */
async function aoClicarGravar() {
    const total = window.LISTA_PRESENCA.turmas.flatMap((turma) => turma.alunos).length;
    const confirmou = window.confirm('Gravar ' + total + ' usuários no Supabase Auth agora?');
    if (!confirmou) return;

    const botao = obterElementoGuia('gravar');
    const resultado = obterElementoGuia('resultado');
    botao.disabled = true;
    resultado.textContent = MSG_GRAVANDO + '\n';
    try {
        const resumo = await gravarListaNoSupabase(window.LISTA_PRESENCA, {
            redefinirSenhas: obterElementoGuia('redefinir').checked,
            aoResultado: registrarResultadoGuia,
        });
        resultado.textContent += '\nResumo: ' + JSON.stringify(resumo) + '\n';
    } catch (erro) {
        resultado.textContent += '\n' + erro.message + '\n';
    }
    botao.disabled = false;
}

/**
 * Inicia a página: lista os alunos e liga o botão de gravar.
 */
function iniciarGuiaUsuarios() {
    if (!window.LISTA_PRESENCA) {
        obterElementoGuia('turma').textContent = MSG_SEM_LISTA;
        obterElementoGuia('turma').classList.add('guia-erro');
        obterElementoGuia('gravar').disabled = true;
        return;
    }
    mostrarAlunosGuia(window.LISTA_PRESENCA);
    obterElementoGuia('gravar').addEventListener('click', aoClicarGravar);
}

iniciarGuiaUsuarios();
