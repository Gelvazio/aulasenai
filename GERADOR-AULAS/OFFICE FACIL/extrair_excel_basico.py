# -*- coding: utf-8 -*-
"""
Extrai as páginas 1 a 20 da apostila "Excel Básico.pdf" (Office Fácil) e gera
um Markdown detalhado e explicativo.

O PDF é escaneado (só imagens, sem camada de texto). Por isso o script:
  1. renderiza cada página em JPEG com PyMuPDF;
  2. reconhece o texto com o OCR nativo do Windows (Windows.Media.Ocr, pt-BR),
     acionado via PowerShell — não exige instalar Tesseract;
  3. monta o Markdown com: explicação didática + texto extraído + imagem.

Uso:
    C:\\Python314\\python.exe extrair_excel_basico.py
"""

import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path

import pymupdf

sys.dont_write_bytecode = True  # não gerar __pycache__ ao importar as explicações
from explicacoes_excel_basico import EXPLICACOES  # noqa: E402

PASTA = Path(__file__).resolve().parent
PDF = PASTA / "Excel Básico.pdf"
PASTA_IMAGENS = PASTA / "excel-basico-paginas"
SAIDA_MD = PASTA / "Excel-Basico-paginas-01-20.md"

PAGINA_INICIAL = 1
PAGINA_FINAL = 20
DPI = 200  # o OCR do Windows limita a maior dimensão da imagem
JPG_QUALIDADE = 80

# Script PowerShell que recebe caminhos de imagens e devolve, em JSON, as linhas
# reconhecidas de cada imagem (texto + posição).
OCR_PS1 = r"""
param([string]$Lista)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGen = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
    $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op, [Type]$tipo) {
    $t = $asTaskGen.MakeGenericMethod($tipo).Invoke($null, @($op))
    $t.Wait(-1) | Out-Null
    $t.Result
}
[Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine,Windows.Foundation,ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics,ContentType=WindowsRuntime] | Out-Null
[Windows.Globalization.Language,Windows.Globalization,ContentType=WindowsRuntime] | Out-Null
$lang = [Windows.Globalization.Language]::new('pt-BR')
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
$saida = @()
foreach ($img in (Get-Content -LiteralPath $Lista -Encoding UTF8)) {
    $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($img)) ([Windows.Storage.StorageFile])
    $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $dec = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bmp = Await ($dec.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $res = Await ($engine.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])
    $linhas = @()
    foreach ($l in $res.Lines) {
        foreach ($w in $l.Words) { $r = $w.BoundingRect; break }
        $linhas += [pscustomobject]@{ texto = $l.Text; x = [int]$r.X; y = [int]$r.Y; h = [int]$r.Height }
    }
    $saida += [pscustomobject]@{ imagem = $img; linhas = $linhas }
    $stream.Dispose()
}
ConvertTo-Json -InputObject $saida -Depth 5 -Compress
"""


def renderizar_paginas():
    """Salva cada página do intervalo como JPEG e devolve a lista de caminhos."""
    PASTA_IMAGENS.mkdir(exist_ok=True)
    doc = pymupdf.open(PDF)
    print(f"PDF: {PDF.name} ({doc.page_count} páginas) — processando {PAGINA_INICIAL} a {PAGINA_FINAL}")
    caminhos = []
    for num in range(PAGINA_INICIAL, PAGINA_FINAL + 1):
        destino = PASTA_IMAGENS / f"pagina-{num:02d}.jpg"
        doc[num - 1].get_pixmap(dpi=DPI).save(destino, jpg_quality=JPG_QUALIDADE)
        caminhos.append(destino)
    doc.close()
    return caminhos


