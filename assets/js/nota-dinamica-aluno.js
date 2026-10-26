// Atividade Dinâmica (tarefa #381): o ALUNO vê a própria nota depois que o professor a lança.
// Só leitura (o RLS entrega apenas a linha do aluno logado). Depende de nota-dinamica-repositorio.js.
// Regra: docs/regras/atividade-dinamica.md

const ID_MINHA_NOTA_DINAMICA = 'dinamica-minha-nota';
const MSG_AINDA_SEM_NOTA_DINAMICA = 'O professor ainda não lançou a sua nota desta dinâmica.';
const MSG_ERRO_MINHA_NOTA_DINAMICA = 'Não foi possível carregar a sua nota: ';
const ROTULOS_FORMATO_DINAMICA = new Map(
    FORMATOS_DINAMICA.map(({ valor, texto }) => [valor, texto]));

/**
 * Formata a nota com vírgula e duas casas.
 * @param {number|string} nota - Nota de 0 a 10.
 * @returns {string} Texto da nota.
 */
function formatarNotaAlunoDinamica(nota) {
    return Number(nota).toFixed(2).replace('.', ',');
}

/**
 * Desenha a nota, o detalhe por critério e o comentário.
 * @param {HTMLElement} painel - Seção "Minha nota".
 * @param {Object} nota - Linha de nota_dinamica do aluno.
 */
function mostrarMinhaNotaDinamica(painel, nota) {
    const texto = painel.querySelector('.dinamica__texto');
    texto.textContent = '';
    const destaque = document.createElement('div');
    destaque.className = 'dinamica__nota-aluno';
    destaque.textContent = formatarNotaAlunoDinamica(nota.nota) + ' / 10';
    const detalhes = document.createElement('ul');
    detalhes.className = 'dinamica__criterios';
    (nota.criterios || []).forEach((criterio) => {
        const item = document.createElement('li');
        item.textContent = criterio.nome + ': ' + formatarNotaAlunoDinamica(criterio.nota);
        detalhes.append(item);
    });
    texto.append(destaque, detalhes);
    const formato = ROTULOS_FORMATO_DINAMICA.get(nota.formato);
    if (formato) texto.append(document.createTextNode('Formato: ' + formato + '. '));
    if (nota.grupo) texto.append(document.createTextNode('Grupo: ' + nota.grupo + '. '));
    if (nota.comentario) texto.append(document.createTextNode('Comentário: ' + nota.comentario));
}

/**
 * Mostra a seção do aluno e carrega a nota dele.
 * @returns {Promise<void>}
 */
async function iniciarMinhaNotaDinamica() {
    if (await ehProfessorDinamica()) return;

    const alunoId = await lerAlunoLogadoDinamica();
    if (!alunoId) return;

    const painel = document.getElementById(ID_MINHA_NOTA_DINAMICA);
    painel.hidden = false;
    const texto = painel.querySelector('.dinamica__texto');
    try {
        const atividade = await lerAtividadeDaDinamica();
        const [nota] = atividade ? await lerNotasDaDinamica(atividade.id, alunoId) : [];
        if (!nota) { texto.textContent = MSG_AINDA_SEM_NOTA_DINAMICA; return; }
        mostrarMinhaNotaDinamica(painel, nota);
    } catch (erro) {
        texto.textContent = MSG_ERRO_MINHA_NOTA_DINAMICA + erro.message;
    }
}

document.addEventListener('DOMContentLoaded', iniciarMinhaNotaDinamica);
