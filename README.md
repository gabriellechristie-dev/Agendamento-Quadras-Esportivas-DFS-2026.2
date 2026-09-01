# 🏟️ ArenaPlay — Agendamento de Quadras Esportivas

Projeto **DFS-2026.2** desenvolvido como requisito do **CURSO: DESENVOLVIMENTO FULL STACK BÁSICO** para o **Bootcamp Atlântico Avanti**.

Uma solução Full Stack web moderna para gerenciamento e agendamento online de quadras esportivas com validação de disponibilidade e conflitos em tempo real, autenticação JWT e painel do jogador.

![Node.js](https://img.shields.io/badge/Node.js-v18+-68a063?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 📌 Sobre o Projeto

O **ArenaPlay** resolve o problema de agendamento informal de quadras esportivas, substituindo contatos manuais por um sistema automatizado com disponibilidade garantida.

O sistema conta com arquitetura desacoplada (API RESTful em Node.js e SPA em React), aplicando boas práticas como validação de schemas de requisição com Zod, criptografia de senhas com Bcrypt, autenticação baseada em JWT e ORM Prisma conectado a um banco relacional PostgreSQL.

---

## 👥 Equipe de Desenvolvimento

Este projeto foi construído colaborativamente pelos seguintes integrantes:

- **Gabrielle Christie do Nascimento de Souza** — *Arquitetura Backend, Autenticação JWT, Motor de Reservas & Integração Frontend*
- **Hevlina Karoll Lima Reis** — *Design de Interface, Componentização React & Módulo de Quadras*
- **Fellipi Kainnan Candido de Lima** — *CRUD Backend (Quadras e Reservas), Testes de Integração, Regras de Validação & Documentação*

---

## ✨ Funcionalidades Principais

- 🔐 **Autenticação & Autorização (RBAC):** Cadastro de usuários (`JOGADOR`), autenticação via JWT, controle de sessão no frontend e rotas protegidas por perfil (`JOGADOR` e `ADMIN`).
- 🏟️ **Catálogo de Quadras:** Filtros por modalidade esportiva (Futsal, Society, Beach Tennis, Tênis, Basquete, Vôlei), localização, preço/hora e status de disponibilidade.
- ⚡ **Motor Anti-Conflito de Reservas:** Validação no backend que verifica sobreposições de horários (`horarioInicio` e `horarioFim`) para a mesma quadra antes de confirmar o agendamento.
- 📊 **Painel do Jogador ("Minhas Reservas"):** Visualização detalhada dos próximos jogos, histórico de reservas passadas/canceladas e opção de cancelamento de reservas ativas.

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
* **Node.js** & **Express** (API RESTful)
* **Prisma ORM** (Modelagem de dados, migrations e type-safety)
* **PostgreSQL** (Banco de dados relacional)
* **JWT (JSON Web Token)** & **Bcrypt.js** (Segurança e autenticação)
* **Zod** (Validação de schemas e entradas HTTP)
* **Jest** & **Supertest** (Suíte de testes de integração)

### **Frontend**
* **React 18** + **Vite** (Single Page Application)
* **Tailwind CSS** (Estilização responsiva e UI moderna)
* **React Router DOM v6** (Roteamento dinâmico e rotas protegidas)
* **Axios** (Cliente HTTP com interceptors para tokens de autorização)
* **Lucide React** (Iconografia)

---

## 🗄️ Modelagem do Banco de Dados

```mermaid
erDiagram
    Jogador ||--o{ Reserva : "realiza"
    Quadra ||--o{ Reserva : "pertence"

    Jogador {
        Uuid id PK
        String nomeCompleto
        String email UK
        String telefone
        String senha
    }

    Administrador {
        Uuid id PK
        String nome
        String email UK
        String telefone
        String senha
    }

    Quadra {
        Uuid id PK
        String nome
        String modalidade
        String localizacao
        Decimal precoHora
        StatusQuadra status
    }

    Reserva {
        Uuid id PK
        Uuid jogadorId FK
        Uuid quadraId FK
        DateTime data
        DateTime horarioInicio
        DateTime horarioFim
        Decimal valorTotal
        StatusReserva status
    }
```

---

## 📡 Endpoints Principais da API

### 🔑 Autenticação (`/auth`)
| Método | Endpoint | Descrição | Requer Auth |
|---|---|---|---|
| `POST` | `/auth/registrar` | Cadastra um novo jogador no sistema | Não |
| `POST` | `/auth/login` | Autentica usuário e gera Token JWT | Não |
| `GET` | `/auth/perfil` | Retorna dados do perfil autenticado | Sim |

### 🏟️ Quadras (`/quadras`)
| Método | Endpoint | Descrição | Requer Auth |
|---|---|---|---|
| `GET` | `/quadras` | Lista todas as quadras cadastradas | Não |
| `GET` | `/quadras/:id` | Retorna os detalhes de uma quadra por ID | Não |
| `POST` | `/quadras` | Cadastra uma nova quadra | Admin |
| `PUT` | `/quadras/:id` | Atualiza dados de uma quadra | Admin |
| `DELETE` | `/quadras/:id` | Remove uma quadra do sistema | Admin |

### 📅 Reservas (`/reservas`)
| Método | Endpoint | Descrição | Requer Auth |
|---|---|---|---|
| `POST` | `/reservas` | Cria um agendamento com validação de horário | Sim |
| `GET` | `/reservas` | Lista reservas (do usuário logado ou todas se Admin) | Sim |
| `GET` | `/reservas/:id` | Detalhes de uma reserva específica | Sim |
| `DELETE` | `/reservas/:id` | Cancela/Remove uma reserva ativa | Sim |

---

## ⚙️ Como Executar o Projeto

### **Pré-requisitos**
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) rodando localmente ou container Docker

