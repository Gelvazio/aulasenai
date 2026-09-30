#!/usr/bin/env python3
"""
Script para alterar a cor de todos os textos nos slides PPTX para preto.
Preserva formatação (bold, itálico, tamanho) e apenas muda a cor RGB.
"""

import sys
import os
from pathlib import Path
from pptx import Presentation
from pptx.util import Pt
from pptx.enum.dml import MSO_THEME_COLOR
from pptx.dml.color import RGBColor

def change_text_to_black(prs):
    """
    Percorre todas as formas e textos de uma apresentação,
    alterando a cor para preto (RGB 0, 0, 0).
    """
    black_color = RGBColor(0, 0, 0)
    changed_count = 0

    # Iterar por cada slide
    for slide_idx, slide in enumerate(prs.slides):
        print(f"  Processando slide {slide_idx + 1}...", end=" ")

        # Iterar por cada shape (forma) no slide
        for shape in slide.shapes:
            if hasattr(shape, "text_frame"):
                # Texto em formas normais
                for paragraph in shape.text_frame.paragraphs:
                    for run in paragraph.runs:
                        if run.font.color.type is not None:
                            run.font.color.rgb = black_color
                            changed_count += 1

            # Tabelas
            if shape.has_table:
                table = shape.table
                for row in table.rows:
                    for cell in row.cells:
                        for paragraph in cell.text_frame.paragraphs:
                            for run in paragraph.runs:
                                if run.font.color.type is not None:
                                    run.font.color.rgb = black_color
                                    changed_count += 1

        print(f"✓")

    return changed_count

def main():
    pptx_folder = Path(r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\AULAS-CHALKIE-AI-VERSAO-FINAL")

    # Arquivos PPTX a processar
    files = [
        "1-Matemática-Aplicada-à-Gestão.pptx",
        "2-Excel-Básico-e-Intermediário-para-Gestão.pptx",
        "3-Excel-Avançado-e-Visualização-de-Dados.pptx",
        "4-Dashboards-Executivos-e-Projeto-Final-Integrado.pptx",
        "APRESENTACAO UNIDADE CURRICULAR.pptx",
    ]

    total_changes = 0

    for filename in files:
        pptx_path = pptx_folder / filename

        if not pptx_path.exists():
            print(f"⚠️  Arquivo não encontrado: {filename}")
            continue

        print(f"\n📄 Processando: {filename}")

        try:
            # Carregar apresentação
            prs = Presentation(str(pptx_path))

            # Alterar cores
            changes = change_text_to_black(prs)
            total_changes += changes

            # Salvar em arquivo temporário primeiro
            temp_path = str(pptx_path) + ".tmp"
            prs.save(temp_path)

            # Remover arquivo original e renomear temp
            os.remove(str(pptx_path))
            os.rename(temp_path, str(pptx_path))

            print(f"   ✅ Salvo com sucesso! ({changes} elementos alterados)")

        except Exception as e:
            print(f"   ❌ Erro ao processar: {e}")
            import traceback
            traceback.print_exc()
            return 1

    print(f"\n✅ CONCLUÍDO!")
    print(f"   Total de elementos alterados: {total_changes}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
