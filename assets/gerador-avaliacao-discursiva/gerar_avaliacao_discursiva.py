"""Gera a página de uma avaliação discursiva e o seed SQL dos seus tópicos.

Uso (na raiz do projeto):
    C:\\Python314\\python.exe assets\\gerador-avaliacao-discursiva\\gerar_avaliacao_discursiva.py
        <pasta ATIVIDADES da matéria> [nome da fonte .md]

Fonte: <pasta>/CONTEUDO/AVALIACAO-PRATICA.md (questões com Contexto, Comando e Tópicos) e,
se existir, <pasta>/CONTEUDO/AVALIACAO-PRATICA-GABARITO.md (padrão de resposta, fora do Git).
Saídas: <pasta>/AVALIACAO-PRATICA.html e database/<data>-<nome>-seed-atividades.sql (fora do Git).
Plano: docs/avaliacao-pratica-discursiva-itic.md
"""
import html
import json
import re
import sys
from datetime import date
from pathlib import Path

GERADOR = Path(__file__).resolve().parent
ASSETS = GERADOR.parent
RAIZ = ASSETS.parent
sys.path.insert(0, str(ASSETS / "gerador-menu"))
from tags_menu import montar_tags_menu  # noqa: E402
from tags_header import inserir_header_em_html  # noqa: E402

sys.path.insert(0, str(ASSETS / "gerador-capacidades"))
import capacidades as cap  # noqa: E402

TEMPLATE = GERADOR / "template_avaliacao_discursiva.html"
PASTA_FONTES = "CONTEUDO"
FONTE_PADRAO = "AVALIACAO-PRATICA.md"
SUFIXO_GABARITO = "-GABARITO.md"
ARQUIVO_DADOS = "atividades.json"
PASTA_SQL = RAIZ / "database"
MAXIMO_CARACTERES = 3000
PONTOS_POR_QUESTAO = 1.0
TOLERANCIA_PONTOS = 0.001
SEPARADOR_ITEM = re.compile(r"^## ITEM\s+", re.MULTILINE)
PADRAO_META = re.compile(r"^- \*\*(.+?):\*\*\s*(.+)$", re.MULTILINE)
PADRAO_CABECALHO = re.compile(r"^(\d+)\s*[—-]\s*(.+)$")
PADRAO_TOPICO = re.compile(r"^- ([a-z])\)\s*(.+?)\s*\((\d+(?:,\d+)?)\)\s*$", re.MULTILINE)
PADRAO_ORIENTACAO = re.compile(r"^\*\*(.+?):\*\*\s*(.+)$", re.MULTILINE)
PADRAO_NEGRITO = re.compile(r"\*\*(.+?)\*\*")
PADRAO_GABARITO = re.compile(r"^### ITEM\s+(\d+)-([a-z])\s*$", re.MULTILINE)
ROTULOS_SECAO = ("Contexto", "Comando", "Tópicos")
CAIXA_CAPACIDADE_TEXTO = '''                <div class="content-box">
                    <div class="content-label">🎯 CAPACIDADE AVALIADA</div>
                    <div class="content-text">{texto}</div>
                </div>'''
RECUO_QUADRO = " " * 16


def escapar(texto):
    """Escapa texto para HTML.

    Args:
        texto: Texto puro.

    Returns:
        Texto seguro para HTML.
    """
    return html.escape(str(texto), quote=True)


def texto_sql(valor):
    """Escapa um texto para literal SQL entre aspas simples (None vira null).

    Args:
        valor: Texto a escapar.

    Returns:
        Literal SQL.
    """
    if valor is None:
        return "null"
    return "'" + str(valor).replace("'", "''") + "'"


def ler_metadados(texto):
    """Lê os metadados "- **Chave:** valor" do cabeçalho (antes do primeiro item).

    Args:
        texto: Conteúdo completo do .md.

    Returns:
        Dicionário chave → valor.
    """
    cabecalho = SEPARADOR_ITEM.split(texto, maxsplit=1)[0]
    return {chave.strip(): valor.strip() for chave, valor in PADRAO_META.findall(cabecalho)}


def ler_orientacoes(texto):
    """Lê os parágrafos "**Rótulo:** texto" do cabeçalho (empresa fictícia, como responder).

    Args:
        texto: Conteúdo completo do .md.

    Returns:
        Lista de pares (rótulo, texto).
    """
    cabecalho = SEPARADOR_ITEM.split(texto, maxsplit=1)[0]
    return PADRAO_ORIENTACAO.findall(cabecalho)


