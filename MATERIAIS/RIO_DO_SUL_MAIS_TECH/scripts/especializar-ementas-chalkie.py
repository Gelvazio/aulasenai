#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para especializar EMENTA-CHALKIE-AI.md com conteúdos específicos de cada UC
Lê EMENTA.md e incorpora conteúdos reais na EMENTA-CHALKIE-AI.md
"""

import os
import re

MATERIAS = [
    "COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO",
    "EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS",
    "FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO",
    "INTRODUCAO_COMUNICACAO_ORAL_ESCRITA",
    "NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS",
    "OFICINAS_IMPRESSAO_3D_ROBOTICA",
    "REFORCO_LINGUAGENS",
    "REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO"
]

BASE_PATH = r"C:\fontes\aulas-senai\MATERIAIS\RIO_DO_SUL_MAIS_TECH"

def extrair_ementa_md(caminho_ementa):
    """Extrai informações da EMENTA.md simples."""
    if not os.path.exists(caminho_ementa):
        return None

    with open(caminho_ementa, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    dados = {
        'titulo': '',
        'carga': '',
        'objetivo': '',
        'capacidades': [],
        'conteudos_secoes': {},
        'estrategias': [],
        'avaliacoes': []
    }

    # Extrair título
    match = re.search(r'# (.+?)(?:\n|$)', conteudo)
    if match:
        dados['titulo'] = match.group(1).strip()

    # Extrair carga horária
    match = re.search(r'\*\*Carga Horária:\*\*\s*(\d+h)', conteudo)
    if match:
        dados['carga'] = match.group(1)

    # Extrair objetivo
    match = re.search(r'## Objetivo Geral\n(.*?)(?=\n##|\Z)', conteudo, re.DOTALL)
    if match:
        dados['objetivo'] = match.group(1).strip()

    # Extrair capacidades
    match = re.search(r'## Capacidades.*?\n(.*?)(?=\n##|\Z)', conteudo, re.DOTALL)
    if match:
        capacidades_text = match.group(1)
        capacidades = re.findall(r'- (.+?)(?:\n|$)', capacidades_text)
        dados['capacidades'] = capacidades

    # Extrair conteúdos por seção
    match = re.search(r'## Conteúdos.*?\n(.*?)(?=\n##|\Z)', conteudo, re.DOTALL)
    if match:
        conteudos_text = match.group(1)
        # Procurar seções (### SubSeção)
        secoes = re.findall(r'### (.+?)\n(.*?)(?=###|\Z)', conteudos_text, re.DOTALL)
        for secao_nome, secao_conteudo in secoes:
            items = re.findall(r'- (.+?)(?:\n|$)', secao_conteudo)
            if items:
                dados['conteudos_secoes'][secao_nome] = items

    # Extrair estratégias
    match = re.search(r'## Estratégias.*?\n(.*?)(?=\n##|\Z)', conteudo, re.DOTALL)
    if match:
        estrategias_text = match.group(1)
        estrategias = re.findall(r'- (.+?)(?:\n|$)', estrategias_text)
        dados['estrategias'] = estrategias

    # Extrair avaliações
    match = re.search(r'## Avaliação\n(.*?)(?=\n##|\Z)', conteudo, re.DOTALL)
    if match:
        avaliacoes_text = match.group(1)
        avaliacoes = re.findall(r'- (.+?)(?:\n|$)', avaliacoes_text)
        dados['avaliacoes'] = avaliacoes

    return dados

def gerar_ementa_chalkie(dados, nome_disciplina):
    """Gera EMENTA-CHALKIE-AI.md especializada com dados específicos."""

    if not dados:
        return None

    titulo = dados['titulo'].replace('UC 1 — ', '').replace('UC 2 — ', '').strip()
    carga = dados['carga']
    objetivo = dados['objetivo']

    # Montar conteúdos programáticos
    conteudos_html = ""
    if dados['conteudos_secoes']:
        conteudos_html = "\n### Conteúdos Específicos\n\n"
        for secao, items in dados['conteudos_secoes'].items():
            conteudos_html += f"**{secao}:**\n"
            for item in items:
                conteudos_html += f"- {item}\n"
            conteudos_html += "\n"

    # Montar capacidades
    capacidades_html = ""
    if dados['capacidades']:
        capacidades_html = "\n### Capacidades Específicas da UC\n\n"
        for i, cap in enumerate(dados['capacidades'], 1):
            capacidades_html += f"{i}. {cap}\n"

    # Template Chalkie AI especializado
    ementa = f"""# 🤖 EMENTA-CHALKIE-AI — {titulo}

