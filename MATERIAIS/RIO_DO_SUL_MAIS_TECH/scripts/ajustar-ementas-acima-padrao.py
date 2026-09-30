#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para ajustar ementas que estão ACIMA do padrão (>14.950 chars)
Remove seções menos críticas de forma inteligente para atingir 14.800–14.950
"""

import os
import re

BASE_PATH = r"C:\fontes\aulas-senai\MATERIAIS\RIO_DO_SUL_MAIS_TECH"

# Matérias que estão acima e precisam ser ajustadas
MATERIAS_ACIMA = [
    "EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS",
    "NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS",
    "REFORCO_LINGUAGENS"
]

# Seções a remover em ordem (menos críticas primeiro)
SECOES_PARA_REMOVER = [
    (r'\n---\n\n## 🔍 XIII\..*?(?=\n---|\n##|\Z)', "XIII. FAQ"),
    (r'\n---\n\n## 🤖 XII\..*?(?=\n---|\n##|\Z)', "XII. Guia Chalkie"),
    (r'\n---\n\n## 📋 XI\..*?(?=\n---|\n##|\Z)', "XI. Checklist"),
    (r'\n---\n\n## ✅ X\..*?(?=\n---|\n##|\Z)', "X. Métricas"),
    (r'\n---\n\n## 💡 IX\..*?(?=\n---|\n##|\Z)', "IX. Exemplos"),
    (r'\n---\n\n## 🔗 VIII\..*?(?=\n---|\n##|\Z)', "VIII. Integração"),
]

def ajustar_ementa(caminho_ementa, nome_materia):
    """Ajusta tamanho de ementa removendo seções até atingir padrão."""

    with open(caminho_ementa, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    tamanho_atual = len(conteudo)
    tamanho_alvo = 14875  # Meio do intervalo

    if tamanho_atual <= 14950:
        return conteudo, tamanho_atual, "OK"

    # Quantidade a remover
    a_remover = tamanho_atual - 14950

    print(f"\n   Processando {nome_materia}")
    print(f"   Tamanho atual: {tamanho_atual} chars (acima por {a_remover} chars)")

    secoes_removidas = []

    # Tentar remover seções até atingir tamanho correto
    for pattern, nome_secao in SECOES_PARA_REMOVER:
        if len(conteudo) <= 14950:
            break

        # Encontrar e remover seção
        match = re.search(pattern, conteudo, re.DOTALL | re.IGNORECASE)

        if match:
            conteudo_temp = conteudo[:match.start()] + conteudo[match.end():]
            tamanho_novo = len(conteudo_temp)

            if tamanho_novo <= 14950:
                print(f"   ✅ Removido: {nome_secao} ({match.end() - match.start()} chars)")
                conteudo = conteudo_temp
                secoes_removidas.append(nome_secao)
                break
            elif tamanho_novo < len(conteudo):
                # Mesmo que ainda acima, remover para deixar mais próximo
                print(f"   ✅ Removido: {nome_secao} ({match.end() - match.start()} chars)")
                conteudo = conteudo_temp
                secoes_removidas.append(nome_secao)

    # Se ainda acima, fazer truncagem no final
    tamanho_final = len(conteudo)
    if tamanho_final > 14950:
        print(f"   ⚠️  Ainda acima ({tamanho_final} chars), fazendo truncagem final...")
        # Remover parágrafos do final
        linhas = conteudo.rstrip().split('\n')

        while len(conteudo) > 14950 and len(linhas) > 10:
            linhas.pop()
            conteudo = '\n'.join(linhas) + '\n'

        tamanho_final = len(conteudo)
        print(f"   ✅ Truncado para: {tamanho_final} chars")

    status = "AJUSTADO" if secoes_removidas else "TRUNCADO"
    return conteudo, tamanho_final, status

if __name__ == '__main__':
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    print("🔧 Ajustando ementas que estão acima do padrão...\n")

    dentro = 0
    ajustadas = 0

    for materia in MATERIAS_ACIMA:
        pasta = os.path.join(BASE_PATH, materia)
        ementa_chalkie = os.path.join(pasta, "EMENTA-CHALKIE-AI.md")

        if not os.path.exists(ementa_chalkie):
            print(f"❌ {materia:45} Não encontrado")
            continue

        conteudo_novo, tamanho, status = ajustar_ementa(ementa_chalkie, materia)

        # Salvar
        with open(ementa_chalkie, 'w', encoding='utf-8') as f:
            f.write(conteudo_novo)

        conforme = 14800 <= tamanho <= 14950
        symbol = "✅" if conforme else "⚠️"

        if conforme:
            dentro += 1

        ajustadas += 1
        print(f"{symbol} {materia:45} {tamanho:5} chars [{status}]")

    print(f"\n{'='*80}")
    print(f"✅ Ajuste concluído!")
    print(f"   Ementas ajustadas: {ajustadas}/3")
    print(f"   Conformes (14.800–14.950): {dentro}/3")