def extrair_secao(bloco, rotulo):
    """Extrai o texto de uma seção "**Rótulo:**" até a próxima seção conhecida.

    Args:
        bloco: Texto de um item.
        rotulo: Nome da seção (Contexto, Comando ou Tópicos).

    Returns:
        Texto da seção, sem espaços nas pontas ('' se não existir).
    """
    outros = "|".join(re.escape(r) for r in ROTULOS_SECAO if r != rotulo)
    padrao = rf"\*\*{re.escape(rotulo)}:\*\*\s*(.*?)(?=\n\*\*(?:{outros}):\*\*|\n---|\Z)"
    achado = re.search(padrao, bloco, re.DOTALL)
    return achado.group(1).strip() if achado else ""


def ler_topicos(texto_topicos):
    """Lê os tópicos "- a) enunciado (0,5)".

    Args:
        texto_topicos: Texto da seção Tópicos.

    Returns:
        Lista de dicionários com letra, número, enunciado e pontos.
    """
    topicos = []
    for numero, (letra, enunciado, pontos) in enumerate(PADRAO_TOPICO.findall(texto_topicos), 1):
        topicos.append({"letra": letra, "numero": numero, "enunciado": enunciado,
                        "pontos": float(pontos.replace(",", "."))})
    return topicos


def ler_item(bloco):
    """Converte o texto de um item em dicionário.

    Args:
        bloco: Texto do item a partir de "NN — Título".

    Returns:
        Dicionário com número, título, aula, contexto, comando e tópicos.

    Raises:
        ValueError: Se o cabeçalho do item for inválido.
    """
    primeira_linha = bloco.splitlines()[0].strip()
    cabecalho = PADRAO_CABECALHO.match(primeira_linha)
    if not cabecalho:
        raise ValueError(f"Cabeçalho de item inválido: {primeira_linha}")
    meta = dict(PADRAO_META.findall(bloco))
    return {
        "numero": int(cabecalho.group(1)),
        "titulo": cabecalho.group(2).strip(),
        "aula": meta.get("Aula", "").strip(),
        "contexto": extrair_secao(bloco, "Contexto"),
        "comando": extrair_secao(bloco, "Comando"),
        "topicos": ler_topicos(extrair_secao(bloco, "Tópicos")),
        "capacidades": cap.ler_codigos_questao(bloco),
    }


def validar_itens(itens, total_esperado):
    """Confere quantidade, numeração, seções e soma dos pontos de cada item.

    Args:
        itens: Itens lidos da fonte.
        total_esperado: Total de questões declarado no cabeçalho.

    Raises:
        ValueError: Na primeira inconsistência encontrada.
    """
    if len(itens) != total_esperado:
        raise ValueError(f"Esperadas {total_esperado} questões, encontradas {len(itens)}.")
    for posicao, item in enumerate(itens, 1):
        rotulo = f"ITEM {item['numero']:02d}"
        if item["numero"] != posicao:
            raise ValueError(f"{rotulo}: numeração fora de ordem (esperado {posicao}).")
        if not (item["contexto"] and item["comando"] and item["topicos"]):
            raise ValueError(f"{rotulo}: falta Contexto, Comando ou Tópicos.")
        soma = sum(topico["pontos"] for topico in item["topicos"])
        if abs(soma - PONTOS_POR_QUESTAO) > TOLERANCIA_PONTOS:
            raise ValueError(f"{rotulo}: tópicos somam {soma} (esperado {PONTOS_POR_QUESTAO}).")


def ler_fonte(caminho_md):
    """Lê e valida a fonte da avaliação.

    Args:
        caminho_md: Caminho do .md de questões.

    Returns:
        Tupla (metadados, orientações, itens).
    """
    texto = caminho_md.read_text(encoding="utf-8")
    meta = ler_metadados(texto)
    blocos = SEPARADOR_ITEM.split(texto)[1:]
    itens = [ler_item(bloco) for bloco in blocos]
    validar_itens(itens, int(meta["Total de questões"]))
    return meta, ler_orientacoes(texto), itens


def ler_gabarito(caminho_gabarito):
    """Lê o padrão de resposta e os critérios de cada tópico (se o arquivo existir).

    Args:
        caminho_gabarito: Caminho do -GABARITO.md.

    Returns:
        Dicionário (item, letra) → {"resposta": str, "criterios": str}.
    """
    if not caminho_gabarito.exists():
        return {}
    partes = PADRAO_GABARITO.split(caminho_gabarito.read_text(encoding="utf-8"))[1:]
    gabarito = {}
    for indice in range(0, len(partes), 3):
        item, letra, corpo = int(partes[indice]), partes[indice + 1], partes[indice + 2]
        gabarito[(item, letra)] = {
            "resposta": extrair_campo(corpo, "Resposta esperada"),
            "criterios": extrair_campo(corpo, "Critérios"),
        }
    return gabarito


