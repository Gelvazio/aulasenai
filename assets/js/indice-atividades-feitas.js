// Coluna "Fez Atividade? (Sim/Não)" em cada card do ATIVIDADES/index.html, com filtro, e as cores
// de cada botão de atividade pelo andamento do aluno (#283): entregue = verde claro; começou e não
// entregou = amarelo (o de hoje); não fez nada = vermelho fraco piscando (CSS).
// Para o aluno logado: "Sim" se ele já respondeu pelo menos 1 vez (qualquer alternativa gravada
// no banco); "Não" caso contrário. Só JavaScript: lê as tabelas atividade, resposta_atividade e
// entrega_atividade (o RLS devolve ao aluno apenas as próprias respostas/entregas). Professor e
// visitante não veem a coluna nem as cores. Cards informativos (data-sem-bloqueio, ex.: composição
// da nota) não recebem a marca nem somem no filtro.
// Carregado por assets/js/atividades-crud-modal.js, que já está em todo índice de atividades.
// Depende de: supabase-js e js/supabase.js (obterClienteSupabase, sbGet).

const SELETOR_CARD_FEITAS = 'article.aula:not([data-sem-bloqueio])';
const SELETOR_LINK_FEITAS = 'a.btn.principal';
const CLASSE_MARCA_FEITAS = 'marca-feita';
const CLASSE_ATIVIDADE_FEITA = 'atividade--feita';
const CLASSE_ATIVIDADE_PENDENTE = 'atividade--pendente';
const CLASSE_ATIVIDADE_NAO_FEITA = 'atividade--nao-feita';
// Guardado pelo indice-atividades-bloqueio.js quando o aluno não pode abrir a atividade (#281).
const ATRIBUTO_HREF_GUARDADO_FEITAS = 'data-href-bloqueado';
const FILTRO_TODAS_FEITAS = 'todas';
const FILTRO_SIM_FEITAS = 'sim';
const FILTRO_NAO_FEITAS = 'nao';
const LIMITE_RESPOSTAS_FEITAS = 5000;
const CLASSE_BARRA_FEITAS = 'filtro-feitas';
// A sessão do Supabase pode demorar a ficar pronta na abertura da página: o perfil é tentado de
// novo algumas vezes antes de desistir (senão a cor não seria aplicada).
const TENTATIVAS_PERFIL_FEITAS = 10;
const ESPERA_PERFIL_FEITAS = 300;
// Disparado pelo indice-aula-data.js quando a grade só do banco fica pronta (#272): os cards são
// novos, então a marca e as cores são refeitas neles.
const EVENTO_CARDS_MONTADOS_FEITAS = 'cards-aula-montados';

/**
 * Descobre o perfil do usuário logado.
 * @returns {Promise<string|null>} Perfil (ALUNO/PROFESSOR) ou null se não há login.
 */
async function obterPerfilFeitas() {
    const cliente = obterClienteSupabase();
    if (!cliente) return null;

    const { data } = await cliente.auth.getSession();
    const usuario = data?.session?.user;
    return usuario ? (usuario.app_metadata?.perfil || 'ALUNO') : null;
}

/**
 * Descobre o perfil do usuário logado, esperando a sessão ficar pronta na abertura da página.
 * @returns {Promise<string|null>} Perfil (ALUNO/PROFESSOR) ou null se não há login.
 */
async function aguardarPerfilFeitas() {
    for (let tentativa = 0; tentativa < TENTATIVAS_PERFIL_FEITAS; tentativa += 1) {
        const perfil = await obterPerfilFeitas();
        if (perfil) return perfil;
        await new Promise((resolver) => setTimeout(resolver, ESPERA_PERFIL_FEITAS));
    }
    return null;
}

/**
 * Converte o href de um link em caminho (pathname) decodificado, se for página HTML.
 * @param {string} href - Valor do atributo href.
 * @returns {string|null} Caminho da página ou null.
 */
function obterCaminhoFeitas(href) {
    if (!href) return null;

    const caminho = decodeURIComponent(new URL(href, location.href).pathname);
    return caminho.toLowerCase().endsWith('.html') ? caminho : null;
}

/**
 * Caminho da página de um link de atividade, mesmo quando o bloqueio já tirou o href (#281).
 * @param {HTMLAnchorElement} link - Link da atividade.
 * @returns {string|null} Caminho da página ou null.
 */
function obterPaginaDoLinkFeitas(link) {
    return obterCaminhoFeitas(link.getAttribute('href') ||
        link.getAttribute(ATRIBUTO_HREF_GUARDADO_FEITAS));
}

/**
 * Descobre, por página de atividade, se o aluno já entregou e se já respondeu algo.
 * @param {string[]} paginas - Caminhos das atividades do índice.
 * @returns {Promise<{paginas: Set<string>, entregues: Set<string>, respondidas: Set<string>}>}
 *     Páginas cadastradas no banco, entregues e com resposta.
 */
