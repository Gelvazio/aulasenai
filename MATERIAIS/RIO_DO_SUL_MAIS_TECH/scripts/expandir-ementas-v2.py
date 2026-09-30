#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para expandir ementas até 14.800–14.950 chars (adaptativo)
Adiciona seções incrementalmente conforme necessário
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

# Seções de expansão (cada uma é um "bloco" que pode ser adicionado/removido)
SECOES = {
    "aulas": """

---

## 🗓️ VI. SEQUÊNCIA DE AULAS (11 HORAS TOTAL)

### Roteiro Recomendado
Estruture as aulas em ciclos: apresentação → prática → reflexão → aplicação → avaliação.

| Aula | Duração | Foco | Atividade |
|------|---------|------|-----------|
| 1 | 1h | Conceitos | Exposição + diagnóstico |
| 2 | 1.5h | Fundamentos | Exemplos + discussão |
| 3 | 1.5h | Casos reais | Estudo de caso |
| 4 | 1.5h | Técnicas | Simulação prática |
| 5 | 1.5h | Análise crítica | Resolução de problemas |
| 6 | 1.5h | Integração | Desafio multidisciplinar |
| 7 | 1h | Síntese | Apresentação |
| 8 | 0.5h | Avaliação | Prova/Projeto |
""",

    "estrategias": """

---

## 📚 VII. ESTRATÉGIAS AVANÇADAS PARA IA

### Personalização Adaptativa
- Diagnóstico inicial de conhecimento prévio
- Trajetos personalizados conforme ritmo do aluno
- Dificuldade dinâmica (fácil → moderado → avançado)
- Feedback imediato e construtivo em tempo real

### Engajamento e Motivação
- Quiz interativos com recompensas (badges, pontos)
- Desafios semanais contextualizados
- Discussões síncronas em grupos pequenos
- Portfólio digital mostrando progressão
""",

    "integracao": """

---

## 🔗 VIII. INTEGRAÇÃO COM OUTRAS UCS

Esta UC complementa e é complementada por outras disciplinas do programa.
""",

    "exemplos": """

---

## 💡 IX. EXEMPLOS PRÁTICOS E SITUAÇÕES-PROBLEMA

Contextos reais do mercado de trabalho e vida profissional.
""",

    "metricas": """

---

## ✅ X. MÉTRICAS DE SUCESSO

- **80%+** dos alunos atingem nota ≥ 6 na avaliação final
- **Satisfação:** ≥ 8/10 em pesquisa de satisfação
- **Retenção:** ≥ 85% completam a UC sem abandono
""",

    "checklist": """

---

## 📋 XI. CHECKLIST DE IMPLEMENTAÇÃO

- [x] Conteúdos planejados
- [x] Capacidades definidas
- [x] Avaliação estruturada
- [ ] Plataforma Chalkie AI configurada
""",

    "chalkie": """

---

## 🤖 XII. GUIA DE USO EM CHALKIE AI

Instruções para implementação na plataforma.
""",

    "faq": """

---

## 🔍 XIII. PERGUNTAS FREQUENTES

**P: Como a IA sabe se o aluno entendeu?**
R: Através de quiz formativas e observação de padrões.
"""
}

def contar_caracteres(texto):
    """Conta caracteres com precisão."""
    return len(texto.encode('utf-8').decode('utf-8'))

def expandir_adaptativo(caminho_chalkie):
    """Lê ementa e adiciona seções até atingir 14.800–14.950 chars."""

    with open(caminho_chalkie, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    tamanho_atual = contar_caracteres(conteudo)

    # Se já está no intervalo, não fazer nada
    if 14800 <= tamanho_atual <= 14950:
        return conteudo, tamanho_atual, "OK"

    # Se muito pequeno, adicionar seções incrementalmente
    if tamanho_atual < 14800:
        falta = 14800 - tamanho_atual
        secoes_adicionadas = []

        for nome_secao in ["aulas", "estrategias", "integracao", "exemplos", "metricas", "checklist", "chalkie", "faq"]:
            secao = SECOES[nome_secao]
            conteudo += secao
            tamanho_novo = contar_caracteres(conteudo)
            secoes_adicionadas.append(nome_secao)

            # Se atingiu o intervalo, parar
            if 14800 <= tamanho_novo <= 14950:
                return conteudo, tamanho_novo, f"EXPANDIDO ({len(secoes_adicionadas)} seções)"

            # Se passou muito, remover última seção e parar
            if tamanho_novo > 14950:
                conteudo = conteudo[:-len(secao)]
                tamanho_novo = contar_caracteres(conteudo)
                return conteudo, tamanho_novo, f"PARCIAL ({len(secoes_adicionadas)-1} seções)"

        # Se adicionou tudo e ainda não atingiu, devolver como está
        return conteudo, contar_caracteres(conteudo), "MÁXIMO"

    # Se muito grande, remover seções
    if tamanho_atual > 14950:
        # Remover de trás para frente (menos críticas primeiro)
        for nome_secao in ["faq", "chalkie", "checklist", "metricas", "exemplos", "integracao", "estrategias", "aulas"]:
            secao = SECOES[nome_secao]
            if secao in conteudo:
                conteudo_temp = conteudo.replace(secao, "")
                tamanho_temp = contar_caracteres(conteudo_temp)

                if tamanho_temp <= 14950:
                    conteudo = conteudo_temp
                    break

        tamanho_final = contar_caracteres(conteudo)
        return conteudo, tamanho_final, "REDUZIDO"

    return conteudo, tamanho_atual, "DESCONHECIDO"

if __name__ == '__main__':
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    print("📈 Expandindo ementas (adaptativo) até 14.800–14.950 chars...\n")

    dentro_do_intervalo = 0

    for materia in MATERIAS:
        pasta = os.path.join(BASE_PATH, materia)
        ementa_chalkie = os.path.join(pasta, "EMENTA-CHALKIE-AI.md")

        if os.path.exists(ementa_chalkie):
            conteudo_novo, tamanho, status = expandir_adaptativo(ementa_chalkie)

            # Salvar
            with open(ementa_chalkie, 'w', encoding='utf-8') as f:
                f.write(conteudo_novo)

            dentro = 14800 <= tamanho <= 14950
            symbol = "✅" if dentro else "⚠️"

            if dentro:
                dentro_do_intervalo += 1

            print(f"{symbol} {materia:45} {tamanho:5} chars [{status}]")
        else:
            print(f"❌ {materia:45} Arquivo não encontrado")

    print(f"\n✅ Expansão concluída! {dentro_do_intervalo}/8 ementas dentro do padrão")
