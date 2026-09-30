#!/usr/bin/env python3
# consolidar-ementas.py
# Consolidar estrutura de ementas Chalkie AI

import os
import shutil
import json
from pathlib import Path
from collections import defaultdict

PROJECT_ROOT = Path("C:/fontes/aulas-senai")
MATERIAIS_DIR = PROJECT_ROOT / "MATERIAIS"

def get_file_size(filepath):
    """Retorna tamanho do arquivo em caracteres"""
    if not filepath.exists():
        return 0
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return len(f.read())
    except:
        return 0

def find_ementas():
    """Encontra todos os arquivos EMENTA-CHALKIE-AI.md"""
    ementas = []

    for root, dirs, files in os.walk(MATERIAIS_DIR):
        if "EMENTA-CHALKIE-AI.md" in files:
            filepath = Path(root) / "EMENTA-CHALKIE-AI.md"
            size = get_file_size(filepath)

            is_doc_folder = "DOCUMENTACAO" in str(filepath)

            parts = filepath.parts
            if "MATERIAIS" in parts:
                idx = parts.index("MATERIAIS")
                if len(parts) > idx + 2:
                    disciplina = parts[idx + 2]
                else:
                    disciplina = "UNKNOWN"
            else:
                disciplina = "UNKNOWN"

            ementas.append({
                "path": str(filepath),
                "size": size,
                "is_documentation": is_doc_folder,
                "disciplina": disciplina
            })

    return ementas

def identify_duplicates(ementas):
    """Identifica pares de duplicatas (RAIZ + DOCUMENTACAO)"""
    by_disciplina = defaultdict(list)

    for ementa in ementas:
        by_disciplina[ementa["disciplina"]].append(ementa)

    duplicates = {}
    for disc, items in by_disciplina.items():
        if len(items) > 1:
            duplicates[disc] = items

    return duplicates

def consolidate(ementas):
    """Consolidar: mover para RAIZ, deletar DOCUMENTACAO"""

    duplicates = identify_duplicates(ementas)

    report = {
        "total_ementas": len(ementas),
        "duplicates_found": len(duplicates),
        "actions": []
    }

    for disc, items in duplicates.items():
        print(f"\n🔍 Processando: {disc}")
        print(f"   Encontradas {len(items)} versões")

        raiz_versions = [e for e in items if not e["is_documentation"]]
        doc_versions = [e for e in items if e["is_documentation"]]

        if raiz_versions and doc_versions:
            raiz_to_keep = max(raiz_versions, key=lambda x: x["size"])

            for ementa in items:
                if ementa["path"] != raiz_to_keep["path"]:
                    print(f"   ❌ Deletando: {ementa['path']} ({ementa['size']} chars)")
                    try:
                        os.remove(ementa["path"])
                        report["actions"].append({
                            "action": "delete",
                            "path": ementa["path"],
                            "size": ementa["size"]
                        })
                    except Exception as e:
                        print(f"   ⚠️ Erro ao deletar: {e}")

            print(f"   ✅ Mantendo: {raiz_to_keep['path']} ({raiz_to_keep['size']} chars)")
            report["actions"].append({
                "action": "keep",
                "path": raiz_to_keep["path"],
                "size": raiz_to_keep["size"]
            })

    return report

def save_report(report, filepath):
    """Salva relatório de consolidação"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    print("=" * 60)
    print("CONSOLIDANDO EMENTAS CHALKIE AI")
    print("=" * 60)

    print("\n📂 Buscando arquivos EMENTA-CHALKIE-AI.md...")
    ementas = find_ementas()
    print(f"✅ Encontradas {len(ementas)} ementas")

    print("\n🔍 Identificando duplicatas...")
    duplicates = identify_duplicates(ementas)
    print(f"⚠️ {len(duplicates)} disciplinas com duplicatas")

    print("\n🔄 Consolidando...")
    report = consolidate(ementas)

    report_path = PROJECT_ROOT / "CONSOLIDACAO-EMENTAS-RELATORIO.json"
    save_report(report, str(report_path))
    print(f"\n✅ Relatório salvo: {report_path}")

    print("\n" + "=" * 60)
    print("CONSOLIDAÇÃO CONCLUÍDA")
    print("=" * 60)
