#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para analisar status de ementas em cada matéria de cada curso
Verifica:
- EMENTA.md (simples)
- EMENTA-CHALKIE-AI.md (detalhada)
- STATUS-EMENTAS.md (rastreamento)
- Redundâncias e versões antigas
"""

import os
import re
from datetime import datetime

BASE_MATERIAIS = r"C:\fontes\aulas-senai\MATERIAIS"

# Cursos válidos (cada pasta = 1 curso)
CURSOS = {}

def descobrir_cursos():
    """Descobre todos os cursos em MATERIAIS/."""
    global CURSOS

    if not os.path.exists(BASE_MATERIAIS):
        return

    for item in os.listdir(BASE_MATERIAIS):
        pasta = os.path.join(BASE_MATERIAIS, item)

        # Ignorar MATERIAS-GERAIS e arquivos
        if not os.path.isdir(pasta) or item == "MATERIAS-GERAIS":
            continue

        # Verificar se é um curso (tem subpastas de matérias)
        tem_materias = False
        materias = []

        for subitem in os.listdir(pasta):
            subpasta = os.path.join(pasta, subitem)
            if os.path.isdir(subpasta) and not subitem.startswith(('scripts', 'docs', 'DOCUMENTACAO')):
                # Verificar se tem estrutura de matéria (EMENTA.md ou EMENTA-CHALKIE-AI.md)
                for arquivo in os.listdir(subpasta):
                    if arquivo in ['EMENTA.md', 'EMENTA-CHALKIE-AI.md', 'STATUS-EMENTAS.md']:
                        tem_materias = True
                        materias.append(subitem)
                        break

        if tem_materias:
            CURSOS[item] = {
                'pasta': pasta,
                'materias': sorted(set(materias))
            }

def analisar_ementas_curso(nome_curso, dados_curso):
    """Analisa ementas de um curso."""

    print(f"\n{'='*80}")
    print(f"📚 CURSO: {nome_curso}")
    print(f"{'='*80}\n")

    pasta_curso = dados_curso['pasta']
    materias = dados_curso['materias']

    print(f"Total de matérias: {len(materias)}\n")

    # Analisar cada matéria
    resultados = []

    for materia in materias:
        pasta_materia = os.path.join(pasta_curso, materia)

        # Procurar arquivos de ementa
        ementa_md = None
        ementa_chalkie = None
        status_ementas = None
        arquivos_antigos = []

        for arquivo in os.listdir(pasta_materia):
            caminho = os.path.join(pasta_materia, arquivo)

            if arquivo == "EMENTA.md":
                ementa_md = caminho
            elif arquivo == "EMENTA-CHALKIE-AI.md":
                ementa_chalkie = caminho
            elif arquivo == "STATUS-EMENTAS.md":
                status_ementas = caminho
            elif re.match(r'^ementa.*\.md$', arquivo, re.I) or re.match(r'^apostila.*\.md$', arquivo, re.I):
                # Arquivo antigo/redundante
                arquivos_antigos.append(arquivo)

        # Determinar tamanho de EMENTA-CHALKIE-AI.md
        tamanho_chalkie = None
        conforme = False
        if ementa_chalkie:
            try:
                with open(ementa_chalkie, 'r', encoding='utf-8') as f:
                    tamanho_chalkie = len(f.read())
                    conforme = 14800 <= tamanho_chalkie <= 14950
            except:
                pass

        # Status visual
        status_icon = "✅" if conforme else "⚠️" if tamanho_chalkie else "❌"
        tamanho_str = f"{tamanho_chalkie} chars" if tamanho_chalkie else "N/A"

        print(f"{status_icon} {materia:45} {tamanho_str:15}", end="")

        # Indicar redundâncias
        if arquivos_antigos:
            print(f" [REDUNDANTE: {', '.join(arquivos_antigos[:2])}]", end="")

        print()

        resultados.append({
            'materia': materia,
            'ementa_md': bool(ementa_md),
            'ementa_chalkie': bool(ementa_chalkie),
            'tamanho_chalkie': tamanho_chalkie,
            'conforme': conforme,
            'status_ementas': bool(status_ementas),
            'arquivos_antigos': arquivos_antigos
        })

    return resultados

def gerar_resumo(todos_resultados):
    """Gera resumo consolidado."""

    print(f"\n{'='*80}")
    print("📊 RESUMO GERAL")
    print(f"{'='*80}\n")

    total_cursos = len(todos_resultados)
    total_materias = sum(len(r) for r in todos_resultados.values())

    # Contar conformes
    conforme_count = 0
    redundancia_count = 0

    for resultados in todos_resultados.values():
        for r in resultados:
            if r['conforme']:
                conforme_count += 1
            if r['arquivos_antigos']:
                redundancia_count += 1

    print(f"Total de cursos:           {total_cursos}")
    print(f"Total de matérias:         {total_materias}")
    print(f"Ementas conformes (14.800–14.950): {conforme_count}/{total_materias} ({int(conforme_count/total_materias*100)}%)")
    print(f"Matérias com redundância:  {redundancia_count}/{total_materias}")

    # Listar redundâncias
    if redundancia_count > 0:
        print(f"\n⚠️ REDUNDÂNCIAS DETECTADAS:")
        for curso, resultados in todos_resultados.items():
            for r in resultados:
                if r['arquivos_antigos']:
                    print(f"   {curso}/{r['materia']}: {', '.join(r['arquivos_antigos'])}")

if __name__ == '__main__':
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    print("🔍 Analisando status de ementas em todos os cursos...\n")

    # Descobrir cursos
    descobrir_cursos()

    if not CURSOS:
        print("❌ Nenhum curso encontrado em MATERIAIS/")
        sys.exit(1)

    # Analisar cada curso
    todos_resultados = {}

    for nome_curso in sorted(CURSOS.keys()):
        resultados = analisar_ementas_curso(nome_curso, CURSOS[nome_curso])
        todos_resultados[nome_curso] = resultados

    # Gerar resumo
    gerar_resumo(todos_resultados)

    print(f"\n✅ Análise concluída em {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
