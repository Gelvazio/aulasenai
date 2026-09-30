#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Análise de Materiais SENAI — Versão Corrigida
Verifica estrutura de disciplinas e gera relatório de pendências
Atualiza index.html com status de cada matéria
"""

import os
import json
from pathlib import Path
from datetime import datetime

# Configurações
PROJECT_ROOT = Path(__file__).parent
MATERIAIS_BASE = PROJECT_ROOT / "MATERIAIS" / "RIO_DO_SUL_MAIS_TECH"

# Estrutura esperada
REQUIRED_FOLDERS = {
    "DOCUMENTACAO": "Documentação",
    "CONTEUDO": "Conteúdo",
    "SLIDES": "Apresentações",
    "ATIVIDADES": "Atividades",
    "AVALIACOES": "Avaliações"
}

REQUIRED_FILES = {
    "DOCUMENTACAO/EMENTA.md": "Ementa",
    "DOCUMENTACAO/EMENTA-CHALKIE-AI.md": "Ementa IA ⭐",
    "DOCUMENTACAO/INDEX.md": "Índice",
    "DOCUMENTACAO/PLANO-AULAS.md": "Plano",
}


class DisciplinaAnalyzer:
    """Analisa uma disciplina"""

    def __init__(self, path):
        self.path = Path(path)
        self.nome = self.path.name
        self.status = {}
        self.pendencias = []
        self.completo = True

    def analisar(self):
        """Análise completa"""
        self._check_folders()
        self._check_files()
        self._check_apostila()

        return {
            'nome': self.nome,
            'path': str(self.path),
            'completo': self.completo,
            'status': self.status,
            'pendencias': self.pendencias
        }

    def _check_folders(self):
        """Verifica pastas obrigatórias"""
        for folder, descricao in REQUIRED_FOLDERS.items():
            folder_path = self.path / folder
            existe = folder_path.exists() and folder_path.is_dir()
            self.status[f"Pasta: {folder}"] = "✅" if existe else "❌"

            if not existe:
                self.completo = False

    def _check_files(self):
        """Verifica arquivos obrigatórios"""
        for file_path, descricao in REQUIRED_FILES.items():
            full_path = self.path / file_path
            existe = full_path.exists() and full_path.is_file()
            status = "✅" if existe else "❌"
            self.status[f"Arquivo: {file_path}"] = status

            if not existe:
                self.completo = False
                self.pendencias.append(f"Criar arquivo: {file_path}")

    def _check_apostila(self):
        """Verifica apostilas"""
        conteudo_path = self.path / "CONTEUDO"
        if not conteudo_path.exists():
            return

        files = list(conteudo_path.glob("APOSTILA*"))
        if files:
            self.status["Apostila"] = f"✅ ({len(files)} arquivos)"
        else:
            self.status["Apostila"] = "❌"
            self.completo = False
            self.pendencias.append("❌ Nenhuma apostila encontrada em CONTEUDO/")


def analisar_todas_disciplinas():
    """Analisa todas as disciplinas"""
    resultado = {
        'data': datetime.now().isoformat(),
        'total': 0,
        'completas': 0,
        'incompletas': 0,
        'disciplinas': []
    }

    if not MATERIAIS_BASE.exists():
        print(f"❌ Pasta não encontrada: {MATERIAIS_BASE}")
        return resultado

    # Listar todas as subpastas
    for item in MATERIAIS_BASE.iterdir():
        if item.is_dir() and not item.name.startswith('.'):
            print(f"\n📚 Analisando: {item.name}")

            analyzer = DisciplinaAnalyzer(item)
            info = analyzer.analisar()
            resultado['disciplinas'].append(info)
            resultado['total'] += 1

            if info['completo']:
                resultado['completas'] += 1
                print(f"   ✅ Completo")
            else:
                resultado['incompletas'] += 1
                print(f"   ❌ Incompleto ({len(info['pendencias'])} pendências)")
                for pend in info['pendencias'][:3]:
                    print(f"      - {pend}")

    return resultado


def salvar_relatorio(resultado):
    """Salva relatório JSON"""
    relatorio_path = PROJECT_ROOT / "ANALISE-MATERIAS-RELATORIO.json"

    with open(relatorio_path, 'w', encoding='utf-8') as f:
        json.dump(resultado, f, indent=2, ensure_ascii=False)

    print(f"\n📄 Relatório salvo: {relatorio_path}")


def main():
    """Função principal"""
    print("🔍 Iniciando análise de materiais SENAI...\n")

    resultado = analisar_todas_disciplinas()

    print(f"\n{'='*60}")
    print(f"📊 RESUMO DA ANÁLISE")
    print(f"{'='*60}")
    print(f"Total de disciplinas: {resultado['total']}")
    print(f"✅ Completas: {resultado['completas']}")
    print(f"⏳ Incompletas: {resultado['incompletas']}")
    if resultado['total'] > 0:
        print(f"Taxa de completude: {int(resultado['completas']/resultado['total']*100)}%")
    print(f"{'='*60}\n")

    # Salvar relatório
    salvar_relatorio(resultado)

    print("✅ Análise concluída com sucesso!")


if __name__ == "__main__":
    main()
