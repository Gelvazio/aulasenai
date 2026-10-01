#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para criar STATUS-EMENTAS.md em cada pasta de matéria
Registra estado atual de cada alteração nas ementas
"""

import os
import re
from datetime import datetime

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

# Pasta do curso = pasta acima de scripts/, para não depender do local do projeto
BASE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def verificar_arquivo(pasta, arquivo):
    """Verifica se arquivo existe e retorna tamanho."""
    caminho = os.path.join(pasta, arquivo)
    if os.path.exists(caminho):
        tamanho = len(open(caminho, 'r', encoding='utf-8').read())
        return True, tamanho
    return False, 0

def gerar_status(materia, pasta):
    """Gera conteúdo do STATUS-EMENTAS.md."""

    # Verificar arquivo (a versão simplificada EMENTA.md deixou de existir em 2026-10-01)
    chalkie_existe, chalkie_size = verificar_arquivo(pasta, "EMENTA-CHALKIE-AI.md")

    # Determinar status
    chalkie_status = "✅ PRESENTE" if chalkie_existe else "❌ AUSENTE"

    # Verificar conformidade de tamanho
    chalkie_conforme = False
    if chalkie_existe and 14800 <= chalkie_size <= 14950:
        chalkie_conforme = True

    chalkie_tamanho_status = "✅ CONFORME (14.800–14.950 chars)" if chalkie_conforme else f"⚠️ FORA DO PADRÃO ({chalkie_size} chars)"

    # Determinar fase
    if not chalkie_existe:
        fase = "⚠️ FASE 1: EMENTA-CHALKIE-AI.md pendente"
    elif not chalkie_conforme:
        fase = "🔄 FASE 2: EMENTA-CHALKIE-AI.md criada mas fora do padrão de tamanho"
    else:
        fase = "✅ FASE 3: Ementa pronta e conforme"

    # Gerar markdown
    conteudo = f"""# STATUS-EMENTAS — {materia}

**Última atualização:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## 📊 Status Atual

| Arquivo | Status | Tamanho | Observações |
|---------|--------|---------|-------------|
| **EMENTA-CHALKIE-AI.md** | {chalkie_status} | {chalkie_size if chalkie_existe else "—"} chars | {chalkie_tamanho_status} |

---

## 🎯 Fase Atual

{fase}

---

## 📋 Checklist de Completude

- [{'x' if chalkie_existe else ' '}] EMENTA-CHALKIE-AI.md foi criada
- [{'x' if chalkie_conforme else ' '}] EMENTA-CHALKIE-AI.md está dentro do padrão 14.800–14.950 chars
- [ ] Conteúdo foi revisado por professor
- [ ] Estrutura Chalkie AI foi validada
- [ ] Pronto para produção

---

## 📝 Histórico de Alterações

| Data | Ação | Detalhes |
|------|------|----------|
| {datetime.now().strftime('%Y-%m-%d')} | Inicialização | Status criado automaticamente |

---

## ⚙️ Próximos Passos

1. Se fase 1: Criar EMENTA-CHALKIE-AI.md a partir da UC na EMENTA-PRINCIPAL do curso
2. Se fase 2: Executar expandir-ementas-especializadas.py para atingir 14.800–14.950 chars
3. Se fase 3: Validar conteúdo e fazer commit

---

**Documento de controle:** Atualizar este arquivo SEMPRE que alterar ementas nesta pasta
"""

    return conteudo

if __name__ == '__main__':
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    print("📝 Criando STATUS-EMENTAS.md em cada pasta de matéria...\n")

    for materia in MATERIAS:
        pasta = os.path.join(BASE_PATH, materia)
        if not os.path.isdir(pasta):
            print(f"⚠️ {materia:45} pasta não encontrada, ignorada")
            continue
        status_file = os.path.join(pasta, "STATUS-EMENTAS.md")

        # Gerar status
        conteudo = gerar_status(materia, pasta)

        # Salvar
        with open(status_file, 'w', encoding='utf-8') as f:
            f.write(conteudo)

        print(f"✅ {materia:45} STATUS-EMENTAS.md criado")

    print("\n✅ Todos os status foram criados!")