def ocr_windows(caminhos):
    """Executa o OCR do Windows em todas as imagens de uma vez."""
    ps1 = PASTA_IMAGENS / "_ocr_windows.ps1"
    lista = PASTA_IMAGENS / "_ocr_lista.txt"
    ps1.write_text(OCR_PS1, encoding="utf-8-sig")
    lista.write_text("\n".join(str(c) for c in caminhos), encoding="utf-8-sig")
    try:
        proc = subprocess.run(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(ps1),
             "-Lista", str(lista)],
            capture_output=True, timeout=600,
        )
    finally:
        ps1.unlink(missing_ok=True)
        lista.unlink(missing_ok=True)
    if proc.returncode != 0:
        sys.exit("Falha no OCR do Windows:\n" + proc.stderr.decode("utf-8", "replace"))
    dados = json.loads(proc.stdout.decode("utf-8-sig"))
    if isinstance(dados, dict):
        dados = [dados]
    return [pagina["linhas"] or [] for pagina in dados]


def linhas_para_paragrafos(linhas):
    """Agrupa as linhas do OCR em parágrafos pelo espaço vertical entre elas."""
    if isinstance(linhas, dict):
        linhas = [linhas]
    paragrafos, atual, anterior = [], [], None
    for linha in linhas:
        texto = " ".join(linha["texto"].split())
        if not texto:
            continue
        if anterior is not None:
            salto = linha["y"] - (anterior["y"] + anterior["h"])
            if salto > anterior["h"] * 1.2 or salto < -anterior["h"] or abs(linha["x"] - anterior["x"]) > 400:
                paragrafos.append(" ".join(atual))
                atual = []
        atual.append(texto)
        anterior = linha
    if atual:
        paragrafos.append(" ".join(atual))
    return paragrafos


def montar_secao(num, paragrafos):
    info = EXPLICACOES.get(num, {})
    titulo = info.get("titulo", f"Página {num}")
    partes = [f"## Página {num:02d} — {titulo}", ""]
    if info.get("tema"):
        partes += [f"> **Tema:** {info['tema']}", ""]
    if info.get("explicacao"):
        partes += ["### Explicação detalhada", "", info["explicacao"].strip(), ""]
    if info.get("passos"):
        partes += ["### Como fazer (passo a passo)", ""]
        partes += [f"{i}. {p}" for i, p in enumerate(info["passos"], 1)] + [""]
    if info.get("atalhos"):
        partes += ["### Atalhos e dicas", "", "| Atalho / Dica | O que faz |", "|---|---|"]
        partes += [f"| {a} | {d} |" for a, d in info["atalhos"]] + [""]
    if info.get("exercicio"):
        partes += ["### Exercício / atividade da página", "", info["exercicio"].strip(), ""]
    partes += ["### Texto extraído da página (OCR)", "",
               "<details><summary>Mostrar texto reconhecido</summary>", ""]
    partes += [f"> {p}" + "  " for p in paragrafos] or ["> (nenhum texto reconhecido)"]
    partes += ["", "</details>", "",
               f"![Página {num}]({PASTA_IMAGENS.name}/pagina-{num:02d}.jpg)", "", "---", ""]
    return "\n".join(partes)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    caminhos = renderizar_paginas()
    print("Executando OCR do Windows (pt-BR)...")
    resultados = ocr_windows(caminhos)

    cabecalho = [
        "# Excel Básico — Office Fácil (páginas 1 a 20)",
        "",
        f"> Gerado automaticamente por `{Path(__file__).name}` em "
        f"{datetime.now():%d/%m/%Y %H:%M}.  ",
        f"> Fonte: `{PDF.name}` (PDF escaneado; texto obtido por OCR do Windows).",
        "",
        "## Sumário",
        "",
    ]
    for num in range(PAGINA_INICIAL, PAGINA_FINAL + 1):
        titulo = EXPLICACOES.get(num, {}).get("titulo", f"Página {num}")
        cabecalho.append(f"{num}. Página {num:02d} — {titulo}")
    cabecalho += ["", "---", ""]

    secoes = []
    for num, linhas in zip(range(PAGINA_INICIAL, PAGINA_FINAL + 1), resultados):
        paragrafos = linhas_para_paragrafos(linhas)
        secoes.append(montar_secao(num, paragrafos))
        print(f"  Página {num:02d}: {len(paragrafos)} blocos de texto")

    SAIDA_MD.write_text("\n".join(cabecalho) + "\n".join(secoes), encoding="utf-8")
    print(f"Markdown salvo em: {SAIDA_MD}")


if __name__ == "__main__":
    main()
