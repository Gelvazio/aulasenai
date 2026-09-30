# Botão ATIVIDADES nos cards de bloco do dashboard

**Objetivo:** Adicionar em cada um dos 10 cards de bloco de `dashboard-itic.html` um botão "ATIVIDADES" que abre, em nova aba, a atividade do respectivo bloco na pasta `ATIVIDADES/`.

**Tech Stack:** HTML, CSS

**Criado em:** 2026-09-23 16:40
**Concluído em:** 2026-09-23 16:43
**Tempo decorrido:** 03:00

**Escopo pedido pelo usuário:** "em cada card de bloco adicione um botao de nome ATIVIDADES, que deve abrir a pasta ATIVIDADES, relacionado ao respectivo bloco numa nova aba"

---

## Mapeamento bloco → arquivo

| Bloco | Arquivo em `ATIVIDADES/` |
|---|---|
| 1 | `1-Comunicação-Profissional-e-Seus-Fundamentos.pdf` |
| 2 | `2-Hardware,-Periféricos-e-Sistemas-Operacionais.pdf` |
| 3 | `3-Navegação-na-Web-e-Pesquisa-Acadêmica.pdf` |
| 4 | `4-Comunicação-Digital-e-Colaboração-em-Nuvem.pdf` |
| 5 | `5-Segurança-da-Informação-e-Proteção-de-Dados.pdf` |
| 6 | `6-Editor-de-Textos-Formatação-e-Estruturação.pdf` |
| 7 | `7-Textos-Técnicos-e-Redação-Empresarial.pdf` |
| 8 | `8-Editor-de-Planilhas-Organização-e-Fórmulas.pdf` |
| 9 | `9-Planilhas-Eletrônicas-Análise-Visual-e-Gráficos.pdf` |
| 10 | `10-Editor-de-Apresentações-e-TIC.pdf` |

Os PDFs são numerados pela aula (sequência dos slides). Os títulos dos blocos 3, 4, 9 e 10 do dashboard ainda seguem o plano de ensino em TXT e diferem do tema do PDF.

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | CSS `.btn-atividades` | ✅ Concluído | 2026-09-23 16:40 | 2026-09-23 16:42 | 02:00 |
| 2 | Inserir botão nos 10 cards | ✅ Concluído | 2026-09-23 16:42 | 2026-09-23 16:42 | 00:30 |
| 3 | Verificar links (10 botões, 10 arquivos existentes) | ✅ Concluído | 2026-09-23 16:42 | 2026-09-23 16:43 | 00:30 |
| 4 | Commit | ✅ Concluído | 2026-09-23 16:43 | 2026-09-23 16:43 | 00:10 |

---

### Passo 1: CSS

**Arquivo:** Modificar `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/dashboard-itic.html`

```css
.btn-atividades { display:inline-block; margin-top:15px; padding:8px 18px; background:#004384; color:#fff; border-radius:8px; font-weight:700; font-size:.85em; text-decoration:none; letter-spacing:.5px; }
.btn-atividades:hover { background:#0055b3; }
```

### Passo 2: Botão em cada card

```html
<a class="btn-atividades" href="ATIVIDADES/<arquivo-codificado>" target="_blank" rel="noopener">📂 ATIVIDADES</a>
```

### Passo 3: Verificação

```powershell
python -c "import re,urllib.parse,os;s=open('dashboard-itic.html',encoding='utf-8').read();l=re.findall(r'class=\"btn-atividades\" href=\"([^\"]+)\"',s);print(len(l),all(os.path.exists(urllib.parse.unquote(x)) for x in l))"
```

Esperado: `10 True`

### Passo 4: Commit

```powershell
git commit -m "feat(itic): botão ATIVIDADES em cada bloco do dashboard"
```
