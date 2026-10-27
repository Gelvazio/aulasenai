## Etapa 560-7c3d9a21 — #413: Enunciado da Atividade Dinâmica exportável em PDF

**Tarefa:** #413-7c3d9a21 · **Pedido em:** 2026-10-27 15:04 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "NESTA ATIVIDADE DINAMICA (FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADE-DINAMICA-AULA-02.html), FICOU FALTANDO O ENUNCIADO PRA SER EXPORTADO EM PDF"
**Objetivo:** a página da Atividade Dinâmica (modo digital-3d) ter um botão que exporta o enunciado (informações, contexto, objetivo, formatos, passos, ficha e checklist) em PDF, sem a nota nem o roteiro do professor.

### Escopo

- **Entra:** novo módulo `assets/js/dinamica-3d-pdf-enunciado.js` (jsPDF, cabeçalho SENAI no mesmo padrão do `pdf-minhas-respostas.js`) e o botão no card "Sobre a dinâmica"; script incluído no template 3D e na página da Aula 02.
- **Não entra:** banco, critérios de nota e roteiro do professor (ficam fora do PDF), outras matérias, modo digital sem 3D.

### Critério de pronto

- `node --check` ok; funções ≤ 45 linhas.
- Lendo o código: o PDF usa só o texto já visível ao aluno na página e os dados da Aula (`obterDinamica3d`).
- O download só o usuário confirma na tela (sem navegador).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo classificados pelo Jev, não escritos pela IA.
- Pequena (arquivos de front, sem banco nem segurança): sem aprovação prévia.

---

### #413.1 — Módulo e botão de exportar o enunciado em PDF

**Próximo passo:** rodar o Jev, reservar, criar o módulo e ligar na página e no template.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** gerar o PDF do enunciado a partir do DOM da página (cards INFORMAÇÕES e FORMATOS) e dos dados da aula (instruções das 3 etapas, ficha e checklist).
- **Critérios de Aceitação:** botão visível para aluno e professor; PDF sem nota/roteiro do professor.
- **Entrega:** — · **Verificação:** —