def extrair_campo(corpo, rotulo):
    """Extrai o texto de "**Rótulo:** texto" de um bloco do gabarito.

    Args:
        corpo: Texto do bloco de um tópico.
        rotulo: Rótulo do campo.

    Returns:
        Texto do campo ou None se não existir.
    """
    achado = re.search(rf"\*\*{re.escape(rotulo)}:\*\*\s*(.+)", corpo)
    return achado.group(1).strip() if achado else None


def formatar_pontos(pontos):
    """Formata pontos no padrão brasileiro (ex.: 0.5 → "0,5 ponto").

    Args:
        pontos: Valor numérico.

    Returns:
        Texto com o valor e a unidade.
    """
    numero = f"{pontos:g}".replace(".", ",")
    unidade = "ponto" if pontos <= 1 else "pontos"
    return f"{numero} {unidade}"


def paragrafos_html(texto):
    """Converte texto com quebras de linha em HTML (escapado, com negrito Markdown).

    Args:
        texto: Texto da seção.

    Returns:
        HTML com <br> nas quebras.
    """
    linhas = [escapar(linha.strip()) for linha in texto.splitlines() if linha.strip()]
    return PADRAO_NEGRITO.sub(r"<strong>\1</strong>", "<br>".join(linhas))


def html_topico(item, topico):
    """Monta o campo de resposta de um tópico.

    Args:
        item: Item ao qual o tópico pertence.
        topico: Dados do tópico.

    Returns:
        HTML do bloco do tópico.
    """
    numero = f"{item['numero']:02d}"
    ident = f"resposta-{numero}-{topico['letra']}"
    atributos = f'data-item="{item["numero"]}" data-topico="{topico["numero"]}"'
    return f'''                <div class="topico-resposta" {atributos}>
                    <label class="topico-resposta__rotulo" for="{ident}">
                        <span class="topico-resposta__letra">{topico["letra"]})</span>
                        {escapar(topico["enunciado"])}
                        <span class="topico-resposta__pontos">{formatar_pontos(topico["pontos"])}</span>
                    </label>
                    <textarea id="{ident}" class="topico-resposta__campo" {atributos}
                              maxlength="{MAXIMO_CARACTERES}" rows="5" readonly
                              placeholder="Escreva aqui a sua resposta do tópico {topico["letra"]})..."></textarea>
                    <div class="topico-resposta__rodape">
                        <span class="topico-resposta__situacao" aria-live="polite"></span>
                        <span class="topico-resposta__contador">0/{MAXIMO_CARACTERES}</span>
                    </div>
                </div>
'''


def html_item(item):
    """Monta o cartão de uma questão (aula/tópico, contexto, comando e campos).

    Args:
        item: Dados do item.

    Returns:
        HTML do cartão.
    """
    numero = f"{item['numero']:02d}"
    topicos = "".join(html_topico(item, topico) for topico in item["topicos"])
    quadro = item["quadro"] + "\n" if item.get("quadro") else ""
    return f'''            <section class="aula-card questao-discursiva" id="item-{numero}" data-item="{item["numero"]}">
                <span class="aula-badge">ITEM {numero}</span>
                <span class="questao-discursiva__aula">📚 Aula {escapar(item["aula"])}</span>
                <h2 class="aula-title">{escapar(item["titulo"])}</h2>
{quadro}                <div class="content-box">
                    <div class="content-label">🎬 CONTEXTO</div>
                    <div class="content-text">{paragrafos_html(item["contexto"])}</div>
                </div>
                <div class="content-box">
                    <div class="content-label">🎯 COMANDO</div>
                    <div class="content-text">{paragrafos_html(item["comando"])}</div>
                </div>
                <div class="content-label questao-discursiva__rotulo-topicos">✍️ RESPONDA CADA TÓPICO</div>
{topicos}            </section>
'''


def html_orientacoes(orientacoes):
    """Monta as caixas de orientação do cabeçalho (empresa fictícia, como responder).

    Args:
        orientacoes: Lista de pares (rótulo, texto).

    Returns:
        HTML das caixas.
    """
    caixas = []
    for rotulo, texto in orientacoes:
        caixas.append(f'''                <div class="content-box">
                    <div class="content-label">💡 {escapar(rotulo.upper())}</div>
                    <div class="content-text">{paragrafos_html(texto)}</div>
                </div>''')
    return "\n".join(caixas)


