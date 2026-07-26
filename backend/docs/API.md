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
    "name": "Seu Nome",
    "email": "seu@email.com",
    "password": "sua_senha_segura"
  }
  ```
- **Resposta de Sucesso (`201 Created`):**
  ```json
  {
    "message": "Usuário criado com sucesso!",
    "user": {
      "id": "uuid-do-usuario",
      "name": "Seu Nome",
      "email": "seu@email.com"
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
    "password": "sua_senha_segura"
  }
  ```
- **Resposta de Sucesso (`200 OK`):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
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
      "id": 1,
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
    "id": 2,
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
    "quadraId": 1,
    "dataHoraInicio": "2026-08-01T14:00:00.000Z",
    "dataHoraFim": "2026-08-01T15:00:00.000Z"
  }
  ```
- **Resposta de Sucesso (`201 Created`):**
  ```json
  {
    "id": 10,
    "usuarioId": "uuid-do-usuario",
    "quadraId": 1,
    "status": "CONFIRMADO"
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
      "id": 10,
      "quadra": {
        "nome": "Quadra Poliesportiva A"
      },
      "dataHoraInicio": "2026-08-01T14:00:00.000Z",
      "dataHoraFim": "2026-08-01T15:00:00.000Z"
    }
  ]
  ```

---

## Tratamento de Erros Comuns

- **`400 Bad Request`**: Dados inválidos enviados pelo cliente (validados pelo Zod).
- **`401 Unauthorized`**: Token JWT ausente, inválido ou expirado.
- **`404 Not Found`**: Recurso não encontrado no banco de dados.
- **`500 Internal Server Error`**: Erro inesperado no servidor ou falha de conexão com o Banco de Dados.
