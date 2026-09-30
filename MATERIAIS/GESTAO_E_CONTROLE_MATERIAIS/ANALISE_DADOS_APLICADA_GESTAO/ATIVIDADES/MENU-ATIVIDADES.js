/**
 * Dados do menu das atividades de Análise de Dados Aplicada à Gestão (lido por js/menu.js).
 * Os links são relativos a esta pasta ATIVIDADES/ (índice da matéria).
 * Mantenha em sincronia com AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/MENU-ATIVIDADES.js.
 */
const PASTA_EXCEL_MENU = '../AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/';
const PASTA_EXCEL_29_MENU = `${PASTA_EXCEL_MENU}ATIVIDADE-EXCEL-29-09-2026/`;
const PASTA_EXCEL_01_MENU = `${PASTA_EXCEL_MENU}ATIVIDADE-EXCEL-01-10-2026/`;

window.MENU_ATIVIDADES = {
  titulo: 'Análise de Dados Aplicada à Gestão',
  itens: [
    { rotulo: '📚 Índice', link: 'index.html' },
    {
      rotulo: '📝 Atividades por aula',
      subitens: [
        {
          rotulo: 'Aula 01 — Estatística e progressões',
          link: 'ATIVIDADES-AULA-01-12-QUESTOES.html',
        },
        {
          rotulo: 'Aula 02 — Conceitos e fundamentos do Excel',
          link: 'ATIVIDADES-AULA-02-12-QUESTOES.html',
        },
        {
          rotulo: 'Aula 03 — Funções de busca avançadas',
          link: 'ATIVIDADES-AULA-03-13-QUESTOES.html',
        },
        {
          rotulo: 'Aula 04 — Design de dashboard e KPIs',
          link: 'ATIVIDADES-AULA-04-14-QUESTOES.html',
        },
      ],
    },
    {
      rotulo: '📗 Excel 29/09 — Controle de estoque',
      subitens: [
        {
          rotulo: '🏠 Capa da atividade',
          link: `${PASTA_EXCEL_MENU}ATIVIDADE-EXCEL-29-09-2026.html`,
        },
        {
          rotulo: 'Questão 1 — Cadastro e formatação',
          link: `${PASTA_EXCEL_29_MENU}QUESTAO-01-CADASTRO-E-FORMATACAO.html`,
        },
        {
          rotulo: 'Questão 2 — Movimentação e validação',
          link: `${PASTA_EXCEL_29_MENU}QUESTAO-02-MOVIMENTACAO-E-VALIDACAO.html`,
        },
        {
          rotulo: 'Questão 3 — PROCV, SEERRO e ÍNDICE + CORRESP',
          link: `${PASTA_EXCEL_29_MENU}QUESTAO-03-PROCV-SEERRO-INDICE-CORRESP.html`,
        },
        {
          rotulo: 'Questão 4 — Saldo, SE e formatação condicional',
          link: `${PASTA_EXCEL_29_MENU}QUESTAO-04-SALDO-SE-FORMATACAO-CONDICIONAL.html`,
        },
        {
          rotulo: 'Questão 5 — CONT.SE, SOMASE e PROCH',
          link: `${PASTA_EXCEL_29_MENU}QUESTAO-05-RESUMO-CONTSE-SOMASE-PROCH.html`,
        },
        {
          rotulo: 'Questão 6 — Filtro e proteção',
          link: `${PASTA_EXCEL_29_MENU}QUESTAO-06-FILTRO-PROTECAO.html`,
        },
        {
          rotulo: 'Questão 7 — Base de requisições e formatação',
          link: `${PASTA_EXCEL_29_MENU}QUESTAO-07-BASE-REQUISICOES-FORMATACAO.html`,
        },
        {
          rotulo: 'Questão 8 — SE e formatação condicional',
          link: `${PASTA_EXCEL_29_MENU}QUESTAO-08-FORMATACAO-CONDICIONAL.html`,
        },
        {
          rotulo: 'Questão 9 — Filtros, CONT.SE e SOMASE',
          link: `${PASTA_EXCEL_29_MENU}QUESTAO-09-FILTROS-E-CLASSIFICACAO.html`,
        },
        {
          rotulo: 'Questão 10 — Congelar, impressão e entrega',
          link: `${PASTA_EXCEL_29_MENU}QUESTAO-10-CONGELAR-IMPRESSAO-ENTREGA.html`,
        },
      ],
    },
    {
      rotulo: '📊 Excel 01/10 — Tabelas dinâmicas',
      subitens: [
        {
          rotulo: '🏠 Capa da atividade',
          link: `${PASTA_EXCEL_MENU}ATIVIDADE-EXCEL-01-10-2026.html`,
        },
        {
          rotulo: 'Questão 1 — Preparar a base',
          link: `${PASTA_EXCEL_01_MENU}QUESTAO-01-PREPARAR-BASE.html`,
        },
        {
          rotulo: 'Questão 2 — Tabela dinâmica por fornecedor',
          link: `${PASTA_EXCEL_01_MENU}QUESTAO-02-TD-FORNECEDOR.html`,
        },
        {
          rotulo: 'Questão 3 — Mês e trimestre',
          link: `${PASTA_EXCEL_01_MENU}QUESTAO-03-TD-MES-TRIMESTRE.html`,
        },
        {
          rotulo: 'Questão 4 — Gráficos dinâmicos',
          link: `${PASTA_EXCEL_01_MENU}QUESTAO-04-GRAFICOS-DINAMICOS.html`,
        },
        {
          rotulo: 'Questão 5 — Campo calculado e gráfico combinado',
          link: `${PASTA_EXCEL_01_MENU}QUESTAO-05-CAMPO-CALCULADO-COMBINADO.html`,
        },
        {
          rotulo: 'Questão 6 — Segmentação e proteção',
          link: `${PASTA_EXCEL_01_MENU}QUESTAO-06-SEGMENTACAO-ATUALIZACAO-PROTECAO.html`,
        },
      ],
    },
  ],
};
