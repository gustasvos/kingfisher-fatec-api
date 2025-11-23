# **Plataforma de Gestão Integrada - Kingfisher**

Projeto desenvolvido pela equipe Kingfisher do 2º semestre de Desenvolvimento de Software Multiplataforma da FATEC de São José dos Campos, no contexto da metodologia de ensino Aprendizagem por Projetos Integrados (API), em parceria com a NeweLog.

---
<div align="center">

[🧩 O Desafio](#-o-desafio) | [📋 Backlog de Produto](#-backlog-de-produto) | [🗓️ Cronograma de Evolução do Projeto](assets/sprint-1/cronograma-evolucao.jpg) | [👟 Sprints](#-sprints) | [💻 Tecnologias Utilizadas](#-tecnologias-utilizadas) | [🗂️ Estrutura do Projeto](#️-estrutura-do-projeto) | [📖 Manual de instalação](#-manual-de-instalação) | [📚 Documentação](/documents/) | [👥 Equipe](#-equipe) | [📒 Manual do Usuário](documents/Manual%20do%20Usuário.pdf)

</div>

---
## 🧩 O Desafio
A Plataforma de Gestão Integrada, tem como objetivo principal resolver o problema da fragmentação de processos e informações na empresa. Atualmente, a gestão administrativa, comercial e operacional é realizada em ferramentas distintas, como Microsoft Lists, Google Forms e planilhas, o que causa retrabalho, inconsistência de dados e dificuldade na análise de resultados.

A plataforma busca unificar e padronizar esses processos em um sistema centralizado e intuitivo. Com isso, os benefícios esperados são o aumento da eficiência operacional, a redução de erros, o maior controle sobre as atividades e a possibilidade de gerar relatórios precisos em tempo real, fornecendo uma base sólida para a tomada de decisões estratégicas.

---

## 📋 Backlog de Produto

| Rank	| Prioridade | User Stories | Estimativa (Pontos) | Sprint |
| --- | --- | --- | --- | --- |
| 01	| Alta |	Como administrador, eu quero criar e gerenciar colaboradores para ter um registro centralizado da equipe. | 8 | 1 |
| 02 |	Alta |	Como colaborador, eu quero confirmar ou recusar minha participação em um evento para que o organizador saiba quem estará presente. | 5 | 1 |
| 03 |	Alta |	Como administrador, eu quero consultar os eventos pendentes de confirmação para monitorar as respostas dos convidados. | 5 | 1 |
| 04 |	Alta |	Como usuário, eu quero fazer login com segurança para acessar a plataforma. | 3 | 1 |
| 05 |	Alta |	Como operador, eu quero preencher os checklists padronizados para registrar os processos. | 8 | 2 |
| 06 |	Alta |	Como gestor, eu quero visualizar e consultar os checklists preenchidos para acompanhar as operações. | 5 | 2 |
| 07 | Alta |	Como novo agregado, quero cadastrar minhas informações e as do meu veículo e receber notificações automáticas sobre o andamento e o resultado do meu cadastro. | 13 | 2 |
| 08 | Alta |	Como comercial, eu quero registrar o histórico de interações com cada cliente para ter um panorama completo da relação. | 8 | 3 |
| 09 | Alta |	Como comercial, eu quero cadastrar e gerenciar clientes para centralizar as informações de contato. | 5 | 3 |
| 11 |	Alta	| Como comercial, eu quero mudar o status do cliente de acordo com o funil de vendas (Prospect, Inicial, etc.). | 8 | 3 |
| 13 |	Alta |	Como comercial, eu quero pesquisar preços de frete para rotas e clientes específicos, para poder criar cotações de forma rápida e precisa. | 5 | 3 |
| 14	| Alta |	Como comercial, eu quero gerar e enviar uma cotação para o cliente, para documentar a proposta. | 5 | 3 |
| 15	| Alta |	Como comercial, eu quero transferir os detalhes de um frete fechado para a equipe operacional, para que eles possam dar início ao processo de logística e execução. | 8 | 3
| 10 |	Média	| Como comercial, eu quero agendar tarefas e lembretes para o próximo contato com o cliente para não perder oportunidades. | 5 | 3
| 12	| Média |	Como colaborador, eu quero receber notificações de eventos para ser informado sobre treinamentos e reuniões. | 3 | 3
---

## 👟 Sprints
| Sprint | Período | Documentação | Vídeo do Incremento |
|---|---|---|---|
| 1 | 08/09/2025 - 28/09/2025 | [Documentação Sprint 1](/documents/sprint-1/README.md) | [Vídeo Sprint 1](https://youtu.be/kRzsDg2WI8k) |
| 2 | 06/10/2025 - 26/10/2025 | [Documentação Sprint 2](/documents/sprint-2/README.md) | [Vídeo Sprint 2](https://www.youtube.com/watch?v=qgLnJRZcLRU) |
| 3 | 03/11/2025 - 24/11/2025 | [Documentação Sprint 3](/documents/sprint-3/README.md) | [Vídeo Sprint 3](https://youtu.be/Ie3C62doMhs) |

---

## 💻 Tecnologias Utilizadas
<div align="center">

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/) [![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white)](https://git-scm.com/) [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/) [![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=flat&logo=figma&logoColor=white)](https://www.figma.com/) [![Vertabelo](https://img.shields.io/badge/-Vertabelo-5D4F85?style=flat&logo=database&logoColor=white)](https://vertabelo.com/) [![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)

</div>

---
## 🗂️ Estrutura do Projeto
O projeto está dividido em duas partes principais: backend e frontend. Cada uma contém sua própria pasta src, com organização modular para facilitar o desenvolvimento e a manutenção do código.
```
kingfisher-fatec-api/
├── backend/
│   └── src/
│       ├── modules/
│       ├── shared/
│       ├── config/
│       ├── middlewares/
│       ├── utils/
│       ├── types/
│       └── index.ts
│
├── frontend/
│   └── src/
│       ├── modules/
│       ├── shared/
│       ├── routes/
│       ├── contexts/
│       ├── styles/
│       ├── types/
│       └── main.tsx
 ```
---

## 📖 Manual de Instalação
Siga os passos abaixo para rodar o projeto localmente.

### 🔧 Pré requisitos
Antes de começar, certifique-se de ter instalado:
- Node.js
- Git
- MySQL

### 🌀 Clonando o repositório
```
git clone https://github.com/gustasvos/kingfisher-fatec-api.git
cd seu-repositorio
```
### ⚙️ Configuração do Backend
1. Acesse a pasta do backend
```
cd Projeto/backend/
```

2. Instale as depêndecias
```
npm install
```

3. Crie o arquivo .env
```
cp .env.example .env
```

Configure suas variáveis de ambiente, como credenciais do MySQL, porta, etc.

4. Inicie o servidor
```
npm run dev
```
A API será iniciada em http://localhost:8080 (ou conforme definido no .env).

Certifique-se de que o banco de dados esteja rodando localmente e com o schema configurado.

### ⚙️ Configuração do Frontend

1. Acesse a pasta do frontend
```
cd ../frontend
```

2. Instale as depêndecias
```
npm install
```

3. Rode o projeto
```
npm run dev
```
O frontend estará disponível em: http://localhost:5173.

### 🎒 Banco de Dados (MySQL)
1. Crie o banco de dados local.

2. Execute os scripts SQL de criação.

3. Verifique se as credenciais estão corretas no arquivo .env.

---

## 👨‍💻 Autores

| Nome      | Função          | Redes Sociais |
|-----------|-----------------|---------------|
| Gustavo Ribeiro da Rosa | Scrum Master | <a href="https://github.com/gustasvos"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a> <a href="https://www.linkedin.com/in/gustavo-rosa-46a251180/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a> |
| Laís Zanardi Inocêncio | Product Owner | <a href="https://github.com/lais-zanardi"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a> <a href="https://www.linkedin.com/in/lais-zanardi-inocencio/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a> |
| João Vitor Silva Correa Siqueira | Desenvolvedor  | <a href="https://github.com/kakashinho"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a> <a href="https://www.linkedin.com/in/joao-vitor-siqueira-a2a2a3227/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a> |
| Ana Elize Graciano | Desenvolvedora | <a href="https://github.com/Ane-Graciano"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a> <a href="https://www.linkedin.com/in/ana-elize-graciano-107448359/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a> |
| Gabriel Kodato Faria | Desenvolvedor | <a href="https://github.com/Kodatoo"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a> <a href="https://www.linkedin.com/in/gabriel-kodato-b745742b8/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a> |
| Maria Fernanda de Oliveira Laboissiere | Desenvolvedora | <a href="https://github.com/mariaflbss"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a> <a href="https://www.linkedin.com/in/maria-fernanda-laboissiere-25362b353/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a> |
| Lucas Inácio de Carvalho | Desenvolvedor | <a href="https://github.com/Lukitta013 "><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a> <a href="https://www.linkedin.com/in/lucas-in%C3%A1cio-6aa3ba29a/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a> |
| Laura Félix de Paula | Desenvolvedora | <a href="https://github.com/lauraflx "><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a> <a href="https://www.linkedin.com/in/laura-f-382985351/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a> |