def aplicar_capacidades(meta, itens, dados, assets):
    """Monta o quadro de capacidades do início e o de cada questão (campo "- **Capacidade:**").

    Sem capacidade nas questões, mantém a caixa de texto "Capacidade avaliada" do cabeçalho.

    Args:
        meta: Metadados da fonte.
        itens: Itens validados (recebem a chave "quadro").
        dados: Dados da matéria (atividades.json).
        assets: Caminho relativo até assets/.

    Returns:
        Tupla (HTML do início, tag do CSS de capacidades).
    """
    usados = [item["capacidades"] for item in itens if item["capacidades"]]
    if not usados:
        return CAIXA_CAPACIDADE_TEXTO.format(texto=escapar(meta["Capacidade avaliada"])), ""
    tabela = dados.get(cap.CAMPO_DADOS, {})
    for item in itens:
        cap.validar_codigos(tabela, item["capacidades"], f"ITEM {item['numero']:02d}")
        item["quadro"] = cap.html_caixa_questao(tabela, item["capacidades"], RECUO_QUADRO)
    inicio = cap.html_quadro(tabela, cap.codigos_usados(usados, tabela), RECUO_QUADRO)
    return inicio, f'\n    <link rel="stylesheet" href="{assets}/css/capacidades.css">'


def montar_trocas(meta, itens, contexto):
    """Monta o dicionário de placeholders do template.

    Args:
        meta: Metadados da fonte.
        itens: Itens validados.
        contexto: Dados de apoio (dados da matéria, orientações, caminhos, nome do .md).

    Returns:
        Dicionário placeholder → valor.
    """
    dados = contexto["dados"]
    turma = meta.get("Turma", "")
    capacidades_inicio, capacidades_css = aplicar_capacidades(
        meta, itens, dados, contexto["assets"])
    return {
        "{{ROTULO}}": escapar(meta.get("Rótulo da aula", meta["Aula"])),
        "{{TEMA}}": escapar(meta["Tema"]), "{{ICONE}}": meta.get("Ícone", "✍️"),
        "{{TOTAL}}": str(len(itens)),
        "{{TOPICOS}}": str(sum(len(item["topicos"]) for item in itens)),
        "{{AULA}}": escapar(meta["Aula"]), "{{DURACAO}}": escapar(meta["Duração"]),
        "{{FORMATO}}": escapar(meta["Formato"]), "{{PONTUACAO}}": escapar(meta["Pontuação"]),
        "{{CAPACIDADES}}": capacidades_inicio, "{{CAPACIDADES_CSS}}": capacidades_css,
        "{{ORIENTACOES}}": html_orientacoes(contexto["orientacoes"]),
        "{{QUESTOES}}": "".join(html_item(item) for item in itens),
        "{{ARQUIVO_MD}}": escapar(contexto["arquivo_md"]),
        "{{UC}}": escapar(dados["uc"]), "{{UC_CURTA}}": escapar(dados["uc_curta"]),
        "{{CURSO}}": escapar(dados["curso"]), "{{DOCENTE}}": escapar(dados["docente"]),
        "{{TURMA}}": f' data-turma="{escapar(turma)}"' if turma else "",
        "{{MAXIMO_CARACTERES}}": str(MAXIMO_CARACTERES),
        "{{ASSETS}}": contexto["assets"], "{{RAIZ}}": contexto["raiz"],
        "{{MENU}}": montar_tags_menu(contexto["pasta"], "    "),
    }


def gerar_pagina(pasta, caminho_md, meta, orientacoes, itens):
    """Gera o HTML da avaliação na pasta ATIVIDADES.

    Args:
        pasta: Pasta ATIVIDADES da matéria.
        caminho_md: Caminho da fonte.
        meta: Metadados da fonte.
        orientacoes: Orientações do cabeçalho.
        itens: Itens validados.

    Returns:
        Caminho do HTML gerado.
    """
    profundidade = len(pasta.resolve().relative_to(RAIZ).parts)
    raiz_relativa = "/".join([".."] * profundidade)
    contexto = {
        "dados": json.loads((pasta / ARQUIVO_DADOS).read_text(encoding="utf-8")),
        "orientacoes": orientacoes, "arquivo_md": caminho_md.name, "pasta": pasta,
        "assets": raiz_relativa + "/assets", "raiz": raiz_relativa,
    }
    pagina = TEMPLATE.read_text(encoding="utf-8")
    for chave, valor in montar_trocas(meta, itens, contexto).items():
        pagina = pagina.replace(chave, valor)
    if "{{" in pagina:
        raise ValueError("Placeholder não substituído no template.")
    saida = pasta / (caminho_md.stem + ".html")
    saida.write_text(inserir_header_em_html(pagina, pasta), encoding="utf-8")
    return saida


