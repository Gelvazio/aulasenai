# INDEX.HTML — Índice de Cursos em Cards

**Objetivo:** Transformar `INDEX.HTML` em uma página que contém **apenas** o índice de cursos em
cards, um card por pasta de `MATERIAIS/`, e registrar essa regra no `CLAUDE.md`.

**Tech Stack:** HTML5 + CSS3 (arquivo compartilhado em `assets/css/`)

**Criado em:** 2026-09-24
**Concluído em:** —
**Tempo decorrido:** —

---

## Escopo

- ✅ `INDEX.HTML` passa a ter só: cabeçalho curto + grade de cards de cursos.
- ❌ Sai tudo o que existe hoje: estatísticas, cards de disciplinas/ementas, FAQ, rodapé com
  status, botão de tema e `<style>`/`<script>` embutidos.
- ✅ 1 card por pasta de `MATERIAIS/` (exceto `MATERIAS-GERAIS/`, que hoje nem existe).
- ✅ Card: ícone, nome do curso legível, quantidade de matérias (subpastas, ignorando `.claude`,
  `docs`, `scripts`, `graphify-out`) e link para a pasta `MATERIAIS/<CURSO>/`.
- ✅ CSS novo em `assets/css/indice-cursos.css` (regra de `assets/`: sem `<style>`, sem `style=""`,
  sem JS).

## Cursos encontrados (16)

| # | Pasta | Matérias |
|---|-------|----------|
| 1 | ASSISTENTE-DE-OPERACOES-LOGISTICAS | 1 |
| 2 | Assistente-Processos-Gestao-Suporte-TI-860-HORAS | 0 |
| 3 | Assistente-Tecnico-Tecnologia-Informacao-860horas | 0 |
| 4 | AUTOMACAO-INDUSTRIAL-1200-HORAS | 1 |
| 5 | BACKEND-560-HORAS | 18 |
| 6 | GESTAO_E_CONTROLE_MATERIAIS | 1 |
| 7 | INFORMATICA | 0 |
| 8 | INTERNET-DAS-COISAS | 0 |
| 9 | MECATRONICA | 0 |
| 10 | OPERADOR-PRODUCAO-INDUSTRIAL | 1 |
| 11 | PROGRAMADOR-DE-SISTEMAS-860-HORAS | 0 |
| 12 | QUALIFICACAO-PROFISSIONAL | 3 |
| 13 | REDES-DE-COMPUTADORES | 0 |
| 14 | RIO_DO_SUL_MAIS_TECH | 8 |
| 15 | TECNICO-DESENVOLVIMENTO-SISTEMAS | 1 |
| 16 | TECNICO-INFORMATICA-INTERNET | 3 |

## Riscos

- Os links para ementas/atividades que estavam no `INDEX.HTML` deixam de existir nele (pedido do
  usuário: "deve ter apenas isso").
- Link para pasta abre a listagem de diretório do navegador (não há `index.html` nos cursos).
- Curso novo em `MATERIAIS/` exige adicionar o card à mão (regra registrada no `CLAUDE.md`).

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar `assets/css/indice-cursos.css` | ⬜ Pendente |
| 2 | Reescrever `INDEX.HTML` só com os 16 cards | ⬜ Pendente |
| 3 | Registrar a regra no `CLAUDE.md` (raiz) | ⬜ Pendente |
| 4 | Commit local (sem push) | ⬜ Pendente |

---

### Passo 1: CSS do índice

**Arquivo:** Criar `C:\fontes\aulas-senai\assets\css\indice-cursos.css`

**Ação:** Tokens em `:root`, tema escuro por `prefers-color-scheme`, grade responsiva de cards
(`.indice-cursos`, `.cartao-curso`, `.cartao-curso__nome`, `.cartao-curso__materias`).

**Verificação:** `Test-Path assets\css\indice-cursos.css` → `True`

### Passo 2: INDEX.HTML

**Arquivo:** Modificar `C:\fontes\aulas-senai\INDEX.HTML`

**Ação:** Substituir todo o conteúdo por `header` + `main` com 16 `<a class="cartao-curso">`,
referenciando `assets/css/indice-cursos.css`.

**Verificação:** `Select-String -Path INDEX.HTML -Pattern 'class="cartao-curso"' | Measure-Object`
→ 16; `Select-String -Path INDEX.HTML -Pattern '<style|<script|style="'` → nenhum resultado.

### Passo 3: Regra no CLAUDE.md

**Arquivo:** Modificar `C:\fontes\aulas-senai\CLAUDE.md`

**Ação:** Nova seção "🗂️ REGRA — INDEX.HTML É SÓ O ÍNDICE DE CURSOS": apenas cards de cursos,
1 card por pasta de `MATERIAIS/` (exceto `MATERIAS-GERAIS/`), nada além disso; ao criar/renomear/
remover curso, atualizar o card.

**Verificação:** `Select-String -Path CLAUDE.md -Pattern 'INDEX.HTML É SÓ'` → 1 resultado.

### Passo 4: Commit

`git add` dos 4 arquivos + `git commit` local. Sem push.
