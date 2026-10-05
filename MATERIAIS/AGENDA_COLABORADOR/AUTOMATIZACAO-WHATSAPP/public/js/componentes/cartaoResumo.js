/**
 * Cartão de exibição de um resumo gerado pela IA.
 */
import { criarElemento } from '../dom.js';
import { TIPOS_RESUMO, TONS_RESUMO } from '../constantes.js';
import { formatarDataHora, formatarNumero } from '../formatadores.js';
import { botao, selo } from './basicos.js';
import { mostrarAviso, mostrarErro } from './avisos.js';
import { SECOES_RESUMO, resumoParaMarkdown } from './secoesResumo.js';

const PROTOCOLO_SEGURO = /^https?:\/\//i;

/**
 * Cria o item de lista de um link (só http/https viram âncora).
 * @param {{url?: string, contexto?: string}} item - Link.
 * @returns {HTMLElement} Item.
 */
function itemLink(item) {
  const url = String(item.url || '');
  const ancora = PROTOCOLO_SEGURO.test(url)
    ? criarElemento('a', { texto: url, atributos: { href: url, target: '_blank', rel: 'noopener noreferrer' } })
    : url;
  return criarElemento('li', { filhos: [item.contexto ? `${item.contexto} — ` : '', ancora] });
}

/**
 * Cria as seções preenchidas do resumo.
 * @param {object} conteudo - Conteúdo JSON do resumo.
 * @returns {HTMLElement[]} Seções.
 */
function criarSecoes(conteudo) {
  return SECOES_RESUMO.filter((secao) => (conteudo[secao.campo] || []).length > 0).map((secao) =>
    criarElemento('div', {
      classe: 'resumo__secao',
      filhos: [
        criarElemento('h3', { classe: 'resumo__subtitulo', texto: secao.titulo }),
        criarElemento('ul', {
          classe: 'resumo__lista',
          filhos: conteudo[secao.campo].map((item) =>
            secao.campo === 'links' ? itemLink(item) : criarElemento('li', { texto: secao.formatar(item) })
          ),
        }),
      ],
    })
  );
}

/**
 * Baixa o resumo como arquivo .md gerado no navegador.
 * @param {object} resumo - Resumo.
 * @returns {void}
 */
function baixarMarkdown(resumo) {
  const arquivo = new Blob([resumoParaMarkdown(resumo, formatarDataHora)], { type: 'text/markdown' });
  const endereco = URL.createObjectURL(arquivo);
  const nome = `resumo-${resumo.grupo_nome}-${resumo.periodo_inicio.slice(0, 10)}.md`.replace(/[^\w.-]+/g, '-');
  const ancora = criarElemento('a', { atributos: { href: endereco, download: nome } });
  ancora.click();
  URL.revokeObjectURL(endereco);
}

/**
 * Cria os metadados do resumo (grupo, período, selos).
 * @param {object} resumo - Resumo.
 * @param {boolean} mostrarGrupo - Exibe o nome do grupo com link.
 * @returns {HTMLElement} Cabeçalho do cartão.
 */
function criarCabecalho(resumo, mostrarGrupo) {
  const tom = TONS_RESUMO[resumo.conteudo?.tom] || TONS_RESUMO.informativo;
  const titulo = mostrarGrupo
    ? criarElemento('a', { texto: resumo.grupo_nome, atributos: { href: `#/grupos/${encodeURIComponent(resumo.grupo_jid)}` } })
    : criarElemento('span', { texto: 'Resumo' });
  return criarElemento('div', {
    classe: 'resumo__cabecalho',
    filhos: [
      criarElemento('h2', { classe: 'cartao__titulo', filhos: [titulo] }),
      criarElemento('div', {
        classe: 'linha-acoes',
        filhos: [selo(TIPOS_RESUMO[resumo.tipo] || resumo.tipo, 'primario'), selo(tom.rotulo, tom.variante)],
      }),
      criarElemento('p', {
        classe: 'texto-suave texto-pequeno resumo__meta',
        texto: `${formatarDataHora(resumo.periodo_inicio)} → ${formatarDataHora(resumo.periodo_fim)} · ` +
          `${formatarNumero(resumo.total_mensagens)} mensagens · ${resumo.modelo}`,
      }),
    ],
  });
}

/**
 * Cria o cartão do resumo.
 * @param {object} resumo - Resumo salvo (com `conteudo`).
 * @param {{mostrarGrupo?: boolean}} [opcoes] - Opções de exibição.
 * @returns {HTMLElement} Cartão.
 */
export function cartaoResumo(resumo, opcoes = {}) {
  const conteudo = resumo.conteudo || {};
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(resumoParaMarkdown(resumo, formatarDataHora));
      mostrarAviso('Resumo copiado.');
    } catch (erro) {
      mostrarErro(erro);
    }
  };
  return criarElemento('article', {
    classe: 'cartao resumo',
    filhos: [
      criarCabecalho(resumo, Boolean(opcoes.mostrarGrupo)),
      criarElemento('p', { classe: 'resumo__curto', texto: conteudo.resumo_curto }),
      ...criarSecoes(conteudo),
      criarElemento('div', {
        classe: 'linha-acoes',
        filhos: [
          botao({ texto: 'Copiar', pequeno: true, aoClicar: copiar }),
          botao({ texto: 'Baixar .md', pequeno: true, aoClicar: () => baixarMarkdown(resumo) }),
        ],
      }),
    ],
  });
}