---

### **1. Configuração e Execução do Backend**

```bash
# Acesse o diretório do backend
cd backend

# Instale as dependências
npm install

# Crie e configure o arquivo de variáveis de ambiente
cp .env.example .env

# Exemplo de conteúdo do .env:
# PORT=3000
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/arenaplay?schema=public"
# JWT_SECRET="sua_chave_secreta_jwt"

# Sincronize o banco de dados com o Prisma
npx prisma db push

# Inicie o servidor em modo de desenvolvimento
npm run dev
```
*O backend estará rodando em `http://localhost:3000`.*

---

### **2. Configuração e Execução do Frontend**

```bash
# Em outro terminal, acesse o diretório do frontend
cd frontend

# Instale as dependências
npm install

# Crie e configure o arquivo .env do frontend
# VITE_API_URL=http://localhost:3000

# Inicie a aplicação com o Vite
npm run dev
```
*Acesse o sistema no navegador através de `http://localhost:5173`.*

---

## 📁 Estrutura de Pastas

```text
.
├── docs/
│   └── DOCUMENTACAO.md         # Documentação técnica detalhada da solução
├── backend/
│   ├── prisma/                # Schema Prisma e migrations
│   ├── src/
│   │   ├── auth/              # Controller, rotas e serviços de autenticação
│   │   ├── controllers/       # Controladores HTTP (Quadras, Reservas)
│   │   ├── middlewares/       # Middleware JWT, autorização e validação Zod
│   │   ├── routes/            # Definição de rotas da API
│   │   ├── schemas/           # Schemas de validação de dados Zod
│   │   ├── services/          # Regras de negócio e acesso ao banco
│   │   └── utils/             # Motor de checagem de conflitos de horário
│   ├── tests/                 # Testes de integração com Jest e Supertest
│   ├── app.js                 # Configuração do Express e CORS
│   └── server.js              # Inicialização da porta HTTP
│
└── frontend/
    ├── src/
    │   ├── components/        # Componentes de UI reutilizáveis
    │   ├── context/           # Contexto global de autenticação (AuthContext)
    │   ├── pages/             # Páginas da aplicação (Home, Quadras, Reservas)
    │   ├── services/          # Instância do Axios com Interceptors
    │   └── App.jsx            # Rotas e proteção de páginas
    ├── index.html
    └── vite.config.js
```

---

## 🧪 Testes Automatizados

Para executar os testes de integração da API (backend):

```bash
cd backend
npm run test
```

---

## 📄 Documentação Completa

Para detalhes aprofundados sobre arquitetura, decisões técnicas, regras matemáticas de validação de horário e guia de endpoints, acesse o arquivo dedicado:

👉 **[Acessar Documentação Técnica Completa (`docs/DOCUMENTACAO.md`)](./docs/DOCUMENTACAO.md)**