# Estrutura Backend

## Objetivo

Este documento define o padrão de organização do backend.

Todos os integrantes devem seguir esta estrutura.

Não criar arquivos ou pastas fora do padrão sem comunicar a equipe.

---

# Estrutura de Pastas

```
backend/

├── prisma/
│   └── schema.prisma
│
├── src/
│
│   ├── app.js
│   ├── server.js
│
│   ├── config/
│   │   └── prisma.js
│
│   ├── controllers/
│   │   ├── jogadorController.js
│   │   ├── quadraController.js
│   │   └── reservaController.js
│
│   ├── routes/
│   │   ├── jogadorRoutes.js
│   │   ├── quadraRoutes.js
│   │   └── reservaRoutes.js
│
│   ├── services/
│   │   ├── jogadorService.js
│   │   ├── quadraService.js
│   │   └── reservaService.js
│
│   └── middlewares/
│
├── package.json
├── package-lock.json
├── .env
└── .env.example
```

---

# Responsabilidades

## app.js

Responsável pela configuração do Express.

Contém:

- Configuração da aplicação.
- Registro de rotas.
- Middlewares globais.

---

## server.js

Responsável por iniciar o servidor.

Contém:

- Inicialização da API.
- Configuração da porta.

---

## Routes

Responsável pelas rotas.

Exemplo:

```
GET /jogadores
POST /jogadores
DELETE /jogadores/:id
```

---

## Controllers

Responsável por:

- Receber requisições.
- Validar entradas.
- Retornar respostas.

---

## Services

Responsável pelas regras de negócio.

Contém:

- Processamentos.
- Comunicação com banco.
- Regras da aplicação.

---

## Config

Responsável pelas configurações externas.

Exemplo:

- Prisma.
- Banco de dados.

---

## Middlewares

Responsável por funções executadas antes das rotas.

Exemplo:

- Autenticação.
- Validação.
- Tratamento de erros.

---

# Regra de Desenvolvimento

Cada integrante deve:

1. Trabalhar somente na sua funcionalidade.
2. Criar arquivos seguindo esta estrutura.
3. Não criar pastas aleatórias.
4. Não alterar módulos de outros integrantes sem comunicação.