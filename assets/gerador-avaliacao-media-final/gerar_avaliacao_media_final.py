"""Gera a página AVALIACAO-MEDIA-FINAL.html (composição da nota) de uma matéria.

Uso (na raiz do projeto):
    C:\\Python314\\python.exe assets\\gerador-avaliacao-media-final\\gerar_avaliacao_media_final.py
        <pasta ATIVIDADES da matéria> [--propor] [--forcar]
    C:\\Python314\\python.exe assets\\gerador-avaliacao-media-final\\gerar_avaliacao_media_final.py
        --todas [--forcar]

Dados: <pasta>/atividades.json (uc, uc_curta, curso) e <pasta>/media-final.json (composição da
nota: grupos, itens, pontos, pesos, páginas e regras). --propor cria um media-final.json de
proposta (30 atividades / 40 objetivas / 30 prática) a partir das páginas da pasta, sem
sobrescrever. --todas gera a página de todas as matérias de MATERIAIS/ com media-final.json.
Página existente sem o marcador do gerador só é sobrescrita com --forcar.
Plano: docs/gerador-avaliacao-media-final.md
"""
import argparse
import html
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

GERADOR = Path(__file__).resolve().parent
ASSETS = GERADOR.parent
RAIZ = ASSETS.parent
sys.path.insert(0, str(ASSETS / "gerador-menu"))
from tags_menu import montar_tags_menu  # noqa: E402
from tags_header import inserir_header_em_html  # noqa: E402

TEMPLATE = GERADOR / "template_avaliacao_media_final.html"
PASTA_MATERIAIS = RAIZ / "MATERIAIS"
PASTA_IGNORADA = "MATERIAS-GERAIS"
ARQUIVO_MATERIA = "atividades.json"
ARQUIVO_COMPOSICAO = "media-final.json"
ARQUIVO_PAGINA = "AVALIACAO-MEDIA-FINAL.html"
MARCADOR = "gerador-avaliacao-media-final"
TOTAL_PONTOS = 100
TOLERANCIA_PONTOS = 0.001
CASAS_PONTOS = 2
NOTA_MINIMA_PADRAO = 70
TEXTO_SEM_NOTA = "—"
NOTA_MAXIMA = 10
RECUO_LINHA = " " * 28
RECUO_REGRA = " " * 20
PONTOS_PADRAO = {"atividades": 30, "objetiva": 40, "pratica": 30}
PADRAO_ATIVIDADE = re.compile(r"^ATIVIDADES-.*-50-QUESTOES\.html$")
PADRAO_OBJETIVA = re.compile(r"^AVALIACAO-OBJETIVA-(\d+)\.html$")
PADRAO_EXCEL = re.compile(r"^ATIVIDADE-.*?(\d{2})-(\d{2})-(\d{4})\.html$")
PAGINA_PRATICA = "AVALIACAO-PRATICA.html"
PADRAO_NUMERO = re.compile(r"\d+")
PADRAO_DATA_AULA = re.compile(r'data-aula="([^"]*)"')
PADRAO_DATA_TEMA = re.compile(r'data-tema="([^"]*)"')
PADRAO_TITULO = re.compile(r"<title>(.*?)</title>", re.DOTALL)
PADRAO_NEGRITO = re.compile(r"\*\*(.+?)\*\*")
PADRAO_NUMERO_INICIAL = re.compile(r"^\d+\s+")


def escapar(texto):
    """Escapa texto para HTML.

    Args:
        texto: Texto puro.

    Returns:
        Texto seguro para HTML.
    """
    return html.escape(str(texto), quote=True)


def texto_com_negrito(texto):
    """Escapa o texto e converte **trecho** em <strong>trecho</strong>.

    Args:
        texto: Texto com marcação de negrito no estilo Markdown.

    Returns:
        HTML seguro.
    """
    return PADRAO_NEGRITO.sub(r"<strong>\1</strong>", escapar(texto))


