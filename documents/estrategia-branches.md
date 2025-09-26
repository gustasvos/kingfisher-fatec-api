# **🌿 Estratégia de Branches: Gitflow**

O projeto utilizará a estratégia Gitflow para organizar o fluxo de versionamento, garantindo clareza na separação entre desenvolvimento, testes e entregas em produção.

---

## 🔀 Estrutura de Branches

| Branch | Descrição |
| --- | --- |
| `main`| Contém o código em estado estável e pronto para produção. Apenas merges de versões validadas chegam aqui.
| `develop` | Branch principal de desenvolvimento. Reúne as funcionalidades que já passaram por testes de integração e estão preparadas para futuras releases.
| `feature/*` | Criadas a partir de develop para desenvolvimento de novas funcionalidades ou ajustes específicos. |
| `release/*` | Criadas a partir de develop quando o projeto atinge um conjunto de funcionalidades pronto para preparação de versão. Aqui ocorrem ajustes finais, correções de bugs e revisões. |
| `hotfix/*` | Criadas a partir de main para corrigir problemas críticos em produção. Após a correção, são integradas tanto em main quanto em develop.

---

## ✅ Justificativa do Uso no Projeto

- Organização clara do fluxo de trabalho
- Facilita a colaboração entre diferentes membros do time, separando o que está em desenvolvimento do que está pronto para produção.
- Controle de releases
Permite preparar versões estáveis em release/*, garantindo que apenas código validado chegue em main.
- Gestão eficiente de correções urgentes
O uso de hotfix/* possibilita resolver falhas em produção rapidamente sem impactar o fluxo de desenvolvimento em andamento.

---

📌 Em resumo, o Gitflow foi escolhido para este projeto por oferecer um ciclo de vida de branches bem definido, que garante qualidade, previsibilidade nas entregas e facilidade de manutenção do código em diferentes estágios.