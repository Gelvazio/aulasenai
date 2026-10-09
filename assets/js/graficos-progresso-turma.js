// Professor: botão "📈 Gráficos" do Progresso da turma GLOBAL — abre um modal com 5 gráficos
// montados com os dados já lidos do banco pelo painel (assets/js/progresso-turma-global.js),
// em objetivas e discursivas: 1) barras: progresso de cada aluno; 2) pizza: situação da turma;
// 3) barras: alunos que completaram cada questão; 4) rosca: resultado (objetiva: acertos e
// erros; discursiva: correção da IA); 5) barras horizontais: nota parcial por aluno. Os títulos
// vêm do tipo da atividade (textos da fonte). Chart.js carregado sob demanda (CDN).
// Nada é gravado. Regra: docs/regras/atividades.md

const URL_CHART_JS = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
const CLASSE_GRAFICOS = 'graficos-progresso';
const BASE_SCRIPTS_GRAFICOS = document.currentScript?.src.replace(/[^/]*$/, '') || '';
const CORES_GRAFICOS = {
    azul: '#667eea', verde: '#38a169', amarelo: '#d69e2e', vermelho: '#e53e3e',
    cinza: '#a0aec0', roxo: '#6b46c1',
};
const TAMANHO_MAXIMO_NOME_GRAFICO = 18;

const estadoGraficos = { graficos: [], modal: null };

/**
 * Carrega o Chart.js uma única vez.
 * @returns {Promise<void>} Resolve quando a biblioteca está pronta.
 */
function carregarChartJs() {
    if (window.Chart) return Promise.resolve();
    return new Promise((resolver, rejeitar) => {
        const script = document.createElement('script');
        script.src = URL_CHART_JS;
        script.onload = () => resolver();
        script.onerror = () => rejeitar(new Error('Não foi possível carregar o Chart.js.'));
        document.head.appendChild(script);
    });
}

/**
 * Encurta o nome do aluno para caber no eixo do gráfico.
 * @param {string} nome - Nome completo.
 * @returns {string} Nome curto (primeiro e último nome, cortado se preciso).
 */
function nomeCurto(nome) {
    const partes = nome.trim().split(/\s+/);
    const curto = partes.length > 1 ? partes[0] + ' ' + partes[partes.length - 1] : partes[0];
    if (curto.length <= TAMANHO_MAXIMO_NOME_GRAFICO) return curto;
    return curto.slice(0, TAMANHO_MAXIMO_NOME_GRAFICO - 1) + '…';
}

/**
 * Conta a situação da turma: entregaram, terminaram sem entregar e em andamento.
 * @param {Object[]} alunos - Alunos com indicadores.
 * @returns {number[]} [entregaram, completos sem entregar, em andamento].
 */
function contarSituacaoDaTurma(alunos) {
    const entregaram = alunos.filter((aluno) => aluno.entregue).length;
    const completos = alunos.filter((aluno) => !aluno.entregue && aluno.percentual >= 100).length;
    return [entregaram, completos, alunos.length - entregaram - completos];
}

/**
 * Conta, para cada questão, quantos alunos responderam todos os tópicos dela.
 * @param {Object[]} alunos - Alunos com indicadores.
 * @param {Map<number, number>} topicos - Tópicos de cada questão.
 * @returns {{rotulos: string[], valores: number[]}} Dados do gráfico.
 */
function contarQuestoesCompletas(alunos, topicos) {
    const rotulos = [];
    const valores = [];
    topicos.forEach((total, item) => {
        rotulos.push('Q' + String(item).padStart(2, '0'));
        valores.push(alunos.filter((aluno) => (aluno.porQuestao.get(item) || 0) >= total).length);
    });
    return { rotulos, valores };
}

/**
 * Soma os resultados da correção de toda a turma (objetiva: acertos; discursiva: IA).
 * @param {Object[]} alunos - Alunos com indicadores (correcao com certas, meias e erradas).
 * @returns {number[]} [certas, meias certas, erradas].
 */
function somarResultadosDaCorrecao(alunos) {
    return alunos.reduce((soma, aluno) => {
        const nota = aluno.correcao || {};
        return [soma[0] + (nota.certas || 0), soma[1] + (nota.meias || 0),
            soma[2] + (nota.erradas || 0)];
    }, [0, 0, 0]);
}

/**
 * Monta as configurações dos 5 gráficos.
 * @param {Object[]} alunos - Alunos com indicadores.
 * @param {{topicos: Map<number, number>, textos: Object}} opcoes - Estrutura da prova e textos
 *     do tipo da atividade (graficoCorrecao, rotulosCorrecao, graficoNota).
 * @returns {Object[]} Lista {titulo, config} para o Chart.js.
 */
