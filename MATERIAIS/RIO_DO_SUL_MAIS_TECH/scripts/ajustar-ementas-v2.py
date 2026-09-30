#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para ajustar ementas com remoção MÍNIMA (trim final)
"""

import os

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
BACKUP_PATH = r"C:\fontes\aulas-senai\MATERIAIS\RIO_DO_SUL_MAIS_TECH"

def restaurar_original(materia):
    """Restaura versão original do GitHub/git."""
    caminho = os.path.join(BASE_PATH, materia, "EMENTA-CHALKIE-AI.md")
    os.system(f'cd "{BASE_PATH}" && git checkout -- "{materia}/EMENTA-CHALKIE-AI.md"')

def ajustar_ementa_v2(caminho, chars_remover):
    """Remove apenas o necessário de forma minimalista."""

    with open(caminho, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    tamanho = len(conteudo)

    # Remover apenas do final enquanto acima de 14950
    while tamanho > 14950:
        # Remover caracteres do final (antes do marcador de fim)
        # Procurar último parágrafo completo
        linhas = conteudo.rstrip().split('\n')
        if len(linhas) > 1:
            linhas.pop()  # Remove última linha
            conteudo = '\n'.join(linhas) + '\n'
            tamanho = len(conteudo)
        else:
            break

    return conteudo

if __name__ == '__main__':
    print("🔧 Ajustando ementas (v2 — remoção mínima)...\n")

    # Restaurar originals primeiro
    print("📥 Restaurando originals do git...")
    for materia in MATERIAS.keys():
        restaurar_original(materia)

    print("\n🔄 Ajustando com remoção mínima...\n")

    for materia, chars_alvo in MATERIAS.items():
        caminho = os.path.join(BASE_PATH, materia, "EMENTA-CHALKIE-AI.md")

        if os.path.exists(caminho):
            conteudo_novo = ajustar_ementa_v2(caminho, chars_alvo)
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
