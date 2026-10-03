"""Monta e atualiza o Markdown completo da apostila (<MATERIA>/APOSTILA/APOSTILA-<MATERIA>.md).

O Markdown completo junta, na ordem da apostila: cabeçalho, sumário, plano de capítulos
(1 capítulo = 1 aula de 4 horas), introdução, capacidades, glossário e todos os capítulos.
É o arquivo em que o usuário compara e acrescenta dados antes de gerar o HTML.
Usado por assets/gerador-apostilas/gerar_apostila.py (opção --markdown).
Regras: seção "REGRAS APOSTILAS" do CLAUDE.md.
"""
import re
import unicodedata
from datetime import date

MARCADOR_SUMARIO_INICIO = "<!-- sumario:inicio (gerado; atualizado a cada geração) -->"
MARCADOR_SUMARIO_FIM = "<!-- sumario:fim -->"
TITULO_GLOSSARIO = "# Glossário"
TITULO_PLANO = "# Plano de capítulos"
TITULO_CAPACIDADES_POR_CAPITULO = "## Capacidades por capítulo"
TITULO_TEORIA = "Teoria"
TITULO_SUMARIO = "Sumário"
PREFIXO_ITEM = "ITEM "
SITUACAO_INCLUIDO = "✅ Incluído"
SITUACAO_PENDENTE = "⬜ Pendente"
ORDEM_PARTES_CAPITULO = ("Teoria", "Vídeos", "Resumo", "Exercícios")
PADRAO_CAPITULO_MD = re.compile(r"^# Capítulo (\d+)\b", re.MULTILINE)
PADRAO_TITULO_MD = re.compile(r"^(#{1,3})\s+(.+?)\s*$")
PADRAO_LIMPAR_SLUG = re.compile(r"[^\w\- ]", re.UNICODE)
PADRAO_H3_MD = re.compile(r"^###\s+", re.MULTILINE)
CERCA_CODIGO = "```"


def slug_titulo(texto, usados):
    """Calcula a âncora de um título no estilo GitHub/VS Code (duplicados ganham -1, -2...).

    Args:
        texto: Texto do título.
        usados: Dicionário slug → quantidade já usada (atualizado aqui).

    Returns:
        Âncora sem o "#".
    """
    base = PADRAO_LIMPAR_SLUG.sub("", texto.strip().lower()).replace(" ", "-")
    quantidade = usados.get(base, 0)
    usados[base] = quantidade + 1
    return base if quantidade == 0 else f"{base}-{quantidade}"


def listar_titulos(texto_md):
    """Lista os títulos (#, ##, ###) fora de blocos de código, com nível, texto e âncora.

    Args:
        texto_md: Markdown completo.

    Returns:
        Lista de tuplas (nivel, texto, ancora).
    """
    titulos, usados, dentro_codigo = [], {}, False
    for linha in texto_md.splitlines():
        if linha.strip().startswith(CERCA_CODIGO):
            dentro_codigo = not dentro_codigo
            continue
        achado = None if dentro_codigo else PADRAO_TITULO_MD.match(linha)
        if achado:
            texto = achado.group(2)
            titulos.append((len(achado.group(1)), texto, slug_titulo(texto, usados)))
    return titulos


def montar_sumario(texto_md):
    """Monta o sumário com links: partes (#), seções (##) e subtítulos da teoria (###).

    Args:
        texto_md: Markdown completo.

    Returns:
        Linhas do sumário em Markdown.
    """
    linhas, secao_atual = [], ""
    for indice, (nivel, texto, ancora) in enumerate(listar_titulos(texto_md)):
        if indice == 0 or texto == TITULO_SUMARIO:
            continue
        if nivel == 2:
            secao_atual = texto
        eh_subtitulo_teoria = nivel == 3 and secao_atual == TITULO_TEORIA
        deve_listar = nivel < 3 or (eh_subtitulo_teoria and not texto.startswith(PREFIXO_ITEM))
        if deve_listar:
            linhas.append(f"{'  ' * (nivel - 1)}- [{texto}](#{ancora})")
    return "\n".join(linhas)