def numero_atributo(valor):
    """Formata pontos para atributo data-* (ponto decimal, sem zeros sobrando).

    Args:
        valor: Número de pontos.

    Returns:
        Texto como "3" ou "4.29".
    """
    arredondado = round(float(valor), CASAS_PONTOS)
    if arredondado.is_integer():
        return str(int(arredondado))
    return f"{arredondado:.{CASAS_PONTOS}f}".rstrip("0")


def numero_exibido(valor):
    """Formata pontos para exibir na tabela (vírgula decimal).

    Args:
        valor: Número de pontos.

    Returns:
        Texto como "3" ou "4,29".
    """
    return numero_atributo(valor).replace(".", ",")


def caminho_relativo(destino, pasta):
    """Calcula o caminho relativo com barras normais.

    Args:
        destino: Caminho de destino.
        pasta: Pasta de origem.

    Returns:
        Caminho relativo.
    """
    return os.path.relpath(destino, pasta).replace("\\", "/")


def ler_json(caminho):
    """Lê um arquivo JSON em UTF-8.

    Args:
        caminho: Caminho do arquivo.

    Returns:
        Conteúdo decodificado.

    Raises:
        FileNotFoundError: Se o arquivo não existir.
    """
    return json.loads(Path(caminho).read_text(encoding="utf-8"))


def pontos_do_grupo(grupo):
    """Soma os pontos de um grupo (o próprio campo pontos ou a soma dos itens).

    Args:
        grupo: Grupo da composição.

    Returns:
        Pontos do grupo.
    """
    if "pontos" in grupo:
        return float(grupo["pontos"])
    return sum(float(item["pontos"]) for item in grupo.get("itens", []))


def erros_do_grupo(grupo, pasta):
    """Confere um grupo: id, páginas existentes e pontos dos itens.

    Args:
        grupo: Grupo da composição.
        pasta: Pasta ATIVIDADES da matéria.

    Returns:
        Lista de mensagens de erro (vazia se estiver certo).
    """
    erros = []
    identificador = grupo.get("id", "?")
    if not grupo.get("id"):
        erros.append("grupo sem id")
    paginas = [item["pagina"] for item in grupo.get("itens", []) if item.get("pagina")]
    if grupo.get("pagina"):
        paginas.append(grupo["pagina"])
    for pagina in paginas:
        if not (pasta / pagina).is_file():
            erros.append(f"grupo {identificador}: página não encontrada: {pagina}")
    tem_pontos_proprios = "pontos" in grupo
    soma_itens = sum(float(item["pontos"]) for item in grupo.get("itens", []))
    pontos_divergem = abs(soma_itens - pontos_do_grupo(grupo)) > TOLERANCIA_PONTOS
    if tem_pontos_proprios and grupo.get("itens") and pontos_divergem:
        erros.append(f"grupo {identificador}: itens somam {soma_itens}, "
                     f"grupo diz {grupo['pontos']}")
    return erros


def validar_composicao(composicao, pasta):
    """Confere a composição inteira antes de gerar a página.

    Args:
        composicao: Conteúdo do media-final.json.
        pasta: Pasta ATIVIDADES da matéria.

    Returns:
        Lista de mensagens de erro (vazia se estiver certo).
    """
    grupos = composicao.get("grupos", [])
    if not grupos:
        return ["media-final.json sem grupos"]

    erros = []
    identificadores = [grupo.get("id") for grupo in grupos]
    if len(set(identificadores)) != len(identificadores):
        erros.append("ids de grupo repetidos")
    for grupo in grupos:
        erros.extend(erros_do_grupo(grupo, pasta))
    total = sum(pontos_do_grupo(grupo) for grupo in grupos)
    if abs(total - TOTAL_PONTOS) > TOLERANCIA_PONTOS:
        erros.append(f"os grupos somam {numero_exibido(total)} pontos (precisa ser {TOTAL_PONTOS})")
    nota_minima = composicao.get("nota_minima", NOTA_MINIMA_PADRAO)
    if not 0 <= nota_minima <= TOTAL_PONTOS:
        erros.append(f"nota_minima fora de 0 a {TOTAL_PONTOS}: {nota_minima}")
    return erros


