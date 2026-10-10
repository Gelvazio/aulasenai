"""Cria STATUS-ATIVIDADES, STATUS-EMENTAS e STATUS-APOSTILA (só a estrutura, tudo ⬜) onde faltam."""
import os,re,glob,subprocess,unicodedata
B='MATERIAIS'; IGN=('MATERIAS-GERAIS','AGENDA_COLABORADOR')
H=subprocess.check_output(['bash','-c','TZ=America/Sao_Paulo date "+%Y-%m-%d %H:%M"']).decode().strip()
STOP={'DE','DA','DO','DAS','DOS','E','A','O','PARA','NOS','NO','NA','AO','EDUCACAO','TRABALHO'}
def pal(s):
    s=unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().upper()
    return {p for p in re.split(r'[^A-Z0-9]+',s) if p and p not in STOP}
def aulas(d):
    t=open(f'{d}/AULAS/STATUS-AULAS.md',encoding='utf-8').read()
    return re.findall(r'^\| (\d\d) \| ([^|]+?) \|',t,re.M)
def ch_materia(t):
    m=re.findall(r'[Cc]arga [Hh]or[aá]ria\**:?\**\s*\|?\s*\**0*(\d+)\s*h',t); return int(m[0]) if m else None
def ch_curso(c,m):
    f=glob.glob(f'{B}/{c}/EMENTA-PRINCIPAL-*.md')
    if not f: return None
    alvo=pal(m.replace('-',' ').replace('_',' ')); melhor=(0,None)
    for nome,h in re.findall(r'^#{2,4} [^\n]*?([^—\n]+) \((\d+)h\)\s*$',open(f[0],encoding='utf-8').read(),re.M):
        s=len(alvo & pal(nome))/max(1,len(alvo))
        if s>melhor[0]: melhor=(s,int(h))
    return melhor[1] if melhor[0]>=0.6 else None
