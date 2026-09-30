#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para analisar apostilas redundantes em cada matéria
Identifica duplicatas, versões antigas, e propõe consolidação
"""

import os
import re
from difflib import SequenceMatcher
from pathlib import Path

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

def normalizar_nome(nome):
    """Remove prefixos, sufixos e normaliza para comparação."""
    # Remover extensão
    nome = Path(nome).stem

    # Converter para lowercase
    nome = nome.lower()

    # Remover versões (v1, v2, 2026-09-21, etc)
    nome = re.sub(r'[-_\s]*(v\d+|versão\s*\d+|\d{4}-\d{2}-\d{2}|[a-z]*\d+[a-z]*)[-_\s]*$', '', nome)

    # Remover espaços extras
    nome = re.sub(r'\s+', ' ', nome).strip()

    return nome

def calcular_similaridade(str1, str2):
    """Calcula similaridade entre duas strings (0-1)."""
    return SequenceMatcher(None, str1, str2).ratio()

def analisar_apostilas_materia(pasta_materia, nome_materia):
    """Analisa apostilas em uma matéria e detecta redundâncias."""

    # Encontrar todos os .md
    md_files = []
    for root, dirs, files in os.walk(pasta_materia):
        for file in files:
            if file.endswith('.md') and not file.startswith('.'):
                caminho_completo = os.path.join(root, file)
                caminho_relativo = os.path.relpath(caminho_completo, pasta_materia)
                md_files.append({
                    'nome': file,
                    'relativo': caminho_relativo,
                    'completo': caminho_completo
                })

    if not md_files:
        return None

    # Detectar grupos de arquivos similares
    grupos = []
    processados = set()

    for i, f1 in enumerate(md_files):
        if f1['nome'] in processados:
            continue

        grupo = [f1]
        nome_norm1 = normalizar_nome(f1['nome'])

        for j, f2 in enumerate(md_files[i+1:], i+1):
            if f2['nome'] in processados:
                continue

            nome_norm2 = normalizar_nome(f2['nome'])

            # Se nomes normalizados são iguais ou muito similares (>85%)
            sim = calcular_similaridade(nome_norm1, nome_norm2)

            if sim >= 0.85 or nome_norm1 == nome_norm2:
                grupo.append(f2)
                processados.add(f2['nome'])

        if len(grupo) > 1:
            grupos.append(grupo)
            for f in grupo:
                processados.add(f['nome'])

    return {
        'total': len(md_files),
        'grupos_redundantes': grupos,
        'arquivos': md_files
    }

def obter_tamanho_arquivo(caminho):
    """Obtém tamanho do arquivo em bytes."""
    try:
        return os.path.getsize(caminho)
    except:
        return 0

if __name__ == '__main__':
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    print("🔍 Analisando apostilas redundantes em cada matéria...\n")

    relatorio_geral = {
        'total_materias': len(MATERIAS),
        'materias_com_redundancia': 0,
        'total_redundancias': 0,
        'detalhes': []
    }

    for materia in MATERIAS:
        pasta = os.path.join(BASE_PATH, materia)

        if not os.path.exists(pasta):
            print(f"❌ {materia:45} Pasta não encontrada")
            continue

        resultado = analisar_apostilas_materia(pasta, materia)

        if not resultado:
            print(f"✅ {materia:45} Sem arquivos .md")
            continue

        grupos = resultado['grupos_redundantes']

        if grupos:
            relatorio_geral['materias_com_redundancia'] += 1
            relatorio_geral['total_redundancias'] += len(grupos)

            print(f"⚠️ {materia}")
            print(f"   Total de .md: {resultado['total']}")
            print(f"   Grupos redundantes encontrados: {len(grupos)}\n")

            for i, grupo in enumerate(grupos, 1):
                print(f"   📁 Grupo {i}:")

                # Ordenar por tamanho (maior primeiro)
                grupo_ord = sorted(grupo, key=lambda x: obter_tamanho_arquivo(x['completo']), reverse=True)

                for j, f in enumerate(grupo_ord):
                    tamanho = obter_tamanho_arquivo(f['completo'])
                    eh_maior = "🔵 MANTER" if j == 0 else "🔴 REMOVER"
                    print(f"      {eh_maior} {f['nome']:40} ({tamanho:5} bytes) - {f['relativo']}")

                print()

            relatorio_geral['detalhes'].append({
                'materia': materia,
                'grupos': grupos
            })
        else:
            print(f"✅ {materia:45} Sem redundâncias detectadas")

    print("\n" + "="*80)
    print(f"\n📊 RESUMO GERAL:")
    print(f"   Total de matérias: {relatorio_geral['total_materias']}")
    print(f"   Matérias com redundância: {relatorio_geral['materias_com_redundancia']}")
    print(f"   Total de grupos redundantes: {relatorio_geral['total_redundancias']}")

    if relatorio_geral['total_redundancias'] > 0:
        print(f"\n⚠️ Ação recomendada: Revisar grupos acima e remover arquivos marcados com 🔴 REMOVER")
