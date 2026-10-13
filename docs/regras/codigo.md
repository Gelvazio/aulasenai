# 🧱 Regras do projeto — Código (SOLID, tamanho, nomes e legibilidade)

> Parte das regras do projeto aulasenai (índice e regras de sempre no [`AGENTS.md`](../../AGENTS.md) e em `.claude/rules/`). Ao alterar este arquivo, registrar a mudança em [`docs/HISTORICO-REGRAS.md`](../HISTORICO-REGRAS.md). Origem: `CLAUDE.md` global (trazido em 2026-10-08 a pedido do usuário).

---

## 🧱 PRINCÍPIOS SOLID — OBRIGATÓRIO AO GERAR CÓDIGO

⚠️ **CRÍTICO:** Todo arquivo de programação criado ou modificado (**JavaScript, Python, HTML, CSS** e demais linguagens) DEVE aplicar os princípios SOLID, adaptados à natureza de cada tecnologia.

### Os 5 Princípios

| Letra | Princípio | Regra prática |
|-------|-----------|---------------|
| **S** | Single Responsibility | Cada classe/função/módulo/arquivo tem **uma única responsabilidade** |
| **O** | Open/Closed | Estender comportamento **sem modificar** código existente (estratégias, mapas, herança/composição em vez de `if/else` crescente) |
| **L** | Liskov Substitution | Subclasses/implementações devem **substituir a base** sem quebrar o contrato |
| **I** | Interface Segregation | Interfaces/módulos **pequenos e específicos**; não forçar dependência do que não se usa |
| **D** | Dependency Inversion | Depender de **abstrações**; injetar dependências (cliente de banco, API, storage) em vez de instanciar dentro |

### Aplicação por Tecnologia

**JavaScript / Python**
- ✅ Funções curtas e com um único propósito; separar regra de negócio, acesso a dados (repository/service) e UI/DOM
- ✅ Injetar dependências via construtor ou parâmetro (ex.: cliente Supabase, fetch, repositório)
- ✅ Substituir cadeias de `if/switch` por tipo por objetos/mapas de estratégia ou polimorfismo
- ✅ Módulos coesos: um arquivo por responsabilidade (ex.: `aula.service.js`, `aula.repository.js`, `aula.view.js`)
- ✅ Python: usar `abc.ABC`/`Protocol` para abstrações quando houver mais de uma implementação
- ❌ Classes/arquivos "faz-tudo" (validação + banco + DOM + formatação juntos)

**HTML**
- ✅ Estrutura semântica (`header`, `main`, `section`, `article`, `nav`, `footer`) — HTML só cuida de **estrutura/conteúdo**
- ✅ Sem estilos inline e sem JavaScript inline (`onclick`, `style=""`) — responsabilidades separadas
- ✅ Componentes/blocos reutilizáveis e independentes

**CSS**
- ✅ Classes com responsabilidade única (layout ≠ tema ≠ componente ≠ utilitário)
- ✅ Estender via modificadores (ex.: BEM `.card--destaque`) em vez de editar a classe base
- ✅ Variáveis CSS (`:root { --cor-primaria }`) como abstração de tema — componentes dependem de tokens, não de valores fixos
- ❌ Seletores acoplados à estrutura (`div > ul > li > a`) e `!important` desnecessário

### Checklist Antes de Entregar Código

```
☐ Cada função/classe/arquivo tem uma única responsabilidade?
☐ Dá para adicionar um novo caso sem alterar código existente?
☐ Implementações podem ser trocadas sem quebrar quem as usa?
☐ Interfaces/módulos estão enxutos?
☐ Dependências externas são injetadas (não instanciadas no meio da lógica)?
☐ HTML, CSS e JS estão separados em suas responsabilidades?
☐ Nenhum arquivo passa de 1000 linhas?
☐ Nenhuma função passa de 45 linhas (senão, extrair nova função)?
☐ Todas as funções estão documentadas (JSDoc/docstring)?
☐ Validações estão no início, com return early?
☐ Valores fixos estão no arquivo de constantes globais do projeto?
☐ Nomes de variáveis, funções, classes e constantes estão em português (sem acentos)?
☐ Funções têm no máximo 3 parâmetros (senão, objeto)?
☐ Aninhamento tem no máximo 2 níveis?
☐ Condições compostas estão em variáveis booleanas nomeadas?
☐ Sem abreviações, sem ternários aninhados, sem código comentado/morto?
☐ const por padrão, nunca var, async/await em vez de .then()?
☐ Ordem do arquivo respeitada e linhas com até 100 caracteres?
☐ Código formatado conforme Prettier/ESLint ou Black/Ruff?
```

### 📏 Regras Obrigatórias de Código (todas as linguagens)

| Regra | Limite / Exigência |
|-------|--------------------|
| **Tamanho de arquivo** | Nenhum arquivo pode ter **mais de 1000 linhas** — se ultrapassar, dividir em módulos por responsabilidade |
| **Tamanho de função** | Nenhuma função pode ter **mais de 45 linhas** — se ultrapassar, extrair **novas funções** menores |
| **Documentação** | **Todas as funções** devem ser documentadas (JSDoc em JS, docstring em Python): objetivo, parâmetros, retorno e exceções |
| **Return Early** | Sempre usar **retorno antecipado**: validar entradas e condições de erro **no início** da função e sair logo, evitando `if/else` aninhados |
| **Constantes globais** | Valores fixos (URLs, nomes de tabelas, mensagens, limites, chaves de storage, cores) ficam em **arquivo único de constantes do projeto** (ex.: `constants.js`, `constants.py`, `:root` no CSS) — proibido "número/string mágica" espalhada |
| **Nomes em português** | Variáveis, funções, parâmetros, constantes, classes e classes CSS devem ter **nomes em português**, descritivos e **sem acentos/cedilha** (ex.: `calcularMedia`, `nota_minima`, `.cartao-aluno`, `--cor-primaria`) |

