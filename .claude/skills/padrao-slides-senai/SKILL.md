---
name: padrao-slides-senai
description: Criar e editar slides PowerPoint seguindo o padrão visual SENAI com cores, fontes e layouts padronizados
---

# Skill: Padrão Slides SENAI

## Visão Geral

Esta skill fornece um processo estruturado para criar e editar slides PowerPoint seguindo o padrão visual institucional do SENAI. Garante consistência visual, identidade corporativa e qualidade profissional em todas as apresentações.

## Características do Padrão SENAI

### 🎨 Identidade Visual

| Elemento | Especificação |
|----------|---------------|
| **Cor Primária** | Azul SENAI: #008AD1 |
| **Fonte Principal** | Century Gothic |
| **Tamanho Título Grande** | 60pt (títulos principais) |
| **Tamanho Subtítulo** | 51pt |
| **Tamanho Conteúdo** | 20-44pt (conforme hierarquia) |
| **Tamanho Pequeno** | 14-18pt (rodapé, legendas) |

### 📐 Layouts Disponíveis

1. **Slide de Título** — Título + Subtítulo + Logotipo
2. **Conteúdo Simples** — Título + Texto/Conteúdo
3. **Cabeçalho de Seção** — Divisão visual de seções
4. **Dois Objetos** — Lado a lado (imagem + texto)
5. **Dois Objetos com Texto** — Dois elementos + descrição
6. **Apenas Título** — Título + espaço livre
7. **Em Branco** — Slide vazio para customização
8. **Objeto com Legenda** — Elemento + texto explicativo
9. **Imagem com Legenda** — Foto + descrição
10. **Texto Vertical** — Para textos orientados verticalmente
11. **Título e Texto Vertical** — Combinação

## Como Usar Esta Skill

### Passo 1: Invocar a Skill

```
/padrao-slides-senai

Contexto: [descreva o que você quer criar]
Tema: [título/tema da apresentação]
Quantidade de slides: [número]
```

### Passo 2: Descrever o Conteúdo

Forneça informações sobre:
- **Tema/Título** da apresentação
- **Público-alvo** (alunos, professores, gerentes, etc.)
- **Objetivo** (educar, informar, convencer, etc.)
- **Conteúdo** de cada slide
- **Imagens/Recursos** (se houver)

### Passo 3: Especificar Layout

Para cada slide, indique qual layout usar:
- `titulo` — Slide de título (primeira slide)
- `conteudo` — Conteúdo simples com título
- `dois-objetos` — Layout lado a lado
- `secao` — Divisor de seção
- `imagem` — Com imagem e legenda
- `em-branco` — Customizável

### Passo 4: Geração do PowerPoint

