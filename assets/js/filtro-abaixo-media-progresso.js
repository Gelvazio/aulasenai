// Professor: ON/OFF "ABAIXO DA MEDIA" no Progresso da turma GLOBAL (progresso-turma-global.js),
// em toda atividade. Vale só a NOTA FINAL (coluna "Nota final"): LIGADO lista apenas os alunos
// que tiraram menos que 7; desligado (padrão) não filtra nada. Aluno sem nota final (não
// entregou ou a IA ainda corrige) não tirou nota e some da lista quando o filtro está ligado.
// A escolha fica no localStorage do navegador (preferências injetadas pelo painel). Só filtra a
// lista na tela: nada é gravado no banco.
// Pedido do usuário em 2026-10-24 (tarefa #361). Regra: docs/regras/atividades.md

const TEXTO_FILTRO_ABAIXO_MEDIA = 'ABAIXO DA MEDIA';
const DICA_FILTRO_ABAIXO_MEDIA = 'Pela nota final. Ligado: só os alunos que tiraram menos que ' +
    '7. Desligado: todos os alunos.';
const CLASSE_INTERRUPTOR_ABAIXO_MEDIA = 'progresso-turma__interruptor';
const NOTA_MEDIA_ABAIXO_MEDIA = 7;
const CHAVE_PREFERENCIA_ABAIXO_MEDIA = 'abaixo-da-media';
const VALOR_LIGADO_PREFERENCIA_ABAIXO_MEDIA = 'sim';
const VALOR_DESLIGADO_PREFERENCIA_ABAIXO_MEDIA = 'nao';

/**
 * Diz se o aluno tirou menos que a média (nota final menor que 7).
 * @param {{valorNotaFinal: number}} aluno - Aluno com indicadores (sem nota final = negativo).
 * @returns {boolean} true quando o aluno tem nota final e ela é menor que 7.
 */
function estaAbaixoDaMedia(aluno) {
    const temNotaFinal = aluno.valorNotaFinal >= 0;
    if (!temNotaFinal) return false;

    return aluno.valorNotaFinal < NOTA_MEDIA_ABAIXO_MEDIA;
}

/**
 * Cria o filtro "ABAIXO DA MEDIA" do Progresso da turma (abre na escolha guardada no navegador;
 * sem ela, desligado = todos os alunos).
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 * @param {{ler: Function, gravar: Function}} [preferencias] - Escolhas guardadas no navegador.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Interruptor e a função que devolve os
 *   alunos visíveis (ligado: só abaixo da média; desligado: todos).
 */
function criarFiltroAbaixoMedia(aoMudar, preferencias) {
    const elemento = document.createElement('label');
    elemento.className = CLASSE_INTERRUPTOR_ABAIXO_MEDIA;
    elemento.title = DICA_FILTRO_ABAIXO_MEDIA;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = preferencias?.ler(CHAVE_PREFERENCIA_ABAIXO_MEDIA) ===
        VALOR_LIGADO_PREFERENCIA_ABAIXO_MEDIA;
    caixa.addEventListener('change', () => {
        preferencias?.gravar(CHAVE_PREFERENCIA_ABAIXO_MEDIA, caixa.checked
            ? VALOR_LIGADO_PREFERENCIA_ABAIXO_MEDIA : VALOR_DESLIGADO_PREFERENCIA_ABAIXO_MEDIA);
        aoMudar();
    });
    const chave = document.createElement('span');
    chave.className = CLASSE_INTERRUPTOR_ABAIXO_MEDIA + '-chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_FILTRO_ABAIXO_MEDIA;
    elemento.append(caixa, chave, texto);

    return {
        elemento,
        filtrar: (alunos) => (caixa.checked ? alunos.filter(estaAbaixoDaMedia) : alunos),
    };
}

window.criarFiltroAbaixoMedia = criarFiltroAbaixoMedia;
