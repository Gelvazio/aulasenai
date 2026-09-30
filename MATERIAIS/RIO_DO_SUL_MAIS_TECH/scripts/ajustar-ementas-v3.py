#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para ajustar ementas — Remover seções menos críticas (v3)
"""

import os
import re

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

def remover_secoes_menos_criticas(conteudo):
    """Remove seções menos essenciais para reduzir tamanho."""

    # 1. Remover seção "Contexto e Instruções Operacionais para IA" (geralmente grande)
    conteudo = re.sub(
        r'\n## Contexto e Instruções Operacionais.*?\n---\n',
        '\n---\n',
        conteudo,
        flags=re.DOTALL
    )

    # 2. Remover seção "Preparação para Cursos Posteriores"
    conteudo = re.sub(
        r'\n## Preparação para Cursos.*?\n---\n',
        '\n---\n',
        conteudo,
        flags=re.DOTALL
    )

    # 3. Remover seção "Guia de Implementação" (grande)
    conteudo = re.sub(
        r'\n## XI\. GUIA DE IMPLEMENTAÇÃO.*?(?=\n## |\n---\n|\Z)',
        '',
        conteudo,
        flags=re.DOTALL
    )

    return conteudo

def ajustar_tamanho(caminho, chars_alvo):
    """Ajusta tamanho removendo conteúdo de forma inteligente."""

    with open(caminho, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    tamanho = len(conteudo)

    if tamanho > 14950:
        # Tentar remover seções menos críticas
        conteudo = remover_secoes_menos_criticas(conteudo)
        tamanho = len(conteudo)

    # Se ainda acima do padrão, truncar do final
    while tamanho > 14950:
        linhas = conteudo.rstrip().split('\n')
        if len(linhas) > 1:
            linhas.pop()
            conteudo = '\n'.join(linhas) + '\n'
            tamanho = len(conteudo)
        else:
            break

    return conteudo

if __name__ == '__main__':
    print("🔧 Ajustando ementas (v3 — remoção de seções menos críticas)...\n")

    for materia, chars_alvo in MATERIAS.items():
        caminho = os.path.join(BASE_PATH, materia, "EMENTA-CHALKIE-AI.md")

        if os.path.exists(caminho):
            conteudo_novo = ajustar_tamanho(caminho, chars_alvo)
            tamanho_novo = len(conteudo_novo)
            dentro = 14800 <= tamanho_novo <= 14950

            # Salvar
            with open(caminho, 'w', encoding='utf-8') as f:
                f.write(conteudo_novo)

            status = "✅" if dentro else "⚠️"
            print(f"{status} {materia:45} {tamanho_novo:5} chars")
        else:
            print(f"❌ {materia:45} NÃO ENCONTRADO")

    print("\n✅ Ajustes finalizados!")
