#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para consolidar ementas das matérias que já estão conformes (14.800–14.950)
Remove arquivos redundantes (Apostila_*, ementa_*, EMENTA_DA_MATERIA.md)
Mantém APENAS: EMENTA-CHALKIE-AI.md, STATUS-EMENTAS.md
"""

import os
import re

BASE_PATH = r"C:\fontes\aulas-senai\MATERIAIS\RIO_DO_SUL_MAIS_TECH"

# Matérias que já estão conformes (não expandir, apenas consolidar)
MATERIAS_CONFORMES = [
    "COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO",
    "FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO",
    "INTRODUCAO_COMUNICACAO_ORAL_ESCRITA",
    "OFICINAS_IMPRESSAO_3D_ROBOTICA",
    "REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO"
]

# Padrões de arquivos a remover (redundantes)
PADROES_REMOVER = [
    r'^Apostila_.*\.md$',
    r'^apostila_.*\.md$',
    r'^ementa_.*\.md$',
    r'^Ementa_.*\.md$',
    r'^EMENTA_.*\.md$',
    r'^APOSTILA_DA_MATERIA\.md$',
    r'^EMENTA_DA_MATERIA\.md$',
    r'^ementa_.*\.md$'
]

def deve_remover(nome_arquivo):
    """Verifica se arquivo deve ser removido."""
    for pattern in PADROES_REMOVER:
        if re.match(pattern, nome_arquivo):
            return True
    return False

def consolidar_materia(pasta_materia, nome_materia):
    """Remove arquivos redundantes de uma matéria."""

    removidos = []

    if not os.path.exists(pasta_materia):
        return None

    # Listar arquivos .md
    arquivos = [f for f in os.listdir(pasta_materia) if f.endswith('.md')]

    for arquivo in arquivos:
        if deve_remover(arquivo):
            caminho_completo = os.path.join(pasta_materia, arquivo)
            try:
                os.remove(caminho_completo)
                removidos.append(arquivo)
            except Exception as e:
                print(f"     ❌ Erro ao remover {arquivo}: {e}")

    return removidos

if __name__ == '__main__':
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    print("🧹 Consolidando ementas das matérias conformes...\n")
    print("Removendo apenas de matérias que JÁ ESTÃO CONFORMES (14.800–14.950 chars)\n")

    total_removidos = 0

    for materia in MATERIAS_CONFORMES:
        pasta = os.path.join(BASE_PATH, materia)

        if not os.path.exists(pasta):
            print(f"⚠️ {materia:45} Pasta não encontrada")
            continue

        removidos = consolidar_materia(pasta, materia)

        if removidos:
            total_removidos += len(removidos)
            print(f"✅ {materia:45} Removidos {len(removidos)} arquivo(s)")
            for r in removidos:
                print(f"   🗑️  {r}")
        else:
            print(f"✅ {materia:45} Nenhuma redundância")

    print(f"\n{'='*80}")
    print(f"✅ Consolidação concluída!")
    print(f"   Total de arquivos removidos: {total_removidos}")
    print(f"\nMatérias abaixo do padrão (mantidas com redundâncias):")
    print(f"   ⚠️  EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS (14.747 chars - faltam 53)")
    print(f"   ⚠️  NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS (14.759 chars - faltam 41)")
    print(f"   ⚠️  REFORCO_LINGUAGENS (14.777 chars - faltam 23)")
