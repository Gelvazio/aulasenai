# Geradores de Slides SENAI — Documentação Técnica

## Visão Geral

A skill `padrao-slides-senai` fornece 3 geradores Python prontos para criar apresentações PowerPoint com padrão visual SENAI.

---

## 📋 Geradores Disponíveis

### 1. Gerador Simples (Fundo Branco)

**Arquivo:** `gerar_slides_simples.py`

**Características:**
- Fundo branco limpo
- Título em azul SENAI (#008AD1) — 40pt bold
- Linha separadora azul
- Conteúdo em cinza escuro — 16pt
- Fonte: Century Gothic 100%

**Uso:**
```bash
python gerar_slides_simples.py
```

**Estrutura de Slide:**
```
┌─────────────────────────────────┐
│ SLIDE 01: Título                │ (Azul #008AD1, 40pt)
├─────────────────────────────────┤ (Linha azul)
│                                 │
│ Conteúdo do slide...            │ (Cinza escuro, 16pt)
│ Linha 2                         │
│ Linha 3                         │
│                                 │
└─────────────────────────────────┘
```

**Ideal para:**
- Apresentações formais
- Ambientes corporativos
- Maxima legibilidade

---

### 2. Gerador com Fundo TEMA-SENAI

**Arquivo:** `gerar_slides_com_fundo.py`

**Características:**
- Imagem de fundo: `TEMA-SENAI.png`
- Título com caixa branca + borda azul
- Conteúdo em caixa semi-transparente
- Máxima visibilidade mesmo com fundo
- Fonte: Century Gothic 100%

**Uso:**
```bash
python gerar_slides_com_fundo.py
```

**Requisitos:**
- Arquivo de imagem deve existir: `C:\fontes\aulas-senai\GERADOR-AULAS\TEMA-SENAI.png`
- Tamanho recomendado: 1920×1440px (ou proporcional)

**Estrutura de Slide:**
```
┌─────────────────────────────────┐
│ ╔═════════════════════════════╗ │
│ ║ SLIDE 01: Título            ║ │ (Fundo branco, borda azul)
│ ╚═════════════════════════════╝ │
│                                 │
│ ┌───────────────────────────┐   │
│ │ Conteúdo do slide...      │   │ (Caixa semi-transparente)
│ │ Linha 2                   │   │
│ │ Linha 3                   │   │
│ └───────────────────────────┘   │
│                                 │
│ [IMAGEM TEMA-SENAI COMO FUNDO] │
└─────────────────────────────────┘
```

**Ideal para:**
- Apresentações educacionais
- Ambientes criativos
- Slides com identidade visual forte

---

### 3. Gerador com Fundo Geométrico

**Arquivo:** `gerar_slides_gemini_v3.py`

**Características:**
- Retângulos azuis no lado esquerdo (30% da largura)
- Cor 1: #0053B3 (azul escuro) — altura total
- Cor 2: #008AD1 (azul claro) — sobreposto (50% altura)
- Padrão geométrico moderno
- Título e conteúdo no espaço em branco

**Uso:**
```bash
python gerar_slides_gemini_v3.py
```

**Estrutura de Slide:**
```
┌──────────────────────────────────────────┐
│ ┌────┐                                   │
│ │    │  SLIDE 01: Título                 │
│ │    │  (Azul #008AD1, 40pt)             │
│ │    ├────┐                              │
│ │    │    │  Conteúdo do slide...        │
│ │    │    │  Linha 2                     │
│ │    │    │  Linha 3                     │
│ │    │    │                              │
│ │    │    │                              │
│ │    │────┘                              │
│ │    │                                   │
│ └────┘                                   │
└──────────────────────────────────────────┘
```

**Ideal para:**
- Apresentações modernas
- Design minimalista
- Foco no conteúdo

---

## 🔧 Configuração de Uso

### Localização dos Arquivos

Todos os geradores devem estar em:
```
C:\Users\gelva\AppData\Local\Temp\claude\...\scratchpad\
```

### Entrada (Markdown)

**Arquivo:** `SlidesDigitalSkills.md`

Formato obrigatório:
```markdown
## SLIDE 01: Título da Slide
Conteúdo linha 1
Conteúdo linha 2
...

## SLIDE 02: Próximo Título
Conteúdo...
```

### Saída (PowerPoint)

**Arquivo:** `SlidesDigitalSkillsGemini.pptx`

- Localização: `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\`
- Tamanho típico: 0.10 – 0.15 MB
- Compatível com: PowerPoint 2010+, LibreOffice Impress, Google Slides

---

## 📊 Comparativo de Geradores

| Aspecto | Simples | Com Fundo | Geométrico |
|---------|---------|-----------|------------|
| **Fundo** | Branco | Imagem | Retângulos azuis |
| **Complexidade** | Baixa | Média | Média |
| **Legibilidade** | Máxima | Alta | Alta |
| **Visual** | Minimalista | Criativo | Moderno |
| **Arquivo Saída** | 0.10 MB | 0.13 MB | 0.10 MB |
| **Tempo Geração** | ~5s | ~15s | ~5s |
| **Recomendado para** | Formais | Educacionais | Criativos |

---

## 🎨 Customizações Avançadas

### Alterar Cores

```python
SENAI_BLUE = RGBColor(0, 138, 209)    # #008AD1
DARK_GRAY = RGBColor(51, 51, 51)      # #333333
```

### Alterar Tamanhos de Fonte

```python
# Título
p.font.size = Pt(40)

# Conteúdo
p.font.size = Pt(16)
```

### Alterar Caminho de Saída

```python
output_pptx = r"C:\seu\caminho\arquivo.pptx"
```

### Adicionar Logo SENAI

```python
# Adicionar logo no canto superior direito
logo_path = r"C:\caminho\logo-senai.png"
pic = slide.shapes.add_picture(
    logo_path,
    Inches(8.5),  # x
    Inches(0.3),  # y
    width=Inches(1.2)
)
```

---

## 🚀 Como Usar a Skill

### Invocar a Skill

```bash
/padrao-slides-senai
```

### Descrever o Que Você Quer

```
Contexto: Quero regenerar os slides de Digital Skills

Tipo: Com fundo TEMA-SENAI.png

Arquivo Entrada: SlidesDigitalSkills.md

Arquivo Saída: SlidesDigitalSkillsGemini.pptx

Gerador: gerar_slides_com_fundo.py
```

### A Skill Irá

1. ✅ Executar o gerador apropriado
2. ✅ Gerar o arquivo PowerPoint
3. ✅ Validar o resultado
4. ✅ Fazer commit automático

---

## 🔍 Troubleshooting

### Erro: "Imagem não encontrada"

**Solução:**
```bash
# Verificar se o arquivo existe
ls C:\fontes\aulas-senai\GERADOR-AULAS\TEMA-SENAI.png

# Se não existir, usar gerador simples
python gerar_slides_simples.py
```

### Erro: "Module not found: pptx"

**Solução:**
```bash
pip install python-pptx
```

### Arquivo muito grande (>1MB)

**Solução:**
- Reduzir resolução da imagem de fundo
- Comprimir o arquivo PPTX com 7-Zip

---

## 📝 Versionamento

| Versão | Gerador | Data | Status |
|--------|---------|------|--------|
| 1.0 | `gerar_slides_simples.py` | 2026-09-17 | ✅ Ativa |
| 2.0 | `gerar_slides_com_fundo.py` | 2026-09-17 | ✅ Ativa |
| 3.0 | `gerar_slides_gemini_v3.py` | 2026-09-17 | ✅ Ativa |

---

## 📞 Suporte

Para dúvidas ou ajustes:
- Consulte a skill: `/padrao-slides-senai`
- Leia a documentação: `SKILL.md`
- Verifique exemplos: `TEMA-SENAI-REFERENCIA.md`

---

**Última Atualização:** 2026-09-17  
**Status:** ✅ Ativa  
**Mantida por:** SENAI/SC