**Disciplina:** {titulo}
**Carga Horária:** {carga} | **Público:** Alunos 8º-9º ano | **Modalidade:** Presencial
**Plataforma:** Chalkie AI | **Versão:** 2026-09
**Programa:** Rio do Sul Mais Tech — SENAI

---

## 📚 I. CONTEXTO E ALINHAMENTO

### Objetivo Geral da UC

{objetivo}

### Alinhamento com Rio do Sul Mais Tech
Esta unidade curricular integra-se ao programa Rio do Sul Mais Tech, desenvolvendo competências essenciais para atuação em ambiente profissional, tecnológico e de mercado de trabalho.

---

## 🎯 II. OBJETIVOS E CAPACIDADES

{capacidades_html}

---

## 📖 III. CONTEÚDOS PROGRAMÁTICOS
{conteudos_html}

---

## 🔍 IV. ESTRATÉGIAS DE ENSINO PARA IA

"""

    if dados['estrategias']:
        ementa += "### Metodologias Recomendadas\n\n"
        for est in dados['estrategias']:
            ementa += f"- {est}\n"

    ementa += """

### Abordagem Chalkie AI
- Adaptar conteúdo ao ritmo individual do aluno
- Fornecer feedback imediato e construtivo
- Conectar conceitos abstratos com situações reais da comunidade
- Usar múltiplos formatos (visual, textual, interativo, auditivo)
- Incentivar raciocínio crítico e metacognição

---

## 💯 V. CRITÉRIOS DE AVALIAÇÃO

| Critério | Peso | Descrição |
|----------|------|-----------|
| **Testes/Provas** | 35% | Avaliação de compreensão conceitual |
| **Projetos** | 40% | Trabalho prático aplicado |
| **Participação** | 15% | Engajamento e colaboração |
| **Autoavaliação** | 10% | Reflexão sobre progresso |

### Rúbrica de Desempenho (0–10)
- **Excelente (9–10):** Domina conceitos, aplica criativamente, comunica claramente
- **Bom (7–8):** Compreende bem, aplica com pouca orientação, boa comunicação
- **Aceitável (5–6):** Compreensão básica, precisa orientação, comunicação adequada
- **Insuficiente (0–4):** Compreensão limitada, dificuldade em aplicar

---

**Status:** ✅ Pronto para implementação em Chalkie AI
**Última atualização:** 2026-09-21
**Versão:** 2.1 ESPECIALIZADA — Conteúdos Específicos da UC
"""

    return ementa

if __name__ == '__main__':
    print("🔧 Especializando EMENTA-CHALKIE-AI.md com conteúdos específicos...\n")

    for materia in MATERIAS:
        pasta = os.path.join(BASE_PATH, materia)
        ementa_md = os.path.join(pasta, "EMENTA.md")
        ementa_chalkie = os.path.join(pasta, "EMENTA-CHALKIE-AI.md")

        # Extrair dados de EMENTA.md
        dados = extrair_ementa_md(ementa_md)

        if dados:
            # Gerar nova EMENTA-CHALKIE-AI.md
            ementa_nova = gerar_ementa_chalkie(dados, materia)

            if ementa_nova:
                # Salvar
                with open(ementa_chalkie, 'w', encoding='utf-8') as f:
                    f.write(ementa_nova)

                tamanho = len(ementa_nova)
                dentro = 14800 <= tamanho <= 14950
                status = "✅" if dentro else "⚠️"

                print(f"{status} {materia:45} {tamanho:5} chars")
            else:
                print(f"❌ {materia:45} Falha ao gerar")
        else:
            print(f"⚠️ {materia:45} Não encontrou EMENTA.md")

    print("\n✅ Especialização concluída!")
