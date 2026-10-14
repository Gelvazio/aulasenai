// Professor: combo "Aluno" ao lado do combo "Turma" no título do Progresso da turma GLOBAL
// (progresso-turma-global.js), em toda atividade. "Todos os alunos" mostra a lista inteira; um
// aluno escolhido deixa só a linha dele. As opções são os alunos da lista (turma escolhida) e se
// atualizam a cada leitura. A escolha fica no localStorage do navegador (preferências injetadas
// pelo painel); aluno guardado que não está na lista (outra turma) vale como "Todos os alunos".
// Só filtra a lista na tela: nada é gravado no banco. O resumo, os Gráficos e o Cálculo Nota
// seguem com a turma escolhida inteira.
// Pedido do usuário em 2026-10-14 (tarefa #143). Regra: docs/regras/atividades.md

const CLASSE_FILTRO_ALUNO = 'progresso-turma__turma';
const ID_FILTRO_ALUNO = 'progresso-turma-combo-aluno';
const ROTULO_FILTRO_ALUNO = 'Aluno:';
const VALOR_TODOS_FILTRO_ALUNO = '';
const TEXTO_TODOS_FILTRO_ALUNO = 'Todos os alunos';
const CHAVE_PREFERENCIA_ALUNO = 'aluno';

/**
 * Refaz as opções do combo quando os alunos da lista mudam (mantém a escolha se ainda existir).
 * @param {HTMLSelectElement} combo - Combo de alunos.
 * @param {{alunos: Object[], desejado: string}} dados - Alunos da lista e aluno a escolher.
 */
function atualizarOpcoesFiltroAluno(combo, dados) {
    const ordenados = [...dados.alunos].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    const assinatura = ordenados.map((aluno) => aluno.alunoId).join(',');
    if (combo.dataset.assinatura !== assinatura) {
        combo.replaceChildren(new Option(TEXTO_TODOS_FILTRO_ALUNO, VALOR_TODOS_FILTRO_ALUNO),
            ...ordenados.map((aluno) => new Option(aluno.nome, aluno.alunoId)));
        combo.dataset.assinatura = assinatura;
    }
    const estaNaLista = ordenados.some((aluno) => aluno.alunoId === dados.desejado);
    combo.value = estaNaLista ? dados.desejado : VALOR_TODOS_FILTRO_ALUNO;
}

/**
 * Cria o combo "Aluno" do Progresso da turma.
 * @param {Function} aoMudar - Redesenha a lista quando o aluno muda.
 * @param {{ler: Function, gravar: Function}} [preferencias] - Escolhas guardadas no navegador.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Rótulo com o combo e a função que
 *   devolve só o aluno escolhido (ou todos).
 */
function criarFiltroAluno(aoMudar, preferencias) {
    const estado = { desejado: preferencias?.ler(CHAVE_PREFERENCIA_ALUNO) ||
        VALOR_TODOS_FILTRO_ALUNO };
    const elemento = document.createElement('label');
    elemento.className = CLASSE_FILTRO_ALUNO;
    elemento.htmlFor = ID_FILTRO_ALUNO;
    elemento.textContent = ROTULO_FILTRO_ALUNO + ' ';
    const combo = document.createElement('select');
    combo.id = ID_FILTRO_ALUNO;
    combo.className = CLASSE_FILTRO_ALUNO + '-opcoes';
    combo.add(new Option(TEXTO_TODOS_FILTRO_ALUNO, VALOR_TODOS_FILTRO_ALUNO));
    combo.addEventListener('change', () => {
        estado.desejado = combo.value;
        preferencias?.gravar(CHAVE_PREFERENCIA_ALUNO, combo.value);
        aoMudar();
    });
    elemento.append(combo);

    return {
        elemento,
        filtrar(alunos) {
            atualizarOpcoesFiltroAluno(combo, { alunos, desejado: estado.desejado });
            if (!combo.value) return alunos;
            return alunos.filter((aluno) => aluno.alunoId === combo.value);
        },
    };
}

window.criarFiltroAluno = criarFiltroAluno;
