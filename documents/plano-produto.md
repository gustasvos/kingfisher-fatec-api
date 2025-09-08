## **Índice**

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Sprints](#sprints)
- [MVPs](#mvps)
- [Product Backlog](#product-backlog)
- [Sprint Backlog](#sprint-backlog)
- [Critérios de Aceitação das User Stories](#critérios-de-aceitação-das-user-stories)
- [Cenários](#cenários)
- [Definição de Pronto (DoR)](#definição-de-pronto-dor)
- [Definição de Concluído (DoD)](#definição-de-concluído-dod)
---
## **Visão Geral do Projeto**

O projeto em questão, a **Plataforma de Gestão Integrada**, tem como objetivo principal resolver o problema da fragmentação de processos e informações na empresa. Atualmente, a gestão administrativa, comercial e operacional é realizada em ferramentas distintas, como Microsoft Lists, Google Forms e planilhas, o que causa retrabalho, inconsistência de dados e dificuldade na análise de resultados.

A plataforma busca unificar e padronizar esses processos em um sistema centralizado e intuitivo. Com isso, os **benefícios esperados** são o aumento da eficiência operacional, a redução de erros, o maior controle sobre as atividades e a possibilidade de gerar relatórios precisos em tempo real, fornecendo uma base sólida para a tomada de decisões estratégicas.

---
## **Sprints** 

| Sprint | Objetivos                                                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | Lançar a base do sistema, incluindo a arquitetura, autenticação de usuários e um Módulo Administrativo com funcionalidades essenciais.   |
| 2      | Unificar e digitalizar os checklists operacionais, substituindo ferramentas fragmentadas e trazendo controle para a gestão do dia a dia. |
| 3      | Entregar um Módulo Comercial funcional, permitindo a gestão completa de clientes e o acompanhamento do funil de vendas.                  |

---
## **MVPs**
### **Sprint 1**

| Recurso                   | Descrição                                                                        |
| ------------------------- | -------------------------------------------------------------------------------- |
| Autenticação de Usuários  | Permite que administradores e colaboradores façam login com segurança.           |
| Cadastro de Colaboradores | A base de dados de usuários da plataforma.                                       |
| Criação de Eventos        | O administrador pode agendar e descrever eventos.                                |
| Confirmação/Recusa        | O colaborador pode responder ao convite do evento.                               |
| Visualização de Status    | O administrador pode ver quem confirmou, recusou ou está pendente para o evento. |

---
## **Product Backlog**
| Id  | Prioridade | User Stories                                                                                                                                                         |
| :-: | :--------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  |    Alta    | Como administrador, eu quero criar e gerenciar colaboradores para ter um registro centralizado da equipe.                                                            |
| 02  |    Alta    | Como colaborador, eu quero confirmar ou recusar minha participação em um evento para que o organizador saiba quem estará presente.                                   |
| 03  |    Alta    | Como administrador, eu quero consultar os eventos pendentes de confirmação para monitorar as respostas dos convidados.                                               |
| 04  |    Alta    | Como usuário, eu quero fazer login com segurança para acessar a plataforma.                                                                                          |
| 05  |    Alta    | Como operador, eu quero preencher os checklists padronizados para registrar os processos.                                                                            |
| 06  |    Alta    | Como gestor, eu quero visualizar e consultar os checklists preenchidos para acompanhar as operações.                                                                 |
| 07  |    Alta    | Como novo agregado, quero cadastrar minhas informações e as do meu veículo e receber notificações automáticas sobre o andamento e o resultado do meu cadastro.       |
| 08  |    Alta    | Como comercial, eu quero registrar o histórico de interações com cada cliente para ter um panorama completo da relação.                                              |
| 09  |    Alta    | Como comercial, eu quero cadastrar e gerenciar clientes para centralizar as informações de contato.                                                                  |
| 10  |    Alta    | Como comercial, eu quero agendar tarefas e lembretes para o próximo contato com o cliente para não perder oportunidades.                                             |
| 11  |    Alta    | Como comercial, eu quero mudar o status do cliente de acordo com o funil de vendas (Prospect, Inicial, etc.).                                                        |
| 12  |   Média    | Como colaborador, eu quero receber notificações de eventos para ser informado sobre treinamentos e reuniões.                                                         |
| 13  |    Alta    | Como comercial, eu quero pesquisar preços de frete para rotas e clientes específicos, para poder criar cotações de forma rápida e precisa.                           |
| 14  |    Alta    | Como comercial, eu quero gerar e enviar uma cotação para o cliente, para documentar a proposta.                                                                      |
| 15  |    Alta    | Como o comercial, eu quero transferir os detalhes de um frete fechado para a equipe operacional, para que eles possam dar início ao processo de logística e execução |

---
## **Sprint Backlog**
### **Sprint 1**

| Id  | Prioridade | User Stories                                                                                                                       |
| :-: | :--------: | ---------------------------------------------------------------------------------------------------------------------------------- |
| 01  |    Alta    | Como administrador, eu quero criar e gerenciar colaboradores para ter um registro centralizado da equipe.                          |
| 02  |    Alta    | Como colaborador, eu quero confirmar ou recusar minha participação em um evento para que o organizador saiba quem estará presente. |
| 03  |    Alta    | Como administrador, eu quero consultar os eventos pendentes de confirmação para monitorar as respostas dos convidados.             |
| 04  |    Alta    | Como usuário, eu quero fazer login com segurança para acessar a plataforma.                                                        |

---
## **Critérios de Aceitação das User Stories**

| US     | User Story                                                                                                                                                                 | Critérios de Aceitação                                                                                                                                                                                                                                                                                                                                                       |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **01** | **Cadastro de Colaboradores**<br>Como administrador, eu quero criar e gerenciar colaboradores para ter um registro centralizado da equipe.                                 | - A tela de cadastro deve conter campos para Nome, E-mail, Cargo e Data de Contratação.<br>- O campo E-mail deve ter um formato de validação (`@` e `.com`).<br>- Nome e E-mail são campos obrigatórios.<br>- O administrador deve ser capaz de editar e excluir o registro de um colaborador.<br>- O e-mail deve ser único no sistema.                                      |
| **02** | **Confirmação ou Recusa de Eventos**<br>Como colaborador, eu quero confirmar ou recusar minha participação em um evento para que o organizador saiba quem estará presente. | - A tela do evento deve exibir botões para **"Confirmar"** e **"Recusar"**.<br>- Ao recusar, um campo de texto opcional para o motivo deve ser exibido.<br>- Uma mensagem de sucesso deve ser exibida após o envio da resposta.<br>- O status do colaborador para o evento deve ser atualizado no banco de dados.                                                            |
| **03** | **Monitoramento de Eventos**<br>Como administrador, eu quero consultar os eventos pendentes de confirmação para monitorar as respostas dos convidados.                     | - A tela deve listar os eventos.<br>- Ao clicar em um evento, uma lista de convidados e seus status (`Confirmado`, `Recusado`, `Pendente`) deve ser exibida.<br>- O motivo da recusa, se informado, deve ser visível.                                                                                                                                                        |
| **04** | **Login Seguro**<br>Como usuário, eu quero fazer login com segurança para acessar a plataforma.                                                                            | - A tela de login deve ter campos para **CPF** e **Senha**.<br>- O CPF deve ser validado (11 dígitos e o dígito verificador).<br>- A senha deve ser criptografada e comparada com a do banco de dados.<br>- Uma mensagem de erro genérica deve ser exibida em caso de falha de login.<br>- O usuário deve ser redirecionado para a página inicial após o login bem-sucedido. |

---
## **Cenários**
| **User Story Id** | Cenário                                         | Descrição                                                                                                                                                                                                                                                                                                                             |
| :---------------- | :---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01                | Cadastro de colaborador duplicado               | **Dado que:** um colaborador já está cadastrado no sistema.<br><br>**Quando:** o administrador tenta cadastrar um novo colaborador com mesmo e-mail ou CPF.<br><br>**Então:** o sistema deve impedir o cadastro e exibir uma mensagem informando que o colaborador já está cadastrado.                                                |
| 01                | Cadastro de um novo colaborador                 | **Dado que:** o administrador está na tela de cadastro de colaboradores.<br><br>**Quando:** ele preenche todos os campos obrigatórios (nome, e-mail, cargo) e clica em Salvar.<br><br>**Então:** o sistema deve criar um novo registro no banco de dados, e o novo colaborador deve aparecer na lista de colaboradores ativos.        |
| 02                | Confirmação de participação                     | **Dado que:** um colaborador recebeu um convite para um evento.<br><br>**Quando:** ele clica no link do convite e seleciona a opção Confirmar Participação.<br><br>**Então:** o sistema deve registrar sua resposta como "Confirmado", e uma mensagem de sucesso deve ser exibida.                                                    |
| 02                | Recusa de Participação com Motivo               | **Dado que:** um colaborador recebeu um convite para um evento.<br>    <br>**Quando:** ele clica no link do convite, seleciona Recusar Participação, preenche o motivo e envia a resposta.<br>    <br>**Então:** o sistema deve registrar sua resposta como "Recusado" e salvar o motivo, e uma mensagem de sucesso deve ser exibida. |
| 03                | Visualização rápida de eventos futuros          | **Dado que:** o administrador acessa a tela de consulta de eventos.<br><br>**Quando:** a tela é carregada.<br><br>**Então:** o sistema deve exibir uma lista de todos os eventos futuros, e deve ser fácil identificar quantos convidados estão com o status "Pendente" para cada evento.                                             |
| 03                | Verificação do status de convidados específicos | **Dado:** que o administrador está na tela de consulta de eventos.<br><br>**Quando:** ele seleciona um evento para ver os detalhes.<br><br>**Então:** o sistema deve mostrar uma lista de todos os convidados para aquele evento, exibindo o status de resposta de cada um (Confirmado, Recusado ou Pendente).                        |
| 04                | Login com credenciais válidas                   | **Dado:** que o usuário está na tela de login.<br><br>**Quando:** ele insere seu CPF e senha corretos e clica em Entrar.<br><br>**Então:** o sistema deve validar as credenciais, autenticá-lo e redirecioná-lo para a página inicial da plataforma.                                                                                  |
| 04                | Tentativa de login com credenciais inválidas    | **Dado:** que o usuário está na tela de login.<br><br>**Quando:** ele insere um CPF ou senha incorretos.<br><br>**Então:** o sistema deve exibir uma mensagem de erro genérica (ex: "CPF ou senha inválidos"), e o usuário deve permanecer na tela de login.                                                                          |

## **Definição de Pronto (DoR)**
### **Sobre User Stories**

- [ ] Tem título claro, descrição bem definida e objetivo compreendido
- [ ] Tem critérios de aceitação escritos
- [ ] Tem regras de negócio claras
- [ ] Foi estimada pela equipe
- [ ] Sem dependências bloqueadoras
- [ ] Compreensão validada com o time

---

### **Sobre artefatos correlatos às User Stories**

- [ ] Design/documentação disponível
- [ ] Regras de negócio detalhadas (texto ou diagrama)
- [ ] Modelo de dados disponível
- [ ] Estratégia de testes definida

## **Definição de Concluído (DoD)**