def celula_peso(peso):
    """Monta a célula "Peso no sistema".

    Args:
        peso: Texto do peso (ex.: "20%") ou vazio.

    Returns:
        HTML da célula.
    """
    if not peso:
        return '<td class="media-numero"></td>'
    return f'<td class="media-numero media-peso">{escapar(peso)}</td>'


def celula_resultado(campo, ativo, valor=None):
    """Monta uma célula de resultado (nota ou pontos) preenchida pelo JS.

    Args:
        campo: "nota" ou "pontos".
        ativo: True se a célula recebe valor do banco.
        valor: Valor já conhecido (nota fixa); None mostra "—" até o JS preencher.

    Returns:
        HTML da célula.
    """
    if not ativo:
        return '<td class="media-numero"></td>'
    texto = TEXTO_SEM_NOTA if valor is None else f"{float(valor):.1f}".replace(".", ",")
    return f'<td class="media-numero" data-campo="{campo}">{texto}</td>'


def html_item(identificador, item):
    """Monta a linha de um item (com página = nota do banco; sem página = só descrição).

    Args:
        identificador: Id do grupo.
        item: Item da composição.

    Returns:
        HTML da linha.
    """
    tem_pagina = bool(item.get("pagina"))
    atributos = f'class="media-grupo--{escapar(identificador)}"'
    if tem_pagina:
        atributos += (f' data-grupo="{escapar(identificador)}"'
                      f' data-pontos="{numero_atributo(item["pontos"])}"'
                      f' data-pagina="{escapar(item["pagina"])}"')
    nota_fixa = item.get("nota_fixa") if tem_pagina else None
    pontos_fixos = None
    if nota_fixa is not None:
        atributos += f' data-nota-fixa="{numero_atributo(nota_fixa)}"'
        pontos_fixos = float(nota_fixa) / NOTA_MAXIMA * float(item["pontos"])
    return (f'{RECUO_LINHA}<tr {atributos}><td>{escapar(item["nome"])}</td>'
            f'<td>{escapar(item.get("conteudo", ""))}</td>'
            f'<td class="media-numero">{numero_exibido(item["pontos"])}</td>'
            f'{celula_peso(item.get("peso"))}'
            f'{celula_resultado("nota", tem_pagina, nota_fixa)}'
            f'{celula_resultado("pontos", tem_pagina, pontos_fixos)}</tr>')


def atributos_subtotal(grupo):
    """Monta os atributos da linha de subtotal conforme o tipo do grupo.

    Args:
        grupo: Grupo da composição.

    Returns:
        Tupla (atributos HTML, mostra nota).
    """
    identificador = escapar(grupo["id"])
    pontos = numero_atributo(pontos_do_grupo(grupo))
    if grupo.get("pagina"):
        return (f' data-grupo="{identificador}" data-pontos="{pontos}"'
                f' data-pagina="{escapar(grupo["pagina"])}"', True)
    if grupo.get("nota_subtotal"):
        return f' data-subtotal="{identificador}" data-pontos="{pontos}"', True
    return f' data-subtotal="{identificador}"', False


def html_subtotal(grupo):
    """Monta a linha de subtotal de um grupo.

    Args:
        grupo: Grupo da composição.

    Returns:
        HTML da linha.
    """
    atributos, mostra_nota = atributos_subtotal(grupo)
    return (f'{RECUO_LINHA}<tr class="media-grupo--{escapar(grupo["id"])} media-subtotal"'
            f'{atributos}><td colspan="2">{escapar(grupo["subtotal"])}</td>'
            f'<td class="media-numero">{numero_exibido(pontos_do_grupo(grupo))}</td>'
            f'{celula_peso(grupo.get("peso"))}{celula_resultado("nota", mostra_nota)}'
            f'{celula_resultado("pontos", True)}</tr>')


def html_linhas(grupos):
    """Monta todas as linhas do corpo da tabela, grupo a grupo.

    Args:
        grupos: Grupos da composição.

    Returns:
        HTML das linhas (grupos separados por linha em branco).
    """
    blocos = []
    for grupo in grupos:
        linhas = [html_item(grupo["id"], item) for item in grupo.get("itens", [])]
        linhas.append(html_subtotal(grupo))
        blocos.append("\n".join(linhas))
    return "\n\n".join(blocos)


