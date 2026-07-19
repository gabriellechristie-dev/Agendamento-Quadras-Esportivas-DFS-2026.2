
# Fluxo de Desenvolvimento Git

## Objetivo

Este documento define como a equipe deve utilizar o Git e GitHub durante o desenvolvimento do projeto.

O objetivo é manter o código organizado, evitar conflitos e garantir que todos os integrantes sigam o mesmo padrão de desenvolvimento.

---

# Estrutura de Branches

O projeto utiliza o seguinte padrão:

```
main
│
└── develop
    │
    └── feature/*
```

---

# Main

Branch principal do projeto.

Responsável por armazenar versões estáveis e finais.

## Regras:

- Não realizar alterações diretamente.
- Recebe código somente após revisão.
- Deve sempre conter uma versão funcional do sistema.

---

# Develop

Branch de integração.

Responsável por receber as funcionalidades desenvolvidas pela equipe.

## Regras:

- Não desenvolver diretamente nela.
- Recebe alterações através de Pull Requests.
- Deve sempre estar funcional.

---

# Feature

Branches utilizadas para desenvolvimento de funcionalidades específicas.

Cada integrante deve trabalhar somente na sua branch.

Exemplo:

```
feature/jogadores
feature/quadras
feature/reservas
```

---

# Branches do Projeto

```
feature/database
feature/jogadores
feature/quadras
feature/reservas
feature/validacoes
feature/documentacao
```

---

# Fluxo de Desenvolvimento

## 1. Atualizar projeto

Antes de iniciar uma tarefa:

```bash
git checkout develop
git pull
```

---

## 2. Acessar sua branch

Exemplo:

```bash
git checkout feature/jogadores
```

---

## 3. Desenvolver funcionalidade

Cada integrante deve trabalhar somente na sua responsabilidade.

Exemplo:

A branch:

```
feature/jogadores
```

é responsável por:

- Cadastro de jogadores.
- Consulta de jogadores.
- Atualização de jogadores.
- Remoção de jogadores.

---

## 4. Verificar alterações

```bash
git status
```

---

## 5. Criar commit

Adicionar arquivos:

```bash
git add .
```

Criar commit:

```bash
git commit -m "descrição da alteração"
```

Exemplo:

```bash
git commit -m "implementa CRUD de jogadores"
```

---

## 6. Enviar alterações

```bash
git push
```

---

# Pull Request

Após finalizar uma funcionalidade:

1. Acessar o GitHub.
2. Criar Pull Request.
3. Selecionar:

Origem:

```
feature/minha-branch
```

Destino:

```
develop
```

Após revisão e aprovação, a funcionalidade poderá ser integrada.

---

# Regras Git

- Nunca fazer código diretamente na main.
- Nunca fazer código diretamente na develop.
- Sempre utilizar branches de funcionalidade.
- Fazer commits claros.
- Atualizar a branch antes de iniciar.
- Resolver conflitos antes do Pull Request.
- Nunca enviar `.env`.
- Nunca enviar `node_modules`.