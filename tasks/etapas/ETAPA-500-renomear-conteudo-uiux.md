## Etapa 500-xxxxxx — Renomear e reformatar conteúdo das 19 aulas de Fundamentos de UI/UX

**Tarefa:** #500 · **Pedido em:** 2026-10-24 · **Criada por:** Devin (local · main)
**Pedido:** "VEJA O QUE ESTA PENDENTE NA TAREFA 276 E FAÇA"
**Objetivo:** renomear os 20 arquivos de Markdown existentes em `CONTEUDO/` para o padrão `AULA-NN-DESCRICAO-CURTA.md` e reformatar para incluir as 10 partes obrigatórias, permitindo que as subtarefas de atividades da #276 prossigam.

### Escopo

**Entra:**
- 20 arquivos Markdown em `MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO/` (1 a 20)
- Renomear para o padrão `AULA-NN-DESCRICAO-CURTA.md` (sem acentos, com hífen, dois dígitos)
- Reformatar para incluir as 10 partes obrigatórias da regra `docs/regras/materias.md` §3
- Commit + push após cada renomeamento/reformatação (1 commit por arquivo)
- Atualizar o quadro com o status

**Não entra:**
- Modificar o conteúdo dos slides (apenas formatação)
- Criar novo conteúdo (apenas renomear e formatar o existente)
- Editar as subtarefas da #276

### Padrão de nomenclatura

**De:** `1-Fundamentos-e-Evolução-Histórica-do-Design.md`
**Para:** `AULA-01-PRINCIPIOS-DE-DESIGN-DEFINICAO-E-EVOLUCAO-HISTORICA.md`

Regras:
- Prefixo `AULA-`
- Número com dois dígitos (`01`, `02`...)
- Descrição em MAIÚSCULAS
- Sem acentos (acentos removidos: "é" → "E", "á" → "A", etc)
- Com hífen em vez de espaço

### 10 partes obrigatórias (docs/regras/materias.md §3)

1. Título `# Aula NN — Tema` e cabeçalho (matéria · curso, carga horária, conhecimentos, capacidades, estratégias, link da prática)
2. Indicadores (número e texto, da ementa)
3. Objetivos
4. Roteiro da aula (tabela momento × tempo × o que acontece, somando 240 min em 4 h)
5. Conteúdo (seções numeradas, com exemplos, tabelas e código quando a matéria pede)
6. Exercícios em sala (perguntas de fixação)
7. Leitura complementar
8. Referências
9. Glossário
10. Anexos (quando houver)

### Lista de arquivos a renomear

| De | Para |
|---|---|
| `1-Fundamentos-e-Evolução-Histórica-do-Design.md` | `AULA-01-PRINCIPIOS-DE-DESIGN-DEFINICAO-E-EVOLUCAO-HISTORICA.md` |
| `2-Formas-Geométricas-em-UI.md` | `AULA-02-FORMAS-GEOMETRICAS-REGRAS-DE-VISUALIZACAO.md` |
| `3-Teoria-das-Cores-e-Contraste.md` | `AULA-03-TEORIA-DAS-CORES-NA-INTERFACE.md` |
| `4-Resolução-de-Problemas-Análise-Crítica.md` | `AULA-04-RESOLUCAO-DE-PROBLEMAS-ANALISE-CRITICA.md` |
| `5-Resolução-de-Problemas-Análise-de-Cenários.md` | `AULA-05-RESOLUCAO-DE-PROBLEMAS-ANALISE-DE-CENARIOS.md` |
| `6-User-Interface-Definição-e-Tipos.md` | `AULA-06-USER-INTERFACE-DEFINICAO-E-TIPOS-DE-INTERFACE.md` |
| `7-Layout-de-Interfaces-Padrões-de-Leitura-e-Alinhamento.md` | `AULA-07-LAYOUT-PADROES-DE-LEITURA-F-E-Z-E-ALINHAMENTO.md` |
| `8-Elementos-Visuais-de-Layout.md` | `AULA-08-LAYOUT-TAMANHO-ESPACAMENTO-TEXTURAS-FONTES.md` |
| `9-Dinâmica-da-Interface-Eventos-e-Navegação.md` | `AULA-09-EVENTOS-E-NAVEGACAO-NA-INTERFACE.md` |
| `10-User-Experience-(UX).md` | `AULA-10-USER-EXPERIENCE-DEFINICAO-DESIGN-CENTRADO-USUARIO.md` |
| `11-Design-Interativo.md` | `AULA-11-PROCESSO-DE-DESIGN-INTERATIVO.md` |
| `12-Jornada-do-Usuário-e-Pesquisa.md` | `AULA-12-JORNADA-DO-USUARIO-OBJETIVOS-PUBLICO-ALVO-PESQUISA.md` |
| `13-Usabilidade-Interfaces-Amigáveis-e-Intuitividade.md` | `AULA-13-USABILIDADE-FRIENDLY-E-INTUITIVIDADE.md` |
| `14-Estratégias-de-Coleta.md` | `AULA-14-ESTRATEGIAS-DE-COLETA-INFORMACOES-DETERMINACAO-APLICACAO.md` |
| `15-Coleta-de-Feedbacks-e-Resolução-de-Conflitos.md` | `AULA-15-COLETA-DE-FEEDBACKS-E-RESOLUCAO-DE-CONFLITOS.md` |
| `16-Determinação-de-Escopo-do-Projeto-de-Interface.md` | `AULA-16-DETERMINACAO-DE-ESCOPO-DO-PROJETO-DE-INTERFACE.md` |
| `17-Prototipagem-Storyboard-e-Protótipos-de-Papel.md` | `AULA-17-PROTOTIPAGEM-STORYBOARD-E-PROTOTIPOS-DE-PAPEL.md` |
| `18-Mock-Ups-Digitais-e-Criação.md` | `AULA-18-MOCK-UPS-DIGITAIS-E-PROCESSO-DE-CRIACAO.md` |
| `19-Direito-Autoral-e-Propriedade-Intelectual-no-Design.md` | `AULA-19-DIREITO-AUTORAL-DEFINICAO-ANTERIORIDADE-CREATIVE-COMMONS.md` |
| `20-Integração-Final-Avaliação-e-Apresentação.md` (extra - usar se necessário) | (mantém como extra) |

### Plano de execução

1. Ler cada arquivo atual
2. Renomear para o padrão correto
3. Reformatar para incluir as 10 partes (se faltar)
4. Commit + push (1 commit por arquivo)
5. Registrar no quadro

### Critério de pronto

Todos os 19 arquivos (1 a 19) renomeados e reformatados para o padrão; cada commit com push na main; quadro atualizado; as subtarefas de conteúdo da #276 (#276.1, 9, 17, etc) podem ser marcadas como ✅ CONCLUÍDAS e as atividades (#276.2, 3, etc) podem ser pegas.
