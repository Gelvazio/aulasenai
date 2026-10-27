"""Gera a página da Atividade Dinâmica de uma aula e o seed SQL da atividade.

Uso (na raiz do projeto):
    C:\\Python314\\python.exe assets\\gerador-atividade-dinamica\\gerar_atividade_dinamica.py
        <pasta ATIVIDADES da matéria> [ATIVIDADE-DINAMICA-AULA-NN.md]

Fonte: <pasta>/CONTEUDO/ATIVIDADE-DINAMICA-AULA-NN.md (formato em docs/regras/atividade-dinamica.md).
Saídas: <pasta>/ATIVIDADE-DINAMICA-AULA-NN.html e database/<data>-<nome>-seed-atividades.sql.
Sem o nome da fonte, gera todas as ATIVIDADE-DINAMICA-AULA-*.md da pasta CONTEUDO.
"""
import html
import json
import sys
from datetime import date
from pathlib import Path

GERADOR = Path(__file__).resolve().parent
ASSETS = GERADOR.parent
RAIZ = ASSETS.parent

sys.path.insert(0, str(GERADOR))
sys.path.insert(0, str(ASSETS / "gerador-menu"))
sys.path.insert(0, str(ASSETS / "gerador-materia"))
from leitor_dinamica import ler_fonte  # noqa: E402
from tags_menu import montar_tags_menu  # noqa: E402
from tags_header import inserir_header_em_html  # noqa: E402
import materia as dados_materia  # noqa: E402

TEMPLATE = GERADOR / "template_atividade_dinamica.html"
TEMPLATE_3D = GERADOR / "template_atividade_dinamica_3d.html"
CAMPO_MODO = "Modo"
MODO_DIGITAL_3D = "digital-3d"
PASTA_FONTES = "CONTEUDO"
PADRAO_FONTES = "ATIVIDADE-DINAMICA-AULA-*.md"
PASTA_SQL = RAIZ / "database"
CAMPO_MATERIA_BANCO = "Matéria no banco"
RECUO = " " * 20


def escapar(texto):
    """Escapa texto para HTML.

    Args:
        texto: Texto puro.

    Returns:
        Texto seguro para HTML.
    """
    return html.escape(str(texto), quote=True)


def texto_sql(valor):
    """Escapa um texto para literal SQL entre aspas simples.

    Args:
        valor: Texto a escapar.

    Returns:
        Literal SQL.
    """
    return "'" + str(valor).replace("'", "''") + "'"


def formatar_pontos(pontos):
    """Formata pontos com vírgula (2.5 vira "2,5"; 3.0 vira "3").

    Args:
        pontos: Número de pontos.

    Returns:
        Texto com vírgula decimal.
    """
    return f"{pontos:g}".replace(".", ",")


def itens_html(linhas):
    """Monta itens <li> recuados.

    Args:
        linhas: Trechos HTML já escapados, um por item.

    Returns:
        Texto com um <li> por linha.
    """
    return "\n".join(f"{RECUO}<li>{linha}</li>" for linha in linhas)


def montar_trocas(dados, contexto):
    """Monta o dicionário de placeholders do template.

    Args:
        dados: Dados lidos da fonte.
        contexto: Dados de apoio (matéria, caminhos, nome do .md, pasta).

    Returns:
        Dicionário placeholder → valor.
    """
    meta, materia = dados["meta"], contexto["materia"]
    criterios = [{"nome": nome, "pontos": pontos} for nome, pontos in dados["criterios"]]
    capacidade = meta.get("Capacidade avaliada", "")
    caixa_capacidade = (
        '                <div class="content-box">\n'
        '                    <div class="content-label">🎯 CAPACIDADE AVALIADA</div>\n'
        f'                    <div class="content-text">{escapar(capacidade)}</div>\n'
        '                </div>\n') if capacidade else ""
    return {
        "{{ROTULO}}": escapar(meta.get("Rótulo da aula", meta["Aula"])),
        "{{TEMA}}": escapar(meta["Tema"]), "{{ICONE}}": meta.get("Ícone", "🎯"),
        "{{AULA}}": escapar(meta["Aula"]), "{{DURACAO}}": escapar(meta["Duração"]),
        "{{ESTILO}}": escapar(meta["Estilo"]), "{{MATERIAIS}}": escapar(meta["Materiais"]),
        "{{CAPACIDADE}}": caixa_capacidade, "{{CONTEXTO}}": escapar(dados["contexto"]),
        "{{OBJETIVO}}": escapar(dados["objetivo"]),
        "{{FORMATOS}}": itens_html(
            f"<strong>{escapar(nome)}:</strong> {escapar(texto)}"
            for nome, texto in dados["formatos"]),
        "{{FICHA}}": itens_html(escapar(campo) for campo in dados["ficha"]),
        "{{ROTEIRO}}": itens_html(
            f"<strong>{minutos} min · {escapar(nome)}:</strong> {escapar(texto)}"
            for minutos, nome, texto in dados["roteiro"]),
        "{{MINUTOS}}": str(sum(minutos for minutos, _, _ in dados["roteiro"])),
        "{{CRITERIOS}}": itens_html(
            f"{escapar(nome)} — <strong>{formatar_pontos(pontos)}</strong> pontos"
            for nome, pontos in dados["criterios"]),
        "{{CRITERIOS_JSON}}": escapar(json.dumps(criterios, ensure_ascii=False)),
        "{{ARQUIVO_MD}}": escapar(contexto["arquivo_md"]),
        "{{UC}}": escapar(materia["uc"]), "{{UC_CURTA}}": escapar(materia["uc_curta"]),
        "{{CURSO}}": escapar(materia["curso"]), "{{DOCENTE}}": escapar(materia["docente"]),
        "{{ASSETS}}": contexto["assets"], "{{RAIZ}}": contexto["raiz"],
        "{{MENU}}": montar_tags_menu(contexto["pasta"], "    "),
    }