def html_regras(regras):
    """Monta os itens da lista de regras.

    Args:
        regras: Textos das regras (aceitam **negrito**).

    Returns:
        HTML dos <li>.
    """
    return "\n".join(f"{RECUO_REGRA}<li>{texto_com_negrito(regra)}</li>" for regra in regras)


def montar_pagina(pasta, materia, composicao):
    """Monta o HTML completo da página a partir do template.

    Args:
        pasta: Pasta ATIVIDADES da matéria.
        materia: Conteúdo do atividades.json.
        composicao: Conteúdo do media-final.json.

    Returns:
        HTML da página.
    """
    trocas = {
        "{{ASSETS}}": caminho_relativo(ASSETS, pasta),
        "{{RAIZ}}": caminho_relativo(RAIZ, pasta),
        "{{MENU}}": montar_tags_menu(str(pasta), "    "),
        "{{UC}}": escapar(materia["uc"]),
        "{{UC_CURTA}}": escapar(materia.get("uc_curta", materia["uc"])),
        "{{CURSO}}": escapar(materia["curso"]),
        "{{TOTAL}}": str(TOTAL_PONTOS),
        "{{NOTA_MINIMA}}": numero_atributo(composicao.get("nota_minima", NOTA_MINIMA_PADRAO)),
        "{{LINHAS}}": html_linhas(composicao["grupos"]),
        "{{REGRAS}}": html_regras(composicao.get("regras", [])),
    }
    conteudo = TEMPLATE.read_text(encoding="utf-8")
    for marca, valor in trocas.items():
        conteudo = conteudo.replace(marca, valor)
    return inserir_header_em_html(conteudo, str(pasta))


def pode_sobrescrever(destino, forcar):
    """Diz se a página pode ser gravada (nova, gerada antes ou com --forcar).

    Args:
        destino: Caminho da página.
        forcar: True para sobrescrever página feita à mão.

    Returns:
        True se pode gravar.
    """
    if forcar or not destino.exists():
        return True
    return MARCADOR in destino.read_text(encoding="utf-8")


def gerar_pagina(pasta, forcar=False):
    """Gera a AVALIACAO-MEDIA-FINAL.html de uma pasta ATIVIDADES.

    Args:
        pasta: Pasta ATIVIDADES da matéria.
        forcar: True para sobrescrever página sem o marcador do gerador.

    Returns:
        True se a página foi gravada.
    """
    caminho_composicao = pasta / ARQUIVO_COMPOSICAO
    if not caminho_composicao.is_file():
        print(f"⏭️  {pasta}: sem {ARQUIVO_COMPOSICAO} (use --propor)")
        return False

    composicao = ler_json(caminho_composicao)
    erros = validar_composicao(composicao, pasta)
    if erros:
        print(f"❌ {pasta}:\n   - " + "\n   - ".join(erros))
        return False
    destino = pasta / ARQUIVO_PAGINA
    if not pode_sobrescrever(destino, forcar):
        print(f"⚠️  {destino}: feita à mão (sem o marcador); use --forcar para sobrescrever")
        return False
    conteudo = montar_pagina(pasta, ler_json(pasta / ARQUIVO_MATERIA), composicao)
    destino.write_text(conteudo, encoding="utf-8", newline="\n")
    print(f"✅ {destino}")
    return True


def ler_atributo(caminho, padrao):
    """Lê o primeiro valor de um padrão (data-aula, data-tema, <title>) numa página.

    Args:
        caminho: Página HTML.
        padrao: Expressão regular com um grupo.

    Returns:
        Valor encontrado (sem escapes HTML) ou "".
    """
    achado = padrao.search(caminho.read_text(encoding="utf-8"))
    return html.unescape(achado.group(1).strip()) if achado else ""