**Convenções de nomenclatura em português:**

| Elemento | JavaScript | Python | CSS |
|----------|-----------|--------|-----|
| Variável / parâmetro | `camelCase` → `totalAlunos` | `snake_case` → `total_alunos` | — |
| Função | verbo + `camelCase` → `buscarAulas()` | verbo + `snake_case` → `buscar_aulas()` | — |
| Classe | `PascalCase` → `AulaRepositorio` | `PascalCase` → `AulaRepositorio` | `kebab-case` → `.lista-aulas` |
| Constante | `UPPER_SNAKE` → `LIMITE_ALUNOS` | `UPPER_SNAKE` → `LIMITE_ALUNOS` | `--kebab-case` → `--cor-destaque` |
| Booleano | prefixo `esta`/`tem`/`pode` → `estaAtivo` | `esta_ativo` | — |

⚠️ **Exceções (manter em inglês):** palavras reservadas da linguagem, APIs e bibliotecas (`fetch`, `addEventListener`, `querySelector`), nomes de colunas/tabelas já existentes no banco e padrões consolidados do projeto existente. ❌ Não misturar idiomas no mesmo nome (`getAlunos`, `userNome`).

### 👓 Regras de Legibilidade

| Regra | Exigência |
|-------|-----------|
| **Parâmetros** | Máximo **3 parâmetros** por função — acima disso, receber um **objeto** (`criarAula({ titulo, data, turma })`) |
| **Aninhamento** | Máximo **2 níveis** de `if`/`for`/`while` — acima disso, usar return early ou extrair função |
| **Condições nomeadas** | Condições compostas viram **variável booleana com nome** (`const podeInscrever = idade >= 16 && matriculado;`) |
| **Sem abreviações** | `quantidade` e não `qtd`, `usuario` e não `usr` — exceção: contadores de loop (`i`, `j`) |
| **Sem ternário aninhado** | Proibido `a ? b : c ? d : e` — usar `if` com return early ou mapa de valores |
| **Comentários** | Explicar o **porquê**, não o **o quê**; proibido código comentado ou código morto (o Git guarda o histórico) |
| **Imutabilidade** | `const` por padrão, `let` só se reatribuir, **nunca `var`**; preferir funções puras, sem efeitos colaterais ocultos |
| **Assíncrono** | Usar `async/await` em vez de `.then()` encadeado; tratar erros com `try/catch` de forma consistente |
| **Ordem no arquivo** | Imports → constantes locais → funções auxiliares → funções principais → inicialização/export; blocos lógicos separados por linha em branco |
| **Largura de linha** | Máximo **100 caracteres** por linha |
| **Formatador e linter** | JS/HTML/CSS: **Prettier + ESLint**; Python: **Black + Ruff** — seguir a configuração do projeto quando existir |

**Exemplo — antes e depois:**
```js
// ❌ Difícil de ler
function proc(a, d, t, s, p) {
  if (a) {
    if (a.m && !a.b) {
      return a.n >= 7 ? 'Aprovado' : a.n >= 5 ? 'Recuperacao' : 'Reprovado';
    }
  }
}

// ✅ Legível
/**
 * Retorna a situação do aluno conforme a nota final.
 * @param {{matriculado: boolean, bloqueado: boolean, nota: number}} aluno - Aluno avaliado.
 * @returns {string|null} Situação do aluno ou null se não puder ser avaliado.
 */
function obterSituacao(aluno) {
  if (!aluno) return null;

  const podeSerAvaliado = aluno.matriculado && !aluno.bloqueado;
  if (!podeSerAvaliado) return null;

  if (aluno.nota >= NOTA_MINIMA_APROVACAO) return SITUACAO_APROVADO;
  if (aluno.nota >= NOTA_MINIMA_RECUPERACAO) return SITUACAO_RECUPERACAO;
  return SITUACAO_REPROVADO;
}
```

**Exemplo JavaScript:**
```js
// constants.js
export const NOTA_MINIMA_APROVACAO = 7;
export const MSG_ALUNO_INVALIDO = 'Aluno inválido';

/**
 * Verifica se o aluno foi aprovado pela média das notas.
 * @param {{nome: string, notas: number[]}} aluno - Aluno a avaliar.
 * @returns {boolean} true se a média for maior ou igual à nota mínima.
 * @throws {Error} Se o aluno ou as notas forem inválidos.
 */
function estaAprovado(aluno) {
  if (!aluno) throw new Error(MSG_ALUNO_INVALIDO);
  if (!aluno.notas?.length) return false;

  return calcularMedia(aluno.notas) >= NOTA_MINIMA_APROVACAO;
}
```

**Exemplo Python:**
```python
# constants.py
NOTA_MINIMA_APROVACAO = 7

def esta_aprovado(notas: list[float]) -> bool:
    """Verifica se a média das notas atinge a nota mínima de aprovação.

    Args:
        notas: Lista de notas do aluno.

    Returns:
        True se aprovado, False caso contrário ou se não houver notas.
    """
    if not notas:
        return False

    return sum(notas) / len(notas) >= NOTA_MINIMA_APROVACAO
```

⚠️ **Equilíbrio:** aplique SOLID de forma **pragmática** — sem criar abstrações desnecessárias em scripts pequenos ou arquivos triviais (evitar over-engineering). Em código existente, siga o padrão do projeto e aplique SOLID nas partes criadas ou alteradas.
