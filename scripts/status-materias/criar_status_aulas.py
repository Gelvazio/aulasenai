"""Cria AULAS/STATUS-AULAS.md (só o status, todas as aulas em ⬜) nas matérias que não têm."""
import os,re,glob,math,subprocess,sys
BASE='MATERIAIS'; IGN=('MATERIAS-GERAIS','AGENDA_COLABORADOR')
H=subprocess.check_output(['bash','-c','TZ=America/Sao_Paulo date "+%Y-%m-%d %H:%M"']).decode().strip()
def horas(t):
    m=re.findall(r'[Cc]arga [Hh]or[aá]ria\**:?\**\s*\|?\s*\**0*(\d+)\s*h',t)
    return int(m[0]) if m else None
def temas_aulas(d):
    fs=sorted(glob.glob(f'{d}/AULAS/AULA-[0-9][0-9]-*.md'))
    return [re.sub(r'^AULA-\d\d-','',os.path.basename(f)[:-3]).replace('-',' ').capitalize() for f in fs]
saida=[]
for c in sorted(os.listdir(BASE)):
    if c in IGN or not os.path.isdir(f'{BASE}/{c}'): continue
    for m in sorted(os.listdir(f'{BASE}/{c}')):
        d=f'{BASE}/{c}/{m}'
        if not os.path.isdir(d) or os.path.exists(f'{d}/AULAS/STATUS-AULAS.md') or not os.path.exists(f'{d}/EMENTA-CHALKIE-AI.md'): continue
        t=open(f'{d}/EMENTA-CHALKIE-AI.md',encoding='utf-8').read()
        h=horas(t); n=math.ceil(h/4) if h else 1
        temas=temas_aulas(d); n=max(n,len(temas))
        linhas=[]
        for i in range(1,n+1):
            tema=temas[i-1] if i<=len(temas) else 'A definir (extrair da `EMENTA-CHALKIE-AI.md`)'
            linhas.append(f'| {i:02d} | {tema} | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |')
        obs_h=f'**Aulas:** {n} × 4 h ≈ {h} h (carga horária da `EMENTA-CHALKIE-AI.md`, 1 aula a cada 4 h, arredondando para cima).' if h else '**Aulas:** carga horária não encontrada na `EMENTA-CHALKIE-AI.md` — conferir com o professor.'
        extra='\n- Os temas vêm dos arquivos já existentes em `AULAS/` (estrutura antiga); conferir com a ementa.' if temas else ''
        txt=f'''# 📊 STATUS DAS AULAS — {m}

> Controle da regra "GERAR E GRAVAR UMA AULA POR VEZ" do `CLAUDE.md` da raiz: uma aula só passa
> para a próxima quando todas as peças dela estão ✅ (ou ⛔ não se aplica).
> Legenda: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` · `⛔ Não se aplica`.

**Criado em:** {H} (regra "Primeiro, só os status das aulas": só o status; nada foi gerado ainda).
{obs_h}

| Aula | Tema | Aula em `CONTEUDO/` | Slides | Atividade 50 questões | Prática | Banco |
|---|---|---|---|---|---|---|
{chr(10).join(linhas)}

## Observações

- "Banco" = atividades cadastradas na tabela `atividade` (seed aplicado e conferido pelo md5; registro em `database/SEEDS-APLICADOS.md`).
- Os temas "a definir" são preenchidos quando as aulas forem extraídas da ementa para `CONTEUDO/`, uma aula por vez.{extra}
'''
        os.makedirs(f'{d}/AULAS',exist_ok=True)
        open(f'{d}/AULAS/STATUS-AULAS.md','w',encoding='utf-8').write(txt)
        saida.append((f'{d}/AULAS/STATUS-AULAS.md',n,h))
for s in saida: print(*s,sep='\t')