def escolher_template(dados):
    """Escolhe o template: papel (padrão) ou computador com three.js (Modo: digital-3d).

    Args:
        dados: Dados lidos da fonte.

    Returns:
        Caminho do template.
    """
    modo = dados["meta"].get(CAMPO_MODO, "").strip().lower()
    return TEMPLATE_3D if modo == MODO_DIGITAL_3D else TEMPLATE


def gerar_pagina(pasta, caminho_md, dados):
    """Grava o HTML da dinâmica na pasta ATIVIDADES.

    Args:
        pasta: Pasta ATIVIDADES da matéria.
        caminho_md: Caminho da fonte.
        dados: Dados lidos da fonte.

    Returns:
        Caminho do HTML gerado.

    Raises:
        ValueError: Se sobrar placeholder no template.
    """
    profundidade = len(pasta.resolve().relative_to(RAIZ).parts)
    raiz_relativa = "/".join([".."] * profundidade)
    contexto = {"materia": dados_materia.ler_materia(pasta), "arquivo_md": caminho_md.name,
                "pasta": pasta, "assets": raiz_relativa + "/assets", "raiz": raiz_relativa}
    pagina = escolher_template(dados).read_text(encoding="utf-8")
    for chave, valor in montar_trocas(dados, contexto).items():
        pagina = pagina.replace(chave, valor)
    if "{{" in pagina:
        raise ValueError("Placeholder não substituído no template.")
    saida = pasta / (caminho_md.stem + ".html")
    saida.write_text(inserir_header_em_html(pagina, pasta), encoding="utf-8")
    return saida


def montar_sql(pagina, dados, materia_banco):
    """Monta o seed idempotente da atividade (nasce bloqueada).

    Args:
        pagina: Caminho da página a partir da raiz do site.
        dados: Dados lidos da fonte.
        materia_banco: Descrição da matéria na tabela materia.

    Returns:
        Conteúdo SQL.
    """
    meta = dados["meta"]
    nome = meta.get("Rótulo da aula", meta["Tema"])
    descricao = f"Atividade — {nome} (dinâmica em sala, nota do professor)"
    return f"""-- Seed gerado por assets/gerador-atividade-dinamica (não editar à mão). Idempotente.
-- Rodar depois de database/2026-10-26-nota-dinamica.sql. A dinâmica nasce BLOQUEADA (ativo = false).
do $$
declare
  v_aula bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = {texto_sql(materia_banco)} and a.numero = {int(meta['Aula no banco'])}
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula {meta["Aula no banco"]} da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ({texto_sql(nome)}, 'PENDENTE', v_aula, {texto_sql(descricao)},
      {texto_sql(pagina)}, 1, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao;
end $$;
"""


def gerar_seed(pasta, html_gerado, dados):
    """Grava o seed SQL da dinâmica em database/.

    Args:
        pasta: Pasta ATIVIDADES da matéria.
        html_gerado: Caminho do HTML gerado.
        dados: Dados lidos da fonte.

    Returns:
        Caminho do SQL gerado.
    """
    materia = dados_materia.ler_materia(pasta)
    materia_banco = dados["meta"].get(CAMPO_MATERIA_BANCO, "").strip() or materia["uc"]
    pagina = "/" + html_gerado.resolve().relative_to(RAIZ).as_posix()
    nome = f"{date.today().isoformat()}-{html_gerado.stem.lower()}-seed-atividades.sql"
    saida = PASTA_SQL / nome
    saida.write_text(montar_sql(pagina, dados, materia_banco), encoding="utf-8")
    return saida


def localizar_fontes(pasta, nome_fonte):
    """Lista as fontes a gerar.

    Args:
        pasta: Pasta ATIVIDADES da matéria.
        nome_fonte: Nome de uma fonte, ou None para todas.

    Returns:
        Lista de caminhos de .md.
    """
    if nome_fonte:
        return [pasta / PASTA_FONTES / nome_fonte]
    return sorted((pasta / PASTA_FONTES).glob(PADRAO_FONTES))


def main():
    """Lê os argumentos, gera a(s) página(s) e o(s) seed(s) e mostra o resumo."""
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    pasta = Path(sys.argv[1]).resolve()
    nome_fonte = sys.argv[2] if len(sys.argv) > 2 else None
    for caminho_md in localizar_fontes(pasta, nome_fonte):
        dados = ler_fonte(caminho_md)
        html_gerado = gerar_pagina(pasta, caminho_md, dados)
        sql_gerado = gerar_seed(pasta, html_gerado, dados)
        print(f"Página: {html_gerado}")
        print(f"Seed:   {sql_gerado}")


if __name__ == "__main__":
    main()