def atualizar_sumario(texto_md):
    """Recalcula o sumário entre os marcadores, a partir dos títulos do próprio arquivo.

    Args:
        texto_md: Markdown completo.

    Returns:
        Markdown com o sumário atualizado.
    """
    inicio = texto_md.index(MARCADOR_SUMARIO_INICIO) + len(MARCADOR_SUMARIO_INICIO)
    fim = texto_md.index(MARCADOR_SUMARIO_FIM)
    return f"{texto_md[:inicio]}\n{montar_sumario(texto_md)}\n{texto_md[fim:]}"


def md_cabecalho(dados, total_previstos):
    """Monta o título e o quadro de identificação da apostila.

    Args:
        dados: Dados da matéria.
        total_previstos: Quantidade de capítulos previstos.

    Returns:
        Markdown do cabeçalho.
    """
    carga = dados.get("carga_horaria_uc")
    texto_carga = f"{carga} horas" if carga else "não informada"
    materia = dados.get("materia", {})
    return "\n".join([
        f"# Apostila — {dados['uc']}",
        "",
        f"> **Curso:** {dados['curso']} · **Docente:** {dados['docente']}  ",
        f"> **Módulo:** {materia.get('modulo', '—')} · **Modalidade:** "
        f"{materia.get('modalidade', '—')}  ",
        f"> **Ementa:** {materia.get('versao_ementa', '—')}  ",
        f"> **Carga horária da UC:** {texto_carga} · **Capítulos previstos:** {total_previstos} "
        f"(1 capítulo = 1 aula de {dados['horas_por_capitulo']} horas)  ",
        f"> **Gerado em:** {date.today():%d/%m/%Y}, a partir de `APOSTILA/CONTEUDO/`.",
        "",
        "> ✏️ **Este arquivo é a fonte final da apostila.** Revise, compare e acrescente "
        "dados "
        "aqui; o HTML é gerado depois, a partir dele. O sumário é refeito a cada geração.",
    ])


def md_plano(dados, numeros_incluidos):
    """Monta a tabela do plano de capítulos (uma aula de 4 horas por capítulo).

    Args:
        dados: Dados da matéria (capitulos_previstos, horas_por_capitulo).
        numeros_incluidos: Números ("01", "02"...) dos capítulos já no arquivo.

    Returns:
        Markdown da seção.
    """
    horas = dados["horas_por_capitulo"]
    linhas = [TITULO_PLANO, "",
              f"Cada capítulo corresponde a **uma aula de {horas} horas** da unidade curricular.",
              "", "| Capítulo | Aula | Tema | Carga horária | Situação |",
              "|---|---|---|---|---|"]
    for indice, tema in enumerate(dados["capitulos_previstos"], start=1):
        numero = f"{indice:02d}"
        situacao = SITUACAO_INCLUIDO if numero in numeros_incluidos else SITUACAO_PENDENTE
        linhas.append(f"| {numero} | {numero} | {tema} | {horas} h | {situacao} |")
    materia = dados.get("materia", {})
    glossario = {termo["termo"]: termo["definicao"]
                 for termo in materia.get("glossario_ementa", [])}
    for item in dados.get("plano_capitulos", []):
        linhas += ["", *md_detalhe_aula(item, horas, glossario)]
    return "\n".join(linhas)


def md_aula_padrao(materia):
    """Monta o roteiro da aula padrão de 4 horas da ementa.

    Args:
        materia: Conteúdo do materia.json.

    Returns:
        Lista de linhas Markdown (vazia se não houver roteiro).
    """
    etapas = materia.get("aula_padrao_4h", [])
    if not etapas:
        return []
    return ["", "## Aula padrão (4 h)", "", " → ".join(etapas) + "."]


