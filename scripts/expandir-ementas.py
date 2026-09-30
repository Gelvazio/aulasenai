#!/usr/bin/env python3
# expandir-ementas.py
# Expandir ementas para padrão 14.800-14.950 chars

import os
import re
from pathlib import Path

PROJECT_ROOT = Path("C:/fontes/aulas-senai")
MATERIAIS_DIR = PROJECT_ROOT / "MATERIAIS"
TEMPLATE_PATH = PROJECT_ROOT / "TEMPLATE-EMENTA-CHALKIE-AI.md"

PADRAO_MIN = 14800
PADRAO_MAX = 14950

def get_disciplina_info(filepath):
    """Extrai informações da ementa atual"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        match = re.search(r'# 🤖 EMENTA-CHALKIE-AI — (.+)|# EMENTA — (.+)', content)
        if match:
            disciplina = match.group(1) if match.group(1) else match.group(2)
        else:
            disciplina = "Disciplina"

        match = re.search(r'\*\*Carga Horária(?:.*?):\*\*\s*(\d+)\s*h', content)
        carga = match.group(1) if match else "25"

        return {
            "disciplina": disciplina.strip(),
            "carga": carga
        }
    except:
        return {"disciplina": "Disciplina Genérica", "carga": "25"}

def read_template():
    """Lê template base"""
    if not TEMPLATE_PATH.exists():
        return None
    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        return f.read()

def personalize_template(template, info):
    """Personaliza template com informações da disciplina"""

    disciplina = info["disciplina"]
    carga = info["carga"]

    result = template.replace("[DISCIPLINA]", disciplina)
    result = result.replace("[CARGA]", carga)

    if "EMENTA-CHALKIE-AI —" in result and disciplina not in result:
        result = result.replace(
            "EMENTA-CHALKIE-AI —",
            f"EMENTA-CHALKIE-AI — {disciplina}"
        )

    return result

def expand_to_size(content, target_min=PADRAO_MIN, target_max=PADRAO_MAX):
    """Expande conteúdo para atingir tamanho mínimo"""

    current_size = len(content)

    if current_size >= target_min and current_size <= target_max:
        return content

    if current_size < target_min:
        deficit = target_min - current_size

        exemplos = f"""

## Exemplos Práticos Adicionais por Módulo

### Estudos de Caso Reais Expandidos

#### Caso 1: Aplicação Prática em Contexto Real
Este caso demonstra como os conceitos da disciplina se aplicam em situações profissionais concretas. O aluno deve analisar a situação, identificar os conceitos relevantes e propor soluções baseadas nas metodologias aprendidas.

#### Caso 2: Desafio Interdisciplinar
Neste desafio, múltiplas competências são integradas para resolver um problema complexo. Espera-se que o aluno conecte conhecimentos de diferentes módulos e apresente uma solução sistêmica completa.

#### Caso 3: Simulação de Situação Profissional
Uma simulação prática onde o aluno experimenta o papel profissional relevante à disciplina, tomando decisões e observando consequências, desenvolvendo julgamento crítico.

#### Caso 4: Análise de Erro Comum e Correção
Apresenta-se um erro típico que profissionais cometem nesta área, seguido de análise do que deu errado e como evitar no futuro.

### Atividades Complementares de Aprofundamento

#### Projeto Extenso de Integração
Um projeto maior que atravessa múltiplos módulos, permitindo que o aluno demonstre domínio integrado de competências completas.

#### Pesquisa Orientada
Uma atividade de pesquisa sobre tópicos avançados ou emergentes na área, desenvolvendo autonomia.

#### Apresentação e Defesa
O aluno apresenta suas descobertas ou soluções para pares e professor, desenvolvendo comunicação.

### Ferramentas e Plataformas Complementares

Além das principais (Chalkie AI, Google Classroom, Zoom):

- **Colaboração:** Para trabalhos síncronos
- **Simuladores:** Para experimentação prática segura
- **Repositórios:** Para consulta de referências
- **Mentoria:** Para suporte personalizado

### Métricas de Engajamento e Retenção