def repartir_pontos(total, quantidade):
    """Reparte pontos em partes iguais (2 casas); a última absorve o arredondamento.

    Args:
        total: Pontos a repartir.
        quantidade: Número de partes.

    Returns:
        Lista de pontos que soma exatamente o total.
    """
    if quantidade <= 0:
        return []

    parte = round(total / quantidade, CASAS_PONTOS)
    partes = [parte] * (quantidade - 1)
    return partes + [round(total - sum(partes), CASAS_PONTOS)]


def ordem_natural(caminho):
    """Chave de ordenação pelo primeiro número do nome (sem número vai para o fim).

    Args:
        caminho: Página HTML.

    Returns:
        Tupla para ordenar.
    """
    achado = PADRAO_NUMERO.search(caminho.name)
    return (int(achado.group()) if achado else 10**6, caminho.name)


def ordem_por_data(caminho):
    """Chave de ordenação pela data DD-MM-AAAA do nome.

    Args:
        caminho: Página HTML.

    Returns:
        Data (ano, mês, dia).
    """
    dia, mes, ano = PADRAO_EXCEL.match(caminho.name).groups()
    return (int(ano), int(mes), int(dia))


def item_atividade(caminho):
    """Monta o item de uma atividade de 50 questões.

    Args:
        caminho: Página da atividade.

    Returns:
        Item sem pontos.
    """
    aula = ler_atributo(caminho, PADRAO_DATA_AULA)
    tema = PADRAO_NUMERO_INICIAL.sub("", ler_atributo(caminho, PADRAO_DATA_TEMA))
    return {"nome": f"Atividade Aula {aula}".strip(), "conteudo": tema, "pagina": caminho.name}


def item_objetiva(caminho):
    """Monta o item de uma avaliação objetiva.

    Args:
        caminho: Página da avaliação.

    Returns:
        Item sem pontos.
    """
    numero = PADRAO_OBJETIVA.match(caminho.name).group(1)
    return {"nome": f"Avaliação Objetiva {numero}",
            "conteudo": ler_atributo(caminho, PADRAO_DATA_TEMA), "pagina": caminho.name}


def item_excel(caminho):
    """Monta o item de uma atividade prática de Excel.

    Args:
        caminho: Página da capa da atividade.

    Returns:
        Item sem pontos.
    """
    dia, mes, _ano = PADRAO_EXCEL.match(caminho.name).groups()
    titulo = ler_atributo(caminho, PADRAO_TITULO)
    conteudo = titulo.split("—", 1)[-1].strip()
    return {"nome": f"Atividade Prática de Excel {dia}/{mes}", "conteudo": conteudo,
            "pagina": caminho.name}


def listar_instrumentos(pasta):
    """Encontra as páginas avaliativas da pasta, separadas por grupo.

    Args:
        pasta: Pasta ATIVIDADES da matéria.

    Returns:
        Dicionário grupo → lista de itens (sem pontos); grupos vazios ficam de fora.
    """
    paginas = [arquivo for arquivo in pasta.glob("*.html") if arquivo.is_file()]
    atividades = sorted((p for p in paginas if PADRAO_ATIVIDADE.match(p.name)), key=ordem_natural)
    objetivas = sorted((p for p in paginas if PADRAO_OBJETIVA.match(p.name)), key=ordem_natural)
    excel = sorted((p for p in paginas if PADRAO_EXCEL.match(p.name)), key=ordem_por_data)
    instrumentos = {"atividades": [item_atividade(p) for p in atividades],
                    "objetiva": [item_objetiva(p) for p in objetivas]}
    if (pasta / PAGINA_PRATICA).is_file():
        instrumentos["pratica"] = [{"pagina": PAGINA_PRATICA}]
    else:
        instrumentos["pratica"] = [item_excel(p) for p in excel]
    return {grupo: itens for grupo, itens in instrumentos.items() if itens}


def repartir_grupos(presentes):
    """Distribui os 100 pontos entre os grupos presentes (30/40/30, ausente vai aos outros).

    Args:
        presentes: Ids dos grupos encontrados, na ordem padrão.

    Returns:
        Dicionário grupo → pontos inteiros que somam 100.
    """
    base = sum(PONTOS_PADRAO[grupo] for grupo in presentes)
    pontos = {grupo: round(PONTOS_PADRAO[grupo] * TOTAL_PONTOS / base) for grupo in presentes}
    ultimo = presentes[-1]
    pontos[ultimo] += TOTAL_PONTOS - sum(pontos.values())
    return pontos