def md_bncc(materia):
    """Monta a tabela do mapeamento BNCC da ementa (competência, aulas e foco).

    Args:
        materia: Conteúdo do materia.json.

    Returns:
        Lista de linhas Markdown (vazia se não houver mapeamento).
    """
    mapeamento = materia.get("mapeamento_bncc", [])
    if not mapeamento:
        return []
    linhas = ["", "## Mapeamento BNCC", "", "| Competência | Aulas | Foco |", "|---|---|---|"]
    linhas += [f"| {item['competencia']} | {', '.join(str(aula) for aula in item['aulas'])} | "
               f"{item['foco']} |" for item in mapeamento]
    return linhas


def lista_md(rotulo, itens):
    """Monta um rótulo em negrito seguido de uma lista (vazio se não houver itens).

    Args:
        rotulo: Texto do rótulo.
        itens: Itens da lista.

    Returns:
        Lista de linhas Markdown.
    """
    if not itens:
        return []
    return [f"**{rotulo}:**", "", *[f"- {item}" for item in itens], ""]


def md_detalhe_aula(item, horas, glossario):
    """Monta o detalhe de uma aula do plano da ementa (o que o capítulo precisa cobrir).

    Args:
        item: Entrada de "aulas" do materia.json.
        horas: Carga horária padrão do capítulo.
        glossario: Glossário oficial da ementa (termo → definição).

    Returns:
        Lista de linhas Markdown.
    """
    dominios = item.get("dominios_texto") or ", ".join(
        str(dominio) for dominio in item.get("dominios", []))
    linhas = [f"## Aula {item['numero']} — {item['tema']}", "",
              f"- **Carga horária:** {item.get('carga_horaria', horas)} h · **Domínios:** "
              f"{dominios} · **Capacidades:** {', '.join(item.get('capacidades', []))}",
              f"- **Situação-problema:** {item.get('situacao_problema', '')}",
              f"- **Atividade / instrumento formativo:** {item.get('atividade', '')}",
              f"- **Estratégias:** {', '.join(item.get('estrategias', []))}"]
    if item.get("bncc"):
        linhas.append(f"- **BNCC:** {', '.join(item['bncc'])}")
    if item.get("marco"):
        linhas.append(f"- **Marco:** {item['marco']}")
    if item.get("observacao"):
        linhas.append(f"- **Observação:** {item['observacao']}")
    linhas.append("")
    linhas += lista_md("Conteúdos oficiais (ementa)", item.get("conteudos_oficiais", []))
    linhas += lista_md("Detalhamento didático", item.get("detalhamento_didatico", []))
    linhas += lista_md("Indicadores de desempenho", item.get("indicadores", []))
    linhas += lista_md("Ideias da ementa para exemplos e exercícios",
                       item.get("ideias_ementa", []))
    termos = [f"**{termo}:** {glossario.get(termo, '')}"
              for termo in item.get("termos_glossario_ementa", [])]
    linhas += lista_md("Termos oficiais do glossário (ementa)", termos)
    while linhas and linhas[-1] == "":
        linhas.pop()
    return linhas


def md_introducao(texto_introducao):
    """Monta a seção de introdução (subtítulos "###" da fonte viram "##").

    Args:
        texto_introducao: Conteúdo da INTRODUCAO.md sem o título.

    Returns:
        Markdown da seção.
    """
    return "# Introdução\n\n" + PADRAO_H3_MD.sub("## ", texto_introducao.strip())


def linha_capacidades_capitulo(capitulo):
    """Monta a linha do capítulo na tabela "Capacidades por capítulo".

    Args:
        capitulo: Dicionário do capítulo.

    Returns:
        Linha da tabela.
    """
    return f"| {capitulo['titulo']} | {', '.join(capitulo['codigos'])} |"


