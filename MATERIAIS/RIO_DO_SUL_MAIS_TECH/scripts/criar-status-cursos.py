#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gera MATERIAIS/STATUS-EMENTAS-CURSOS.md medindo as ementas reais de todos os cursos.

Cada pasta de MATERIAIS/ (exceto MATERIAS-GERAIS) é um curso; cada subpasta dele é uma matéria.
O tamanho vem direto do EMENTA-CHALKIE-AI.md; os STATUS-EMENTAS.md das matérias não são lidos.
"""

import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

PASTA_MATERIAIS = Path(__file__).resolve().parents[2]
ARQUIVO_SAIDA = PASTA_MATERIAIS / "STATUS-EMENTAS-CURSOS.md"
ARQUIVO_EMENTA = "EMENTA-CHALKIE-AI.md"
TAMANHO_MINIMO = 14800
TAMANHO_MAXIMO = 14950
MARCA_EMENTA_GENERICA = "Reconhecer conceitos"
PASTAS_IGNORADAS = {"MATERIAS-GERAIS"}
SUBPASTAS_IGNORADAS = {"scripts", "docs", "graphify-out"}

SITUACAO_CONFORME = "✅ Conforme"
SITUACAO_FORA_TAMANHO = "❌ Fora do tamanho"
SITUACAO_GENERICA = "⚠️ Genérica (modelo, sem conteúdo próprio)"
SITUACAO_SEM_EMENTA = "⛔ Sem ementa"

PERMISSAO_VERIFICAR = "VERIFICAR"
PERMISSAO_IGNORAR = "IGNORAR"
PERMISSAO_PADRAO = PERMISSAO_IGNORAR
PERMISSOES_VALIDAS = {PERMISSAO_VERIFICAR, PERMISSAO_IGNORAR}
PREFIXO_SECAO_CURSO = "## 🎓 "
TITULO_SECAO_PERMISSAO = "## 🔐 STATUS-PERMISSAO-EMENTA"


@dataclass
class Materia:
    """Situação da ementa de uma matéria."""

    nome: str
    caracteres: int
    tem_ementa: bool
    generica: bool
    permissao: str = PERMISSAO_PADRAO

    @property
    def tamanho_conforme(self):
        return TAMANHO_MINIMO <= self.caracteres <= TAMANHO_MAXIMO

    @property
    def situacao(self):
        if not self.tem_ementa:
            return SITUACAO_SEM_EMENTA
        if self.generica:
            return SITUACAO_GENERICA
        if not self.tamanho_conforme:
            return SITUACAO_FORA_TAMANHO
        return SITUACAO_CONFORME

    @property
    def verificar(self):
        return self.permissao == PERMISSAO_VERIFICAR

    @property
    def pendente(self):
        """Só conta como pendência a ementa liberada para verificação."""
        return self.verificar and self.situacao != SITUACAO_CONFORME


def formatar_numero(numero):
    """Formata inteiro com ponto de milhar (padrão brasileiro)."""
    return f"{numero:,}".replace(",", ".")


def listar_subpastas(pasta, ignoradas):
    """Retorna as subpastas visíveis, em ordem alfabética, exceto as ignoradas."""
    return sorted(
        p for p in pasta.iterdir()
        if p.is_dir() and p.name not in ignoradas and not p.name.startswith((".", "_"))
    )


def ler_permissoes_existentes():
    """Lê do consolidado atual a STATUS-PERMISSAO-EMENTA marcada à mão pelo usuário.

    Retorna {curso: permissao}, lido da tabela "Curso | STATUS-PERMISSAO-EMENTA" da seção 🔐.
    """
    if not ARQUIVO_SAIDA.exists():
        return {}
    permissoes = {}
    dentro_da_secao = False
    for linha in ARQUIVO_SAIDA.read_text(encoding="utf-8").splitlines():
        if linha.startswith("## "):
            dentro_da_secao = linha.startswith(TITULO_SECAO_PERMISSAO)
            continue
        celulas = [c.strip().strip("*` ") for c in linha.strip().strip("|").split("|")]
        eh_linha_de_curso = dentro_da_secao and len(celulas) == 2
        if not eh_linha_de_curso:
            continue
        # Aceita "permissão | curso" (formato atual) e "curso | permissão" (formato antigo).
        valores = [c.upper() for c in celulas]
        if valores[0] in PERMISSOES_VALIDAS:
            permissoes[celulas[1]] = valores[0]
        elif valores[1] in PERMISSOES_VALIDAS:
            permissoes[celulas[0]] = valores[1]
    return permissoes


def ler_materia(pasta, permissao):
    """Mede a ementa de uma pasta de matéria."""
    ementa = pasta / ARQUIVO_EMENTA
    if not ementa.exists():
        return Materia(pasta.name, 0, False, False, permissao)
    texto = ementa.read_text(encoding="utf-8")
    return Materia(pasta.name, len(texto), True, MARCA_EMENTA_GENERICA in texto, permissao)


def ler_cursos():
    """Retorna ({curso: [Materia, ...]}, {curso: permissao}) para os cursos de MATERIAIS/.

    A permissão é do curso inteiro: todas as ementas do curso herdam o mesmo valor.
    """
    existentes = ler_permissoes_existentes()
    cursos = {}
    permissoes = {}
    for pasta_curso in listar_subpastas(PASTA_MATERIAIS, PASTAS_IGNORADAS):
        curso = pasta_curso.name
        permissoes[curso] = existentes.get(curso, PERMISSAO_PADRAO)
        cursos[curso] = [
            ler_materia(p, permissoes[curso])
            for p in listar_subpastas(pasta_curso, SUBPASTAS_IGNORADAS)
        ]
    return cursos, permissoes


def contar_por_situacao(materias):
    """Conta as matérias em cada situação."""
    ordem = (SITUACAO_CONFORME, SITUACAO_FORA_TAMANHO, SITUACAO_GENERICA, SITUACAO_SEM_EMENTA)
    return {situacao: sum(m.situacao == situacao for m in materias) for situacao in ordem}


def montar_resumo_geral(cursos):
    """Tabela com uma linha por curso."""
    linhas = [
        "| Curso | Matérias | ✅ Conformes | ❌ Fora do tamanho | ⚠️ Genéricas | ⛔ Sem ementa |",
        "|---|---|---|---|---|---|",
    ]
    todas = []
    for curso, materias in cursos.items():
        todas.extend(materias)
        contagem = list(contar_por_situacao(materias).values())
        linhas.append(f"| {curso} | {len(materias)} | " + " | ".join(map(str, contagem)) + " |")
    total = list(contar_por_situacao(todas).values())
    linhas.append(f"| **TOTAL** | **{len(todas)}** | " + " | ".join(f"**{n}**" for n in total) + " |")
    return "\n".join(linhas)


def montar_secao_curso(curso, materias):
    """Seção de um curso com a tabela de matérias."""
    if not materias:
        return f"{PREFIXO_SECAO_CURSO}{curso}\n\n⛔ Nenhuma pasta de matéria criada.\n"
    linhas = [
        f"{PREFIXO_SECAO_CURSO}{curso}\n",
        "| Matéria | Caracteres | Situação |",
        "|---|---|---|",
    ]
    for m in materias:
        caracteres = formatar_numero(m.caracteres) if m.tem_ementa else "—"
        linhas.append(f"| {m.nome} | {caracteres} | {m.situacao} |")
    return "\n".join(linhas) + "\n"


def montar_tabela_permissoes(permissoes):
    """Tabela com os cursos, um embaixo do outro, e a STATUS-PERMISSAO-EMENTA de cada um."""
    linhas = ["| STATUS-PERMISSAO-EMENTA | Curso |", "|---|---|"]
    linhas.extend(f"| {permissao} | {curso} |" for curso, permissao in permissoes.items())
    liberados = sum(p == PERMISSAO_VERIFICAR for p in permissoes.values())
    total = (f"**{PERMISSAO_VERIFICAR}:** {liberados} · "
             f"**{PERMISSAO_IGNORAR}:** {len(permissoes) - liberados} (de {len(permissoes)} cursos)")
    return "\n".join(linhas) + "\n\n" + total


def montar_pendencias(cursos, permissoes):
    """Lista de pendências (só cursos em VERIFICAR) agrupadas por situação."""
    grupos = {SITUACAO_FORA_TAMANHO: [], SITUACAO_GENERICA: [], SITUACAO_SEM_EMENTA: []}
    for curso, materias in cursos.items():
        for m in materias:
            if m.pendente:
                grupos[m.situacao].append(f"- {curso} / {m.nome}")
    cursos_vazios = [
        f"- {curso}" for curso, materias in cursos.items()
        if not materias and permissoes[curso] == PERMISSAO_VERIFICAR
    ]
    partes = []
    for situacao, itens in grupos.items():
        partes.append(f"### {situacao} ({len(itens)})\n\n" + ("\n".join(itens) or "- nenhuma"))
    partes.append(f"### ⛔ Cursos sem pasta de matéria ({len(cursos_vazios)})\n\n"
                  + ("\n".join(cursos_vazios) or "- nenhum"))
    return "\n\n".join(partes)


def gerar_conteudo(cursos, permissoes):
    """Monta o Markdown completo do consolidado."""
    agora = datetime.now()
    secoes = "\n".join(montar_secao_curso(c, m) for c, m in cursos.items())
    return f"""{TITULO_SECAO_PERMISSAO}

