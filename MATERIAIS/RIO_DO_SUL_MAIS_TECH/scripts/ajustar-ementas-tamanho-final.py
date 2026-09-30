#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script FINAL para ajustar ementas exatamente ao intervalo 14.800–14.950 chars
Remove seções menos críticas se acima, adiciona se abaixo
"""

import os
import re

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

# Seções que podem ser removidas (em ordem de prioridade — remover primeiro as menos críticas)
SECOES_REMOVER = [
    (r'\n---\n\n## 🔍 XIII\..*?\n\n(?=---|\Z)', "XIII. FAQ"),
    (r'\n---\n\n## 🤖 XII\..*?\n\n(?=---|\Z)', "XII. Guia Chalkie"),
    (r'\n---\n\n## 📋 XI\..*?\n\n(?=---|\Z)', "XI. Checklist"),
    (r'\n---\n\n## ✅ X\..*?\n\n(?=---|\Z)', "X. Métricas"),
    (r'\n---\n\n## 💡 IX\..*?\n\n(?=---|\Z)', "IX. Exemplos"),
    (r'\n---\n\n## 🔗 VIII\..*?\n\n(?=---|\Z)', "VIII. Integração"),
    (r'\n---\n\n## 📚 VII\..*?\n\n(?=---|\Z)', "VII. Estratégias"),
    (r'\n---\n\n## 🗓️ VI\..*?\n\n(?=---|\Z)', "VI. Aulas"),
]

def contar_chars(texto):
    """Conta caracteres com precisão."""
    return len(texto)

def truncar_graciosamente(texto, tamanho_alvo=14920):
    """Trunca texto mantendo estrutura Markdown válida."""

    if len(texto) <= tamanho_alvo:
        return texto

    # Remover último parágrafo/seção
    linhas = texto.rstrip().split('\n')

    while len(texto) > tamanho_alvo and len(linhas) > 10:
        linhas.pop()
        texto = '\n'.join(linhas) + '\n'

    # Se ainda acima, remover seções por regex
    for pattern, nome_secao in SECOES_REMOVER:
        if len(texto) <= tamanho_alvo:
            break

        texto_temp = re.sub(pattern, '', texto, flags=re.DOTALL)

        if len(texto_temp) <= tamanho_alvo:
            texto = texto_temp
            break

    return texto

def ajustar_tamanho_final(caminho_chalkie):
    """Ajusta tamanho da ementa para caber em 14.800–14.950."""

    with open(caminho_chalkie, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    tamanho = contar_chars(conteudo)

    # Se já está no intervalo, devolver
    if 14800 <= tamanho <= 14950:
        return conteudo, tamanho, "OK"

    # Se muito pequeno (< 14800), devolver como está (não há mais conteúdo para adicionar)
    if tamanho < 14800:
        return conteudo, tamanho, "ABAIXO"

    # Se muito grande (> 14950), remover seções
    if tamanho > 14950:
        conteudo_ajustado = truncar_graciosamente(conteudo, 14920)
        tamanho_novo = contar_chars(conteudo_ajustado)

        if tamanho_novo <= 14950:
            return conteudo_ajustado, tamanho_novo, "REDUZIDO"
        else:
            # Se ainda acima, fazer truncagem agressiva
            conteudo_ajustado = conteudo[:14900]
            tamanho_novo = contar_chars(conteudo_ajustado)
            return conteudo_ajustado, tamanho_novo, "TRUNCADO"

    return conteudo, tamanho, "DESCONHECIDO"

if __name__ == '__main__':
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    print("🎯 Ajustando ementas ao intervalo exato 14.800–14.950...\n")

    dentro = 0
    abaixo = 0
    acima = 0

    for materia in MATERIAS:
        pasta = os.path.join(BASE_PATH, materia)
        ementa_chalkie = os.path.join(pasta, "EMENTA-CHALKIE-AI.md")

        if os.path.exists(ementa_chalkie):
            conteudo_novo, tamanho, status = ajustar_tamanho_final(ementa_chalkie)

            # Salvar
            with open(ementa_chalkie, 'w', encoding='utf-8') as f:
                f.write(conteudo_novo)

            conforme = 14800 <= tamanho <= 14950

            if conforme:
                symbol = "✅"
                dentro += 1
            elif tamanho < 14800:
                symbol = "⬇️"
                abaixo += 1
            else:
                symbol = "⬆️"
                acima += 1

            print(f"{symbol} {materia:45} {tamanho:5} chars [{status}]")
        else:
            print(f"❌ {materia:45} Não encontrado")

    print(f"\n📊 Resultado Final:")
    print(f"   ✅ Conformes: {dentro}/8")
    print(f"   ⬇️ Abaixo do padrão: {abaixo}/8")
    print(f"   ⬆️ Acima do padrão: {acima}/8")
