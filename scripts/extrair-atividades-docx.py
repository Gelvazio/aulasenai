"""Extrai as atividades em Word (.docx) de uma pasta ATIVIDADES para Markdown e gera o HTML.

Mesma lógica usada em Introdução à TIC: o .md é a fonte única e o HTML sai do gerador
assets/gerador-atividades/gerar_atividades.py (página com folha de respostas gravada no banco e
botões de exportar PDF com gabarito só para o professor; nenhuma resposta certa vai para o HTML).

Uso (na raiz do projeto):
    C:\\Python314\\python.exe scripts\\extrair-atividades-docx.py <pasta ATIVIDADES> [--so-md]

Entrada (na pasta):
    ATIVIDADE-NN-<TEMA>.docx             — itens em tabelas (ITEM, CAPACIDADE, Contexto, Comando,
                                            Alternativas a) a e))
    GABARITO-ATIVIDADE-NN-<TEMA>.docx    — mesma estrutura, com ✅ na alternativa certa
Saída (na pasta):
    ATIVIDADE-NN-<TEMA>-QUESTOES.md      — fonte das questões (termina em QUESTOES.md: fica FORA do
                                            Git, pois traz o gabarito)
    ATIVIDADE-NN-<TEMA>.html             — página gerada (a menos que use --so-md)
    CONTEUDO/GABARITO-ATIVIDADE-NN-<TEMA>.md — cada gabarito do Word em Markdown (fora do Git)
    atividades.json                      — dados da matéria (criado se não existir)
Dependência: python-docx.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

import docx

RAIZ = Path(__file__).resolve().parent.parent
GERADOR = RAIZ / "assets" / "gerador-atividades" / "gerar_atividades.py"
PYTHON = sys.executable
PADRAO_ATIVIDADE = re.compile(r"^ATIVIDADE-(\d+)-(.+)\.docx$", re.I)
PREFIXO_GABARITO = "GABARITO-"
PASTA_CONTEUDO = "CONTEUDO"
ICONES = {"1": "📊", "2": "🖥️", "3": "🔍", "4": "📈"}
DURACOES = {"1": "60 minutos", "2": "90 minutos", "3": "120 minutos", "4": "150 minutos"}
TEMAS = {"1": "Estatística e Progressões", "2": "Conceitos e Fundamentos do Excel",
         "3": "Funções de Busca Avançadas", "4": "Design de Dashboard e KPIs"}
ICONE_PADRAO = "📝"
DURACAO_PADRAO = "90–120 minutos"
LETRAS = "ABCDE"
LIMITE_LETRA_REPETIDA = 0.7
CODIGOS_TURMA = {"AI AIAC 2026/2 V1": "133933"}
MSG_SEM_PASTA = "Pasta não encontrada: "


def ler_cabecalho(documento):
    """Lê do cabeçalho do .docx o docente, curso, unidade curricular e turma.

    Args:
        documento: Documento python-docx.

    Returns:
        Dicionário com docente, curso, uc e turma (vazio nos campos não encontrados).
    """
    texto = documento.tables[0].rows[0].cells[1].text
    dados = {}
    for chave, rotulo in (("docente", "Docente:"), ("uc", "Unidade Curricular:"),
                          ("turma", "Turma:")):
        achado = re.search(rf"{rotulo}\s*(.+)", texto)
        dados[chave] = achado.group(1).strip() if achado else ""
    curso = re.search(r"^Curso\s+(.+)$", texto, flags=re.M)
    dados["curso"] = curso.group(1).strip() if curso else ""
    return dados


def extrair_campo(linhas, rotulo):
    """Pega o texto de um campo ("Contexto:", "Comando:"...) até o próximo rótulo.

    Args:
        linhas: Linhas do item.
        rotulo: Rótulo do campo, com dois pontos.

    Returns:
        Texto do campo em uma linha ("" se ausente).
    """
    rotulos = ("CAPACIDADE:", "Contexto:", "Comando:", "Alternativas:")
    coleta, dentro = [], False
    for linha in linhas:
        if linha.startswith(rotulo):
            dentro = True
            linha = linha[len(rotulo):]
        elif any(linha.startswith(outro) for outro in rotulos):
            dentro = False
        if dentro and linha.strip():
            coleta.append(linha.strip())
    return " ".join(coleta)


def extrair_alternativas(linhas, com_marca=False):
    """Extrai as alternativas a) a e) de um item.

    Args:
        linhas: Linhas do item.
        com_marca: Se True, também devolve a letra marcada com ✅ (documento de gabarito).

    Returns:
        Lista de (letra, texto) e, se com_marca, a letra certa (ou "").
    """
    alternativas, certa = [], ""
    for linha in linhas:
        achado = re.match(r"^([a-eA-E])\)\s*(.+)$", linha.strip())
        if not achado:
            continue
        letra, texto = achado.group(1).upper(), achado.group(2).strip()
        if "✅" in texto:
            certa = letra
            texto = texto.replace("✅", "").strip()
        alternativas.append((letra, texto))
    return (alternativas, certa) if com_marca else alternativas


def ler_itens(caminho, com_marca=False):
    """Lê todos os itens (uma tabela por item) de um .docx.

    Args:
        caminho: Caminho do .docx.
        com_marca: True para ler o gabarito (letra marcada com ✅).

    Returns:
        Lista de dicionários: num, capacidade, contexto, comando, alternativas, gabarito.
    """
    documento = docx.Document(caminho)
    itens = []
    for tabela in documento.tables[1:]:
        texto = tabela.rows[0].cells[0].text
        linhas = texto.splitlines()
        cabecalho = re.match(r"ITEM\s+(\d+)", linhas[0].strip()) if linhas else None
        if not cabecalho:
            continue
        alternativas, certa = extrair_alternativas(linhas, com_marca=True)
        itens.append({
            "num": int(cabecalho.group(1)), "capacidade": extrair_campo(linhas, "CAPACIDADE:"),
            "contexto": extrair_campo(linhas, "Contexto:"),
            "comando": extrair_campo(linhas, "Comando:"),
            "alternativas": alternativas, "gabarito": certa if com_marca else "",
        })
    return itens


def validar_itens(itens, nome):
    """Confere 4 ou 5 alternativas por item e devolve avisos sobre o gabarito.

    Args:
        itens: Itens já com o gabarito.
        nome: Nome do arquivo (para as mensagens).

    Returns:
        Lista de avisos (texto).

    Raises:
        SystemExit: Se faltar gabarito, comando ou alternativas em algum item.
    """
    avisos = []
    for item in itens:
        if not item["comando"] or len(item["alternativas"]) not in (4, 5):
            raise SystemExit(f"{nome} ITEM {item['num']}: comando ou alternativas inválidos")
        if item["gabarito"] not in LETRAS:
            raise SystemExit(f"{nome} ITEM {item['num']}: sem alternativa certa (✅) no gabarito")
    letras = [item["gabarito"] for item in itens]
    mais_comum = max(set(letras), key=letras.count)
    if letras.count(mais_comum) / len(letras) > LIMITE_LETRA_REPETIDA:
        avisos.append(f"{nome}: {letras.count(mais_comum)} de {len(letras)} gabaritos são "
                      f"'{mais_comum}' — confira o gabarito do Word antes de usar")
    return avisos


def montar_markdown(numero, tema, cabecalho, itens):
    """Monta o .md da atividade no formato do gerador (mesmo de Introdução à TIC).

    Args:
        numero: Número da atividade (ex.: "01").
        tema: Tema legível da atividade.
        cabecalho: Dados do cabeçalho do .docx.
        itens: Itens com gabarito.

    Returns:
        Conteúdo Markdown.
    """
    chave = str(int(numero))
    codigo = CODIGOS_TURMA.get(cabecalho["turma"], "")
    turma = cabecalho["turma"] + (f" ({codigo})" if codigo else "")
    capacidades = "; ".join(dict.fromkeys(item["capacidade"] for item in itens))
    letras = ", ".join(sorted({letra for item in itens for letra, _ in item["alternativas"]}))
    partes = [f"""# Atividade: {tema} — {len(itens)} Questões

