# 🗂️ Modelo do STATUS.md e regras de gestão

Vale para qualquer tarefa (código, apostila, slides, banco, pequena ou grande). Objetivo: qualquer
pessoa ou IA retoma pelo arquivo, sem depender de memória. Fluxo do dia a dia: `status-flow.md`.

## Regras de gestão

| Fase | Regra |
|------|-------|
| Início | Objetivo em 1 frase · escopo (entra / não entra) · critério de pronto · partes interessadas · premissas e restrições |
| Planejamento | Etapas e itens pequenos (horas, não semanas) · ordem e dependências · riscos com plano B · plano aprovado antes de executar |
| Execução | Status na hora · 1 item por vez · bloqueio informado na hora · mudança de escopo = nova aprovação · cada item com verificação |
| Comunicação | Fonte única (links para plano, regras e entregável) · registro de decisões (o quê, quando, quem, por quê) · linguagem simples |
| Continuidade | Próximo passo sempre atualizado · commit por tarefa · histórico nunca apagado (só se acrescentam etapas) |
| Encerramento | Aceite formal de quem pediu · pendências documentadas · lições aprendidas |

⭐ **Regra de ouro:** planejar → aprovar → executar 1 item por vez → registrar na hora → entregar.

## Modelo

```markdown
# STATUS — <Nome>

**Objetivo:** <1 frase: o que e por quê>
**Partes interessadas:** <quem decide / aprova / usa>
**Links:** [Regras](CLAUDE.md) · [Planos](docs/) · <entregável>
**Próximo passo:** <item exato a executar agora>

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado

## Escopo
- **Entra:** … · **Não entra:** …
- **Critério de pronto:** … · **Premissas e restrições:** …

## Etapa N — <nome> (aprovada em AAAA-MM-DD)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| N.1 | … | ⬜ Pendente | — | <como foi conferido> |
| N.x | Aceite do usuário | ⬜ Pendente | — | — |

## Riscos
| Risco | Chance | Impacto | Plano B | Situação |

## Bloqueios
| Data | Item | Motivo | O que destrava | Resolvido em |

## Registro de decisões
| Data | Decisão | Quem | Por quê |

## Pendências (ficou para depois)
| Item | Motivo | Quando retomar |

## Lições aprendidas
| Data | O que aconteceu | Lição / nova regra |
```

- Seções sem conteúdo ficam com a tabela vazia (não apagar o cabeçalho).
- `STATUS.md` antigo: migrar para o modelo **sem apagar** o histórico.
