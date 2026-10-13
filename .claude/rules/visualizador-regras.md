# 👁️ Visualizador de regras e tarefas (`.claude/rules/index.html`)

## O que é

- `.claude/rules/index.html` é **só um visualizador** para o professor ler as regras e o quadro de
  tarefas em cards (aba **REGRAS**, por categoria e tipo; aba **TASKS**, com status, frentes e
  "Aguardando o usuário"). A aba TASKS substitui a antiga página `tasks.html` (desativada em
  2026-10-13, junto com a fila `tasks` do banco).
- ⛔ **Não é página do projeto:** não recebe header, login nem dados do banco, e nenhuma página o
  usa como componente. O único acesso pelo site é o item **Regras** do menu do Professor
  Administrador (`js/header-usuario.js`), que o abre em **nova aba**.
- ⛔ **Não editar à mão:** o arquivo é gerado e qualquer edição se perde na próxima geração.

## Quando regenerar

Regenerar e commitar o `index.html` **no mesmo commit** quando:
- mudar **qualquer arquivo de `.claude/rules/`** (inclusive `tasks/`);
- **encerrar uma tarefa** (o quadro mudou).

Não regenerar na reserva nem a cada item: com várias frentes, todas mexeriam no mesmo arquivo
gerado e o `pull --rebase` daria conflito a toda hora. Conflito no `index.html` → regenerar depois
do rebase (nunca resolver à mão).

```bash
python scripts/regras/gerar_visualizador_regras.py
git add .claude/rules/index.html
```

O topo da página mostra a data e hora da geração (a aba TASKS pode estar atrás do quadro entre
uma entrega e outra; a fonte é sempre o `tasks/STATUS.md`).

## Como funciona

| Parte | Onde |
|-------|------|
| Gerador | `scripts/regras/gerar_visualizador_regras.py` |
| Leitura das regras (`*.md` e `tasks/*.md`; seções `##`, categoria pelo `INDEX.md`, tipo) | `scripts/regras/visualizador/leitor_regras.py` |
| Leitura do quadro (frentes e "📌 Tarefas" do `STATUS.md`, etapa de cada tarefa; "Aguardando o usuário" = itens 👀 das etapas) | `scripts/regras/visualizador/leitor_tarefas.py` |
| Página (HTML, CSS e JS que o gerador junta num arquivo só) | `scripts/regras/visualizador/` |

- O conteúdo vai **embutido** no HTML: a página abre também por duplo clique, sem servidor.
- **Categoria** = grupo do arquivo no `INDEX.md` (arquivo novo de regra: listar lá para aparecer
  na categoria certa). **Tipo** = Proibição, Fluxo, Referência ou Obrigatória, pelo título da
  seção.
- O limite de 5 KB vale para as regras `.md`; o `index.html` gerado não entra nessa conta.
