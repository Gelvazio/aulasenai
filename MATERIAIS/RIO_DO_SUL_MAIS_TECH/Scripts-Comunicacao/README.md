# Comunicação Oral e Escrita — Material Didático

Material completo da unidade curricular **Introdução à Comunicação Oral e
Escrita**, do programa Rio do Sul Mais Tech (SENAI), para turmas de 8º e 9º anos.

Reúne os slides das aulas, as atividades práticas, os infográficos de apoio e os
formulários de avaliação automatizados no Google Forms.

---

## O que tem aqui

| Pasta / arquivo | Conteúdo |
|-----------------|----------|
| `FORMULARIO-PRINCIPAL.gs` | Script do Google Apps Script: gera os 26 formulários de avaliação e analisa as respostas |
| `VERSAO-POWERPOINT/` | Conteúdo das 25 aulas em Markdown, extraído dos slides |
| `ATIVIDADES/` | Atividades práticas por módulo, em HTML |
| `ATIVIDADES/INFOGRAFICOS/` | Um infográfico por aula, em HTML independente |
| `EMENTA-CHALKIE-AI.md` | Ementa da disciplina: objetivos, módulos, sequência e critérios |
| `docs/` | Documentação técnica e relatórios de verificação |

---

## Os formulários

`FORMULARIO-PRINCIPAL.gs` roda no [Google Apps Script](https://script.google.com)
e cria as avaliações direto no Google Forms.

- **25 avaliações** de aula, com 20 questões cada
- **1 revisão integrada** das aulas 1 a 9, com 30 questões
- **530 questões** no total, geradas a partir do conteúdo real das aulas
- Correção e pontuação automáticas (`setIsQuiz`)
- Validação por código de acesso individual, de uso único

As alternativas erradas de cada questão são definições de **outros conceitos da
mesma aula** — não frases genéricas de descarte. Acertar exige distinguir a
matéria, não eliminar o absurdo.

### Como usar

1. Crie um projeto novo em [script.google.com](https://script.google.com)
2. Cole o conteúdo de `FORMULARIO-PRINCIPAL.gs`
3. Execute a função da aula desejada, por exemplo `criarFormularioAula01()`
4. Autorize o acesso ao Google Forms quando solicitado

Para analisar as respostas, execute a função `analisarRespostasAulaNN()`
correspondente.

---

## Estrutura do curso

| Módulo | Aulas | Foco |
|--------|-------|------|
| 1 — Fundamentos | 1–5 | Elementos da comunicação, eficácia, feedback e registro |
| 2 — Comunicação Oral | 6–9 | Apresentações, oratória, reuniões e atendimento |
| 3 — Comunicação Escrita | 10–18 | Textos profissionais, gramática, documentos e e-mails |
| 4 — Segurança e Profissionalismo | 19–21 | Segurança da informação, etiqueta digital e colaboração |
| 5 — Comunicação Não-Verbal | 22–23 | Linguagem corporal, gestos e tom de voz |
| 6 — Integração | 24–25 | Projeto capstone e avaliação final |

---

## Desenvolvimento

O arquivo `.gs` tem cerca de 9 mil linhas e é mantido por scripts de
transformação, nunca por edição manual linha a linha. As regras do projeto, o
padrão obrigatório das questões e os comandos de validação estão em
[`CLAUDE.md`](CLAUDE.md).

Antes de qualquer commit que altere o `.gs`:

```bash
cp FORMULARIO-PRINCIPAL.gs /tmp/check.js && node --check /tmp/check.js
```

---

## Licença

[MIT](LICENSE) — Gelvazio Camargo, 2026.


## Formularios de perguntas
APOSTILAS
https://bit.ly/ceplas


#Formulario revisão 

Informação	🔗 LINK PARA COMPARTILHAR COM ALUNOS:
09:41:27	Informação	https://docs.google.com/forms/d/e/1FAIpQLSeEpvP5_oBbBIEfaB76PO0duS7jxER8q7sG5H9plOaGgY8ffw/viewform
09:41:27	Informação	
09:41:27	Informação	✏️ LINK PARA EDITAR (PROFESSOR):
09:41:27	Informação	https://docs.google.com/forms/d/12-jamPBbO-ES-URyD400Em32AzlY0N4hUs4iasZbjsw/edit

#RECUPERACAO DA REVISAO 
🔗 LINK PARA COMPARTILHAR COM ALUNOS:
10:40:27	Informação	https://docs.google.com/forms/d/e/1FAIpQLSelZ6QfvyQFkKjxCArH8dK5Rzizt3e_R-2a_sZ3W4yPu4sklQ/viewform
10:40:27	Informação	
10:40:27	Informação	✏️ LINK PARA EDITAR (PROFESSOR):
10:40:27	Informação	https://docs.google.com/forms/d/1FnT_rfBz4pdXR0hifm-M7FvvWhKWBXdmkoyEfQbXoys/edit



# Formulario Aula 09 - Comunicacao Ativa
Informação	🔗 LINK PARA COMPARTILHAR COM ALUNOS:
09:29:44	Informação	https://docs.google.com/forms/d/e/1FAIpQLSeBMtaw4Sjpu0gms-LlLixhpf7IvE_km2bu7itHxkRMpsxGzA/viewform

09:29:44	Informação	✏️ LINK PARA EDITAR (PROFESSOR):
09:29:44	Informação	https://docs.google.com/forms/d/1zyOWu9Ii4uZuIpFAQqySMxvR6z5rKDIThBBk3Qqtsqw/edit


# Formulario Aula 10 - Preparação Entrevista

