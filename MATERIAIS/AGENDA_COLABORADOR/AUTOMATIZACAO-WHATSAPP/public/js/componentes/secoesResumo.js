/**
 * Definição das seções de um resumo (usada no cartão e na exportação em texto).
 * Novo campo no resumo = nova entrada aqui.
 */

/**
 * Junta partes não vazias com separador.
 * @param {(string|undefined)[]} partes - Partes.
 * @param {string} separador - Separador.
 * @returns {string} Texto.
 */
function juntar(partes, separador) {
  return partes.filter((parte) => parte && String(parte).trim()).join(separador);
}

export const SECOES_RESUMO = Object.freeze([
  {
    campo: 'assuntos',
    titulo: 'Assuntos',
    formatar: (item) => juntar([item.titulo, item.descricao], ': '),
  },
  { campo: 'decisoes', titulo: 'Decisões', formatar: (item) => String(item) },
  {
    campo: 'tarefas',
    titulo: 'Tarefas e pendências',
    formatar: (item) =>
      juntar([item.descricao, item.responsavel && `responsável: ${item.responsavel}`, item.prazo && `prazo: ${item.prazo}`], ' · '),
  },
  {
    campo: 'perguntas_sem_resposta',
    titulo: 'Perguntas sem resposta',
    formatar: (item) => juntar([item.autor, item.pergunta], ': '),
  },
  { campo: 'mencoes_ao_usuario', titulo: 'Menções a você', formatar: (item) => String(item) },
  { campo: 'destaques', titulo: 'Destaques', formatar: (item) => String(item) },
  {
    campo: 'links',
    titulo: 'Links',
    formatar: (item) => juntar([item.contexto, item.url], ' — '),
  },
]);

/**
 * Converte um resumo em Markdown (copiar/baixar).
 * @param {{grupo_nome: string, periodo_inicio: string, periodo_fim: string,
 *   conteudo: object}} resumo - Resumo salvo.
 * @param {(data: string) => string} formatarData - Formatador de data/hora.
 * @returns {string} Texto em Markdown.
 */
export function resumoParaMarkdown(resumo, formatarData) {
  const conteudo = resumo.conteudo || {};
  const periodo = `${formatarData(resumo.periodo_inicio)} a ${formatarData(resumo.periodo_fim)}`;
  const linhas = [`# Resumo — ${resumo.grupo_nome}`, '', `_${periodo}_`, '', conteudo.resumo_curto || ''];
  SECOES_RESUMO.forEach((secao) => {
    const itens = conteudo[secao.campo] || [];
    if (itens.length === 0) return;

    linhas.push('', `## ${secao.titulo}`, ...itens.map((item) => `- ${secao.formatar(item)}`));
  });
  return linhas.join('\n');
}
