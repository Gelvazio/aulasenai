#!/usr/bin/env python3
# reorganizar-todas-ementas.py
# Mover TODAS ementas para RAIZ e remover de DOCUMENTACAO

import os
import shutil
from pathlib import Path

PROJECT_ROOT = Path("C:/fontes/aulas-senai")
MATERIAIS_DIR = PROJECT_ROOT / "MATERIAIS"

def find_all_ementas():
    """Encontra TODOS os EMENTA-CHALKIE-AI.md"""
    ementas_por_disciplina = {}

    for root, dirs, files in os.walk(MATERIAIS_DIR):
        if "EMENTA-CHALKIE-AI.md" in files:
            filepath = Path(root) / "EMENTA-CHALKIE-AI.md"
            is_doc_folder = "DOCUMENTACAO" in str(filepath)

            parts = filepath.parts
            if "MATERIAIS" in parts:
                idx = parts.index("MATERIAIS")
                disciplina = parts[idx + 2]
            else:
                disciplina = "UNKNOWN"

            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    tamanho = len(f.read())
            except:
                tamanho = 0

            if disciplina not in ementas_por_disciplina:
                ementas_por_disciplina[disciplina] = []

            ementas_por_disciplina[disciplina].append({
                "path": filepath,
                "tamanho": tamanho,
                "is_doc_folder": is_doc_folder
            })

    return ementas_por_disciplina

def reorganizar(ementas_por_disciplina):
    """Reorganiza: mover para RAIZ, deletar DOCUMENTACAO"""

    print(f"\n{'='*70}")
    print(f"REORGANIZANDO {len(ementas_por_disciplina)} DISCIPLINAS")
    print(f"{'='*70}\n")

    deletadas = 0
    mantidas = 0

    for disciplina, versions in ementas_por_disciplina.items():
        print(f"🔍 {disciplina}")

        raiz = [v for v in versions if not v["is_doc_folder"]]
        doc = [v for v in versions if v["is_doc_folder"]]

        # Caso 1: Tem versão em RAIZ, deletar DOCUMENTACAO
        if raiz:
            print(f"   ✅ RAIZ: {raiz[0]['path'].parent.name} ({raiz[0]['tamanho']} chars)")
            mantidas += 1

            for d in doc:
                print(f"   ❌ Removendo DOCUMENTACAO: {d['path']} ({d['tamanho']} chars)")
                try:
                    d["path"].unlink()
                    deletadas += 1
                except Exception as e:
                    print(f"   ⚠️ Erro: {e}")

        # Caso 2: Só tem versão em DOCUMENTACAO, mover para RAIZ
        elif doc:
            # Pega a versão com maior tamanho
            fonte = max(doc, key=lambda x: x["tamanho"])

            # Define destino
            destino_dir = fonte["path"].parent.parent  # sobe um nível de DOCUMENTACAO
            destino_path = destino_dir / "EMENTA-CHALKIE-AI.md"

            print(f"   🔄 Movendo DOCUMENTACAO → RAIZ")
            print(f"      De: {fonte['path']} ({fonte['tamanho']} chars)")
            print(f"      Para: {destino_path} ({fonte['tamanho']} chars)")

            try:
                shutil.move(str(fonte["path"]), str(destino_path))
                mantidas += 1
                deletadas += len(doc) - 1

                # Deletar outras versões em DOCUMENTACAO
                for d in doc:
                    if d["path"] != fonte["path"]:
                        try:
                            d["path"].unlink()
                        except:
                            pass
            except Exception as e:
                print(f"   ⚠️ Erro ao mover: {e}")

    print(f"\n{'='*70}")
    print(f"✅ REORGANIZAÇÃO CONCLUÍDA")
    print(f"   Mantidas em RAIZ: {mantidas}")
    print(f"   Deletadas em DOCUMENTACAO: {deletadas}")
    print(f"{'='*70}\n")

if __name__ == "__main__":
    print("\n" + "="*70)
    print("REORGANIZAR EMENTAS — MOVER PARA RAIZ")
    print("="*70)

    ementas_por_disciplina = find_all_ementas()
    print(f"\n📚 Encontradas {len(ementas_por_disciplina)} disciplinas")

    reorganizar(ementas_por_disciplina)