- **Aula:** {numero}
- **Rótulo da aula:** Atividade {numero}
- **Tema:** {tema}
- **Ícone:** {ICONES.get(chave, ICONE_PADRAO)}
- **Duração:** {DURACOES.get(chave, DURACAO_PADRAO)}
- **Formato:** Múltipla escolha ({letras})
- **Total de questões:** {len(itens)}
- **Pontuação:** 1 ponto por questão correta (total: {len(itens)} pontos)
- **Capacidade avaliada:** {capacidades}
- **Conteúdo-base:** `—`
- **Slides:** `—`
- **Folha de respostas:** sim
- **Exportar PDF com gabarito:** sim
- **Turma:** {turma}

> Fonte única extraída de ATIVIDADE-{numero}-*.docx por scripts/extrair-atividades-docx.py. A linha
> **Gabarito** vem do GABARITO-ATIVIDADE-{numero}-*.docx e NÃO é publicada (arquivo no .gitignore).

---
"""]
    for item in itens:
        partes.append(montar_item(item))
    return "\n".join(partes)


def montar_item(item):
    """Monta o bloco Markdown de um item.

    Args:
        item: Item com capacidade, contexto, comando, alternativas e gabarito.

    Returns:
        Bloco Markdown do item.
    """
    titulo = item["capacidade"].rstrip(".") or f"Questão {item['num']}"
    linhas = [f"## ITEM {item['num']:02d} — {titulo}", ""]
    if item["contexto"]:
        linhas += ["**Contexto:**  ", item["contexto"], ""]
    linhas += ["**Comando:**  ", item["comando"], "", "**Alternativas:**"]
    linhas += [f"- {letra}) {texto}" for letra, texto in item["alternativas"]]
    linhas += ["", f"**Gabarito:** {item['gabarito']}", "", "---", ""]
    return "\n".join(linhas)


def ler_resumo_gabarito(documento):
    """Lê a tabela-resumo do fim do .docx de gabarito (Q1..Qn e a letra de cada uma).

    Args:
        documento: Documento python-docx do gabarito.

    Returns:
        Lista de (questão, letra) ou lista vazia se não houver tabela-resumo.
    """
    tabela = documento.tables[-1]
    if len(tabela.rows) < 2 or not tabela.rows[0].cells[0].text.strip().startswith("Q"):
        return []

    rotulos = [c.text.strip() for c in tabela.rows[0].cells]
    letras = [c.text.replace("✅", "").strip() for c in tabela.rows[1].cells]
    return list(zip(rotulos, letras))


def montar_markdown_gabarito(numero, tema, cabecalho, itens, resumo):
    """Monta o Markdown de um gabarito em Word (itens com ✅ e tabela-resumo).

    Args:
        numero: Número da atividade.
        tema: Tema da atividade.
        cabecalho: Dados do cabeçalho do .docx.
        itens: Itens lidos do gabarito (com a letra certa).
        resumo: Pares (questão, letra) da tabela-resumo.

    Returns:
        Conteúdo Markdown.
    """
    linhas = [f"# Gabarito — Atividade {numero}: {tema}", "",
              f"- **Docente:** {cabecalho['docente']}", f"- **Curso:** {cabecalho['curso']}",
              f"- **Unidade Curricular:** {cabecalho['uc']}", f"- **Turma:** {cabecalho['turma']}",
              "", "> ⚠️ Gabarito com as respostas certas: só o professor. Fora do Git (.gitignore).",
              "", "## Resumo do gabarito", ""]
    if resumo:
        linhas += ["| " + " | ".join(q for q, _ in resumo) + " |",
                   "|" + "---|" * len(resumo), "| " + " | ".join(l for _, l in resumo) + " |"]
    linhas += ["", "## Itens", ""]
    for item in itens:
        linhas += [f"### ITEM {item['num']:02d}", "", f"**Capacidade:** {item['capacidade']}", ""]
        if item["contexto"]:
            linhas += [f"**Contexto:** {item['contexto']}", ""]
        linhas += [f"**Comando:** {item['comando']}", ""]
        linhas += [f"- {letra}) {texto}" + ("  ✅" if letra == item["gabarito"] else "")
                   for letra, texto in item["alternativas"]]
        linhas += ["", f"**Resposta certa:** {item['gabarito']}", "", "---", ""]
    return "\n".join(linhas)


def exportar_gabarito(pasta, caminho):
    """Converte um GABARITO-ATIVIDADE-NN-*.docx em Markdown na pasta CONTEUDO.

    Args:
        pasta: Pasta ATIVIDADES.
        caminho: Caminho do .docx de gabarito.

    Returns:
        Lista de avisos (resumo diferente das alternativas marcadas).
    """
    achado = re.match(r"^GABARITO-ATIVIDADE-(\d+)-(.+)\.docx$", caminho.name, re.I)
    numero, resto = achado.group(1), achado.group(2)
    documento = docx.Document(caminho)
    itens = ler_itens(caminho, com_marca=True)
    resumo = ler_resumo_gabarito(documento)
    tema = TEMAS.get(str(int(numero))) or resto.replace("-", " ").capitalize()
    destino = pasta / PASTA_CONTEUDO / f"GABARITO-ATIVIDADE-{numero}-{resto}.md"
    destino.parent.mkdir(exist_ok=True)
    conteudo = montar_markdown_gabarito(numero, tema, ler_cabecalho(documento), itens, resumo)
    destino.write_text(conteudo, encoding="utf-8")
    print(f"{caminho.name}: {len(itens)} itens -> {PASTA_CONTEUDO}/{destino.name}")
    marcadas = {f"Q{i['num']}": i["gabarito"] for i in itens}
    return [f"{caminho.name}: resumo diz {letra} para {q}, mas o item marca {marcadas.get(q)}"
            for q, letra in resumo if marcadas.get(q) != letra]


def garantir_dados_materia(pasta, cabecalho):
    """Cria o atividades.json da pasta (uc, uc_curta, curso, docente) se ainda não existir.

    Args:
        pasta: Pasta ATIVIDADES.
        cabecalho: Dados do cabeçalho de um .docx.
    """
    caminho = pasta / "atividades.json"
    if caminho.exists():
        return
    dados = {"uc": cabecalho["uc"], "uc_curta": cabecalho["uc"], "curso": cabecalho["curso"],
             "docente": cabecalho["docente"].title()}
    caminho.write_text(json.dumps(dados, ensure_ascii=False, indent=2), encoding="utf-8")


def processar_atividade(pasta, caminho, so_md):
    """Extrai uma atividade para .md e, se pedido, gera o HTML.

    Args:
        pasta: Pasta ATIVIDADES.
        caminho: Caminho do ATIVIDADE-NN-*.docx.
        so_md: Se True, não gera o HTML.

    Returns:
        Lista de avisos.
    """
    achado = PADRAO_ATIVIDADE.match(caminho.name)
    numero, resto = achado.group(1), achado.group(2)
    caminho_gabarito = pasta / (PREFIXO_GABARITO + caminho.name)
    if not caminho_gabarito.exists():
        raise SystemExit(f"{caminho_gabarito.name} não encontrado")
    itens = ler_itens(caminho)
    marcados = {i["num"]: i for i in ler_itens(caminho_gabarito, com_marca=True)}
    for item in itens:
        item["gabarito"] = marcados.get(item["num"], {}).get("gabarito", "")
    avisos = validar_itens(itens, caminho.name)
    cabecalho = ler_cabecalho(docx.Document(caminho))
    garantir_dados_materia(pasta, cabecalho)
    tema = TEMAS.get(str(int(numero))) or resto.replace("-", " ").capitalize()
    destino = pasta / f"ATIVIDADE-{numero}-{resto}-QUESTOES.md"
    destino.write_text(montar_markdown(numero, tema, cabecalho, itens), encoding="utf-8")
    print(f"{caminho.name}: {len(itens)} itens -> {destino.name}")
    if not so_md:
        subprocess.run([PYTHON, str(GERADOR), str(pasta), f"--so={destino.name}"], check=True)
    return avisos


def main():
    """Processa todas as ATIVIDADE-NN-*.docx da pasta informada."""
    argumentos = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(argumentos) != 1:
        raise SystemExit(__doc__)
    pasta = Path(argumentos[0]).resolve()
    if not pasta.is_dir():
        raise SystemExit(MSG_SEM_PASTA + str(pasta))
    so_md = "--so-md" in sys.argv
    avisos = []
    for caminho in sorted(pasta.glob("ATIVIDADE-*.docx")):
        if PADRAO_ATIVIDADE.match(caminho.name):
            avisos += processar_atividade(pasta, caminho, so_md)
    for caminho in sorted(pasta.glob(PREFIXO_GABARITO + "ATIVIDADE-*.docx")):
        avisos += exportar_gabarito(pasta, caminho)
    for aviso in avisos:
        print("AVISO:", aviso)


if __name__ == "__main__":
    main()