def grupo_atividades(itens, pontos):
    """Monta o grupo das atividades (subtotal com nota 0 a 10 e peso do grupo).

    Args:
        itens: Itens das atividades.
        pontos: Pontos do grupo.

    Returns:
        Grupo da composição.
    """
    partes = repartir_pontos(pontos, len(itens))
    for item, parte in zip(itens, partes):
        item["pontos"] = parte
    return {"id": "atividades", "peso": f"{numero_exibido(pontos)}%", "nota_subtotal": True,
            "subtotal": f"Subtotal — {len(itens)} atividades ({numero_exibido(partes[0])} "
                        f"pontos cada)", "itens": itens}


def grupo_por_item(identificador, itens, pontos, descricao):
    """Monta um grupo em que cada item tem peso próprio (objetivas ou práticas de Excel).

    Args:
        identificador: Id do grupo.
        itens: Itens do grupo.
        pontos: Pontos do grupo.
        descricao: Nome do instrumento no plural (ex.: "provas objetivas").

    Returns:
        Grupo da composição.
    """
    partes = repartir_pontos(pontos, len(itens))
    for item, parte in zip(itens, partes):
        item["pontos"] = parte
        item["peso"] = f"{numero_exibido(parte)}%"
    return {"id": identificador, "itens": itens,
            "subtotal": f"Subtotal — {len(itens)} {descricao} "
                        f"({numero_exibido(partes[0])} pontos cada)"}


def grupo_pratica(itens, pontos):
    """Monta o grupo da prática (prova prática única ou atividades práticas de Excel).

    Args:
        itens: Itens encontrados.
        pontos: Pontos do grupo.

    Returns:
        Grupo da composição.
    """
    if itens[0]["pagina"] == PAGINA_PRATICA:
        return {"id": "pratica", "peso": f"{numero_exibido(pontos)}%", "pontos": pontos,
                "pagina": PAGINA_PRATICA, "subtotal": "Subtotal — 1 prova prática", "itens": []}
    return grupo_por_item("pratica", itens, pontos, "atividades práticas")


def texto_pesos(grupos):
    """Escreve a regra do peso no sistema a partir dos grupos.

    Args:
        grupos: Grupos da composição.

    Returns:
        Texto da regra.
    """
    partes = []
    for grupo in grupos:
        if grupo.get("nota_subtotal"):
            partes.append(f"soma das {len(grupo['itens'])} atividades {grupo['peso']} (lançar a "
                          "média delas, de 0 a 10, mostrada no subtotal)")
            continue
        if grupo.get("pagina"):
            partes.append(f"Prova Prática {grupo['peso']}")
            continue
        partes.extend(f"{item['nome']} {item['peso']}" for item in grupo["itens"])
    return ("**Peso no sistema:** " + ", ".join(partes)
            + ". Nota final = soma de cada nota × peso.")


def regras_padrao(grupos, nota_minima):
    """Monta as regras da página para a proposta.

    Args:
        grupos: Grupos da composição.
        nota_minima: Pontos mínimos para aprovação.

    Returns:
        Lista de regras.
    """
    exemplo = next((item for grupo in grupos for item in grupo["itens"] if "pontos" in item),
                   None)
    regras = []
    if exemplo:
        regras.append("Cada instrumento tem nota de 0 a 10, convertida para os pontos dele. "
                      f"Exemplo: nota 8 em \"{exemplo['nome']}\" "
                      f"({numero_exibido(exemplo['pontos'])} pontos) = "
                      f"{numero_exibido(exemplo['pontos'] * 0.8)} pontos.")
    if any(grupo["id"] == "objetiva" for grupo in grupos):
        regras.append("Nas provas objetivas vale a melhor nota entre a avaliação e as "
                      "recuperações.")
    regras.append("Atividade ou prova não feita vale 0 ponto.")
    regras.append(texto_pesos(grupos))
    regras.append(f"**Aprovação: {numero_exibido(nota_minima)} pontos ou mais** "
                  f"(equivale à nota mínima {numero_exibido(nota_minima / 10)}).")
    return regras


