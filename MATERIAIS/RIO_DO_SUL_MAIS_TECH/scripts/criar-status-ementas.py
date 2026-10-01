#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para criar STATUS-EMENTAS.md em cada pasta de matéria
Registra estado atual de cada alteração nas ementas
"""

import os
import re
import unicodedata
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
EMENTA_CURSO = os.path.join(BASE_PATH, f"EMENTA-PRINCIPAL-{os.path.basename(BASE_PATH)}.md")
PADRAO_CH_MATERIA = re.compile(r"\*\*Carga Hor[áa]ria(?: Total)?:\*\*\s*(\d+)\s*(?:h|horas)", re.I)
PADRAO_UC_CURSO = re.compile(r"^### UC \d+ — (.+?) \((\d+)h\)\s*$", re.M)
PALAVRAS_IGNORADAS = {"DE", "DA", "DO", "DAS", "DOS", "E", "A", "O", "PARA"}


def palavras_do_nome(nome):
    """Palavras significativas do nome, em maiúsculas e sem acentos (para comparar pasta e UC)."""
    sem_acento = unicodedata.normalize("NFKD", nome).encode("ascii", "ignore").decode()
    palavras = re.split(r"[^A-Z0-9]+", sem_acento.upper())
    return {p for p in palavras if p and p not in PALAVRAS_IGNORADAS}


def ler_ch_curso():
    """Carga horária de cada UC na ementa do curso: lista de (palavras do nome, horas)."""
    if not os.path.exists(EMENTA_CURSO):
        return []
    texto = open(EMENTA_CURSO, 'r', encoding='utf-8').read()
    return [(palavras_do_nome(nome), int(horas)) for nome, horas in PADRAO_UC_CURSO.findall(texto)]


def ch_da_materia_no_curso(materia, ucs_curso):
    """Horas da UC cujo nome contém todas as palavras da pasta da matéria; None se não achar."""
    palavras_pasta = palavras_do_nome(materia)
    for palavras_uc, horas in ucs_curso:
        if palavras_pasta <= palavras_uc:
            return horas
    return None


def ler_ch_ementa(pasta):
    """Carga horária declarada no EMENTA-CHALKIE-AI.md da matéria; None se não houver."""
    caminho = os.path.join(pasta, "EMENTA-CHALKIE-AI.md")
    if not os.path.exists(caminho):
        return None
    achado = PADRAO_CH_MATERIA.search(open(caminho, 'r', encoding='utf-8').read())
    return int(achado.group(1)) if achado else None


def situacao_ch(ch_ementa, ch_curso):
    """Texto da coluna de conferência da carga horária (ementa da matéria × ementa do curso)."""
    if ch_ementa is None:
        return "❌ Carga horária não informada na ementa da matéria"
    if ch_curso is None:
        return "⚠️ UC não encontrada na ementa do curso"
    if ch_ementa != ch_curso:
        return f"⚠️ DIVERGENTE: ementa do curso tem {ch_curso}h"
    return "✅ Igual à ementa do curso"

def verificar_arquivo(pasta, arquivo):
    """Verifica se arquivo existe e retorna tamanho."""
    caminho = os.path.join(pasta, arquivo)
    if os.path.exists(caminho):
        tamanho = len(open(caminho, 'r', encoding='utf-8').read())
        return True, tamanho
    return False, 0

def gerar_status(materia, pasta, ucs_curso):
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

    ch_ementa = ler_ch_ementa(pasta)
    ch_curso = ch_da_materia_no_curso(materia, ucs_curso)
    ch_texto = f"{ch_ementa}h" if ch_ementa else "—"
    ch_curso_texto = f"{ch_curso}h" if ch_curso else "—"

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

## ⏱️ Carga Horária

| Ementa da matéria | Ementa do curso | Conferência |
|-------------------|-----------------|-------------|
| {ch_texto} | {ch_curso_texto} | {situacao_ch(ch_ementa, ch_curso)} |

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

    ucs_curso = ler_ch_curso()
    for materia in MATERIAS:
        pasta = os.path.join(BASE_PATH, materia)
        if not os.path.isdir(pasta):
            print(f"⚠️ {materia:45} pasta não encontrada, ignorada")
            continue
        status_file = os.path.join(pasta, "STATUS-EMENTAS.md")

        # Gerar status
        conteudo = gerar_status(materia, pasta, ucs_curso)

        # Salvar
        with open(status_file, 'w', encoding='utf-8') as f:
            f.write(conteudo)

        print(f"✅ {materia:45} STATUS-EMENTAS.md criado")

    print("\n✅ Todos os status foram criados!")
