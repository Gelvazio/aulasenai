// Atividade Dinâmica no PC (tarefa #410): dados da Aula 02 de Fundamentos de UI/UX.
// Só dados: a tela de agendamento com problemas de hierarquia, a ficha e o checklist. Nada de
// gabarito (os "problemas" não ficam marcados aqui). Usado por iniciarDinamica3d.
// Origem do conteúdo: MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/
// AULA-02-*.md. Coordenadas: tela 360 x 640, origem no centro, y para cima.
// Regra: docs/regras/atividade-dinamica.md

const COR_CLARO_02 = '#e2e8f0';
const COR_MEDIO_02 = '#a0aec0';
const COR_ESCURO_02 = '#4a5568';
const COR_AZUL_02 = '#2b6cb0';
const COR_ALERTA_02 = '#c53030';

/**
 * Cria um elemento da tela original com os campos que a cena exige.
 * @param {number} id - Identificador do elemento.
 * @param {string} forma - retangulo, circulo ou triangulo.
 * @param {Object} caixa - { x, y, largura, altura }.
 * @param {Object} estilo - { cor, preenchido, raio, rotulo }.
 * @returns {Object} Elemento no formato do estado.
 */
function elementoAula02(id, forma, caixa, estilo) {
    return { id, forma, ...caixa, ...estilo };
}

/**
 * Monta a tela de agendamento "ruim": botão de confirmar minúsculo e apagado, botão de
 * cancelar maior que o de confirmar, blocos desalinhados e um aviso legal que chama atenção.
 * @returns {Object[]} Elementos da tela original, do fundo para a frente.
 */
function montarTelaAula02() {
    return [
        elementoAula02(1, 'retangulo', { x: 0, y: 290, largura: 360, altura: 60 },
            { cor: COR_CLARO_02, preenchido: true, raio: 0, rotulo: 'Agendar consulta' }),
        elementoAula02(2, 'circulo', { x: -150, y: 290, largura: 36, altura: 36 },
            { cor: COR_MEDIO_02, preenchido: true, raio: 0, rotulo: '' }),
        elementoAula02(3, 'circulo', { x: 150, y: 290, largura: 28, altura: 28 },
            { cor: COR_ALERTA_02, preenchido: true, raio: 0, rotulo: '3' }),
        elementoAula02(4, 'retangulo', { x: -20, y: 215, largura: 280, altura: 38 },
            { cor: COR_ESCURO_02, preenchido: false, raio: 4, rotulo: 'Nome do paciente' }),
        elementoAula02(5, 'retangulo', { x: 25, y: 160, largura: 250, altura: 38 },
            { cor: COR_ESCURO_02, preenchido: false, raio: 4, rotulo: 'Especialidade' }),
        elementoAula02(6, 'triangulo', { x: 125, y: 160, largura: 14, altura: 12 },
            { cor: COR_ESCURO_02, preenchido: true, raio: 0, rotulo: '' }),
        elementoAula02(7, 'retangulo', { x: -35, y: 105, largura: 290, altura: 38 },
            { cor: COR_ESCURO_02, preenchido: false, raio: 4, rotulo: 'Data da consulta' }),
        elementoAula02(8, 'retangulo', { x: 0, y: -25, largura: 320, altura: 150 },
            { cor: COR_CLARO_02, preenchido: true, raio: 0,
                rotulo: 'Termos de uso e aviso legal' }),
        elementoAula02(9, 'retangulo', { x: 0, y: -145, largura: 300, altura: 56 },
            { cor: COR_AZUL_02, preenchido: true, raio: 0, rotulo: 'Cancelar' }),
        elementoAula02(10, 'retangulo', { x: 140, y: -230, largura: 20, altura: 20 },
            { cor: COR_CLARO_02, preenchido: true, raio: 0, rotulo: 'OK' }),
        elementoAula02(11, 'retangulo', { x: 0, y: -300, largura: 360, altura: 40 },
            { cor: COR_CLARO_02, preenchido: true, raio: 0, rotulo: 'Contato · Ajuda' })
    ];
}

registrarDinamica3d('02', {
    tela: montarTelaAula02(),
    instrucoes: {
        raiox: 'Você, como aluno consultor, recebeu esta tela de agendamento: os usuários não '
            + 'acham o botão de confirmar. Escolha a forma e arraste sobre a tela para marcar '
            + 'cada retângulo, círculo e triângulo que você encontrar.',
        redesenho: 'Agora redesenhe a tela: toque em um elemento para selecioná-lo, arraste para '
            + 'mover e use os botões para mudar tamanho, cor, sólido ou contorno e cantos. '
            + 'Deixe só um botão principal em destaque e os blocos alinhados.',
        ficha: 'Preencha a ficha explicando o que você viu e o que mudou, confira o checklist e '
            + 'entregue. Depois de entregue, a atividade não pode mais ser alterada.'
    },
    ficha: [
        { id: 'formato', rotulo: 'Formato escolhido e integrantes',
            dica: 'Individual, em dupla, em grupo ou turma toda. Quem fez com você?' },
        { id: 'formas', rotulo: 'Formas geométricas encontradas na tela original',
            dica: 'Onde você viu retângulos, círculos e triângulos?' },
        { id: 'problemas', rotulo: 'Problemas de hierarquia, proporção ou alinhamento',
            dica: 'O que atrapalha o usuário a achar o botão de confirmar?' },
        { id: 'mudancas', rotulo: 'Mudanças feitas no redesenho e o motivo de cada uma',
            dica: 'Ex.: aumentei o botão porque a área de toque era pequena.' }
    ],
    checklist: [
        'Clareza de contêineres: cada assunto tem seu próprio bloco delimitado?',
        'Destaque unívoco: existe apenas um botão sólido principal por seção?',
        'Ergonomia geométrica: as áreas de toque respeitam o tamanho dos dedos (44 x 44)?'
    ]
});