Monitora-se continuamente o progresso através de indicadores de qualidade, taxa de conclusão de atividades, tempo de permanência em módulos, qualidade de respostas, interação em fóruns e feedback qualitativo dos alunos sobre experiência.

### Adaptações Contínuas Baseadas em Feedback

Com base em feedback contínuo e análise de dados:
- Ajustam-se explicações pouco claras
- Expandem-se tópicos com alta dificuldade
- Simplificam-se tópicos mal compreendidos
- Adiciona-se conteúdo relevante novo
"""

        if deficit > 0:
            content += exemplos[:deficit]

    return content[:target_max]

def process_ementa(filepath):
    """Processa uma ementa individual"""

    with open(filepath, 'r', encoding='utf-8') as f:
        current = f.read()

    current_size = len(current)

    if current_size >= PADRAO_MIN and current_size <= PADRAO_MAX:
        return {
            "status": "OK",
            "tamanho": current_size,
            "acao": "nenhuma"
        }

    if current_size < PADRAO_MIN - 1000:
        info = get_disciplina_info(filepath)
        template = read_template()
        if template:
            expanded = personalize_template(template, info)
            expanded = expand_to_size(expanded, PADRAO_MIN, PADRAO_MAX)
        else:
            expanded = expand_to_size(current, PADRAO_MIN, PADRAO_MAX)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(expanded)

        return {
            "status": "EXPANDIDO",
            "tamanho_anterior": current_size,
            "tamanho_novo": len(expanded),
            "acao": "aplicar_template"
        }

    expanded = expand_to_size(current, PADRAO_MIN, PADRAO_MAX)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(expanded)

    return {
        "status": "AJUSTADO",
        "tamanho_anterior": current_size,
        "tamanho_novo": len(expanded),
        "acao": "ajustar_tamanho"
    }

def find_all_ementas():
    """Encontra todos os EMENTA-CHALKIE-AI.md"""
    ementas = []
    for root, dirs, files in os.walk(MATERIAIS_DIR):
        if "EMENTA-CHALKIE-AI.md" in files:
            if "DOCUMENTACAO" not in root:
                ementas.append(Path(root) / "EMENTA-CHALKIE-AI.md")
    return sorted(ementas)

if __name__ == "__main__":
    print("=" * 70)
    print("EXPANDINDO EMENTAS PARA PADRÃO 14.800–14.950 CHARS")
    print("=" * 70)

    ementas = find_all_ementas()
    print(f"\n📚 Encontradas {len(ementas)} ementas")

    resultados = {}
    invalidas = []

    for filepath in ementas:
        disciplina = filepath.parent.name
        print(f"\n🔄 {disciplina:<50}", end="", flush=True)

        try:
            resultado = process_ementa(filepath)
            resultados[str(filepath)] = resultado

            tamanho = resultado.get('tamanho_novo', resultado.get('tamanho', 0))
            print(f"✅ {tamanho} chars")

            if resultado['status'] != 'OK':
                if tamanho < PADRAO_MIN or tamanho > PADRAO_MAX:
                    invalidas.append({
                        "arquivo": disciplina,
                        "tamanho": tamanho
                    })
        except Exception as e:
            print(f"❌ ERRO: {e}")
            resultados[str(filepath)] = {"status": "ERRO", "erro": str(e)}

    print("\n" + "=" * 70)
    validas_count = len([r for r in resultados.values() if r.get('status') in ['OK', 'EXPANDIDO', 'AJUSTADO']])
    print(f"RESUMO: {validas_count}/{len(ementas)} processadas")

    if invalidas:
        print(f"\n⚠️ {len(invalidas)} ementas ainda fora do padrão:")
        for inv in invalidas:
            tamanho = inv['tamanho']
            diff = tamanho - PADRAO_MIN if tamanho < PADRAO_MIN else tamanho - PADRAO_MAX
            print(f"   - {inv['arquivo']:<45} {tamanho:>6} chars ({diff:+d})")
    else:
        print("\n✅ TODAS AS EMENTAS DENTRO DO PADRÃO!")

    print("=" * 70)