def st_atividades(m,A):
    ob='\n'.join(f'| {n} | {t} | ⬜ | 50 | ⬜ | ⬜ | ⬜ |' for n,t in A)
    pr='\n'.join(f'| {n} | ⬜ `ATIVIDADE-PRATICA-AULA-{n}.html` | 10 × 3 (10 pontos) | ⬜ | ⬜ | ⬜ |' for n,_ in A)
    return f'''# 📝 STATUS DAS ATIVIDADES — {m}

> Regra "1 ATIVIDADE OBJETIVA DE 50 QUESTÕES POR AULA" do `CLAUDE.md` da raiz: cada aula tem
> `ATIVIDADES-AULA-NN-50-QUESTOES.html` com **exatamente 50 questões**, fonte em `CONTEUDO/`,
> folha de respostas no banco e cadastro em `atividade` + `gabarito`. Gerar uma aula por vez,
> completa, e atualizar este arquivo a cada atividade.
> Legenda: `⬜ Pendente` · `🔄 Em progresso / falta banco` · `⚠️ Incompleta` · `✅ Concluída`.

**Criado em:** {H} (só a estrutura; nada foi gerado ainda). **Aulas:** {len(A)} (de `AULAS/STATUS-AULAS.md`).

## Atividade objetiva de 50 questões por aula

| Aula | Tema | Página | Questões | Fonte (`.md`) | Banco | Status |
|---|---|---|---|---|---|---|
{ob}

## Atividade prática por aula (padrão da prova id 82)

| Aula | Página | Itens × tópicos | Fonte + padrão de resposta | Banco | Status |
|---|---|---|---|---|---|
{pr}

## Avaliações (modelo da ITIC)

| Página | Tipo | Status |
|---|---|---|
| `AVALIACAO-OBJETIVA-01.html` | Objetiva | ⬜ Pendente |
| `AVALIACAO-PRATICA.html` | Prática (20 questões × 3 tópicos) | ⬜ Pendente |
| `AVALIACAO-MEDIA-FINAL.html` | Média final (`media-final.json`) | ⬜ Pendente |
'''
def st_ementa(c,m,d):
    t=open(f'{d}/EMENTA-CHALKIE-AI.md',encoding='utf-8').read(); n=len(t)
    conf='✅ CONFORME (14.800–14.950 chars)' if 14800<=n<=14950 else '⚠️ fora do padrão 14.800–14.950 chars'
    hm,hc=ch_materia(t),ch_curso(c,m)
    if hm and hc: cmp='✅ Igual à ementa do curso' if hm==hc else '⚠️ Diferente da ementa do curso'
    else: cmp='⚠️ Conferir (não encontrada nas duas ementas)'
    mj='x' if os.path.exists(f'{d}/materia.json') else ' '
    qp='\n- ⛔ Em `QUALIFICACAO-PROFISSIONAL/` a ementa é só do professor: a IA só lê.' if c=='QUALIFICACAO-PROFISSIONAL' else ''
    return f'''# STATUS-EMENTAS — {m}

**Última atualização:** {H[:10]}

---

## 📊 Status Atual

| Arquivo | Status | Tamanho | Observações |
|---------|--------|---------|-------------|
| **EMENTA-CHALKIE-AI.md** | ✅ PRESENTE | {n} chars | {conf} |

## ⏱️ Carga Horária

| Ementa da matéria | Ementa do curso | Conferência |
|-------------------|-----------------|-------------|
| {f"{hm}h" if hm else "—"} | {f"{hc}h" if hc else "—"} | {cmp} |

---

## 🎯 Fase Atual

{"✅ Ementa presente e conforme" if 14800<=n<=14950 else "🔄 Ementa presente; conferir o padrão de tamanho"}

---

## 📋 Checklist de Completude

- [x] EMENTA-CHALKIE-AI.md foi criada
- [{"x" if 14800<=n<=14950 else " "}] EMENTA-CHALKIE-AI.md está dentro do padrão 14.800–14.950 chars
- [{mj}] `materia.json` criado a partir da ementa
- [ ] Conteúdo foi revisado por professor
- [ ] Pronto para produção{qp}

---

## 📝 Histórico de Alterações

| Data | Ação | Detalhes |
|------|------|----------|
| {H[:10]} | Status criado | Arquivo de status criado a pedido do usuário (só a situação atual; a ementa não foi alterada) |
'''
def st_apostila(m,A):
    return f'''# 📘 STATUS DA APOSTILA — {m}

> Regra "REGRAS APOSTILAS" (`docs/regras/apostilas.md`). Estado geral no `tasks/STATUS.md`.
> Legenda: `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` · `👀 Aguardando validação`.

**Criado em:** {H} (só a estrutura; nada foi gerado ainda). **Apostila (única):** `APOSTILA-{m}.md` →
`APOSTILA-{m}.html` (+ PDF, fora do Git) · **Fontes:** `CONTEUDO/INTRODUCAO.md` e
`CONTEUDO/CAPITULO-NN.md` (a partir das aulas de `CONTEUDO/`) · **Gerador:**
`assets/gerador-apostilas/gerar_apostila.py`. **Aulas da matéria:** {len(A)}.

| Parte | Status |
|---|---|
| Introdução + capítulos (teoria, resumo, glossário) | ⬜ Pendente |
| Conferência Markdown × ementa (`--conferir`) | ⬜ Pendente |
| HTML gerado a partir do Markdown completo | ⬜ Pendente |
| PDF (headless) | ⬜ Pendente |
'''
criados=[]
for c in sorted(os.listdir(B)):
    if c in IGN or not os.path.isdir(f'{B}/{c}'): continue
    for m in sorted(os.listdir(f'{B}/{c}')):
        d=f'{B}/{c}/{m}'
        if not os.path.isdir(d) or not os.path.exists(f'{d}/EMENTA-CHALKIE-AI.md'): continue
        A=aulas(d)
        for rel,fn in (('ATIVIDADES/STATUS-ATIVIDADES.md',lambda:st_atividades(m,A)),('STATUS-EMENTAS.md',lambda:st_ementa(c,m,d)),('APOSTILA/STATUS-APOSTILA.md',lambda:st_apostila(m,A))):
            p=f'{d}/{rel}'
            if os.path.exists(p): continue
            os.makedirs(os.path.dirname(p),exist_ok=True); open(p,'w',encoding='utf-8').write(fn()); criados.append(p)
open(os.environ.get('SAIDA_LISTA','status-criados.txt'),'w').write('\n'.join(criados))
print(len(criados))
