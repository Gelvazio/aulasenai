#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para ajustar ementas fora do padrão (14.800–14.950 chars)
em RIO_DO_SUL_MAIS_TECH
"""

import os
from pathlib import Path

MATERIAS = {
    "COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO": 248,
    "EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS": 248,
    "FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO": 248,
    "INTRODUCAO_COMUNICACAO_ORAL_ESCRITA": 262,
    "NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS": 248,
    "OFICINAS_IMPRESSAO_3D_ROBOTICA": 248,
    "REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO": 644,
}

BASE_PATH = r"C:\fontes\aulas-senai\MATERIAIS\RIO_DO_SUL_MAIS_TECH"

def ajustar_ementa(caminho, falta):
    """Remove caracteres excedentes de forma inteligente."""

    with open(caminho, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    tamanho_original = len(conteudo)

    # Estratégia 1: Remover últimas seções menos críticas
    # Remover FAQ/Troubleshooting se existir
    if "\n## XVII. FAQ E TROUBLESHOOTING" in conteudo:
        pos = conteudo.find("\n## XVII. FAQ E TROUBLESHOOTING")
        if pos > 0:
            conteudo_novo = conteudo[:pos]
            if len(conteudo) - len(conteudo_novo) >= falta:
                conteudo = conteudo_novo
                tamanho_original = len(conteudo)

    # Estratégia 2: Remover Glossário se ainda faltam chars
    if "## XVIII. GLOSSÁRIO" in conteudo:
        pos = conteudo.find("\n## XVIII. GLOSSÁRIO")
        if pos > 0 and len(conteudo) > tamanho_original - falta:
            conteudo = conteudo[:pos]

    # Estratégia 3: Truncar do final enquanto acima do padrão
    while len(conteudo) > 14950:
        # Remover últimas linhas
        linhas = conteudo.rstrip().split('\n')
        linhas = linhas[:-2]  # Remover 2 linhas por vez
        conteudo = '\n'.join(linhas) + '\n'

    return conteudo

if __name__ == '__main__':
    print("🔧 Ajustando ementas fora do padrão...\n")

    for materia, falta in MATERIAS.items():
        caminho = os.path.join(BASE_PATH, materia, "EMENTA-CHALKIE-AI.md")

        if os.path.exists(caminho):
            conteudo_novo = ajustar_ementa(caminho, falta)
            tamanho_novo = len(conteudo_novo)
            dentro = 14800 <= tamanho_novo <= 14950

            # Salvar
            with open(caminho, 'w', encoding='utf-8') as f:
                f.write(conteudo_novo)

            status = "✅" if dentro else "⚠️"
            print(f"{status} {materia:45} {tamanho_novo:5} chars")
        else:
            print(f"❌ {materia:45} ARQUIVO NÃO ENCONTRADO")

    print("\n✅ Ajustes concluídos!")