def md_capacidades(dados, capitulos):
    """Monta a seção com todas as capacidades da matéria e a relação por capítulo.

    Args:
        dados: Dados da matéria (basicas e socioemocionais).
        capitulos: Capítulos incluídos.

    Returns:
        Markdown da seção.
    """
    linhas = ["# Capacidades da matéria", "", "## Capacidades básicas", ""]
    linhas += [f"- **{codigo}:** {texto}" for codigo, texto in dados["basicas"].items()]
    if dados["socioemocionais"]:
        linhas += ["", "## Capacidades socioemocionais", ""]
        linhas += [f"- **{codigo}:** {texto}"
                   for codigo, texto in dados["socioemocionais"].items()]
    linhas += md_conhecimentos(dados)
    linhas += ["", TITULO_CAPACIDADES_POR_CAPITULO, "", "| Capítulo | Capacidades |", "|---|---|"]
    linhas += [linha_capacidades_capitulo(capitulo) for capitulo in capitulos]
    return "\n".join(linhas)


def md_conhecimentos(dados):
    """Monta os conhecimentos (domínios) da ementa e a relação capacidades × conhecimentos.

    Args:
        dados: Dados da matéria (conhecimentos, capacidades_x_conhecimentos).

    Returns:
        Lista de linhas Markdown (vazia se o materia.json não tiver conhecimentos).
    """
    if not dados.get("conhecimentos"):
        return []
    linhas = ["", "## Conhecimentos da unidade curricular", ""]
    linhas += [f"{item['dominio']}. **{item['titulo']}:** {'; '.join(item['conteudos'])}."
               for item in dados["conhecimentos"]]
    detalhamento = dados.get("materia", {}).get("detalhamento_didatico_conhecimentos", {})
    if detalhamento:
        linhas += ["", "**Detalhamento didático (ementa):** " + "; ".join(
            f"{chave} = {valor}" for chave, valor in detalhamento.items()) + "."]
    relacao = dados.get("capacidades_x_conhecimentos", {})
    if relacao:
        linhas += ["", "## Capacidades × conhecimentos", "",
                   "| Capacidade | Domínios |", "|---|---|"]
        linhas += [f"| {codigo} | {', '.join(str(dominio) for dominio in dominios)} |"
                   for codigo, dominios in relacao.items()]
    return linhas


def linhas_termos(capitulo):
    """Monta as linhas de glossário de um capítulo, com a referência ao capítulo.

    Args:
        capitulo: Dicionário do capítulo.

    Returns:
        Lista de linhas "- **Termo:** definição _(cap. NN)_".
    """
    return [f"- **{termo['termo']}:** {termo['definicao']} _(cap. {capitulo['numero']})_"
            for termo in capitulo["termos"]]


def chave_alfabetica(texto):
    """Chave de ordenação alfabética sem acentos e sem diferenciar maiúsculas.

    Args:
        texto: Texto a ordenar.

    Returns:
        Texto sem acentos, em minúsculas.
    """
    decomposto = unicodedata.normalize("NFD", texto)
    return "".join(letra for letra in decomposto if not unicodedata.combining(letra)).casefold()


def ordenar_termos(linhas):
    """Ordena as linhas de glossário pelo termo, sem diferenciar maiúsculas.

    Args:
        linhas: Linhas "- **Termo:** ...".

    Returns:
        Linhas em ordem alfabética.
    """
    return sorted(linhas, key=lambda linha: chave_alfabetica(linha.split(":**")[0]))


def md_glossario(capitulos):
    """Monta o glossário de todos os capítulos, em ordem alfabética.

    Args:
        capitulos: Capítulos incluídos.

    Returns:
        Markdown da seção.
    """
    termos = [linha for capitulo in capitulos for linha in linhas_termos(capitulo)]
    return "\n".join([TITULO_GLOSSARIO, "", "Termos técnicos de todos os capítulos, em ordem "
                      "alfabética (o número indica o capítulo).", "", *ordenar_termos(termos)])