async function buscarEstadosFeitas(paginas) {
    const vazio = { paginas: new Set(), entregues: new Set(), respondidas: new Set() };
    if (!paginas.length) return vazio;

    const valores = paginas.map((pagina) => '"' + pagina.replace(/"/g, '') + '"').join(',');
    const atividades = await sbGet('atividade',
        'select=id,pagina&pagina=in.(' + encodeURIComponent(valores) + ')');
    const ids = atividades.map((atividade) => atividade.id);
    if (!ids.length) return vazio;

    const filtro = 'atividade_id=in.(' + ids.join(',') + ')';
    const [respostas, entregas] = await Promise.all([
        sbGet('resposta_atividade', 'select=atividade_id&' + filtro +
            '&limit=' + LIMITE_RESPOSTAS_FEITAS),
        // Se a leitura das entregas falhar, a cor ainda sai pelo que foi respondido.
        sbGet('entrega_atividade', 'select=atividade_id&' + filtro).catch(() => []),
    ]);
    const paginaPorId = new Map(atividades.map((atividade) => [atividade.id, atividade.pagina]));
    const paginasDe = (linhas) => new Set(
        linhas.map((linha) => paginaPorId.get(linha.atividade_id)).filter(Boolean));
    return {
        paginas: new Set(atividades.map((atividade) => atividade.pagina)),
        entregues: paginasDe(entregas),
        respondidas: paginasDe(respostas),
    };
}

/**
 * Pinta cada botão de atividade do card pelo andamento do aluno (#283): entregue (verde claro),
 * começou e não entregou (amarelo de hoje) ou não fez nada (vermelho fraco piscando). Só pinta
 * páginas cadastradas no banco; os demais links do card ficam como estão.
 * @param {HTMLElement} card - Card do índice.
 * @param {{paginas: Set<string>, entregues: Set<string>, respondidas: Set<string>}} estados
 */
function marcarLinksDoCard(card, estados) {
    card.querySelectorAll(SELETOR_LINK_FEITAS).forEach((link) => {
        const pagina = obterPaginaDoLinkFeitas(link);
        if (!pagina || !estados.paginas.has(pagina)) return;
        const classe = estados.entregues.has(pagina) ? CLASSE_ATIVIDADE_FEITA :
            estados.respondidas.has(pagina) ? CLASSE_ATIVIDADE_PENDENTE :
                CLASSE_ATIVIDADE_NAO_FEITA;
        link.classList.remove(CLASSE_ATIVIDADE_FEITA, CLASSE_ATIVIDADE_PENDENTE,
            CLASSE_ATIVIDADE_NAO_FEITA);
        link.classList.add(classe);
    });
}

/**
 * Acrescenta ao card a marca "Fez Atividade? Sim/Não".
 * @param {HTMLElement} card - Card do índice.
 * @param {boolean} fez - Se o aluno já respondeu ao menos 1 vez.
 */
function marcarCardFeitas(card, fez) {
    card.querySelector('.' + CLASSE_MARCA_FEITAS)?.remove();
    card.dataset.fez = fez ? FILTRO_SIM_FEITAS : FILTRO_NAO_FEITAS;
    const marca = document.createElement('p');
    marca.className = CLASSE_MARCA_FEITAS + ' ' + CLASSE_MARCA_FEITAS + (fez ? '--sim' : '--nao');
    marca.textContent = 'Fez Atividade? ' + (fez ? '✅ Sim' : '❌ Não');
    const meta = card.querySelector('.meta') || card.querySelector('.topo');
    if (meta) meta.after(marca);
    else card.prepend(marca);
}

/**
 * Mostra só os cards do filtro escolhido (Todas, Sim ou Não).
 * @param {string} valor - Filtro escolhido.
 */
function aplicarFiltroFeitas(valor) {
    document.querySelectorAll(SELETOR_CARD_FEITAS).forEach((card) => {
        card.hidden = valor !== FILTRO_TODAS_FEITAS && card.dataset.fez !== valor;
    });
}

/**
 * Cria a barra de filtro "Fez Atividade?" antes da grade de cards.
 */
function montarFiltroFeitas() {
    const grade = document.querySelector('.grade');
    const jaTemBarra = Boolean(document.querySelector('.' + CLASSE_BARRA_FEITAS));
    if (!grade || jaTemBarra) return;

    const barra = document.createElement('div');
    barra.className = CLASSE_BARRA_FEITAS;
    const rotulo = document.createElement('label');
    rotulo.textContent = 'Fez Atividade? ';
    const lista = document.createElement('select');
    [[FILTRO_TODAS_FEITAS, 'Todas'], [FILTRO_SIM_FEITAS, 'Sim'], [FILTRO_NAO_FEITAS, 'Não']]
        .forEach(([valor, texto]) => lista.add(new Option(texto, valor)));
    lista.addEventListener('change', () => aplicarFiltroFeitas(lista.value));
    rotulo.append(lista);
    barra.append(rotulo);
    grade.before(barra);
}

/**
 * Inicia a marcação: só para aluno logado; falhas de rede não quebram o índice.
 */
async function iniciarMarcacaoFeitas() {
    try {
        if (await aguardarPerfilFeitas() !== 'ALUNO') return;

        const cards = [...document.querySelectorAll(SELETOR_CARD_FEITAS)];
        const caminhos = cards.map((card) =>
            obterPaginaDoLinkFeitas(card.querySelector(SELETOR_LINK_FEITAS)));
        const estados = await buscarEstadosFeitas([...new Set(caminhos.filter(Boolean))]);
        cards.forEach((card, indice) => {
            marcarCardFeitas(card, estados.respondidas.has(caminhos[indice]));
            marcarLinksDoCard(card, estados);
        });
        montarFiltroFeitas();
    } catch (erro) {
        console.warn('Marcação "Fez Atividade?" indisponível:', erro.message);
    }
}

document.addEventListener(EVENTO_CARDS_MONTADOS_FEITAS, iniciarMarcacaoFeitas);
// Rede de segurança: se o evento da grade chegar antes deste módulo, o fim do carregamento pinta.
window.addEventListener('load', () => iniciarMarcacaoFeitas());
iniciarMarcacaoFeitas();
