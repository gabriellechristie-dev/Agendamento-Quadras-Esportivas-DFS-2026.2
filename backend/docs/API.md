# Documentação da API - Sistema de Agendamento de Quadras

Esta documentação descreve os endpoints disponíveis na API REST do projeto **backend-quadras**.

## Informações Básicas

- **Base URL local:** `http://localhost:3000`
- **Autenticação:** A maioria das rotas protegidas exige um Token JWT enviado no header da requisição:
  - **Header:** `Authorization`
  - **Valor:** `Bearer <seu_token_jwt>`

---

## Endpoints

### 1. Rota Raiz

- **Método:** `GET`
- **Rota:** `/`
- **Descrição:** Verifica se a API está online.
- **Resposta de Sucesso (`200 OK`):**
  ```json
  {
    "message": "API rodando com sucesso!"
  }
  ```

---

### 2. Autenticação (`/auth`)

#### Registrar Usuário

- **Método:** `POST`
- **Rota:** `/auth/register`
- **Descrição:** Cadastra um novo usuário no sistema.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "nomeCompleto": "Seu Nome Completo",
    "email": "seu@email.com",
    "telefone": "85999999999",
    "senha": "sua_senha_segura"
  }
  ```
- **Resposta de Sucesso (`201 Created`):**
  ```json
  {
    "mensagem": "Jogador cadastrado com sucesso!",
    "jogador": {
      "id": "uuid-do-jogador",
      "nomeCompleto": "Seu Nome Completo",
      "email": "seu@email.com",
      "telefone": "85999999999"
    }
  }
  ```

#### Fazer Login

- **Método:** `POST`
- **Rota:** `/auth/login`
- **Descrição:** Autentica o usuário e retorna o token de acesso.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "email": "seu@email.com",
    "senha": "sua_senha_segura"
  }
  ```
- **Resposta de Sucesso (`200 OK`):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "usuario": {
      "id": "uuid-do-usuario",
      "email": "seu@email.com",
      "tipo": "JOGADOR"
    }
  }
  ```

---

### 3. Quadras (`/quadras`)

#### Listar Quadras

- **Método:** `GET`
- **Rota:** `/quadras`
- **Descrição:** Retorna a lista de todas as quadras cadastradas.
- **Autenticação:** Pública ou Privada (conforme sua regra).
- **Resposta de Sucesso (`200 OK`):**
  ```json
  [
    {
      "id": "uuid-da-quadra",
      "nome": "Quadra Poliesportiva A",
      "tipo": "Futsal / Vôlei",
      "precoHora": 80.0
    }
  ]
  ```

#### Cadastrar Nova Quadra

- **Método:** `POST`
- **Rota:** `/quadras`
- **Descrição:** Adiciona uma nova quadra ao sistema.
- **Autenticação:** Exigida (Apenas administradores/usuários logados).
- **Corpo da Requisição (JSON):**
  ```json
  {
    "nome": "Quadra de Society 1",
    "tipo": "Futebol Society",
    "precoHora": 120.0
  }
  ```
- **Resposta de Sucesso (`201 Created`):**
  ```json
  {
    "id": "uuid-da-quadra",
    "nome": "Quadra de Society 1",
    "tipo": "Futebol Society",
    "precoHora": 120.0
  }
  ```

---

### 4. Agendamentos (`/agendamentos`)

#### Criar Agendamento

- **Método:** `POST`
- **Rota:** `/agendamentos`
- **Descrição:** Realiza a reserva de uma quadra em uma data e horário específicos.
- **Autenticação:** Exigida (`Bearer Token`).
- **Corpo da Requisição (JSON):**
  ```json
  {
    "jogadorId": "uuid-do-jogador",
    "quadraId": "uuid-da-quadra",
    "dataHora": "2026-07-30T18:00:00Z"
  }
  ```
- **Resposta de Sucesso (`201 Created`):**
  ```json
  {
    "id": "uuid-da-reserva",
    "jogadorId": "uuid-do-jogador",
    "quadraId": "uuid-da-quadra",
    "dataHora": "2026-07-30T18:00:00Z"
  }
  ```

#### Listar Agendamentos do Usuário

- **Método:** `GET`
- **Rota:** `/agendamentos`
- **Descrição:** Retorna os agendamentos feitos pelo usuário logado.
- **Autenticação:** Exigida (`Bearer Token`).
- **Resposta de Sucesso (`200 OK`):**
  ```json
  [
    {
      "id": "uuid-da-reserva",
      "quadra": {
        "nome": "Quadra Poliesportiva A"
      },
      "dataHora": "2026-07-30T18:00:00Z"
    }
  ]
  ```

---

## Tratamento de Erros Comuns

- **`400 Bad Request`**: Dados inválidos enviados pelo cliente (validados pelo Zod).
- **`401 Unauthorized`**: Token JWT ausente, inválido ou expirado.
- **`404 Not Found`**: Recurso não encontrado no banco de dados.
- **`500 Internal Server Error`**: Erro inesperado no servidor ou falha de conexão com o Banco de Dados.