def md_capitulo(capitulo, horas):
    """Monta um capítulo: identificação, teoria, vídeos, resumo e exercícios.

    Args:
        capitulo: Dicionário do capítulo (com as seções originais da fonte).
        horas: Carga horária do capítulo (uma aula).

    Returns:
        Markdown do capítulo.
    """
    linhas = [f"# {capitulo['titulo']}", "",
              f"- **Aula:** {capitulo['aula'] or capitulo['numero']}",
              f"- **Carga horária:** {horas} horas (1 aula)",
              f"- **Capacidade:** {', '.join(capitulo['codigos'])}",
              f"- **Fonte:** `APOSTILA/CONTEUDO/{capitulo['id'].upper()}.md`"]
    for parte in ORDEM_PARTES_CAPITULO:
        linhas += ["", f"## {parte}", "", capitulo["secoes"][parte].strip()]
    return "\n".join(linhas)


def valor_br(numero):
    """Formata um número com vírgula decimal (4.0 → "4,0").

    Args:
        numero: Valor numérico.

    Returns:
        Texto formatado.
    """
    return f"{numero:.1f}".replace(".", ",")


def md_objetivos_ementa(materia):
    """Monta justificativa, objetivo geral e competência integradora, literais da ementa.

    Args:
        materia: Conteúdo do materia.json.

    Returns:
        Lista de linhas Markdown.
    """
    objetivo = materia.get("objetivo_geral", {})
    competencia = materia.get("competencia_integradora", {})
    linhas = ["## Justificativa", "", materia.get("justificativa", ""), "",
              "## Objetivo geral", "", objetivo.get("texto", ""), ""]
    linhas += [f"{i}. {dimensao}" for i, dimensao in enumerate(objetivo.get("dimensoes", []), 1)]
    linhas += ["", "## Competência integradora", "",
               f"- **Eixo:** {competencia.get('eixo_bncc', '')}",
               f"- **Competência:** {competencia.get('competencia', '')}",
               f"- **Resultados:** {'; '.join(competencia.get('resultados', []))}."]
    return linhas


def md_avaliacao_ementa(materia):
    """Monta instrumentos, formativa, recuperação e rubrica da avaliação, literais da ementa.

    Args:
        materia: Conteúdo do materia.json.

    Returns:
        Lista de linhas Markdown (vazia se não houver avaliação).
    """
    avaliacao = materia.get("avaliacao")
    if not avaliacao:
        return []
    linhas = ["", "## Avaliação", "", "| Instrumento | Valor | Momento | Capacidades |",
              "|---|---|---|---|"]
    for item in avaliacao.get("instrumentos", []):
        linhas.append(f"| {item['instrumento']} | {valor_br(item['valor'])} | "
                      f"{item.get('momento', '')} | {', '.join(item.get('capacidades', []))} |")
        linhas += [f"| ↳ {tarefa['tarefa']} | {valor_br(tarefa['valor'])} | | "
                   f"{', '.join(tarefa['capacidades'])} |" for tarefa in item.get("tarefas", [])]
    linhas += [f"| **Nota final da UC** | **{valor_br(avaliacao.get('nota_final', 10))}** | | |",
               "",
               f"- **Formativa:** {avaliacao.get('formativa', '')}",
               f"- **Recuperação:** {avaliacao.get('recuperacao', '')}", "",
               "| Nível | Nota | Descrição |", "|---|---|---|"]
    linhas += [f"| {nivel['nivel']} | {nivel['nota']} | {nivel['descricao']} |"
               for nivel in avaliacao.get("rubrica", [])]
    return linhas


def md_recursos_ementa(materia):
    """Monta recursos, ambientes e acessibilidade, literais da ementa.

    Args:
        materia: Conteúdo do materia.json.

    Returns:
        Lista de linhas Markdown.
    """
    recursos = materia.get("recursos", {})
    acessibilidade = dict(materia.get("acessibilidade", {}))
    regra = acessibilidade.pop("regra", "")
    linhas = ["", "## Recursos e ambientes", "",
              f"- **Ambientes:** {', '.join(recursos.get('ambientes', []))}.",
              f"- **Equipamentos:** {', '.join(recursos.get('equipamentos', []))}.",
              f"- **Recurso didático:** {recursos.get('recurso_didatico', '')}.",
              "", "## Acessibilidade", ""]
    linhas += [f"- **{nome}:** {texto}" for nome, texto in acessibilidade.items()]
    if regra:
        linhas += ["", f"{regra}."]
    return linhas