{montar_tabela_permissoes(permissoes)}

> Vale para o curso inteiro. Curso em `{PERMISSAO_IGNORAR}` tem todas as ementas ignoradas (fora de
> pendências, ajustes e geração). Padrão: `{PERMISSAO_PADRAO}`. Troque à mão para
> `{PERMISSAO_VERIFICAR}` nesta tabela: o script preserva o valor ao regenerar.

---

# STATUS-EMENTAS-CURSOS — Consolidado

**Última atualização:** {agora:%Y-%m-%d %H:%M:%S}
**Escopo:** todos os cursos em `MATERIAIS/` (exceto `MATERIAS-GERAIS/`)
**Fonte:** tamanho medido direto em cada `{ARQUIVO_EMENTA}`
**Padrão de tamanho:** {formatar_numero(TAMANHO_MINIMO)}–{formatar_numero(TAMANHO_MAXIMO)} caracteres

**Legenda:** {SITUACAO_CONFORME} · {SITUACAO_FORA_TAMANHO} · {SITUACAO_GENERICA} · {SITUACAO_SEM_EMENTA}

---

## 📊 Resumo por curso (situação medida, independe da permissão)

{montar_resumo_geral(cursos)}

---

## 📌 Pendências (só ementas em {PERMISSAO_VERIFICAR})

{montar_pendencias(cursos, permissoes)}

---

{secoes}
---

## ⚙️ Como atualizar

```powershell
C:\\Python314\\python.exe MATERIAIS\\RIO_DO_SUL_MAIS_TECH\\scripts\\criar-status-cursos.py
```

**Documento de controle central:** regenerar sempre que alterar ementas de qualquer matéria.
"""


def main():
    """Mede as ementas e grava o consolidado."""
    sys.stdout.reconfigure(encoding="utf-8")
    cursos, permissoes = ler_cursos()
    ARQUIVO_SAIDA.write_text(gerar_conteudo(cursos, permissoes), encoding="utf-8")
    print(f"✅ {ARQUIVO_SAIDA} gerado ({len(cursos)} cursos)")


if __name__ == "__main__":
    main()
