#!/usr/bin/env python3
"""Script para renomear e reformatar arquivos de conteudo das aulas de Fundamentos de UI/UX."""

import os
import re
import subprocess
from pathlib import Path

MAPEAMENTO_ARQUIVOS = {
    "4-Resolução-de-Problemas-Análise-Crítica.md": "AULA-04-RESOLUCAO-DE-PROBLEMAS-ANALISE-CRITICA.md",
    "5-Resolução-de-Problemas-Análise-de-Cenários.md": "AULA-05-RESOLUCAO-DE-PROBLEMAS-ANALISE-DE-CENARIOS.md",
    "6-User-Interface-Definição-e-Tipos.md": "AULA-06-USER-INTERFACE-DEFINICAO-E-TIPOS-DE-INTERFACE.md",
    "7-Layout-de-Interfaces-Padrões-de-Leitura-e-Alinhamento.md": "AULA-07-LAYOUT-PADROES-DE-LEITURA-F-E-Z-E-ALINHAMENTO.md",
    "9-Dinâmica-da-Interface-Eventos-e-Navegação.md": "AULA-09-EVENTOS-E-NAVEGACAO-NA-INTERFACE.md",
    "12-Jornada-do-Usuário-e-Pesquisa.md": "AULA-12-JORNADA-DO-USUARIO-OBJETIVOS-PUBLICO-ALVO-PESQUISA.md",
    "13-Usabilidade-Interfaces-Amigáveis-e-Intuitividade.md": "AULA-13-USABILIDADE-FRIENDLY-E-INTUITIVIDADE.md",
    "14-Estratégias-de-Coleta.md": "AULA-14-ESTRATEGIAS-DE-COLETA-INFORMACOES-DETERMINACAO-APLICACAO.md",
    "15-Coleta-de-Feedbacks-e-Resolução-de-Conflitos.md": "AULA-15-COLETA-DE-FEEDBACKS-E-RESOLUCAO-DE-CONFLITOS.md",
    "16-Determinação-de-Escopo-do-Projeto-de-Interface.md": "AULA-16-DETERMINACAO-DE-ESCOPO-DO-PROJETO-DE-INTERFACE.md",
    "17-Prototipagem-Storyboard-e-Protótipos-de-Papel.md": "AULA-17-PROTOTIPAGEM-STORYBOARD-E-PROTOTIPOS-DE-PAPEL.md",
    "18-Mock-Ups-Digitais-e-Criação.md": "AULA-18-MOCK-UPS-DIGITAIS-E-PROCESSO-DE-CRIACAO.md",
}

PASTA_CONTEUDO = Path("MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/CONTEUDO")
PASTA_RAIZ = Path("C:/fontes/aulasenai")

def extrair_numero_arquivo(nome_arquivo):
    match = re.match(r'^(\d+)', nome_arquivo)
    return match.group(1) if match else "XX"

def extrair_conteudo_slides(conteudo):
    linhas = conteudo.split('\n')
    conteudo_organizado = []
    for linha in linhas:
        linha = linha.strip()
        if not linha or linha.startswith('## Slide') or linha.startswith('# ') and not linha.startswith('##'):
            continue
        conteudo_organizado.append(linha)
    return '\n'.join(conteudo_organizado)

def processar_arquivo(arquivo_antigo, arquivo_novo):
    caminho_antigo = PASTA_CONTEUDO / arquivo_antigo
    caminho_novo = PASTA_CONTEUDO / arquivo_novo
    
    if not caminho_antigo.exists():
        if caminho_novo.exists():
            print(f"[PULADO] {arquivo_antigo} ja convertido")
            return "ja_existe"
        print(f"[AVISO] Arquivo nao encontrado: {arquivo_antigo}")
        return False
    
    numero_aula = extrair_numero_arquivo(arquivo_antigo)
    
    with open(caminho_antigo, 'r', encoding='utf-8') as f:
        conteudo = f.read()
    
    conteudo_slides = extrair_conteudo_slides(conteudo)
    
    novo_conteudo = f"""# Aula {numero_aula.zfill(2)} — {arquivo_novo.replace('.md', '').replace('-', ' ')}

**Matéria:** Fundamentos de UI/UX  
**Curso:** Técnico em Informática para Internet  
**Carga horária:** 4 h  
**Conhecimentos da ementa:** (preencher)  
**Capacidades:** (preencher)  
**Estratégias:** Exposição dialogada, análise de exemplos  
**Prática:** (preencher)

## Indicadores

(preencher conforme materia.json)

## Objetivos

(preencher conforme slides)

## Roteiro da aula

| Momento | Tempo (min) | O que acontece |
|----------|-------------|----------------|
| (preencher) | | |
| **Total** | **240** | 4 h com intervalo |

## Conteúdo

{conteudo_slides}

## Exercícios em sala

(preencher conforme slides)

## Leitura complementar

(preencher)

## Referências

- EMENTA-CHALKIE-AI.md v2.0
- EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md

## Glossário

(preencher)

## Anexos

- Slides: CONTEUDO/{arquivo_antigo.replace('.md', '.pdf')}
"""
    
    with open(caminho_novo, 'w', encoding='utf-8') as f:
        f.write(novo_conteudo)
    
    os.remove(caminho_antigo)
    print(f"[OK] {arquivo_antigo} -> {arquivo_novo}")
    return True

def fazer_commit(mensagem):
    os.chdir(PASTA_RAIZ)
    subprocess.run(["git", "add", "-A"], check=True, capture_output=True)
    subprocess.run(["git", "commit", "-m", mensagem], check=True, capture_output=True)
    print(f"[COMMIT] {mensagem}")

def fazer_push():
    os.chdir(PASTA_RAIZ)
    subprocess.run(["git", "push"], check=True, capture_output=True)
    print(f"[PUSH] Push realizado")

def main():
    os.chdir(PASTA_RAIZ)
    print("Iniciando conversao...")
    
    processados = 0
    pulados = 0
    
    for arquivo_antigo, arquivo_novo in MAPEAMENTO_ARQUIVOS.items():
        resultado = processar_arquivo(arquivo_antigo, arquivo_novo)
        if resultado == "ja_existe":
            pulados += 1
        elif resultado:
            numero_aula = extrair_numero_arquivo(arquivo_antigo)
            fazer_commit(f"#500.{numero_aula} — Aula {numero_aula} renomeada e reformatada")
            processados += 1
    
    print(f"Resumo: {processados} convertidos, {pulados} pulados")
    
    if processados > 0:
        fazer_push()

if __name__ == "__main__":
    main()