def md_listas_ementa(materia):
    """Monta marcos, capacidades × conhecimentos, regras para IA e métricas da ementa.

    Args:
        materia: Conteúdo do materia.json.

    Returns:
        Lista de linhas Markdown.
    """
    linhas = []
    if materia.get("marcos"):
        linhas += ["", "## Marcos", ""]
        linhas += [f"- Aula {marco['aula']} — {marco['marco']}" for marco in materia["marcos"]]
    if materia.get("capacidades_x_conhecimentos_ementa"):
        linhas += ["", "## Capacidades × conhecimentos (ementa)", ""]
        linhas += [f"- {item}" for item in materia["capacidades_x_conhecimentos_ementa"]]
    if materia.get("regras_ia"):
        linhas += ["", "## Regras para IA (seguidas na escrita da apostila)", ""]
        linhas += [f"{i}. {regra}" for i, regra in enumerate(materia["regras_ia"], 1)]
    if materia.get("metricas"):
        linhas += ["", "## Métricas", ""] + [f"- {metrica}" for metrica in materia["metricas"]]
    return linhas


def md_ementa_oficial(dados):
    """Monta a seção com o texto oficial da ementa que não é por aula (referência literal).

    Args:
        dados: Dados da matéria (com "materia").

    Returns:
        Markdown da seção.
    """
    materia = dados.get("materia", {})
    linhas = ["# Ementa da matéria (texto oficial)", "",
              "Referência literal da ementa da matéria, para comparar com a apostila. Não editar "
              "aqui: quem muda é a ementa (e o `materia.json`).", ""]
    linhas += md_objetivos_ementa(materia) + md_avaliacao_ementa(materia)
    linhas += md_recursos_ementa(materia) + md_aula_padrao(materia)
    linhas += md_listas_ementa(materia) + md_bncc(materia)
    return "\n".join(linhas)


def md_referencias(dados):
    """Monta a seção de referências da ementa.

    Args:
        dados: Dados da matéria (com "materia").

    Returns:
        Markdown da seção.
    """
    referencias = dados.get("materia", {}).get("referencias", [])
    return "\n".join(["# Referências", "", *[f"- {referencia}" for referencia in referencias]])


def montar_markdown_completo(dados, texto_introducao, capitulos):
    """Monta o Markdown completo da apostila, do zero.

    Args:
        dados: Dados da matéria.
        texto_introducao: Conteúdo da INTRODUCAO.md sem o título.
        capitulos: Capítulos incluídos.

    Returns:
        Markdown completo, com o sumário calculado.
    """
    numeros = {capitulo["numero"] for capitulo in capitulos}
    partes = [
        md_cabecalho(dados, len(dados["capitulos_previstos"])),
        f"## Sumário\n\n{MARCADOR_SUMARIO_INICIO}\n{MARCADOR_SUMARIO_FIM}",
        md_ementa_oficial(dados), md_plano(dados, numeros), md_introducao(texto_introducao),
        md_capacidades(dados, capitulos), md_glossario(capitulos), md_referencias(dados),
        *[md_capitulo(capitulo, dados["horas_por_capitulo"]) for capitulo in capitulos],
    ]
    return atualizar_sumario("\n\n---\n\n".join(partes) + "\n")


def limites_secao(texto_md, titulo):
    """Localiza o corpo de uma seção de nível 1 (do título até o próximo "# ").

    Args:
        texto_md: Markdown completo.
        titulo: Linha do título (ex.: "# Glossário").

    Returns:
        Tupla (início do corpo, fim do corpo).
    """
    inicio = texto_md.index(f"\n{titulo}\n") + len(titulo) + 2
    proximo = re.search(r"^# ", texto_md[inicio:], re.MULTILINE)
    fim = inicio + proximo.start() if proximo else len(texto_md)
    return inicio, fim