function montarConfiguracoesDosGraficos(alunos, opcoes) {
    const nomes = alunos.map((aluno) => nomeCurto(aluno.nome));
    const questoes = contarQuestoesCompletas(alunos, opcoes.topicos);
    const comNota = alunos.filter((aluno) => aluno.correcao);
    const { textos } = opcoes;
    const eixoPercentual = { scales: { y: { min: 0, max: 100 } } };
    return [
        { titulo: '1. Progresso de cada aluno (% respondido)', config: { type: 'bar',
            data: { labels: nomes, datasets: [{ label: '% respondido', backgroundColor:
                CORES_GRAFICOS.azul, data: alunos.map((aluno) => aluno.percentual) }] },
            options: eixoPercentual } },
        { titulo: '2. Situação da turma', config: { type: 'pie',
            data: { labels: ['Entregaram', 'Terminaram sem entregar', 'Em andamento'],
                datasets: [{ data: contarSituacaoDaTurma(alunos), backgroundColor:
                    [CORES_GRAFICOS.verde, CORES_GRAFICOS.amarelo, CORES_GRAFICOS.azul] }] } } },
        { titulo: '3. Alunos que completaram cada questão', config: { type: 'bar',
            data: { labels: questoes.rotulos, datasets: [{ label: 'alunos', backgroundColor:
                CORES_GRAFICOS.verde, data: questoes.valores }] } } },
        { titulo: textos.graficoCorrecao, config: { type: 'doughnut',
            data: { labels: textos.rotulosCorrecao, datasets: [{
                data: somarResultadosDaCorrecao(alunos), backgroundColor: [CORES_GRAFICOS.verde,
                    CORES_GRAFICOS.amarelo, CORES_GRAFICOS.vermelho] }] } } },
        { titulo: textos.graficoNota, config: { type: 'bar',
            data: { labels: comNota.map((aluno) => nomeCurto(aluno.nome)), datasets: [{
                label: 'nota parcial', backgroundColor: CORES_GRAFICOS.roxo,
                data: comNota.map((aluno) => Number(aluno.notaParcial.toFixed(2))) }] },
            options: { indexAxis: 'y', scales: { x: { min: 0, max: 10 } } } } },
    ];
}

/**
 * Fecha o modal e libera os gráficos.
 */
function fecharGraficos() {
    estadoGraficos.graficos.forEach((grafico) => grafico.destroy());
    estadoGraficos.graficos = [];
    estadoGraficos.modal?.remove();
    estadoGraficos.modal = null;
    document.removeEventListener('keydown', fecharGraficosComEsc);
}

/**
 * Fecha o modal com a tecla Esc.
 * @param {KeyboardEvent} evento - Tecla pressionada.
 */
function fecharGraficosComEsc(evento) {
    if (evento.key === 'Escape') fecharGraficos();
}

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} classe - Classe CSS.
 * @param {string} [texto] - Texto do elemento.
 * @returns {HTMLElement} Elemento criado.
 */
function criarElementoGrafico(tag, classe, texto = '') {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

/**
 * Monta a estrutura do modal (fundo, janela, cabeçalho e grade dos gráficos).
 * @returns {{fundo: HTMLElement, grade: HTMLElement}} Elementos do modal.
 */
function montarModalGraficos() {
    const fundo = criarElementoGrafico('div', CLASSE_GRAFICOS);
    const janela = criarElementoGrafico('div', CLASSE_GRAFICOS + '__janela');
    janela.setAttribute('role', 'dialog');
    janela.setAttribute('aria-modal', 'true');
    const cabecalho = criarElementoGrafico('div', CLASSE_GRAFICOS + '__cabecalho');
    const fechar = criarElementoGrafico('button', CLASSE_GRAFICOS + '__fechar', '✕ Fechar');
    fechar.type = 'button';
    fechar.addEventListener('click', fecharGraficos);
    cabecalho.append(criarElementoGrafico('h2', CLASSE_GRAFICOS + '__titulo',
        '📈 Gráficos do progresso da turma (dados de agora)'), fechar);
    const grade = criarElementoGrafico('div', CLASSE_GRAFICOS + '__grade');
    janela.append(cabecalho, grade);
    fundo.appendChild(janela);
    fundo.addEventListener('click', (evento) => {
        if (evento.target === fundo) fecharGraficos();
    });
    return { fundo, grade };
}

/**
 * Abre o modal com os 5 gráficos do progresso da turma.
 * @param {{alunos: Object[], topicos: Map<number, number>, textos: Object}} dados - Alunos com
 *     indicadores (estado do painel), estrutura da prova e textos do tipo da atividade.
 */
async function abrirGraficosProgresso(dados) {
    const { alunos, ...opcoes } = dados;
    fecharGraficos();
    if (!alunos.length) {
        await mostrarPopup('Ainda não há alunos com respostas para montar os gráficos.',
            { tipo: 'info', titulo: 'Gráficos' });
        return;
    }
    await carregarChartJs();
    const { fundo, grade } = montarModalGraficos();
    document.body.appendChild(fundo);
    estadoGraficos.modal = fundo;
    document.addEventListener('keydown', fecharGraficosComEsc);
    montarConfiguracoesDosGraficos(alunos, opcoes).forEach(({ titulo, config }) => {
        const cartao = criarElementoGrafico('div', CLASSE_GRAFICOS + '__cartao');
        const tela = document.createElement('canvas');
        cartao.append(criarElementoGrafico('h3', CLASSE_GRAFICOS + '__subtitulo', titulo), tela);
        grade.appendChild(cartao);
        estadoGraficos.graficos.push(new window.Chart(tela, {
            ...config, options: { responsive: true, maintainAspectRatio: false,
                ...(config.options || {}) } }));
    });
}

(function incluirEstiloGraficos() {
    if (!BASE_SCRIPTS_GRAFICOS) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE_SCRIPTS_GRAFICOS + '../css/graficos-progresso-turma.css';
    document.head.appendChild(link);
})();

window.abrirGraficosProgresso = abrirGraficosProgresso;