A skill criará um arquivo `.pptx` com:
- ✅ Cor corporativa SENAI (#008AD1)
- ✅ Fonte Century Gothic em todos os textos
- ✅ Hierarquia visual correta
- ✅ Logotipo SENAI (se aplicável)
- ✅ Layout profissional e consistente

## Exemplo de Uso

```
Contexto: Quero criar uma apresentação sobre "Transformação Digital"

Tema: Transformação Digital na Indústria
Público: Gerentes de produção
Objetivo: Apresentar oportunidades de automação
Slides necessários: 8

Estrutura:
1. SLIDE DE TÍTULO — "Transformação Digital"
2. CONTEÚDO — "O que é Transformação Digital?"
3. DOIS OBJETOS — Desafios vs Oportunidades
4. SEÇÃO — "Tecnologias Principais"
5. CONTEÚDO — "IA e Automação"
6. CONTEÚDO — "Segurança e Dados"
7. IMAGEM — "Caso de Sucesso SENAI"
8. CONTEÚDO — "Próximos Passos"
```

## Padrões de Design

### Paleta de Cores

- **Primária:** #008AD1 (Azul SENAI)
- **Secundária:** Branco/Cinza claro
- **Destaque:** #FF6B35 (Laranja) — para elementos de atenção
- **Texto:** #333333 (Cinza escuro)

### Hierarquia de Fontes

```
Título Principal: Century Gothic 60pt — Azul #008AD1
Subtítulo: Century Gothic 51pt — Azul #008AD1
Heading: Century Gothic 44pt — Cinza escuro
Subheading: Century Gothic 36pt — Cinza escuro
Conteúdo: Century Gothic 20pt — Cinza escuro
Pequeno: Century Gothic 14pt — Cinza médio
```

### Elementos Padrão

- **Logo SENAI:** Canto superior direito (todas as slides)
- **Rodapé:** Nome da apresentação e página (opcional)
- **Linhas decorativas:** Azul #008AD1 (separadores)
- **Espaçamento:** Consistente, respeitando margens

### Opções de Fundo

#### 1. Fundo Simples (Branco)
- Fundo branco limpo
- Ideal para apresentações formais
- Fácil legibilidade

#### 2. Fundo com Imagem TEMA-SENAI
- Imagem: `C:\fontes\aulasenai\GERADOR-AULAS\TEMA-SENAI.png`
- Aplicada em todas as slides
- Caixas semi-transparentes para texto (legibilidade)
- Título: Fundo branco com borda azul (#008AD1)
- Conteúdo: Fundo branco semi-transparente

#### 3. Fundo Geométrico (Retângulos Azuis)
- Dois retângulos azuis sobrepostos no lado esquerdo
- Cores: #0053B3 (escuro) + #008AD1 (claro)
- Padrão moderno e profissional
- Espaço livre para conteúdo (70% do slide)

## Checklist de Qualidade

Toda apresentação criada com esta skill deve ter:

- ✅ Fonte Century Gothic em 100% do texto
- ✅ Cor azul SENAI (#008AD1) nos elementos principais
- ✅ Hierarquia visual clara
- ✅ Logo SENAI presente (conforme apropriado)
- ✅ Alinhamento consistente
- ✅ Espaçamento adequado
- ✅ Sem elementos quebrados ou mal formatados
- ✅ Contraste suficiente para legibilidade

## Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `/padrao-slides-senai novo` | Criar nova apresentação |
| `/padrao-slides-senai editar` | Editar apresentação existente |
| `/padrao-slides-senai tema` | Exibir características do tema |
| `/padrao-slides-senai exemplo` | Mostrar exemplo de slide |
| `/padrao-slides-senai verificar` | Validar slides contra padrão |

## Saída Esperada

A skill gera um arquivo PowerPoint (`.pptx`) pronto para:
- ✅ Apresentações em sala de aula
- ✅ Reuniões executivas
- ✅ Treinamentos corporativos
- ✅ Workshops e seminários
- ✅ Documentação visual

## Boas Práticas

1. **Manter Consistência** — Use sempre o mesmo layout para slides similares
2. **Respeitar Hierarquia** — Títulos maiores, conteúdo menor
3. **Usar a Cor SENAI** — Para destaque de informações-chave
4. **Espaçamento** — Não aglomere conteúdo
5. **Imagens de Qualidade** — Se usar imagens, que sejam profissionais
6. **Limite de Texto** — Máximo 5-6 linhas por slide
7. **Consistência de Logo** — Sempre na mesma posição

## Arquivo Base para Referência

**Arquivo de Tema:** `PADRAO-SLIDES-TEMA-SENAI.pptx`
- Localização: `C:\fontes\aulasenai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\`
- Contém: 6 slides de referência com todos os layouts
- Fonte: Century Gothic
- Cor: #008AD1

## Versão

- **Versão:** 1.0
- **Data:** 17 de Setembro de 2026
- **Status:** ✅ Ativa
- **Mantida por:** SENAI/SC

---

**Dica:** Para obter melhores resultados, sempre forneça o contexto completo da apresentação e o público-alvo.
