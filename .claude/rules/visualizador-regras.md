# 👁️ Visualizador de regras e tarefas (`.claude/rules/index.html`)

## O que é

- `.claude/rules/index.html` é **só um visualizador** para o professor ler as regras e o quadro de
  tarefas em cards (aba **REGRAS**, por categoria e tipo; aba **TASKS**, com status, frentes e
  "Aguardando o usuário").
- ⛔ **Não é página do projeto:** não recebe header, login nem dados do banco, e nenhuma página o
  usa como componente. O único acesso pelo site é o item **Regras** do menu do Professor
  Administrador (`js/header-usuario.js`), que o abre em **nova aba**.
- ⛔ **Não editar à mão:** o arquivo é gerado e qualquer edição se perde na próxima geração.

## Atualizar SEMPRE junto

Toda vez que mudar **qualquer arquivo de `.claude/rules/`** ou o **quadro** (`tasks/STATUS.md`,
`tasks/TASKS.md`, `tasks/etapas/`), regenerar e commitar o `index.html` **no mesmo commit**:

```bash
python scripts/regras/gerar_visualizador_regras.py
git add .claude/rules/index.html
```

O topo da página mostra a data e hora da geração. Se ela for mais antiga que o último commit nas
regras, o visualizador está desatualizado.

## Como funciona

| Parte | Onde |
|-------|------|
| Gerador | `scripts/regras/gerar_visualizador_regras.py` |
| Leitura das regras (seções `##`, categoria pelo `INDEX.md`, tipo) | `scripts/regras/visualizador/leitor_regras.py` |
| Leitura do quadro (tabela "📌 Tarefas", `TASKS.md`, etapas citadas) | `scripts/regras/visualizador/leitor_tarefas.py` |
| Página (HTML, CSS e JS que o gerador junta num arquivo só) | `scripts/regras/visualizador/` |

- O conteúdo vai **embutido** no HTML: a página abre também por duplo clique, sem servidor.
- **Categoria** = grupo do arquivo no `INDEX.md` (arquivo novo de regra: listar lá para aparecer
  na categoria certa). **Tipo** = Proibição, Fluxo, Referência ou Obrigatória, pelo título da
  seção.
- O limite de 5 KB vale para as regras `.md`; o `index.html` gerado não entra nessa conta.
