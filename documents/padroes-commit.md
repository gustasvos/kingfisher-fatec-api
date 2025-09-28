# 📌 Padrões de Commit
Este documento define o padrão de commits adotado pela equipe Kingfisher, inspirado em **Conventional Commits**, mas ajustado às necessidades do projeto.

---

## 🔑 Estrutura do Commit

`<tipo>: <mensagem curta>`
- **tipo** → Define a categoria da mudança.  
- **mensagem curta** → Descreve de forma clara e objetiva o que foi feito.  

---

## 🏷️ Tipos de Commit

| Tipo      | Descrição | Exemplo |
|---|---|---|
| `feat`| Nova funcionalidade. | `feat`: adiciona login seguro (US04) |
| `fix` | Correção de bugs. | `fix`: corrige falha ao confirmar presença (US02) |
| `docs` | Alterações na documentação. | `docs`: atualiza guia de instalação |
| `style` | Mudanças de formatação (não afetam lógica). | `style`: ajusta indentação conforme ESLint |
| `refactor`| Melhoria de código sem alterar comportamento externo. | `refactor`: simplifica lógica de autenticação (US04) |
| `test` | Adição ou correção de testes. | `test`: adiciona testes para confirmação de participação (US02) |
| `chore` | Tarefas de manutenção (dependências, config, scripts de build, etc). | `chore`: atualiza pacote axios |

---
## ✅ Boas Práticas

- Sempre referenciar a **US** (User Story) no commit, quando aplicável.  
- Usar verbos no infinitivo (ex: `adiciona`, `corrige`, `atualiza`).  
- Mensagens curtas e claras.  
- Adicionar detalhes no corpo do commit quando necessário:

```
# exemplo
  feat: adiciona confirmação de participação (US02)

  - Permite ao colaborador confirmar ou recusar convite
  - Salva status no banco de dados
  - Envia notificação ao administrador
```