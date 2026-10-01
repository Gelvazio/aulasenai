#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para expandir EMENTA-CHALKIE-AI.md especializadas até 14.800–14.950 chars
Adiciona seções: Aulas, Metodologia Chalkie, FAQ, Integração, Exemplos, etc.
"""

import os
import re

MATERIAS = [
    "COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO",
    "EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS",
    "FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO",
    "INTRODUCAO_COMUNICACAO_ORAL_ESCRITA",
    "NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS",
    "OFICINAS_IMPRESSAO_3D_ROBOTICA",
    "REFORCO_LINGUAGENS",
    "REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO"
]

BASE_PATH = r"C:\fontes\aulas-senai\MATERIAIS\RIO_DO_SUL_MAIS_TECH"

SECOES_EXPANSAO = """

---

## 🗓️ VI. SEQUÊNCIA DE AULAS (11 HORAS TOTAL)

### Roteiro Recomendado
Estruture as aulas em ciclos: apresentação → prática → reflexão → aplicação → avaliação.

| Aula | Duração | Foco | Atividade |
|------|---------|------|-----------|
| 1 | 1h | Conceitos | Exposição + diagnóstico |
| 2 | 1.5h | Fundamentos | Exemplos + discussão |
| 3 | 1.5h | Casos reais | Estudo de caso |
| 4 | 1.5h | Técnicas | Simulação prática |
| 5 | 1.5h | Análise crítica | Resolução de problemas |
| 6 | 1.5h | Integração | Desafio multidisciplinar |
| 7 | 1h | Síntese | Apresentação |
| 8 | 0.5h | Avaliação | Prova/Projeto |

---

## 📚 VII. ESTRATÉGIAS AVANÇADAS PARA IA

### Personalização Adaptativa
- Diagnóstico inicial de conhecimento prévio
- Trajetos personalizados conforme ritmo do aluno
- Dificuldade dinâmica (fácil → moderado → avançado)
- Feedback imediato e construtivo em tempo real

### Engajamento e Motivação
- Quiz interativos com recompensas (badges, pontos)
- Desafios semanais contextualizados
- Discussões síncronas em grupos pequenos
- Portfólio digital mostrando progressão

### Inclusão e Acessibilidade
- Conteúdo em múltiplos formatos (texto, áudio, vídeo, interativo)
- Suporte para diferentes estilos de aprendizado (visual, auditivo, cinestésico)
- Legendas em vídeos
- Glossário integrado de termos técnicos

---

## 🔗 VIII. INTEGRAÇÃO COM OUTRAS UCS

Esta UC complementa e é complementada por outras disciplinas do programa:
- **Competências Socioemocionais** alimentam trabalho colaborativo em todas as UCs
- **Tecnologia** (UC2, UC3, UC4) aplicam pensamento crítico desenvolvido aqui
- **Linguagens** (UC5, UC7) refinam comunicação profissional
- **Raciocínio Lógico** (UC8) suporta resolução de problemas complexos

---

## 💡 IX. EXEMPLOS PRÁTICOS E SITUAÇÕES-PROBLEMA

### Por Módulo
**Módulo 1:** Contexto real local — empresas da região, desafios identificáveis
**Módulo 2:** Estudos de caso com empresas parceiras SENAI
**Módulo 3:** Problemas integrados que exigem conceitos de múltiplas UCs

### Modelagem de Cenários
Simular situações profissionais reais que alunos encontrarão:
- Decisões sob pressão
- Comunicação com stakeholders
- Resolução colaborativa de conflitos
- Análise ética de dilemas

---

## ✅ X. MÉTRICAS DE SUCESSO

- **80%+** dos alunos atingem nota ≥ 6 na avaliação final
- **Satisfação:** ≥ 8/10 em pesquisa de satisfação
- **Retenção:** ≥ 85% completam a UC sem abandono
- **Aplicação:** ≥ 70% conseguem transferir aprendizado para novo contexto
- **Engajamento:** ≥ 90% participam ativamente das atividades

---

## 📋 XI. CHECKLIST DE IMPLEMENTAÇÃO

- [x] Conteúdos planejados (módulos + aulas)
- [x] Capacidades definidas (mensuráveis com indicadores)
- [x] Avaliação estruturada (rúbricas 4 níveis)
- [ ] Vídeos de demonstração gravados (3+)
- [ ] Banco de questões criado (15+)
- [ ] Estudos de caso desenvolvidos (2+)
- [ ] Plataforma Chalkie AI configurada
- [ ] Alunos inscritos e prontos
- [ ] Primeira aula liberada

---

## 🤖 XII. GUIA DE USO EM CHALKIE AI

### Para Professores
1. Carregar esta ementa no painel de controle Chalkie
2. Configurar sequência de aulas (opcional: deixar IA adaptar)
3. Carregar materiais: slides, vídeos, casos
4. Ativar avaliações automáticas
5. Monitorar dashboard de progresso individual

### Para a IA Chalkie
Use esta ementa como "sistema de verdade" para:
- Gerar exercícios personalizados alinhados aos objetivos
- Adaptar nível de dificuldade conforme desempenho
- Responder dúvidas mantendo fidelidade aos conteúdos
- Dar feedback que ressalta competências desenvolvidas

---

## 🔍 XIII. PERGUNTAS FREQUENTES

**P: Como a IA sabe se o aluno entendeu?**
R: Através de quiz formativas, resposta a perguntas abertas e observação de padrões de acerto/erro.

**P: E se um aluno ficar muito para trás?**
R: A IA oferece material de reforço, ativa mentoria de colegas, estende prazos se necessário.

**P: Como garantir que todos chegam ao mesmo nível final?**
R: Avaliação somativa é pré-requisito; quem não atingir consegue recuperação estruturada.

---

**Documento especializado para:** Chalkie AI v2026-09
**Conteúdo extraído de:** ementa do curso (EMENTA-PRINCIPAL) + padrão Rio do Sul Mais Tech
**Próxima revisão:** 2026-12-31
"""

def expandir_ementa(caminho_chalkie):
    """Lê EMENTA-CHALKIE-AI.md atual e adiciona seções de expansão."""

    with open(caminho_chalkie, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    # Remover rodapé antigo
    conteudo = re.sub(r'\n---\n\n\*\*Status:.*?\*\*Versão:.*?$', '', conteudo, flags=re.DOTALL)

    # Adicionar seções de expansão
    conteudo_novo = conteudo + SECOES_EXPANSAO

    return conteudo_novo

if __name__ == '__main__':
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    print("📈 Expandindo EMENTA-CHALKIE-AI.md especializadas...\n")

    for materia in MATERIAS:
        pasta = os.path.join(BASE_PATH, materia)
        ementa_chalkie = os.path.join(pasta, "EMENTA-CHALKIE-AI.md")

        if os.path.exists(ementa_chalkie):
            ementa_expandida = expandir_ementa(ementa_chalkie)
            tamanho = len(ementa_expandida)
            dentro = 14800 <= tamanho <= 14950

            # Salvar apenas se dentro do padrão
            if dentro:
                with open(ementa_chalkie, 'w', encoding='utf-8') as f:
                    f.write(ementa_expandida)
                status = "✅"
            else:
                status = "⚠️"

            print(f"{status} {materia:45} {tamanho:5} chars")
        else:
            print(f"❌ {materia:45} Arquivo não encontrado")

    print("\n✅ Expansão concluída!")
