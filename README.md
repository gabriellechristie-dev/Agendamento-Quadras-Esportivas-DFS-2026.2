# API de Agendamento de Quadras

> **Projeto DFS-2026.2** desenvolvido como requisito do **CURSO: DESENVOLVIMENTO FULL STACK BÁSICO** para o **Bootcamp Atlântico Avanti**.

Uma API RESTful robusta e segura projetada para o gerenciamento e agendamento de quadras esportivas, conectando jogadores a espaços disponíveis.

## Objetivo do Projeto

O objetivo deste projeto é fornecer uma infraestrutura de backend segura e eficiente para um sistema de locação e agendamento de quadras esportivas, integrando o cadastro de jogadores, gerenciamento de quadras e o controle de reservas por meio de uma API RESTful.

---

## Índice

- [Equipe](#equipe)
- [Tecnologias](#tecnologias)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Testes Automatizados](#testes-automatizados)
- [Documentação da API](#documentação-da-api)

---

## Equipe

Este projeto foi construído colaborativamente pelos seguintes integrantes:

- **Hevlina Karoll Lima Reis**
- **Gabrielle Christie do Nascimento de Souza**
- **Fellipi Kainnan Candido de Lima**

---

## Tecnologias

O ecossistema do projeto foi construído utilizando as ferramentas mais modernas do mercado:

- **Ambiente & Framework:** Node.js + Express (v5)
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma Client
- **Segurança:** JWT (JSON Web Token) para autenticação e Bcrypt.js para hash de senhas
- **Ferramentas:** Cors, Dotenv, Nodemon, Jest, Supertest

---

## Funcionalidades Principais

- **Autenticação Segura:** Login para Jogadores e Administradores via tokens JWT.
- **Gestão de Usuários:** Cadastro e gerenciamento de perfis.
- **Catálogo de Quadras:** Registro de espaços com informações sobre modalidade, localização e disponibilidade (`DISPONIVEL` ou `INDISPONIVEL`).
- **Sistema de Reservas:** Motor de agendamento que calcula horários, atrela o jogador à quadra e gerencia o ciclo de vida da reserva (`ATIVA`, `CANCELADA`, `CONCLUIDA`).

---

## Estrutura do Banco de Dados

O modelo de dados (Schema Prisma) está dividido em quatro entidades principais com relacionamentos consistentes:

1.  **Administrador:** Controle total do sistema.
2.  **Jogador:** Usuário final que realiza as marcações.
3.  **Quadra:** O recurso que será reservado.
4.  **Reserva:** Tabela pivô com as regras de negócio, datas e horários da partida.

---

## Como Executar o Projeto

Siga o passo a passo abaixo para rodar a aplicação no seu ambiente local.

### 1. Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/pt-br/) (versão LTS recomendada)
- [PostgreSQL](https://www.postgresql.org/) (serviço rodando localmente ou URL de um banco em nuvem)

### 2. Instalação

Clone este repositório e acesse o diretório do backend:

```bash
git clone [https://github.com/gabriellechristie-dev/Agendamento-Quadras-Esportivas-DFS-2026.2](https://github.com/gabriellechristie-dev/Agendamento-Quadras-Esportivas-DFS-2026.2)
cd backend
```

Instale todas as dependências do projeto:

```bash
npm install
```

### 3. Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto e configure suas credenciais seguindo o padrão abaixo:

```env
PORT=3000
DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/nome_do_banco?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"
```

### 4. Sincronização do Banco de Dados

Gere as tabelas no PostgreSQL utilizando o Prisma:

```bash
npx prisma db push
```

### 5. Iniciando o Servidor

Para rodar a API em modo de desenvolvimento (com recarregamento automático):

```bash
npm run dev
```

> Se tudo estiver correto, você verá no terminal: `Servidor rodando em http://localhost:3000`

---

## Testes Automatizados

Para rodar a suíte de testes de integração do sistema (configurada com Jest e Supertest), utilize o comando:

```bash
npm run test
```

---

## Documentação da API

A documentação detalhada das rotas, parâmetros necessários, regras de autenticação e exemplos de requisições está disponível na nossa pasta oficial de documentação.

👉 **[Acessar a Documentação Completa (API.md)](./docs/API.md)**
