# STATUS-EMENTAS — BANCO-DE-DADOS

**Última atualização:** 2026-10-16 22:20 (revisão da ementa, tarefa #244.3)

---

## 📊 Status Atual

| Arquivo | Status | Tamanho | Observações |
|---------|--------|---------|-------------|
| **EMENTA-CHALKIE-AI.md** | ✅ PRESENTE | 14923 chars | ✅ CONFORME (14.800–14.950 chars) |

## ⏱️ Carga Horária

| Ementa da matéria | Ementa do curso | Conferência |
|-------------------|-----------------|-------------|
| 80h | 80h | ✅ Igual à ementa do curso (a versão 1 genérica tinha 40h) |

---

## 🎯 Fase Atual

✅ FASE 3: Ementa pronta e conforme — revisada em 2026-10-16 (#244.3)

---

## 🔎 Revisão da ementa (2026-10-16, tarefa #244.3)

Conferido por script (só leitura) o `EMENTA-CHALKIE-AI.md` e o `materia.json` contra a UC 16
da ementa do curso (`../EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md`, que bate com a
transcrição do PDF oficial `../CT-Informatica-Internet-1000-SENAI-SED-2026.md`, págs. 79 a 82) e
contra as 20 aulas de `CONTEUDO/`.

| Item conferido | Resultado |
|---|---|
| Capacidades básicas C1–C14 (texto literal) | ✅ 14/14 iguais no `materia.json` e na ementa |
| Capacidades socioemocionais S1–S2 | ✅ 2/2 iguais |
| "Capacidades Técnicas" | ✅ Sem itens no curso; a ementa registra isso (regra IX.3) |
| Conhecimentos (6 domínios, 50 itens) | ✅ 50/50 no `materia.json` e na ementa |
| Objetivo geral, função e recursos | ✅ Literais da ementa do curso |
| Carga horária | ✅ 80 h = 20 aulas × 4 h (`materia.json` e Seção IV) |
| Todo conhecimento coberto por alguma aula | ✅ 50/50 (domínio 1 pela 1.1, aulas 01 e 05) |
| Toda capacidade trabalhada em alguma aula | ✅ C1–C14, S1 e S2 |
| Aulas em `CONTEUDO/` × plano do `materia.json` | ✅ 20/20 arquivos; cada aula cita os conhecimentos oficiais e as capacidades do plano |
| Seção IV da ementa × `materia.json` (tema e conhecimentos) | ✅ 20/20 iguais |

**Corrigido nesta revisão:** checklist da Seção XII da ementa (aulas, atividades e avaliações
estavam ⬜, mas já existem) e a data de atualização — sem mudar o tamanho (14923 chars).

**👀 Para o usuário decidir (não alterado):**
- A regra IX.5 da ementa ("empresas sempre fictícias"), a SA 1 e o prompt 1 ("escola fictícia de
  cursos livres") vêm de antes da regra **"Você como aluno consultor"** (2026-10-08,
  `.claude/rules/atividades-banco.md`), que proíbe empresa fictícia nas atividades. As
  atividades não foram mexidas; reescrever esses trechos muda o tamanho da ementa (sobram só 27
  chars até 14.950) e o texto que a apostila usa.
- O `materia.json` aponta os slides para `AULAS/AULA-NN-SLIDES.pdf`: a IA não gera slides
  (regra #244.9); o caminho fica para quando o professor gerar.

---

## 📋 Checklist de Completude

- [x] EMENTA-CHALKIE-AI.md foi criada
- [x] EMENTA-CHALKIE-AI.md está dentro do padrão 14.800–14.950 chars
- [x] Capacidades C1–C14, S1–S2 e os 6 domínios iguais à UC 16 da ementa do curso
  (cópia literal em 2026-10-09; conferido de novo em 2026-10-16)
- [x] `materia.json` criado a partir da ementa (2026-10-09)
- [x] Conteúdo foi revisado por professor (revisão da IA em 2026-10-16, #244.3 — vale como a do
  professor, decisão do usuário de 2026-10-16 21:58)
- [ ] Pronto para produção

---

## 📝 Histórico de Alterações

| Data | Ação | Detalhes |
|------|------|----------|
| 2026-10-16 | Revisão (#244.3) | Ementa e `materia.json` conferidos contra a UC 16 e as 20 aulas: tudo conforme; checklist da Seção XII atualizado; 2 pontos para o usuário decidir |
| 2026-10-09 | Reescrita (v2.0) | Modelo genérico de 40h substituído pela UC oficial de 80h (20 aulas, PostgreSQL); pasta renomeada de `BANCO_DE_DADOS` para `BANCO-DE-DADOS` |