def sql_topicos(itens, gabarito):
    """Monta os valores do insert em topico_discursivo.

    Args:
        itens: Itens validados.
        gabarito: Padrão de resposta por (item, letra).

    Returns:
        Linhas de valores SQL separadas por vírgula.
    """
    linhas = []
    for item in itens:
        for topico in item["topicos"]:
            padrao = gabarito.get((item["numero"], topico["letra"]), {})
            linhas.append(
                f"(v_atividade, {item['numero']}, {topico['numero']}, "
                f"{texto_sql(topico['enunciado'])}, {topico['pontos']}, "
                f"{texto_sql(padrao.get('resposta'))}, {texto_sql(padrao.get('criterios'))})")
    return ",\n      ".join(linhas)


def montar_sql(pagina, meta, itens, contexto):
    """Monta o seed idempotente da atividade discursiva e dos tópicos.

    Args:
        pagina: Caminho da página a partir da raiz do site (ex.: /MATERIAIS/.../X.html).
        meta: Metadados da fonte.
        itens: Itens validados.
        contexto: Dados de apoio (matéria e gabarito).

    Returns:
        Conteúdo SQL.
    """
    nome = meta.get("Rótulo da aula", meta["Tema"])
    descricao = f"Atividade — {nome} ({len(itens)} questões discursivas)"
    return f"""-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = {texto_sql(contexto['materia'])} and a.numero = {int(meta['Aula no banco'])}
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula {meta["Aula no banco"]} da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ({texto_sql(nome)}, 'PENDENTE', v_aula, {texto_sql(descricao)},
      {texto_sql(pagina)}, {len(itens)}, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      {sql_topicos(itens, contexto['gabarito'])};
end $$;
"""


def gerar_seed(pasta, html_gerado, meta, itens, gabarito):
    """Grava o seed SQL da avaliação em database/.

    Args:
        pasta: Pasta ATIVIDADES da matéria.
        html_gerado: Caminho do HTML gerado.
        meta: Metadados da fonte.
        itens: Itens validados.
        gabarito: Padrão de resposta.

    Returns:
        Caminho do SQL gerado.
    """
    dados = json.loads((pasta / ARQUIVO_DADOS).read_text(encoding="utf-8"))
    pagina = "/" + html_gerado.resolve().relative_to(RAIZ).as_posix()
    contexto = {"materia": dados["uc"], "gabarito": gabarito}
    nome = f"{date.today().isoformat()}-{html_gerado.stem.lower()}-seed-atividades.sql"
    saida = PASTA_SQL / nome
    saida.write_text(montar_sql(pagina, meta, itens, contexto), encoding="utf-8")
    return saida


def main():
    """Lê os argumentos, gera a página e o seed e mostra o resumo."""
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    pasta = Path(sys.argv[1]).resolve()
    nome_fonte = sys.argv[2] if len(sys.argv) > 2 else FONTE_PADRAO
    caminho_md = pasta / PASTA_FONTES / nome_fonte
    if not caminho_md.exists():
        caminho_md = pasta / nome_fonte
    meta, orientacoes, itens = ler_fonte(caminho_md)
    gabarito = ler_gabarito(caminho_md.with_name(caminho_md.stem + SUFIXO_GABARITO))
    html_gerado = gerar_pagina(pasta, caminho_md, meta, orientacoes, itens)
    sql_gerado = gerar_seed(pasta, html_gerado, meta, itens, gabarito)
    total_topicos = sum(len(item["topicos"]) for item in itens)
    pontos = sum(topico["pontos"] for item in itens for topico in item["topicos"])
    sem_padrao = total_topicos - len(gabarito)
    print(f"{len(itens)} questões, {total_topicos} tópicos, {pontos:g} pontos")
    print(f"Padrão de resposta: {len(gabarito)} tópicos ({sem_padrao} sem padrão)")
    print(f"Página: {html_gerado}")
    print(f"Seed:   {sql_gerado}")


if __name__ == "__main__":
    main()