def acrescentar_termos(texto_md, novas_linhas):
    """Acrescenta termos ao glossário e reordena, preservando o texto que não é termo.

    Args:
        texto_md: Markdown completo.
        novas_linhas: Linhas de glossário a acrescentar.

    Returns:
        Markdown atualizado.
    """
    inicio, fim = limites_secao(texto_md, TITULO_GLOSSARIO)
    corpo = texto_md[inicio:fim].rstrip("\n-\n ")
    linhas = corpo.split("\n")
    termos = [linha for linha in linhas if linha.startswith("- **")]
    outras = [linha for linha in linhas if not linha.startswith("- **")]
    termos_ordenados = "\n".join(ordenar_termos(termos + novas_linhas))
    novo_corpo = "\n".join(outras).rstrip() + "\n\n" + termos_ordenados
    return f"{texto_md[:inicio]}{novo_corpo}\n\n---\n\n{texto_md[fim:]}"


def acrescentar_linha_tabela(texto_md, titulo, linha_nova):
    """Acrescenta uma linha ao fim da primeira tabela depois do título indicado.

    Args:
        texto_md: Markdown completo.
        titulo: Linha do título da subseção (ex.: "## Capacidades por capítulo").
        linha_nova: Linha da tabela a acrescentar.

    Returns:
        Markdown atualizado.
    """
    posicao = texto_md.index(f"\n{titulo}\n")
    linhas = texto_md[posicao:].split("\n")
    indice_tabela = next(i for i, linha in enumerate(linhas) if linha.startswith("|"))
    fim_tabela = indice_tabela
    while fim_tabela < len(linhas) and linhas[fim_tabela].startswith("|"):
        fim_tabela += 1
    linhas.insert(fim_tabela, linha_nova)
    return texto_md[:posicao] + "\n".join(linhas)


def marcar_incluido_no_plano(texto_md, numero):
    """Troca a situação do capítulo para "Incluído" na tabela do plano.

    Args:
        texto_md: Markdown completo.
        numero: Número do capítulo ("01", "02"...).

    Returns:
        Markdown atualizado.
    """
    inicio, fim = limites_secao(texto_md, TITULO_PLANO)
    padrao = re.compile(rf"^(\| {numero} \|.*\| ){re.escape(SITUACAO_PENDENTE)}( \|)$",
                        re.MULTILINE)
    corpo = padrao.sub(rf"\g<1>{SITUACAO_INCLUIDO}\g<2>", texto_md[inicio:fim])
    return texto_md[:inicio] + corpo + texto_md[fim:]


def capitulos_no_markdown(texto_md):
    """Lista os números dos capítulos que já estão no Markdown completo.

    Args:
        texto_md: Markdown completo.

    Returns:
        Conjunto de números ("01", "02"...).
    """
    return {f"{int(numero):02d}" for numero in PADRAO_CAPITULO_MD.findall(texto_md)}


def acrescentar_capitulos(texto_md, capitulos_novos, horas):
    """Acrescenta capítulos novos ao Markdown completo sem mexer no que o usuário editou.

    Atualiza também o glossário, a tabela de capacidades por capítulo, o plano e o sumário.

    Args:
        texto_md: Markdown completo existente.
        capitulos_novos: Capítulos que ainda não estão no arquivo.
        horas: Carga horária de cada capítulo.

    Returns:
        Markdown atualizado.
    """
    for capitulo in capitulos_novos:
        texto_md = acrescentar_termos(texto_md, linhas_termos(capitulo))
        texto_md = acrescentar_linha_tabela(texto_md, TITULO_CAPACIDADES_POR_CAPITULO,
                                            linha_capacidades_capitulo(capitulo))
        texto_md = marcar_incluido_no_plano(texto_md, capitulo["numero"])
        texto_md = f"{texto_md.rstrip()}\n\n---\n\n{md_capitulo(capitulo, horas)}\n"
    return atualizar_sumario(texto_md)
