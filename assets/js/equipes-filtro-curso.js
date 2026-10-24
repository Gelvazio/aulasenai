// Filtros da lista "Curso" do modal de equipes (assets/js/equipes-modal.js): busca por nome e
// botões ON/OFF de ano e de semestre. Curso sem ano (ou sem semestre) não é escondido pelo
// filtro de ano (ou de semestre). Todos ligados e nome vazio = todos os cursos.

const SEMESTRES_FILTRO_CURSO = [1, 2];
const CLASSE_BOTAO_FILTRO_CURSO = 'equipes-filtro-curso__botao';
const CLASSE_BOTAO_FILTRO_CURSO_LIGADO = 'equipes-filtro-curso__botao--ligado';
const estadoFiltroCurso = {
  nome: '', anosDesligados: new Set(), semestresDesligados: new Set(),
};

/**
 * Tira acentos e maiúsculas, para a busca por nome não depender deles.
 * @param {string} texto - Texto original.
 * @returns {string} Texto normalizado.
 */
function normalizarTextoFiltroCurso(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/**
 * Diz se o curso aparece na lista com os filtros atuais.
 * @param {{nome_completo: string, ano: ?number, semestre: ?number}} curso - Curso.
 * @returns {boolean} true se passa nos filtros de nome, ano e semestre.
 */
function cursoPassaNoFiltroEquipes(curso) {
  const busca = normalizarTextoFiltroCurso(estadoFiltroCurso.nome.trim());
  const passaNoNome = normalizarTextoFiltroCurso(curso.nome_completo).includes(busca);
  const passaNoAno = !curso.ano || !estadoFiltroCurso.anosDesligados.has(curso.ano);
  const passaNoSemestre = !curso.semestre
    || !estadoFiltroCurso.semestresDesligados.has(curso.semestre);
  return passaNoNome && passaNoAno && passaNoSemestre;
}

/**
 * Cria um botão ON/OFF de filtro; clicar liga/desliga o valor e avisa a tela.
 * @param {{texto: string, desligados: Set<number>, valor: number}} filtro - Dados do botão.
 * @param {Function} aoMudar - Chamada depois de cada clique.
 * @returns {HTMLButtonElement} Botão pronto.
 */
function criarBotaoFiltroCursoEquipes({ texto, desligados, valor }, aoMudar) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = CLASSE_BOTAO_FILTRO_CURSO;
  const atualizar = () => {
    const ligado = !desligados.has(valor);
    botao.classList.toggle(CLASSE_BOTAO_FILTRO_CURSO_LIGADO, ligado);
    botao.setAttribute('aria-pressed', String(ligado));
    botao.textContent = texto + ': ' + (ligado ? 'ON' : 'OFF');
  };
  atualizar();
  botao.addEventListener('click', () => {
    if (desligados.has(valor)) desligados.delete(valor);
    else desligados.add(valor);
    atualizar();
    aoMudar();
  });
  return botao;
}

/**
 * Monta o bloco de filtros (nome, ano e semestre). Os botões de ano nascem vazios e são
 * desenhados quando os cursos chegam (desenharFiltrosAnoEquipes).
 * @param {Function} aoMudar - Chamada quando qualquer filtro muda.
 * @returns {{bloco: HTMLElement, anos: HTMLElement}} Bloco pronto e o grupo dos botões de ano.
 */
function criarFiltrosCursoEquipes(aoMudar) {
  const bloco = document.createElement('div');
  bloco.className = 'equipes-filtro-curso';
  const nome = document.createElement('input');
  nome.type = 'search';
  nome.className = 'equipes-controle';
  nome.placeholder = 'Filtrar curso por nome…';
  nome.setAttribute('aria-label', 'Filtrar curso por nome');
  nome.addEventListener('input', () => {
    estadoFiltroCurso.nome = nome.value;
    aoMudar();
  });
  const anos = document.createElement('div');
  anos.className = 'equipes-filtro-curso__grupo';
  const semestres = document.createElement('div');
  semestres.className = 'equipes-filtro-curso__grupo';
  semestres.append(...SEMESTRES_FILTRO_CURSO.map((semestre) => criarBotaoFiltroCursoEquipes({
    texto: semestre + 'º semestre', desligados: estadoFiltroCurso.semestresDesligados,
    valor: semestre,
  }, aoMudar)));
  bloco.append(nome, anos, semestres);
  return { bloco, anos };
}

/**
 * Desenha um botão ON/OFF por ano que existe nos cursos (mais recente primeiro).
 * @param {HTMLElement} grupo - Grupo dos botões de ano.
 * @param {{ano: ?number}[]} cursos - Cursos carregados.
 * @param {Function} aoMudar - Chamada depois de cada clique.
 * @returns {void}
 */
function desenharFiltrosAnoEquipes(grupo, cursos, aoMudar) {
  const anos = [...new Set(cursos.map((curso) => curso.ano).filter(Boolean))]
    .sort((a, b) => b - a);
  grupo.replaceChildren(...anos.map((ano) => criarBotaoFiltroCursoEquipes({
    texto: String(ano), desligados: estadoFiltroCurso.anosDesligados, valor: ano,
  }, aoMudar)));
}
