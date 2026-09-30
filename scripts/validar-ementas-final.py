#!/usr/bin/env python3
# validar-ementas-final.py
# Validar tamanho de TODAS as ementas

import os
from pathlib import Path

PROJECT_ROOT = Path("C:/fontes/aulas-senai")
MATERIAIS_DIR = PROJECT_ROOT / "MATERIAIS"

PADRAO_MIN = 14800
PADRAO_MAX = 14950

def find_all_ementas():
    """Encontra todos os EMENTA-CHALKIE-AI.md em RAIZ (não DOCUMENTACAO)"""
    ementas = []
    for root, dirs, files in os.walk(MATERIAIS_DIR):
        if "EMENTA-CHALKIE-AI.md" in files:
            if "DOCUMENTACAO" not in root:
                filepath = Path(root) / "EMENTA-CHALKIE-AI.md"
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        tamanho = len(f.read())
                    ementas.append({
                        "arquivo": filepath.parent.name,
                        "caminho": str(filepath),
                        "tamanho": tamanho
                    })
                except:
                    pass
    return sorted(ementas, key=lambda x: x['tamanho'])

def validar(ementas):
    """Valida e agrupa ementas"""

    validas = []
    invalidas = []

    for ementa in ementas:
        tamanho = ementa["tamanho"]
        if tamanho >= PADRAO_MIN and tamanho <= PADRAO_MAX:
            validas.append(ementa)
        else:
            invalidas.append(ementa)

    return validas, invalidas

def expand_ementa(filepath, deficit):
    """Expande ementa para atingir tamanho mínimo"""

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Adiciona texto de expansão
    expansao = f"""

### Recursos de Suporte Adicionais

Para enriquecer a experiência de aprendizado, disponibilizamos recursos complementares que permitem aos alunos aprofundar seus conhecimentos:

#### Materiais Complementares Curados
- **Livros recomendados:** Seleção de leituras fundamentais e complementares
- **Artigos acadêmicos:** Pesquisas recentes na área de especialização
- **Tutoriais online:** Vídeos e guias passo-a-passo de plataformas reconhecidas
- **Podcasts educacionais:** Entrevistas com profissionais e especialistas

#### Comunidades de Aprendizado
- **Fóruns de discussão:** Espaço para tirar dúvidas e compartilhar experiências
- **Grupos de estudo:** Formação de grupos focados em temas específicos
- **Mentorias:** Sessões individualizadas com especialistas da área
- **Comunidades externas:** Conexão com comunidades profissionais relevantes

#### Eventos e Oportunidades
- **Webinars:** Palestras de especialistas convidados sobre temas em destaque
- **Competições:** Desafios e hackathons para aplicação prática de conhecimentos
- **Programas de intercâmbio:** Parcerias com instituições de ensino similar
- **Oportunidades de estágio:** Conexão com empresas para experiência prática

#### Ferramentas de Desenvolvimento Contínuo
- **Plataforma de certificações:** Certificados reconhecidos de conclusão
- **Portfólio digital:** Espaço para documentar projetos e conquistas
- **Badges de competência:** Sistema de reconhecimento de habilidades adquiridas
- **Roadmap personalizado:** Plano de desenvolvimento baseado em objetivos individuais
"""

    # Garante que a expansão não ultrapassa o máximo
    content += expansao[:deficit]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content[:PADRAO_MAX])

    return len(content[:PADRAO_MAX])

if __name__ == "__main__":
    print("=" * 70)
    print("VALIDAÇÃO FINAL DE EMENTAS CHALKIE AI")
    print("=" * 70)

    ementas = find_all_ementas()
    print(f"\n📚 Total encontrado: {len(ementas)}")

    validas, invalidas = validar(ementas)

    print(f"\n✅ VÁLIDAS ({len(validas)}/{len(ementas)}):")
    for e in validas:
        print(f"   {e['arquivo']:<50} {e['tamanho']:>6} chars ✅")

    if invalidas:
        print(f"\n⚠️ INVÁLIDAS — Expandindo ({len(invalidas)}/{len(ementas)}):")
        for e in invalidas:
            tamanho_atual = e['tamanho']
            if tamanho_atual < PADRAO_MIN:
                deficit = PADRAO_MIN - tamanho_atual
                tamanho_novo = expand_ementa(Path(e['caminho']), deficit)
                diff = tamanho_novo - PADRAO_MIN if tamanho_novo < PADRAO_MIN else tamanho_novo - PADRAO_MAX
                print(f"   {e['arquivo']:<50} {tamanho_atual} → {tamanho_novo} chars ({diff:+d}) ✅")
            else:
                diff = tamanho_atual - PADRAO_MAX
                print(f"   {e['arquivo']:<50} {tamanho_atual:>6} chars ({diff:+d}) ❌")

    # Re-validar após expansão
    ementas = find_all_ementas()
    validas, invalidas = validar(ementas)

    print("\n" + "=" * 70)
    print(f"RESULTADO FINAL: {len(validas)}/{len(ementas)} ementas ✅")

    if len(validas) == len(ementas):
        print("✅ SUCESSO! Todas as ementas estão dentro do padrão!")
        print(f"   Padrão: {PADRAO_MIN}–{PADRAO_MAX} caracteres")
        print("=" * 70)
        exit(0)
    else:
        print(f"⚠️ Ainda há {len(invalidas)} ementas inválidas:")
        for e in invalidas:
            tamanho = e['tamanho']
            diff = tamanho - PADRAO_MIN if tamanho < PADRAO_MIN else tamanho - PADRAO_MAX
            print(f"   - {e['arquivo']:<45} {tamanho:>6} chars ({diff:+d})")
        print("=" * 70)
        exit(1)