def montar_proposta(pasta):
    """Monta a composição de proposta a partir das páginas da pasta.

    Args:
        pasta: Pasta ATIVIDADES da matéria.

    Returns:
        Composição ou None se não houver páginas avaliativas.
    """
    instrumentos = listar_instrumentos(pasta)
    if not instrumentos:
        return None

    pontos = repartir_grupos([grupo for grupo in PONTOS_PADRAO if grupo in instrumentos])
    construtores = {
        "atividades": lambda itens, total: grupo_atividades(itens, total),
        "objetiva": lambda itens, total: grupo_por_item("objetiva", itens, total,
                                                         "provas objetivas"),
        "pratica": grupo_pratica,
    }
    grupos = [construtores[grupo](instrumentos[grupo], pontos[grupo]) for grupo in pontos]
    return {"gerado_em": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "nota_minima": NOTA_MINIMA_PADRAO, "grupos": grupos,
            "regras": regras_padrao(grupos, NOTA_MINIMA_PADRAO)}


def propor_composicao(pasta):
    """Grava um media-final.json de proposta (nunca sobrescreve um existente).

    Args:
        pasta: Pasta ATIVIDADES da matéria.

    Returns:
        True se a proposta foi gravada.
    """
    destino = pasta / ARQUIVO_COMPOSICAO
    if destino.exists():
        print(f"⏭️  {destino}: já existe (não sobrescrito)")
        return False

    proposta = montar_proposta(pasta)
    if not proposta:
        print(f"⏭️  {pasta}: nenhuma página de atividade ou avaliação encontrada")
        return False
    destino.write_text(json.dumps(proposta, ensure_ascii=False, indent=2) + "\n",
                       encoding="utf-8", newline="\n")
    print(f"📝 {destino}: proposta criada (revise os pontos)")
    return True


def listar_pastas_com_composicao():
    """Encontra as pastas ATIVIDADES de MATERIAIS/ que têm media-final.json.

    Returns:
        Lista de pastas ordenada.
    """
    return sorted(caminho.parent for caminho in PASTA_MATERIAIS.rglob(ARQUIVO_COMPOSICAO)
                  if caminho.parent.name == "ATIVIDADES"
                  and PASTA_IGNORADA not in caminho.parts)


def ler_argumentos():
    """Lê os argumentos da linha de comando.

    Returns:
        Argumentos lidos.
    """
    leitor = argparse.ArgumentParser(description="Gera a AVALIACAO-MEDIA-FINAL.html da matéria.")
    leitor.add_argument("pasta", nargs="?", help="pasta ATIVIDADES da matéria")
    leitor.add_argument("--propor", action="store_true", help="cria media-final.json de proposta")
    leitor.add_argument("--todas", action="store_true",
                        help="todas as matérias com media-final.json")
    leitor.add_argument("--forcar", action="store_true", help="sobrescreve página feita à mão")
    return leitor.parse_args()


def main():
    """Executa o gerador conforme os argumentos.

    Returns:
        Código de saída (0 = tudo certo).
    """
    sys.stdout.reconfigure(encoding="utf-8")
    argumentos = ler_argumentos()
    if argumentos.todas:
        resultados = [gerar_pagina(pasta, argumentos.forcar)
                      for pasta in listar_pastas_com_composicao()]
        return 0 if all(resultados) else 1
    if not argumentos.pasta:
        print("Informe a pasta ATIVIDADES da matéria ou use --todas.")
        return 2

    pasta = Path(argumentos.pasta).resolve()
    if not pasta.is_dir():
        print(f"❌ Pasta não encontrada: {pasta}")
        return 2
    if argumentos.propor:
        propor_composicao(pasta)
    return 0 if gerar_pagina(pasta, argumentos.forcar) else 1


if __name__ == "__main__":
    sys.exit(main())
