// Professor: ON/OFF "Falta Entregar" no Progresso da turma GLOBAL (progresso-turma-global.js),
// logo depois do "Tarefa Entregue?", em toda atividade. Desligado (padrão): não filtra; ligado:
// só os alunos que ainda não entregaram a atividade. A escolha fica no localStorage do
// navegador (preferências injetadas pelo painel). Só filtra a lista na tela: nada é gravado no
// banco. Pedido do usuário em 2026-10-26 (tarefa #396).

const TEXTO_FILTRO_FALTA_ENTREGAR = 'Falta Entregar';
const DICA_FILTRO_FALTA_ENTREGAR = 'Desligado: não filtra. Ligado: só quem ainda não entregou.';
const CLASSE_INTERRUPTOR_FALTA_ENTREGAR = 'progresso-turma__interruptor';
const CHAVE_PREFERENCIA_FALTA_ENTREGAR = 'falta-entregar';
const VALOR_LIGADO_PREFERENCIA_FALTA_ENTREGAR = 'sim';
const VALOR_DESLIGADO_PREFERENCIA_FALTA_ENTREGAR = 'nao';

/**
 * Cria o filtro "Falta Entregar" do Progresso da turma (abre na escolha guardada no navegador;
 * sem ela, desligado).
 * @param {Function} aoMudar - Redesenha a lista quando o ON/OFF muda.
 * @param {{ler: Function, gravar: Function}} [preferencias] - Escolhas guardadas no navegador.
 * @returns {{elemento: HTMLElement, filtrar: Function}} Interruptor e a função que devolve os
 *   alunos visíveis (ligado: só quem não entregou; desligado: todos).
 */
function criarFiltroFaltaEntregar(aoMudar, preferencias) {
    const elemento = document.createElement('label');
    elemento.className = CLASSE_INTERRUPTOR_FALTA_ENTREGAR;
    elemento.title = DICA_FILTRO_FALTA_ENTREGAR;
    const caixa = document.createElement('input');
    caixa.type = 'checkbox';
    caixa.checked = preferencias?.ler(CHAVE_PREFERENCIA_FALTA_ENTREGAR) ===
        VALOR_LIGADO_PREFERENCIA_FALTA_ENTREGAR;
    caixa.addEventListener('change', () => {
        preferencias?.gravar(CHAVE_PREFERENCIA_FALTA_ENTREGAR, caixa.checked
            ? VALOR_LIGADO_PREFERENCIA_FALTA_ENTREGAR
            : VALOR_DESLIGADO_PREFERENCIA_FALTA_ENTREGAR);
        aoMudar();
    });
    const chave = document.createElement('span');
    chave.className = CLASSE_INTERRUPTOR_FALTA_ENTREGAR + '-chave';
    const texto = document.createElement('span');
    texto.textContent = TEXTO_FILTRO_FALTA_ENTREGAR;
    elemento.append(caixa, chave, texto);

    return {
        elemento,
        filtrar: (alunos) => (caixa.checked ? alunos.filter((aluno) => !aluno.entregue) : alunos),
    };
}

window.criarFiltroFaltaEntregar = criarFiltroFaltaEntregar;
